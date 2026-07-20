import { BillingEntity } from "./billingEntity";

export interface QuantityBillingDetailsEntity {
    id: string | null,
    bill: BillingEntity,
    serviceName:string,
    serviceCode:string,
    quantity: number,
    unitPrice: number,
}