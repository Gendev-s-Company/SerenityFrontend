import Forms, { formatDateForInput } from "@/components/form-component/Forms";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import useForm from "@/hooks/use-form";
import { getAllRoomAvalaible } from "@/infrastructure/hotel/room/roomRequest";
import { FieldConfig, FieldOptions } from "@/types/component-type/form-type";
import { ReservationEntity } from "@/types/entity-type/reservationEntity";
import { RoomEntity } from "@/types/entity-type/roomEntity";
import { getLocalStorage } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import { ReservationFieldValidator } from "../reservation";

interface Form {
  init: ReservationEntity;
  handleForms: (name: string, value: string) => void;
  validators: ReservationFieldValidator[];
  setValidator: (values: ReservationFieldValidator[]) => void;
  setPass: (value: boolean) => void;
}
interface RoomChoice {
  starttime: string;
  endtime: string;
}
const RoomChoice = ({
  handleForms,
  init,
  validators,
  setValidator,
  setPass,
}: Form) => {
  const [filters, setFilters] = useState<FieldOptions[]>([]);
  const [rooms, setRooms] = useState<FieldOptions[]>([]);
  const user = getLocalStorage()!;

  const body: RoomChoice = {
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
      getAllRoomAvalaible(
        user.profil.company.companyID,
        [0, 8],
        forms.getForm.starttime,
        forms.getForm.endtime,
      )
        .then((data) => {
          const list = convertListRoomsToOption(data);
          setRooms(list);
          const choosed = list.find((c) => c.id === init.roomID);
          if (choosed) {
            setFilters([choosed]);
            setPass(true);
          }
          // mila amboarina
          if (!init.roomID) {
            const list_validator: ReservationFieldValidator[] = [];
            list_validator.push({
              field: "roomID",
              isValid: false,
              message: `La chambre ${init.roomID} n'est malheureusement pas disponible à cette date`,
            });
            handleForms("roomID", "");
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
    handleForms("roomID", value);
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
        Choix de chambre
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
        <Field data-invalid={getValidator("roomID") ? true : false}>
          <FieldLabel htmlFor={"S"}>
            {getValidator("roomID")
              ? getValidator("roomID")?.message
              : "Choisir la chambre voulu: "}
          </FieldLabel>
          <MultiSelect
            setOpts={updateFilter}
            safidy={filters}
            opts={rooms}
            multi={false}
            placeholder="Choisir la chambre voulue"
            disable={isDisable}
          />
        </Field>
      </div>
    </div>
  );
};

export default RoomChoice;

export const roomResaField: FieldConfig<RoomChoice>[] = [
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

const convertListRoomsToOption = (list: RoomEntity[]): FieldOptions[] => {
  const result: FieldOptions[] = [];
  list?.map((row) => {
    if (row.roomID) {
      result.push({ id: row.roomID, label: row.name! });
    }
  });
  return result;
};
