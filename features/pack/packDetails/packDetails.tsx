import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PackEntity } from "@/types/entity-type/packEntity";
import { Hotel, UtensilsCrossed, Sparkles, Package } from "lucide-react";

interface PackDetailsProps {
  pack: PackEntity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PackDetails({ pack, open, onOpenChange }: PackDetailsProps) {
  if (!pack) return null;

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[95vw] xl:max-w-[1400px] max-h-[90vh] p-0 overflow-hidden flex flex-col">
          {/* En-tête décoré */}
          <DialogHeader className="px-8 py-6 bg-slate-700 text-white shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-white text-2xl">
                  Détails du pack
                </DialogTitle>
                <DialogDescription className="text-slate-300 text-base">
                  Liste des avantages inclus dans ce pack
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto">
            {/* Avantage générale */}
            <div className="grid grid-cols-1 p-6">
              <ul className="space-y-2">
                <li key={pack.packID} className="flex items-center gap-2 text-base text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-black shrink-0" />
                  Jusqu'à échéance de ce pack, toutes les entités comprises
                  dans chacune des section ci-dessous auront une remise de
                  +{pack.discount}%
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 pt-0">

              {/* Avantages hôtel */}
              <div className="rounded-xl border border-blue-200 overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 bg-blue-50 border-b border-blue-200">
                  <Hotel className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-base text-blue-900">
                    Avantages Hôtel
                  </h3>
                </div>
                <div className="p-5">
                  {pack.hotelsPack.length ? (
                    <ul className="space-y-3">
                      {pack.hotelsPack.map((advantage, index) => (
                        <li key={index} className="flex items-center justify-between gap-2 text-base text-slate-700">
                          <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                            {advantage.duration}h heures de la durée 
                          </span>
                          <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full shrink-0">
                            +{pack.discount}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base text-muted-foreground italic">Aucun avantage</p>
                  )}
                </div>
              </div>
                
              {/* Avantages restaurant */}
              <div className="rounded-xl border border-amber-200 overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 bg-amber-50 border-b border-amber-200">
                  <UtensilsCrossed className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold text-base text-amber-900">
                    Avantages Restaurant
                  </h3>
                </div>
                <div className="p-5">
                  {pack.restoPack.length ? (
                    <ul className="space-y-3">
                      {pack.restoPack.map((advantage, index) => (
                        <li key={index} className="flex items-center justify-between gap-2 text-base text-slate-700">
                          <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                            {advantage.dishID} avec quantité rajoutée
                          </span>
                          <span className="text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full shrink-0">
                            +{advantage.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base text-muted-foreground italic">Aucun avantage</p>
                  )}
                </div>
              </div>
                
              {/* Avantages activités */}
              <div className="rounded-xl border border-emerald-200 overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 bg-emerald-50 border-b border-emerald-200">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold text-base text-emerald-900">
                    Avantages Activités
                  </h3>
                </div>
                <div className="p-5">
                  {pack.activityPack.length ? (
                    <ul className="space-y-3">
                      {pack.activityPack.map((advantage, index) => (
                        <li key={index} className="flex items-center justify-between gap-2 text-base text-slate-700">
                          <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                            {advantage.duration}h heures de la durée 
                          </span>
                          <span className="text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
                            +{pack.discount}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base text-muted-foreground italic">Aucun avantage</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>  
);
}