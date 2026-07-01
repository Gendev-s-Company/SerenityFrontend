import { PackEntity } from "./packEntity";
import { RoomEntity } from "./roomEntity";


export interface PackHotelDetailsEntity{
    id: string | null,
    pack?: PackEntity,
    roomID: string,
    duration: number,
    status: number,
    skipValidation: boolean,
    room?:RoomEntity,
}