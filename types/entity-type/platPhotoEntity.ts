import { PlatEntity } from "./platEntity";

export interface PlatPhotoEntity {
    content: never[];
    photoID: string;
    plat: PlatEntity;
    dishID: string
    path: string;
    files: FileData;
}

export interface FileData {
//   name: string;
//   type: string;
//   size: number;
//   lastModified: number;

    id: string;
    type: string;
    nameFile: string;
    data: number[];
}


export interface ActivityPhotoInsertEntity {
    dishID: string;
    uploadFile: FileData[];
}