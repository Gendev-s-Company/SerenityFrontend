import { PMenu } from "@/types/component-type/menu-type";
import { BookUser, BriefcaseBusiness, Calendar, CircleUserRound, Inbox, UsersRound } from "lucide-react";

export const UsersItems: PMenu =
{
    title: "UTILISATEURS",
    url: "",
    dropdown: false,
    isSubmenu: true,
    subMenu: [
        {
            title: "Gestion des utilisateurs",
            url: "#revvg",
            dropdown: false,
            isSubmenu: true,
            subMenu: [
                {
                    title: "Profil utilisateur",
                    url: "/view/users/profil",
                    dropdown: false,
                    isSubmenu: false,
                    subMenu: [],
                    icon: CircleUserRound,
                },
                {
                    title: "Utilisateurs",
                    url: "/view/users/",
                    dropdown: false,
                    isSubmenu: false,
                    subMenu: [],
                    icon: UsersRound,
                },
            ],
            icon: Inbox,
        },
        {
            title: "Suivie de travail",
            url: "#rer",
            dropdown: true,
            isSubmenu: false,
            subMenu: [
                {
                    title: "Travail",
                    url: "#thyh",
                    dropdown: false,
                    isSubmenu: false,
                    subMenu: [],
                    icon: BriefcaseBusiness,
                },
                {
                    title: "Calendrier",
                    url: "#cdc",
                    dropdown: false,
                    isSubmenu: false,
                    subMenu: [],
                    icon: Calendar,
                },
            ],
            icon: Calendar,
        },

    ],
    icon: BookUser,
}
