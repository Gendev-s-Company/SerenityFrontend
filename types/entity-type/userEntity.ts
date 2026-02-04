import { ProfilEntity } from "./profilEntity";

export interface UserEntity {
    userID: string | null,
    name: string,
    profil: ProfilEntity,
    phone: string,
    joineddate: Date,
    joinedDate?: string,
    password?: string,
    status: number,
}