"use client";

import { DataTable } from "@/components/liste/complexe-data-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { ColumnConfig } from "@/types/component-type/column-config";
import { PageType } from "@/types/component-type/PageType";

import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";

import { TableReservationColumnOptions, TableReservationFields } from "./prep-view-tableReservation"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

import { BookmarkCheck, BookmarkX, DoorClosedLocked, DoorOpenIcon, UserX2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TableReservationEntity } from "@/types/entity-type/tableReservationEntity";
import { getPaginateAllReservation, updateReservation } from "@/infrastructure/restaurant/table/tablereservation/tableReservationRequest";

export default function TableReservationsPage() {
  const user = getLocalStorage();
  const [reservations, setReservations] = useState<TableReservationEntity[]>([]);
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
  { id: "2", label: "Manger" }
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
          console.log(data.content);
          
          setReservations(data.content);
          setPaginationInfo({
            totalElement: data.page.totalElements,
            totalPage: data.page.totalPages,
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



  const onUpdateAnnuler = async (formData: TableReservationEntity) => {
      await updateReservation(formData, "8");
      // setStartDate("");
      // setEndDate("");
      setRefresh((prev) => prev + 1);
    };
  
    const onUpdateReserver = async (formData: TableReservationEntity) => {
      await updateReservation(formData, "2");
      // setStartDate("");
      // setEndDate("");
      setRefresh((prev) => prev + 1);
    };
  
  
    const onUpdateFinished = async (formData: TableReservationEntity) => {
      await updateReservation(formData, "5");
      // setStartDate("");
      // setEndDate("");
      setRefresh((prev) => prev + 1);
    };
  
  
    const onUpdateOccupied = async (formData: TableReservationEntity) => {
      await updateReservation(formData, "4");
      // setStartDate("");
      // setEndDate("");
      setRefresh((prev) => prev + 1);
    };
  
  
    const onUpdateMissed = async (formData: TableReservationEntity) => {
      await updateReservation(formData, "7");
      // setStartDate("");
      // setEndDate("");
      setRefresh((prev) => prev + 1);
    };

// eslint-disable-next-line react-hooks/exhaustive-deps
const btnAction: ColumnConfig<TableReservationEntity> = {
  key: "action_btn",
  header: "Action",
  hiding: false,
  cell: (row: TableReservationEntity) => {

    if (row.state === 1) {

      return (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={(e) => onUpdateAnnuler(row)}
                  type="button"
                  className="px-3 py-1 bg-amber-400 rounded-md cursor-pointer hover:bg-amber-500 text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  <BookmarkX className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-white text-gray-700 border border-gray-200 shadow-lg">
                <p>Annuler la réservation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={(e) => onUpdateReserver(row)}
                  type="button"
                  className="px-3 py-1 bg-emerald-400 rounded-md cursor-pointer hover:bg-emerald-500 text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  <BookmarkCheck className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-white text-gray-700 border border-gray-200 shadow-lg">
                <p>Valider la réservation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    }

    if (row.state === 4) {

      return (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={(e) => onUpdateFinished(row)}
                  type="button"
                  className="px-3 py-1 bg-purple-400 rounded-md cursor-pointer hover:bg-purple-500 text-sm font-medium transition-colors"
                >
                  <DoorOpenIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-white text-gray-700 border border-gray-200 shadow-lg">
                <p>Marquer comme terminé</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    }

    if (row.state === 2) {

      return (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={(e) => onUpdateOccupied(row)}
                  type="button"
                  className="px-3 py-1 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500 text-sm font-medium transition-colors"
                >
                  <DoorClosedLocked className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-white text-gray-700 border border-gray-200 shadow-lg">
                <p>Marquer comme occupé</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={(e) => onUpdateMissed(row)}
                  type="button"
                  className="px-3 py-1 bg-red-400 rounded-md cursor-pointer hover:bg-red-500 text-sm font-medium transition-colors"
                >
                  <UserX2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-white text-gray-700 border border-gray-200 shadow-lg">
                <p>Marquer comme absent</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>


        </div>
      );
    }
    return null;
  },
};


  const emptyReservation: Partial<TableReservationEntity> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    occupationID: null as any,
    starttime: new Date(),
    endtime: new Date(),
    state: 0,
  };

  const columns = useMemo(() => {
    return [...TableReservationColumnOptions, btnAction];
  }, [btnAction]);

  const formFields = useMemo(() => {
    return TableReservationFields;
  }, []);

  function onCreate(data: TableReservationEntity): void {
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
            totalElement: data.page.totalElements,
            totalPage: data.page.totalPages,
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
            Réservation / Séjour :
          </label>

          <div className="relative">
            

            <Select
              value={list}
              onValueChange={(value) => setList(value)}
            >
              <SelectTrigger className="w-[200px] h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm cursor-pointer">
                <SelectValue placeholder="Choisir un mode">
                  {listType.find(item => item.id === list)?.label || "Choisir un mode"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                {listType.map((row) => (
                  <SelectItem 
                    key={row.id} 
                    value={row.id}
                    className="w-[200px] cursor-pointer hover:bg-gray-100 px-3 py-2 text-center"
                  >
                    {row.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>



            
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
                aria-label="Date Début" 
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
                aria-label="Date Fin"
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
          body={emptyReservation as TableReservationEntity}
          data={reservations}
          mcolumns={columns}
          fields={formFields}
          columnFilter="occupationID"
          pageCount={paginationInfo.totalPage}
          rowCount={paginationInfo.totalElement}
          onPaginationChange={setPage}
          pagination={page}
          loading={loading}
          authority={user?.profil?.authority}
        />
      </div>
    </div>
  );
}