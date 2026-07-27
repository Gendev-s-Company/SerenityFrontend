'use client';
import { getDishOrderById, getDishOrderDetails } from "@/infrastructure/restaurant/dish/dishOrder/dishOrderRequest";
import { createDishOrderDetails, deleteDishOrderDetails, updateDishOrderDetails, updateDishOrderDetailsstate } from "@/infrastructure/restaurant/dish/dishOrderDetails/dishOrderDetailRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { DishOrderDetailsEntity } from "@/types/entity-type/dishOrderDetailsEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { PaginationState } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DishOrderDetailsColumnOption, DishOrderDetailsNameField, stateLabel } from "./prep-view-dishOrderDetails";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { convertListToOption } from "@/infrastructure/restaurant/dish/dishFonction";
import { DataTable } from "@/components/liste/complexe-data-table";
import { DishEntity } from "@/types/entity-type/dishEntity";
import { DishTypeEntity } from "@/types/entity-type/dishTypeEntity";
import { getAllDishes } from "@/infrastructure/restaurant/dish/dishRequest";

export default function DishOrderDetails() {
    const orderID = useSearchParams().get('orderID');
    const [dishOrderDetails,setDishOrderDetails]=useState<DishOrderDetailsEntity[]>([]);
    const [dishOptions,setDishOptions]=useState<FieldOptions[]>([]);
    const [dishes, setDishes] = useState<DishEntity[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const user = getLocalStorage()!;
    const [page, setPage] = useState<PaginationState>({
         pageIndex: 0,
         pageSize: pageSize,
     });
     const [all, setAll] = useState({
         totalElement: 0,
         totalPage: 0,
     });
     const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (user && user.profil.company.companyID) {
        getAllDishes(user.profil.company.companyID)
          .then((data) => {
            setDishes(data); 
            setDishOptions(convertListToOption(data));
            console.log("Type de plat", data);
          })
          .catch((error) => console.error("Error fetching dish types:", error));
      }
    }, []);
      useEffect(() => {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setLoading(true);
          if (user && user.profil.company.companyID) {
            getDishOrderDetails(orderID!)
              .then((data) => {               
                  const orders = data.details;
                  console.log("Détails de la commande", orders);
                    setDishOrderDetails(orders);
                  // Maintenant récupérer les détails
                  if (Array.isArray(orders)) {
                      const allDetails = orders.flatMap(order => order.details || []);
                  }

                  setLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                console.error("Error fetching restaurant tables:", error);
              });
          }
      }, [refresh, page.pageIndex]);

    const onUpdate = async (formData: DishOrderDetailsEntity) => {
       await updateDishOrderDetailsstate(formData);
       setRefresh((prev) => prev + 1);
    };
    
    const onDelete = async (id: string | null) => {
      if (id !== null) {
        await deleteDishOrderDetails(id);
        setRefresh((prev) => prev + 1);
      }
    }

    const btnAction: ColumnConfig<DishOrderDetailsEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      // onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.orderDetailsID),
      onClick: (row) => console.log("Editer", row.orderDetailsID),
    };

    const columns = useMemo(() => {
      return [...DishOrderDetailsColumnOption, btnAction];
    }, []);

    const options: FieldConfig<DishOrderDetailsEntity> = useMemo(
      () => ({
        name: "dish",
        libelle: "Plat:",
        type: "select",
        normal: false,
        items: dishOptions,
        objectMapping: {
          idKey: "dishID",
          labelKey: "name",
        },
      }),
      [dishOptions],
    );
    

    const namefield = useMemo(() => {
      return [options,...DishOrderDetailsNameField.slice(0, 2), ...DishOrderDetailsNameField.slice(2)];
    }, [options]);

    const dishType: DishTypeEntity = {
      skipValidation: true,
      name: "",
      company: user?.profil.company,
      typeID: null,
      description: "",
      dishes:null,
      status: 0,
    };
    const dish: DishEntity = {
      skipValidation: true,
      dishID: null,
      type: dishType,
      name: "",
      description: "",
      price: null,
      photo: [],
      status: 0,
      state: 0,
    };

    const body: DishOrderDetailsEntity = {
      orderDetailsID: null,
      dish:dish,
      orderID: orderID!,
      unitPrice: 0,
      quantity: 0,
      user: user,
      dateOrder: new Date().toISOString(),
      state: 0,
      status: 0,
      skipValidation: false,
    };

    const findDishById = (dishID: string) => {
      return dishes.find((d) => d.dishID === dishID) || null;
    };

  const onCreate = async (formData: DishOrderDetailsEntity) => {
    const dishID = formData.dish?.dishID;

    if (!dishID) {
      console.error("No dish selected");
      return;
    }

    const selectedDish = findDishById(dishID);

    if (!selectedDish) {
      console.error("Dish not found");
      return;
    }

    const unitPrice = selectedDish?.price?.price ?? 0;

    // payload final pour backend
    const payload = {
      orderDetailsID: null,
      dish: selectedDish,
      orderID: orderID!,
      unitPrice: unitPrice,
      quantity: formData.quantity,
      user: user,
      dateOrder: new Date().toISOString(),
      state: 0,
      status: 0,
      skipValidation: false,
    };
    // console.log("plat:", selectedDish);
    // console.log("Payload to create:", payload.dish.type);
    await createDishOrderDetails(payload);
    setRefresh((prev) => prev + 1);
  };

    return (
    <div className="container mx-auto py-10 px-3">

      <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
        <h2 className="text-xl font-semibold">{"Détails de la commande " + orderID}</h2>
        <DataTable
          body={body}
          onCreate={onCreate}
          data={dishOrderDetails}
          mcolumns={columns}
          fields={namefield}
          columnFilter="orderDetailsID"
          pageCount={all.totalPage}
          rowCount={all.totalElement}
          onPaginationChange={setPage}
          pagination={page}
          loading={loading}
          authority={user?.profil?.authority}
        />
      </div>
    </div>
    );
}