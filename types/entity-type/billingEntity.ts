import { CustomerEntity } from "./customerEntity";

export interface BillingEntity {
    billID: string | null,
    customer: string,
    status: number,
    billingDate: Date,
    dueDate: Date,
    totalAmount: number,
}