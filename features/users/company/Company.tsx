"use client";
import { DataTable } from "@/components/liste/complexe-data-table";
import { createCompany, deleteCompany, getPaginateCompany, updateCompany } from "@/infrastructure/user/company/companyRequest";
import { ColumnConfig } from "@/types/component-type/column-config";
import { PageType } from "@/types/component-type/PageType";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { pageSize } from "@/utils/PaginationUtility";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { CompanyColumnOptions, CompanyNamefield } from "./prep-view-company";

export default function Company() {
    const [company, setCompany] = useState<CompanyEntity[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const [page, setPage] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    })
    const [all, setAll] = useState<PageType>({
        totalElement: 0,
        totalPage: 0
    })
  const [loading, setLoading] = useState(true)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true)
        getPaginateCompany(page.pageIndex, page.pageSize)
            .then((data) => {
                setCompany(data.content)
                setPage(prevPage => ({
                    ...prevPage,
                    pageIndex: data.pageable.pageNumber
                }));
                setAll({
                    totalElement: data.totalElements,
                    totalPage: data.totalPages
                })
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching company:", error)
                setLoading(false)
            }
        );
    }, [refresh, page.pageIndex, page.pageSize]);

    const onUpdate = async (formData: CompanyEntity) => {
        await updateCompany(formData);
        setRefresh((prev) => prev + 1);
    };
    const onDelete = async (id: string | null) => {
        if (id !== null) {
            await deleteCompany(id);
            setRefresh((prev) => prev + 1);
        }
    };
    const btnAction: ColumnConfig<CompanyEntity> = {
        key: "action_btn",
        header: "Action",
        type: "button",
        hiding: false,
        onUpdate: (row) => onUpdate(row),
        onDelete: (row) => onDelete(row.companyID),
        onClick: (row) => console.log("Editer", row.companyID),
    };
    const columns = useMemo(() => {
        return [...CompanyColumnOptions, btnAction];
    }, []);


    const body: CompanyEntity = {
        companyID: null,
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
                data={company}
                mcolumns={columns}
                fields={CompanyNamefield}
                pageCount={all.totalPage}
                rowCount={all.totalElement}
                onPaginationChange={setPage}
                pagination={page}
                columnFilter="name"
                loading={loading}
            />
        </div>
    );
}