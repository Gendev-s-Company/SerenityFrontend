import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { RestaurantTableEntity } from "@/types/entity-type/restauranTableEntity";
import { TableReservationEntity } from "@/types/entity-type/tableReservationEntity";



const restaurantTableOccupationPath="/restaurant/table/occupation"

export const create = async (body: TableReservationEntity) => {
    return await postCall<TableReservationEntity>(`${restaurantTableOccupationPath}`, body);
}

export const getAllTableAvalaible = async (company: string,state: number[] = [], start:string, end:string) => {
    let param = ''
    state.map((row) => {
        param += '&state='+row
    })

  return await getCall<TableReservationEntity[]>(`${restaurantTableOccupationPath}/avalaible?company=${company}&start=${start}&end=${end}${param}`);
}

export const getAllDisponibility = async (company: string,state: number[] = [], start:string, end:string,type:string|null) => {
    let param = ''
    state.map((row) => {
        param += '&state='+row
    })

  return await getCall<RestaurantTableEntity[]>(`${restaurantTableOccupationPath}/avalaible?company=${company}&start=${start}&end=${end}${param}&type=${type}`);
}


export const getAllDisponibilityByTable = async (idtable: string, start: string, end: string, page: number, size: number) => {
  return await getCall<Page<TableReservationEntity>>(`${restaurantTableOccupationPath}/avalaible/table/${page}/${size}?idtable=${idtable}&start=${start}&end=${end}`);
}