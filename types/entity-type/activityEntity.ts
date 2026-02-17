import { CompanyEntity } from "./companyEntity";

export interface ActivityEntity {
    activityID: string|null,
    company: CompanyEntity,
    name: string,
    description: string,
    skipValidation: boolean,

}