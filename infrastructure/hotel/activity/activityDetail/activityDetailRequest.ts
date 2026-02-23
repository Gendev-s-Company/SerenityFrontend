import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall, apiCallImage, postCallImage } from "@/infrastructure/api";
import { ActivityPhotoEntity, ActivityPhotoInsertEntity } from "@/types/entity-type/activityPhotoEntity";

const activityPhotoPath="/hotel/activityphoto"

export const getAllphoto = async (id: string,page:number,size:number) => {
    return await getCall<Page<ActivityPhotoEntity>>(`${activityPhotoPath}/byActivity/${page}/${size}?activityid=${id}`);
}

export const createPhoto = async (activity: unknown) => {
    return await postCallImage<unknown>(`${activityPhotoPath}/save`, activity);
}

export const deleteActivityPhoto = async (id: string) => {
    return await deleteCall<ActivityPhotoEntity>(`${activityPhotoPath}/${id}`);
}


