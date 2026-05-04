import { CompanyEntity } from "./companyEntity";
import { RestaurantTableEntity } from "./restauranTableEntity";

export interface TableTypeEntity {
    tabletypeid: string|null,
    name: string,
    description: string,
    company: CompanyEntity,
    status: number,
    tables: RestaurantTableEntity[] | null,
    skipValidation?: boolean,

}