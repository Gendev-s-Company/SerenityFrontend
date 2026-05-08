import { DishEntity } from "./dishEntity";

export interface DishPhotoEntity{
    content: never[];
    photoID: string;
    dish: DishEntity;
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

export interface DishPhotoInsertEntity {
    dishID: string;
    uploadFile: FileData[];
}