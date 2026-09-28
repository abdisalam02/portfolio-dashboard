"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiX,
  FiArrowRight,
  FiArrowDown,
  FiClock,
  FiMapPin,
  FiStar,
  FiCalendar,
  FiHeart,
  FiChevronDown,
} from "react-icons/fi";
import PreviewShell from "@/components/preview/PreviewShell";

// ==========================================
// BESPOKE LUFFY CAKES BRAND MARK
// ==========================================
function LuffyCakesLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 rounded-full bg-[#FFA8C5] border-2 border-[#332F32] flex items-center justify-center shadow-xs flex-shrink-0">
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <rect x="7" y="19" width="18" height="7" rx="1.5" fill="#FAF7EE" stroke="#332F32" strokeWidth="1.5" />
          <rect x="10" y="13" width="12" height="6" rx="1.5" fill="#FAF7EE" stroke="#332F32" strokeWidth="1.5" />
          <path d="M 7 21 Q 11.5 23 16 21 Q 20.5 23 25 21" stroke="#FFA8C5" strokeWidth="2" fill="none" />
          <path d="M 10 15 Q 13 17 16 15 Q 19 17 22 15" stroke="#FFA8C5" strokeWidth="2" fill="none" />
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

// Sunburst sticker matching luffy-donuts-customizer
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

// 4 Core Cake Size Tiers with Portion Pricing
interface CakeSizeTier {
  id: string;
  name: string;
  subtitle: string;
  portions: string;
  diameter: string;
  basePrice: number;
  popular?: boolean;
  image: string;
  description: string;
}

const CAKE_SIZES: CakeSizeTier[] = [
  {
    id: "bento",
    name: "BENTO LUNCHBOX",
    subtitle: "Cute Bento Box",
    portions: "2–3 porsjoner",
    diameter: "10 cm · 2 lag",
    basePrice: 240,
    image: "/demo/cakes/cake-3.jpg",
    description: "Perfekt for piknik, bursdagslunsj eller søt oppmerksomhet. Leveres i søt bento-eske med skje og lys.",
  },
  {
    id: "petite",
    name: "PETITE CELEBRATION",
    subtitle: "Mest Populær!",
    portions: "6–8 porsjoner",
    diameter: "15 cm · 3 lag",
    basePrice: 480,
    popular: true,
    image: "/demo/cakes/cake-1.jpg",
    description: "Standardstørrelsen for bursdager og middagsselskaper. Høy profil med 3 saftige kakebunnlag og 2 lag fyll.",
  },
  {
    id: "signature",
    name: "SIGNATURE GATEAU",
    subtitle: "Festens Midtpunkt",
    portions: "12–16 porsjoner",
    diameter: "20 cm · 3 lag",
    basePrice: 780,
    image: "/demo/cakes/cake-2.jpg",
    description: "For større feiringer, konfirmasjon og dåp. Rik sjokoladedrypp eller vintage rørdekor med rikelig med porsjoner.",
  },
  {
    id: "grand",
    name: "TWO-TIER GRAND",
    subtitle: "Bryllup & Jubileum",
    portions: "24–30 porsjoner",
    diameter: "2 etasjer (22cm + 15cm)",
    basePrice: 1480,
    image: "/demo/cakes/cake-5.jpg",
    description: "To etasjer bygd på solid kakebrett med intern støtte. Dekorert med friske roser, makroner og bladgull.",
  },
];

// Interactive Cake Constructor Flavors
const CONSTRUCTOR_OPTIONS = {
  sponges: [
    { id: "vanilla", label: "MADAGASCAR VANILJE CHIFFON" },
    { id: "chocolate", label: "VALRHONA 70% MØRK KAKAO" },
    { id: "pistachio", label: "RØSTET SICILIANSK PISTASJ" },
    { id: "red-velvet", label: "RED VELVET KJERNEMELK" },
    { id: "lemon", label: "SITRON & VALMUEFRØ" },
  ],
  fillings: [
    { id: "raspberry", label: "FRISKE NORDISKE BRINGEBÆR" },
    { id: "caramel", label: "SALT FLEUR DE SEL KARAMELL" },
    { id: "ganache", label: "PISKET BELGISK GANACHE" },
    { id: "passion", label: "PASJONSFRUKT & MANGO CURD" },
    { id: "mascarpone", label: "VANILJE BEAN MASCARPONE" },
  ],
  frostings: [
    { id: "pink-buttercream", label: "ROSA VINTAGE SMØRKREM", preview: "/demo/cakes/cake-1.jpg" },
    { id: "chocolate-drip", label: "MØRK SJOKOLADEDRYPP", preview: "/demo/cakes/cake-2.jpg" },
    { id: "white-chantilly", label: "KRITTKVIT CHANTILLY KREM", preview: "/demo/cakes/cake-3.jpg" },
    { id: "pistachio-glaze", label: "PISTASJGLASUR & BÆR", preview: "/demo/cakes/cake-4.jpg" },
    { id: "tiered-roses", label: "HVIT ETASJE MED ROSER", preview: "/demo/cakes/cake-5.jpg" },
  ],
  toppings: [
    { id: "piped-frills", label: "VINTAGE LAMBETH BORD", priceDelta: 0 },
    { id: "berries", label: "FRISKE BRINGEBÆR & BLOMSTER", priceDelta: 0 },
    { id: "gold-pearls", label: "24K SPISELIG BLADGULL & PERLER", priceDelta: 50 },
    { id: "macarons", label: "FRANSKE MAKRONER (4 STK)", priceDelta: 80 },
  ],
};

const UPCOMING_DATES = [
  "Torsdag 31. okt",
  "Fredag 1. nov",
  "Lørdag 2. nov",
  "Søndag 3. nov",
  "Tirsdag 5. nov",
  "Onsdag 6. nov",
];

const PICKUP_TIMES = ["11:00 – 13:00", "13:00 – 15:00", "15:00 – 17:00", "17:00 – 18:30"];

export default function PreviewCakesPage() {
  // Active Selected Size
  const [selectedSize, setSelectedSize] = useState<CakeSizeTier>(CAKE_SIZES[1]);

  // Constructor Flavors
  const [selectedSponge, setSelectedSponge] = useState(CONSTRUCTOR_OPTIONS.sponges[0]);
  const [selectedFilling, setSelectedFilling] = useState(CONSTRUCTOR_OPTIONS.fillings[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(CONSTRUCTOR_OPTIONS.frostings[0]);
  const [selectedTopping, setSelectedTopping] = useState(CONSTRUCTOR_OPTIONS.toppings[0]);

  // Dropdown Open Toggles
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Booking Form State
  const [orderDate, setOrderDate] = useState(UPCOMING_DATES[2]); // Saturday
  const [pickupTime, setPickupTime] = useState(PICKUP_TIMES[1]);
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("pickup");
  const [customerName, setCustomerName] = useState("Mathilde V.");
  const [customerPhone, setCustomerPhone] = useState("+47 905 43 210");
  const [customInscription, setCustomInscription] = useState("Happy 25th Sofia!");
  const [dietaryNotes, setDietaryNotes] = useState("Ingen nøtter på toppen, takk.");
  const [candleCount, setCandleCount] = useState("25");

  // Booking Confirmation State
  const [confirmed, setConfirmed] = useState(false);

  // Calculate dynamic price
  const totalPrice = selectedSize.basePrice + selectedTopping.priceDelta;

  // Auto-scroll to confirmed pass
  useEffect(() => {
    if (confirmed) {
      const timer = setTimeout(() => {
        const pass = document.getElementById("confirmed-cake-pass");
        if (pass) {
          pass.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [confirmed]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <PreviewShell
      nicheTitle="Luffy Cakes Oslo"
      nicheSubtitle="Instagram DM-to-Booking Upgrade · Cake Pricing &amp; Constructor"
      accentColor="#FFA8C5"
    >
      <div className="min-h-screen bg-[#FAF7EE] text-[#332F32] font-sans selection:bg-[#FFA8C5] selection:text-[#332F32] overflow-x-hidden">
        {/* =========================================================
            HEADER: CELL-BORDERED GRID BAR (EXACT LUFFY INSP)
            ========================================================= */}
        <header className="sticky top-0 z-40 bg-[#FAF7EE] border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto flex items-stretch divide-x divide-[#E5E0D5] text-xs font-mono font-bold uppercase tracking-wider text-[#332F32]">
            {/* Cell 1: Logo */}
            <div className="p-3 sm:px-6 flex items-center flex-shrink-0">
              <LuffyCakesLogo />
            </div>

            {/* Cell 2: Størrelser & Priser */}
            <a
              href="#pricing"
              className="hidden md:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              PRISER &amp; STØRRELSER
            </a>

            {/* Cell 3: Bygg Din Kake */}
            <a
              href="#constructor"
              className="hidden md:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              BYGG DIN KAKE
            </a>

            {/* Cell 4: Forhåndsbestilling */}
            <a
              href="#booking-desk"
              className="hidden lg:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              BESTILLING
            </a>

            {/* Cell 5: Omtaler */}
            <a
              href="#reviews"
              className="hidden lg:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              OMTALER
            </a>

            {/* Cell 6: Direkte Booking CTA */}
            <div className="ml-auto flex items-center px-4 sm:px-6">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("booking-desk");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 rounded-full bg-[#332F32] text-white hover:bg-black font-mono font-black text-xs uppercase tracking-wider shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Reserver Kake ↓</span>
              </button>
            </div>
          </div>
        </header>

        {/* =========================================================
            HERO: 50/50 SPLIT SCREEN (EXACT LUFFY POP INSP)
            ========================================================= */}
        <section className="border-b border-[#E5E0D5]">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px] sm:min-h-[560px]">
            {/* Left 50%: Solid Bubblegum Pink Box */}
            <div className="md:col-span-6 bg-[#FFA8C5] p-8 sm:p-14 lg:p-18 flex flex-col justify-center space-y-6 sm:space-y-7 border-b md:border-b-0 md:border-r border-[#E5E0D5]">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white text-[#332F32] font-mono text-[9px] font-black uppercase tracking-widest inline-block border border-[#332F32]">
                  SLIPP DM-KAOSET PÅ INSTAGRAM
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#332F32] tracking-tighter leading-[0.92]">
                  LUFFY
                </h1>
                <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#332F32] tracking-tighter leading-[0.92]">
                  CAKES
                </h1>
              </div>

              <p className="font-mono text-xs sm:text-sm uppercase font-bold tracking-wider text-[#332F32]/90 max-w-md leading-relaxed">
                Se transparente priser basert på kakestørrelse, sett sammen bunn og fyll i kake-konstruktøren, og lås inn datoen direkte via Vipps på 60 sekunder.
              </p>

              {/* Exact Button with Pale Yellow Offset Box Shadow */}
              <div className="pt-2">
                <a
                  href="#pricing"
                  className="inline-block px-8 py-3.5 bg-white text-[#332F32] font-mono font-black text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  style={{
                    boxShadow: "6px 6px 0px #FFF59D",
                  }}
                >
                  SE STØRRELSER &amp; PRISER ↓
                </a>
              </div>
            </div>

            {/* Right 50%: Solid Cream Canvas with Hero Cake */}
            <div className="md:col-span-6 bg-[#FAF7EE] p-8 sm:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center rounded-3xl overflow-hidden shadow-xl border-2 border-[#E5E0D5]">
                <Image
                  src="/demo/cakes/cake-1.jpg"
                  alt="Luffy Pink Lambeth Celebration Cake"
                  fill
                  className="object-cover hover:scale-104 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white font-mono text-[9px] font-black text-[#332F32] uppercase tracking-wider border border-[#332F32] shadow-xs">
                  ● SIGNATUR KAKE
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-xs font-mono text-xs flex justify-between items-center border border-[#E5E0D5]">
                  <div>
                    <span className="font-black text-[#332F32] block">Vintage Heart Lambeth</span>
                    <span className="text-[10px] text-[#666]">6–8 porsjoner · 15 cm</span>
                  </div>
                  <span className="font-black text-[#FF5983] text-sm">480 kr</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 1: TRANSPARENT PRICING PER CAKE SIZE
            (Direct answer to "how much is a cake?")
            ========================================================= */}
        <section id="pricing" className="py-12 sm:py-20 border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="space-y-0.5">
                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#332F32] leading-none">
                    VELG STØRRELSE
                  </h2>
                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#332F32] leading-none">
                    &amp; PRIS
                  </h2>
                </div>

                <SunburstSticker
                  text="TRANSPARENTE PRISER"
                  className="scale-90 sm:scale-100"
                  textSize="text-[8px]"
                />
              </div>

              <span className="font-mono text-xs text-[#666] max-w-xs text-right hidden sm:block">
                Ingen skjulte kostnader. Pris inkluderer kakebrett, eske og tilpasset dekorasjon.
              </span>
            </div>

            {/* 4 Size Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CAKE_SIZES.map((tier) => {
                const isSelected = selectedSize.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => {
                      setSelectedSize(tier);
                      const el = document.getElementById("constructor");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`border-2 p-5 flex flex-col justify-between transition-all cursor-pointer group ${
                      isSelected
                        ? "border-[#332F32] bg-[#FFA8C5]/20 shadow-md ring-2 ring-[#332F32]"
                        : "border-[#E5E0D5] bg-[#FAF7EE] hover:border-[#332F32] hover:bg-white"
                    }`}
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-square w-full mb-4 rounded-xl overflow-hidden border border-[#E5E0D5]">
                        <Image
                          src={tier.image}
                          alt={tier.name}
                          fill
                          className="object-cover group-hover:scale-106 transition-transform duration-500"
                        />
                        {tier.popular && (
                          <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#FFF59D] text-[#332F32] font-mono text-[9px] font-black uppercase border border-[#332F32]">
                            MEST POPULÆR
                          </div>
                        )}
                      </div>

                      {/* Header & Portions */}
                      <div className="font-mono space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#FF5983] font-black uppercase tracking-wider">
                            ● {tier.portions}
                          </span>
                          <span className="font-black text-lg text-[#332F32]">
                            {tier.basePrice} kr
                          </span>
                        </div>

                        <h3 className="font-black text-sm text-[#332F32] uppercase tracking-tight">
                          {tier.name}
                        </h3>

                        <span className="text-[10px] text-[#666] font-bold block">
                          {tier.diameter}
                        </span>

                        <p className="text-[11px] text-[#555] leading-relaxed pt-2 border-t border-[#E5E0D5]">
                          {tier.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#E5E0D5] flex items-center justify-between font-mono text-xs font-bold">
                      <span className={isSelected ? "text-[#332F32]" : "text-[#777]"}>
                        {isSelected ? "Valgt Størrelse ✓" : "Velg & Tilpass →"}
                      </span>
                      <span className="w-6 h-6 rounded-full border border-[#332F32] flex items-center justify-center bg-white text-[10px]">
                        {isSelected ? "✓" : "+"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: "CREATE YOUR SPECIAL TASTE!"
            (INTERACTIVE CONSTRUCTOR INTEGRATED WITH PRICING)
            ========================================================= */}
        <section id="constructor" className="py-12 sm:py-20 border-b border-[#E5E0D5] bg-[#FAF7EE] scroll-mt-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
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
                  text="VIKTIG INFO!:"
                  className="scale-90 flex-shrink-0"
                  textSize="text-[8px]"
                />
                <p className="font-mono text-[10px] uppercase font-bold text-[#666] leading-relaxed">
                  ALLE KAKER BAKES FRA BUNNEN PÅ BESTILLING. MINST 2 DAGERS FORHÅNDSBESTILLING GJELDER FOR TILPASSEDE DESIGN.
                </p>
              </div>
            </div>

            {/* Constructor Dropdown Matrix + Dynamic Render */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left: Dropdown Table */}
              <div className="lg:col-span-7 border border-[#E5E0D5] divide-y divide-[#E5E0D5] font-mono text-xs bg-[#FAF7EE]">
                {/* Row 1: STØRRELSE (Syncs with selectedSize) */}
                <div className="relative flex items-stretch justify-between">
                  <div className="p-4 w-32 font-black uppercase tracking-wider text-[#332F32] border-r border-[#E5E0D5] flex items-center">
                    STØRRELSE
                  </div>
                  <div className="p-4 flex-1 font-bold text-[#332F32] flex items-center justify-between">
                    <span>{selectedSize.name} ({selectedSize.portions})</span>
                    <span className="text-[#FF5983]">{selectedSize.basePrice} kr</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "size" ? null : "size")}
                    className="w-14 bg-[#FFA8C5] hover:bg-[#FF9EBC] flex items-center justify-center text-[#332F32] transition-colors cursor-pointer"
                  >
                    <FiChevronDown size={18} />
                  </button>

                  {/* Size Dropdown */}
                  {openDropdown === "size" && (
                    <div className="absolute top-full left-0 right-0 z-30 bg-[#FAF7EE] border-2 border-[#332F32] shadow-xl p-2 space-y-1">
                      {CAKE_SIZES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setSelectedSize(s);
                            setOpenDropdown(null);
                          }}
                          className="w-full p-2.5 text-left flex justify-between hover:bg-[#FFA8C5]/20 font-bold"
                        >
                          <span>{s.name} · {s.portions}</span>
                          <span className="text-[#FF5983]">{s.basePrice} kr</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Row 2: SPONGE BASE */}
                <div className="relative flex items-stretch justify-between">
                  <div className="p-4 w-32 font-black uppercase tracking-wider text-[#332F32] border-r border-[#E5E0D5] flex items-center">
                    KAKEBUNN
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

                {/* Row 3: FILLING */}
                <div className="relative flex items-stretch justify-between">
                  <div className="p-4 w-32 font-black uppercase tracking-wider text-[#332F32] border-r border-[#E5E0D5] flex items-center">
                    KREMEFYLL
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

                {/* Row 4: FROSTING STYLE */}
                <div className="relative flex items-stretch justify-between">
                  <div className="p-4 w-32 font-black uppercase tracking-wider text-[#332F32] border-r border-[#E5E0D5] flex items-center">
                    DEKORSTIL
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
                    EKSTRA TOPPING
                  </div>
                  <div className="p-4 flex-1 font-bold text-[#332F32] flex items-center justify-between">
                    <span>{selectedTopping.label}</span>
                    {selectedTopping.priceDelta > 0 && (
                      <span className="text-[#FF5983]">+{selectedTopping.priceDelta} kr</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "topping" ? null : "topping")}
                    className="w-14 bg-[#FFA8C5] hover:bg-[#FF9EBC] flex items-center justify-center text-[#332F32] transition-colors cursor-pointer"
                  >
                    <FiChevronDown size={18} />
                  </button>

                  {openDropdown === "topping" && (
                    <div className="absolute top-full left-0 right-0 z-30 bg-[#FAF7EE] border-2 border-[#332F32] shadow-xl p-2 space-y-1">
                      {CONSTRUCTOR_OPTIONS.toppings.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setSelectedTopping(t);
                            setOpenDropdown(null);
                          }}
                          className="w-full p-2.5 text-left hover:bg-[#FFA8C5]/20 font-bold flex justify-between"
                        >
                          <span>{t.label}</span>
                          {t.priceDelta > 0 ? (
                            <span className="text-[#FF5983]">+{t.priceDelta} kr</span>
                          ) : (
                            <span className="text-emerald-700">Inkludert</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Dynamic Cake Preview Card */}
              <div className="lg:col-span-5 border border-[#E5E0D5] bg-[#FAF7EE] p-6 flex flex-col justify-between relative group">
                <div className="relative aspect-square w-full max-w-[300px] mx-auto rounded-2xl overflow-hidden border border-[#E5E0D5] shadow-lg flex items-center justify-center">
                  <Image
                    src={selectedFrosting.preview}
                    alt="Custom Crafted Cake"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 font-mono text-[9px] font-black uppercase border border-[#332F32]">
                    ● {selectedSize.name.split(" ")[0]} ({selectedSize.portions})
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E0D5] flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-[#666] uppercase block">
                      TOTAL PRIS FOR DITT VALG:
                    </span>
                    <span className="font-black text-2xl text-[#FF5983]">
                      {totalPrice} kr
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("booking-desk");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-5 py-3 bg-[#FFA8C5] hover:bg-[#FF9EBC] border border-[#332F32] font-black text-xs uppercase tracking-wider text-[#332F32] flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <span>LÅS VALG &amp; GÅ TIL BESTILLING ↓</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: INSTAGRAM UPGRADE (DM TO 1-TAP BOOKING DESK)
            ========================================================= */}
        <section id="booking-desk" className="py-12 sm:py-20 border-b border-[#E5E0D5] bg-[#FAF7EE] scroll-mt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E5E0D5] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF5983] font-bold block">
                  ● 1-TRINNS FORHÅNDSBESTILLING
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#332F32]">
                  Reserver Kakedato
                </h2>
              </div>
              <span className="text-xs font-mono text-[#666]">
                Slipp fram og tilbake i DM · Bekreftes direkte med Vipps
              </span>
            </div>

            {!confirmed ? (
              <form onSubmit={handleBookingSubmit} className="space-y-6 text-xs font-mono">
                {/* Step 1: Summary of Configured Cake */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#332F32] shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5]">
                    <div>
                      <span className="text-[10px] text-[#888] uppercase block">Ditt Kakedesign:</span>
                      <h3 className="text-base font-black text-[#332F32] uppercase">
                        {selectedSize.name} ({selectedSize.portions})
                      </h3>
                    </div>
                    <span className="text-xl font-black text-[#FF5983]">
                      {totalPrice} kr
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#555]">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#888] block">Kakebunn:</span>
                      <span className="font-bold text-[#332F32]">{selectedSponge.label}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#888] block">Kremfyll:</span>
                      <span className="font-bold text-[#332F32]">{selectedFilling.label}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#888] block">Dekor:</span>
                      <span className="font-bold text-[#332F32]">{selectedFrosting.label}</span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Date & Pickup Slot Selection */}
                <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0D5]">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#332F32] block">
                    Steg 1 · Velg Dato &amp; Tidspunkt (Minst 2 dager i forveien)
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {UPCOMING_DATES.map((date) => {
                      const isSelected = orderDate === date;
                      return (
                        <button
                          key={date}
                          type="button"
                          onClick={() => setOrderDate(date)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#332F32] text-white border-[#332F32] font-black shadow-xs"
                              : "bg-[#FAF7EE] border-[#E5E0D5] text-[#332F32] hover:border-[#332F32]"
                          }`}
                        >
                          <span className="text-[10px] block opacity-80">{date.split(" ")[0]}</span>
                          <span className="text-xs font-bold block">{date.split(" ").slice(1).join(" ")}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {PICKUP_TIMES.map((time) => {
                      const isSelected = pickupTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setPickupTime(time)}
                          className={`p-2 rounded-lg border text-center text-xs transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#FFA8C5] bg-[#FFA8C5] text-[#332F32] font-black shadow-2xs"
                              : "border-[#E5E0D5] bg-[#FAF7EE] text-[#555] hover:border-[#332F32]"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Custom Inscription & Delivery Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] space-y-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                        Håndskrevet Tekst på Kaken (Valgfritt):
                      </label>
                      <input
                        type="text"
                        value={customInscription}
                        onChange={(e) => setCustomInscription(e.target.value)}
                        placeholder='f.eks. "Happy 25th Sofia!"'
                        className="w-full p-2.5 border border-[#E5E0D5] bg-[#FAF7EE] text-[#332F32] font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                        Antall Bursdagslys (Inkludert):
                      </label>
                      <input
                        type="text"
                        value={candleCount}
                        onChange={(e) => setCandleCount(e.target.value)}
                        placeholder="f.eks. 25 lys"
                        className="w-full p-2.5 border border-[#E5E0D5] bg-[#FAF7EE] text-[#332F32]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] space-y-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                        Henting eller Budlevering i Oslo:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFulfillmentType("pickup")}
                          className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                            fulfillmentType === "pickup"
                              ? "bg-[#FFA8C5] border-[#332F32] text-[#332F32]"
                              : "border-[#E5E0D5] bg-[#FAF7EE] text-[#666]"
                          }`}
                        >
                          Hentes på Grünerløkka (Gratis)
                        </button>
                        <button
                          type="button"
                          onClick={() => setFulfillmentType("delivery")}
                          className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                            fulfillmentType === "delivery"
                              ? "bg-[#FFA8C5] border-[#332F32] text-[#332F32]"
                              : "border-[#E5E0D5] bg-[#FAF7EE] text-[#666]"
                          }`}
                        >
                          Budlevering i Oslo (+150 kr)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                        Allergier / Spesielle ønsker:
                      </label>
                      <input
                        type="text"
                        value={dietaryNotes}
                        onChange={(e) => setDietaryNotes(e.target.value)}
                        placeholder="f.eks. Nøttefri, glutenredusert..."
                        className="w-full p-2.5 border border-[#E5E0D5] bg-[#FAF7EE] text-[#332F32]"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 4: Contact & Submit */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0D5] space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#332F32] block">
                    Steg 2 · Kontaktperson for Vipps-bekreftelse
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-[#666] block mb-1">Ditt Navn</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Mathilde V."
                        className="w-full p-3 border border-[#E5E0D5] bg-[#FAF7EE] text-[#332F32] font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#666] block mb-1">Mobil for Vipps &amp; Hente-SMS</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+47 905 43 210"
                        className="w-full p-3 border border-[#E5E0D5] bg-[#FAF7EE] text-[#332F32] font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#332F32] hover:bg-black text-white font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>RESERVER KAKE NÅ · {totalPrice + (fulfillmentType === "delivery" ? 150 : 0)} KR MED VIPPS</span>
                  <FiArrowRight size={16} />
                </button>
              </form>
            ) : (
              /* Confirmed Cake Reservation Pass */
              <motion.div
                id="confirmed-cake-pass"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-6 sm:p-8 rounded-3xl border-2 border-[#332F32] bg-white space-y-5 font-mono text-xs shadow-xl"
              >
                <div className="flex justify-between items-start border-b border-[#E5E0D5] pb-4">
                  <div className="flex items-center gap-3">
                    <LuffyCakesLogo className="w-10 h-10" />
                    <div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black uppercase inline-block mb-1">
                        ● RESERVASJON BEKREFTET
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#332F32]">
                        Luffy Cakes Bestillingsbevis
                      </h3>
                      <span className="text-[#666]">Bestiller: {customerName}</span>
                    </div>
                  </div>
                  <span className="text-xl font-black text-[#FF5983]">
                    {totalPrice + (fulfillmentType === "delivery" ? 150 : 0)} kr
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-[#888] uppercase block">Kakestørrelse:</span>
                    <span className="font-bold text-[#332F32]">
                      {selectedSize.name} ({selectedSize.portions})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888] uppercase block">Dato &amp; Tid:</span>
                    <span className="font-bold text-[#332F32]">
                      {orderDate} kl. {pickupTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888] uppercase block">Smaksprofil:</span>
                    <span className="font-bold text-[#332F32]">
                      {selectedSponge.label.split(" ")[0]} bunn med {selectedFilling.label.toLowerCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888] uppercase block">Håndskrevet Tekst:</span>
                    <span className="font-bold text-[#332F32] italic">
                      &ldquo;{customInscription}&rdquo;
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E5E0D5] bg-[#FAF7EE] flex justify-between items-center text-[11px]">
                  <span className="text-[#555]">
                    {fulfillmentType === "delivery"
                      ? "Levering: Bud i Oslo (+150 kr)"
                      : "Henting: Markveien 32, Grünerløkka, Oslo"}
                  </span>
                  <span className="font-bold text-[#332F32]">Ordre #LC-{Date.now().toString().slice(-4)}</span>
                </div>

                <div className="pt-2 flex justify-between items-center text-[11px]">
                  <span className="text-[#666]">
                    Vipps-krav og hente-SMS sendt til {customerPhone}
                  </span>
                  <button
                    type="button"
                    onClick={() => setConfirmed(false)}
                    className="text-[#332F32] underline font-bold hover:opacity-75 cursor-pointer"
                  >
                    Endre bestilling
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* =========================================================
            SECTION 4: INSTAGRAM PROBLEM vs SOLUTION COMPARISON
            (Why Oslo bakers ditch the DMs for this page)
            ========================================================= */}
        <section className="py-12 sm:py-16 border-b border-[#E5E0D5] bg-[#FAF7EE]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#FF5983]">
                HVORFOR BRUKE DETTE I STEDET FOR &quot;SEND DM FOR BESTILLING&quot;?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#332F32]">
                Slutt Å Bruke 3 Timer Om Dagen I Innboksen
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {/* The Old Way: DMs */}
              <div className="p-5 rounded-2xl bg-white/60 border border-red-200 space-y-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold uppercase">
                  ✕ Den Gamle Måten (Instagram DM)
                </span>
                <ul className="space-y-2 text-[#555] leading-relaxed">
                  <li>• 12 meldinger fram og tilbake for å avklare dato og porsjoner.</li>
                  <li>• Kunder som ghoster etter at du har regnet ut prisen manuelt.</li>
                  <li>• Dobbelbookinger fordi datoer ligger spredt i meldinger og notater.</li>
                  <li>• Glemt tekst eller feil allergiinfo skrevet i en hastig DM.</li>
                </ul>
              </div>

              {/* The New Way: Studio Booking Link */}
              <div className="p-5 rounded-2xl bg-white border-2 border-[#332F32] shadow-xs space-y-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                  ✓ Din Nye Studioside (Lenke i Bio)
                </span>
                <ul className="space-y-2 text-[#332F32] leading-relaxed font-bold">
                  <li>• Kunden ser prisen per størrelse umiddelbart og velger selv.</li>
                  <li>• Kake-konstruktøren lar kunden designe smaken på 60 sekunder.</li>
                  <li>• Kalenderen krever 2 dagers forhåndsvarsel automatisk.</li>
                  <li>• Både du og kunden får ferdig digital kvittering med Vipps.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: REVIEWS
            ========================================================= */}
        <section id="reviews" className="py-12 sm:py-20 border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#332F32]">
                HVA KUNDENE SIER
              </h2>
              <span className="font-mono text-xs font-bold text-[#FF5983]">
                4.9 / 5.0 I OSLO
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
                  &ldquo;Så deilig å bare kunne velge kake på 1 minutt istedenfor å vente 6 timer på DM-svar. Kaken var fantastisk saftig!&rdquo;
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
                  &ldquo;Bento-kaken til venninnegaven var en kjempesuksess. Valgte pistasj og bringebær. Bildene ble utrolig søte.&rdquo;
                </p>
                <span className="text-[10px] text-[#888] block uppercase">
                  — Nora L., St. Hanshaugen
                </span>
              </div>

              <div className="p-5 border border-[#E5E0D5] bg-[#FAF7EE] space-y-3">
                <div className="flex text-[#FF5983]">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-[#FF5983]" size={14} />
                  ))}
                </div>
                <p className="font-bold text-[#332F32] leading-relaxed">
                  &ldquo;Bestilte 2-etasjes kake til konfirmasjon. Alt var klart til avtalt tid i Markveien. 10/10 opplevelse.&rdquo;
                </p>
                <span className="text-[10px] text-[#888] block uppercase">
                  — Henrik S., Grünerløkka
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: FOOTER (CELL GRID STRUCTURE)
            ========================================================= */}
        <footer id="contacts" className="border-t border-[#E5E0D5] bg-[#FAF7EE]">
          <div className="max-w-6xl mx-auto divide-y divide-[#E5E0D5] font-mono text-xs">
            <div className="p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <LuffyCakesLogo />
                <p className="text-[11px] text-[#666] pt-2">
                  Artisanal celebration cakes &amp; bento boxes i Oslo. Erstatt DM-kaoset med en transparent forhåndsbestillingsside.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-black text-[#332F32] block uppercase tracking-wider">
                  ATELIER &amp; HENTING
                </span>
                <p className="text-[#666]">Markveien 32, 0554 Grünerløkka, Oslo</p>
                <p className="text-[#666]">Tir–Lør: 10:00 – 18:00 (kun forhåndsbestilte kaker)</p>
              </div>

              <div className="space-y-1">
                <span className="font-black text-[#332F32] block uppercase tracking-wider">
                  KONTAKT &amp; VIPPS
                </span>
                <p className="text-[#666]">hei@luffycakes.no</p>
                <p className="text-[#666]">Vipps Bedrift: #89210</p>
                <p className="text-[#332F32] font-bold">@luffycakes.oslo</p>
              </div>
            </div>

            <div className="p-4 text-center text-[10px] text-[#888] uppercase tracking-wider">
              © 2026 LUFFY CAKES OSLO · BYGD FOR NORSKE INSTAGRAM-SKAPERE AV A.GURE
            </div>
          </div>
        </footer>
      </div>
    </PreviewShell>
  );
}
