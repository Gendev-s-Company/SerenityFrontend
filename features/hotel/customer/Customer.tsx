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
             setCustomer(data.content);
             setPage((prevPage) => ({
               ...prevPage,
               pageIndex: data.pageable.pageNumber,
             }));
             setAll({
               totalElement: data.totalElements,
               totalPage: data.totalPages,
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
      console.log(user);
    
      console.log(formData);

      await createCustomer(formData);
      setRefresh((prev) => prev + 1);
    };

    return (
      <div className="container mx-auto py-10 px-3">
        <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
          <h2 className="text-xl font-semibold">{"Clients de l'hôtel"}</h2>
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
          />
        </div>
      </div>
    );
    
}