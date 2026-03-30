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
            title: "Sociétés",
            url: "/view/users/company",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: Inbox,
            minAuthority: 10,

        },
        {
            title: "Profil utilisateur",
            url: "/view/users/profil",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: CircleUserRound,
            minAuthority: 1,
        },
        {
            title: "Utilisateurs",
            url: "/view/users",
            dropdown: false,
            isSubmenu: false,
            subMenu: [],
            icon: UsersRound,
            minAuthority: 6,
        },
        {
            title: "Suivie de travail",
            url: "#rer",
            dropdown: true,
            isSubmenu: false,
            subMenu: [
                {
                    title: "Travail",
                    url: "/view/users/work",
                    dropdown: false,
                    isSubmenu: false,
                    subMenu: [],
                    icon: BriefcaseBusiness,
                    minAuthority: 2,
                },
                {
                    title: "Calendrier",
                    url: "/view/users/work/calendar",
                    dropdown: false,
                    isSubmenu: false,
                    subMenu: [],
                    icon: Calendar,
                    minAuthority: 2,
                },
            ],
            icon: Calendar,
            minAuthority: 2,
        },

    ],
    icon: BookUser,
    minAuthority: 1,
}
