'use client';
import { getActivityById } from '@/infrastructure/hotel/activity/activityRequest';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ActivityEntity } from '@/types/entity-type/activityEntity';
import { getActivityLastPriceById } from '@/infrastructure/hotel/activity/activityPrice/activityPriceRequest';
import { ActivityPriceEntity } from '@/types/entity-type/activityPriceEntity';
import PhotoDetailActivity from './PhotoDetailActivity';
import ActivityPrice from '../activityPrice/ActivityPrice';

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
            <div className="w-full max-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">{activity?.name}</h2>
                    <h1>En savoir plus? Voici quelques informations à propos de cet activité</h1>
                    <p>{activity?.description}</p>
                    <p>Dernier prix : {lastPrice ? `${lastPrice.price} MGA /${lastPrice.hourPrice}h` : 'N/A'}</p>
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