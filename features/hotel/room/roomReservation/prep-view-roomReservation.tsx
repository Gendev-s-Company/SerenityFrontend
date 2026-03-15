import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { RoomReservationEntity } from "@/types/entity-type/roomReservationEntity";

const reservationStateOptions: FieldOptions[] = [
  { id: '1', label: 'Non validé' },
  { id: '2', label: 'Validé' },
  { id: '7', label: 'En cours' },

];


export const RoomReservationColumnOptions: ColumnConfig<RoomReservationEntity>[] = [
  { key: "reservationID", header: "ID", sorting: true },
  { key: "customer.name", header: "Client", type: "text", sorting: true },
  { key: "room.name", header: "Chambre", type: "link", href: (row) => `/view/hotel/room/detail?roomID=${row.roomID}` },
  { key: "starttime", header: "Début", type: "text", sorting: true },
  { key: "endtime", header: "Fin", type: "text", sorting: true },
  { key: "price", header: "Prix Total", type: "text" },
//   { key: "state", header: "Statut", type: "text"},
];


export const RoomReservationFields: FieldConfig<RoomReservationEntity>[] = [
  { name: "customerID", libelle: "Client :", type: "select", normal: true }, // À lier à une liste de clients
  { name: "roomID", libelle: "Chambre :", type: "select", normal: true }, // À lier à une liste de chambres
  { name: "starttime", libelle: "Date d'arrivée :", type: "date", normal: true },
  { name: "endtime", libelle: "Date de départ :", type: "date", normal: true },
  { name: "price", libelle: "Prix total :", type: "number", normal: true },
  { name: "accountRated", libelle: "Montant évalué :", type: "number", normal: false },
  { name: "accountPaid", libelle: "Montant payé :", type: "number", normal: false },
  { name: "AccountPaimentDeadline", libelle: "Date limite de paiement :", type: "date", normal: false },
  { name: "state", libelle: "État réservation :", type: "select", items: reservationStateOptions, normal: false },
];