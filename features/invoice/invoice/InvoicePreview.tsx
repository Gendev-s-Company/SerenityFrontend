import { Phone, Mail, MapPin, Landmark, Hash, CalendarDays, Check } from "lucide-react";
import { formatAriary  } from "@/lib/invoice-data";
import InvoiceDownloadButton from "./InvoiceDownloadButton";
import { useEffect } from "react";
import { BillingEntity } from "@/types/entity-type/billingEntity";
import { timestampToText } from "@/utils/Util";

export default function InvoicePreview({
  invoice,
  showDownloadButton = true,
}: {
  invoice: BillingEntity 
  showDownloadButton?: boolean;
}) {
  const companyName = invoice.company?.name ?? "";

  return (
    <div className="mx-auto max-w-3xl">
      {showDownloadButton && (
        <div className="mb-6 flex justify-end gap-2">
          <InvoiceDownloadButton invoice={invoice} />
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 bg-white p-10 shadow-sm sm:p-14">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-xl font-bold leading-none text-white">
              +
            </div>
            <div className="text-lg font-bold leading-tight tracking-tight text-neutral-900">
              {invoice.company?.name}
              <br />
            </div>
          </div>

          <div className="text-left sm:text-right">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-neutral-900">
              Facture
            </h1>
            <div className="flex flex-col gap-1 text-sm text-neutral-500 sm:items-end">
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Hash size={13} className="text-neutral-400" />
                {invoice.billID}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={13} className="text-neutral-400" />
                {timestampToText(invoice.billingDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Billed to */}
        <div className="mb-10 rounded-xl bg-neutral-50 p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Facturé à
          </p>
          <p className="text-sm font-semibold text-neutral-900">
            {invoice.customerID}
          </p>
        </div>

        {/* Table — services à la durée */}
        {invoice.durationsDetails && invoice.durationsDetails.length > 0 && (
          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Services facturés à la durée
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  <th className="pb-3 font-semibold">Description</th>
                  <th className="pb-3 text-right font-semibold">Période</th>
                  <th className="pb-3 text-right font-semibold">Taux</th>
                  <th className="pb-3 text-right font-semibold">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {invoice.durationsDetails.map((item) => {
                  const hours =
                    (new Date(item.endTime).getTime() - new Date(item.startTime).getTime()) /
                    (1000 * 60 * 60);
                  return (
                    <tr key={item.id}>
                      <td className="py-3 text-neutral-800">{item.serviceName}</td>
                      <td className="py-3 text-right tabular-nums text-neutral-500">
                        {hours.toFixed(1)}h
                      </td>
                      <td className="py-3 text-right tabular-nums text-neutral-500">
                        {formatAriary(item.unitPrice)}/h
                      </td>
                      <td className="py-3 text-right tabular-nums font-medium text-neutral-900">
                        {formatAriary(hours * item.unitPrice)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Table — services à la quantité */}
        {invoice.quantityDetails && invoice.quantityDetails.length > 0 && (
          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Services facturés à la quantité
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  <th className="pb-3 font-semibold">Description</th>
                  <th className="pb-3 text-right font-semibold">Quantité</th>
                  <th className="pb-3 text-right font-semibold">Prix unitaire</th>
                  <th className="pb-3 text-right font-semibold">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {invoice.quantityDetails.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 text-neutral-800">{item.serviceName}</td>
                    <td className="py-3 text-right tabular-nums text-neutral-500">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-right tabular-nums text-neutral-500">
                      {formatAriary(item.unitPrice)}
                    </td>
                    <td className="py-3 text-right tabular-nums font-medium text-neutral-900">
                      {formatAriary(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        <div className="mt-8 flex flex-col-reverse justify-between gap-6 sm:flex-row sm:items-end">
          {/* <p className="text-sm text-neutral-500">
            Échéance :{" "}
            <span className="text-neutral-800">{timestampToText(invoice.dueDate)}</span>
          </p> */}

          <div className="w-full rounded-xl bg-neutral-50 p-5 text-sm sm:w-72">
            <div className="flex justify-between py-1 text-neutral-500">
              <span>Total HT</span>
              <span className="tabular-nums">{formatAriary(invoice.totalHT!)}</span>
            </div>
            <div className="flex justify-between py-1 text-neutral-500">
              <span>Taxe</span>
              <span className="tabular-nums">{formatAriary(invoice.taxe)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-neutral-200 pt-2 text-base font-bold text-neutral-900">
              <span>Total TTC</span>
              <span className="tabular-nums">{formatAriary(invoice.totalTTC!)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-14 grid gap-8 border-t border-neutral-200 pt-8 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Contact
            </p>
            <div className="space-y-1.5 text-sm text-neutral-600">
              <p className="flex items-center gap-2">
                <Phone size={13} className="text-neutral-400" />
                {invoice.company?.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-neutral-400" />
                {invoice.company?.mail}
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Paiement
            </p>
            <div className="space-y-1.5 text-sm text-neutral-600">
              <p className="flex items-center gap-2">
                <Landmark size={13} className="text-neutral-400" />
                {invoice.company?.name}
              </p>
              <p className="tabular-nums">
                Total : {invoice.totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}