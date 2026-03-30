import { PMenu } from "@/types/component-type/menu-type";
import { Beef, BookImage, BookText, Calendar, CalendarArrowUp, Grid3x3, Inbox, UtensilsCrossed } from "lucide-react";

export const RestoItems: PMenu = 
  {
    title: "RESTAURANT",
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
            icon: Grid3x3,
            minAuthority: 2,
          },
          {
            title: "Réservation table",
            url: "#reservation",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: BookText,
            minAuthority: 2,
          },
          {
            title: "Calendrier table",
            url: "#calendriert",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Calendar,
            minAuthority: 2,
          },
        ],
        icon: Inbox,
        minAuthority: 2,
      },
      {
        title: "Plat",
        url: "#crudplat",
        dropdown: false,
        isSubmenu: true,
        subMenu: [{
            title: "Catalogue",
            url: "#liste",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: BookImage,
            minAuthority: 2,

          },
          {
            title: "Création plat",
            url: "#situationc",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Beef,
            minAuthority: 4
          },],
        icon: Calendar,
        minAuthority: 2,
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
            minAuthority: 2,
          },
          {
            title: "Commande",
            url: "#situationc",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: CalendarArrowUp,
            minAuthority: 2,
          },],
        icon: Calendar,
        minAuthority: 2,

      },
      
    ],
    icon: UtensilsCrossed,
    minAuthority: 2,
  }
;
