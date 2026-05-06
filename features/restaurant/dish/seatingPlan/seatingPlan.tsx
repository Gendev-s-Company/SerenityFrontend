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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function SeatingPlan() {
    const router = useRouter();
    const[tableTypes,setTableTypes]=useState<TableTypeEntity[]>([]);
    // Pagination liste des types de table
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

    // Pagination liste des tables par type de table
    const [pages, setPages] = useState<Record<string, number>>({});
    const ITEMS_PER_PAGE = 5;

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
  <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-gray-50 min-h-screen flex flex-col h-full">

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
      <>
        {/* Container avec hauteur fixe pour 5 éléments */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6" style={{ minHeight: '500px' }}>
          {tableTypes.map((type) => {
            const currentPage = pages[type.tabletypeid!] || 1;
            const tables = type.tables || [];
          
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const paginatedTables = tables.slice(startIndex, startIndex + ITEMS_PER_PAGE);
            const totalPages = Math.ceil(tables.length / ITEMS_PER_PAGE);
          
            return (
              <div
                key={type.tabletypeid}
                className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition flex flex-col h-full"
              >
                {/* HEADER TYPE */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <CircleDot className="text-orange-500" size={18} />
                    <h2 className="font-semibold text-lg">{type.name}</h2>
                  </div>
            
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Users size={14} />
                    {tables.length}
                  </div>
                </div>
            
                {/* TABLES GRID */}
                <div className="flex-1 flex flex-col min-h-[250px]">
                  {tables.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {paginatedTables.map((table) => (
                        <div
                          key={table.tableID}
                          onClick={() => handleTableClick(table)}
                          className={`relative rounded-xl p-3 text-center text-xs font-medium shadow-sm cursor-pointer transition hover:scale-105 ${getStatusColor(
                            table.status
                          )}`}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Détails table :", table);
                            }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition"
                          >
                            <Info size={14} />
                          </button>
                          
                          <div className="relative w-16 h-16 mx-auto">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                                <CircleDot size={16} />
                              </div>
                            </div>
                          
                            {renderSeatsAround(table.capacity || 0)}
                          </div>
                          
                          <div className="mt-2 font-semibold">{table.name}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center border border-dashed rounded-xl bg-gray-50">
                      <p className="text-gray-400 text-sm text-center">
                        Aucune table
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FOOTER PAGINATION */}
                <div className="mt-4 flex justify-between items-center text-xs text-gray-500 border-t pt-2">

                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setPages((prev) => ({
                        ...prev,
                        [type.tabletypeid!]: currentPage - 1,
                      }))
                    }
                    className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <span className="text-sm font-medium bg-white px-3 py-1 rounded-full border shadow-sm">
                    Page {currentPage} / {totalPages || 1}
                  </span>
                  
                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() =>
                      setPages((prev) => ({
                        ...prev,
                        [type.tabletypeid!]: currentPage + 1,
                      }))
                    }
                    className="px-2 py-1 rounded bg-gray-100 disabled:opacity-50"
                  >
                  <ChevronRight className="h-4 w-4" />
                  </button>
                  
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION GLOBALE - Toujours fixée en bas */}
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
            <ChevronLeft className="h-4 w-4" size={14}/>
          </button>

          <span className="text-sm font-medium bg-white px-3 py-1 rounded-full border shadow-sm">
                Page {page.pageIndex+1} / {all.totalPage}
          </span>

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
            <ChevronRight className="h-4 w-4" size={14}/>
          </button>
        </div>
      </>
    )}
  </div>
  );
}
