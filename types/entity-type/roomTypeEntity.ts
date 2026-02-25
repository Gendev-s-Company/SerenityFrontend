import { CompanyEntity } from "./companyEntity";

export interface RoomTypeEntity {
    typeID: string;
    company: CompanyEntity;
    name: string;
    description: string;
}
