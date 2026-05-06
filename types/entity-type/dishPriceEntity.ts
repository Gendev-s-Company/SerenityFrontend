import { DishEntity } from "./dishEntity";

export interface DishPriceEntity {   
    priceID: string|null,
    dish: DishEntity|null,
    price: number,
    datechanged: Date,
    status: number,
}