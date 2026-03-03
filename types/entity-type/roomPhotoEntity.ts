
export interface RoomPhotoEntity {
    content: never[];
    photoID: string,
    roomID:string,
    path: string,
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

export interface RoomPhotoInsertEntity {
    photoID: string;
    uploadFile: FileData[];
}