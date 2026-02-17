import { ActivityOrderEntity} from "@/types/entity-type/activityorderEntity";
import { deleteCall, getCall, postCall, putCall } from "../../api";
import { Page } from "@/types/entity-type/common/Page";
import { ProfilEntity } from "@/types/entity-type/profilEntity";

const profilPath = "/hotel";

export const getPaginateActivityOrder = async (page:number,size:number) => {
  return await getCall<Page<ActivityOrderEntity>>(`${profilPath}/byActivity/${page}/${size}`);
}
export const getFindAllByCompany = async (id: string) => {
    return await getCall<ActivityOrderEntity[]>(`${profilPath}/byActivity?companyId=${id}`);
}
export const getPaginateModelByCustomerr = async (page:number,size:number) => {
  return await getCall<Page<ActivityOrderEntity>>(`${profilPath}/bycustomer/${page}/${size}`);
}




// export const getAllProfils = async (company: string) => {
//   return await getCall<ProfilEntity[]>(profilPath+'/profil?companyId='+company );
// }
// export const getPaginateProfil = async (company: string,page:number,size:number) => {
//   return await getCall<Page<ProfilEntity>>(`${profilPath}/paginate/${page}/${size}?companyId=${company}` );
// }
// export const getProfilById = async (id: string) => {
//     return await getCall<ProfilEntity>(`${profilPath}/${id}`);
// }
// export const createProfil = async (profil: ProfilEntity) => {
//     return await postCall<ProfilEntity>(profilPath, profil);
// }

// export const updateProfil = async (profil: ProfilEntity) => {
//     return await putCall<ProfilEntity>(`${profilPath}/${profil.profilID}`, profil);
// }
// export const deleteProfil = async (id: string) => {
//     return await deleteCall<ProfilEntity>(`${profilPath}/${id}`);
// }
