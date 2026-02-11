import { Page } from "@/types/entity-type/common/Page";
import { deleteCall, getCall, postCall, putCall } from "../api";
import { UserEntity } from "@/types/entity-type/userEntity";

const userPath = "/user";

export const getAllUser = async (company:string) => {
  return await getCall<UserEntity[]>(userPath+'/all?company='+company );
}
export const getPaginateUsers = async (company:string,page:number,size:number) => {
  return await getCall<Page<UserEntity>>(`${userPath}/all/${page}/${size}?company=${company}` );
}
export const getUserById = async (id: string) => {
    return await getCall<UserEntity>(`${userPath}/${id}`);
}
export const createUser = async (user: UserEntity) => {
    return await postCall<UserEntity>(userPath, user);
}

export const updateUser = async (user: UserEntity) => {
    return await putCall<UserEntity>(`${userPath}/${user.userID}`, user);
}
export const deleteUser = async (id: string) => {
    return await deleteCall<UserEntity>(`${userPath}/${id}`);
}

export const login = async (body:unknown) => {
    return await postCall<UserEntity>(`/auth/login`, body);
}
export const updatePassword = async ({userID, newPwd, oldpwd}:{userID:string, newPwd: string, oldpwd:string}) =>{
    const uri = `/auth/password/${userID}?oldPassword=${oldpwd}&newPassword=${newPwd}`
    return await putCall<unknown>(uri,undefined);
}