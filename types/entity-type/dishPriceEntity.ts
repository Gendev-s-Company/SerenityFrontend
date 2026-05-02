import { DishEntity } from "./dishEntity";

export interface DishPriceEntity {   
    priceID: string|null,
    dish: DishEntity,
    price: number,
    datechanged: Date,
    status: number,
}