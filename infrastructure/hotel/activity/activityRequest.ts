import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { ActivityEntity } from "@/types/entity-type/activityEntity";

const activityPath="/hotel/activity"

export const getAllActivity = async (company:string) => {
  return await getCall<ActivityEntity[]>(activityPath+'/all?company='+company );
}

export const getPaginateActivities = async (company:string,page:number,size:number) => {
  return await getCall<Page<ActivityEntity>>(`${activityPath}/all/${page}/${size}?company=${company}` );
}

export const getActivityById = async (id: string) => {
    return await getCall<ActivityEntity>(`${activityPath}/${id}`);
}

export const createActivity = async (activity: ActivityEntity) => {
    return await postCall<ActivityEntity>(activityPath, activity);
}

export const updateActivity = async (activity: ActivityEntity) => {
    return await putCall<ActivityEntity>(`${activityPath}/${activity.activityID}`, activity);
}

export const deleteActivity = async (id: string) => {
    return await deleteCall<ActivityEntity>(`${activityPath}/${id}`);
}