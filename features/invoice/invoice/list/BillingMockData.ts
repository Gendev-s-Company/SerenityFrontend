import { BillingEntity } from "@/types/entity-type/billingEntity";

// Donnee Mock pour les factures (à remplacer par des données réelles)
export const mockBillings: BillingEntity[] = [
  {
    billID: "BILL-001",
    customerID:  "Jean Dupont" ,
    status: 0, // ex: en attente
    billingDate: new Date("2026-06-01"),
    dueDate: new Date("2026-06-15"),
    totalAmount: 1250.5,
    taxe: 0.2
  },
  {
    billID: "BILL-002",
    customerID:  "Marie Lefebvre" ,
    status: 1, // ex: payée
    billingDate: new Date("2026-06-05"),
    dueDate: new Date("2026-06-20"),
    totalAmount: 340.0,
    taxe: 0.2
  },
  {
    billID: "BILL-003",
    customerID:  "Société Rakoto SARL" ,
    status: 2, // ex: en retard
    billingDate: new Date("2026-05-10"),
    dueDate: new Date("2026-05-25"),
    totalAmount: 9800.75,
    taxe: 0.2
  },
  {
    billID: "BILL-004", // ex: facture brouillon, pas encore générée
    customerID:  "Andriamana Solofo" ,
    status: 3, // ex: brouillon
    billingDate: new Date("2026-07-01"),
    dueDate: new Date("2026-07-15"),
    totalAmount: 0,
    taxe: 0.2
  },
    {
    billID: "BILL-005",
    customerID:  "Jean Dupont" ,
    status: 0, // ex: en attente
    billingDate: new Date("2026-06-01"),
    dueDate: new Date("2026-06-15"),
    totalAmount: 1250.5,
    taxe: 0.2
  },
  {
    billID: "BILL-006",
    customerID:  "Marie Lefebvre" ,
    status: 1, // ex: payée
    billingDate: new Date("2026-06-05"),
    dueDate: new Date("2026-06-20"),
    totalAmount: 340.0,
    taxe: 0.2
  },
  {
    billID: "BILL-007",
    customerID:  "Société Rakoto SARL" ,
    status: 2, // ex: en retard
    billingDate: new Date("2026-05-10"),
    dueDate: new Date("2026-05-25"),
    totalAmount: 9800.75,
    taxe: 0.2
  },
  {
    billID: "BILL-008", // ex: facture brouillon, pas encore générée
    customerID:  "Andriamana Solofo" ,
    status: 3, // ex: brouillon
    billingDate: new Date("2026-07-01"),
    dueDate: new Date("2026-07-15"),
    totalAmount: 0,
    taxe: 0.2
  },
];