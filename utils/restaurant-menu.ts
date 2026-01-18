import { PMenu } from "@/types/menu-type";
import { Calendar, Inbox } from "lucide-react";

export const RestoItems: PMenu = 
  {
    title: "Restaurant",
    url: "#",
    dropdown: false,
    isSubmenu: true,
    subMenu: [
      {
        title: "Tables",
        url: "#chambre",
        dropdown: true,
        isSubmenu: false,
        subMenu: [
          {
            title: "Situation des tables",
            url: "#situationt",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
          {
            title: "Réservation table",
            url: "#reservatont",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
          {
            title: "Calendrier table",
            url: "#calendriert",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
        ],
        icon: Inbox,
      },
      {
        title: "Commande",
        url: "#commande",
        dropdown: false,
        isSubmenu: true,
        subMenu: [{
            title: "Liste",
            url: "#liste",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
          {
            title: "situation commande",
            url: "#situationc",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },],
        icon: Calendar,
      },
      {
        title: "Plat",
        url: "#crudplat",
        dropdown: false,
        isSubmenu: true,
        subMenu: [{
            title: "Liste",
            url: "#liste",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
          {
            title: "creation plat",
            url: "#situationc",
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
