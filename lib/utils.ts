import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const statusLabel: Record<number, string> = {
  0: "Disponible",
  1: "Indisponible",
};
