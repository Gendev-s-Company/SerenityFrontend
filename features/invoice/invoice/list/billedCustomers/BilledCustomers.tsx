"use client";
import { getBilledCustomers } from "@/infrastructure/invoice/invoiceRequest";
import { PageType } from "@/types/component-type/PageType";
import { CustomerEntity } from "@/types/entity-type/customerEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { getLocalStorage } from "@/utils/storage";
import { PaginationState } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Info, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BilledCustomers(){
    const user=getLocalStorage();
    const [billedCustomers,setBilledCustomers]=useState<CustomerEntity[]>([]);
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
    
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [filteredCustomers,setFilteredCustomers]= useState(billedCustomers);


    useEffect(() => {
        setLoading(true);
        if (user && user.profil.company.companyID) {
            getBilledCustomers(user.profil.company.companyID, page.pageIndex, page.pageSize)
                .then((data) => {
                    setBilledCustomers(data.content);
                    setFilteredCustomers(data.content);
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

    const navigate = (customerID : string) => router.push(`/view/invoice/billedCustomers/customerInvoices?customerID=${customerID}`);   

    // Filtre par nom
    const handleSearch = () => {
      const filtered = billedCustomers.filter((b) => {
        const invoiceDateStr = b.name.toLowerCase().includes(search.toLowerCase());
        return invoiceDateStr;
      });
      setFilteredCustomers(filtered);
    };

    return(
    <div className="container mx-auto py-10 px-3">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 border rounded-xl bg-slate-50/50 py-10 px-4">
        <h2 className="text-xl font-semibold">{"Liste des clients facturés"}</h2>
        {/* Barre de recherche */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                placeholder="Veuillez saisir le nom"
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
        {filteredCustomers.length === 0 && (
          <p className="text-gray-500 text-center py-4">Aucune facture trouvé.</p>
        )}
        {filteredCustomers.length > 0 && (
          filteredCustomers.map((customer) => (
            <div
              key={customer.customerID}
              className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex-1 min-w-0">
                {/* Titre */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                      <User size={18} className="text-blue-600" />
                    </div>
                    {/* N° Facture et Nom du client */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                       {customer.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                         Client #
                        <span title={customer.customerID!} className="ml-1 font-medium text-gray-700">
                          {customer.customerID}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>

              {/* Bouton Actions */}
              <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                {/* VOIR FACTURE CLIENT */}
                <button
                  onClick={() => navigate(customer.customerID!)}
                  aria-label="Voir les détails"
                  title="Voir les détails"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Info size={16} />
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
                {filteredCustomers.length}
              </span>
                  
              <span>
                Clients {filteredCustomers.length > 1 ? "s" : ""} trouvés
                {filteredCustomers.length > 1 ? "s" : ""}
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
    </div>
    );
}
