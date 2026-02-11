import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { FieldOptions } from "@/types/component-type/form-type";
import { Page } from "@/types/entity-type/common/Page";
import { WorkSchedule } from "@/types/entity-type/workschedule";

const workPath = "/workschedule";

export const getAllworkSC = async () => {
  return await getCall<WorkSchedule[]>(workPath );
}

export const getAllworkSCByAutority = async (userID: string) => {
  return await getCall<WorkSchedule[]>(`${workPath}/calendar?userId=${userID}`);
}

export const getAllByListUser = async (list: FieldOptions[]) => {
  const param = convertOptionToListParam(list)
  return await getCall<WorkSchedule[]>(`${workPath}/calendar/choice${param}`);
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

function convertOptionToListParam(list:FieldOptions[]) {
    let param = '?'
    list.forEach(row => {
      param += 'userids='+row.id+'&'
    });
    param+='1=1'
    return param
}
