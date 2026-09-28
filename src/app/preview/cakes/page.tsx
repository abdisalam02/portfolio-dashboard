"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiX,
  FiPlus,
  FiShoppingBag,
  FiArrowRight,
  FiClock,
  FiMapPin,
  FiStar,
  FiChevronDown,
} from "react-icons/fi";
import PreviewShell from "@/components/preview/PreviewShell";

// ==========================================
// BESPOKE LUFFY CAKES LOGO & STAMP
// ==========================================
function LuffyCakesLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 rounded-full bg-[#FFA8C5] border-2 border-[#332F32] flex items-center justify-center shadow-xs flex-shrink-0">
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          {/* Tiered Cake Icon */}
          <rect x="7" y="19" width="18" height="7" rx="1.5" fill="#FAF7EE" stroke="#332F32" strokeWidth="1.5" />
          <rect x="10" y="13" width="12" height="6" rx="1.5" fill="#FAF7EE" stroke="#332F32" strokeWidth="1.5" />
          {/* Piped Frills */}
          <path d="M 7 21 Q 11.5 23 16 21 Q 20.5 23 25 21" stroke="#FFA8C5" strokeWidth="2" fill="none" />
          <path d="M 10 15 Q 13 17 16 15 Q 19 17 22 15" stroke="#FFA8C5" strokeWidth="2" fill="none" />
          {/* Candle & Flame */}
          <line x1="16" y1="13" x2="16" y2="8" stroke="#332F32" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16" cy="6.5" r="1.5" fill="#FFF59D" stroke="#332F32" strokeWidth="0.8" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-black text-xs sm:text-sm tracking-tight text-[#332F32]">
          LUFFY
        </span>
        <span className="font-black text-[10px] sm:text-xs tracking-wider text-[#332F32]">
          CAKES
        </span>
      </div>
    </div>
  );
}

// Starburst sticker matching luffy-donuts-customizer
function SunburstSticker({
  text,
  className = "",
  textSize = "text-[9px]",
}: {
  text: string;
  className?: string;
  textSize?: string;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#FFF59D] fill-current animate-pulse duration-1000">
        <polygon points="50,0 63,22 88,10 82,35 100,50 82,65 88,90 63,78 50,100 37,78 12,90 18,65 0,50 18,35 12,10 37,22" />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center text-center p-2 font-black uppercase text-[#332F32] leading-tight ${textSize}`}>
        {text}
      </div>
    </div>
  );
}

// Cake Product Item Interface
interface CakeItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const DAILY_CAKES: CakeItem[] = [
  {
    id: "pink-lambeth-heart",
    name: "PINK LAMBETH HEART",
    price: 380,
    description: "FILLED WITH STRAWBERRY CREME",
    image: "/demo/cakes/cake-1.jpg",
  },
  {
    id: "valrhona-drip-gateau",
    name: "VALRHONA DRIP GATEAU",
    price: 520,
    description: "FILLED WITH SALTED CARAMEL",
    image: "/demo/cakes/cake-2.jpg",
  },
  {
    id: "pistachio-raspberry",
    name: "PISTACHIO RASPBERRY",
    price: 480,
    description: "WILD RASPBERRY & MASCARPONE",
    image: "/demo/cakes/cake-4.jpg",
  },
  {
    id: "midnight-bento-heart",
    name: "MIDNIGHT BENTO HEART",
    price: 240,
    description: "VANILLA CHIFFON & CHANTILLY",
    image: "/demo/cakes/cake-3.jpg",
  },
];

// Interactive Cake Constructor Options
const CONSTRUCTOR_OPTIONS = {
  sizes: [
    { id: "bento", label: "BENTO MINI (10CM · 2–3 SERVINGS)", price: 240 },
    { id: "petite", label: "PETITE GATEAU (15CM · 6–8 SERVINGS)", price: 480 },
    { id: "signature", label: "SIGNATURE TIER (20CM · 12–16 SERVINGS)", price: 780 },
    { id: "grand", label: "TWO-TIER GRAND (25CM · 24–30 SERVINGS)", price: 1480 },
  ],
  sponges: [
    { id: "vanilla", label: "MADAGASCAR VANILLA CHIFFON" },
    { id: "chocolate", label: "VALRHONA 70% DARK COCOA" },
    { id: "pistachio", label: "SICILIAN ROASTED PISTACHIO" },
    { id: "red-velvet", label: "RED VELVET BUTTERMILK" },
    { id: "lemon", label: "LEMON POPPYSEED CRUMB" },
  ],
  fillings: [
    { id: "raspberry", label: "WILD NORDIC RASPBERRY COULIS" },
    { id: "caramel", label: "SALTED FLEUR DE SEL CARAMEL" },
    { id: "ganache", label: "WHIPPED BELGIAN GANACHE" },
    { id: "passion", label: "PASSIONFRUIT & MANGO CURD" },
    { id: "mascarpone", label: "VANILLA BEAN MASCARPONE" },
  ],
  frostings: [
    { id: "pink-buttercream", label: "PASTEL PINK SWISS BUTTERCREAM", preview: "/demo/cakes/cake-1.jpg" },
    { id: "chocolate-drip", label: "DARK CHOCOLATE DRIP & ROSETTES", preview: "/demo/cakes/cake-2.jpg" },
    { id: "white-chantilly", label: "PURE WHITE CANDLELIT CHANTILLY", preview: "/demo/cakes/cake-3.jpg" },
    { id: "pistachio-glaze", label: "PISTACHIO GLAZE & NORDIC BERRIES", preview: "/demo/cakes/cake-4.jpg" },
    { id: "tiered-roses", label: "GRAND TIER WITH ENGLISH ROSES", preview: "/demo/cakes/cake-5.jpg" },
  ],
  toppings: [
    { id: "piped-frills", label: "VINTAGE LAMBETH PIPED FRILLS" },
    { id: "berries", label: "FRESH RASPBERRIES & ROSE PETALS" },
    { id: "gold-pearls", label: "EDIBLE 24K GOLD LEAF & PEARLS" },
    { id: "macarons", label: "FRENCH MACARON CROWN (4 PCS)" },
  ],
};

export default function PreviewCakesPage() {
  // Cart State
  const [cart, setCart] = useState<{ id: string; name: string; price: number; count: number }[]>([
    { id: "pink-lambeth-heart", name: "PINK LAMBETH HEART", price: 380, count: 1 },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Constructor State
  const [selectedSize, setSelectedSize] = useState(CONSTRUCTOR_OPTIONS.sizes[1]);
  const [selectedSponge, setSelectedSponge] = useState(CONSTRUCTOR_OPTIONS.sponges[0]);
  const [selectedFilling, setSelectedFilling] = useState(CONSTRUCTOR_OPTIONS.fillings[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(CONSTRUCTOR_OPTIONS.frostings[0]);
  const [selectedTopping, setSelectedTopping] = useState(CONSTRUCTOR_OPTIONS.toppings[0]);

  // Dropdown Open Toggles for Constructor
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Checkout State
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "confirmed">("cart");
  const [orderDate, setOrderDate] = useState("Saturday 2 Nov (12:00)");
  const [customerName, setCustomerName] = useState("Mathilde V.");
  const [customerPhone, setCustomerPhone] = useState("+47 905 43 210");
  const [customInscription, setCustomInscription] = useState("Happy 25th Sofia!");

  const totalCartCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  const addToCart = (name: string, price: number, id: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item));
      }
      return [...prev, { id, name, price, count: 1 }];
    });
    setAddedToast(name);
    setTimeout(() => setAddedToast(null), 2000);
  };

  const addConstructedToCart = () => {
    const customId = `custom-cake-${selectedSize.id}-${Date.now()}`;
    const customName = `CUSTOM CAKE: ${selectedSize.label.split(" ")[0]} (${selectedFrosting.label.split(" ")[0]} + ${selectedFilling.label.split(" ")[0]})`;
    addToCart(customName, selectedSize.price, customId);
    setCartOpen(true);
  };

  return (
    <PreviewShell
      nicheTitle="Luffy Cakes Oslo"
      nicheSubtitle="Custom Celebration Cakes &amp; Constructor · Inspo: luffy-donuts-customizer"
      accentColor="#FFA8C5"
    >
      <div className="min-h-screen bg-[#FAF7EE] text-[#332F32] font-sans selection:bg-[#FFA8C5] selection:text-[#332F32] overflow-x-hidden">
        {/* =========================================================
            HEADER: RECTANGULAR CELL-BORDERED GRID BAR (EXACT INSP)
            ========================================================= */}
        <header className="sticky top-0 z-40 bg-[#FAF7EE] border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto flex items-stretch divide-x divide-[#E5E0D5] text-xs font-mono font-bold uppercase tracking-wider text-[#332F32]">
            {/* Cell 1: Logo */}
            <div className="p-3 sm:px-6 flex items-center flex-shrink-0">
              <LuffyCakesLogo />
            </div>

            {/* Cell 2: Menu */}
            <a
              href="#menu"
              className="hidden md:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              MENU
            </a>

            {/* Cell 3: Special Order */}
            <a
              href="#constructor"
              className="hidden md:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors text-[#332F32]"
            >
              SPECIAL ORDER
            </a>

            {/* Cell 4: About */}
            <a
              href="#about"
              className="hidden lg:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              ABOUT
            </a>

            {/* Cell 5: Reviews */}
            <a
              href="#reviews"
              className="hidden lg:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              REVEIWS
            </a>

            {/* Cell 6: Contacts */}
            <a
              href="#contacts"
              className="hidden sm:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              CONTACTS
            </a>

            {/* Cell 7: Cart / Profile Icon Pill */}
            <div className="ml-auto flex items-center px-4 sm:px-6 gap-3">
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-1.5 p-2 rounded-lg bg-[#FFA8C5]/20 hover:bg-[#FFA8C5] transition-colors text-[#332F32] cursor-pointer"
                title="View Cake Box"
              >
                <FiShoppingBag size={16} />
                <span className="font-black text-xs">{totalCartCount}</span>
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF5983]" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* =========================================================
            SECTION 1: HERO (EXACT 50/50 SPLIT SCREEN ADAPTED FOR CAKES)
            ========================================================= */}
        <section className="border-b border-[#E5E0D5]">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px] sm:min-h-[560px]">
            {/* Left 50%: Solid Bubblegum Pink Box (#FFA8C5) */}
            <div className="md:col-span-6 bg-[#FFA8C5] p-8 sm:p-14 lg:p-20 flex flex-col justify-center space-y-6 sm:space-y-8 border-b md:border-b-0 md:border-r border-[#E5E0D5]">
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#332F32] tracking-tighter leading-[0.92]">
                  LUFFY
                </h1>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#332F32] tracking-tighter leading-[0.92]">
                  CAKES
                </h1>
              </div>

              <p className="font-mono text-xs sm:text-sm uppercase font-bold tracking-wider text-[#332F32]/85 max-w-md leading-relaxed">
                TRY THE BEST ARTISANAL CELEBRATION CAKES IN OSLO WITH FREE DELIVERY! YOU CAN COMBINE YOUR OWN UNIQUE TASTE WITH OUR CAKE CONSTRUCTOR
              </p>

              {/* Exact Button with Pale Yellow Offset Box Shadow */}
              <div>
                <a
                  href="#menu"
                  className="inline-block px-10 py-3.5 bg-white text-[#332F32] font-mono font-black text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  style={{
                    boxShadow: "6px 6px 0px #FFF59D",
                  }}
                >
                  MENU
                </a>
              </div>
            </div>

            {/* Right 50%: Solid Cream Canvas with Signature Cake Showcase */}
            <div className="md:col-span-6 bg-[#FAF7EE] p-8 sm:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E5E0D5]">
                <Image
                  src="/demo/cakes/cake-1.jpg"
                  alt="Luffy Pink Lambeth Celebration Cake"
                  fill
                  className="object-cover hover:scale-104 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 font-mono text-[10px] font-black text-[#332F32] uppercase tracking-wider border border-[#332F32] shadow-xs">
                  ● SIGNATURE BENTO
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-xs font-mono text-xs flex justify-between items-center border border-[#E5E0D5]">
                  <div>
                    <span className="font-black text-[#332F32] block">Vintage Heart Lambeth</span>
                    <span className="text-[10px] text-[#666]">Swiss Meringue &amp; Chiffon</span>
                  </div>
                  <span className="font-black text-[#FF5983] text-sm">380 kr</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: "TRY THEM TODAY!" CAKE SHOWCASE
            ========================================================= */}
        <section id="menu" className="py-12 sm:py-20 border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
            {/* Header with Title + Yellow Sunburst Sticker */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="space-y-0.5">
                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#332F32] leading-none">
                    TRY THEM
                  </h2>
                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#332F32] leading-none">
                    TODAY!
                  </h2>
                </div>

                {/* Sunburst Sticker */}
                <SunburstSticker
                  text="FREE DELIVERY OVER 500 KR"
                  className="scale-90 sm:scale-100"
                  textSize="text-[8px]"
                />
              </div>

              <a
                href="#menu"
                className="font-mono text-xs font-bold uppercase tracking-wider text-[#332F32] underline underline-offset-4 hover:opacity-80"
              >
                SEE ALL (6 CAKES)
              </a>
            </div>

            {/* 4-Column Cake Grid with Hairline Borders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DAILY_CAKES.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#E5E0D5] bg-[#FAF7EE] p-4 flex flex-col justify-between hover:border-[#332F32] transition-colors group"
                >
                  {/* High-res Cake Photography */}
                  <div className="relative aspect-square w-full mb-4 rounded-xl overflow-hidden border border-[#E5E0D5] flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Metadata Row matching exact image layout */}
                  <div className="space-y-2 border-t border-[#E5E0D5] pt-3 font-mono">
                    <div className="flex items-baseline justify-between">
                      <span className="font-black text-xs tracking-tight text-[#332F32] truncate max-w-[140px]">
                        {item.name}
                      </span>
                      {/* Coral Pink Price text */}
                      <span className="font-black text-sm text-[#FF5983]">
                        {item.price} kr
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#666] uppercase tracking-wider truncate max-w-[150px]">
                        {item.description}
                      </span>
                      {/* Square Plus Button */}
                      <button
                        type="button"
                        onClick={() => addToCart(item.name, item.price, item.id)}
                        className="w-6 h-6 border border-[#E5E0D5] hover:border-[#332F32] hover:bg-[#FFA8C5] flex items-center justify-center text-[#332F32] transition-colors cursor-pointer"
                        title={`Add ${item.name} to order`}
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: "CREATE YOUR SPECIAL TASTE!"
            (INTERACTIVE CAKE CONSTRUCTOR ENGINE)
            ========================================================= */}
        <section id="constructor" className="py-12 sm:py-20 border-b border-[#E5E0D5] bg-[#FAF7EE]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
            {/* Header + Note Sticker */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-0.5">
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#332F32] leading-none">
                  CREATE YOUR
                </h2>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#332F32] leading-none">
                  SPECIAL TASTE!
                </h2>
              </div>

              <div className="md:col-span-6 flex items-center gap-3">
                <SunburstSticker
                  text="IMPORTANT NOTE!:"
                  className="scale-90 flex-shrink-0"
                  textSize="text-[8px]"
                />
                <p className="font-mono text-[10px] uppercase font-bold text-[#666] leading-relaxed">
                  YOU CAN MAKE SPECIAL PRE-ORDER ONLY AT LEAST 2 DAYS IN ADVANCE! IF YOU WANT TO GET YOUR CAKE EARLIER, YOU CAN SEE ALL THE AVAILABLE SIZES FROM OUR DAILY BAKERY MENU
                </p>
              </div>
            </div>

            {/* Constructor Core: Dropdown Table (Left) + Dynamic Cake Render (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left: Dropdown Matrix (Exact Image Table Adapted for Cakes) */}
              <div className="lg:col-span-7 border border-[#E5E0D5] divide-y divide-[#E5E0D5] font-mono text-xs bg-[#FAF7EE]">
                {/* Row 1: SIZE / TIERS */}
                <div className="relative flex items-stretch justify-between">
                  <div className="p-4 w-32 font-black uppercase tracking-wider text-[#332F32] border-r border-[#E5E0D5] flex items-center">
                    SIZE
                  </div>
                  <div className="p-4 flex-1 font-bold text-[#332F32] flex items-center">
                    {selectedSize.label}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "size" ? null : "size")}
                    className="w-14 bg-[#FFA8C5] hover:bg-[#FF9EBC] flex items-center justify-center text-[#332F32] transition-colors cursor-pointer"
                  >
                    <FiChevronDown size={18} />
                  </button>

                  {/* Size Dropdown Menu */}
                  {openDropdown === "size" && (
                    <div className="absolute top-full left-0 right-0 z-30 bg-[#FAF7EE] border-2 border-[#332F32] shadow-xl p-2 space-y-1">
                      {CONSTRUCTOR_OPTIONS.sizes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setSelectedSize(s);
                            setOpenDropdown(null);
                          }}
                          className="w-full p-2.5 text-left flex justify-between hover:bg-[#FFA8C5]/20 font-bold"
                        >
                          <span>{s.label}</span>
                          <span className="text-[#FF5983]">{s.price} kr</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Row 2: SPONGE BASE */}
                <div className="relative flex items-stretch justify-between">
                  <div className="p-4 w-32 font-black uppercase tracking-wider text-[#332F32] border-r border-[#E5E0D5] flex items-center">
                    SPONGE
                  </div>
                  <div className="p-4 flex-1 font-bold text-[#332F32] flex items-center">
                    {selectedSponge.label}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "sponge" ? null : "sponge")}
                    className="w-14 bg-[#FFA8C5] hover:bg-[#FF9EBC] flex items-center justify-center text-[#332F32] transition-colors cursor-pointer"
                  >
                    <FiChevronDown size={18} />
                  </button>

                  {/* Sponge Dropdown Menu */}
                  {openDropdown === "sponge" && (
                    <div className="absolute top-full left-0 right-0 z-30 bg-[#FAF7EE] border-2 border-[#332F32] shadow-xl p-2 space-y-1">
                      {CONSTRUCTOR_OPTIONS.sponges.map((sp) => (
                        <button
                          key={sp.id}
                          onClick={() => {
                            setSelectedSponge(sp);
                            setOpenDropdown(null);
                          }}
                          className="w-full p-2.5 text-left hover:bg-[#FFA8C5]/20 font-bold"
                        >
                          {sp.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Row 3: FILLING / CORE */}
                <div className="relative flex items-stretch justify-between">
                  <div className="p-4 w-32 font-black uppercase tracking-wider text-[#332F32] border-r border-[#E5E0D5] flex items-center">
                    FILLING
                  </div>
                  <div className="p-4 flex-1 font-bold text-[#332F32] flex items-center">
                    {selectedFilling.label}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "filling" ? null : "filling")}
                    className="w-14 bg-[#FFA8C5] hover:bg-[#FF9EBC] flex items-center justify-center text-[#332F32] transition-colors cursor-pointer"
                  >
                    <FiChevronDown size={18} />
                  </button>

                  {/* Filling Dropdown Menu */}
                  {openDropdown === "filling" && (
                    <div className="absolute top-full left-0 right-0 z-30 bg-[#FAF7EE] border-2 border-[#332F32] shadow-xl p-2 space-y-1">
                      {CONSTRUCTOR_OPTIONS.fillings.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => {
                            setSelectedFilling(f);
                            setOpenDropdown(null);
                          }}
                          className="w-full p-2.5 text-left hover:bg-[#FFA8C5]/20 font-bold"
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Row 4: FROSTING & FINISH */}
                <div className="relative flex items-stretch justify-between">
                  <div className="p-4 w-32 font-black uppercase tracking-wider text-[#332F32] border-r border-[#E5E0D5] flex items-center">
                    FROSTING
                  </div>
                  <div className="p-4 flex-1 font-bold text-[#332F32] flex items-center">
                    {selectedFrosting.label}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "frosting" ? null : "frosting")}
                    className="w-14 bg-[#FFA8C5] hover:bg-[#FF9EBC] flex items-center justify-center text-[#332F32] transition-colors cursor-pointer"
                  >
                    <FiChevronDown size={18} />
                  </button>

                  {/* Frosting Dropdown Menu */}
                  {openDropdown === "frosting" && (
                    <div className="absolute top-full left-0 right-0 z-30 bg-[#FAF7EE] border-2 border-[#332F32] shadow-xl p-2 space-y-1">
                      {CONSTRUCTOR_OPTIONS.frostings.map((fr) => (
                        <button
                          key={fr.id}
                          onClick={() => {
                            setSelectedFrosting(fr);
                            setOpenDropdown(null);
                          }}
                          className="w-full p-2.5 text-left hover:bg-[#FFA8C5]/20 font-bold flex items-center justify-between"
                        >
                          <span>{fr.label}</span>
                          <span className="w-3 h-3 rounded-full bg-[#FFA8C5]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Row 5: TOPPING */}
                <div className="relative flex items-stretch justify-between">
                  <div className="p-4 w-32 font-black uppercase tracking-wider text-[#332F32] border-r border-[#E5E0D5] flex items-center">
                    TOPPING
                  </div>
                  <div className="p-4 flex-1 font-bold text-[#332F32] flex items-center">
                    {selectedTopping.label}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "topping" ? null : "topping")}
                    className="w-14 bg-[#FFA8C5] hover:bg-[#FF9EBC] flex items-center justify-center text-[#332F32] transition-colors cursor-pointer"
                  >
                    <FiChevronDown size={18} />
                  </button>

                  {/* Topping Dropdown Menu */}
                  {openDropdown === "topping" && (
                    <div className="absolute top-full left-0 right-0 z-30 bg-[#FAF7EE] border-2 border-[#332F32] shadow-xl p-2 space-y-1">
                      {CONSTRUCTOR_OPTIONS.toppings.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setSelectedTopping(t);
                            setOpenDropdown(null);
                          }}
                          className="w-full p-2.5 text-left hover:bg-[#FFA8C5]/20 font-bold"
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Live Dynamic Render of Custom Constructed Cake */}
              <div className="lg:col-span-5 border border-[#E5E0D5] bg-[#FAF7EE] p-6 flex flex-col justify-between relative group">
                <div className="relative aspect-square w-full max-w-[300px] mx-auto rounded-2xl overflow-hidden border border-[#E5E0D5] shadow-lg flex items-center justify-center">
                  <Image
                    src={selectedFrosting.preview}
                    alt="Custom Crafted Cake"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 font-mono text-[9px] font-black uppercase border border-[#332F32]">
                    ● {selectedSize.label.split(" ")[0]}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E0D5] flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-[#666] uppercase block">
                      TOTAL CONSTRUCTED PRICE:
                    </span>
                    <span className="font-black text-xl text-[#FF5983]">
                      {selectedSize.price} kr
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={addConstructedToCart}
                    className="px-5 py-2.5 bg-[#FFA8C5] hover:bg-[#FF9EBC] border border-[#332F32] font-black text-xs uppercase tracking-wider text-[#332F32] flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <span>ADD TO CAKE BOX</span>
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: ABOUT OUR CRAFT (MAKING UP MISSING COMPONENT)
            ========================================================= */}
        <section id="about" className="py-12 sm:py-20 border-b border-[#E5E0D5] bg-[#FAF7EE]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="p-8 sm:p-12 bg-[#FFA8C5] border-2 border-[#332F32] shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <span className="px-3 py-1 bg-white text-[#332F32] font-mono text-[10px] font-black uppercase tracking-widest inline-block">
                    HAND-BAKED FROM SCRATCH IN OSLO
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#332F32] tracking-tight leading-tight">
                    Pure Butter. 0% Fondant Fluff. Real Berry Coulis.
                  </h3>
                  <p className="font-mono text-xs uppercase text-[#332F32]/85 leading-relaxed font-bold">
                    We bake from scratch every morning in our Grünerløkka atelier. Chilled crumb-coating, Swiss meringue buttercream that isn’t sickeningly sweet, and pure Madagascar vanilla beans.
                  </p>
                </div>

                <div className="md:col-span-5 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-white border border-[#332F32] text-center space-y-1">
                    <span className="font-black text-xl text-[#332F32] block">100%</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#666] block">Norwegian Butter</span>
                  </div>
                  <div className="p-3 bg-white border border-[#332F32] text-center space-y-1">
                    <span className="font-black text-xl text-[#332F32] block">0%</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#666] block">Stiff Fondant</span>
                  </div>
                  <div className="p-3 bg-white border border-[#332F32] text-center space-y-1">
                    <span className="font-black text-xl text-[#332F32] block">2 DAGER</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#666] block">Forhåndsbestilling</span>
                  </div>
                  <div className="p-3 bg-white border border-[#332F32] text-center space-y-1">
                    <span className="font-black text-xl text-[#332F32] block">4.9★</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#666] block">Oslo Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: REVIEWS (CELL 5 "REVEIWS" IN NAV)
            ========================================================= */}
        <section id="reviews" className="py-12 sm:py-20 border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#332F32]">
                WHAT CAKE LOVERS SAY
              </h2>
              <span className="font-mono text-xs font-bold text-[#FF5983]">
                4.9 / 5.0 (OSLO)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-5 border border-[#E5E0D5] bg-[#FAF7EE] space-y-3">
                <div className="flex text-[#FF5983]">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-[#FF5983]" size={14} />
                  ))}
                </div>
                <p className="font-bold text-[#332F32] leading-relaxed">
                  &ldquo;The Pink Lambeth heart cake made Sofia’s 25th birthday unforgettable. Not too sweet, fluffy vanilla chiffon, and looks stunning in photos.&rdquo;
                </p>
                <span className="text-[10px] text-[#888] block uppercase">
                  — Mathilde V., Frogner
                </span>
              </div>

              <div className="p-5 border border-[#E5E0D5] bg-[#FAF7EE] space-y-3">
                <div className="flex text-[#FF5983]">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-[#FF5983]" size={14} />
                  ))}
                </div>
                <p className="font-bold text-[#332F32] leading-relaxed">
                  &ldquo;The cake constructor was so fun to use. We chose dark cocoa sponge with salted caramel drip. Delivery to Grünerløkka was right on time.&rdquo;
                </p>
                <span className="text-[10px] text-[#888] block uppercase">
                  — Henrik S., Grünerløkka
                </span>
              </div>

              <div className="p-5 border border-[#E5E0D5] bg-[#FAF7EE] space-y-3">
                <div className="flex text-[#FF5983]">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-[#FF5983]" size={14} />
                  ))}
                </div>
                <p className="font-bold text-[#332F32] leading-relaxed">
                  &ldquo;Finally an Oslo bakery that skips heavy American sugar bombs and focuses on French Swiss buttercream balance.&rdquo;
                </p>
                <span className="text-[10px] text-[#888] block uppercase">
                  — Camilla N., Barcode Oslo
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: FOOTER (MATCHING CELL GRID STRUCTURE)
            ========================================================= */}
        <footer id="contacts" className="border-t border-[#E5E0D5] bg-[#FAF7EE]">
          <div className="max-w-6xl mx-auto divide-y divide-[#E5E0D5] font-mono text-xs">
            <div className="p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <LuffyCakesLogo />
                <p className="text-[11px] text-[#666] pt-2">
                  Artisanal Celebration Cakes, Bento Hearts &amp; Custom Cake Constructor in Oslo.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-black text-[#332F32] block uppercase tracking-wider">
                  VISIT OUR CAKE ATELIER
                </span>
                <p className="text-[#666]">Markveien 32, 0554 Oslo (Grünerløkka)</p>
                <p className="text-[#666]">Tir–Søn: 10:00 – 18:00 (eller tomt)</p>
              </div>

              <div className="space-y-1">
                <span className="font-black text-[#332F32] block uppercase tracking-wider">
                  ORDER SUPPORT &amp; VIPPS
                </span>
                <p className="text-[#666]">hello@luffycakes.no</p>
                <p className="text-[#666]">Vipps Bedrift: #89210</p>
                <p className="text-[#332F32] font-bold">@luffycakes.oslo</p>
              </div>
            </div>

            <div className="p-4 text-center text-[10px] text-[#888] uppercase tracking-wider">
              © 2026 LUFFY CAKES OSLO · ALL RIGHTS RESERVED
            </div>
          </div>
        </footer>

        {/* =========================================================
            SLIDE-OUT CART & PRE-ORDER CHECKOUT DRAWER
            ========================================================= */}
        <AnimatePresence>
          {cartOpen && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="w-full max-w-md bg-[#FAF7EE] border-l-2 border-[#332F32] h-full flex flex-col justify-between font-mono text-xs p-6 shadow-2xl overflow-y-auto"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D5]">
                    <div className="flex items-center gap-2">
                      <FiShoppingBag size={18} className="text-[#FF5983]" />
                      <span className="font-black text-sm uppercase text-[#332F32]">
                        YOUR CAKE BOX ({totalCartCount})
                      </span>
                    </div>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="p-1 text-[#332F32] hover:opacity-70 cursor-pointer"
                    >
                      <FiX size={18} />
                    </button>
                  </div>

                  {checkoutStep === "cart" ? (
                    <div className="py-4 space-y-4">
                      {cart.length === 0 ? (
                        <p className="py-8 text-center text-[#888]">Your cake box is currently empty.</p>
                      ) : (
                        <div className="divide-y divide-[#E5E0D5]">
                          {cart.map((item) => (
                            <div key={item.id} className="py-3 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-[#332F32] block">{item.name}</span>
                                <span className="text-[10px] text-[#666]">
                                  {item.price} kr × {item.count}
                                </span>
                              </div>
                              <span className="font-black text-[#FF5983]">
                                {item.price * item.count} kr
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-4 border-t border-[#E5E0D5] space-y-3">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                            PICKUP / DELIVERY DATE (MIN. 2 DAYS IN ADVANCE):
                          </label>
                          <input
                            type="text"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                            className="w-full p-2.5 border border-[#E5E0D5] bg-white text-[#332F32] font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                            CUSTOM CAKE INSCRIPTION (E.G. &quot;HAPPY BIRTHDAY SOFIA&quot;):
                          </label>
                          <input
                            type="text"
                            value={customInscription}
                            onChange={(e) => setCustomInscription(e.target.value)}
                            className="w-full p-2.5 border border-[#E5E0D5] bg-white text-[#332F32]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                            NAME:
                          </label>
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full p-2.5 border border-[#E5E0D5] bg-white text-[#332F32]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                            MOBILE FOR VIPPS CONFIRMATION:
                          </label>
                          <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full p-2.5 border border-[#E5E0D5] bg-white text-[#332F32]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Order Confirmed Pass */
                    <div className="py-6 space-y-4">
                      <div className="p-4 bg-[#FFA8C5] border-2 border-[#332F32] text-center space-y-2">
                        <span className="text-2xl">🎂</span>
                        <h4 className="font-black text-base uppercase text-[#332F32]">
                          CAKE RESERVATION CONFIRMED!
                        </h4>
                        <p className="text-[10px] uppercase font-bold text-[#332F32]">
                          Vipps payment request sent to {customerPhone}
                        </p>
                      </div>

                      <div className="p-4 border border-[#E5E0D5] bg-white space-y-2 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-[#666]">Recipient:</span>
                          <span className="font-bold text-[#332F32]">{customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#666]">Pickup Date:</span>
                          <span className="font-bold text-[#332F32]">{orderDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#666]">Inscription:</span>
                          <span className="font-bold text-[#332F32]">&ldquo;{customInscription}&rdquo;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#666]">Atelier:</span>
                          <span className="font-bold text-[#332F32]">Markveien 32, Grünerløkka</span>
                        </div>
                        <div className="flex justify-between border-t border-[#E5E0D5] pt-2 font-black text-[#FF5983]">
                          <span>Total Paid:</span>
                          <span>{totalCartPrice} kr</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {checkoutStep === "cart" ? (
                    <div className="space-y-3 pt-4 border-t border-[#E5E0D5]">
                      <div className="flex justify-between text-sm font-black text-[#332F32]">
                        <span>TOTAL:</span>
                        <span className="text-[#FF5983]">{totalCartPrice} kr</span>
                      </div>
                      <button
                        type="button"
                        disabled={cart.length === 0}
                        onClick={() => setCheckoutStep("confirmed")}
                        className="w-full py-4 bg-[#332F32] text-white hover:bg-black font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <span>CONFIRM WITH VIPPS · {totalCartPrice} KR</span>
                        <FiArrowRight size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setCheckoutStep("cart");
                        setCartOpen(false);
                      }}
                      className="w-full py-3 border border-[#332F32] bg-white font-bold text-xs uppercase cursor-pointer"
                    >
                      CLOSE VOUCHER
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Floating Added Toast */}
        <AnimatePresence>
          {addedToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-[#332F32] text-white border-2 border-[#FFA8C5] shadow-xl font-mono text-xs font-bold uppercase flex items-center gap-2"
            >
              <span>🎂 Added to Box:</span>
              <span className="text-[#FFA8C5]">{addedToast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PreviewShell>
  );
}
