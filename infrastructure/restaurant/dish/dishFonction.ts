import { FieldOptions } from "@/types/component-type/form-type";
import { DishEntity } from "@/types/entity-type/dishEntity";


export const convertListToOption = (list: DishEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.dishID) {
            result.push({ id: row.dishID, label: row.name })
        }
    }
    )
    return result;
};