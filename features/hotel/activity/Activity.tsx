"use client";
import { DataTable } from "@/components/liste/complexe-data-table";
import { createActivity, deleteActivity, getPaginateActivities, updateActivity } from '@/infrastructure/hotel/activity/activityRequest';
import { ColumnConfig } from "@/types/component-type/column-config";
import { ActivityEntity } from "@/types/entity-type/activityEntity";
import { useEffect, useMemo, useState } from "react";
import { ActivityColumnOptions, ActivityNamefield } from "./prep-view-activity";
import { PaginationState } from "@tanstack/react-table";
import { pageSize } from "@/utils/PaginationUtility";
import { PageType } from "@/types/component-type/PageType";
import { getLocalStorage } from "@/utils/storage";
import { CompanyEntity } from "@/types/entity-type/companyEntity";


export default function Activity() {
const [activity, setActivity] = useState<ActivityEntity[]>([]);
const [refresh, setRefresh] = useState<number>(0);
const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });
const [all, setAll] = useState<PageType>({
    totalElement: 0,
    totalPage: 0,
  });
const [loading, setLoading] = useState(true)
const user = getLocalStorage()!;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    if (user && user.profil.company.companyID) {
      getPaginateActivities(
        user.profil.company.companyID!,
        page.pageIndex,
        page.pageSize,
      )
        .then((data) => {
          setActivity(data.content);
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
          console.error("Error fetching activities:", error) 
          setLoading(false)
        });
    }
  }, [refresh, page.pageIndex]);

const onUpdate = async (formData: ActivityEntity) => {
  await updateActivity(formData);
  setRefresh((prev) => prev + 1);
};
const onDelete = async (id: string | null) => {
  if (id !== null) {
    await deleteActivity(id);
    setRefresh((prev) => prev + 1);
  }
};

const btnAction: ColumnConfig<ActivityEntity> = {
  key: "action_btn",
  header: "Action",
  type: "button",
  hiding: false,
  onUpdate: (row) => onUpdate(row),
  onDelete: (row) => onDelete(row.activityID),
  onClick: (row) => console.log("Editer", row.activityID),
};

const columns = useMemo(() => {
  return [...ActivityColumnOptions, btnAction];
}, []);

const company: CompanyEntity = {
    skipValidation: true,
    companyID: user?.profil?.company.companyID,
    mail: "",
    name: "",
    phone: "",
    status: 0,
  };

const body: ActivityEntity = {
  activityID: null,
  company: company,
  name: "",
  description: "",
  status: 0,
  skipValidation: false,
};

const onCreate = async (formData: ActivityEntity) => {
  console.log(user);

  console.log(formData);

  await createActivity(formData);
  setRefresh((prev) => prev + 1);
};
return (
  <div className="container mx-auto py-10 px-3">
    <DataTable
      body={body}
      onCreate={onCreate}
      data={activity}
      mcolumns={columns}
      fields={ActivityNamefield}
      columnFilter="name"
      pageCount={all.totalPage}
      rowCount={all.totalElement}
      onPaginationChange={setPage}
      pagination={page}
      loading={loading}
    />
  </div>
);
}