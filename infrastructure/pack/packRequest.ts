import { Page } from "@/types/entity-type/common/Page";
import { PackEntity } from "@/types/entity-type/packEntity";
import { deleteCall, getCall, postCall, putCall } from "../api";

const packPath = "/pack";

export const getAllPack = async (company:string) => {
  return await getCall<PackEntity[]>(packPath+'/all?company='+company);
}
export const getPaginatePack = async (company:string,page:number,size:number) => {
  return await getCall<Page<PackEntity>>(`${packPath}/all/${page}/${size}?company=${company}&field=title` );
}
export const getPackById = async (id: string) => {
    return await getCall<PackEntity>(`${packPath}/${id}`);
}
export const createPack = async (pack: PackEntity) => {
    return await postCall<PackEntity>(packPath,pack);
}

export const updatePack = async (pack: PackEntity) => {
    return await putCall<PackEntity>(`${packPath}/update/${pack.packID}?isDetail=true`,pack);
}
export const deletePack = async (id: string) => {
    return await deleteCall<PackEntity>(`${packPath}/${id}`);
}