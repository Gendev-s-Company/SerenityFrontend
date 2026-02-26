import { CompanyEntity } from "./companyEntity";

export interface RoomTypeEntity {
    typeID:string |null,
    company: CompanyEntity,
    name: string,
    description: string| null,
    status: number,
    skipValidation: boolean,
}