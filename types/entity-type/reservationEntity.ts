import { CustomerEntity } from "./customerEntity";
import { RoomEntity } from "./roomEntity";
import { UserEntity } from "./userEntity";

export interface ReservationEntity  {
    roomID:string,
    starttime:string,
    endtime:string,
    customerID:string,
    accountRated:string,
    accountPaid:string,
    AccountPaimentDeadline:string,
    userID:string,
    state:string,
    status:number,
    skipValidation: boolean,
    room?:RoomEntity,
    user?:UserEntity,
    customer?:CustomerEntity
}