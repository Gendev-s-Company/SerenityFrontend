import { CompanyEntity } from "./companyEntity";

export interface TaxEntity {
    taxID: string | null,
    taxRate: number,
    dateTax: Date | string,
    company: CompanyEntity,
    status: number,
    skipValidation?: boolean
}