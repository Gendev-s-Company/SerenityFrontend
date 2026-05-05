import { CompanyEntity } from "./companyEntity";
import { PlatCatalogueEntity } from "./platCatalogueEntity";

export interface PlatTypeEntity {
    typeID:string |null,
    company: CompanyEntity,
    name: string,
    description: string| null,
    status: number,
    skipValidation: boolean,
    dishes?:PlatCatalogueEntity[]
}