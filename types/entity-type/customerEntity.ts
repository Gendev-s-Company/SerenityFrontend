import { CompanyEntity } from "./companyEntity";

export interface CustomerEntity {
    customerID: string|null,
    name: string,
    phone: string,
    mail: string,
    cin:string,
    company:CompanyEntity,
    address:string,
    status:number,
    skipValidation: boolean,

}