import { PMenu } from "@/types/component-type/menu-type";
import { Receipt, ReceiptText, User } from "lucide-react";

export const InvoiceItems : PMenu = {
    title: "FACTURES",
    url: "/view/invoice",
    dropdown: false,
    isSubmenu: true,
    subMenu: [
    {
      title: "Facturation",
      url: "/view/invoice",
      dropdown: false,
      isSubmenu: false,
      subMenu: [],
      icon: ReceiptText,
      minAuthority: 2,
    },
    {
      title: "Clients Facturés",
      url: "/view/invoice/billedCustomers",
      dropdown: false,
      isSubmenu: false,
      subMenu: [],
      icon: User,
      minAuthority: 2,
    },
  ],
    icon: ReceiptText,
    minAuthority: 4
}