import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { DishEntity } from "@/types/entity-type/dishEntity";

const dishPath="/restaurant/dish"
export const getAllDishes = async (company:string) => {
    return await getCall<DishEntity[]>(`${dishPath}/all?company=${company}`);
}

export const getPaginateDishes = async (company:string,page:number, size:number) => {
    return await getCall<Page<DishEntity>>(`${dishPath}/all/${page}/${size}?company=${company}` );
}

export const getDishById = async (id: string) => {
    return await getCall<DishEntity>(`${dishPath}/${id}`);
}


export const createDish = async (dish: DishEntity) => {
    return await postCall<DishEntity>(dishPath, dish);
}

export const updateDish = async (dish: DishEntity,state:string) => {
    return await putCall<DishEntity>(`${dishPath}/update/state/${dish.dishID}?state=${state}`, null);
}

export const deleteDish = async (id: string) => {
    return await deleteCall<DishEntity>(`${dishPath}/${id}`);
}  