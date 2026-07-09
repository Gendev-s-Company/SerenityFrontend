"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InvoiceData } from "@/lib/invoice-data";
import InvoicePreview from "./InvoicePreview";
import InvoiceDownloadButton from "./InvoiceDownloadButton";  
import { Check } from "lucide-react";

export default function InvoicePreviewModal({
  invoice,
  open,
  onOpenChange,
}: {
  invoice: InvoiceData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!invoice) return null;


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-w-[95vw] xl:max-w-[900px] max-h-[100vh] max-w-3xl flex-col overflow-hidden bg-neutral-50 p-0">
        <DialogHeader className="flex-row shrink-0 items-center justify-between space-y-0 border-b border-neutral-200 bg-white px-8 py-2 pr-16">
          <div>
            <DialogTitle className="text-base font-semibold text-neutral-900">
              Aperçu de la facture
            </DialogTitle>
            <DialogDescription className="mt-0.5 text-xs text-neutral-500">
              Facture n° {invoice.invoiceNumber} — {invoice.billedTo.name}
            </DialogDescription>
          </div>

          <div className="flex gap-1">
            <button
              title="Valider la facture"
              // onClick={handleValidate}
              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:bg-emerald-700"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <InvoiceDownloadButton invoice={invoice} />
          </div>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto p-8">
          
          <InvoicePreview invoice={invoice} showDownloadButton={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
}