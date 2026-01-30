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
import { Plus } from "lucide-react";


import useForm from "@/hooks/use-form";
import Forms from "../form-component/Forms";
import Sbutton from "../button/Sbutton";
import { useState } from "react";


interface CreateBoxProps<T> {
  body: T,
  onSubmit: (data: T) => void;
  fields?: FieldConfig<T>[],
}
export default function CreateBox<T>({ body, onSubmit, fields}: CreateBoxProps<T>) {
  const forms = useForm(body)
const [open, setOpen] = useState(false);
  const handleOpenChange = (opens: boolean) => {
    setOpen(opens);
    if (!opens) {
      forms.resetForm();
    }
  };
  const submit = async () => {
   await onSubmit(forms.getForm)
    setTimeout(() => setOpen(false), 500); 
    forms.resetForm()
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="rounded-full cursor-pointer"
          >
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{"Création d'un"} Enregistrement</DialogTitle>
            <DialogDescription>
              Remplir les champs pour créer un enregistrement
            </DialogDescription>
          </DialogHeader>
          {/* <div className="w-full max-w-md"> */}
          <div className="no-scrollbar -mx-4 max-h-[50vh] max-w-md overflow-y-auto px-4">
            {/* utilisation de formulaire générique */}
            <Forms forms={forms} fields={fields} />
          </div>
          <DialogFooter>
              <Button className="cursor-pointer" onClick={() => handleOpenChange(false)} variant="outline">Annuler</Button>
              <Sbutton  formAction={submit} />
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
