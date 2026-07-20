import { CompanyEntity } from "./companyEntity";
import { CustomerEntity } from "./customerEntity";
import { DurationBillingDetailsEntity } from "./durationBillingDetailsEntity";
import { QuantityBillingDetailsEntity } from "./quantityBillingDetailsEntity";

export interface BillingEntity {
    billID: string | null,
    customerID: string,
    company?: CompanyEntity,
    taxe: number,
    status: number,
    billingDate: string,  
    totalAmount: number,
    totalHT?:number,
    totalTTC?:number,
    packID?:string,
    durationsDetails?: DurationBillingDetailsEntity[],
    quantityDetails?:QuantityBillingDetailsEntity[],
    state?:number,
}