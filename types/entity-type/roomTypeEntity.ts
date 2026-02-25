import { CompanyEntity } from "./companyEntity";

export interface RoomTypeEntity {
    typeID:string |null,
    company: CompanyEntity,
    name: string | null,
    description: string| null,
    status: number,
}