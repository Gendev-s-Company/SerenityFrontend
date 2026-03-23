import { RoomPhotoEntity } from "./roomPhotoEntity";
import { RoomPriceEntity } from "./roomPriceEntity";
import { RoomTypeEntity } from "./roomTypeEntity";

export interface RoomEntity {
    roomID: string|null,
    name: string|null,
    description: string|null,
    type: RoomTypeEntity,
    peoples: number,
    bed: number,
    state: number,
    status: number,
    skipValidation: boolean,
    photos:RoomPhotoEntity[],
    roomPrice:RoomPriceEntity |null,
}

export interface DisponibilityEntity{
    roomID: string,
    name: string,
    room_state:number,
    reservation_state:number,
    actual_arrival:string|null,
    actual_departure:string|null,
    day:string|null,
}

export interface RoomDisponibilityEntity{
    company: string,
    start: string,
    end:string,
    state:[]|null,
    status:number|null,
}
