import { CustomerEntity } from "./customerEntity";

export interface BillingEntity {
    billID: string | null,
    customerID: string,
    taxe: number,
    status: number,
    billingDate: Date,  
    dueDate: Date,
    totalAmount: number,
}