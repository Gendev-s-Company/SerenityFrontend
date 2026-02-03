import { ProfilEntity } from "@/types/entity-type/profilEntity";
import { deleteCall, getCall, postCall, putCall } from "../../api";
import { Page } from "@/types/entity-type/common/Page";

const profilPath = "/profil";

export const getAllProfils = async () => {
  return await getCall<ProfilEntity[]>(profilPath );
}
export const getPaginateProfil = async (page:number,size:number) => {
  return await getCall<Page<ProfilEntity>>(`${profilPath}/${page}/${size}` );
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