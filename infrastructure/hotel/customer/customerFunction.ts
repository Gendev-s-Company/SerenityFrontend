import { FieldOptions } from "@/types/component-type/form-type";
import { CustomerEntity } from "@/types/entity-type/customerEntity";

export const convertListToOption = (list: CustomerEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.customerID) {
            result.push({ id: row.customerID, label: row.name })
        }
    }
    )
    return result;
}