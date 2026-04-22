import { CustomerEntity } from "./customerEntity";
import { RestaurantTableEntity } from "./restauranTableEntity";
import { UserEntity } from "./userEntity";

export interface ReservationTableEntity {
    tableID: string,
    starttime: string,
    endtime: string,
    customerID: string,
    userID: string,
    state: string,
    status: number,
    skipValidation: boolean,
    table?: RestaurantTableEntity,
    user?: UserEntity,
    customer?: CustomerEntity
}
