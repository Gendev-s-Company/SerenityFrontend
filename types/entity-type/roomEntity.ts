import { RoomTypeEntity } from "./roomTypeEntity";

export interface RoomEntity {
    roomID: string;
    name: string;
    description: string;
    type: RoomTypeEntity;
    peoples: number;
    bed: number;
    state: number;
    photos: any[];
    roomPrice: any;
}
