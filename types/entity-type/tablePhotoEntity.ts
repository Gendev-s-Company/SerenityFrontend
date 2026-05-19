export interface TablePhotoEntity {
    content: never[];
    photoID: string;
    tableID: string;
    path: string;
    files: FileData;
}


export interface FileData {
    id: string;
    type: string;
    nameFile: string;
    data: number[];
}


export interface TablePhotoInsertEntity {
    tableID: string;
    uploadFile: FileData[];
}