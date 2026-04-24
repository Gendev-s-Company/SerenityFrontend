"use client";
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";

export default function Catalogue() {
  // Vos données (menuItems) restent inchangées
  const menuItems = [
    { id: 1, name: "Œuf Mollet", price: "16€", category: "Entrées", image: "/images/egg.jpg" },
    { id: 2, name: "Velouté Butternut", price: "14€", category: "Entrées", image: "/images/soup.jpg" },
    // { id: 3, name: "Saint-Jacques", price: "19€", category: "Entrées", image: "/images/scallops.jpg" },
    { id: 4, name: "Saumon Aneth", price: "28€", category: "Plats", image: "/images/salmon.jpg" },
    { id: 5, name: "Bœuf Rossini", price: "36€", category: "Plats", image: "/images/beef.jpg" },
    { id: 6, name: "Risotto Cèpes", price: "26€", category: "Plats", image: "/images/risotto.jpg" },
    { id: 7, name: "Magret Canard", price: "32€", category: "Plats", image: "/images/duck.jpg" },
    // { id: 8, name: "Tartare Daurade", price: "29€", category: "Plats", image: "/images/sea-bream.jpg" },
    { id: 9, name: "Agneau Pascal", price: "34€", category: "Plats", image: "/images/lamb.jpg" },
    { id: 10, name: "Fondant Chocolat", price: "14€", category: "Desserts", image: "/images/fondant.jpg" },
    { id: 11, name: "Tarte Tatin", price: "15€", category: "Desserts", image: "/images/tatin.jpg" },
    { id: 12, name: "Crème Brûlée", price: "12€", category: "Desserts", image: "/images/creme.jpg" },
    { id: 13, name: "Foie Gras Maison", price: "22€", category: "Entrées", image: "/images/foie-gras.jpg" },
    { id: 14, name: "Soupe à l'Oignon", price: "12€", category: "Entrées", image: "/images/onion-soup.jpg" },
    { id: 15, name: "Escargots Beurre", price: "18€", category: "Entrées", image: "/images/snails.jpg" },
    { id: 16, name: "Sole Meunière", price: "38€", category: "Plats", image: "/images/sole.jpg" },
    { id: 17, name: "Côte de Bœuf", price: "45€", category: "Plats", image: "/images/rib-eye.jpg" },
    { id: 18, name: "Blanquette Veau", price: "24€", category: "Plats", image: "/images/veal.jpg" },
    { id: 19, name: "Cassoulet Castel", price: "27€", category: "Plats", image: "/images/cassoulet.jpg" },
    { id: 20, name: "Bouillabaisse", price: "35€", category: "Plats", image: "/images/stew.jpg" },
    { id: 21, name: "Poulet Fermier", price: "23€", category: "Plats", image: "/images/chicken.jpg" },
    { id: 22, name: "Profiteroles", price: "13€", category: "Desserts", image: "/images/profiteroles.jpg" },
    { id: 23, name: "Mousse Chocolat", price: "10€", category: "Desserts", image: "/images/mousse.jpg" },
    { id: 24, name: "Ile Flottante", price: "11€", category: "Desserts", image: "/images/island.jpg" },
  ];

  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 12; // 3 colonnes x 4 lignes
  const totalPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);

  // LOGIQUE CRUCIALE : On s'assure d'avoir toujours 12 slots
  const pageSlots = useMemo(() => {
    const items = menuItems.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
    const placeholdersNeeded = ITEMS_PER_PAGE - items.length;
    
    // On retourne les items réels + des objets "vides" pour garder la structure
    return [...items, ...Array(placeholdersNeeded).fill({ isPlaceholder: true })];
  }, [currentPage, menuItems]);

  const categoriesOnPage = Array.from(new Set(pageSlots.filter(i => !i.isPlaceholder).map(item => item.category)));

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  const selectedItems = useMemo(() => {
    return menuItems.filter(item => cart[item.id] > 0).map(item => ({
      ...item, quantity: cart[item.id]
    }));
  }, [cart, menuItems]);

  const totalPrice = selectedItems.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);

  const totalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#f3f0eb] flex flex-col items-center justify-center p-4 font-serif">
      
      {/* PANIER FLOTTANT (Simplifié pour l'exemple) */}
      <div className="fixed top-24 right-8 z-50">
        <button onClick={() => setIsModalOpen(true)} className="bg-[#4a3427] text-white p-4 rounded-2xl shadow-2xl flex items-center border-b-4 border-black/30 active:translate-y-1 transition-all">
          <ShoppingCart size={24} className="text-[#d4af37]" />
          {selectedItems.length > 0 && <span className="ml-3 bg-green-600 text-white text-xs font-sans font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>}
        </button>
      </div>

      <div className="relative flex items-center max-w-6xl w-full gap-4">
        
        <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0} className="p-3 disabled:opacity-0 text-[#4a3427]"><ChevronLeft size={44} /></button>

        <div className="bg-[#4a3427] p-2 rounded-2xl shadow-2xl flex-1">
          <div className="bg-white rounded-xl p-10 min-h-[850px] flex flex-col">
            
            <header className="text-center mb-10">
              <h1 className="text-4xl uppercase tracking-[0.5em] font-light text-gray-900">Carte</h1>
              <div className="h-px w-24 bg-[#d4af37] mx-auto mt-4"></div>
            </header>

            {/* LA GRILLE FIXE 3x4 */}
            <div className="flex-1 grid grid-cols-3 grid-rows-4 gap-x-8 gap-y-6">
              {pageSlots.map((item, index) => (
                <div key={item.isPlaceholder ? `empty-${index}` : item.id} className="flex flex-col items-center">
                  {!item.isPlaceholder ? (
                    <div className="flex flex-col items-center animate-in fade-in duration-500">
                      <div className="relative w-24 h-24 mb-3 overflow-hidden rounded-full border-4 border-white shadow-md">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-[11px] font-bold uppercase text-gray-800 leading-tight h-8 flex items-center justify-center">{item.name}</h3>
                        <p className="text-xs font-bold text-[#d4af37] mb-2">{item.price}</p>
                        <div className="flex items-center justify-center gap-3 bg-gray-50 rounded-lg border border-gray-100 py-1 px-2 scale-90">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-red-500"><Minus size={12}/></button>
                          <span className="text-xs font-sans font-bold w-4 text-center text-gray-800">{cart[item.id] || 0}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-green-600"><Plus size={12}/></button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* SLOT VIDE : Maintient la structure sans rien afficher */
                    <div className="w-24 h-24 opacity-0 pointer-events-none"></div>
                  )}
                </div>
              ))}
            </div>

            <footer className="mt-8 flex justify-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${currentPage === i ? 'w-8 bg-[#d4af37]' : 'w-2 bg-gray-200'}`} />
              ))}
            </footer>
          </div>
        </div>

        <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1} className="p-3 disabled:opacity-0 text-[#4a3427]"><ChevronRight size={44} /></button>
      </div>

      {/* POPUP DU PANIER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-[#4a3427] p-6 text-white flex justify-between items-center">
              <h2 className="text-xl tracking-widest uppercase flex items-center gap-3">
                <ShoppingCart className="text-[#d4af37]" /> Récapitulatif
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedItems.length > 0 ? (
                <>
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-gray-50 pb-4">
                      <div className="flex items-center gap-4 text-gray-800">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold uppercase">{item.name}</h4>
                          <p className="text-xs text-[#d4af37] font-sans font-bold">
                            {parseInt(item.price.replace("€", "")) * item.quantity}€ 
                            <span className="text-gray-400 font-normal ml-2">({item.price} x {item.quantity})</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-red-500"><Minus size={14}/></button>
                        <span className="font-sans font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-green-600"><Plus size={14}/></button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 flex justify-between items-center">
                    <span className="uppercase tracking-widest text-sm text-gray-500">Sous-total</span>
                    <span className="text-2xl font-bold text-[#4a3427] font-sans">{totalPrice}€</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 italic text-gray-400">Votre panier est encore vide...</div>
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 border-2 border-[#4a3427] text-[#4a3427] rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
              >
                Retour
              </button>
              <button 
                disabled={selectedItems.length === 0}
                className="flex-1 py-4 bg-[#4a3427] text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#5a3e2e] transition-all shadow-lg shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Valider ({totalPrice}€)
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}