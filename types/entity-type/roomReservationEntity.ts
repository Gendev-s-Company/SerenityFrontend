import { CustomerEntity } from "./customerEntity";
import { RoomEntity } from "./roomEntity";
import { UserEntity } from "./userEntity";

export interface RoomReservationEntity {
    reservationID: string;
    roomID: string;
    starttime: Date;
    endtime: Date;
    customerID: string;
    price: number;
    accountRated: number;
    accountPaid: number;
    AccountPaimentDeadline: Date;
    userID: string;
    state: number;
    room: RoomEntity;
    user: UserEntity;
    customer: CustomerEntity;

}