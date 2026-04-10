'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PhotoDetailTable from './PhotoDetailTable';


import { Button } from '@/components/ui/button';
import { getCurrency } from '@/utils/Util';
import { getTableById } from '@/infrastructure/restaurant/table/tabledetail/tableRequest';
import { RestaurantTableEntity } from '@/types/entity-type/restauranTableEntity';

export default function Detailtable() {
    const tableID = useSearchParams().get('tableID');
    const [refresh, setRefresh] = useState<number>(0);
    const router = useRouter();
    // const navigate = () => router.push('/view/hotel/table/reservation/create?tableid='+tableID)
// ###############################################################################################################

    const [table, settable] = useState<RestaurantTableEntity | null>(null);
    

    useEffect(() => {
        if (tableID) {
            getTableById(tableID).then((data) => {
                settable(data);
            })
                .catch((error) => {
                    console.error("Error fetching table details:", error);
                });
        }
    }, [tableID]);


// ###############################################################################################################


  return (
    <>
        <div className="w-full max-w-4xl mx-auto p-6 relative border border-slate-200 rounded-2xl bg-white shadow-sm">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-slate-100 pb-6 gap-4">
                <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{table?.name}</h2>
                <p className="text-slate-500 mt-1 text-lg">
                    Informations détaillées sur cette table
                </p>
                </div>
                
                {/* BOUTON RÉSERVER - Version Desktop */}
                <Button 
                size="lg"
                // onClick={navigate}
                 className="cursor-pointer hidden md:flex bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                Réserver
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Description */}
                <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">Description</h3>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {table?.description || "Aucune description disponible pour le moment."}
                </p>
                </div>

                {/* Right Side: Details & Stats */}
                <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">{"Détails de la table"}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 p-4 rounded-xl border border-slate-100 bg-indigo-50/30">
                    <span className="block text-xs font-semibold text-indigo-400 uppercase">Catégorie</span>
                    <span className="font-bold text-slate-800">{table?.tabletype.name}</span>
                    <p className="text-sm text-slate-500 mt-1">{table?.tabletype.description}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="block text-xs font-semibold text-slate-400 uppercase">Capacité</span>
                    <span className="text-xl font-bold text-slate-700">{table?.capacity} Pers.</span>
                    </div>

                </div>
                </div>
            </div>

            {/* BOUTON RÉSERVER - Version Mobile (visible seulement sur petit écran) */}
            <div className="mt-8 md:hidden">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-100 transition-transform active:scale-[0.98]">
                Réserver
                </Button>
            </div>
            </div>
        
        <div className='p-3'><PhotoDetailTable tableId={tableID || ""} /></div>
    </>
);
}