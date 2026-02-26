"use client";
import { DataTable } from "@/components/liste/complexe-data-table";
import { createRoom,deleteRoom,updateRoom,getPaginateRooms } from "@/infrastructure/hotel/room/roomRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { RoomEntity } from "@/types/entity-type/roomEntity";
import { useEffect, useMemo, useState } from "react";
import { RoomColumnOptions,RoomNamefield } from "./prep-view-room";
import { PaginationState } from "@tanstack/react-table";
import { pageSize } from "@/utils/PaginationUtility";
import { PageType } from "@/types/component-type/PageType";
import { getLocalStorage } from "@/utils/storage";
import { RoomTypeEntity } from "@/types/entity-type/roomTypeEntity";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { getAllRoomType } from "@/infrastructure/hotel/room/roomType/roomTypeRequest";
import { convertListToOption } from "@/infrastructure/hotel/room/roomFunction";

export default function Room() {
    const user = getLocalStorage()!;
    const [room,setRoom]=useState<RoomEntity[]>([]);
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

    const [roomTypeOption, setRoomTypeOption] = useState<FieldOptions[]>([]);
    

    // Liste des types de chambres
    useEffect(() => {
      if (user && user.profil.company.companyID) {
        getAllRoomType(user.profil.company.companyID)
          .then((data) => {
            setRoomTypeOption(convertListToOption(data));
          })
          .catch((error) => console.error("Error fetching roomType:", error));
      }
    }, []);


    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true)
      if (user && user.profil.company.companyID) {
        getPaginateRooms(
          page.pageIndex,
          page.pageSize,
        )
          .then((data) => {
            setRoom(data.content);
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
            console.error("Error fetching rooms:", error)
            setLoading(false)
          });
      }
    }, [refresh, page.pageIndex]);


    const onUpdate = async (formData: RoomEntity) => {
      await updateRoom(formData);
      setRefresh((prev) => prev + 1);
    };
    const onDelete = async (id: string | null) => {
      if (id !== null) {
        await deleteRoom(id);
        setRefresh((prev) => prev + 1);
      }
    };

    const btnAction: ColumnConfig<RoomEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.roomID),
      onClick: (row) => console.log("Editer", row.roomID),
    };

    const columns = useMemo(() => {
      return [...RoomColumnOptions, btnAction];
    }, []);

    const roomTypeOptions: FieldConfig<RoomEntity> = useMemo(
      () => ({
        name: "type",
        libelle: "Type de chambre :",
        type: "select",
        normal: false,
        items: roomTypeOption,
        objectMapping: {
          idKey: "typeID",
          labelKey: "name",
        },
      }),
      [roomTypeOption],
    );
    
    const namefield = useMemo(() => {
      return [roomTypeOptions,  ...RoomNamefield];
      // return [...ActivityOrderfield.slice(0, 2), options, optionsCustomer, ...ActivityOrderfield.slice(3)];
    }, [roomTypeOptions]);
    

    const roomType: RoomTypeEntity = {
        skipValidation: true,
        typeID:null,
        company:user?.profil?.company,
        name: "",
        description:"",
        status: 0,
    };
    const body: RoomEntity = {
      roomID: null,
      type: roomType,
      name: "",
      description: "",
      peoples: 0,
      bed:0,
      state:0,
      status: 0,
      skipValidation: false,
    };

    const onCreate = async (formData: RoomEntity) => {
      console.log(user);
    
      console.log(formData);
    
      await createRoom(formData);
      setRefresh((prev) => prev + 1);
    };
      return (
        <div className="container mx-auto py-10 px-3">
          <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
            <h2 className="text-xl font-semibold">{"Liste des chambres de l'établissement"}</h2>
            <DataTable
              body={body}
              onCreate={onCreate}
              data={room}
              mcolumns={columns}
              fields={namefield}
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
