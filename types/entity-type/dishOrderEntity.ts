import { DishOrderDetailsEntity } from "./dishOrderDetailsEntity";
import { TableReservationEntity } from "./tableReservationEntity";

export interface DishOrderEntity {
    orderID: string|null,
    tableOccupation: TableReservationEntity|null,
    totalPrice: number,
    dateOrder:Date,
    state:number,
    status:number,
    details:DishOrderDetailsEntity[],
    skipValidation: boolean,

}