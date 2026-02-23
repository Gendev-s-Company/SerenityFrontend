"use client";
import { DataTable } from "@/components/liste/complexe-data-table";
import { createActivityPrice, deleteActivityPrice, getPaginateActivityPrices, updateActivityPrice } from '@/infrastructure/hotel/activity/activityPrice/activityPriceRequest';
import { ColumnConfig } from "@/types/component-type/column-config";
import { ActivityPriceEntity } from "@/types/entity-type/activityPriceEntity";
import { useEffect, useMemo, useState } from "react";
import { ActivityPriceColumnOptions, ActivityPriceNamefield } from "./prep-view-activityPrice";
import { PaginationState } from "@tanstack/react-table";
import { pageSize } from "@/utils/PaginationUtility";
import { PageType } from "@/types/component-type/PageType";
import { ActivityEntity } from "@/types/entity-type/activityEntity";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { getLocalStorage } from "@/utils/storage";

interface ActivityPriceProps {
  activityId: string;
  refresh: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRefresh: (value: any) => void;
}
export default function ActivityPrice({ activityId, refresh, setRefresh }: ActivityPriceProps) {
  const activityID = activityId;
  const [activityPrice, setActivityPrice] = useState<ActivityPriceEntity[]>([]);
  // const [refresh, setRefresh] = useState<number>(0);
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
    if (activityID) {
      getPaginateActivityPrices(
        activityID,
        page.pageIndex,
        page.pageSize,
      )
        .then((data) => {
          setActivityPrice(data.content);
          console.log(data.content);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdate = async (formData: ActivityPriceEntity) => {
    await updateActivityPrice(formData);
    setRefresh((prev: number) => prev + 1);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDelete = async (id: string | null) => {
    if (id !== null) {
      await deleteActivityPrice(id);
      setRefresh((prev: number) => prev + 1);
    }
  };



  const columns = useMemo(() => {
    const btnAction: ColumnConfig<ActivityPriceEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.priceID),
      onClick: (row) => console.log("Editer", row.priceID),
    };
    return [...ActivityPriceColumnOptions, btnAction];
  }, [onUpdate, onDelete]);
  const company: CompanyEntity = {
    skipValidation: true,
    companyID: user?.profil?.company.companyID,
    mail: "",
    name: "",
    phone: "",
    status: 0,
  };
  const activity: ActivityEntity = {
    skipValidation: true,
    activityID: activityID,
    company: company,
    name: "",
    description: "",
    status: 0,
  };

  const body: ActivityPriceEntity = {
    priceID: null,
    activity: activity,
    hourPrice: 0,
    price: 0,
    dateChanged: new Date(),
    status: 0,
    skipValidation: false,
  };

  const onCreate = async (formData: ActivityPriceEntity) => {

    console.log(formData);

    await createActivityPrice(formData);
    setRefresh((prev: number) => prev + 1);
  };
  return (
    <div className="container mx-auto py-10 px-3">
      <DataTable
        body={body}
        onCreate={onCreate}
        data={activityPrice}
        mcolumns={columns}
        fields={ActivityPriceNamefield}
        columnFilter="price"
        pageCount={all.totalPage}
        rowCount={all.totalElement}
        onPaginationChange={setPage}
        pagination={page}
        loading={loading}
      />
    </div>
  );
}