import {  useTransition } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
interface SbuttonProps {
  formAction: () => void;
  libelle?: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}
export default function Sbutton({
  formAction,
  libelle = "Valider",
  variant = "default",
  className = ""
}: SbuttonProps) {
  const [isPending, startTransition] = useTransition();
  const submit = async () => {
    startTransition(async () => {
        console.log("Execution de  la requete...");

        await new Promise((res) => setTimeout(res, 2000));
        await formAction();
        toast.success("Action réussi!!", { position: "top-right" })
        
    });
  };
  return (
    <Button
      onClick={submit}
      //   type="submit"
      disabled={isPending}
      className={`${className} cursor-pointer`}
      variant={variant}
    >
      {isPending ? (
        <>
          <Spinner data-icon="inline-start" /> Loading...
        </>
      ) : (
        libelle
      )}
    </Button>
  );
}
