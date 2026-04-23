import { PlatEntity } from "./platEntity";

export interface PlatPriceEntity {
    priceID: string | null,
    // dish: PlatEntity,
    dishID: string
    price: number,
    dateChanged:Date,
    status: number,
    skipValidation: boolean,
}