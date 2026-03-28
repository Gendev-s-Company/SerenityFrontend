import {  InfoIcon } from "lucide-react";
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { title } from "process";
import { LucideIcon } from "lucide-react";
interface AlertProps{
    title: string,
    message: string,
    variant?:"default" | "destructive" | null | undefined,
    classn?:string,
    Picon?: LucideIcon
}
const Salert = ({title, message, variant = 'default', classn = '', Picon = InfoIcon }:AlertProps) => {
  return (
    <Alert variant={variant} className={`min-w-xs ${classn}`}>
      <Picon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
       {message}
      </AlertDescription>
    </Alert>
  );
};

export default Salert;
