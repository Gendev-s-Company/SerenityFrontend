import { ActivityEntity } from "./activityEntity";
import { CustomerEntity } from "./customerEntity";

export interface ActivityOrderEntity {
    acOrderID: string|null,
    activity: ActivityEntity,
    customer: CustomerEntity,
    price: number,
    duration: number,
    dateOrder: string,
    state:string,
    skipValidation: boolean,
    totalPrice?: number,
}

export interface ActivitySearchedField {
    customer?: string,
    min?: string,
    max?: string,
    start?:string,
    end?:string
}