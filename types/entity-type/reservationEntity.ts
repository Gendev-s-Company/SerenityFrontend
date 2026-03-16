import { CustomerEntity } from "./customerEntity";
import { RoomEntity } from "./roomEntity";
import { UserEntity } from "./userEntity";

export interface ReservationEntity {
    roomID: string,
    starttime: string,
    endtime: string,
    customerID: string,
    accountRated: string,
    accountPaid: string,
    AccountPaimentDeadline: string,
    userID: string,
    state: string,
    status: number,
    skipValidation: boolean,
    room?: RoomEntity,
    user?: UserEntity,
    customer?: CustomerEntity
}

export interface ResaValidatorResult {
    totalPrice: number,
    accompte: number,
    deadline: string
}

export interface ResaValidator {
    roomid: string,
    start: string,
    end: string
}