import { PMenu } from "@/types/component-type/menu-type";
import { Beef, BookImage, BookText, Calendar, CalendarArrowUp, Grid3x3, Inbox, Armchair , Table2, UtensilsCrossed } from "lucide-react";

export const RestoItems: PMenu = 
  {
    title: "RESTAURANT",
    url: "#",
    dropdown: false,
    isSubmenu: true,
    subMenu: [
      {
        title: "Tables",
        url: "#table",
        dropdown: true,
        isSubmenu: false,
        subMenu: [
          {
            title: "Table",
            url: "/view/restaurant/table",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Armchair ,
            minAuthority: 2,
          },
          {
            title: "Type de table",
            url: "/view/restaurant/table/tableType",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Table2,
            minAuthority: 2,
          },
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
