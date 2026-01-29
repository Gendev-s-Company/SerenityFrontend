import { PMenu } from "@/types/menu-type";
import { BedSingle, BookText, Calendar, Gamepad, Hotel, Inbox } from "lucide-react";

export const HotelItems: PMenu = 
  {
    title: "HOTEL",
    url: "#",
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
        url: "#activiter",
        dropdown: true,
        isSubmenu: false,
        subMenu: [{
            title: "Création",
            url: "/view/liste",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
          {
            title: "Liste",
            url: "/view/payment",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Gamepad,
          },],
        icon: Calendar,
      },
    ],
    icon: Hotel,
  }
;
