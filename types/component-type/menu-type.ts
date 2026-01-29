import { LucideIcon } from "lucide-react";

export interface PMenu {
    title: string,
    url: string,
    dropdown: boolean,
    isSubmenu: boolean,
    subMenu: PMenu[],
    icon: LucideIcon,
}

