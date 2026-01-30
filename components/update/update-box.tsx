import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldConfig } from "@/types/component-type/form-type";
import { Pencil } from "lucide-react";


import useForm from "@/hooks/use-form";
import Forms from "../form-component/Forms";
import Sbutton from "../button/Sbutton";
import { useState } from "react";


interface UpdateBoxProps<T> {
  body: T,
  onUpdate: (data: T) => void;
  fields?: FieldConfig<T>[],
}
export default function UpdateBox<T>({ body, onUpdate, fields}: UpdateBoxProps<T>) {
  const forms = useForm(body)
const [open, setOpen] = useState(false);
  const handleOpenChange = (opens: boolean) => {
    setOpen(opens);
    if (!opens) {
      forms.resetForm();
    }
  };
  const submit = async () => {
    await onUpdate(forms.getForm)
    setTimeout(() => setOpen(false), 500); 
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            className="cursor-pointer"
            size="icon-sm"
            aria-label="Submit"
            variant="outline"
          >
            <Pencil color="#2683fd" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{"Modification d'un"} Enregistrement</DialogTitle>
            <DialogDescription>
              Modifier les champs puis valider pour enregistrer les modifications
            </DialogDescription>
          </DialogHeader>
          {/* <div className="w-full max-w-md"> */}
          <div className="no-scrollbar -mx-4 max-h-[50vh] max-w-md overflow-y-auto px-4">
            {/* utilisation de formulaire générique */}
            <Forms forms={forms} fields={fields} />
          </div>
          <DialogFooter>
              <Button className="cursor-pointer" onClick={() => handleOpenChange(false)} variant="outline">Annuler</Button>
              <Sbutton message="Modification réussi!"  formAction={submit} />
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
