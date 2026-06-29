import { PMenu } from "@/types/component-type/menu-type";
import { GamepadDirectional, Inbox, UtensilsCrossed, TicketPercent, Hotel } from "lucide-react";

export const PackItems: PMenu =
{
  title: "PACK",
  url: "",
  dropdown: false,
  isSubmenu: true,
  subMenu: [
    {
      title: "Pack du jour",
      url: "/view/pack",
      dropdown: false,
      isSubmenu: false,
      subMenu: [],
      icon: TicketPercent,
      minAuthority: 2,
    },
  ],
  icon: TicketPercent,
  minAuthority: 2,
}
  ;