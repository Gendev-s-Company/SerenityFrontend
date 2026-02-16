"use client";
import {
  createworkSC,
  deleteworkSC,
  getPaginateworkSC,
  updateworkSC,
} from "@/infrastructure/user/workschedule/workscheduleRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { PageType } from "@/types/component-type/PageType";
import { WorkSchedule } from "@/types/entity-type/workschedule";
import { pageSize } from "@/utils/PaginationUtility";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { WSCColumnOptions, WSCNamefield } from "./prep-view-work";
import { DataTable } from "@/components/liste/complexe-data-table";
import { getLocalStorage } from "@/utils/storage";

export default function WorkSchedulePage() {
  const [works, setWorks] = useState<WorkSchedule[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [all, setAll] = useState<PageType>({
    totalElement: 0,
    totalPage: 0,
  });
  const user = getLocalStorage()!
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    getPaginateworkSC(page.pageIndex, page.pageSize)
      .then((data) => {
        setWorks(data.content);
        setPage((prevPage) => ({
          ...prevPage,
          pageIndex: data.pageable.pageNumber,
        }));
        setAll({
          totalElement: data.totalElements,
          totalPage: data.totalPages,
        });
        setLoading(false)
      })
      .catch((error) => {
         console.error("Error fetching profils:", error)
          setLoading(false)
       });
  }, [refresh, page.pageIndex]);
  const onUpdate = async (formData: WorkSchedule) => {
    await updateworkSC(formData);
    setRefresh((prev) => prev + 1);
  };
  const onDelete = async (id: string | null) => {
    if (id !== null) {
      await deleteworkSC(id);
      setRefresh((prev) => prev + 1);
    }
  };

  const btnAction: ColumnConfig<WorkSchedule> = {
    key: "action_btn",
    header: "Action",
    type: "button",
    hiding: false,
    onUpdate: (row) => onUpdate(row),
    onDelete: (row) => onDelete(row.scheduleID),
    onClick: (row) => console.log("Editer", row.scheduleID),
  };
  const columns = useMemo(() => {
    return [...WSCColumnOptions, btnAction];
  }, []);

  const body: WorkSchedule = {
    scheduleID: null,
    userID: user.userID!, ///miala ito aveo
    starttime: new Date(),
    endtime: null,
    status: 0
  };
  const onCreate = async (formData: WorkSchedule) => {
    await createworkSC(formData);
    setRefresh((prev) => prev + 1);
  };
  return (
    <div className="container mx-auto py-10 px-3">
      <DataTable
        body={body}
        onCreate={onCreate}
        data={works}
        mcolumns={columns}
        fields={WSCNamefield}
        columnFilter="userID"
        pageCount={all.totalPage}
        rowCount={all.totalElement}
        onPaginationChange={setPage}
        pagination={page}
        loading={loading}
      />
    </div>
  );
}
