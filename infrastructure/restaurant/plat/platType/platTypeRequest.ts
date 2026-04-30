import { deleteCall, getCall, postCall, putCall} from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { PlatTypeEntity } from "@/types/entity-type/platTypeEntity";

const platTypePath="/restaurant/dish-type"

export const getAllPlatType = async (company:string) => {
  return await getCall<PlatTypeEntity[]>(platTypePath+'/all?company='+company );
}

export const getPaginatePlatTypes = async (company:string,page:number,size:number) => {
  return await getCall<Page<PlatTypeEntity>>(`${platTypePath}/all/${page}/${size}?company=${company}` );
}

export const getPlatTypeById = async (id: string) => {
    return await getCall<PlatTypeEntity>(`${platTypePath}/${id}`);
}

export const createPlatType = async (PlatType: PlatTypeEntity) => {
    return await postCall<PlatTypeEntity>(platTypePath, PlatType);
}

export const updatePlatType = async (PlatType: PlatTypeEntity) => {
    return await putCall<PlatTypeEntity>(`${platTypePath}/${PlatType.typeID}`, PlatType);
}

export const deletePlatType = async (id: string) => {
    return await deleteCall<PlatTypeEntity>(`${platTypePath}/${id}`);
}

