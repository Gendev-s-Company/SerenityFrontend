"use client";
import { DataTable } from "@/components/liste/complexe-data-table";
import { createCompany, deleteCompany, getPaginateCompany, updateCompany } from "@/infrastructure/user/company/companyRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { FieldConfig } from "@/types/component-type/form-type";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { useEffect, useState } from "react";

export default function Company() {
    const [profil, setProfil] = useState<CompanyEntity[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const [page, setPage] = useState(0)
    useEffect(() => {
        getPaginateCompany(page, 10)
            .then((data) => {
                setProfil(data.content)
                setPage(data.pageable.pageNumber)
            })
            .catch((error) => console.error("Error fetching company:", error));
    }, [refresh]);
    const onUpdate = async (formData: CompanyEntity) => {
        await updateCompany(formData);
        setRefresh((prev) => prev + 1);
    };
    const onDelete = async (id: string) => {
        await deleteCompany(id);
        setRefresh((prev) => prev + 1);
    };

    const ColumnOptions: ColumnConfig<CompanyEntity>[] = [
        { key: "select", header: "Select", type: "checkbox" },
        { key: "companyID", header: "companyID", sorting: true },
        { key: "mail", header: "Email", sorting: true },
        {
            key: "name",
            header: "Nom",
            type: "text",
            href: (row) => `/profil/${row?.companyID}`,
            hiding: false,
        },
        { key: "phone", header: "Téléphone", type: "text", sorting: true },
        { key: "status", header: "Statut", sorting: true },
        {
            key: "action_btn",
            header: "Action",
            type: "button",
            hiding: false,
            onUpdate: (row) => onUpdate(row),
            onDelete: (row) => onDelete(row.companyID),
            onClick: (row) => console.log("Editer", row.companyID),
        },
    ];
    //     companyID
// mail
// name
// phone
// status
    const namefield: FieldConfig<CompanyEntity>[] = [
        { name: "name", libelle: "Nom :", type: "text", normal: true },
        { name: "mail", libelle: "Email :", type: "text", normal: true },
        { name: "phone", libelle: "Téléphone :", type: "text", normal: true },
        { name: "status", libelle: "Statut :", type: "number", normal: true }
    ];
    const body: CompanyEntity = {
        companyID: "",
        name: "",
        mail: "",
        phone: "",
        status: 0,
    };
    const onCreate = async (formData: CompanyEntity) => {
        await createCompany(formData);
        setRefresh((prev) => prev + 1);
    };
    return (
        <div className="container mx-auto py-10 px-3">
            <DataTable
                body={body}
                onCreate={onCreate}
                data={profil}
                mcolumns={ColumnOptions}
                fields={namefield}
                columnFilter="name"
            />
        </div>
    );
}