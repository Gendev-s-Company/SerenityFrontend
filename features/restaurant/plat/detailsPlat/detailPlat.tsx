'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getCurrency } from '@/utils/Util';
import { PlatEntity } from '@/types/entity-type/platEntity';
import { getPlatById } from '@/infrastructure/restaurant/plat/plat/platRequest';
import { getplatLastPriceById } from '@/infrastructure/restaurant/plat/platPrice/platPriceRequest';
import { PlatPriceEntity } from '@/types/entity-type/platPriceEntity';
import PlatPrice from '../platPrice/platPrice';
import PhotoDetailPlat from './photoPlat';

export default function DetailPlat() {
    const platID = useSearchParams().get('dishID');
    const [refresh, setRefresh] = useState<number>(0);

    // const platID = platID;
    const [plat, setPlat] = useState<PlatEntity | null>(null);
    const [lastPrice, setLastPrice] = useState<PlatPriceEntity | null>(null);

    useEffect(() => {
        if (platID) {
            getPlatById(platID).then((data) => {
                setPlat(data);
            })
                .catch((error) => {
                    console.error("Error fetching activity details:", error);
                });
        }
    }, [platID]);


    useEffect(() => {
        if (platID) {
            getplatLastPriceById(platID).then((data) => {
                setLastPrice(data);
            })
                .catch((error) => {
                    console.error("Error fetching activity details:", error);
                });
        }
    }, [platID, refresh]);


    return (
        <>

            <div className="w-full max-w-4xl mx-auto p-6 relative border border-slate-200 rounded-2xl bg-white shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-slate-100 pb-6 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            {plat?.name}
                        </h2>
                        <p className="text-slate-500 mt-1 text-lg">
                            Informations détaillées sur ce plat
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                            À propos
                        </h3>
                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                            {plat?.description || "Aucune description disponible pour ce plat."}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                            Tarification
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {/* Bloc Prix Principal */}
                            <div className="p-4 rounded-xl border border-slate-100 bg-indigo-50/30">
                                <span className="block text-xs font-semibold text-indigo-500 uppercase">Prix :</span>
                                {lastPrice ? (
                                    <div className="mt-1">
                                        <span className="text-2xl font-extrabold text-slate-800">
                                            {getCurrency(lastPrice.price)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="font-bold text-slate-400">Non disponible</span>
                                )}
                            </div>

                            {/* <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold border border-emerald-200">
                                    ✨ Plat disponible
                                </span>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>


            <div className='p-3'><PhotoDetailPlat platID={platID || ""} /></div>
            <div className="w-full max-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
                <h2 className="text-xl font-semibold">Historique de prix</h2>
                <PlatPrice refresh={refresh} setRefresh={setRefresh} PlatId={platID || ""} />
            </div>
        </>
    );
}