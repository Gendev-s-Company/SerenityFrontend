import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { DishOrderDetailsEntity } from "@/types/entity-type/dishOrderDetailsEntity";

const dishOrderDetailsPath="/restaurant/order/details"

export const getDishOrderDetails = async (id:string) => {
    return await getCall<DishOrderDetailsEntity[]>(`${dishOrderDetailsPath}/byOrder?orderid=${id}` );
}

export const getDishOrderDetailsById = async (id: string) => {
    return await getCall<DishOrderDetailsEntity>(`${dishOrderDetailsPath}/${id}`);
}

export const createDishOrderDetails = async (dishOrderDetails: DishOrderDetailsEntity) => {
    return await postCall<DishOrderDetailsEntity>(dishOrderDetailsPath, dishOrderDetails);
}

// export const updateDishOrderDetails = async (dishOrderDetails: DishOrderDetailsEntity,state:string) => {
//     return await putCall<DishOrderDetailsEntity>(`${dishOrderDetailsPath}/update/state/${dishOrderDetails.orderDetailsID}?state=${state}`, null);
// }

export const updateDishOrderDetailsstate = async (dishOrderDetails: DishOrderDetailsEntity) => {
    return await putCall<DishOrderDetailsEntity>(`${dishOrderDetailsPath}/update/state/${dishOrderDetails.orderDetailsID}?state=${dishOrderDetails.state}`, dishOrderDetails);
}

export const updateDishOrderDetails = async (dishOrderDetails: DishOrderDetailsEntity) => {
    return await putCall<DishOrderDetailsEntity>(`${dishOrderDetailsPath}/${dishOrderDetails.orderDetailsID}`, dishOrderDetails);
}

export const deleteDishOrderDetails = async (id: string) => {
    return await deleteCall<DishOrderDetailsEntity>(`${dishOrderDetailsPath}/${id}`);
}