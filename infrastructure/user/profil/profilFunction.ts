import { FieldOptions } from "@/types/component-type/form-type";
import { ProfilEntity } from "@/types/entity-type/profilEntity";

export const convertListToOption = (list: ProfilEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.profilID) {
            result.push({ id: row.profilID, label: row.name })
        }
    }
    )
    return result;
}