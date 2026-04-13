import { CustomerEntity } from "./customerEntity";
import { RoomEntity } from "./roomEntity";
import { RestaurantTableEntity } from "./restauranTableEntity";
import { UserEntity } from "./userEntity";

export interface TableReservationEntity {
    occupationID: string;
    tableID: string;
    starttime: Date;
    endtime: Date;
    customerID: string;
    userID: string;
    state: number;
    table: RestaurantTableEntity
    room: RoomEntity;
    user: UserEntity;
    customer: CustomerEntity;

}