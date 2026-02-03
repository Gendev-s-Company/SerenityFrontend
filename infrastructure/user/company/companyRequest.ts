import { deleteCall, getCall, postCall, putCall } from "@/infrastructure/api";
import { Page } from "@/types/entity-type/common/Page";
import { CompanyEntity } from "@/types/entity-type/companyEntity";

const companyPath = "/company";

export const getAllCompany = async () => {
  return await getCall<CompanyEntity[]>(companyPath );
}
export const getPaginateCompany = async (page:number,size:number) => {
  return await getCall<Page<CompanyEntity>>(`${companyPath}/${page}/${size}` );
}
export const getCompanyById = async (id: string) => {
    return await getCall<CompanyEntity>(`${companyPath}/${id}`);
}
export const createCompany = async (company: CompanyEntity) => {
    return await postCall<CompanyEntity>(companyPath, company);
}

export const updateCompany = async (company: CompanyEntity) => {
    return await putCall<CompanyEntity>(`${companyPath}/${company.companyID}`, company);
}
export const deleteCompany = async (id: string) => {
    return await deleteCall<CompanyEntity>(`${companyPath}/${id}`);
}