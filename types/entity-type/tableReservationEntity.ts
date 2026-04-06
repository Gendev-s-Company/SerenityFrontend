import { CustomerEntity } from "./customerEntity";
import { RoomEntity } from "./roomEntity";
import { TableEntity } from "./tableEntity";
import { UserEntity } from "./userEntity";

export interface TableReservationEntity {
    occupationID: string;
    tableID: string;
    starttime: Date;
    endtime: Date;
    customerID: string;
    userID: string;
    state: number;
    table: TableEntity
    room: RoomEntity;
    user: UserEntity;
    customer: CustomerEntity;

}