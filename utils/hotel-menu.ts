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
          minAuthority: 4,
        },
        {
          title: "Liste des chambres",
          url: "/view/hotel/room",
          dropdown: true,
          isSubmenu: false,
          subMenu: [],
          icon: BedSingle,
          minAuthority: 4,
        },
        {
          title: "Chambres",
          url: "/view/hotel/room/roomGallery",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BedDouble,
          minAuthority: 4,
        },
      ],
      icon: Inbox,
      minAuthority: 4,
    },
    {
      title: "Séjours",
      url: "#chambre",
      dropdown: true,
      isSubmenu: false,
      subMenu: [
        {
          title: "Réserver une chambre",
          url: "/view/hotel/room/reservation/create",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BookMarked,
          minAuthority: 2,
        },
        {
          title: "Réservation | séjours",
          url: "/view/hotel/room/reservation",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BookText,
          minAuthority: 2,
        },
        {
          title: "Disponibilité chambres",
          url: "/view/hotel/room/disponibilite",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: BedSingle,
          minAuthority: 2,
        },
      ],
      icon: Inbox,
      minAuthority: 2,
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
          minAuthority: 2,
        },
        {
          title: "Commandes",
          url: "/view/hotel/activity/order",
          dropdown: false,
          isSubmenu: false,
          subMenu: [],
          icon: Inbox,
          minAuthority: 2,
        },
      ],
      icon: GamepadDirectional,
      minAuthority: 2,
    },
  ],
  icon: Hotel,
  minAuthority: 2,
}
  ;
