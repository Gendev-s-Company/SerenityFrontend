import { PMenu } from "@/types/component-type/menu-type";
import { Receipt, ReceiptText } from "lucide-react";

export const InvoiceItems : PMenu = {
    title: "FACTURES",
    url: "/view/invoice",
    dropdown: false,
    isSubmenu: true,
    subMenu: [
    {
      title: "Factures",
      url: "/view/invoice",
      dropdown: false,
      isSubmenu: false,
      subMenu: [],
      icon: ReceiptText,
      minAuthority: 2,
    },
  ],
    icon: ReceiptText,
    minAuthority: 4
}