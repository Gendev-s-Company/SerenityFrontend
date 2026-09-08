"use client";
import { DataTable } from "@/components/liste/complexe-data-table";
import { createCustomer, deleteCustomer, getPaginateCustomers, updateCustomer } from '@/infrastructure/hotel/customer/customerRequest';
import { ColumnConfig } from "@/types/component-type/column-config";
import { useEffect, useMemo, useState } from "react";
import { CustomerColumnOptions, CustomerNamefield } from "./prep-view-customer";
import { PaginationState } from "@tanstack/react-table";
import { pageSize } from "@/utils/PaginationUtility";
import { PageType } from "@/types/component-type/PageType";
import { getLocalStorage } from "@/utils/storage";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { CustomerEntity } from "@/types/entity-type/customerEntity";
import { InvoiceData } from "@/lib/invoice-data";
import {statusLabel} from "@/lib/utils";

function mapRowToInvoice(row: any): InvoiceData {
  // adapte les champs à la forme réelle de ton `row`
  return {
    invoiceNumber: row.invoiceNumber ?? row.id,
    date: row.date,
    dueDate: row.dueDate,
    taxRate: row.taxRate ?? 0.3,
    company: {
      name: row.company?.name ?? "Studio Salford",
      phone: row.company?.phone ?? "",
      mail: row.company?.mail ?? "",
      address: row.company?.address ?? "",
    },
    billedTo: {
      name: row.clientName,
      phone: row.clientPhone,
      address: row.clientAddress,
    },
    payment: {
      accountHolder: row.payment?.accountHolder ?? "",
      bank: row.payment?.bank ?? "",
      accountNumber: row.payment?.accountNumber ?? "",
    },
    items: row.items ?? [],
  };
}
export default function Customer(){
    const[customer,setCustomer]=useState<CustomerEntity[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const [page, setPage] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSize,
    });
    const [all, setAll] = useState<PageType>({
      totalElement: 0,
      totalPage: 0,
    });
    const [loading, setLoading] = useState(true)
    const user = getLocalStorage()!;
    // 1. état pour la facture actuellement en aperçu
    const [previewInvoice, setPreviewInvoice] = useState<InvoiceData | null>(null);
    const [openInvoiceModal, setOpenInvoiceModal] = useState(false);

    useEffect(() => {
       // eslint-disable-next-line react-hooks/set-state-in-effect
       setLoading(true)
       if (user && user.profil.company.companyID) {
         getPaginateCustomers(
           user.profil.company.companyID!,
           page.pageIndex,
           page.pageSize,
          )
           .then((data) => {
            const mappedData = data.content.map((item) => ({
              ...item,
              stateLabel: statusLabel[item.status] || "Inconnu",
            }));
            setCustomer(mappedData);
            setPage((prevPage) => ({
              ...prevPage,
              pageIndex: data.page.number,
            }));
             setAll({
               totalElement: data.page.totalElements,
               totalPage: data.page.totalPages,
             });
             setLoading(false)
           })
           .catch((error) => {
             console.error("Error fetching customers:", error)
             setLoading(false)
           });
       }
    }, [refresh, page.pageIndex]);

    const onUpdate = async (formData: CustomerEntity) => {
      await updateCustomer(formData);
      setRefresh((prev) => prev + 1);
    };

    const onDelete = async (id: string | null) => {
      if (id !== null) {
        await deleteCustomer(id);
        setRefresh((prev) => prev + 1);
      }
    };
    
  // la fonction que ton bouton appelle déjà
    function printReceipt(row: any) {
      setPreviewInvoice(mapRowToInvoice(row));
      setOpenInvoiceModal(true);
    }

    const btnAction: ColumnConfig<CustomerEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.customerID),
      onClick: (row) => console.log("Editer", row.customerID),

    };

    const columns = useMemo(() => {
      return [...CustomerColumnOptions, btnAction];
    }, []);

    const company: CompanyEntity = {
      skipValidation: true,
      companyID: user?.profil?.company.companyID,
      mail: "",
      name: "",
      phone: "",
      status: 0,
    };
    
    const body: CustomerEntity = {
      customerID: null,
      company: company,
      name: "",
      phone: "",
      mail:"",
      cin:"",
      address:"",
      status: 0,
      skipValidation:true,
    };

    const onCreate = async (formData: CustomerEntity) => {

      await createCustomer(formData);
      setRefresh((prev) => prev + 1);
    };

    return (
      <div className="container mx-auto py-10 px-3">
        <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
          <h2 className="text-xl font-semibold">{"Clients de l'établissement"}</h2>
          <DataTable
            body={body}
            onCreate={onCreate}
            data={customer}
            mcolumns={columns}
            fields={CustomerNamefield}
            columnFilter="name"
            pageCount={all.totalPage}
            rowCount={all.totalElement}
            onPaginationChange={setPage}
            pagination={page}
            loading={loading}
            authority={user?.profil?.authority}
          />
        </div>
        
        {/* Detail de la facture d'un client */}
        {/* <InvoicePreviewModal invoice={previewInvoice} open={openInvoiceModal} onOpenChange={setOpenInvoiceModal}/>          */}
      </div>
    );
    
}