import { ProfilEntity } from "@/types/entity-type/profilEntity";
import { deleteCall, getCall, postCall, putCall } from "../../api";

const profilPath = "/profil";

export const getAllProfils = async () => {
  return await getCall<ProfilEntity[]>(profilPath );
}
export const getProfilById = async (id: string) => {
    return await getCall<ProfilEntity>(`${profilPath}/${id}`);
}
export const createProfil = async (profil: ProfilEntity) => {
    return await postCall<ProfilEntity>(profilPath, profil);
}

export const updateProfil = async (profil: ProfilEntity) => {
    return await putCall<ProfilEntity>(`${profilPath}/${profil.profilID}`, profil);
}
export const deleteProfil = async (id: string) => {
    return await deleteCall<ProfilEntity>(`${profilPath}/${id}`);
}