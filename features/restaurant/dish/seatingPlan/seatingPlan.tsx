"use client";
import { getPaginategroupTableTypes } from "@/infrastructure/restaurant/table/tabletype/tableTypeRequest";
import { PageType } from "@/types/component-type/PageType";
import { RestaurantTableEntity } from "@/types/entity-type/restauranTableEntity";
import { TableTypeEntity } from "@/types/entity-type/tableTypeEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UtensilsCrossed,
  Armchair,
  Users,
  CircleDot,
  Info,
} from "lucide-react";

export default function SeatingPlan() {
    const router = useRouter();
    const[tables,setTables]=useState<RestaurantTableEntity[]>([]);
    const[tableTypes,setTableTypes]=useState<TableTypeEntity[]>([]);
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
         getPaginategroupTableTypes(
           user.profil.company.companyID!,
           page.pageIndex,
           page.pageSize,
         )
           .then((data) => {
             setTableTypes(data.content);
            //  setTables(
            //    data.content.flatMap((type) => type.tables || [])
            //  );
             console.log("Fetched tables:", data.content.flatMap((type) => type.tables || []));
             console.log("Fetched table types:", data.content);
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
             console.error("Error fetching table types:", error)
             setLoading(false)
           });
       }
     }, [refresh, page.pageIndex]);

    const renderSeats = (capacity: number) => {
      return (
        <div className="flex justify-center flex-wrap gap-1 mt-1">
          {Array.from({ length: capacity }).map((_, i) => (
            <Armchair key={i} size={12} className="text-gray-500" />
          ))}
        </div>
      );
    };

    const renderSeatsAround = (capacity: number) => {
      const radius = 26; // distance autour de la table
      const center = 32; // centre du conteneur (w-16 = 64px)

      return Array.from({ length: capacity }).map((_, i) => {
        const angle = (2 * Math.PI * i) / capacity;

        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Armchair size={12} className="text-gray-600" />
          </div>
        );
      });
    };


    // Couleur selon statut
  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-green-100 text-green-700";
      case 1:
        return "bg-red-100 text-red-700";
    }
  };

  const handleTableClick = (table: any) => {
      router.push(`/view/restaurant/dishOrder/seatingPlan/details?tableID=${table.tableID}`);
  };



  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-orange-100 border border-orange-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
        <div className="bg-orange-500 p-3 rounded-xl text-white">
          <UtensilsCrossed size={22} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Restaurant</p>
          <h1 className="font-bold text-lg text-orange-700">Plan de table</h1>
        </div>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tableTypes.map((type) => (
            <div
              key={type.tabletypeid}
              className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition"
            >
              {/* HEADER TYPE */}
              <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-2">
                  <CircleDot className="text-orange-500" size={18} />
                  <h2 className="font-semibold text-lg">{type.name}</h2>
                </div>

                {/* BADGE NB TABLES */}
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Users size={14} />
                  {type.tables?.length || 0}
                </div>
              </div>

              {/* TABLES GRID */}
                <div className="grid grid-cols-3 gap-3">
                  {type.tables && type.tables.length > 0 ? (
                    type.tables.map((table) => (
                      <div
                        key={table.tableID}
                        onClick={() => handleTableClick(table)}
                        className={`relative rounded-xl p-3 text-center text-xs font-medium shadow-sm cursor-pointer transition hover:scale-105 ${getStatusColor(
                          table.status
                        )}`}
                      >
                        {/* INFO ICON (top right) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Détails table :", table);
                          }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition"
                          title="Voir détails"
                        >
                          <Info size={14} />
                        </button>
                      
                        <div className="relative w-16 h-16 mx-auto">
                      
                          {/* TABLE (centre) */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                              <CircleDot size={16} />
                            </div>
                          </div>
                      
                          {/* CHAISES */}
                          {renderSeatsAround(table.capacity || 0)}
                        </div>
                      
                        {/* NOM */}
                        <div className="mt-2 font-semibold">{table.name}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm col-span-3 text-center">
                      Aucune table
                    </p>
                  )}
                </div>
              
              {/* FOOTER */}
              <div className="mt-4 text-center text-xs text-gray-400 border-t pt-2">
                Page {page.pageIndex + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page.pageIndex === 0}
          onClick={() =>
            setPage((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex - 1,
            }))
          }
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Précédent
        </button>

        <button
          disabled={page.pageIndex >= all.totalPage - 1}
          onClick={() =>
            setPage((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex + 1,
            }))
          }
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
