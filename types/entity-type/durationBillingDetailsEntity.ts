import { BillingEntity } from "./billingEntity";

export interface DurationBillingDetailsEntity {
    id: string | null,
    serviceName:string,
    serviceCode:string,
    unitPrice: number,
    typeDuration:string,
    startTime: Date,
    endTime: Date,
    bill: BillingEntity,
}