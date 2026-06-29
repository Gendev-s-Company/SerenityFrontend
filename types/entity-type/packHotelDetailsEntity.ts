import { PackEntity } from "./packEntity";


export interface PackHotelDetailsEntity{
    id: string | null,
    pack?: PackEntity,
    roomID: string,
    duration: number,
    status: number,
    skipValidation: boolean,
}