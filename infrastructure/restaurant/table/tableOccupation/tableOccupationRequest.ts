import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { RestaurantTableEntity } from "@/types/entity-type/restauranTableEntity";



const restaurantTableOccupationPath="/restaurant/table/occupation"



export const getAllTableAvalaible = async (company: string,state: number[] = [], start:string, end:string) => {
    let param = ''
    state.map((row) => {
        param += '&state='+row
    })

  return await getCall<RestaurantTableEntity[]>(`${restaurantTableOccupationPath}/avalaible?company=${company}&start=${start}&end=${end}${param}`);
}

export const getAllDisponibility = async (company: string,state: number[] = [], start:string, end:string,type:string|null) => {
    let param = ''
    state.map((row) => {
        param += '&state='+row
    })

  return await getCall<RestaurantTableEntity[]>(`${restaurantTableOccupationPath}/avalaible?company=${company}&start=${start}&end=${end}${param}&type=${type}`);
}