import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardAction,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { getRoomyById } from "@/infrastructure/hotel/room/roomDetail/roomRequest";
import {
  ResaValidator,
  ResaValidatorResult,
  ReservationEntity,
} from "@/types/entity-type/reservationEntity";
import { RoomEntity } from "@/types/entity-type/roomEntity";
import { getCurrency } from "@/utils/Util";
import { Badge } from "lucide-react";
import React, { useEffect, useState } from "react";
import RecapResa from "./recap/recap-reservation";
import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { finalisationResa } from "@/infrastructure/hotel/room/reservation/reservationRequest";

interface Form {
  init: ReservationEntity;
  handleForms: (name: string, value: string) => void;
}

const RoomAccount = ({ handleForms, init }: Form) => {
  // maka information momba anle room
  const [room, setRoom] = useState<RoomEntity | null>(null);
  const [toogle, setToogle] = useState<boolean>(false);
  const [resaResult, setResaResult] = useState<ResaValidatorResult>();

  const handleForm = (open: boolean) => {
    setToogle(open);
    if (resaResult && resaResult.accompte) {
      handleForms("accountPaid", open ? String(resaResult.accompte) : "0");  
    }
    // forms.resetForm()
  };
  useEffect(() => {
    if (init && init.roomID) {
      getRoomyById(init.roomID)
        .then((data) => {
          setRoom(data);
        })
        .catch((error) => {
          console.error("Error fetching room details:", error);
        });
    }
  }, [init.roomID]);

  useEffect(() => {
    if (init && init.roomID) {
      const body: ResaValidator = {
        end: init.endtime,
        start: init.starttime,
        roomid: init.roomID,
      };
      finalisationResa(body)
        .then((data) => {
          setResaResult(data);
          handleForms("accountRated", data.accompte.toString());
          handleForms("AccountPaimentDeadline", data.deadline);
          // handleForms("accountPaid", String(data.accompte));
          handleForms("price", String(data.totalPrice));
        })
        .catch((error) => console.log(error));
    }
  }, [init.starttime, init.endtime, init.roomID]);

  return (
    <div className="flex items-center justify-between gap-10">
      <RecapResa room={room} init={init} />
      <Card className="relative mx-auto w-full min-w-md pt-0">
        <CardHeader>
          <CardAction>
            <Badge fontVariant="secondary" className="p-2">
              Featured
            </Badge>
          </CardAction>
          <CardTitle className="p-2">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
              {room?.name}
            </h1>
          </CardTitle>
          <CardDescription>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 p-4 rounded-xl border border-slate-100 bg-indigo-50/30">
                <span className="block font-bold text-slate-800 uppercase">
                  Accompte : {room?.roomPrice?.accountRate} %
                </span>
                <p className="font-bold text-slate-800 mt-1">
                  Prix total:{" "}
                  {getCurrency(
                    resaResult && resaResult.totalPrice
                      ? resaResult.totalPrice
                      : 0,
                  )}
                </p>
                <p className="font-bold text-slate-800 mt-1">
                  Accompte à payer:{" "}
                  {getCurrency(
                    resaResult && resaResult.accompte ? resaResult.accompte : 0,
                  )}
                </p>
              </div>

              <Field
                orientation="horizontal"
                className="font-bold text-slate-800 mt-1"
              >
                <Switch
                  checked={toogle}
                  className="font-bold text-slate-800 mt-1"
                  onCheckedChange={handleForm}
                  id="switch-size-default"
                />
                <FieldLabel
                  htmlFor="switch-size-default"
                  className="font-bold text-slate-800 mt-1"
                >
                  {"Payer l'accompte maintenant?"}
                </FieldLabel>
              </Field>
              <div className="col-span-2 p-4 rounded-xl border border-slate-100 bg-indigo-50/30">
                <span className="block text-xs font-semibold text-indigo-400 uppercase">
                  {"Date limite du paiement d'accompte"}:{" "}
                </span>
                <span className="font-bold text-slate-800">
                  du{" "}
                  {resaResult && new Date(resaResult.deadline).toLocaleString()}
                </span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="text-sm text-slate-500 mt-1">
              {
                "Nb: Si le paiement d'accompte n'est pas effectif à la date limite, la réservation sera annulée automatiquement"
              }
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoomAccount;
