"use client";
import DeleteBox from "@/components/delete/delete-box";
import { deleteInvoice, updateInvoice } from "@/infrastructure/invoice/invoiceRequest";
import { PageType } from "@/types/component-type/PageType";
import { BillingEntity } from "@/types/entity-type/billingEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { timestampToText } from "@/utils/Util";
import { PaginationState } from "@tanstack/react-table";
import { BadgePercent, CalendarClock, ChevronLeft, ChevronRight, CircleCheck, CircleX, Edit, Info, Receipt, ReceiptText, Search } from "lucide-react";
import { useEffect, useState } from "react";

const tags = {
  reduction: "bg-amber-50 text-amber-800 border border-amber-300",
  periode: "bg-blue-50 text-blue-800 border border-blue-200",
  actif: "bg-green-50 text-green-800 border border-green-300",
  inactif: "bg-red-50 text-red-800 border border-red-200",
};

// Donnee Mock pour les factures (à remplacer par des données réelles)
export const mockBillings: BillingEntity[] = [
  {
    billID: "BILL-001",
    customer:  "Jean Dupont" ,
    status: 0, // ex: en attente
    billingDate: new Date("2026-06-01"),
    dueDate: new Date("2026-06-15"),
    totalAmount: 1250.5,
  },
  {
    billID: "BILL-002",
    customer:  "Marie Lefebvre" ,
    status: 1, // ex: payée
    billingDate: new Date("2026-06-05"),
    dueDate: new Date("2026-06-20"),
    totalAmount: 340.0,
  },
  {
    billID: "BILL-003",
    customer:  "Société Rakoto SARL" ,
    status: 2, // ex: en retard
    billingDate: new Date("2026-05-10"),
    dueDate: new Date("2026-05-25"),
    totalAmount: 9800.75,
  },
  {
    billID: "BILL-004", // ex: facture brouillon, pas encore générée
    customer:  "Andriamana Solofo" ,
    status: 3, // ex: brouillon
    billingDate: new Date("2026-07-01"),
    dueDate: new Date("2026-07-15"),
    totalAmount: 0,
  },
    {
    billID: "BILL-005",
    customer:  "Jean Dupont" ,
    status: 0, // ex: en attente
    billingDate: new Date("2026-06-01"),
    dueDate: new Date("2026-06-15"),
    totalAmount: 1250.5,
  },
  {
    billID: "BILL-006",
    customer:  "Marie Lefebvre" ,
    status: 1, // ex: payée
    billingDate: new Date("2026-06-05"),
    dueDate: new Date("2026-06-20"),
    totalAmount: 340.0,
  },
  {
    billID: "BILL-007",
    customer:  "Société Rakoto SARL" ,
    status: 2, // ex: en retard
    billingDate: new Date("2026-05-10"),
    dueDate: new Date("2026-05-25"),
    totalAmount: 9800.75,
  },
  {
    billID: "BILL-008", // ex: facture brouillon, pas encore générée
    customer:  "Andriamana Solofo" ,
    status: 3, // ex: brouillon
    billingDate: new Date("2026-07-01"),
    dueDate: new Date("2026-07-15"),
    totalAmount: 0,
  },
];


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
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    
    useEffect(()=>{
        setLoading(true);
        // Future requete facturation clients
        // if (user && user.profil.company.companyID){
        //     getPaginatePack(user.profil.company.companyID,page.pageIndex,page.pageSize)
        //     .then((data)=>{
        //         setPack(data.content);
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
          totalElement: mockBillings.length,
          totalPage: Math.ceil(mockBillings.length / page.pageSize),
        });
    },[refresh, page])

    const filtered = mockBillings.filter((b) => {
      const matchesName = b.customer
        .toLowerCase()
        .includes(search.toLowerCase());

      const invoiceDate = new Date(b.billingDate); // b.billingDate doit être parsable par `new Date(...)`

      const matchesFrom = dateFrom ? invoiceDate >= new Date(dateFrom) : true;
      const matchesTo = dateTo ? invoiceDate <= new Date(dateTo) : true;

      return matchesName && matchesFrom && matchesTo;
    });

    const onDelete = async (id: string) => {
        await deleteInvoice(id);
        setRefresh((prev) => prev + 1);
    }

    const onUpdate= async (invoice: BillingEntity) => {
        await updateInvoice(invoice);
    }

    const handleViewDetails = (invoice: BillingEntity) => {
    //   setSelectedPack(invoice);
    //   setOpenDetails(true);
    };
    return(
    <div className="container mx-auto py-10 px-3">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 border rounded-xl bg-slate-50/50 py-10 px-4">
        <h2 className="text-xl font-semibold">{"Liste des factures client"}</h2>
        {/* Barre d'outils */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              placeholder="Rechercher une facture..."
              value={search}
              onChange={(e) => { setSearch(e.target.value)}}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          {/* <button
            // onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium rounded-full border border-slate-500 text-white bg-slate-500 hover:bg-slate-600 transition-colors"
            onClick={() => handleAddPack()}
          >
            <Plus size={15} /> 
          </button> */}
        </div>
        
        {/* Liste */}
        <div className="relative border rounded-xl bg-slate-50/50 flex flex-col gap-3 p-3">
        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-4">Aucun facture trouvé.</p>
        )}
        {filtered.length > 0 && (
          filtered.map((invoice) => (
            <div
              key={invoice.billID}
              className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-2.5">
                  <p className="font-semibold text-gray-900 flex items-center gap-2 m-0">
                    <ReceiptText size={17} className="text-gray-400" />
                     <span className="text-xs font-medium text-gray-400">Facture N°{invoice.billID} </span> de {invoice.customer}
                  </p>
                  {/* <EntityBadge count={invoice.activityPack?.length ?? 0} label="activité" icon={<Sparkles size={12} />} className="bg-purple-500 text-white border-purple-50" />
                  <EntityBadge count={invoice.hotelsPack?.length ?? 0} label="hôtel" icon={<Hotel size={12} />} className="bg-blue-500 text-white border-blue-50" />
                  <EntityBadge count={invoice.restoPack?.length ?? 0} label="resto" icon={<UtensilsCrossed size={12} />} className="bg-orange-500 text-white border-orange-50" /> */}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${tags.reduction}`}>
                    <Receipt size={13} /> {invoice.totalAmount}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${tags.periode}`}>
                    <CalendarClock size={13} /> {timestampToText(invoice.billingDate)} → {timestampToText(invoice.dueDate)}
                  </span>
                  {invoice.status === 0 ? (
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${tags.actif}`}>
                      <CircleCheck size={13} /> Payé
                    </span>
                  ) : (
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${tags.inactif}`}>
                      <CircleX size={13} /> Non payé
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  className="p-1.5 rounded-md border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors" aria-label="Voir les détails"
                  onClick={() => handleViewDetails(invoice)} 
                  >
                  <Info size={15} />
                </button>
                <button 
                  className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" aria-label="Modifier"
                //   onClick={() => handleUpdatePack(invoice)}
                >
                  <Edit size={15} />
                </button>
                <DeleteBox id={invoice.billID!} onDelete={() => onDelete(invoice.billID!)} />
              </div>
            </div>
          )))}
        </div>
        
        {/* Pagination */}
        {all.totalPage > 1 && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{filtered.length} élément{filtered.length > 1 ? "s" : ""}</span>
            <div className="flex items-center gap-1">
              <button
                disabled={page.pageIndex === 0}
                onClick={() =>
                  setPage((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                  }))
                }               
                className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Page précédente"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: all.totalPage }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage((prev) => ({ ...prev, pageIndex: n - 1 }))}
                  className={`w-8 h-8 rounded-md border text-xs font-medium transition-colors ${
                    n === page.pageIndex + 1
                      ? "border-blue-200 bg-blue-50 text-blue-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
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
                className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Page suivante"
              >
                <ChevronRight size={15} />
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
