import { PMenu } from "@/types/component-type/menu-type";
import { Calendar, LayoutDashboard } from "lucide-react";
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
    minAuthority: 4,
  },
  UsersItems,
  {
    title: "Clients",
    url: "/view/customer",
    dropdown: false,
    isSubmenu: false,
    subMenu: [],
    icon: Calendar,
    minAuthority: 4,
  },
  RestoItems,
  HotelItems,
  // {
  //   title: "HOTEL",
  //   url: "/view/hotel/room/roomGallery",
  //   dropdown: false,
  //   isSubmenu: false,
  //   subMenu: [],
  //   icon: LayoutDashboard,
  //   minAuthority: 4,
  // },

];