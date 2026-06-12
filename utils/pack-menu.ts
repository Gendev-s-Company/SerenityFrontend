import { PMenu } from "@/types/component-type/menu-type";
import { GamepadDirectional, Inbox, UtensilsCrossed, TicketPercent, Hotel } from "lucide-react";

export const PackItems: PMenu =
{
  title: "PACK",
  url: "#",
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
    {
      title: "Pack disponibles",
      url: "#pack",
      dropdown: true,
      isSubmenu: false,
      subMenu: [
        {
          title: "Pack Hotel",
          url: "#",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Hotel,
          minAuthority: 2,
        },
        {
          title: "Pack Restaurant",
          url: "#",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: UtensilsCrossed,
          minAuthority: 2,
        },
        {
          title: "Pack Activité",
          url: "#",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: GamepadDirectional,
          minAuthority: 2,
        },
      ],
      icon: Inbox,
      minAuthority: 2,
    },
  ],
  icon: TicketPercent,
  minAuthority: 2,
}
  ;