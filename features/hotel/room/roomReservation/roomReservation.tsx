"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";

import { ColumnConfig } from "@/types/component-type/column-config";
import { PageType } from "@/types/component-type/PageType";
import { RoomReservationEntity } from "@/types/entity-type/roomReservationEntity";

import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { getPaginateAllReservation, updateReservation} from "@/infrastructure/hotel/room/roomReservation/roomReservationRequest";

import { RoomReservationColumnOptions, RoomReservationFields } from "./prep-view-roomReservation"; 

export default function RoomReservationsPage() {
  const user = getLocalStorage();
  const [reservations, setReservations] = useState<RoomReservationEntity[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  
  const [trigger, setTrigger] = useState<string>("-1");
  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const [paginationInfo, setPaginationInfo] = useState<PageType>({
    totalElement: 0,
    totalPage: 0,
  });

  const listTriggers = [
    { id: "-1", label: "Tous" },
    { id: "2", label: "Validé" },
    { id: "7", label: "En cours" },
    { id: "1", label: "Non validé" },
  ];

  const [startDate, setStartDate] = useState<string>("13/03/2026");
  const [endDate, setEndDate] = useState<string>("");


const formatToISO = (dateString: any) => {
  if (!dateString) return "";
  return `${dateString}T10:00:00`;
};



  // Fetch des données
  useEffect(() => {
    setLoading(true);
    if (user?.profil?.company?.companyID) {
      getPaginateAllReservation(
        page.pageIndex,
        page.pageSize,
        user.profil.company.companyID,
        trigger,
        formatToISO(startDate),
        formatToISO(endDate)
      )
        .then((data) => {
          setReservations(data.content);
          setPaginationInfo({
            totalElement: data.totalElements,
            totalPage: data.totalPages,
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching reservations:", error);
        });
    }
  }, [refresh, page.pageIndex, trigger, user?.profil?.company?.companyID]);


  useEffect(() => {
    setStartDate("");
    setEndDate("");
  }, [trigger]);

  const onUpdate = async (formData: RoomReservationEntity) => {
    await updateReservation(formData);
    setRefresh((prev) => prev + 1);
  };

  const btnAction: ColumnConfig<RoomReservationEntity> = {
    key: "action_btn",
    header: "Action",
    type: "button",
    hiding: false,
    onUpdate: (row) => {
      if (row.state === 7) {
        onUpdate(row);
      } else {
        console.log("Consultation :", row.reservationID);
      }
    },
  };


  const emptyReservation: Partial<RoomReservationEntity> = {
    reservationID: null as any,
    starttime: new Date(),
    endtime: new Date(),
    price: 0,
    state: 0,
    accountPaid: 0,
    accountRated: 0,
  };

  const columns = useMemo(() => {
    return [...RoomReservationColumnOptions, btnAction];
  }, []);

  const formFields = useMemo(() => {
    return RoomReservationFields;
  }, []);

  function onCreate(data: RoomReservationEntity): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container mx-auto py-10 px-3">
      <div className="w-full max-w-6xl mx-auto p-5 relative border rounded-xl bg-slate-50/50 shadow-sm">
        
        <Tabs value={trigger} onValueChange={(trigger) => setTrigger(trigger)}>
          <TabsList variant={"line"}>
            {listTriggers.map((row) => (
              <TabsTrigger
                key={row.id}
                value={row.id}
                className={"cursor-pointer"}
              >
                {row.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-500 mb-1.5 ml-1">Début</label>
              <input 
                type="date" 
                className="w-64 px-4 py-2.5 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-500 mb-1.5 ml-1">Fin</label>
              <input 
                type="date" 
                className="w-64 px-4 py-2.5 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DataTable
          body={emptyReservation as RoomReservationEntity}
          onCreate={onCreate}
          data={reservations}
          mcolumns={columns}
          fields={formFields}
          columnFilter="reservationID"
          pageCount={paginationInfo.totalPage}
          rowCount={paginationInfo.totalElement}
          onPaginationChange={setPage}
          pagination={page}
          loading={loading}
        />
      </div>
    </div>
  );
}