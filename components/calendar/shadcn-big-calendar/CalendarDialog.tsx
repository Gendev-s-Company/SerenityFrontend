
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { EventForm } from "./event-form";
import { SlotInfo } from "react-big-calendar";
import { Calendarbody, CalendarEvent } from "../calendar-function";
import { FieldConfig } from "@/types/component-type/form-type";
import useForm from "@/hooks/use-form";
import { Button } from "@/components/ui/button";
import Sbutton from "@/components/button/Sbutton";
import Forms from "@/components/form-component/Forms";

export interface CdialogProps<T> {
    selectedSlot: SlotInfo | null;
    setSelectedSlot: (param: SlotInfo | null) => void;
    handleCreateEvent: (body: T,data: Calendarbody) => void;
    body: T,
    convertionToCalendar: (body: T) => Calendarbody,
    fields: FieldConfig<T>[]
}

export default function CalendarDialog<T>({ selectedSlot, setSelectedSlot, handleCreateEvent, body, fields,convertionToCalendar }: CdialogProps<T>) {

    const forms = useForm(body)
    
    const submit = async () => {
        const event = convertionToCalendar(forms.getForm)
        await handleCreateEvent(forms.getForm,event)
        setTimeout(() => setSelectedSlot(null), 500);
        forms.resetForm()
    }
    const cancel = () => {
        setSelectedSlot(null)
        forms.resetForm()
    }
    return (
        <Dialog open={selectedSlot !== null} onOpenChange={cancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold tracking-tight">
                        Create Event
                    </DialogTitle>
                </DialogHeader>
                {selectedSlot && (
                    // <EventForm
                    //     start={selectedSlot.start}
                    //     end={selectedSlot.end}
                    //     onSubmit={handleCreateEvent}
                    //     onCancel={() => setSelectedSlot(null)}
                    // />
                    <div className="no-scrollbar max-h-[60vh] max-w-md overflow-y-auto px-4">
                        {/* utilisation de formulaire générique */}
                        <Forms forms={forms} fields={fields} />
                    </div>
                )}
                <DialogFooter>
                    <Button className="cursor-pointer" onClick={cancel} variant="outline">Annuler</Button>
                    <Sbutton message="Création réussi!" formAction={submit} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}