import { Phone, Mail, MapPin, Landmark, Hash, CalendarDays, Check } from "lucide-react";
import { InvoiceData, computeTotals, formatUSD } from "@/lib/invoice-data";
import InvoiceDownloadButton from "./InvoiceDownloadButton";
import { useEffect } from "react";

export default function InvoicePreview({
  invoice,
  showDownloadButton = true,
}: {
  invoice: InvoiceData;
  showDownloadButton?: boolean;
}) {
  const { subTotal, tax, total } = computeTotals(invoice);
  const [firstWord, ...rest] = invoice.company.name.split(" ");
  useEffect(() => {
    console.log("InvoicePreview rendered with invoice:", invoice);
  },[]);


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
              {firstWord}
              <br />
              {rest.join(" ")}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-neutral-900">
              Facture
            </h1>
            <div className="flex flex-col gap-1 text-sm text-neutral-500 sm:items-end">
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Hash size={13} className="text-neutral-400" />
                {invoice.invoiceNumber}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={13} className="text-neutral-400" />
                {invoice.date}
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
            {invoice.billedTo.name}
          </p>
          <p className="text-sm text-neutral-500">{invoice.billedTo.phone}</p>
          <p className="text-sm text-neutral-500">{invoice.billedTo.address}</p>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <th className="pb-3 font-semibold">Description</th>
              <th className="pb-3 text-right font-semibold">Heures</th>
              <th className="pb-3 text-right font-semibold">Taux</th>
              <th className="pb-3 text-right font-semibold">Montant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {invoice.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-3 text-neutral-800">{item.description}</td>
                <td className="py-3 text-right tabular-nums text-neutral-500">
                  {item.hours}
                </td>
                <td className="py-3 text-right tabular-nums text-neutral-500">
                  ${item.rate}/h
                </td>
                <td className="py-3 text-right tabular-nums font-medium text-neutral-900">
                  {formatUSD(item.hours * item.rate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-8 flex flex-col-reverse justify-between gap-6 sm:flex-row sm:items-end">
          <p className="text-sm text-neutral-500">
            Échéance : <span className="text-neutral-800">{invoice.dueDate}</span>
          </p>

          <div className="w-full rounded-xl bg-neutral-50 p-5 text-sm sm:w-72">
            <div className="flex justify-between py-1 text-neutral-500">
              <span>Sous-total</span>
              <span className="tabular-nums">{formatUSD(subTotal)}</span>
            </div>
            <div className="flex justify-between py-1 text-neutral-500">
              <span>Taxe ({Math.round(invoice.taxRate * 100)}%)</span>
              <span className="tabular-nums">{formatUSD(tax)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-neutral-200 pt-2 text-base font-bold text-neutral-900">
              <span>Total</span>
              <span className="tabular-nums">{formatUSD(total)}</span>
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
                {invoice.company.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-neutral-400" />
                {invoice.company.mail}
              </p>
              {/* <p className="flex items-center gap-2">
                <MapPin size={13} className="text-neutral-400" />
                {invoice.company.address}
              </p> */}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Paiement
            </p>
            <div className="space-y-1.5 text-sm text-neutral-600">
              <p className="font-medium text-neutral-800">
                {invoice.payment.accountHolder}
              </p>
              <p className="flex items-center gap-2">
                <Landmark size={13} className="text-neutral-400" />
                {invoice.payment.bank}
              </p>
              <p className="tabular-nums">
                N° de compte : {invoice.payment.accountNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}