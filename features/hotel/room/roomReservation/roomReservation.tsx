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
    { id: "1", label: "En cours de validation" },
    { id: "8", label: "Annulé" },
  ];

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatToISO = (dateString: any) => {
  if (!dateString) return "";
  return `${dateString}T00:00:00`;
  };


  // Fetch des données
  useEffect(() => {
    setLoading(true);
    console.log("START DATE === ", startDate);
    console.log("END DATE === ", endDate);


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



  const onUpdateAnnuler = async (formData: RoomReservationEntity) => {
    await updateReservation(formData, "8");
    // setStartDate("");
    // setEndDate("");
    setRefresh((prev) => prev + 1);
  };

  const onUpdateReserver = async (formData: RoomReservationEntity) => {
    await updateReservation(formData, "2");
    // setStartDate("");
    // setEndDate("");
    setRefresh((prev) => prev + 1);
  };

// eslint-disable-next-line react-hooks/exhaustive-deps
const btnAction: ColumnConfig<RoomReservationEntity> = {
  key: "action_btn",
  header: "Action",
  hiding: false,
  cell: (row: RoomReservationEntity) => {
    console.log("TRIGGER === ", trigger);
    console.log("STATE === ", row.state);

    if (row.state === 1) {

      console.log("TEST MANDEHA");
      return (
        <div className="flex gap-2">
          <button
            onClick={(e) => {onUpdateAnnuler(row)}}
            type="button"
            className="px-3 py-1 bg-amber-100 rounded-md cursor-pointer hover:bg-amber-500 text-sm font-medium transition-colors"
          >
            ANNULER
          </button>
          
          <button
            onClick={(e) => {onUpdateReserver(row)}}
            type="button"
            className="px-3 py-1 bg-emerald-100 rounded-md cursor-pointer hover:bg-emerald-500 text-sm font-medium transition-colors"
          >
            RESERVER
          </button>
        </div>
      );
    }
    return null;
  },
  // onUpdate: (row) => {
  //   if (row.state !== 7) {
  //     console.log("Mode Consultation pour l'ID :", row.reservationID);
  //   }
  // }
};


  const emptyReservation: Partial<RoomReservationEntity> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }, [btnAction]);

  const formFields = useMemo(() => {
    return RoomReservationFields;
  }, []);

  function onCreate(data: RoomReservationEntity): void {
    throw new Error("Function not implemented.");
  }


  const handleSearch = async () => {
  const pad = (num: number) => String(num).padStart(2, '0');
  const now = new Date();
  
  const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
  const formattedStartDate = `${firstDayOfYear.getFullYear()}-${pad(firstDayOfYear.getMonth() + 1)}-${pad(firstDayOfYear.getDate())}T00:00:00`;
  const formattedEndDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T23:59:59`;

  const finalStart = startDate === "" ? formattedStartDate : `${startDate}T00:00:00`;
  const finalEnd = endDate === "" ? "" : `${endDate}T23:59:59`;

    setLoading(true);
    if (user?.profil?.company?.companyID) {
      getPaginateAllReservation(
        page.pageIndex,
        page.pageSize,
        user.profil.company.companyID,
        trigger,
        finalStart,
        finalEnd
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

};

const reset = async () => {
  setEndDate("");
  setStartDate("");
  setRefresh((prev) => prev + 1);
}


  return (
    <div className="container mx-auto py-10 px-3">
      <div className="w-full max-w-6xl mx-auto p-5 relative border rounded-xl bg-slate-50/50 shadow-sm">
        
        <Tabs 
        // value={trigger} onValueChange={(trigger) => setTrigger(trigger)}
        value={trigger} 
        onValueChange={(newTrigger) => {
          setTrigger(newTrigger);
          setStartDate(""); 
          setEndDate("");          
        }}
        >
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
          <div className="flex flex-col md:flex-row md:items-center w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 gap-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-tight min-w-[50px]">
                Début
              </label>
              <input 
                type="date" 
                value={startDate}
                className="h-[42px] w-full md:w-auto px-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-tight min-w-[50px]">
                Fin
              </label>
              <input 
                type="date" 
                value={endDate}
                className="h-[42px] w-full md:w-auto px-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="md:ml-auto w-full md:w-auto">
              <button 
                onClick={handleSearch}
                type="button"
                className="px-3 py-1 bg-black-600 hover:bg-indigo-700 border border-slate-800 rounded-md text-sm font-medium transition-colors"
              >
                Rechercher
              </button>
            {/* </div> */}
            {/* <div className="md:ml-auto w-full md:w-auto"> */}
              <button 
                onClick={reset}
                type="button"
                className="px-3 py-1 bg-black-600 hover:bg-indigo-700 border border-slate-800 rounded-md text-sm font-medium transition-colors"
              >
                Reset
              </button>
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