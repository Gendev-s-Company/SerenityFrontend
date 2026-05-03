import { CompanyEntity } from "./companyEntity";
import { DishEntity } from "./dishEntity";

export interface DishTypeEntity {
    typeID:string |null,
    name: string,
    description: string| null,
    company:CompanyEntity,
    status: number,
    dishes: DishEntity[] | null,
    skipValidation: boolean,
}