import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { FieldOptions } from "@/types/component-type/form-type";
import { Page } from "@/types/entity-type/common/Page";
import { WorkSchedule } from "@/types/entity-type/workschedule";

const workPath = "/workschedule";

export const getAllworkSC = async () => {
  return await getCall<WorkSchedule[]>(workPath);
}

export const getAllworkSCByAutority = async (userID: string) => {
  return await getCall<WorkSchedule[]>(`${workPath}/calendar?userId=${userID}`);
}

export const getAllByListUser = async (list: FieldOptions[],company: string) => {
  const param = convertOptionToListParam(list)
  return await getCall<WorkSchedule[]>(`${workPath}/calendar/choice${param}&company=${company}`);
}

export const getPaginateworkSCByUser = async (userID:string, page: number, size: number) => {
  return await getCall<Page<WorkSchedule>>(`${workPath}/calendar/${page}/${size}?userId=${userID}` );
}

export const getworkSCById = async (id: string) => {
    return await getCall<WorkSchedule>(`${workPath}/${id}`);
}
export const createworkSC = async (workschedule: WorkSchedule) => {
    return await postCall<WorkSchedule>(workPath, workschedule);
}

export const updateworkSC = async (workschedule: WorkSchedule) => {
    return await putCall<WorkSchedule>(`${workPath}/${workschedule.scheduleID}`, workschedule);
}
export const deleteworkSC = async (id: string) => {
    return await deleteCall<WorkSchedule>(`${workPath}/${id}`);
}

function convertOptionToListParam(list: FieldOptions[]) {
    const params = new URLSearchParams();
    list.forEach(row => params.append('userids', row.id));
    return `?${params.toString()}`;
}
