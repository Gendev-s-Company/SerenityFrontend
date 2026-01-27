import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldConfig } from "@/types/form-type";
import { Pencil } from "lucide-react";


import useForm from "@/hooks/use-form";
import Forms from "../form-component/Forms";


interface UpdateBoxProps<T> {
  body: T,
  onUpdate: (data: T) => void;
  fields?: FieldConfig<T>[]
}
export default function UpdateBox<T>({ body, onUpdate, fields }: UpdateBoxProps<T>) {
  const forms = useForm(body)

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      forms.resetForm();
    }
  };
  const submit = () => {
    onUpdate(forms.getForm)
  }
  return (
    <Dialog onOpenChange={handleOpenChange}>
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
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          {/* <div className="w-full max-w-md"> */}
          <div className="no-scrollbar -mx-4 max-h-[50vh] max-w-md overflow-y-auto px-4">
            {/* utilisation de formulaire générique */}
            <Forms forms={forms} fields={fields} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" onClick={forms.resetForm} variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="cursor-pointer" onClick={submit} >Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
