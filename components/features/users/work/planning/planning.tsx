"use client";

import { getAllworkSC } from '@/infrastructure/user/workschedule/workscheduleRequest';
import { WorkSchedule } from '@/types/entity-type/workschedule';
import { getLocalStorage } from '@/utils/storage';
import { useEffect, useState } from "react";
import { convertListToEvent } from './planningFunction';
import { CalendarEvent } from '@/components/calendar/calendar-function';
import Rcalendar from '@/components/calendar/rcalendar';


const Planning = () => {
    const [works, setWorks] = useState<CalendarEvent[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const user = getLocalStorage()
    useEffect(() => {
        getAllworkSC()
            .then((data) => {
                const events = convertListToEvent(data)
                console.log(events);
                console.log(data);
                

                setWorks(events);
            })
            .catch((error) => console.error("Error fetching profils:", error));
    }, [refresh]);
    return (
        <div>
            <Rcalendar works={works} />
        </div>
    )
}

export default Planning