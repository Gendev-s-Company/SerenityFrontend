import { PMenu } from "@/types/component-type/menu-type";
import { LayoutDashboard } from "lucide-react";

export const DashboardItems : PMenu={
    title: "TABLEAU DE BORD",
    url: "#hyhy",
    dropdown: false,
    isSubmenu: false,
    subMenu: [],
    icon: LayoutDashboard,
    minAuthority: 4
}