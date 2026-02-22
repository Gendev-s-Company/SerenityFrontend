import { ActivityEntity } from "./activityEntity";

export interface ActivityPhotoEntity {
    content: never[];
    photoID: string;
    activity: ActivityEntity; // Référence à votre interface Activity
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
    activityID: string;
    uploadFile: FileData[];
}