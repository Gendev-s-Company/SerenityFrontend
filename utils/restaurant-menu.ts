import { PMenu } from "@/types/menu-type";
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
          },
          {
            title: "Réservation table",
            url: "#reservation",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: BookText,
          },
          {
            title: "Calendrier table",
            url: "#calendriert",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Calendar,
          },
        ],
        icon: Inbox,
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
          },
          {
            title: "Création plat",
            url: "#situationc",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Beef,
          },],
        icon: Calendar,
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
            title: "Commande",
            url: "#situationc",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: CalendarArrowUp,
          },],
        icon: Calendar,
      },
      
    ],
    icon: UtensilsCrossed,
  }
;
