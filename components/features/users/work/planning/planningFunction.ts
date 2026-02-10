import { CalendarEvent, simpleTransform } from "@/components/calendar/calendar-function";
import { FieldOptions } from "@/types/component-type/form-type";
import { WorkSchedule } from "@/types/entity-type/workschedule";

export function convertListToEvent(list: WorkSchedule[]): CalendarEvent[]{
    const result:CalendarEvent[] = []
    list.map((row) => {
        result.push({
            title: row.userID,
            start: simpleTransform(row.starttime),
            end: simpleTransform(row.endtime!),
            color:row.color
        })
    })
    return result;
}

// modifie les evenement pour afficher le nom
export const modifyListEvent = (events: CalendarEvent[], options:FieldOptions[]) => {
    const result:CalendarEvent[] = []
    events.map((row) => {
        const found = findOne(options, row.title)
        result.push({
            title: found ? found.label : row.title,
            start: row.start,
            end: row.end,
            color:row.color
        })
    })
    return result;
}

function findOne (options:FieldOptions[], id:string):FieldOptions | undefined{
    return options.find((row) => row.id === id)
}