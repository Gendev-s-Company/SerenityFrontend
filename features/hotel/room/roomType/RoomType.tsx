"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { createRoomType, deleteRoomType, getPaginateRoomTypes, updateRoomType } from '@/infrastructure/hotel/room/roomType/roomTypeRequest';
import { ColumnConfig } from "@/types/component-type/column-config";
import { useEffect, useMemo, useState } from "react";
import { RoomTypeColumnOptions, RoomTypeNamefield } from "./prep-view-roomType";
import { PaginationState } from "@tanstack/react-table";
import { pageSize } from "@/utils/PaginationUtility";
import { PageType } from "@/types/component-type/PageType";
import { getLocalStorage } from "@/utils/storage";
import { RoomTypeEntity } from "@/types/entity-type/roomTypeEntity";
import { CompanyEntity } from "@/types/entity-type/companyEntity";

export default function RoomType() {
    const [roomType,setRoomType]=useState<RoomTypeEntity[]>([]);
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
          getPaginateRoomTypes(
            user.profil.company.companyID!,
            page.pageIndex,
            page.pageSize,
          )
            .then((data) => {
              setRoomType(data.content);
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
              console.error("Error fetching room types:", error)
              setLoading(false)
            });
        }
      }, [refresh, page.pageIndex]);

const onUpdate = async (formData: RoomTypeEntity) => {
  await updateRoomType(formData);
  setRefresh((prev) => prev + 1);
};

const onDelete = async (id: string | null) => {
  if (id !== null) {
    await deleteRoomType(id);
    setRefresh((prev) => prev + 1);
  }
};

  const btnAction: ColumnConfig<RoomTypeEntity> = {
    key: "action_btn",
    header: "Action",
    type: "button",
    hiding: false,
    onUpdate: (row) => onUpdate(row),
    onDelete: (row) => onDelete(row.typeID),
    onClick: (row) => console.log("Editer", row.typeID),
  };

    const columns = useMemo(() => {
      return [...RoomTypeColumnOptions, btnAction];
    }, []);

    const company: CompanyEntity = {
      skipValidation: true,
      companyID: user?.profil?.company.companyID,
      mail: "",
      name: "",
      phone: "",
      status: 0,
    };

    const body: RoomTypeEntity = {
      typeID: null,
      company: company,
      name: "",
      description: "",
      status: 0,
      skipValidation: false,
    };

    const onCreate = async (formData: RoomTypeEntity) => {
      console.log(user);
    
      console.log(formData);

      await createRoomType(formData);
      setRefresh((prev) => prev + 1);
    };

      return (
        <div className="container mx-auto py-10 px-3">
          <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
            <h2 className="text-xl font-semibold">{"Type de chambre de l'établissement"}</h2>
            <DataTable
              body={body}
              onCreate={onCreate}
              data={roomType}
              mcolumns={columns}
              fields={RoomTypeNamefield}
              columnFilter="name"
              pageCount={all.totalPage}
              rowCount={all.totalElement}
              onPaginationChange={setPage}
              pagination={page}
              loading={loading}
            />
          </div>
        </div>
      );
    
}