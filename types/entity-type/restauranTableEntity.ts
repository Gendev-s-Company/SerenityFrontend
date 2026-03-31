import { TableTypeEntity } from "./tableTypeEntity";

export interface RestaurantTableEntity {
    tableID: string|null,
    name: string,
    description: string,
    tabletype: TableTypeEntity,
    capacity: number,
    status: number,
    skipValidation?: boolean
}