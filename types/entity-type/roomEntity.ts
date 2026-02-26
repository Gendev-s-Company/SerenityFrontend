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
}