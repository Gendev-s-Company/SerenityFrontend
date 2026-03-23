"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { ColumnConfig } from "@/types/component-type/column-config";
import { PageType } from "@/types/component-type/PageType";
import { RoomReservationEntity } from "@/types/entity-type/roomReservationEntity";

import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { getPaginateAllReservation, updateReservation} from "@/infrastructure/hotel/room/roomReservation/roomReservationRequest";

import { RoomReservationColumnOptions, RoomReservationFields } from "./prep-view-roomReservation"; 
import { id } from "zod/v4/locales";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

export default function RoomReservationsPage() {
  const user = getLocalStorage();
  const [reservations, setReservations] = useState<RoomReservationEntity[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  
  const [trigger, setTrigger] = useState<string>("");
  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const [paginationInfo, setPaginationInfo] = useState<PageType>({
    totalElement: 0,
    totalPage: 0,
  });

  //////////////////////////////////////////////////////////////////////////////

interface TriggerOption {
  id: string;
  label: string;
}

const listTriggers: TriggerOption[] = [
  { id: "-1", label: "Tous" },
  { id: "2", label: "Réservations validés" },
  { id: "1", label: "Réservations en validation" },
  { id: "8", label: "Réservations annulé" },
];

const listTriggers2: TriggerOption[] = [
  { id: "-2", label: "Tous" },
  { id: "4", label: "Occupés" },
  { id: "5", label: "Terminés" },
];


const [list, setList] = useState<string>("1");
const [listT, setListT] = useState<TriggerOption[]>([]);

const listType = [
  { id: "1", label: "Réservation" },
  { id: "2", label: "Séjour" }
];

useEffect(() => {
  setLoading(true);
  
  let newListT;
  if (list === "1") {
    newListT = listTriggers;
  } else {
    newListT = listTriggers2;
  }
  
  setListT(newListT);
  
  if (newListT && newListT.length > 0) {
    setTrigger(newListT[0].id);
  }
  
  setLoading(false);
}, [list]);


  //////////////////////////////////////////////////////////////////////////////////////

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


  const onUpdateFinished = async (formData: RoomReservationEntity) => {
    await updateReservation(formData, "5");
    // setStartDate("");
    // setEndDate("");
    setRefresh((prev) => prev + 1);
  };


  const onUpdateOccupied = async (formData: RoomReservationEntity) => {
    await updateReservation(formData, "4");
    // setStartDate("");
    // setEndDate("");
    setRefresh((prev) => prev + 1);
  };


  const onUpdateMissed = async (formData: RoomReservationEntity) => {
    await updateReservation(formData, "7");
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
          <Button
            onClick={(e) => {onUpdateAnnuler(row)}}
            type="button"
            className="px-3 py-1 bg-amber-400 rounded-md cursor-pointer hover:bg-amber-500 text-sm font-medium transition-colors"
          >
            ANNULER
          </Button>
          
          <Button
            onClick={(e) => {onUpdateReserver(row)}}
            type="button"
            className="px-3 py-1 bg-emerald-400 rounded-md cursor-pointer hover:bg-emerald-500 text-sm font-medium transition-colors"
          >
            VALIDER
          </Button>
        </div>
      );
    }

    if (row.state === 4) {

      console.log("TEST MANDEHA");
      return (
        <div className="flex gap-2">
          <Button
            onClick={(e) => {onUpdateFinished(row)}}
            type="button"
            className="px-3 py-1 bg-purple-400 rounded-md cursor-pointer hover:bg-purple-500 text-sm font-medium transition-colors"
          >
            MARQUER COMME TERMINE
          </Button>
        </div>
      );
    }

    if (row.state === 2) {

      console.log("TEST MANDEHA");
      return (
        <div className="flex gap-2">
          <Button
            onClick={(e) => {onUpdateOccupied(row)}}
            type="button"
            className="px-3 py-1 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500 text-sm font-medium transition-colors"
          >
            MARQUER OCCUPE
          </Button>
          
          <Button
            onClick={(e) => {onUpdateMissed(row)}}
            type="button"
            className="px-3 py-1 bg-red-400 rounded-md cursor-pointer hover:bg-red-500 text-sm font-medium transition-colors"
          >
            MARQUER ABSENT
          </Button>
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
        
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-sm font-bold text-slate-600 uppercase tracking-tight min-w-[50px]">
            Type
          </label>

          <div className="relative">
            <select
              value={list}
              onChange={(e) => setList(e.target.value)}
              className="
                cursor-pointer appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-gray-700 text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200 w-full "
            >
              {listType.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.label}
                </option>
              ))}
            </select>
            
            {/* Flèche personnalisée */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg 
                className="w-4 h-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
          </div>

        </div>
        
        <Tabs 
        value={trigger} 
        onValueChange={(newTrigger) => {
          setTrigger(newTrigger);
          setStartDate(""); 
          setEndDate("");          
        }}
        className="w-[400px]"
        >
          <TabsList>
            {listT.map((row) => (
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
            <div className="flex gap-3 md:ml-auto w-full md:w-auto">
              <Button 
                onClick={handleSearch}
                type="button"
                className="px-3 py-1 cursor-pointer hover:bg-indigo-700 border border-slate-800 rounded-md text-sm font-medium transition-colors"
              >
                Rechercher
              </Button>
            {/* </div> */}
            {/* <div className="md:ml-auto w-full md:w-auto"> */}
              <Button 
                onClick={reset}
                type="button"
                className="px-3 py-1 cursor-pointer hover:bg-indigo-700 border border-slate-800 rounded-md text-sm font-medium transition-colors"
              >
                Reset
              </Button>
            </div>

          </div>
        </div>

        <DataTable
          body={emptyReservation as RoomReservationEntity}
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