import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

interface DeleteBoxProps {
  id: string;
  onDelete: () => void;
}
export default function DeleteBox({ id, onDelete }: DeleteBoxProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false); 

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault(); 

    startTransition(async () => {
      console.log("Exécution de la requête...");
      
      await new Promise((res) => setTimeout(res, 3000));
      await onDelete();
      
      toast.success("Suppression réussie !!", { position: "top-right" });

      setTimeout(() => setOpen(false), 500); 
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon-sm" className="cursor-pointer">
          <Trash2 color="#f70808" />
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent size="sm">
       <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2 />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Suppression de <i>{id}</i>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir continuer?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className="cursor-pointer">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            disabled={isPending}
            onClick={submit}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Spinner data-icon="inline-start" /> Loading...
              </>
            ) : (
              "Confirmer"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}