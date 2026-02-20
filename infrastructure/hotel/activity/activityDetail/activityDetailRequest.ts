import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { ActivityPhotoEntity } from "@/types/entity-type/activityPhotoEntity";

const activityPhotoPath="/hotel/activityphoto"

export const getAllphoto = async (id: string,page:number,size:number) => {
    return await getCall<ActivityPhotoEntity>(`${activityPhotoPath}/byActivity/${page}/${size}?activityId=${id}`);
}

export const createActivity = async (activity: ActivityPhotoEntity) => {
    return await postCall<ActivityPhotoEntity>(`${activityPhotoPath}/save`, activity);
}
