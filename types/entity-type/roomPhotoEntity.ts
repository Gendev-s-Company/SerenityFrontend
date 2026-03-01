export interface RoomPhotoEntity {
    content: never[];
    photoID: string;
    roomID: string;
    path: string;
    files: FileData;
}


export interface FileData {
    id: string;
    type: string;
    nameFile: string;
    data: number[];
}


export interface RoomPhotoInsertEntity {
    activityId: string;
    uploadFile: FileData[];
}