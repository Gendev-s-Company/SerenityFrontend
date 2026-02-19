'use client';
import { getActivityById } from '@/infrastructure/hotel/activity/activityRequest';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Activity from '../Activity';
import { ActivityEntity } from '@/types/entity-type/activityEntity';

export default function DetailActivity() {
    const searchParams = useSearchParams();
    const activityID = searchParams.get('activityID');
    const [activity, setActivity] = useState<ActivityEntity | null>(null);

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


    return (
        <div>
            <h1>Détails de {activity?.name}</h1>
            <p>{activity?.description}</p>
        </div>
    );
}