"use client";

import { useState } from "react";
import { InvoiceData } from "@/lib/invoice-data";
import { Download, Printer } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { BillingEntity } from "@/types/entity-type/billingEntity";

export default function InvoiceDownloadButton({
  invoice,
}: {
  invoice: BillingEntity;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      // Import dynamique : @react-pdf/renderer doit tourner côté client uniquement
      const { pdf } = await import("@react-pdf/renderer");
      const { default: InvoicePDFDocument } = await import(
        "./InvoicePDFDocument"
      );

      const blob = await pdf(
        <InvoicePDFDocument invoice={invoice} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoice.billID}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
      <button
        onClick={handleDownload}
        title="Imprimer la facture"
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-neutral-800 disabled:border-gray-600"
      >
        {loading ? <Spinner className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
      </button>
    );
}
