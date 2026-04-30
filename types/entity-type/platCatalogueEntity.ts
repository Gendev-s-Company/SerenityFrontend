import { PlatPhotoEntity } from "./platPhotoEntity";
import { PlatPriceEntity } from "./platPriceEntity";
import { PlatTypeEntity } from "./platTypeEntity";

export interface PlatCatalogueEntity {
    dishID: string|null,
    name: string,
    description: string,
    type: PlatTypeEntity,
    status: number,
    state: number,
    photos: PlatPhotoEntity[],
    price : PlatPriceEntity
    skipValidation?: boolean
}