import { CompanyEntity } from "./companyEntity";
import { ActivityEntity } from "./activityEntity";
import { CustomerEntity } from "./customerEntity";

export interface ActivityOrderEntity {
    acOrderID: string|null,
    activity: ActivityEntity,
    customer: CustomerEntity,
    price: number,
    duration: number,
    dateOrder: string,



}