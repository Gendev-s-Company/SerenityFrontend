export interface TablePhotoEntity {
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
    photoID: string;
    uploadFile: FileData[];
}