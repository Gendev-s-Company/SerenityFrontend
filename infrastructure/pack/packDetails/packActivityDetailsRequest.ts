import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { PackActivityDetailsEntity } from "@/types/entity-type/packActivityDetailsEntity";

const packActivityDetailsPath = "/pack/activity";

export const getAllPackActivity = async (id:string) => {
  return await getCall<PackActivityDetailsEntity[]>(`${packActivityDetailsPath}/byOrder?packid=${id}`);
}
export const getPaginatePackActivity = async (id:string,page:number,size:number) => {
  return await getCall<Page<PackActivityDetailsEntity>>(`${packActivityDetailsPath}/${page}/${size}?packid=${id}` );
}
export const getPackActivityById = async (id: string) => {
    return await getCall<PackActivityDetailsEntity>(`${packActivityDetailsPath}/${id}`);
}
export const createPackActivity = async (packActivity: PackActivityDetailsEntity) => {
    return await postCall<PackActivityDetailsEntity>(packActivityDetailsPath,packActivity);
}

export const updatePackActivity = async (packActivity: PackActivityDetailsEntity) => {
    return await putCall<PackActivityDetailsEntity>(`${packActivityDetailsPath}/${packActivity.id}`,packActivity);
}
export const deletePackActivity = async (id: string) => {
    return await deleteCall<PackActivityDetailsEntity>(`${packActivityDetailsPath}/${id}`);
}