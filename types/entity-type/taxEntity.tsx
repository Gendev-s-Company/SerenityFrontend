import { CompanyEntity } from "./companyEntity";

export interface TaxEntity {
    taxID: string | null,
    taxRate: number,
    datetax: Date | string,
    companyID: string,
    status: number,
    skipValidation?: boolean
}