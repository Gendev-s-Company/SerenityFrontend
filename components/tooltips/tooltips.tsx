import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
interface TooltipProps {
  children: ReactNode; // Le bouton ou l'élément déclencheur
  libelle: string;     // Le texte du tooltip
}
export default function Tooltips({ children, libelle }: TooltipProps) {
    return (
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            <p>{libelle}</p>
          </TooltipContent>
        </Tooltip>
    )
}