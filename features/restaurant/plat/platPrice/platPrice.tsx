"use client";
import { DataTable } from "@/components/liste/complexe-data-table";
import { ColumnConfig } from "@/types/component-type/column-config";
import { useEffect, useMemo, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { pageSize } from "@/utils/PaginationUtility";
import { PageType } from "@/types/component-type/PageType";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { getLocalStorage } from "@/utils/storage";
import { PlatPriceEntity } from "@/types/entity-type/platPriceEntity";
import { createplatPrice, deleteplatPrice, getPaginateplatPrices, updateplatPrice } from "@/infrastructure/restaurant/plat/platPrice/platPriceRequest";
import { PlatPriceColumnOptions, PlatPriceNamefield } from "./prep-view-platPrice";
import { PlatTypeEntity } from "@/types/entity-type/platTypeEntity";

interface PlatPriceProps {
  PlatId: string;
  refresh: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRefresh: (value: any) => void;
}
export default function PlatPrice({ PlatId, refresh, setRefresh }: PlatPriceProps) {
  const PlatID = PlatId;
  const [PlatPrice, setPlatPrice] = useState<PlatPriceEntity[]>([]);
  // const [refresh, setRefresh] = useState<number>(0);
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
    if (PlatID) {
      getPaginateplatPrices(
        PlatID,
        page.pageIndex,
        page.pageSize,
      )
        .then((data) => {
          setPlatPrice(data.content);
          console.log(data.content);
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
          console.error("Error fetching activities:", error)
          setLoading(false)
        });
    }
  }, [refresh, page.pageIndex]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdate = async (formData: PlatPriceEntity) => {
    await updateplatPrice(formData);
    setRefresh((prev: number) => prev + 1);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDelete = async (id: string | null) => {
    if (id !== null) {
      await deleteplatPrice(id);
      setRefresh((prev: number) => prev + 1);
    }
  };



  const columns = useMemo(() => {
    const btnAction: ColumnConfig<PlatPriceEntity> = {
      key: "action_btn",
      header: "Action",
      type: "button",
      hiding: false,
      onUpdate: (row) => onUpdate(row),
      onDelete: (row) => onDelete(row.priceID),
      onClick: (row) => console.log("Editer", row.priceID),
    };
    return [...PlatPriceColumnOptions, btnAction];
  }, [onUpdate, onDelete]);

  
  const company: CompanyEntity = {
    skipValidation: true,
    companyID: user?.profil?.company.companyID,
    mail: "",
    name: "",
    phone: "",
    status: 0,
  };

  const PlatType: PlatTypeEntity = {
        typeID: null,
        company: company,
        name: "",
        description: "",
        status: 0,
        skipValidation: false,
      };
  

  // const Plat: PlatEntity = {
  //   skipValidation: true,
  //   dishID: PlatID,
  //   type: PlatType,
  //   name: "",
  //   description: "",
  //   status: 0,
  //   state : 0
  // };

  const body: PlatPriceEntity = {
    priceID: null,
    // dish: Plat,
    dishID : PlatID,
    price: 0,
    dateChanged: new Date(),
    status: 0,
    skipValidation: false,
  };

  const onCreate = async (formData: PlatPriceEntity) => {

    console.log("TRYYY ",formData);

    await createplatPrice(formData);
    setRefresh((prev: number) => prev + 1);
  };
  return (
    <div className="container mx-auto py-10 px-3">
      <DataTable
        body={body}
        onCreate={onCreate}
        data={PlatPrice}
        mcolumns={columns}
        fields={PlatPriceNamefield}
        columnFilter="price"
        pageCount={all.totalPage}
        rowCount={all.totalElement}
        onPaginationChange={setPage}
        pagination={page}
        loading={loading}
        authority={user?.profil?.authority}
      />
    </div>
  );
}