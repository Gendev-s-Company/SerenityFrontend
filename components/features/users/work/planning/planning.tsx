"use client";

import { createworkSC, getAllworkSC, getAllworkSCByAutority } from '@/infrastructure/user/workschedule/workscheduleRequest';
import { getLocalStorage } from '@/utils/storage';
import { useEffect, useState } from "react";
import { convertListToEvent } from './planningFunction';
import { Calendarbody, CalendarEvent } from '@/components/calendar/calendar-function';
import Rcalendar from '@/components/calendar/rcalendar';
import { WSCNamefield } from '../prep-view-work';
import { WorkSchedule } from '@/types/entity-type/workschedule';
import { SlotInfo } from 'react-big-calendar';


const Planning = () => {
    const [works, setWorks] = useState<CalendarEvent[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const user = getLocalStorage() !
     const body: WorkSchedule = {
        scheduleID: null,
        userID: user.userID!,
        starttime: new Date(),
        endtime: null,
        status: 0
    };
    const [form,setForm] = useState<WorkSchedule>(body)
    useEffect(() => {
        getAllworkSCByAutority(user.userID!)
            .then((data) => {
                const events = convertListToEvent(data)
                setWorks(events);
            })
            .catch((error) => console.error("Error fetching profils:", error));
    }, [refresh]);
   
    const convertionToCalendar = (body: WorkSchedule): Calendarbody => {
        return {
            title: body.userID,
            start: body.starttime.toString(),
            end: body.endtime!.toString(),
            variant: 'primary'
        }
    }
      const onCreate = async (formData: WorkSchedule) => {
        await createworkSC(formData);
        setRefresh((prev) => prev + 1);
      };
      const initForm = (body: WorkSchedule, slot: SlotInfo) => {
        body.starttime = slot.start
        body.endtime = slot.end
        setForm(body)
      }
    return (
        // <div>
            <Rcalendar  initForm={initForm} saveToDb={onCreate} body={form} convertionToCalendar={convertionToCalendar} fields={WSCNamefield} works={works} />
        // </div>
    )
}

export default Planning