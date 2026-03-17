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
import RoomChoice from "./forms/room-choice";
import RoomAccount from "./forms/room-account";
import { ReservationEntity } from "@/types/entity-type/reservationEntity";
import Sbutton from "@/components/button/Sbutton";
import { createReservation } from "@/infrastructure/hotel/room/reservation/reservationRequest";

const Reservation = () => {
  const step = 3;
  const [progress, setProgress] = useState<number>(1);
  const percent = Number(((progress / step) * 100).toFixed(2));
  const [client, setClient] = useState<string>("")
  const body: ReservationEntity = {
    roomID: "",
    starttime: "",
    endtime: "",
    customerID: "",
    accountRated: "",
    price: "",
    accountPaid: "0",
    AccountPaimentDeadline: "",
    userID: "",
    state: "1",
    status: 0,
    skipValidation: true,
  };
  const [forms, setForms] = useState(body);
  const [roomValidator, setRoomValidator] = useState<ReservationFieldValidator[]>([])
  const [customerValidator, setCustomerValidator] = useState<ReservationFieldValidator[]>([])
  const handleForms = (name: string, value: string) => {
    setForms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateRoomChoice = () => {
    const list_validator: ReservationFieldValidator[] = []
    if (forms.starttime === "") list_validator.push({ field: 'starttime', isValid: false, message: 'Veuillez remplir ce champs' })
    const endValidate: ReservationFieldValidator = { field: 'endtime', isValid: false, message: 'Veuillez remplir ce champs' }
    if (forms.endtime === "") list_validator.push(endValidate)
    else if (new Date(forms.endtime) <= new Date(forms.starttime)) {
      endValidate.message = 'La date de fin ne doit pas etre antérieur à la date de début'
      list_validator.push(endValidate)
    }
    if (forms.roomID === "") list_validator.push({ field: 'roomID', isValid: false, message: 'Veuillez remplir ce champs' })
    setRoomValidator(list_validator)
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
        const resValidator = validateRoomChoice()
        error = resValidator.length
      }else if (progress ===1) {
        const resValidator = validateCustomerChoice()
        error = resValidator.length
      }
      if (error === 0) {
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
            <CustomerChoice setClient={setClient} handleForms={handleForms} init={forms} validators={customerValidator} setValidator={setCustomerValidator} />
          </CollapsibleContent>
        </Collapsible>
        <Collapsible open={progress === 2} >
          <CollapsibleContent>
            <RoomChoice handleForms={handleForms} init={forms} validators={roomValidator} setValidator={setRoomValidator} />
          </CollapsibleContent>
        </Collapsible>
        <Collapsible open={progress === 3}>
          <CollapsibleContent>
            <RoomAccount client={client} handleForms={handleForms} init={forms} />
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