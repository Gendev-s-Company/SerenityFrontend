"use client";
import DeleteBox from "@/components/delete/delete-box";
import { deleteInvoice, getPaginateCustomerInvoice, updateInvoice, updateInvoiceState } from "@/infrastructure/invoice/invoiceRequest";
import { PageType } from "@/types/component-type/PageType";
import { BillingEntity } from "@/types/entity-type/billingEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { timestampToText } from "@/utils/Util";
import { PaginationState } from "@tanstack/react-table";
import { CalendarClock, Check, ChevronLeft, ChevronRight, CircleCheck, CircleX, Edit, Info, Percent, Receipt, ReceiptText, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {mockBillings} from "./BillingMockData";


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
    const [openDetails, setOpenDetails] = useState(false);
    const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredBillings,setFilteredBillings]= useState(mockBillings);
    
    useEffect(()=>{
        setLoading(true);
        // Future requete facturation clients
        // if (user && user.profil.company.companyID){
        //     getPaginateCustomerInvoice(user.profil.company.companyID,page.pageIndex,page.pageSize)
        //     .then((data)=>{
        //         setInvoices(data.content);
        //           setAll({
        //             totalElement: data.page.totalElements,
        //             totalPage: data.page.totalPages,
        //           })
        //         setLoading(false);
        //     })
        //     .catch((error)=>{
        //         console.error("Error fetching invoices.",error);
        //         setLoading(false);
        //     })
        // }
        setAll({
          totalElement: filteredBillings.length,
          totalPage: Math.ceil(filteredBillings.length / page.pageSize),
        });
    },[refresh, page])

    // Filtre par date
    // A corriger avec les donnees dynamiques
    const handleSearch = () => {
      const filtered = mockBillings.filter((b) => {
        const invoiceDate = new Date(b.billingDate);
      
        const matchesFrom = search
          ? invoiceDate >= new Date(search)
          : true;
      
        const matchesTo = search
          ? invoiceDate <= new Date(search)
          : true;
      
        return matchesFrom && matchesTo;
      });
    
      setFilteredBillings(filtered);
    };


    // A placer dans les boutons actions pour les donnees dynamiques
    const onDelete = async (id: string) => {
        await deleteInvoice(id);
        setRefresh((prev) => prev + 1);
    }

    const onUpdate= async (invoice: BillingEntity,state: number) => {
        await updateInvoiceState(invoice,state);
    }

    const handleViewDetails = (invoice: BillingEntity) => {
    //   setSelectedPack(invoice);
    //   setOpenDetails(true);
    };
    return(
    <div className="container mx-auto py-10 px-3">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 border rounded-xl bg-slate-50/50 py-10 px-4">
        <h2 className="text-xl font-semibold">{"Liste des factures client"}</h2>
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
                          {invoice.customerID}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Etat de la facture :Payé/Non payé */}
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      invoice.status === 1
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {invoice.status === 1 ? (
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
                </div>
                  
                {/* Informations */}
                <div className="grid gap-2 sm:grid-cols-3">
                  
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                      <Receipt size={14} />
                      Montant
                    </div>
                  
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {invoice.totalAmount}
                    </p>
                  </div>
                  
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                      <CalendarClock size={14} />
                      Période
                    </div>
                  
                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {timestampToText(invoice.billingDate)}
                    </p>
                  
                    <p className="text-xs text-gray-500">
                      jusqu'au {timestampToText(invoice.dueDate)}
                    </p>
                  </div>
                  
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
                      <Percent size={14} />
                      Taxe
                    </div>
                  
                    <p className="mt-1 text-lg font-bold text-indigo-600">
                      {invoice.taxe}%
                    </p>
                  </div>
                  
                </div>
              </div>

              {/* Bouton Actions */}
              <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => handleViewDetails(invoice)}
                  aria-label="Voir les détails"
                  title="Voir les détails"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Info size={16} />
                </button>

                {invoice.status === 1 ? (
                  <button
                    onClick={() => onUpdate(invoice,0)}
                    aria-label="Modifier"
                    title="Modifier"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-amber-600 transition-all duration-200 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => onUpdate(invoice,1)}
                    aria-label="Modifier"
                    title="Modifier"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-amber-600 transition-all duration-200 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <Check size={16} />
                  </button>
                  )}
                <button
                  // onClick={() => handleUpdatePack(invoice)}
                  aria-label="Supprimer"
                  title="Supprimer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-amber-600 transition-all duration-200 hover:bg-amber-50 hover:text-amber-700"
                >
                  <Trash2 size={16} />
                </button>
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

      {/* Ajout/Modification de nouveau invoice */}
      {/* <AddPackDetails  openPacks={openModalAddPack} onOpenChange={setOpenModalAddPack} invoiceToEdit={selectedPack} onSuccess={() => setRefresh((prev) => prev + 1)} /> */}

      {/* Detail d'un invoice */}
      {/* <PackDetails invoice={selectedPack!} open={openDetails} onOpenChange={setOpenDetails} /> */}
    </div>
    );
}
