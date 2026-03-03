"use client";
import { DataTable } from "@/components/liste/complexe-data-table";
import { createActivityPrice, deleteActivityPrice, getPaginateActivityPrices, updateActivityPrice } from '@/infrastructure/hotel/activity/activityPrice/activityPriceRequest';
import { ColumnConfig } from "@/types/component-type/column-config";
import { ActivityPriceEntity } from "@/types/entity-type/activityPriceEntity";
import { useEffect, useMemo, useState } from "react";
// import { ActivityPriceColumnOptions, ActivityPriceNamefield } from "./prep-view-activityPrice";
import { PaginationState } from "@tanstack/react-table";
import { pageSize } from "@/utils/PaginationUtility";
import { PageType } from "@/types/component-type/PageType";
import { ActivityEntity } from "@/types/entity-type/activityEntity";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { getLocalStorage } from "@/utils/storage";
import { RoomPriceEntity } from "@/types/entity-type/roomPriceEntity";
import { createRoomPrice, deleteRoomPrice, getPaginateRoomPrices, updateRoomPrice } from "@/infrastructure/hotel/room/roomPrice/roomPriceRequest";
import { RoomPriceColumnOptions, RoomPriceNamefield } from "./prep-view-roomPrice";

interface RoomPriceProps {
  roomId: string;
  refresh: number;
  setRefresh: (value: any) => void;
}
export default function RoomPrice({ roomId, refresh, setRefresh }: RoomPriceProps) {
  const roomID = roomId;
  const [roomPrice, setRoomPrice] = useState<RoomPriceEntity[]>([]);
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
    if (roomID) {
      getPaginateRoomPrices(
        roomID,
        page.pageIndex,
        page.pageSize,
      )
        .then((data) => {
          setRoomPrice(data.content);
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

  const onUpdate = async (formData: RoomPriceEntity) => {
    await updateRoomPrice(formData);
    setRefresh((prev: number) => prev + 1);
  };
  const onDelete = async (id: string | null) => {
    if (id !== null) {
      await deleteRoomPrice(id);
      setRefresh((prev: number) => prev + 1);
    }
  };



  const columns = useMemo(() => {
    const btnAction: ColumnConfig<RoomPriceEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.priceID),
      onClick: (row) => console.log("Editer", row.priceID),
    };
    return [...RoomPriceColumnOptions, btnAction];
  }, [onUpdate, onDelete]);


  const body: RoomPriceEntity = {
    priceID: null,
    roomID: roomID,
    nightPrice: 0,
    hourPrice: 0,
    datechanged: new Date(),
    accountRate: 0,
    skipValidation: false,
    status: 0
  };

  const onCreate = async (formData: RoomPriceEntity) => {

    console.log(formData);

    await createRoomPrice(formData);
    setRefresh((prev: number) => prev + 1);
  };
  return (
    <div className="container mx-auto py-10 px-3">
      <DataTable
        body={body}
        onCreate={onCreate}
        data={roomPrice}
        mcolumns={columns}
        fields={RoomPriceNamefield}
        columnFilter="hourPrice"
        pageCount={all.totalPage}
        rowCount={all.totalElement}
        onPaginationChange={setPage}
        pagination={page}
        loading={loading}
      />
    </div>
  );
}