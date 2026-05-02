import { DishPriceEntity } from "./dishPriceEntity";
import { DishTypeEntity } from "./dishTypeEntity";

export interface DishEntity {   
    dishID: string|null,
    name: string,
    description: string| null,
    type: DishTypeEntity |null,
    state: number
    status: number,
    photo: string | null,
    price:DishPriceEntity|null,
    skipValidation: boolean,
}