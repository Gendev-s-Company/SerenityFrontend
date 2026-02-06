"use client";

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
import './shadcn-big-calendar/shadcn-big-calendar.css'
import CalendarDialog from "./shadcn-big-calendar/CalendarDialog";


const DnDCalendar = withDragAndDrop<CalendarEvent>(
    ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>
);
const localizer = momentLocalizer(moment);

interface CEventsProps {
    works: CalendarEvent[]
}

const Rcalendar = ({ works }: CEventsProps) => {


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

    const handleNavigate = (newDate: Date) => {
        setDate(newDate);
    };

    const handleViewChange = (newView: SetStateAction<View>) => {
        setView(newView);
    };

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedSlot(slotInfo);
    };

    const handleCreateEvent = (data: Calendarbody) => {
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

    return (
        <div className="container mx-auto py-20 px-5">
            <section className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 justify-between">
                    <p className="text-muted-foreground">
                        Add a meeting, workshop, or reminder to the demo.
                    </p>
                    <Button
                        aria-label="Create a new calendar event"
                        onClick={() => setSelectedSlot({ start: new Date(), end: new Date(), slots: [], action: "click" })}
                    >
                        <Plus />
                        Create Event
                    </Button>
                </div>
                <CalendarDialog handleCreateEvent={handleCreateEvent} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
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
