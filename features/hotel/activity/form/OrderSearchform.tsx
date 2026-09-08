import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { FieldOptions, UseFormReturn } from '@/types/component-type/form-type'
import { ActivitySearchedField } from '@/types/entity-type/activityorderEntity'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OrderSearchformProps  {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer: FieldOptions[],
    forms: UseFormReturn<ActivitySearchedField>;
    handleSearch: () => void
}
const OrderSearchform = ({  
    open,
    onOpenChange,
    customer,
    forms,
    handleSearch,
    }: OrderSearchformProps ) => {
    const [filters, setFilters] = useState<FieldOptions[]>([]);
    const updateFilter = (filters: FieldOptions[]) => {
        setFilters(filters);
        const value = (filters && filters.length > 0) ? filters[0].id : ""
        forms.handleInputChange('customer', value)
    };
    return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden">
        <DialogHeader className="bg-indigo-600 -mx-6 -mt-6 px-6 py-4 rounded-t-lg">
          <DialogTitle className="text-white">Filtrer les commandes</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center w-full gap-2">
          {/* LIGNE 1 : Client */}
          <div className="w-full flex justify-center">
            <Field className="w-full max-w-md flex flex-col items-start">
              <FieldLabel htmlFor="customer" className="mb-1.5 text-sm font-medium text-slate-700">
                Client:
              </FieldLabel>
              <div className="w-full">
                <MultiSelect
                  setOpts={updateFilter}
                  safidy={filters}
                  opts={customer}
                  multi={false}
                  placeholder="Choisir le client"
                />
              </div>
            </Field>
          </div>

          {/* LIGNE 2 : Prix */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-start gap-4">
            <Field className="w-full sm:w-56 flex flex-col items-start">
              <FieldLabel className="mb-1.5 text-sm font-medium text-slate-700">
                Prix unitaire minimum:
              </FieldLabel>
              <Input
                type="number"
                value={forms.getForm.min}
                onChange={(e) => forms.handleInputChange("min", e.target.value)}
              />
            </Field>
            <Field className="w-full sm:w-56 flex flex-col items-start">
              <FieldLabel className="mb-1.5 text-sm font-medium text-slate-700">
                Prix Unitaire maximum:
              </FieldLabel>
              <Input
                type="number"
                value={forms.getForm.max}
                onChange={(e) => forms.handleInputChange("max", e.target.value)}
              />
            </Field>
          </div>

          {/* LIGNE 3 : Dates */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-start gap-4">
            <Field className="w-full sm:w-56 flex flex-col items-start">
              <FieldLabel className="mb-1.5 text-sm font-medium text-slate-700">Début:</FieldLabel>
              <Input
                type="date"
                value={forms.getForm.start}
                onChange={(e) => forms.handleInputChange("start", e.target.value)}
              />
            </Field>
            <Field className="w-full sm:w-56 flex flex-col items-start">
              <FieldLabel className="mb-1.5 text-sm font-medium text-slate-700">Fin:</FieldLabel>
              <Input
                type="date"
                value={forms.getForm.end}
                onChange={(e) => forms.handleInputChange("end", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-slate-100 gap-2">
          <Button
            onClick={() => forms.resetForm()}
            type="button"
            className="cursor-pointer px-8 py-2.5 border border-slate-300 rounded-lg text-sm font-medium transition-all"
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              handleSearch();
              onOpenChange(false);
            }}
            type="button"
            className="cursor-pointer px-8 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-semibold shadow-sm transition-all"
          >
            Rechercher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}

export default OrderSearchform