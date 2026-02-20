'use client';
import { getActivityById } from '@/infrastructure/hotel/activity/activityRequest';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Activity from '../Activity';
import { ActivityEntity } from '@/types/entity-type/activityEntity';
import { getActivityLastPriceById } from '@/infrastructure/hotel/activity/activityPrice/activityPriceRequest';
import { ActivityPriceEntity } from '@/types/entity-type/activityPriceEntity';

interface DetailActivityProps {
  activityId: string;
}
export default function DetailActivity({ activityId }: DetailActivityProps) {
    const activityID = activityId;
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
    }, [activityID]);


    return (
        <div>
            <h1>Détails de {activity?.name}</h1>
            <p>{activity?.description}</p>
            <p>Dernier prix : {lastPrice ? `${lastPrice.price} MGA /${lastPrice.hourPrice}h` : 'N/A'}</p>
        </div>
    );
}