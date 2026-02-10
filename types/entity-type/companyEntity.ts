export interface CompanyEntity {
    companyID: string|null,
    name: string,
    phone: string,
    mail: string,
    status: number,
    skipValidation?: boolean
}