import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall, apiCallImage, postCallImage } from "@/infrastructure/api";
import { PlatPhotoEntity } from "@/types/entity-type/platPhotoEntity";

const plathotoPath="/restaurant/dish/photo"

export const getAllphoto = async (id: string,page:number,size:number) => {
    return await getCall<Page<PlatPhotoEntity>>(`${plathotoPath}/bydish/${page}/${size}?dishid=${id}`);
}

export const createPhoto = async (plat: unknown) => {
    return await postCallImage<unknown>(`${plathotoPath}/save`, plat);
}

export const deletePlatPhoto = async (id: string) => {
    return await deleteCall<PlatPhotoEntity>(`${plathotoPath}/${id}`);
}


