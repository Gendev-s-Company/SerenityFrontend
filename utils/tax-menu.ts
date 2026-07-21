import { PMenu } from "@/types/component-type/menu-type";
import { HandCoins } from "lucide-react";

export const TaxItems : PMenu = {
    title :"TAXE",
    url: "/view/tax",
    dropdown: false,
    isSubmenu: true,
    subMenu: [
    {
      title: "Taxes",
      url: "/view/tax",
      dropdown: false,
      isSubmenu: false,
      subMenu: [],
      icon: HandCoins,
      minAuthority: 2,
    },
  ],
    icon: HandCoins,
    minAuthority: 10
}