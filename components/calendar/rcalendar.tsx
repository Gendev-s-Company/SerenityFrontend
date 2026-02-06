"use client";

import { Calendarbody, CalendarEvent } from "@/components/calendar/calendar-function";
import ShadcnBigCalendar from "@/components/calendar/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import moment from "moment";
import { ComponentType, SetStateAction, useEffect, useState } from "react";
import type { CalendarProps, View } from "react-big-calendar";
import { momentLocalizer, SlotInfo, Views } from "react-big-calendar";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import './shadcn-big-calendar/shadcn-big-calendar.css'
import CalendarDialog from "./shadcn-big-calendar/CalendarDialog";
import { FieldConfig } from "@/types/component-type/form-type";


const DnDCalendar = withDragAndDrop<CalendarEvent>(
    ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>
);
const localizer = momentLocalizer(moment);

interface CEventsProps<T> {
    works: CalendarEvent[],
    fields: FieldConfig<T>[],
    body: T,
    convertionToCalendar: (body: T) => Calendarbody,
    saveToDb: (body: T) => void;
    initForm: (body: T, slot: SlotInfo) => void;
}

function Rcalendar<T>({ works, fields, body, convertionToCalendar, saveToDb, initForm }: CEventsProps<T>) {

    const [view, setView] = useState<View>(Views.MONTH);
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>(works);

    const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

    const eventPropGetter: CalendarProps<CalendarEvent>["eventPropGetter"] = (event) => {
        const variant = event.variant;
        return {
            className: `event-variant-${variant}`,
            style: {
                backgroundColor: event.color ? event.color : '#2683fd'
            }
        };
    };
    useEffect(() => {
        setEvents(works);
    }, [works]);
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
        const slotInfo: SlotInfo = { start: new Date(), end: new Date(), slots: [], action: "click" }
        setSelectedSlot(slotInfo)
    }
    return (
        <div className="container mx-auto py-20 px-5">
            <section className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 justify-between">
                    <p className="text-muted-foreground">
                        Add a meeting, workshop, or reminder to the demo.
                    </p>
                    <Button
                        aria-label="Create a new calendar event"
                        onClick={createEvent}
                    >
                        <Plus />
                        Create Event
                    </Button>
                </div>
                <CalendarDialog
                    handleCreateEvent={handleCreateEvent}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                    convertionToCalendar={convertionToCalendar}
                    fields={fields}
                    body={body}
                />
                <DnDCalendar
                    localizer={localizer}
                    style={{ height: 600, width: "100%" }}
                    className="border-border border-rounded-md border-solid border-2 rounded-lg"
                    selectable
                    date={date}
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
            </section>
        </div>
    );
};

export default Rcalendar;
