import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { WorkSchedule } from "@/types/entity-type/workschedule";

const workPath = "/workschedule";

export const getAllworkSC = async () => {
  return await getCall<WorkSchedule[]>(workPath );
}

export const getAllworkSCByAutority = async (userID: string) => {
  return await getCall<WorkSchedule[]>(`${workPath}/calendar?userId=${userID}`);
}

export const getPaginateworkSC = async (page:number,size:number) => {
  return await getCall<Page<WorkSchedule>>(`${workPath}/${page}/${size}?field=starttime` );
}
export const getworkSCById = async (id: string) => {
    return await getCall<WorkSchedule>(`${workPath}/${id}`);
}
export const createworkSC = async (user: WorkSchedule) => {
    return await postCall<WorkSchedule>(workPath, user);
}

export const updateworkSC = async (user: WorkSchedule) => {
    return await putCall<WorkSchedule>(`${workPath}/${user.userID}`, user);
}
export const deleteworkSC = async (id: string) => {
    return await deleteCall<WorkSchedule>(`${workPath}/${id}`);
}
