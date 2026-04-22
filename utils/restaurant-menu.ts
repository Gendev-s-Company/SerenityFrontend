import { PMenu } from "@/types/component-type/menu-type";
import { Beef, BookImage, BookText, Calendar, CalendarArrowUp, Grid3x3, Inbox, Armchair , Table2, UtensilsCrossed, Menu, BookMarked, CookingPot, Utensils } from "lucide-react";

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
        dropdown: false,
        isSubmenu: true,
        subMenu: [
          {
            title: "Table",
            url: "/view/restaurant/table",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Utensils,
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
            title: "Réserver une table",
            url: "/view/restaurant/table/createResa",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: BookMarked,
            minAuthority: 2,
          },
          {
            title: "Situation table",
            url: "/view/restaurant/table/reservation",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: BookMarked,
            minAuthority: 2,
          },
          {
            title: "Disponibilité table",
            url: "/view/restaurant/table/disponibilite",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: BookText,
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
            title: "Menu",
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
            icon: CookingPot,
            minAuthority: 4
          },],
        icon: Calendar,
        minAuthority: 2,
      },
      {
        title: "Service",
        url: "#commande",
        dropdown: false,
        isSubmenu: true,
        subMenu: [
          {
            title: "Plan de table",
            url: "#liste",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
            minAuthority: 2,
          },
          {
            title: "Liste commandes",
            url: "#liste",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
            minAuthority: 2,
          },
          {
            title: "Création commande",
            url: "#situation",
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
