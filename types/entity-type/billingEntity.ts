import { CompanyEntity } from "./companyEntity";
import { CustomerEntity } from "./customerEntity";
import { DurationBillingDetailsEntity } from "./durationBillingDetailsEntity";
import { QuantityBillingDetailsEntity } from "./quantityBillingDetailsEntity";

export interface BillingEntity {
    billID: string | null,
    customerID: string,
    company?: CompanyEntity,
    customer?:CustomerEntity,
    taxe: number,
    status: number,
    billingDate: string,  
    totalHT?:number,
    totalTTC?:number,
    packID?:string,
    durationsDetails?: DurationBillingDetailsEntity[],
    quantityDetails?:QuantityBillingDetailsEntity[],
    state?:number,
}