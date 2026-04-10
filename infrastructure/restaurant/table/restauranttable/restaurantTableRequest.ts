import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { RestaurantTableEntity,DisponibilityEntity } from "@/types/entity-type/restauranTableEntity";

const restaurantTablePath="/restaurant/table"
export const getAllTable = async (company:string) => {
    return await getCall<RestaurantTableEntity[]>(restaurantTablePath+'/all?company=' + company);
}

export const getPaginateTable = async (company:string, page:number, size:number) => {
    return await getCall<Page<RestaurantTableEntity>>(`${restaurantTablePath}/all/${page}/${size}?company=${company}` );
}

export const getTableById = async (id: string) => {
    return await getCall<RestaurantTableEntity>(`${restaurantTablePath}/${id}`);
}

export const createTable = async (table: RestaurantTableEntity) => {
    return await postCall<RestaurantTableEntity>(restaurantTablePath, table);
}

export const updateTable = async (table: RestaurantTableEntity) => {
    return await putCall<RestaurantTableEntity>(`${restaurantTablePath}/${table.tableID}`, table);
}

export const deleteTable = async (id: string) => {
    return await deleteCall<RestaurantTableEntity>(`${restaurantTablePath}/${id}`);
}

export const getAllDisponibility = async (company: string,state: number[] = [], start:string, end:string,type:string|null) => {
    let param = ''
    state.map((row) => {
        param += '&state='+row
    })
    return await getCall<DisponibilityEntity[]>(`${restaurantTablePath}/avalaible?company=${company}&start=${start}&end=${end}${param}&type=${type}`);
}