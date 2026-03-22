import { PMenu } from "@/types/component-type/menu-type";
import { BedDouble, BedSingle, Book, BookMarked, BookText, Calendar, Gamepad, GamepadDirectional, Hotel, Inbox, LucidePictureInPicture } from "lucide-react";


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
      dropdown: false,
      isSubmenu: true,
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
          title: "Chambres",
          url: "/view/hotel/room/roomGallery",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BedDouble,
        },
      ],
      icon: Inbox,
    },
    {
      title: "Reservation",
      url: "#chambre",
      dropdown: false,
      isSubmenu: true,
      subMenu: [
        {
          title: "Réserver une chambre",
          url: "/view/hotel/room/reservation/create",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BookMarked,
        },
        {
          title: "Listes de réservations",
          url: "/view/hotel/room/reservation",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BookText,
        },
        {
          title: "Disponibilité chambres",
          url: "/view/hotel/room/disponibilite",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BedSingle,
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
