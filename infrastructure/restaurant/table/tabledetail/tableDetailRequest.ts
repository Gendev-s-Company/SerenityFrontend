import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall, apiCallImage, postCallImage } from "@/infrastructure/api";
import { TablePhotoEntity } from "@/types/entity-type/tablePhotoEntity";


const tablePhotoPath="/restaurant/tablephoto"

export const getAllphoto = async (id: string,page:number,size:number) => {
    return await getCall<Page<TablePhotoEntity>>(`${tablePhotoPath}/bytable/${page}/${size}?tableid=${id}`);
}

export const createPhoto = async (table: unknown) => {
    return await postCallImage<unknown>(`${tablePhotoPath}/save`, table);
}

export const deleteRoomPhoto = async (id: string) => {
    return await deleteCall<TablePhotoEntity>(`${tablePhotoPath}/${id}`);
}