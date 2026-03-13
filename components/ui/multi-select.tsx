"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { FieldOptions } from "@/types/component-type/form-type";

type MultiSelectProps = {
  opts: FieldOptions[];
  safidy: FieldOptions[]; // Gardé en tableau pour la consistance technique
  setOpts: (selected: FieldOptions[]) => void;
  placeholder?: string;
  multi?: boolean; // Nouvelle prop : true par défaut
  disable?:boolean
};

export function MultiSelect({
  opts,
  safidy,
  setOpts,
  placeholder = "Select options...",
  multi = true, // Par défaut, on reste en multi-sélection
  disable = false
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (optionId: string) => {
    setOpts(safidy.filter((s) => s.id !== optionId));
  };

  const handleSelect = (option: FieldOptions) => {
    setInputValue("");
    if (multi) {
      // Mode Multi : On ajoute à la liste
      setOpts([...safidy, option]);
    } else {
      // Mode Single : On remplace et on ferme
      setOpts([option]);
      setOpen(false);
    }
  };

  // Filtrage des éléments déjà sélectionnés
  const selectables = opts.filter(
    (option) => !safidy.some((sel) => sel.id === option.id),
  );

  return (
    <Command className="overflow-visible bg-transparent">
      <div className="group border border-input text-sm ring-offset-background rounded-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 p-1">
        <div className="flex flex-wrap gap-1">
          {safidy.map((option) => (
            <Badge key={option.id} variant="secondary" className="h-6">
              {option.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUnselect(option.id);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option.id)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}

          {/* On cache l'input si on est en single select et qu'il y a déjà un choix */}
          {(!multi && safidy.length === 0) || multi ? (
            <CommandInput
              disabled={disable}
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={safidy.length > 0 ? "" : placeholder}
              className="ml-1 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          ) : null}
        </div>
      </div>

      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((option) => (
                  <CommandItem
                    key={option.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => handleSelect(option)}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  );
}