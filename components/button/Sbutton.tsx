import { useTransition } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
// interface local utiliser pour ce composant
interface SbuttonProps {
  formAction: () => void; //la fonction qu'on va appeler pour lorsqu'on appui sur le bouton
  libelle?: string;// libelle qu'on voudra mettre sur le bouton, par défaut c'est VALIDER
  className?: string; // classename pour l'ajout de style classique
  variant?:
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"; //variant du bouton(pareil que pour shadcn/ui grey theme)
  message?:string;
}
export default function Sbutton({
  formAction,
  libelle = "Valider",
  variant = "default",
  className = "",
  message = "Action réussi!!"
}: SbuttonProps) {
  // on utilise useTransition pour pouvoir mettre le loader sur le bouton car on utilisera
  //la plus part du temps une fonction asynchrone
  const [isPending, startTransition] = useTransition();
  // on applique ici la fonction
  const submit = async () => {
    startTransition(async () => {
      console.log("Execution de  la requete...");
      try {
        await new Promise((res) => setTimeout(res, 2000));
        await formAction();
        //affichage de message si success
        toast.success(message, { position: "top-right" })
      } catch (error:unknown) {
        const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue";
        // affichage de message si erreur
        toast.error(errorMessage, { position: "top-right" })
      }


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
