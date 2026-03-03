import { PMenu } from "@/types/component-type/menu-type";
import { BedSingle, BookText, Calendar, Gamepad, GamepadDirectional, Hotel, Inbox,LucidePictureInPicture } from "lucide-react";


export const HotelItems: PMenu =
{
  title: "HOTEL",
  url: "",
  dropdown: false,
  isSubmenu: true,
  subMenu: [
    {
      title: "Chambre",
      url: "#chambre",
      dropdown: true,
      isSubmenu: false,
      subMenu: [
        {
          title: "Type des chambres",
          url: "/view/hotel/room/roomType",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BedSingle,
        },
        {
          title: "Liste des chambres",
          url: "/view/hotel/room",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BedSingle,
        },
        {
          title: "Gallerie des chambres",
          url: "/view/hotel/room/roomGallery",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: LucidePictureInPicture,
        },
                {
          title: "Client",
          url: "/view/hotel/customer",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Calendar,
        },
        {
          title: "Réservation",
          url: "#reservaton",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BookText,
        },
        {
          title: "Calendrier",
          url: "#calendrier",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Calendar,
        },
      ],
      icon: Inbox,
    },
    {
      title: "Activité",
      url: "",
      dropdown: true,
      isSubmenu: false,
      subMenu: [
        {
          title: "Liste activités",
          url: "/view/hotel/activity",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Gamepad,
        },
        {
          title: "Commandes",
          url: "/view/hotel/activity/order",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Inbox,
        },
      ],
      icon: GamepadDirectional,
    },
  ],
  icon: Hotel,
}
  ;
