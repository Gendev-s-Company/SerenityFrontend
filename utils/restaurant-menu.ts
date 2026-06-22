import { PMenu } from "@/types/component-type/menu-type";
import { Map, ListOrdered, Pen, BookText, Inbox, Table2, UtensilsCrossed, BookMarked, CookingPot, Utensils, SquareMenu, Soup } from "lucide-react";

export const RestoItems: PMenu =
{
  title: "RESTAURANT",
  url: "",
  dropdown: false,
  isSubmenu: true,
  subMenu: [
    {
      title: "Tables",
      url: "#table",
      dropdown: false,
      isSubmenu: false,
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
          url: "/view/restaurant/table/tabletype",
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
          icon: Pen,
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
      isSubmenu: false,
      subMenu: [{
        title: "Menu",
        url: "/view/restaurant/plat/catalogue",
        dropdown: false,
        isSubmenu: false,
        subMenu: [],
        icon: SquareMenu,
        minAuthority: 2,

      },
      {
        title: "Création Type de plat",
        url: "/view/restaurant/plat/platType",
        dropdown: false,
        isSubmenu: false,
        subMenu: [],
        icon: CookingPot,
        minAuthority: 4
      },
      {
        title: "Création plat",
        url: "/view/restaurant/plat",
        dropdown: false,
        isSubmenu: false,
        subMenu: [],
        icon: Soup,
        minAuthority: 4
      }
      ],
      icon: Inbox,
      minAuthority: 2,
    },
    {
      title: "Service",
      url: "#commande",
      dropdown: false,
      isSubmenu: false,
      subMenu: [
        {
          title: "Plan de table",
          url: "/view/restaurant/dishOrder/seatingPlan",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Map,
          minAuthority: 2,
        },
        {
          title: "Liste commandes",
          url: "/view/restaurant/dishOrder",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: ListOrdered,
          minAuthority: 2,
        },
        {
          title: "Création commande",
          url: "/view/restaurant/dishOrder/tableOrder",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Pen,
          minAuthority: 2,
        },],
      icon: Inbox,
      minAuthority: 2,

    },

  ],
  icon: UtensilsCrossed,
  minAuthority: 2,
}
  ;
