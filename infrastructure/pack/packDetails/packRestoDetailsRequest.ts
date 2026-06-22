import { PackeRestoDetailsEntity } from "@/types/entity-type/packRestoDetailsEntity";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";

const packRestoDetailsPath = "/pack/resto";

export const getAllPackResto = async (id:string) => {
  return await getCall<PackeRestoDetailsEntity[]>(`${packRestoDetailsPath}/byOrder?packid=${id}`);
}
export const getPaginatePackResto = async (id:string,page:number,size:number) => {
  return await getCall<Page<PackeRestoDetailsEntity>>(`${packRestoDetailsPath}/${page}/${size}?packid=${id}` );
}
export const getPackRestoById = async (id: string) => {
    return await getCall<PackeRestoDetailsEntity>(`${packRestoDetailsPath}/${id}`);
}
export const createPackResto = async (packResto: PackeRestoDetailsEntity) => {
    return await postCall<PackeRestoDetailsEntity>(packRestoDetailsPath,packResto);
}

export const updatePackResto = async (packResto: PackeRestoDetailsEntity) => {
    return await putCall<PackeRestoDetailsEntity>(`${packRestoDetailsPath}/${packResto.id}`,packResto);
}
export const deletePackResto = async (id: string) => {
    return await deleteCall<PackeRestoDetailsEntity>(`${packRestoDetailsPath}/${id}`);
}