import { PMenu } from "@/types/menu-type";
import { Calendar, Inbox } from "lucide-react";

export const HotelItems: PMenu = 
  {
    title: "Hotel",
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
            icon: Inbox,
          },
          {
            title: "Réservation",
            url: "#reservaton",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
          {
            title: "Calendrier",
            url: "#calendrier",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
        ],
        icon: Inbox,
      },
      {
        title: "Activité",
        url: "#activiter",
        dropdown: false,
        isSubmenu: true,
        subMenu: [{
            title: "Billard",
            url: "/view/liste",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
          {
            title: "Exemple liste",
            url: "/view/payment",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },],
        icon: Calendar,
      },
    ],
    icon: Calendar,
  }
;
