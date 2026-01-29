import { ProfilEntity } from "./profilEntity";

export interface UserEntity {
    userID: string,
    name: string,
    profil: ProfilEntity,
    phone: string,
    joineddate: string,
    joinedDate?: string,
    password?: string,
    status: number,
}