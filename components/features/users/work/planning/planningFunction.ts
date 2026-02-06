import { CalendarEvent, simpleTransform } from "@/components/calendar/calendar-function";
import { WorkSchedule } from "@/types/entity-type/workschedule";

export function convertListToEvent(list: WorkSchedule[]): CalendarEvent[]{
    const result:CalendarEvent[] = []
    list.map((row) => {
        result.push({
            title: row.userID,
            start: simpleTransform(row.starttime),
            end: simpleTransform(row.endtime!),
        })
    })
    return result;
}