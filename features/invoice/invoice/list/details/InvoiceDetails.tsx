import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatAriary } from "@/lib/invoice-data";
import { BillingEntity } from "@/types/entity-type/billingEntity";
import { DurationBillingDetailsEntity,  } from "@/types/entity-type/durationBillingDetailsEntity";
import { QuantityBillingDetailsEntity } from "@/types/entity-type/quantityBillingDetailsEntity";
import { timestampToText } from "@/utils/Util";
import { Clock, ListOrdered, ReceiptText } from "lucide-react";

interface InvoiceDetailsProps {
  invoice: BillingEntity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InvoiceDetails({ invoice, open, onOpenChange }: InvoiceDetailsProps) {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] xl:max-w-[1400px] max-h-[90vh] p-0 overflow-hidden flex flex-col">
        {/* En-tête décoré */}
        <DialogHeader className="px-8 py-6 bg-slate-700 text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
              <ReceiptText className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-white text-2xl">
                Détails de la facture
              </DialogTitle>
              <DialogDescription className="text-slate-300 text-base">
                <span className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-white bg-slate-700 px-3 py-1 rounded-full shrink-0">
                    Facturation: {timestampToText(invoice.billingDate)}
                  </span>
                </span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto">
          {/* Résumé général */}
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <ReceiptText size={18} className="text-blue-600" />
                  </div>
                  {/* N° Facture et Nom du client */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Facture #{invoice.billID}
                    </h3>

                    <p className="text-xs text-gray-500">
                      Client
                      <span title={invoice.customerID} className="ml-1 font-medium text-gray-700">
                        {/* {invoice.customerID} */}
                        {invoice.customer?.name}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Montant total */}
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Montant HT</p>
                    <p className="text-lg font-bold text-gray-900">{formatAriary(invoice.totalHT!)}</p>
                  </div>
                
                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Montant TTC</p>
                    <p className="text-lg font-bold text-blue-700">{formatAriary(invoice.totalTTC!)}</p>
                  </div>
                    
                  {/* Promotion */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Promotion</p>
                    <p className="text-lg font-bold text-gray-900">{invoice.packID != null ? `${invoice.packID}%` : "—"}</p>
                  </div>
                </div>
              </div>
            </div>  

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 pt-0">

            {/* Détails facturés à la durée [hotel, activité] */}
            <div className="rounded-xl border border-blue-200 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 bg-blue-50 border-b border-blue-200">
                <Clock className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-base text-blue-900">
                  Services facturés à la durée
                </h3>
              </div>
              <div className="p-5">
                {invoice.durationsDetails?.length ? (
                <ul className="space-y-3">
                  {invoice.durationsDetails.map((detail) => (
                    <li key={detail.id} className="flex items-center justify-between gap-2 text-base text-slate-700">
                      <span className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                          {detail.serviceName} - {detail.serviceCode}
                          <span className="text-xs text-slate-600">({detail.typeDuration})</span>
                        </span>
                        <span className="ml-4 text-xs text-slate-600">
                          {timestampToText(detail.startTime)} → {timestampToText(detail.endTime)}
                        </span>
                      </span>
                      <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full shrink-0">
                        {formatAriary(detail.unitPrice)} / unité
                      </span>
                    </li>
                  ))}
                </ul>
                ) : (
                  <p className="text-base text-muted-foreground italic">Aucun service</p>
                )}
              </div>
            </div>

            {/* Détails facturés à la quantité [Restaurant] */}
            <div className="rounded-xl border border-amber-200 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 bg-amber-50 border-b border-amber-200">
                <ListOrdered className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-base text-amber-900">
                  Services facturés à la quantité
                </h3>
              </div>
              <div className="p-5">
                {invoice.quantityDetails?.length ? (
                  <ul className="space-y-3">
                    {invoice.quantityDetails.map((detail) => (
                      <li key={detail.id} className="flex items-center justify-between gap-2 text-base text-slate-700">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                          {detail.serviceName} - {detail.serviceCode}
                        </span>
                        <span className="text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full shrink-0">
                          {detail.quantity} × {formatAriary(detail.unitPrice)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base text-muted-foreground italic">Aucun service</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}