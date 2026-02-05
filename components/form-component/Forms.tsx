import { Input } from "@/components/ui/input";
import { FieldConfig, UseFormReturn } from "@/types/component-type/form-type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

interface FormsProps<T> {
  forms: UseFormReturn<T>;
  fields?: FieldConfig<T>[];
}

export default function Forms<T>({ forms, fields }: FormsProps<T>) {
  
  // Formate la date pour l'input HTML (format YYYY-MM-DD)
  const formatDateForInput = (value: unknown): string => {
    if (!value) return "";
    const d = new Date(value as string | number | Date);
    // console.log(value);
    
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            {fields?.map((row, index) => {
              const fieldName = row.name as keyof T;
              const fieldValue = forms.getForm[fieldName];
              const uniqueId = `field-${String(fieldName)}-${index}`;
                
              return (
                <div key={uniqueId}>
                  {row.normal ? (
                    <Field>
                      <FieldLabel htmlFor={uniqueId}>
                        {row.libelle}
                      </FieldLabel>
                      <Input
                        id={uniqueId}
                        name={String(fieldName)}
                        type={row.type}
                        value={
                          row.type === 'date'
                            ? formatDateForInput(fieldValue)
                            : (fieldValue as string)
                        }
                        onChange={(e) => 
                          forms.handleInputChange(fieldName, e.target.value as T[keyof T])
                        }
                        placeholder={"Entrez " + row.libelle}
                        required
                      />
                    </Field>
                  ) : (
                    row.type === 'select' && row.items && (
                      <Field>
                        <FieldLabel htmlFor={uniqueId}>
                          {row.libelle}
                        </FieldLabel>
                        <Select
                          // Extraction de la valeur d'affichage (ID)
                          value={
                            row.objectMapping && fieldValue && typeof fieldValue === 'object'
                              ? String((fieldValue as Record<string, unknown>)[row.objectMapping.idKey])
                              : (fieldValue as string)
                          }
                          onValueChange={(selectedId) => {
                            const selectedOption = row.items && row.items.find((opt) => opt.id === selectedId);
                            if (!selectedOption) return;

                            if (row.objectMapping) {
                              // Reconstruction de l'objet (ex: profil)
                              const currentObj = (fieldValue && typeof fieldValue === 'object')
                                ? (fieldValue as Record<string, unknown>)
                                : {};

                              const updatedValue = {
                                ...currentObj,
                                [row.objectMapping.idKey]: selectedOption.id,
                                [row.objectMapping.labelKey]: selectedOption.label,
                              };

                              forms.handleInputChange(fieldName, updatedValue as T[keyof T]);
                            } else {
                              // Cas string simple
                              forms.handleInputChange(fieldName, selectedId as T[keyof T]);
                            }
                          }}
                        >
                          <SelectTrigger id={uniqueId}>
                            <SelectValue placeholder={"Choisir " + row.libelle} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {row.items.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    )
                  )}
                </div>
              );
            })}
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}