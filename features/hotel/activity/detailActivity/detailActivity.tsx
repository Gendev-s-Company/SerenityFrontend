'use client';
import { getActivityById } from '@/infrastructure/hotel/activity/activityRequest';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ActivityEntity } from '@/types/entity-type/activityEntity';
import { getActivityLastPriceById } from '@/infrastructure/hotel/activity/activityPrice/activityPriceRequest';
import { ActivityPriceEntity } from '@/types/entity-type/activityPriceEntity';
import PhotoDetailActivity from './PhotoDetailActivity';
import ActivityPrice from '../activityPrice/ActivityPrice';
import { getCurrency } from '@/utils/Util';

export default function DetailActivity() {
    const activityID = useSearchParams().get('activityID');
    const [refresh, setRefresh] = useState<number>(0);

    // const activityID = activityId;
    const [activity, setActivity] = useState<ActivityEntity | null>(null);
    const [lastPrice, setLastPrice] = useState<ActivityPriceEntity | null>(null);

    useEffect(() => {
        if (activityID) {
            getActivityById(activityID).then((data) => {
                setActivity(data);
            })
                .catch((error) => {
                    console.error("Error fetching activity details:", error);
                });
        }
    }, [activityID]);


    useEffect(() => {
        if (activityID) {
            getActivityLastPriceById(activityID).then((data) => {
                setLastPrice(data);
            })
                .catch((error) => {
                    console.error("Error fetching activity details:", error);
                });
        }
    }, [activityID, refresh]);


    return (
        <>

            <div className="w-full max-w-4xl mx-auto p-6 relative border border-slate-200 rounded-2xl bg-white shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-slate-100 pb-6 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            {activity?.name}
                        </h2>
                        <p className="text-slate-500 mt-1 text-lg">
                            Informations détaillées sur cette activité
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                            À propos
                        </h3>
                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                            {activity?.description || "Aucune description disponible pour cette activité."}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                            Tarification & Infos
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {/* Bloc Prix Principal */}
                            <div className="p-4 rounded-xl border border-slate-100 bg-indigo-50/30">
                                <span className="block text-xs font-semibold text-indigo-500 uppercase">Prix actif:</span>
                                {lastPrice ? (
                                    <div className="mt-1">
                                        <span className="text-2xl font-extrabold text-slate-800">
                                            {getCurrency(lastPrice.price)}
                                        </span>
                                        <span className="text-slate-500 ml-2">
                                            pour {lastPrice.hourPrice}h de prestation
                                        </span>
                                    </div>
                                ) : (
                                    <span className="font-bold text-slate-400">Non disponible</span>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold border border-emerald-200">
                                    ✨ Activité disponible
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className='p-3'><PhotoDetailActivity activityId={activityID || ""} /></div>
            <div className="w-full max-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
                <h2 className="text-xl font-semibold">Historique de prix</h2>
                <ActivityPrice refresh={refresh} setRefresh={setRefresh} activityId={activityID || ""} />
            </div>
        </>
    );
}