import Forms, { formatDateForInput } from "@/components/form-component/Forms";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import useForm from "@/hooks/use-form";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { getLocalStorage } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import { ReservationFieldValidator } from "../reservation";
import { ReservationTableEntity } from "@/types/entity-type/reservationTableEntity";
import { RestaurantTableEntity } from "@/types/entity-type/restauranTableEntity";
import { getAllTableAvalaible } from "@/infrastructure/restaurant/table/restauranttable/restaurantTableRequest";

interface Form {
  init: ReservationTableEntity;
  handleForms: (name: string, value: string) => void;
  validators: ReservationFieldValidator[];
  setValidator: (values: ReservationFieldValidator[]) => void;
  setPass: (value: boolean) => void;
}
interface TableChoice {
  starttime: string;
  endtime: string;
}
const TableChoice = ({
  handleForms,
  init,
  validators,
  setValidator,
  setPass,
}: Form) => {
  const [filters, setFilters] = useState<FieldOptions[]>([]);
  const [tables, settables] = useState<FieldOptions[]>([]);
  const user = getLocalStorage()!;

  const body: TableChoice = {
    starttime: init.starttime,
    endtime: init.endtime,
  };
  const forms = useForm(body);
  useEffect(() => {
    if (
      user &&
      user?.profil?.company?.companyID &&
      forms.getForm.endtime !== "" &&
      forms.getForm.starttime !== ""
    ) {
      getAllTableAvalaible(
        user.profil.company.companyID,
        [0, 1],
        forms.getForm.starttime,
        forms.getForm.endtime,
      )
        .then((data) => {
          const list = convertListtablesToOption(data);
          settables(list);
          const choosed = list.find((c) => c.id === init.tableID);
          if (choosed) {
            setFilters([choosed]);
            setPass(true);
          }
          // mila amboarina
          if (init.tableID && !choosed) {
            const list_validator: ReservationFieldValidator[] = [];
            list_validator.push({
              field: "tableID",
              isValid: false,
              message: `La table ${init.tableID} n'est malheureusement pas disponible à cette date`,
            });
            handleForms("tableID", "");
            setValidator(list_validator);
            setPass(false);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [forms.getForm.endtime, forms.getForm.starttime]);

  const isDisable =
    forms.getForm.endtime === "" || forms.getForm.starttime === ""
      ? true
      : false;
  const updateFilter = (filters: FieldOptions[]) => {
    setFilters(filters);
    const value = filters.length > 0 ? filters[0].id : "";
    handleForms("tableID", value);
    setPass(true)
    setValidator([]);
  };
  const getValidator = (name: string) => {
    if (validators.length > 0) {
      return validators.find((p) => p.field === name);
    }
    return null;
  };
  return (
    <div>
      {/* <form> */}
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Choix de table
      </h3>

      <div className="flex flex-row gap-6 p-3">
        <Field data-invalid={getValidator("starttime") ? true : false}>
          <FieldLabel htmlFor={"start"}>
            {getValidator("starttime")
              ? getValidator("starttime")?.message
              : "Date début: "}
          </FieldLabel>
          <Input
            id={"start"}
            name={"starttime"}
            type={"datetime-local"}
            value={formatDateForInput(
              forms.getForm.starttime,
              "datetime-local",
            )}
            onChange={(e) => {
              forms.handleInputChange("starttime", e.target.value);
              handleForms("starttime", forms.getForm.starttime);
              // setValidator([])
            }}
            required
          />
        </Field>
        <Field data-invalid={getValidator("endtime") ? true : false}>
          <FieldLabel htmlFor={"end"}>
            {getValidator("endtime")
              ? getValidator("endtime")?.message
              : "Date fin: "}
          </FieldLabel>
          <Input
            id={"end"}
            name={"endtime"}
            type={"datetime-local"}
            value={formatDateForInput(forms.getForm.endtime, "datetime-local")}
            onChange={(e) => {
              forms.handleInputChange("endtime", e.target.value);
              handleForms("endtime", forms.getForm.endtime);
              // setValidator([])
            }}
            required
          />
        </Field>
      </div>
      <div className="flex flex-col gap-6 p-3">
        <Field data-invalid={getValidator("tableID") ? true : false}>
          <FieldLabel htmlFor={"S"}>
            {getValidator("tableID")
              ? getValidator("tableID")?.message
              : "Choisir la table voulue: "}
          </FieldLabel>
          <MultiSelect
            setOpts={updateFilter}
            safidy={filters}
            opts={tables}
            multi={false}
            placeholder="Choisir la table voulue"
            disable={isDisable}
          />
        </Field>
      </div>
    </div>
  );
};

export default TableChoice;

export const tableResaField: FieldConfig<TableChoice>[] = [
  {
    name: "starttime",
    libelle: "Date début",
    type: "datetime-local",
    normal: true,
  },
  {
    name: "endtime",
    libelle: "Date fin",
    type: "datetime-local",
    normal: true,
  },
];

const convertListtablesToOption = (list: RestaurantTableEntity[]): FieldOptions[] => {
  const result: FieldOptions[] = [];
  list?.map((row) => {
    if (row.tableID) {
      result.push({ id: row.tableID, label: row.name! });
    }
  });
  return result;
};
