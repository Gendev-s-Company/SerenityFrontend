import { forwardRef } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import React from "react";

interface TooltipProps extends React.ComponentPropsWithoutRef<"button"> {
  libelle: string;
  children: React.ReactElement<any>;
}

const Tooltips = forwardRef<HTMLButtonElement, TooltipProps>(
  ({ children, libelle, ...props }, ref) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {React.cloneElement(children, { ref, ...props })}
        </TooltipTrigger>
        <TooltipContent>
          <p>{libelle}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
);
Tooltips.displayName = "Tooltips";

export default Tooltips;