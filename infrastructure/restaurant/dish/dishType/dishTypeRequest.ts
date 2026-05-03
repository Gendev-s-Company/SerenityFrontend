import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { DishTypeEntity } from "@/types/entity-type/dishTypeEntity";

const dishTypePath="/restaurant/dish-type"
export const getAllDishTypes = async (company:string) => {
    return await getCall<DishTypeEntity[]>(`${dishTypePath}/group/type?company=${company}`);
}

export const getPaginateDishTypes = async (company:string,page:number,size:number) => {
    return await getCall<Page<DishTypeEntity>>(`${dishTypePath}/group/type/${page}/${size}?company=${company}` );
}

export const getDishTypeById = async (id: string) => {
    return await getCall<DishTypeEntity>(`${dishTypePath}/${id}`);
}


export const createDishType = async (dishType: DishTypeEntity) => {
    return await postCall<DishTypeEntity>(dishTypePath, dishType);
}

export const updateDishType = async (dishType: DishTypeEntity,state:string) => {
    return await putCall<DishTypeEntity>(`${dishTypePath}/update/state/${dishType.typeID}?state=${state}`, null);
}

export const deleteDishType = async (id: string) => {
    return await deleteCall<DishTypeEntity>(`${dishTypePath}/${id}`);
}  