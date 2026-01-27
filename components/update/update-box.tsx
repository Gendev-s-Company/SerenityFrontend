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
import { Input } from "@/components/ui/input";
import { FieldConfig } from "@/types/form-type";
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import useForm from "@/hooks/use-form";


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
            <form>
              <FieldGroup>
                <FieldSet>
                  <FieldGroup>
                    {/* début boucle */}
                    {fields?.map((row, index) => {
                      const fieldName = row.name as keyof T;
                      return (
                        <div key={index}>
                          {row.normal ?
                            <Field>
                              <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                {row.libelle}
                              </FieldLabel>
                              <Input
                                id="checkout-7j9-card-name-43j"
                                name={row.name as string || ""}
                                type={row.type}
                                // value={row.type === 'datetime-local' ? formatDateForInput(form[row.name]) : form[row.name]}
                                value={forms.getForm[fieldName] as string}
                                onChange={(e) => forms.handleInputChange(fieldName, e.target.value as T[keyof T])}
                                placeholder={"Entrez " + row.libelle}
                                required
                              />
                            </Field>
                            :
                            row.type === 'select' && row?.items && (
                              <Field>
                                <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                                  {row.libelle}
                                </FieldLabel>
                                <Select
                                  value={forms.getForm[fieldName] as string || ""}
                                  onValueChange={(e) => forms.handleInputChange(fieldName, e as T[keyof T])}
                                >
                                  <SelectTrigger id="checkout-7j9-exp-year-f59">
                                    <SelectValue placeholder={"veuillez choisir le " + row.name.toString()} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {row.items.map((r) => (
                                        <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </Field>)
                          }

                        </div>
                      )
                    })}
                    {/* fin boucle */}
                  </FieldGroup>
                </FieldSet>

                {/* <FieldSeparator /> */}
                {/* <FieldSet>
                  <FieldGroup>
                    <Field orientation="horizontal">
                      <Checkbox
                        id="checkout-7j9-same-as-shipping-wgm"
                        defaultChecked
                      />
                      <FieldLabel
                        htmlFor="checkout-7j9-same-as-shipping-wgm"
                        className="font-normal"
                      >
                        Same as shipping address
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </FieldSet> */}
              </FieldGroup>
            </form>
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
