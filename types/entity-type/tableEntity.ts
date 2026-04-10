
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

export interface DisponibilityEntity{
    tableID: string,
    name: string,
    table_state:number,
    reservation_state:number,
    actual_arrival:string|null,
    actual_departure:string|null,
    day:string|null,
}
