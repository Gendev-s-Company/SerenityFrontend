
import { PackEntity } from "./packEntity";

export interface PackeRestoDetailsEntity{
    id: string | null,
    pack?: PackEntity,
    dishID: string,
    quantity: number,
    status: number,
    skipValidation: boolean,

}