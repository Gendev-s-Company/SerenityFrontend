"use client";

import { startOfToday } from "@/components/calendar/calendar-function";
import { EventForm } from "@/components/calendar/shadcn-big-calendar/event-form";
import ShadcnBigCalendar from "@/components/calendar/shadcn-big-calendar/shadcn-big-calendar";
import { ThemeProvider } from "@/components/calendar/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import moment from "moment";
import { ComponentType, SetStateAction, useEffect, useState } from "react";
import type { CalendarProps, View } from "react-big-calendar";
import { momentLocalizer, SlotInfo, Views } from "react-big-calendar";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import './shadcn-big-calendar/shadcn-big-calendar.css'
import { DialogTitle } from "@radix-ui/react-dialog";


const DnDCalendar = withDragAndDrop<CalendarEvent>(
    ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>
);
const localizer = momentLocalizer(moment);

type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    variant?: "primary" | "secondary" | "outline";
    color?: string
};


const Rcalendar = () => {

    const createDate = (dayOffset: number, hours: number, minutes = 0) => {
        const date = new Date(startOfToday);
        date.setDate(startOfToday.getDate() + dayOffset);
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const presetEvents: CalendarEvent[] = [
        {
            title: "Customer onboarding",
            start: createDate(1, 13),
            end: createDate(1, 14),
            variant: "primary",
        },
        {
            title: "Product design sync",
            start: createDate(0, 9, 30),
            end: createDate(0, 10, 30),
            variant: "primary",
            color:'#fdef26'
        },

        {
            title: "Deep work block",
            start: createDate(2, 11),
            end: createDate(2, 13),
            variant: "primary",
        },
        {
            title: "Team offsite",
            start: createDate(-1, 0),
            end: createDate(1, 0),
            allDay: true,
            variant: "primary",
        },
        {
            title: "Retro & planning",
            start: createDate(3, 15),
            end: createDate(3, 16, 30),
            variant: "primary",
        },
        {
            title: "Quarterly roadmap",
            start: createDate(30, 10),
            end: createDate(30, 11, 30),
            variant: "primary",
        },
        {
            title: "Partner demo",
            start: createDate(32, 14),
            end: createDate(32, 15),
            variant: "primary",
        },
        {
            title: "Billing review",
            start: createDate(34, 9),
            end: createDate(34, 10),
            variant: "primary",
        },
        {
            title: "Security tabletop",
            start: createDate(36, 13),
            end: createDate(36, 14, 30),
            variant: "primary",
        },
    ];

    const [view, setView] = useState<View>(Views.MONTH);
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEvents( [...presetEvents])
    }, [])
    const eventPropGetter: CalendarProps<CalendarEvent>["eventPropGetter"] = (event) => {
        const variant = event.variant;
        return {
            className: `event-variant-${variant}`,
            style: {
                backgroundColor: event.color ? event.color : '#2683fd'
            }
        };
    };

    const handleNavigate = (newDate: Date) => {
        setDate(newDate);
    };

    const handleViewChange = (newView: SetStateAction<View>) => {
        setView(newView);
    };

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setSelectedSlot(slotInfo);
    };

    const handleCreateEvent = (data: { title: string; start: string; end: string; variant: CalendarEvent["variant"] }) => {
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
        // <TooltipProvider>
        //     <ThemeProvider
        //         attribute="class"
        //         defaultTheme="system"
        //         enableSystem
        //         enableColorScheme//TransitionOnChange
        //     >
                <div className="container mx-auto py-10 px-3">
                    {/* <header className="max-w-3xl space-y-3">
                        <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">
                            Visualisation emploie du planning
                        </h3>
                    </header> */}
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

                        <Dialog open={selectedSlot !== null} onOpenChange={() => setSelectedSlot(null)}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-semibold tracking-tight">
                                        Create Event
                                    </DialogTitle>
                                </DialogHeader>
                                {selectedSlot && (
                                    <EventForm
                                        start={selectedSlot.start}
                                        end={selectedSlot.end}
                                        onSubmit={handleCreateEvent}
                                        onCancel={() => setSelectedSlot(null)}
                                    />
                                )}
                            </DialogContent>
                        </Dialog>
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

        //     </ThemeProvider>
        // </TooltipProvider>
    );
};

export default Rcalendar;
