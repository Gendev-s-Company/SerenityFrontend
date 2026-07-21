"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import InvoicePreview from "./InvoicePreview";
import InvoiceDownloadButton from "./InvoiceDownloadButton";  
import { BillingEntity } from "@/types/entity-type/billingEntity";

export default function InvoicePreviewModal({
  invoice,
  open,
  onOpenChange,
}: {
  invoice: BillingEntity | null;
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
              Facture n° {invoice.billID} — {invoice.company?.name}
            </DialogDescription>
          </div>

          <div className="flex gap-1">
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