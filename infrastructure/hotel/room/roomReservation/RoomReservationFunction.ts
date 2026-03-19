import { FieldOptions } from "@/types/component-type/form-type";
import { RoomReservationEntity } from "@/types/entity-type/roomReservationEntity";


export const convertListToOption = (list: RoomReservationEntity[]): FieldOptions[] => {
    const result: FieldOptions[] = []
    list?.map((row) => {
        if (row.reservationID) {
            result.push({
                id: row.reservationID,label: "" })
        }
    }
    )
    return result;
}
