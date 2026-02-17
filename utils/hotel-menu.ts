import { PMenu } from "@/types/component-type/menu-type";
import { BedSingle, BookText, Calendar, Gamepad, GamepadDirectional, Hotel, Inbox } from "lucide-react";

export const HotelItems: PMenu =
{
  title: "HOTEL",
  url: "",
  dropdown: false,
  isSubmenu: true,
  subMenu: [
    {
      title: "Chambre",
      url: "#chambre",
      dropdown: true,
      isSubmenu: false,
      subMenu: [
        {
          title: "Situation des chambres",
          url: "#situation",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BedSingle,
        },
        {
          title: "Réservation",
          url: "#reservaton",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BookText,
        },
        {
          title: "Calendrier",
          url: "#calendrier",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Calendar,
        },
      ],
      icon: Inbox,
    },
    {
      title: "Activité",
      url: "",
      dropdown: true,
      isSubmenu: false,
      subMenu: [
        {
          title: "Liste activités",
          url: "/view/hotel/activity",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Gamepad,
        },
        {
          title: "Commandes",
          url: "/view/hotel/activity/order",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Inbox,
        },
      ],
      icon: GamepadDirectional,
    },
  ],
  icon: Hotel,
}
  ;
