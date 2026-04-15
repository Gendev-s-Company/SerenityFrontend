import { CustomerEntity } from "./customerEntity";
import { TableEntity } from "./tableEntity";
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
    table?: TableEntity,
    user?: UserEntity,
    customer?: CustomerEntity
}
