import { Input } from "@/components/ui/input";
import { FieldConfig } from "@/types/form-type";
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
import { UseFormReturn } from "@/hooks/use-form";


interface FormsProps<T> {
  forms: UseFormReturn<T>;
  fields?: FieldConfig<T>[];
}
export default function Forms<T>({ forms, fields }: FormsProps<T>) {
  return (
    <form>
      {/* <div className="w-full max-w-md"> */}
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
                        value={forms.getForm && forms.getForm[fieldName] as string}
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
  )
}
