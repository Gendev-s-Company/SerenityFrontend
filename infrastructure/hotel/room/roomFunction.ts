import { FieldOptions } from "@/types/component-type/form-type";
import { RoomTypeEntity } from "@/types/entity-type/roomTypeEntity";

export const convertListToOption = (list: RoomTypeEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.typeID) {
            result.push({ id: row.typeID, label: row.name })
        }
    }
    )
    return result;
}