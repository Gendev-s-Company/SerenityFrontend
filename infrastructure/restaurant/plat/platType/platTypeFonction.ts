import { FieldOptions } from "@/types/component-type/form-type";
import { PlatTypeEntity } from "@/types/entity-type/platTypeEntity";

export const convertListToOption = (list: PlatTypeEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.typeID) {
            result.push({ id: row.typeID, label: row.name })
        }
    }
    )
    return result;
};