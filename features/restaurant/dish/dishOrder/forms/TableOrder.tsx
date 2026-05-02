"use client";

import { useState, useMemo, useEffect } from "react";
import { RotateCcw,Plus,Minus,X,ChevronLeft, ChevronRight, Check} from "lucide-react";
import { getLocalStorage } from "@/utils/storage";
import { getPaginateDishes } from "@/infrastructure/restaurant/dish/dishRequest";
import { DishEntity } from "@/types/entity-type/dishEntity";
import { PaginationState } from "@tanstack/react-table";

import { DishTypeEntity } from "@/types/entity-type/dishTypeEntity";
import { getPaginateDishTypes } from "@/infrastructure/restaurant/dish/dishType/dishTypeRequest";
import { TableReservationEntity } from "@/types/entity-type/tableReservationEntity";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { DishOrderDetailsEntity } from "@/types/entity-type/dishOrderDetailsEntity";
import { DishOrderEntity } from "@/types/entity-type/dishOrderEntity";
import { getAllTableAvalaible } from "@/infrastructure/restaurant/table/tableOccupation/tableOccupationRequest";
import { createDishOrder } from "@/infrastructure/restaurant/dish/dishOrder/dishOrderRequest";
type OrderItem = {
  dish: DishEntity;
  quantity: number;
};

// ===== COMPONENT =====
export default function TableOrder() {
  // Variables d'état
  const [category, setCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [orderPage, setOrderPage] = useState(1);
  const ORDER_PER_PAGE = 6;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dishes, setDishes] = useState<DishEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState<number>(0);
  const user = getLocalStorage()!;

  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  })

  const [all, setAll] = useState({
    totalElement: 0,
    totalPage: 0,
  });

  const [categories, setCategories] = useState<DishTypeEntity[]>([]);
  const [categoryStart, setCategoryStart] = useState(0);
  const MAX_VISIBLE = 6;

  const [categoryPage, setCategoryPage] = useState({
    pageIndex: 0,
    pageSize: 20, // assez large pour éviter trop de requêtes
  });

  const [selectedTable, setSelectedTable] = useState<TableReservationEntity | null>(null);
  const isTableSelected = !!selectedTable;
  const [tableOccupations, setTableOccupations] = useState<TableReservationEntity[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitOrder = async () => {
    try {
      const dishOrder: DishOrderEntity = {
        orderID: null,
        tableOccupation: selectedTable!,
        dateOrder: new Date(),
        state: 0,
        status: 0,
        totalPrice: 0,
        details: [],
        skipValidation: false,
      };

      const dishOrderDetails: DishOrderDetailsEntity[] = order.map((item) => ({
        orderDetailsID: null,
        orderID: dishOrder.orderID,
        unitPrice: item.dish.price?.price|| 0,
        dish: item.dish,
        user: user,
        quantity: item.quantity,
        dateOrder: new Date().toISOString(),
        state: 0,
        status: 0,
        skipValidation: false,
      }));

      dishOrder.totalPrice = dishOrderDetails.reduce(
        (sum, d) => sum + d.unitPrice * d.quantity,
        0
      );

      dishOrder.details = dishOrderDetails;

      await createDishOrder(dishOrder);

      //succès
      setSuccessMessage("Commande enregistrée avec succès");
      setErrorMessage(null);

      setOrder([]);

    } catch (error: any) {
      console.error("Erreur commande :", error);

      // message venant du backend (si dispo)
      const message =
        error?.response?.data?.message ||
        "Impossible de créer la commande (table déjà occupée ?)";

      setErrorMessage(message);
      setSuccessMessage(null);
    } finally {
      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 5000);
    }
  };


 const filteredDishes = useMemo(() => {
  return dishes.filter((d) => {
    const matchCategory =
      category === "Tous" || d.type?.typeID === category;

    const matchSearch = d.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });
}, [dishes, category, search]);


  // ===== PAGINATION =====
  // const paginatedDishes = useMemo(() => {
  //   const start = (dishPage - 1) * DISHES_PER_PAGE;
  //   return filteredDishes.slice(start, start + DISHES_PER_PAGE);
  // }, [filteredDishes, dishPage]);

  // const totalDishPages = Math.ceil(filteredDishes.length / DISHES_PER_PAGE);

  const paginatedOrder = useMemo(() => {
    const start = (orderPage - 1) * ORDER_PER_PAGE;
    return order.slice(start, start + ORDER_PER_PAGE);
  }, [order, orderPage]);

  const totalOrderPages = Math.ceil(order.length / ORDER_PER_PAGE);



  // ===== ACTIONS =====
const addToOrder = (dish: DishEntity) => {
  setOrder((prev) => {
    const existing = prev.find((i) => i.dish.dishID === dish.dishID);

    if (existing) {
      return prev.map((i) =>
        i.dish.dishID === dish.dishID
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }

    return [...prev, { dish, quantity: 1 }];
  });
};

  const increase = (id: string) => {
    setOrder((prev) =>
      prev.map((i) =>
        i.dish.dishID === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decrease = (id: string) => {
    setOrder((prev) =>
      prev
        .map((i) =>
          i.dish.dishID === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setOrder((prev) => prev.filter((i) => i.dish.dishID !== id));
  };

  const total = useMemo(() => {
    return order.reduce(
      (sum, i) => sum + (i.dish.price?.price || 0) * i.quantity,
      0
    );
  }, [order]);


  // Data fetching for table_occupation
    const handleSearch = () => {
      if (!startDate || !endDate) {
        alert("Veuillez remplir les deux dates");
        return;
      }
    
      if (!user?.profil?.company?.companyID) {
        console.error("Company ID manquant");
        return;
      }
    
      getAllTableAvalaible(
        user.profil.company.companyID,
        [0],
        startDate,
        endDate
      )
        .then((data) => {
          setTableOccupations(data);
          console.log("Tables disponibles :", data);
        })
        .catch((err) => console.error("Erreur tables :", err));
    };



// Data fetching for categories
  useEffect(() => {
    if (user && user.profil.company.companyID) {
      getPaginateDishTypes(
        user.profil.company.companyID,
        categoryPage.pageIndex,
        categoryPage.pageSize
      )
        .then((data) => {
          setCategories(data.content);
        })
        .catch((err) => console.error("Erreur catégories:", err));
    }
  }, [categoryPage.pageIndex]);

  const ALL_CATEGORIES = [
  { typeID: "Tous", name: "Tous" },
  ...categories,
  ];

  const visibleCategories = ALL_CATEGORIES.slice(
    categoryStart,
    categoryStart + MAX_VISIBLE
  );

  const canGoLeft = categoryStart > 0;
  const canGoRight = categoryStart + MAX_VISIBLE < ALL_CATEGORIES.length;


// Data fetching and state management for dish orders
  useEffect(() => {
    setLoading(true);

    if (user && user.profil.company.companyID) {
      getPaginateDishes(
        page.pageIndex,
        page.pageSize
      )
        .then((data) => {
          setDishes(data.content);
          setAll({
            totalElement: data.totalElements,
            totalPage: data.totalPages,
          });

          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur plats:", err);
          setLoading(false);
        });
    }
  }, [refresh, page.pageIndex]);

  // ===== UI =====
  return (
      <div className="container mx-auto py-10 px-3">
        <div className="w-full max-w-6xl mx-auto p-5 border rounded-xl bg-slate-50/50 shadow-sm mb-4">
          
          {/* HEADER */}
          <h2 className="text-lg font-semibold mb-4">
            Rechercher une table
          </h2>
          
          {/* FORM */}
          <div className="flex flex-wrap items-end gap-4">
          
            {/* DATE DEBUT */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Date début
              </label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded-md px-3 py-2"
                />
            </div>
          
            {/* DATE FIN */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Date fin
              </label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-md px-3 py-2"
                />
            </div>
          
            {/* BOUTON */}
              <button
                onClick={handleSearch}
                disabled={!startDate || !endDate}
                className="px-5 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                Rechercher
              </button>
          
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto p-5 border rounded-xl bg-slate-50/50 shadow-sm h-[110vh] flex flex-col">
          <div className="space-y-4 flex flex-col h-full">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Commande</h1>
            </div>

            {/* Table disponibles Selection */}
            <div className="flex items-center">
              <Field className="flex items-center gap-3 w-auto">
                <FieldLabel htmlFor="start" className="whitespace-nowrap">
                  Tables Disponibles:
                </FieldLabel>

                <Select onValueChange={(value) => setSelectedTable(value ? tableOccupations.find(t => t.occupationID === value) || null : null)}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Choisir une table" />
                  </SelectTrigger>

                  <SelectContent>
                    {tableOccupations.map((tableOccupation) => (
                      <SelectItem key={tableOccupation.occupationID} value={tableOccupation.occupationID!}>
                        Table : {tableOccupation.table.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

            </div>
            
            <hr />
            {!selectedTable && (
               <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                Veuillez rechercher les dates de réservation et sélectionner une table dans la liste pour passer une commande.
              </div>
            )}
            {successMessage && (
              <div className="mb-3 text-sm text-green-600 bg-green-50 border border-green-200 px-3 py-2 rounded-md">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                {errorMessage}
              </div>
            )}
            {/* CATEGORIES + ACTIONS */}
            <div className={`flex justify-between items-center gap-4`}>

              {/* CAT WRAPPER */}
             <div
                className={`flex items-center gap-2 w-full overflow-hidden transition ${
                  !selectedTable ? "opacity-40 pointer-events-none" : ""
                }`}
              >

                {/* LEFT */}
                <button
                  onClick={() => setCategoryStart((prev) => Math.max(prev - 1, 0))}
                  disabled={!canGoLeft}
                  className={`w-10 h-10 flex items-center justify-center border rounded-md bg-white flex-shrink-0 ${
                    !canGoLeft ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
                
                {/* CATEGORIES DYNAMIQUES */}
                <div className="flex gap-2 overflow-hidden" >
                  {visibleCategories.map((cat) => {
                    const label = cat.name;
                    const value = cat.typeID;
                  
                    return (
                      <button
                        key={value}
                        onClick={() => setCategory(value!)}
                         className={`w-25 px-2 py-2 rounded-md border text-sm text-center truncate whitespace-nowrap overflow-hidden ${
                          category === value
                            ? "bg-slate-800 text-white"
                            : "bg-white hover:border-blue-500"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                
                {/* RIGHT */}
                <button
                  onClick={() =>
                    setCategoryStart((prev) =>
                      Math.min(prev + 1, ALL_CATEGORIES.length - MAX_VISIBLE)
                    )
                  }
                  disabled={!canGoRight}
                  className={`w-10 h-10 flex items-center justify-center border rounded-md bg-white flex-shrink-0 ${
                    !canGoRight ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
                
              </div>

              {/* ACTIONS */}
              <div
                  className={`flex items-center transition gap-1 ${
                    !selectedTable ? "opacity-40 pointer-events-none" : ""
                  }`}
                >
                <button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={order.length === 0}
                  className="p-2 border rounded-md bg-white disabled:opacity-50"
                >
                  <RotateCcw size={18} />
                </button>

                <button
                  onClick={handleSubmitOrder}
                 disabled={order.length === 0}                
                  className="px-4 py-2 rounded-md bg-blue-800 text-white disabled:bg-slate-400"
                >
                  <Check size={18}/>
                </button>
              </div>
            </div>

            {showConfirmModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                <div className="bg-white rounded-lg p-6 w-80 shadow-lg">

                  <h2 className="text-lg font-semibold mb-2">
                    Réinitialiser la commande
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    Es-tu sûr de vouloir supprimer tous les éléments ?
                  </p>

                  <div className="flex justify-end gap-2">
                    {/* ANNULER */}
                    <button
                      onClick={() => setShowConfirmModal(false)}
                      className="px-3 py-1 border rounded"
                    >
                      Annuler
                    </button>

                    {/* CONFIRMER */}
                    <button
                      onClick={() => {
                        setOrder([]);
                        setShowConfirmModal(false);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Confirmer
                    </button>
                  </div>
                    
                </div>
              </div>
            )}

            {/* MAIN */}
            <div className="grid grid-cols-12 gap-4 flex-1 overflow-hidden">

              {/* LEFT */}
              <div className="col-span-8 space-y-4 h-full flex flex-col">

                {/* INPUT */}
                <input
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className= {`w-full border rounded-md px-3 py-2 transition ${
                      !selectedTable ? "opacity-40 pointer-events-none" : ""
                    }`}
                />

                {/* CONTENU + PAGINATION */}
                <div
                    className={`relative flex-1 transition ${
                      !selectedTable ? "opacity-40 pointer-events-none" : ""
                    }`}
                  >

                  {/* LISTE */}
                    <div className="grid grid-cols-3 gap-3 overflow-y-auto pb-16">
                      {loading ? (
                        <p className="text-center text-gray-400">Chargement...</p>
                      ) : (
                        filteredDishes.map((dish) => {
                          const isDisabled = dish.state === 1;
                        
                          return (
                            <div
                              key={dish.dishID}
                              onClick={() => {
                                if (!isDisabled) addToOrder(dish);
                              }}
                              className={`relative border rounded-lg p-3 bg-white cursor-pointer hover:border-blue-500
                                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <span className="absolute top-2 right-2 text-xs bg-slate-100 px-2 py-1 rounded">
                                {dish.type?.name}
                              </span>
                              
                              <p>{dish.name}</p>
                              <p className="text-sm text-gray-500">
                                {dish.price?.price.toLocaleString()} Ar
                              </p>                                              
                              {isDisabled ? (
                                <p className="text-xs text-red-500 mt-1">
                                  Indisponible
                                </p>
                              ):(                               
                                <p className="text-xs text-green-500 mt-1">
                                  Disponible 
                                </p>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  
                  {/* PAGINATION FIXE */}
                    {all.totalPage > 1 && (
                      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 border-t bg-slate-50/50">
                        
                        <button
                          onClick={() =>
                            setPage((prev) => ({
                              ...prev,
                              pageIndex: Math.max(prev.pageIndex - 1, 0),
                            }))
                          }
                          disabled={page.pageIndex === 0}
                          className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        
                        <span>
                          {page.pageIndex + 1} / {all.totalPage}
                        </span>
                        
                        <button
                          onClick={() =>
                            setPage((prev) => ({
                              ...prev,
                              pageIndex: Math.min(prev.pageIndex + 1, all.totalPage - 1),
                            }))
                          }
                          disabled={page.pageIndex === all.totalPage - 1}
                          className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                          <ChevronRight size={14} />
                        </button>
                        
                      </div>
                    )}
                </div>
              </div>

              {/* RIGHT */}
              <div className={`col-span-4 bg-gray-50 p-4 rounded-lg flex flex-col border 1 border-gray-200 transition ${
                      !selectedTable ? "opacity-40 pointer-events-none" : ""
                    }`}>
                <h2 className="font-semibold mb-3">Commande en cours</h2>

                <div className="flex-1 space-y-2">
                  {paginatedOrder.map((item) => (
                    <div
                      key={item.dish.dishID}
                      className="flex justify-between items-center bg-white p-2 rounded border"
                    >
                      <div>
                        <p>{item.dish.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.dish.price?.price.toLocaleString()} Ar
                        </p>
                      </div>

                      <div className="flex gap-1 items-center">
                        <button onClick={() => decrease(item.dish.dishID!)} className="w-6 h-6 flex items-center justify-center px-1 bg-gray-200 rounded" > 
                          <Minus size={15}/> 
                        </button>
                        {item.quantity}
                        <button onClick={() => increase(item.dish.dishID!)} className="w-6 h-6 flex items-center justify-center px-1 bg-gray-200 rounded" > 
                          <Plus size={15} /> 
                        </button>
                        <button onClick={() => removeItem(item.dish.dishID!)} className="text-red-500 text-xs" > 
                          <X size={15} className="w-6 h-6 text-white bg-red-500 rounded" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION ORDER */}
                {totalOrderPages > 1 && (
                  <div className="flex justify-center gap-2 mt-2">
                    <button onClick={() => setOrderPage((p) => Math.max(p - 1, 1))} className="px-3 py-1 border rounded">
                      <ChevronLeft size={14} />
                    </button>
                    <span>{orderPage} / {totalOrderPages}</span>
                    <button onClick={() => setOrderPage((p) => Math.min(p + 1, totalOrderPages))} className="px-3 py-1 border rounded">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}

                <div className="mt-4 border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{total.toLocaleString()} Ar</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
}