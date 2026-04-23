import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { PlatEntity } from "@/types/entity-type/platEntity";
import { pl } from "zod/v4/locales";

const platPath="/restaurant/dish"
export const getAllPlat = async (company:string) => {
    return await getCall<PlatEntity[]>(platPath+'/all?company=' + company);
}

export const getPaginatePlat = async (company:string, page:number, size:number) => {
    return await getCall<Page<PlatEntity>>(`${platPath}/all/${page}/${size}?company=${company}` );
}

export const getPlatById = async (id: string) => {
    return await getCall<PlatEntity>(`${platPath}/${id}`);
}

export const createPlat = async (Plat: PlatEntity) => {
    return await postCall<PlatEntity>(platPath, Plat);
}

export const updatePlat = async (Plat: PlatEntity) => {
    return await putCall<PlatEntity>(`${platPath}/${Plat.dishID}`, Plat);
}

export const deletePlat = async (id: string) => {
    return await deleteCall<PlatEntity>(`${platPath}/${id}`);
}

export const getAllPlatAvalaible = async (company: string,state: number[] = [], start:string, end:string) => {
    let param = ''
    state.map((row) => {
        param += '&state='+row
    })

  return await getCall<PlatEntity[]>(`${platPath}/avalaible?company=${company}&start=${start}&end=${end}${param}`);
}



export const updateDispo = async (plat: PlatEntity, state: string) => {
    return await putCall<PlatEntity>(`${platPath}/update/state/${plat.dishID}?state=${state}`, plat);
}

