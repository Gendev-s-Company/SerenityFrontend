"use client";
import { DishOrderEntity } from "@/types/entity-type/dishOrderEntity";
import { getLocalStorage } from "@/utils/storage";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { pageSize } from "@/utils/PaginationUtility";
import {DishOrderColumnOptions, DishOrderNameField, stateLabel} from "./prep-view-dishOrder";
import { deleteDishOrder, getPaginateDishOrderbyState, updateDishOrder } from "@/infrastructure/restaurant/dish/dishOrder/dishOrderRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { PageType } from "@/types/component-type/PageType";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/liste/complexe-data-table";

export default function DishOrder() {
    const user = getLocalStorage()!;
    const [dishOrder, setDishOrder] = useState<DishOrderEntity[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });
    const [trigger, setTrigger] = useState<string>("-1");
    const [list, setList] = useState<string>("-1");
    const [selectedState, setSelectedState] = useState("-1");
    // const [all, setAll] = useState({
    //     totalElement: 0,
    //     totalPage: 0,
    // });
    const [paginationInfo, setPaginationInfo] = useState<PageType>({
        totalElement: 0,
        totalPage: 0,
      });

    interface TriggerOption {
      id: string;
      label: string;
    }
    const listTriggers: TriggerOption[] = [
      { id: "-1", label: "Tous" },
      { id: "0", label: "En cours" },
      { id: "1", label: "Fini" },
      { id: "2", label: "Payé" },
      { id: "3", label: "Annulé" },
    ];

    useEffect(() => {
      setLoading(true);
        
      setLoading(false);
    }, [list]);
    

    // FILTRE A FAIRE PLUS TARD 
      const [dateOrder,setdateOrder] = useState<string>("");
      const handleSearch = async () => {}
    
  useEffect(() => { 
      setLoading(true);
  
      if (user && user.profil.company.companyID) {
      
          let statesParam = [];
      
          if (selectedState === "-1") {
              // Tous → envoyer tous les états possibles
              statesParam = [0, 1, 2, 3];
          } else {
              // Un seul état sélectionné
              statesParam = [parseInt(selectedState)];
          }
        
          getPaginateDishOrderbyState(
              user.profil.company.companyID,
              page.pageIndex,
              page.pageSize,
              statesParam
          )
          .then((data) => {
              const mappedData = data.content.map((item) => ({
                  ...item,
                  stateLabel: stateLabel[item.state] || "Inconnu",
              }));
            
              setDishOrder(mappedData);
            
              setPage((prevPage) => ({
                  ...prevPage,
                  pageIndex: data.page.number,
              }));
            
              setLoading(false);
          })
          .catch((error) => {
              setLoading(false);
              console.error("Error fetching dish orders:", error);
          });
      }
  }, [refresh, page.pageIndex, selectedState]);

    const onUpdate = async (formData: DishOrderEntity) => {
       await updateDishOrder(formData);
       setRefresh((prev) => prev + 1);
    };

    const onDelete = async (id: string | null) => {
      if (id !== null) {
        await deleteDishOrder(id);
        setRefresh((prev) => prev + 1);
      }
    }
        
    const btnAction: ColumnConfig<DishOrderEntity> = {
          key: "action_btn",
          header: "Action",
          type: "button",
          hiding: false,
          onUpdate: (row) => onUpdate(row),
          onDelete: (row) => onDelete(row.orderID),
    };

    const emptyReservation: Partial<DishOrderEntity> = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      orderID: null as any,
      dateOrder: new Date(),
      state: 0,
    };
    
    const columns = useMemo(() => {
          return [...DishOrderColumnOptions, btnAction];
    }, []);

    const formFields = useMemo(() => {
        return DishOrderNameField;
    }, []);

    useEffect(() => {
    setdateOrder("");
    }, [list]);

    const reset = async () => {
    setdateOrder("");
    setRefresh((prev) => prev + 1);
    }

    return (
    <div className="container mx-auto py-10 px-3">
      <div className="w-full max-w-6xl mx-auto p-5 relative border rounded-xl bg-slate-50/50 shadow-sm">  
        <Tabs 
        value={trigger} 
        onValueChange={(newTrigger) => {
          setTrigger(newTrigger);
          setdateOrder("");        
        }}
        className="w-[400px]"
        >
          <TabsList>
            {listTriggers.map((row) => (
              <TabsTrigger
                key={row.id}
                value={row.id}
                className={"cursor-pointer"}
                onClick={() => setSelectedState(row.id)}
              >
                {row.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <DataTable
          body={emptyReservation as DishOrderEntity}
          data={dishOrder}
          mcolumns={columns}
          fields={formFields}
          columnFilter="orderID"
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