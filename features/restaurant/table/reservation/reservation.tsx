"use client";
import React, { useState } from "react";
import CustomerChoice from "./forms/customer-choice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Progress,
  ProgressValue,
  ProgressLabel,
} from "@/components/ui/progress";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Sbutton from "@/components/button/Sbutton";
// import { createReservation } from "@/infrastructure/hotel/table/reservation/reservationRequest";
import { useSearchParams } from "next/navigation";
import { ReservationTableEntity } from "@/types/entity-type/reservationTableEntity";
import TableChoice from "./forms/table-choice";
import { createReservation } from "@/infrastructure/restaurant/table/tablereservation/tableReservationRequest";

const Reservation = () => {
  const step = 3;
  const tableID = useSearchParams().get('tableID');
  
  const [progress, setProgress] = useState<number>(1);
  const percent = Number(((progress / step) * 100).toFixed(2));
  const [pass, setPass] = useState<boolean>(true)
  const [client, setClient] = useState<string>("")
  const body: ReservationTableEntity = {
    tableID: tableID ? tableID : "",
    starttime: "",
    endtime: "",
    customerID: "",
    userID: "",
    state: "1",
    status: 0,
    skipValidation: true,
  };
  const [forms, setForms] = useState(body);
  const [tableValidator, settableValidator] = useState<ReservationFieldValidator[]>([])
  const [customerValidator, setCustomerValidator] = useState<ReservationFieldValidator[]>([])
  const handleForms = (name: string, value: string) => {
    setForms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validatetableChoice = () => {
    const list_validator: ReservationFieldValidator[] = []
    if (forms.starttime === "") list_validator.push({ field: 'starttime', isValid: false, message: 'Veuillez remplir ce champs' })
    if (forms.tableID === "") list_validator.push({ field: 'tableID', isValid: false, message: 'Veuillez remplir ce champs' })
    settableValidator(list_validator)
    return list_validator
  }
  const validateCustomerChoice = () => {
    const list_validator: ReservationFieldValidator[] = []
    if (forms.customerID === "") list_validator.push({ field: 'customerID', isValid: false, message: 'Veuillez remplir ce champs' })
    setCustomerValidator(list_validator)
    return list_validator
  }

  const next = () => {
    if (progress < step) {
      let error = 0
      if (progress === 2) {
        const resValidator = validatetableChoice()
        error = resValidator.length
      }else if (progress ===1) {
        const resValidator = validateCustomerChoice()
        error = resValidator.length
      }
      if (error === 0 && pass) {
        setProgress((prev) => prev + 1);
      }
    }
  };

  const previous = () => {
    if (progress > 1) {
      setProgress((prev) => prev - 1);
    }
  };
  const submit = async () => {

    await createReservation(forms)
    setForms(body)
    setProgress(1)
  };

  return (
    <div className="container mx-auto py-10 px-3">
      <div className="w-full mix-w-4xl mx-auto p-3 relative border rounded-xl bg-slate-50/50">
        <Collapsible open={progress === 1}>
          <CollapsibleContent>
            <CustomerChoice setClient={setClient} handleForms={handleForms} init={forms} validators={customerValidator} setValidator={setCustomerValidator} setPass={setPass}/>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible open={progress === 2} >
          <CollapsibleContent>
            <TableChoice handleForms={handleForms} init={forms} validators={tableValidator} setValidator={settableValidator} setPass={setPass} />
          </CollapsibleContent>
        </Collapsible>
      </div>
      {/* next and previous step */}
      <div className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <Button
          variant="default"
          size="icon"
          className="rounded-full cursor-pointer"
          onClick={previous}
          disabled={progress === 1}
        >
          <ArrowLeft />
        </Button>
        <Progress value={percent} className="w-full max-w-sm">
          <ProgressLabel>
            Progression du formulaire : {progress}/{step}{" "}
          </ProgressLabel>
          {/* <ProgressValue /> */}
        </Progress>
        {/* {progress}/{step} */}
        {step === progress ? (
          <Sbutton message="Réservation effectuer, besoin de validation" formAction={submit} />
        ) : (
          <Button
            variant="default"
            size="icon"
            className={"rounded-full cursor-pointer"}
            onClick={next}
          >
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Reservation;

export interface ReservationFieldValidator {
  field: string,
  isValid: boolean,
  message: string
}