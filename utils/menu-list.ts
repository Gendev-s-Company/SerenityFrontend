import { PMenu } from "@/types/menu-type";
import { Calendar, Home, Inbox } from "lucide-react";

// Menu items.
export const items: PMenu[] = [
  {
    title: "Personnel",
    url: "",
    dropdown: true,
    isSubmenu: false,
    subMenu: [
      {
        title: "First",
        url: "#revvg",
        dropdown: true,
        isSubmenu: false,
        subMenu: [
          {
            title: "Subdrodp",
            url: "#cdc",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
          },
          {
            title: "Seconddrop",
            url: "#thyh",
            dropdown: true,
            isSubmenu: false,
            subMenu: [
              {
                title: "First",
                url: "#cdc",
                dropdown: false,
                isSubmenu: false,
                subMenu: [],
                icon: Inbox,
              },
              {
                title: "Second",
                url: "#thyh",
                dropdown: false,
                isSubmenu: false,
                subMenu: [],
                icon: Calendar,
              },
            ],
            icon: Calendar,
          },
        ],
        icon: Inbox,
      },
      {
        title: "Second",
        url: "#rer",
        dropdown: false,
        isSubmenu: false,
        subMenu: [],
        icon: Calendar,
      },
    ],
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#hyhy",
    dropdown: false,
    isSubmenu: false,
    subMenu: [],
    icon: Inbox,
  },
  {
    title: "Hotel",
    url: "#",
    dropdown: false,
    isSubmenu: true,
    subMenu: [
      {
        title: "First",
        url: "#cdc",
        dropdown: false,
        isSubmenu: false,
        subMenu: [],
        icon: Inbox,
      },
      {
        title: "Second",
        url: "#thyh",
        dropdown: false,
        isSubmenu: false,
        subMenu: [],
        icon: Calendar,
      },
    ],
    icon: Calendar,
  },
  {
    title: "Restaurant",
    url: "#",
    dropdown: false,
    isSubmenu: true,
    subMenu: [
      {
        title: "First",
        url: "#cdc",
        dropdown: false,
        isSubmenu: true,
        subMenu: [],
        icon: Inbox,
      },
      {
        title: "Second",
        url: "#thyh",
        dropdown: false,
        isSubmenu: false,
        subMenu: [],
        icon: Calendar,
      },
    ],
    icon: Calendar,
  },
];
