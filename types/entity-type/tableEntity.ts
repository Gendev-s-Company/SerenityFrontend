
import { TableTypeEntity } from "./tableTypeEntity";

export interface TableEntity {
    tableID: string|null,
    name: string|null,
    description: string|null,
    tabletype: TableTypeEntity,
    capacity: number,
    status: number,
    skipValidation: boolean,

}