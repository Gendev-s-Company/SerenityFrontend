import { CompanyEntity } from "./companyEntity";

export interface TableTypeEntity {
    tabletypeid: string|null,
    name: string,
    description: string,
    company: CompanyEntity,
    status: number,
    skipValidation?: boolean,

}