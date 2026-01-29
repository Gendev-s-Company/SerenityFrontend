import { PMenu } from "@/types/component-type/menu-type";
import { LayoutDashboard } from "lucide-react";
import { HotelItems } from "./hotel-menu";
import { RestoItems } from "./restaurant-menu";
import { UsersItems } from "./users-menu";

// Menu items.
export const items: PMenu[] = [
  {
    title: "TABLEAU DE BORD",
    url: "#hyhy",
    dropdown: false,
    isSubmenu: false,
    subMenu: [],
    icon: LayoutDashboard,
  },
  UsersItems,
  HotelItems,
  RestoItems,

];
