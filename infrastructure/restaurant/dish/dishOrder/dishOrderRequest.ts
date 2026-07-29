import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { DishOrderDetailsEntity } from "@/types/entity-type/dishOrderDetailsEntity";
import { DishOrderEntity } from "@/types/entity-type/dishOrderEntity";

const dishOrderPath="/restaurant/order"
export const getAllDishOrder = async () => {
    return await getCall<DishOrderEntity[]>(dishOrderPath);
}

export const getPaginateDishOrder = async (page:number, size:number) => {
    return await getCall<Page<DishOrderEntity>>(`${dishOrderPath}/${page}/${size}?field=dateOrder` );
}

export const getPaginateDishOrderbyState = async (company: string, page: number, size: number,states:number[]=[]) => {
    let param = ''
    states.map((row) => {
        param += '&states='+row
    })
    return await getCall<Page<DishOrderEntity>>(`${dishOrderPath}/bystate/${page}/${size}?company=${company}${param}` );
}

export const getDishOrderById = async (id: string) => {
    return await getCall<DishOrderEntity>(`${dishOrderPath}/${id}`);
}


export const createDishOrder = async (dishOrder: DishOrderEntity) => {
    return await postCall<DishOrderEntity>(dishOrderPath, dishOrder);
}

export const updateDishOrderState = async (dishOrder: DishOrderEntity) => {
    return await putCall<DishOrderEntity>(`${dishOrderPath}/update/state/${dishOrder.orderID}?state=${dishOrder.state}`, dishOrder);
}


export const updateDishOrder= async (dishOrder: DishOrderEntity) => {
    return await putCall<DishOrderEntity>(`${dishOrderPath}/${dishOrder.orderID}`, dishOrder);
}

export const deleteDishOrder = async (id: string) => {
    return await deleteCall<DishOrderEntity>(`${dishOrderPath}/${id}`);
}  

export const getDishOrderDetails = async (id: string) => {
    return await getCall<DishOrderEntity[]>(`${dishOrderPath}/${id}`);
}

export const getDishOrderByTableoccupation = async (idtableoccupation: string) => {
    return await getCall<DishOrderEntity>(`${dishOrderPath}/table_occupation/${idtableoccupation}`);
}

