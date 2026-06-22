import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackEntity } from "@/types/entity-type/packEntity";
import { Hotel, Package, Sparkles, UtensilsCrossed } from "lucide-react";


interface PackDetailsProps {
  pack: PackEntity;
  openPacks: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddPackDetails({pack, openPacks ,onOpenChange} :PackDetailsProps ){
    return(      
            <Dialog open={openPacks} onOpenChange={onOpenChange}>
              <DialogContent className="max-w-[95vw] xl:max-w-[900px] max-h-[90vh] p-0 overflow-hidden flex flex-col">

                <Tabs defaultValue="hotel" className="flex flex-col flex-1 overflow-hidden">

                  {/* HEADER slate-700 */}
                  <div className="px-8 py-6 bg-slate-700 text-white shrink-0">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <DialogTitle className="text-white text-2xl">Détails du pack</DialogTitle>
                        <DialogDescription className="text-slate-300 text-base">
                          Avantages à inclure dans ce pack
                        </DialogDescription>
                      </div>
                    </div>

                    {/* TABS dans le header */}
                    <TabsList className="w-full bg-transparent gap-1 h-auto p-0">
                      <TabsTrigger
                        value="hotel"
                        className="flex-1 gap-2 text-slate-300 rounded-none rounded-t-lg border-b-2 border-transparent
                                   data-[state=active]:text-white data-[state=active]:bg-white/10
                                   data-[state=active]:border-white font-medium"
                      >
                        <Hotel className="h-4 w-4" />
                        Hôtel
                      </TabsTrigger>
                      <TabsTrigger
                        value="restaurant"
                        className="flex-1 gap-2 text-slate-300 rounded-none rounded-t-lg border-b-2 border-transparent
                                   data-[state=active]:text-white data-[state=active]:bg-white/10
                                   data-[state=active]:border-white font-medium"
                      >
                        <UtensilsCrossed className="h-4 w-4" />
                        Restaurant
                      </TabsTrigger>
                      <TabsTrigger
                        value="activites"
                        className="flex-1 gap-2 text-slate-300 rounded-none rounded-t-lg border-b-2 border-transparent
                                   data-[state=active]:text-white data-[state=active]:bg-white/10
                                   data-[state=active]:border-white font-medium"
                      >
                        <Sparkles className="h-4 w-4" />
                        Activités
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* BODY BLANC — en dehors du header */}
                  <div className="bg-white flex-1 overflow-y-auto">

                    <TabsContent value="hotel" className="mt-0 p-6">
                      <div className="rounded-xl border border-blue-200 overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-4 bg-blue-50 border-b border-blue-200">
                          <Hotel className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-base text-blue-900">Avantages Hôtel</h3>
                        </div>
                        <div className="p-5">
                          <p className="text-base text-muted-foreground italic">Hotel {pack.packID}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="restaurant" className="mt-0 p-6">
                      <div className="rounded-xl border border-amber-200 overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-4 bg-amber-50 border-b border-amber-200">
                          <UtensilsCrossed className="h-5 w-5 text-amber-600" />
                          <h3 className="font-semibold text-base text-amber-900">Avantages Restaurant</h3>
                        </div>
                        <div className="p-5">
                          <p className="text-base text-muted-foreground italic">Restaurant {pack.packID}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="activites" className="mt-0 p-6">
                      {/* <div className="rounded-xl border border-emerald-200 overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-4 bg-emerald-50 border-b border-emerald-200">
                          <Sparkles className="h-5 w-5 text-emerald-600" />
                          <h3 className="font-semibold text-base text-emerald-900">Avantages Activités</h3>
                        </div>
                        <div className="p-5">
                          <p className="text-base text-muted-foreground italic">Aucun avantage</p>
                        </div>
                      </div> */}
                    </TabsContent>

                  </div>
                </Tabs>  
              </DialogContent>
            </Dialog>
    );
}