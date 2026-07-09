import { PMenu } from "@/types/component-type/menu-type";
import { HotelItems } from "./hotel-menu";
import { RestoItems } from "./restaurant-menu";
import { UsersItems } from "./users-menu";
import { PackItems } from "./pack-menu";
import { CustomerItems } from "./customer-menu";
import { DashboardItems } from "./dashboard-menu";
import { InvoiceItems } from "./invoice-menu";

// Menu items.
export const items: PMenu[] = [
  DashboardItems,
  UsersItems,
  CustomerItems,
  RestoItems,
  HotelItems,
  PackItems,
  InvoiceItems,
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