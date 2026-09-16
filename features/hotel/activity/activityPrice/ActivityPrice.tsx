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
import { getLocalStorage } from "@/utils/storage";
import { CompanyEntity } from "@/types/entity-type/companyEntity";

interface ActivityPriceProps {
  Activity: ActivityEntity | null;
  refresh: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRefresh: (value: any) => void;
}
export default function ActivityPrice({ Activity, refresh, setRefresh }: ActivityPriceProps) {
  const selectedActivity = Activity;
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
    console.log("Selected Activity:", selectedActivity?.activityID);
    setLoading(true)
    if (selectedActivity?.activityID) {
      getPaginateActivityPrices(
        selectedActivity?.activityID,
        page.pageIndex,
        page.pageSize,
      )
        .then((data) => {
          setActivityPrice(data.content);
                  setPage((prevPage) => ({
          ...prevPage,
          pageIndex: data.page.number,
        }));
          setAll({
            totalElement: data.page.totalElements,
            totalPage: data.page.totalPages,
          });
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching activities:", error)
          setLoading(false)
        });
    }
  }, [refresh, page.pageIndex]);


  const onUpdate = async (formData: ActivityPriceEntity) => {
      const updatedFormData: ActivityPriceEntity = {
          ...formData,
          activity: formData.activity
              ? {
                    ...formData.activity,
                    company: user?.profil?.company,
                    name: formData.activity.name ?? "Aucun nom",
                }
              : formData.activity,
      };
      console.log("Updated Form Data:", updatedFormData);
      await updateActivityPrice(updatedFormData);

      setRefresh((prev: number) => prev + 1);
  };

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


  const activity: ActivityEntity = {
    activityID: selectedActivity?.activityID ?? null,
    company: user.profil.company,
    name: selectedActivity?.name ?? "",
    description: "",
    price: null,
    status: 0,
    skipValidation: true,
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
        authority={user?.profil?.authority}
      />
    </div>
  );
}