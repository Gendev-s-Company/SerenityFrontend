import { LucideIcon } from "lucide-react";

export interface MMenu {
    title: string,
    url: string,
    icon: LucideIcon
}
export interface PMenu {
    title: string,
    url: string,
    dropdown: boolean,
    isSubmenu: boolean,
    subMenu: PMenu[],
    icon: LucideIcon,
}

export interface Iavatar {
    src:string,
    alt:string,
    fallback: string
}