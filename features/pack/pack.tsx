"use client";

import { deletePack, getPaginatePack, updatePack } from "@/infrastructure/pack/packRequest";
import { PageType } from "@/types/component-type/PageType";
import { PackEntity } from "@/types/entity-type/packEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { BadgePercent, CalendarClock, ChevronLeft, ChevronRight, CircleCheck, CircleX, Edit, Hotel, Info, Package, Percent, Plus, Search, Sparkles, Trash, UtensilsCrossed } from "lucide-react";

import DeleteBox from "@/components/delete/delete-box";
import PackDetails from "./packDetails/packDetails";
import { timestampToText } from "@/utils/Util";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AddPackDetails } from "./packDetails/addPackDetails";

const tags = {
  reduction: "bg-amber-50 text-amber-800 border border-amber-300",
  periode: "bg-blue-50 text-blue-800 border border-blue-200",
  actif: "bg-green-50 text-green-800 border border-green-300",
  inactif: "bg-red-50 text-red-800 border border-red-200",
};

function EntityBadge({ count, label, icon, className }: {
  count: number; label: string; icon: React.ReactNode; className: string;
}) {
  if (!count) return null;
  return (
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${className}`}>
                    {icon}
                    {count}
                  </span>                  
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-white text-gray-700 border border-gray-200 shadow-lg">
                <p>{count} avantage{count > 1 ? "s":""} {label} inclus</p>
              </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    
  );
}


export default function Pack(){
    const user = getLocalStorage();
    const [pack, setPack]= useState<PackEntity[]>([]);
    const [refresh, setRefresh]= useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSize,
    })

    const [all, setAll] = useState<PageType>({
      totalElement: 0,
      totalPage: 0,
    })

    const [openDetails, setOpenDetails] = useState(false);
    const [openModalAddPack, setOpenModalAddPack] = useState(false);
    const [selectedPack,setSelectedPack]=useState<PackEntity|null>();
    const [search, setSearch] = useState("");    

    const filtered = pack.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    // Liste des packs
    useEffect(()=>{
        setLoading(true);
        if (user && user.profil.company.companyID){
            getPaginatePack(user.profil.company.companyID,page.pageIndex,page.pageSize)
            .then((data)=>{
                setPack(data.content);
                  setAll({
                    totalElement: data.page.totalElements,
                    totalPage: data.page.totalPages,
                  })
                setLoading(false);
            })
            .catch((error)=>{
                console.error("Error fetching packs.",error);
                setLoading(false);
            })
        }
    },[refresh, page])
    
    const onDelete = async (id: string | null) => {
      if (id !== null) {
        await deletePack(id);
        setRefresh((prev) => prev + 1);
      }
    };

    const handleViewDetails = (pack: PackEntity) => {
      setSelectedPack(pack);
      setOpenDetails(true);
    };

    const handleAddPack = () => {
      setOpenModalAddPack(true);
    };

    // const handleUpdatePack = (pack: PackEntity) => {
    //   setSelectedPack(pack);
    //   setOpenModalAddPack(true);
    // };

    return (
    <div className="container mx-auto py-10 px-3">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 border rounded-xl bg-slate-50/50 py-10 px-4">
        <h2 className="text-xl font-semibold">{"Liste des packs"}</h2>
        {/* Barre d'outils */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un pack..."
              value={search}
              onChange={(e) => { setSearch(e.target.value)}}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button
            // onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium rounded-full border border-slate-500 text-white bg-slate-500 hover:bg-slate-600 transition-colors"
            onClick={() => handleAddPack()}
          >
            <Plus size={15} /> 
          </button>
        </div>
        
        {/* Liste */}
        <div className="relative border rounded-xl bg-slate-50/50 flex flex-col gap-3 p-3">
          {filtered.map((pack) => (
            <div
              key={pack.packID}
              className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-2.5">
                  <p className="font-semibold text-gray-900 flex items-center gap-2 m-0">
                    <Package size={17} className="text-gray-400" />
                    {pack.title}
                  </p>
                  <span className="text-xs font-medium text-gray-400">inclus :</span>
                  <EntityBadge count={pack.activityPack?.length ?? 0} label="activité" icon={<Sparkles size={12} />} className="bg-purple-500 text-white border-purple-50" />
                  <EntityBadge count={pack.hotelsPack?.length ?? 0} label="hôtel" icon={<Hotel size={12} />} className="bg-blue-500 text-white border-blue-50" />
                  <EntityBadge count={pack.restoPack?.length ?? 0} label="resto" icon={<UtensilsCrossed size={12} />} className="bg-orange-500 text-white border-orange-50" />
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${tags.reduction}`}>
                    <BadgePercent size={13} /> -{pack.discount}%
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${tags.periode}`}>
                    <CalendarClock size={13} /> {timestampToText(pack.startDate)} → {timestampToText(pack.endDate)}
                  </span>
                  {pack.status === 0 ? (
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${tags.actif}`}>
                      <CircleCheck size={13} /> Actif
                    </span>
                  ) : (
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${tags.inactif}`}>
                      <CircleX size={13} /> Inactif
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  className="p-1.5 rounded-md border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors" aria-label="Voir les détails"
                  onClick={() => handleViewDetails(pack)} 
                  >
                  <Info size={15} />
                </button>
                {/* <button 
                  className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" aria-label="Modifier"
                  onClick={() => handleUpdatePack(pack)}
                >
                  <Edit size={15} />
                </button> */}
                <DeleteBox id={pack.packID!} onDelete={() => onDelete(pack.packID)} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {all.totalPage > 1 && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{filtered.length} élément{filtered.length > 1 ? "s" : ""}</span>
            <div className="flex items-center gap-1">
              <button
                disabled={page.pageIndex === 0}
                onClick={() =>
                  setPage((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                  }))
                }               
                className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Page précédente"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: all.totalPage }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage((prev) => ({ ...prev, pageIndex: n - 1 }))}
                  className={`w-8 h-8 rounded-md border text-xs font-medium transition-colors ${
                    n === page.pageIndex + 1
                      ? "border-blue-200 bg-blue-50 text-blue-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                disabled={page.pageIndex + 1 >= all.totalPage}
                onClick={() =>
                  setPage((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }))
                }
                className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Page suivante"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ajout de nouveau pack */}
      <AddPackDetails  openPacks={openModalAddPack} onOpenChange={setOpenModalAddPack} packToEdit={selectedPack} onSuccess={() => setRefresh((prev) => prev + 1)} />

      {/* Detail d'un pack */}
      <PackDetails pack={selectedPack!} open={openDetails} onOpenChange={setOpenDetails} />
    </div>
    );
}