"use client";
import { ColumnConfig } from "@/types/column-config";
import { DataTable, Payment } from "../../../components/liste/complexe-data-table"



export default function DemoPage() {
  
const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 3160,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 2420,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 8307,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 87400,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p7",
    amount: 7210,
    status: "failed",
    email: "carmella@example.com",
  },
  {
    id: "bhqecj4p6",
    amount: 7210,
    status: "failed",
    email: "carmella@example.com",
  },
  {
    id: "bhqecj4p5",
    amount: 7210,
    status: "failed",
    email: "carmella@example.com",
  },
]

const ColumnOptions: ColumnConfig<Payment>[] = [
  { key: "select", header: "Select", type: "checkbox" },
  { key: "status", header: "Statut",sorting:true }, 
  { 
    key: "email", 
    header: "Email", 
    type: "link", 
    href: (row) => `/users/${row?.id}`, 
    hiding:false
  },
  { key: "amount", header: "Amount", type: "amount", amountType:{currency: 'MGA', lang: 'fr-MG'}, sorting:true },
  { 
    key: "action_btn", 
    header: "Action", 
    type: "button", 
    hiding:false,
    onUpdate: (row) => console.log("Editer done:", row.id),
    onDelete: (row) => console.log("Supprimer done:", row.id),
    onClick: (row) => console.log("Editer", row.id) 
  }
];
  return (
    <div className="container mx-auto py-10 px-3">
      {/* <DataTable columns={columns} data={data} /> */}
      <DataTable data={data} mcolumns={ColumnOptions} />
    </div>
  )
}