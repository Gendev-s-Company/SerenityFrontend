import { UserEntity } from "@/types/entity-type/userEntity";
import { ls } from "lightweight-localstorage";

export const userStorage = "userLogged";
export const getLocalStorage = () => {
  const local = ls.get(userStorage);
  
  return JSON.parse(local) as UserEntity;
};

export const setAuthStorage = (data: string) => {
  ls.set(userStorage, data);
};
