import { PMenu } from "@/types/component-type/menu-type";
import { User, Utensils } from "lucide-react";

export const CustomerItems: PMenu =
{
    title: "CLIENTS",
    url: '/view/customer',
    dropdown: false,
    isSubmenu: false,
    subMenu: [],
    icon: User,
    minAuthority: 2
}