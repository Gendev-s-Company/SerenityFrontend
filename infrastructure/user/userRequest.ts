import { deleteCall, getCall, postCall, putCall } from "../api";
import { UserEntity } from "@/types/entity-type/userEntity";

const userPath = "/user";

export const getAllUser = async () => {
  return await getCall<UserEntity[]>(userPath );
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
    return await postCall<unknown>(`/auth/login`, body);
}