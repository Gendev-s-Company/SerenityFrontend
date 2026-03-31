import { CompanyEntity } from "./companyEntity";

export interface TableTypeEntity {
    tabletypeid:string |null,
    company: CompanyEntity,
    name: string,
    description: string| null,
    status: number,
    skipValidation: boolean,
}