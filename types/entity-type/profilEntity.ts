import { CompanyEntity } from "./companyEntity";

export interface ProfilEntity {
    profilID: string|null,
    company: CompanyEntity,
    name: string,
    authority: number,
}