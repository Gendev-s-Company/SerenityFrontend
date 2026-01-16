import { PMenu } from "@/types/menu-type";
import { Calendar, Home, Inbox } from "lucide-react";

// Menu items.
export const items: PMenu[] = [
    {
        title: "jbdu",
        url: "",
        dropdown: true,
        isSubmenu: false,
        subMenu: [
            {
                title: "First",
                url: "#revvg",
                icon: Inbox,
            },
            {
                title: "Second",
                url: "#rer",
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
        title: "Calendar",
        url: "#",
        dropdown: false,
        isSubmenu: true,
        subMenu: [
            {
                title: "First",
                url: "#cdc",
                icon: Inbox,
            },
            {
                title: "Second",
                url: "#thyh",
                icon: Calendar,
            },
        ],
        icon: Calendar,
    },
]