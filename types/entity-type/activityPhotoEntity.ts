import { ActivityEntity } from "./activityEntity";

export interface ActivityPhotoEntity {
  photoID: string;
  activity: ActivityEntity; // Référence à votre interface Activity
  path: string;
  files: FileData;
}

export interface FileData {
  name: string;
  type: string;
  size: number;
  lastModified: number;
}