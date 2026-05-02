import { DishEntity } from "./dishEntity";
import { UserEntity } from "./userEntity";

export interface DishOrderDetailsEntity {
    orderDetailsID: string|null,
    dish: DishEntity|null,
    orderID: string|null,
    unitPrice: number,
    quantity: number,
    user:UserEntity,
    dateOrder:string,
    state:number,
    status:number,
    skipValidation: boolean,
}