"use client";

import { useState } from "react";
import { ReceiptText, X } from "lucide-react";
import InvoicePreviewModal from "@/features/invoice/invoice/InvoicePreviewModal";
import { InvoiceData } from "@/lib/invoice-data";

// Adapte cette fonction à la forme réelle de ton `row` (venant de ta DB/API)
function mapRowToInvoice(row: any): InvoiceData {
  return {
    invoiceNumber: row.invoiceNumber ?? row.id,
    date: row.date,
    dueDate: row.dueDate,
    taxRate: row.taxRate ?? 0.3,
    company: {
      name: row.company?.name ?? "Studio Salford",
      phone: row.company?.phone ?? "",
      mail: row.company?.email ?? "",
      address: row.company?.address ?? "",
    },
    billedTo: {
      name: row.clientName,
      phone: row.clientPhone,
      address: row.clientAddress,
    },
    payment: {
      accountHolder: row.payment?.accountHolder ?? "",
      bank: row.payment?.bank ?? "",
      accountNumber: row.payment?.accountNumber ?? "",
    },
    items: row.items ?? [],
  };
}

export default function InvoiceTable({ rows }: { rows: any[] }) {
  const [previewInvoice, setPreviewInvoice] = useState<InvoiceData | null>(null);

  function printReceipt(row: any) {
    setPreviewInvoice(mapRowToInvoice(row));
  }

  return (
    <>
      {rows.map((row) => (
        <button
          key={row.id}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-green-600 hover:bg-blue-50 transition-colors"
          aria-label="Modifier"
          onClick={() => printReceipt(row)}
        >
          <ReceiptText size={15} className="text-green-600" />
        </button>
      ))}

      <InvoicePreviewModal
        invoice={previewInvoice}
        open={!!previewInvoice}
        onOpenChange={(open) => {
          if (!open) setPreviewInvoice(null);
        }}
        
      />
    </>
  );
}