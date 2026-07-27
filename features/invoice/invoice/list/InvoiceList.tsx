"use client";
import DeleteBox from "@/components/delete/delete-box";
import { deleteInvoice, getPaginateBillings, updateInvoiceState } from "@/infrastructure/invoice/invoiceRequest";
import { PageType } from "@/types/component-type/PageType";
import { BillingEntity } from "@/types/entity-type/billingEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { timestampToText } from "@/utils/Util";
import { PaginationState } from "@tanstack/react-table";
import { CalendarClock, Check, ChevronLeft, ChevronRight, CircleCheck, CircleX, HandCoins, Info, Percent, Receipt, ReceiptText, Search, TicketPercent, X } from "lucide-react";
import { useEffect, useState } from "react";
import InvoiceDetails from "./details/InvoiceDetails";
import { toast } from "sonner";
import InvoicePreviewModal from "../InvoicePreviewModal";
import { formatAriary } from "@/lib/invoice-data";
import Tooltips from "@/components/tooltips/tooltips";


export default function InvoiceList() {
    const user=getLocalStorage();
    const [invoices, setInvoices]=useState<BillingEntity[]>([]);
    const [refresh, setRefresh]= useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSize,
    })  
    const [all, setAll] = useState<PageType>({
      totalElement: 0,
      totalPage: 0,
    })
    const [selectedInvoice,setSelectedInvoice]= useState<BillingEntity>();
    const [openDetails, setOpenDetails] = useState(false);
    const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredBillings,setFilteredBillings]= useState(invoices);
    
    useEffect(() => {
        setLoading(true);
        if (user && user.profil.company.companyID) {
            getPaginateBillings(user.profil.company.companyID, page.pageIndex, page.pageSize)
                .then((data) => {
                    setInvoices(data.content);
                    setFilteredBillings(data.content);
                    setAll({
                        totalElement: data.page.totalElements,
                        totalPage: data.page.totalPages,
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching invoices.", error);
                    setLoading(false);
                });
        }
    }, [refresh, page]);

    // Filtre par date
    const handleSearch = () => {
      const filtered = invoices.filter((b) => {
        const invoiceDateStr = b.billingDate.slice(0, 10); // "2026-07-20"
        const matchesFrom = search ? invoiceDateStr === search : true;
        return matchesFrom;
      });
    
      setFilteredBillings(filtered);
    };

    // A placer dans les boutons actions pour les donnees dynamiques
    const onDelete = async (id: string) => {
      try{
        await deleteInvoice(id);
        toast.success("Modification réussie",{ position: "top-right" });
        setRefresh((prev) => prev + 1);
      }
      catch(error : unknown){
          const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue";
          toast.error(errorMessage, { position: "top-right" });
          setRefresh((prev) => prev + 1);
      }
    }

    const onUpdate = async (invoice: BillingEntity, state: number) => {
         try{
          await updateInvoiceState(invoice,state);
          toast.success("Modification réussie",{ position: "top-right" });
          setRefresh((prev) => prev + 1);
        }
        catch(error : unknown){
          const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue";
          toast.error(errorMessage, { position: "top-right" });
        }    
    }

    const handleViewDetails = (invoice: BillingEntity) => {
      setSelectedInvoice(invoice);
      setOpenDetails(true);
    };

    const printReceipt = (invoice: BillingEntity) => {
      setSelectedInvoice(invoice);
      setOpenInvoiceModal(true);
    }

    return(
    <div className="container mx-auto py-10 px-3">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 border rounded-xl bg-slate-50/50 py-10 px-4">
        <h2 className="text-xl font-semibold">{"Liste des factures"}</h2>
        {/* Barre de recherche */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full pl-9 pr-3 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              className="h-10 inline-flex items-center justify-center gap-1.5 px-4 rounded-xl border border-slate-500 bg-slate-500 text-white text-sm font-medium transition-colors hover:bg-slate-600"
              onClick={handleSearch}
            >
              <Search size={15} />
              Rechercher
            </button>
          </div>
        
        {/* Liste */}
        <div className="relative border rounded-xl bg-slate-50/50 flex flex-col gap-3 p-3">
        {filteredBillings.length === 0 && (
          <p className="text-gray-500 text-center py-4">Aucune facture trouvé.</p>
        )}
        {filteredBillings.length > 0 && (
          filteredBillings.map((invoice) => (
            <div
              key={invoice.billID}
              className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex-1 min-w-0">
                {/* Titre */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
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
                    <div className="ml-auto flex items-center gap-2">
                      {/* Taxe */}
                      <Tooltips children={ 
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold
                            ${invoice.taxe != null ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-900"}`}
                        >
                          <HandCoins  size={13} />
                          {invoice.taxe != null ? `${invoice.taxe}%` : "—"}

                        </span>
                      } 
                        libelle={"Taxe"}
                      >                       
                      </Tooltips>
                                                                
                      {/* Etat de la facture : Payé/Non payé */}
                      <Tooltips children={ 
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            invoice.state === 1
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {invoice.state === 1 ? (
                            <>
                              <CircleCheck size={13} />
                              Payée
                            </>
                          ) : (
                            <>
                              <CircleX size={13} />
                              Non payée
                            </>
                          )}
                        </span>
                            } 
                          libelle={"Etat de facturation"}
                        >                       
                      </Tooltips>
                    </div>
                </div>
                  
                {/* Informations */}
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Total HT */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                      <Receipt size={14} />
                      Montant HT
                    </div>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {formatAriary(invoice.totalHT!)}
                    </p>
                  </div>

                  {/* Total TTC */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                      <Receipt size={14} />
                      Montant TTC
                    </div>
                    <p className="mt-1 text-lg font-bold text-blue-700">
                      {formatAriary(invoice.totalTTC!)} 
                    </p>
                  </div>

                  {/* Date */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                      <CalendarClock size={14} />
                      Période
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {timestampToText(invoice.billingDate)}
                    </p>
                  </div>

                  {/* Si un pack promo est affilié a cette facture  */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                      <TicketPercent size={14} />
                      Promotion
                    </div>
                    <p className="mt-1 text-lg font-bold text-gray  -600">
                       {invoice.packID != null ? `${invoice.packID}%` : "—"}
                    </p>
                  </div>

                </div>
              </div>

              {/* Bouton Actions */}
              <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                <Tooltips libelle="Voir détails">
                  {/* VOIR DETAILS FACTURE CLIENT */}
                  <button
                    onClick={() => handleViewDetails(invoice)}
                    aria-label="Voir les détails"
                    title="Voir les détails"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white"
                  >
                    <Info size={16} />
                  </button>
                </Tooltips>

                {/* APERCU DE LA FACTURE */}
                <Tooltips libelle="Apercu de la facture">
                  <button
                    onClick={() => printReceipt(invoice)}
                    aria-label="Voir l'aperçu"
                    title="Voir l'aperçu"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-all duration-200 hover:bg-gray-600 hover:text-white"
                  >
                    <ReceiptText size={16} />
                  </button>
                </Tooltips>

                {/* MODIFIER ETAT */}
                <Tooltips libelle = {invoice.state === 1 ? "Annuler la validation": "Valider la facture"}>
                {invoice.state === 1 ? (

                  <button
                    onClick={() => onUpdate(invoice, 0)}
                    aria-label="Modifier"
                    title="Annuler validation"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => onUpdate(invoice, 1)}
                    aria-label="Modifier"
                    title="Valider paiement"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-green-600 transition-all duration-200 hover:bg-green-600 hover:text-white"
                  >
                    <Check size={16} />
                  </button>
                  )}
                  </Tooltips>

                  {/* SUPPRIMER */}
                  <DeleteBox id={invoice.billID!} onDelete={() => onDelete(invoice.billID!)}></DeleteBox>
              </div>
            </div>
          )))}
        </div>
        
        {/* Pagination */}
        {all.totalPage > 1 && (
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-3">
                  
            {/* Informations */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-gray-800">
                {filteredBillings.length}
              </span>
                  
              <span>
                facture{filteredBillings.length > 1 ? "s" : ""} trouvée
                {filteredBillings.length > 1 ? "s" : ""}
              </span>
                  
              <span className="text-gray-300">•</span>
                  
              <span>
                Page <span className="font-semibold text-gray-800">{page.pageIndex + 1}</span>
                {" / "}
                <span className="font-semibold text-gray-800">{all.totalPage}</span>
              </span>
            </div>
                  
            {/* Navigation */}
            <div className="flex items-center gap-2">
                  
              <button
                disabled={page.pageIndex === 0}
                onClick={() =>
                  setPage((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                  }))
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>
              
              {Array.from({ length: all.totalPage }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() =>
                    setPage((prev) => ({
                      ...prev,
                      pageIndex: n - 1,
                    }))
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                    n === page.pageIndex + 1
                      ? "bg-slate-600 text-white shadow-md"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow"
                  }`}
                >
                  {n}
                </button>
              ))}
          
              <button
                disabled={page.pageIndex + 1 >= all.totalPage}
                onClick={() =>
                  setPage((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }))
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
              
            </div>
          </div>
        )}
      </div>
      {/* Aperçu de la facture  */}
      <InvoicePreviewModal invoice={selectedInvoice!} open={openInvoiceModal} onOpenChange={setOpenInvoiceModal}/>         

      {/* Detail d'un invoice */}
      <InvoiceDetails invoice={selectedInvoice!} open={openDetails} onOpenChange={setOpenDetails} />
    </div>
    );
}
