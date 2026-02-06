
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { EventForm } from "./event-form";
import { SlotInfo } from "react-big-calendar";
import { Calendarbody } from "../calendar-function";

export interface CdialogProps {
    selectedSlot:SlotInfo | null;
    setSelectedSlot: (param: SlotInfo|null) => void;
    handleCreateEvent: (data: Calendarbody) => void;
}

export default function CalendarDialog({selectedSlot,setSelectedSlot,handleCreateEvent}: CdialogProps) {
    return (
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
    )
}