import { PMenu } from "@/types/component-type/menu-type";

export const filterMenu = (items: PMenu[], authority: number): PMenu[] => {
  return items
    .filter(item => authority >= item.minAuthority)
    .map(item => ({
      ...item,
      subMenu: item.subMenu ? filterMenu(item.subMenu, authority) : [],
    }));
};