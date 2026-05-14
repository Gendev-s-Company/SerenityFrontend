"use client";
import './shadcn-big-calendar/shadcn-big-calendar.css'
import { Calendarbody, CalendarEvent } from "@/components/calendar/calendar-function";
import ShadcnBigCalendar from "@/components/calendar/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import moment from "moment";
import { ComponentType, SetStateAction, useEffect, useMemo, useState } from "react";
import type { CalendarProps, View } from "react-big-calendar";
import { momentLocalizer, SlotInfo, Views } from "react-big-calendar";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CalendarDialog from "./shadcn-big-calendar/CalendarDialog";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { modifyListEvent } from '../../features/users/work/planning/planningFunction';


const DnDCalendar = withDragAndDrop<CalendarEvent>(
    ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>
);
const localizer = momentLocalizer(moment);

interface CEventsProps<T> {
    list: FieldOptions[],
    works: CalendarEvent[],
    fields: FieldConfig<T>[],
    body: T,
    convertionToCalendar: (body: T) => Calendarbody,
    saveToDb: (body: T) => void;
    initForm: (body: T, slot: SlotInfo) => void;
}

function Rcalendar<T>({ list, works, fields, body, convertionToCalendar, saveToDb, initForm }: CEventsProps<T>) {

    const [view, setView] = useState<View>(Views.MONTH);
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>(works);

    const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
    const minTime = new Date();
    minTime.setHours(6, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(18, 0, 0);
    const eventPropGetter: CalendarProps<CalendarEvent>["eventPropGetter"] = (event) => {
        const variant = event.variant;
        return {
            className: `event-variant-${variant}`,
            style: {
                backgroundColor: event.color ? event.color : '#2683fd'
            }
        };
    };
    const eventList = useMemo(() => {
        return modifyListEvent(works, list);
    }, [works, list]);
    useEffect(() => {
        setEvents(eventList);
    }, [eventList]);
    useEffect(() => {
        if (selectedSlot !== null) {
            initForm(body, selectedSlot)

        }
    }, [body, selectedSlot])
    const handleNavigate = (newDate: Date) => {
        setDate(newDate);
    };

    const handleViewChange = (newView: SetStateAction<View>) => {
        setView(newView);
    };

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        if (Views.MONTH === view) {
            slotInfo.start.setHours(6, 0, 0);
            slotInfo.end.setHours(18, 0, 0);
        }
        setSelectedSlot(slotInfo);
    };

    const handleCreateEvent = async (body: T, data: Calendarbody) => {
        const startDate = new Date(data.start);
        const endDate = new Date(data.end);
        const allDaySelection =
            startDate.getHours() === 0 &&
            startDate.getMinutes() === 0 &&
            endDate.getHours() === 0 &&
            endDate.getMinutes() === 0 &&
            endDate.getTime() - startDate.getTime() >= 24 * 60 * 60 * 1000;

        const newEvent: CalendarEvent = {
            title: data.title,
            start: startDate,
            end: endDate,
            allDay: allDaySelection,
            variant: data.variant,
        };
        setEvents((previous) => [...previous, newEvent]);
        await saveToDb(body)
        setSelectedSlot(null);
    };

    const deriveAllDay = (startDate: Date, endDate: Date, isAllDay?: boolean, fallback?: boolean) => {
        if (typeof isAllDay === "boolean") return isAllDay;
        const dayDiff = endDate.getTime() - startDate.getTime();
        const startsAtMidnight =
            startDate.getHours() === 0 &&
            startDate.getMinutes() === 0 &&
            startDate.getSeconds() === 0;
        const endsAtMidnight =
            endDate.getHours() === 0 &&
            endDate.getMinutes() === 0 &&
            endDate.getSeconds() === 0;
        if (startsAtMidnight && endsAtMidnight && dayDiff >= 24 * 60 * 60 * 1000) {
            return true;
        }
        if (!startsAtMidnight || dayDiff < 24 * 60 * 60 * 1000) {
            return false;
        }
        return fallback ?? false;
    };

    const clampToSingleDay = (startDate: Date) => {
        const endOfDay = new Date(startDate);
        endOfDay.setHours(23, 59, 59, 999);
        return endOfDay;
    };

    const handleEventDrop = ({ event, start, end, isAllDay }: EventInteractionArgs<CalendarEvent>) => {
        const nextStart = new Date(start);
        const nextEnd = new Date(end);
        const nextAllDay = deriveAllDay(nextStart, nextEnd, isAllDay, event.allDay);
        const normalizedEnd =
            !nextAllDay && event.allDay && event.end.getTime() - event.start.getTime() >= 24 * 60 * 60 * 1000
                ? clampToSingleDay(nextStart)
                : nextEnd;
        const updatedEvents = events.map((existingEvent) =>
            existingEvent === event
                ? { ...existingEvent, start: nextStart, end: normalizedEnd, allDay: nextAllDay }
                : existingEvent
        );
        setEvents(updatedEvents);
    };

    const handleEventResize = ({ event, start, end, isAllDay }: EventInteractionArgs<CalendarEvent>) => {
        const nextStart = new Date(start);
        const nextEnd = new Date(end);
        const nextAllDay = deriveAllDay(nextStart, nextEnd, isAllDay, event.allDay);
        const updatedEvents = events.map((existingEvent) =>
            existingEvent === event
                ? { ...existingEvent, start: nextStart, end: nextEnd, allDay: nextAllDay }
                : existingEvent
        );
        setEvents(updatedEvents);
    };
    const createEvent = () => {
        const slotInfo: SlotInfo = { start: minTime, end: maxTime, slots: [], action: "click" }
        setSelectedSlot(slotInfo)
    }
    return (
        <div className="container py-6 px-5 space-y-6">
            
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                    Calendrier
                </h1>
            
                <p className="text-sm text-muted-foreground max-w-xl">
                    Ajouter des notes, des rappels ou des tâches à faire dans ce calendrier.
                </p>
            </div>
            
            <Button
                aria-label="Create a new calendar event"
                onClick={createEvent}
                className="rounded-xl px-5 shadow-sm"
            >
                <Plus className="mr-2 h-4 w-4" />
                Créer un événement
            </Button>
        </div>
            
        {/* Dialog */}
        <CalendarDialog
            handleCreateEvent={handleCreateEvent}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            convertionToCalendar={convertionToCalendar}
            fields={fields}
            body={body}
        />
            
        {/* Calendar Container */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm overflow-hidden">
            
            <DnDCalendar
                localizer={localizer}
                style={{ height: 650, width: "100%" }}
                className="rounded-xl"
                selectable
                date={date}
                min={minTime}
                max={maxTime}
                onNavigate={handleNavigate}
                view={view}
                onView={handleViewChange}
                resizable
                draggableAccessor={() => true}
                resizableAccessor={() => true}
                events={events}
                eventPropGetter={eventPropGetter}
                onSelectSlot={handleSelectSlot}
                onEventDrop={handleEventDrop}
                onEventResize={handleEventResize}
            />
        
        </div>
            
        </div>
    );
};

export default Rcalendar;
