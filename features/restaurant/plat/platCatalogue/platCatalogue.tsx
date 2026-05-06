"use client";
import { getDishGroupByType } from "@/infrastructure/restaurant/plat/plat/platRequest";
import { PlatCatalogueEntity } from "@/types/entity-type/platCatalogueEntity";
import { PlatTypeEntity } from "@/types/entity-type/platTypeEntity";
import { getLocalStorage, setLocalItem } from "@/utils/storage";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

interface CatalogueProps {
  tableID?: string;
}

export default function Catalogue({ tableID }: CatalogueProps) {
  const [types, setTypes] = useState<PlatTypeEntity[]>([]);
  const user = getLocalStorage()!;
  const router = useRouter();
  useEffect(() => {
    if (user && user.profil.company.companyID) {
      getDishGroupByType(user.profil.company.companyID)
        .then((data) => setTypes(data))
    }
  }, []);

  // Extrait tous les dishes depuis les types (liste plate pour la pagination)
  const allDishes = useMemo<PlatCatalogueEntity[]>(() => {
    return types.flatMap((type) => type.dishes ?? []);
  }, [types]);

  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTypeID, setSelectedTypeID] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // Dishes filtrés selon le type sélectionné
  const filteredDishes = useMemo<PlatCatalogueEntity[]>(() => {
    if (!selectedTypeID) return allDishes;
    return types.find((t) => t.typeID === selectedTypeID)?.dishes ?? [];
  }, [allDishes, types, selectedTypeID]);

  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE);

  // Reset page si le filtre change
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTypeID]);

  // Génère exactement 12 slots pour garder la grille 3x4 stable
  const pageSlots = useMemo(() => {
    const items = filteredDishes.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE,
    );
    const slots = items.map((item) => ({ ...item, isPlaceholder: false }));
    while (slots.length < ITEMS_PER_PAGE) {
      slots.push({ isPlaceholder: true } as any);
    }
    return slots;
  }, [currentPage, filteredDishes]);

  const updateQuantity = (id: string | null, delta: number) => {
    const key = String(id);
    setCart((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + delta),
    }));
  };

  const selectedItems = useMemo(() => {
    return allDishes
      .filter((item) => cart[String(item.dishID)] > 0)
      .map((item) => ({
        ...item,
        quantity: cart[String(item.dishID)] || 0,
      }));
  }, [cart, allDishes]);

  const totalPrice = selectedItems.reduce(
    (acc, item) => acc + item.price.price * item.quantity,
    0,
  );
  const totalItems = selectedItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const convertToBase64 = (buffer: number[], type: string) => {
    if (!buffer || buffer.length === 0) return "";
    const uint8Array = new Uint8Array(buffer);
    let binary = "";
    uint8Array.forEach((byte) => (binary += String.fromCharCode(byte)));
    return `data:${type};base64,${buffer}`;
  };

  // envoie de commande

  const submit = () => {
    const purchase = {
      tableID: tableID,
      items: selectedItems
    }
    setLocalItem('purchase', JSON.stringify(purchase))
    router.push("/view/restaurant/dishOrder/tableOrder");
  };
  return (
    <main className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-4 font-serif">
      {/* PANIER FLOTTANT */}
      <div className="fixed top-24 right-8 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4a3427] text-white p-4 rounded-2xl shadow-2xl flex items-center border-b-4 border-black/30 active:translate-y-1 transition-all"
        >
          <ShoppingCart size={24} className="text-[#d4af37]" />
          {totalItems > 0 && (
            <span className="ml-3 bg-red-600 text-white text-xs font-sans font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* FILTRE PAR TYPE */}
      {types.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          <button
            onClick={() => setSelectedTypeID(null)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold border transition-all ${
              !selectedTypeID
                ? "bg-[#4a3427] text-white border-[#4a3427]"
                : "bg-white text-[#4a3427] border-[#4a3427]/30 hover:border-[#4a3427]"
            }`}
          >
            Tous
          </button>
          {types.map((type) => (
            <button
              key={type.typeID}
              onClick={() => setSelectedTypeID(type.typeID)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold border transition-all ${
                selectedTypeID === type.typeID
                  ? "bg-[#4a3427] text-white border-[#4a3427]"
                  : "bg-white text-[#4a3427] border-[#4a3427]/30 hover:border-[#4a3427]"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      )}

      <div className="relative flex items-center max-w-6xl w-full gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="p-3 disabled:opacity-0 text-[#4a3427]"
        >
          <ChevronLeft size={44} />
        </button>

        <div className="bg-white rounded-xl p-10 min-h-[850px] min-w-[500] flex flex-col border border-gray-100">
          <header className="text-center mb-10">
            <h1 className="text-4xl uppercase tracking-[0.5em] font-light text-gray-900">
              {selectedTypeID
                ? (types.find((t) => t.typeID === selectedTypeID)?.name ??
                  "Carte")
                : "Carte"}
            </h1>
            <div className="h-px w-24 bg-[#d4af37] mx-auto mt-4"></div>
          </header>

          {/* GRILLE 3x4 FIXE */}
          <div className="flex-1 grid grid-cols-3 grid-rows-4 gap-x-8 gap-y-4">
            {pageSlots.map((item, index) => {
              const slotKey = item.isPlaceholder
                ? `empty-${index}`
                : `dish-${item.dishID}`;

              return (
                <div
                  key={slotKey}
                  className="flex flex-col items-center justify-start min-h-[220px]"
                >
                  {!item.isPlaceholder ? (
                    <div className="flex flex-col items-center text-center w-full animate-in fade-in duration-500 py-4">
                      <a
                        href={`/view/restaurant/plat/detail?dishID=${item.dishID}&dishState=${item.state}`}
                      >
                        <div className="relative w-36 h-36 mb-5 overflow-hidden rounded-full border-[5px] border-white shadow-2xl transition-transform hover:scale-110">
                          <Image
                            src={
                              item.photos[0]?.files?.data
                                ? convertToBase64(
                                    item.photos[0].files.data,
                                    item.photos[0].files.type,
                                  )
                                : item.photos[0]?.path ||
                                  "/placeholder-food.jpg"
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </a>

                      <h3 className="text-sm md:text-base font-black uppercase text-gray-800 leading-tight h-12 flex items-center justify-center px-4 mb-1">
                        {item.name}
                      </h3>

                      <p className="text-sm font-bold text-[#d4af37] mb-4 tracking-tighter">
                        {item.price.price.toLocaleString()} Ar
                      </p>

                      <div className="flex items-center justify-center gap-5 bg-white rounded-2xl border-2 border-gray-100 py-2 px-4 shadow-sm group hover:border-[#d4af37]/30 transition-all">
                        <button
                          onClick={() => updateQuantity(item.dishID, -1)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Minus size={18} strokeWidth={3} />
                        </button>
                        <span className="text-base font-sans font-black min-w-[24px] text-center text-gray-900">
                          {cart[String(item.dishID)] || 0}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.dishID, 1)}
                          className="text-gray-400 hover:text-green-600 transition-colors p-1"
                        >
                          <Plus size={18} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full pointer-events-none opacity-0" />
                  )}
                </div>
              );
            })}
          </div>

          <footer className="mt-8 flex justify-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentPage === i
                    ? "w-10 bg-[#4a3427]"
                    : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </footer>
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={currentPage === totalPages - 1}
          className="p-3 disabled:opacity-0 text-[#4a3427]"
        >
          <ChevronRight size={44} />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-[#4a3427] p-6 text-white flex justify-between items-center font-sans tracking-tighter">
              <h2 className="text-xl uppercase tracking-widest flex items-center gap-3">
                <ShoppingCart className="text-[#d4af37]" /> Récapitulatif
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedItems.length > 0 ? (
                <>
                  {selectedItems.map((item) => (
                    <div
                      key={item.dishID}
                      className="flex items-center justify-between border-b border-gray-50 pb-4"
                    >
                      <div className="flex items-center gap-4 text-gray-800">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border">
                          <Image
                            src={
                              item.photos[0]?.files?.data
                                ? convertToBase64(
                                    item.photos[0].files.data,
                                    item.photos[0].files.type,
                                  )
                                : item.photos[0]?.path ||
                                  "/placeholder-food.jpg"
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold uppercase">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#d4af37] font-bold">
                            {item.price.price * item.quantity} Ar
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-xl border">
                        <button onClick={() => updateQuantity(item.dishID, -1)}>
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-sm">
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.dishID, 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 flex justify-between items-center border-t border-[#4a3427]/10">
                    <span className="uppercase tracking-widest text-xs text-gray-400">
                      Total à payer
                    </span>
                    <span className="text-2xl font-bold text-[#4a3427]">
                      {totalPrice} Ar
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 italic text-gray-400">
                  Votre panier est vide
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 border-2 border-[#4a3427] text-[#4a3427] rounded-xl font-bold uppercase text-[10px]"
              >
                Retour
              </button>
              <button
                disabled={selectedItems.length === 0}
                onClick={submit}
                className="flex-1 py-4 bg-[#4a3427] text-white rounded-xl font-bold uppercase text-[10px] disabled:opacity-50"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
