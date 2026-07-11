import { BillingEntity } from "./billingEntity";

export interface QuantityBillingDetailsEntity {
    quantityBillingDetailsID: string | null,
    billing: BillingEntity,
    servicename:string,
    quantity: number,
    unitPrice: number,
}