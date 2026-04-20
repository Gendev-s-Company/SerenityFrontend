import Sbutton from "@/components/button/Sbutton";
import Forms from "@/components/form-component/Forms";
import { Field, FieldLabel } from "@/components/ui/field";
import { MultiSelect } from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";
import { CustomerNamefield } from "@/features/hotel/customer/prep-view-customer";
import useForm from "@/hooks/use-form";
import {
  createCustomer,
  getAllCustomer,
  getAllCustomerByCompany,
} from "@/infrastructure/hotel/customer/customerRequest";
import { FieldOptions } from "@/types/component-type/form-type";
import { CompanyEntity } from "@/types/entity-type/companyEntity";
import { CustomerEntity } from "@/types/entity-type/customerEntity";
import { getLocalStorage } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import { ReservationFieldValidator } from "../reservation";
import { ReservationTableEntity } from "@/types/entity-type/reservationTableEntity";

interface Form {
  init: ReservationTableEntity;
  handleForms: (name: string, value: string) => void;
  validators: ReservationFieldValidator[];
  setValidator: (values: ReservationFieldValidator[]) => void;
  setClient: (values: string) => void;
  setPass: (value: boolean) => void;
}

const CustomerChoice = ({
  handleForms,
  init,
  validators,
  setValidator,
  setClient,
  setPass,
}: Form) => {
  const [filters, setFilters] = useState<FieldOptions[]>([]);
  const [customer, setCustomer] = useState<FieldOptions[]>([]);
  const [toogle, setToogle] = useState<boolean>(false);
  const user = getLocalStorage()!;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user && user?.profil?.company?.companyID) {
      getAllCustomerByCompany(user.profil.company.companyID)
        .then((data) => {
          const list = convertListCustomersToOption(data);
          setCustomer(list);
          const choosed = list.find((c) => c.id === init.customerID);
          if (choosed) {
            setFilters([choosed]);
            setPass(true);
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);
  // useEffect(() => {
  //     const choosed = customer.find(c => c.id === init.customerID)

  // }, [])
  const updateFilter = (filters: FieldOptions[]) => {
    setFilters(filters);
    const value = filters.length > 0 ? filters[0].id : "";
    const name = filters.length > 0 ? filters[0].label : "";
    setClient(name);
    handleForms("customerID", value);
    setPass(true);
    setValidator([]);

    if (user && user.userID) {
      handleForms("userID", user.userID);
    }
  };

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
    mail: "",
    cin: "",
    address: "",
    status: 0,
    skipValidation: true,
  };
  const forms = useForm(body);
  const handleForm = (open: boolean) => {
    setToogle(open);
    forms.resetForm();
  };
  const submit = async () => {
    const created = await createCustomer(forms.getForm);
    updateFilter(convertListCustomersToOption([created]));
    handleForm(false);
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
        Choix du client
      </h3>
      <Field orientation="horizontal" className="p-2">
        <Switch
          checked={toogle}
          onCheckedChange={handleForm}
          id="switch-size-default"
        />
        <FieldLabel htmlFor="switch-size-default">
          Créé un nouveau client ?
        </FieldLabel>
      </Field>
      <div className="flex flex-col gap-6 p-3">
        <Field data-invalid={getValidator("customerID") ? true : false}>
          <FieldLabel htmlFor={"end"}>
            {getValidator("customerID")
              ? getValidator("customerID")?.message
              : "Client: "}
          </FieldLabel>
          <MultiSelect
            setOpts={updateFilter}
            safidy={filters}
            opts={customer}
            multi={false}
            placeholder="Choisir le client"
            disable={toogle}
          />
        </Field>
      </div>
      {toogle && (
        <div>
          <Forms forms={forms} fields={CustomerNamefield} />
          <div className="p-4">
            <Sbutton message="Création réussi!" formAction={submit} />
          </div>
        </div>
      )}
      {/* </form> */}
    </div>
  );
};

export default CustomerChoice;

export const convertListCustomersToOption = (
  list: CustomerEntity[],
): FieldOptions[] => {
  const result: FieldOptions[] = [];
  list?.map((row) => {
    if (row.customerID) {
      result.push({ id: row.customerID, label: row.name });
    }
  });
  return result;
};
