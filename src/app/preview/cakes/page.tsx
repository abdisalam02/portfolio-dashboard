"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiArrowRight,
  FiStar,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiHeart,
} from "react-icons/fi";
import PreviewShell from "@/components/preview/PreviewShell";

// ==========================================
// BRAND LOGO MARK (Luffy Cakes Oslo)
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

// ==========================================
// DATA STRUCTURES
// ==========================================

// 1. INSPIRASJONSGALLERI ITEMS (Pure Gallery Lookbook)
const GALLERY_ITEMS = [
  {
    id: "vintage-lambeth",
    title: "Vintage Heart Lambeth",
    category: "Bursdag & Feiring",
    image: "/demo/cakes/cake-1.jpg",
    portions: "6–8 porsjoner · 15 cm",
    tag: "Y2K / Retro",
    description: "Klassisk hjerteform med overdådig rørdekor, rysjekanter og perler i vintage pastellrosa.",
    defaultFrostingId: "pink-buttercream",
  },
  {
    id: "dark-ganache",
    title: "Midnight Valrhona Ganache",
    category: "Selskap & Jubileum",
    image: "/demo/cakes/cake-2.jpg",
    portions: "12–16 porsjoner · 20 cm",
    tag: "Sjokoladeelskere",
    description: "Intens 70% mørk Valrhona-kakebunn toppet med fløyelsmyk ganachedrypp og ferske bær.",
    defaultFrostingId: "chocolate-drip",
  },
  {
    id: "korean-bento",
    title: "Sweet Bento Box Heart",
    category: "Lunsjboks & Piknik",
    image: "/demo/cakes/cake-3.jpg",
    portions: "2–3 porsjoner · 10 cm",
    tag: "Liten & Søt",
    description: "Koreansk bento-kake i søt take-away boks med personlig håndskrevet hilsen og tre-skje.",
    defaultFrostingId: "white-chantilly",
  },
  {
    id: "pistachio-botanical",
    title: "Siciliansk Pistasj & Bær",
    category: "Gourmet Feiring",
    image: "/demo/cakes/cake-4.jpg",
    portions: "6–8 porsjoner · 15 cm",
    tag: "Sesongfavoritt",
    description: "Røstede pistasjnøtter fra Bronte malt i kakebunnen med frisk mascarponekrem og markjordbær.",
    defaultFrostingId: "pistachio-glaze",
  },
  {
    id: "tiered-wedding",
    title: "Two-Tier Grand Romance",
    category: "Bryllup & Storfest",
    image: "/demo/cakes/cake-5.jpg",
    portions: "24–30 porsjoner · 2 etasjer",
    tag: "Hovedfeiring",
    description: "To etasjer bygd på solid kakebrett med intern støtte, dekorert med ekte friske roser.",
    defaultFrostingId: "tiered-roses",
  },
  {
    id: "party-chiffon",
    title: "Festens Midtpunkt Gateau",
    category: "Konfirmasjon & Dåp",
    image: "/demo/cakes/cake-6.jpg",
    portions: "12–16 porsjoner · 20 cm",
    tag: "Klassiker",
    description: "Ekstra høy profil med tre saftige lag, dobbel bringebærkompott og håndskrevet tekst.",
    defaultFrostingId: "pink-buttercream",
  },
];

// 2. FERDIGE SIGNATURKAKER (Quick 1-Click Pick Option)
const SIGNATURE_PRESETS = [
  {
    id: "sig-vintage-pink",
    title: "Vintage Pink Lambeth (15 cm)",
    portions: "6–8 porsjoner",
    basePrice: 480,
    image: "/demo/cakes/cake-1.jpg",
    tag: "Mest Populær",
    sponge: "Madagascar Vanilje Chiffon",
    spongeId: "vanilla",
    filling: "Friske Nordiske Bringebær",
    fillingId: "raspberry",
    frosting: "Rosa Vintage Lambeth",
    frostingId: "pink-buttercream",
    sizeId: "petite",
    description: "Vår mest bestilte bursdagskake. Lett vaniljechiffon med frisk bringebærkompott og vintage rosa rørdekor.",
  },
  {
    id: "sig-valrhona-ganache",
    title: "Midnight Valrhona Ganache (20 cm)",
    portions: "12–16 porsjoner",
    basePrice: 780,
    image: "/demo/cakes/cake-2.jpg",
    tag: "Rik Sjokolade",
    sponge: "Valrhona 70% Mørk Sjokolade",
    spongeId: "chocolate",
    filling: "Pisket Belgisk Sjokoladeganache",
    fillingId: "ganache",
    frosting: "Mørk Sjokoladedrypp",
    frostingId: "chocolate-drip",
    sizeId: "signature",
    description: "Mektig og luksuriøs festkake for voksne selskaper, konfirmasjon og sjokoladeelskere.",
  },
  {
    id: "sig-bento-lunchbox",
    title: "Koreansk Sweet Bento (10 cm)",
    portions: "2–3 porsjoner",
    basePrice: 240,
    image: "/demo/cakes/cake-3.jpg",
    tag: "Bento Box",
    sponge: "Madagascar Vanilje Chiffon",
    spongeId: "vanilla",
    filling: "Salt Fleur de Sel Karamell",
    fillingId: "caramel",
    frosting: "Krittkvit Chantilly Minimal",
    frostingId: "white-chantilly",
    sizeId: "bento",
    description: "Søt minikake i matboks med tre-skje og bursdagslys. Perfekt for par og små oppmerksomheter.",
  },
  {
    id: "sig-grand-romance",
    title: "Two-Tier Grand Romance (2 Etasjer)",
    portions: "24–30 porsjoner",
    basePrice: 1480,
    image: "/demo/cakes/cake-5.jpg",
    tag: "Bryllup & Fest",
    sponge: "Røstet Siciliansk Pistasj",
    spongeId: "pistachio",
    filling: "Pasjonsfrukt & Mango Curd",
    fillingId: "passion",
    frosting: "Hvit Etasje med Roser",
    frostingId: "tiered-roses",
    sizeId: "grand",
    description: "To etasjer levert på kakebrett med støtte. Pyntet med friske hvite roser og bladgull.",
  },
];

// 3. STEP 1: SIZE TIERS (Diagram-based, NOT finished cakes!)
interface CakeSizeTier {
  id: string;
  name: string;
  portions: string;
  diameter: string;
  layers: string;
  basePrice: number;
  popular?: boolean;
  description: string;
  recommendedFor: string;
}

const CAKE_SIZES: CakeSizeTier[] = [
  {
    id: "bento",
    name: "Bento Lunchbox",
    portions: "2–3 porsjoner",
    diameter: "10 cm diameter",
    layers: "2 lag bunn · 1 lag fyll",
    basePrice: 240,
    recommendedFor: "Piknik, parfeiring eller bursdagslunsj",
    description: "Søt lunsjboks-størrelse levert i miljøvennlig bento-eske med tre-skje og bursdagslys.",
  },
  {
    id: "petite",
    name: "Petite Celebration",
    portions: "6–8 porsjoner",
    diameter: "15 cm diameter",
    layers: "3 lag bunn · 2 lag fyll",
    basePrice: 480,
    popular: true,
    recommendedFor: "Standard bursdag, middag med venner",
    description: "Vår mest populære størrelse. Høy profil med rikelig med porsjoner og plass til rørdekor.",
  },
  {
    id: "signature",
    name: "Signature Gateau",
    portions: "12–16 porsjoner",
    diameter: "20 cm diameter",
    layers: "3 lag bunn · 2 lag fyll",
    basePrice: 780,
    recommendedFor: "Dåp, konfirmasjon og storselskaper",
    description: "Bredere profil for større feiringer. Gir et imponerende midtpunkt på kakebordet.",
  },
  {
    id: "grand",
    name: "Two-Tier Grand",
    portions: "24–30 porsjoner",
    diameter: "22 cm + 15 cm",
    layers: "2 etasjer · 6 lag totalt",
    basePrice: 1480,
    recommendedFor: "Bryllup, rund bursdag, firmajubileum",
    description: "To etasjer bygd på solid kakebrett med intern støtte. Skikkelig showstopper for store dager.",
  },
];

// 4. STEP 2: SPONGE BASES
interface SpongeOption {
  id: string;
  name: string;
  colorSwatch: string;
  badge: string;
  notes: string;
}

const SPONGE_OPTIONS: SpongeOption[] = [
  {
    id: "vanilla",
    name: "Madagascar Vanilje Chiffon",
    colorSwatch: "#FFF6E5",
    badge: "Klassiker",
    notes: "Luftig, fuktig og bakt med ekte Madagaskar-burbonvanilje.",
  },
  {
    id: "chocolate",
    name: "Valrhona 70% Mørk Sjokolade",
    colorSwatch: "#4A2E1B",
    badge: "Rik Kakao",
    notes: "Dyp, fløyelsmyk sjokoladebunn med fransk Valrhona kakao.",
  },
  {
    id: "pistachio",
    name: "Røstet Siciliansk Pistasj",
    colorSwatch: "#B8C9A3",
    badge: "Gourmet",
    notes: "Ekte ristede Bronte-pistasjnøtter malt i kakebunnen. Aromatisk og nøttete.",
  },
  {
    id: "red-velvet",
    name: "Red Velvet Kjernemelk",
    colorSwatch: "#8A2232",
    badge: "Populær",
    notes: "Tradisjonell oppskrift med silkemyk tekstur og mild kakaosmak.",
  },
  {
    id: "lemon",
    name: "Frisk Sitron & Valmuefrø",
    colorSwatch: "#FFF1A8",
    badge: "Frisk",
    notes: "Rivet sitronzest og knasende valmuefrø. Lett og syrlig.",
  },
];

// 5. STEP 3: FILLINGS
interface FillingOption {
  id: string;
  name: string;
  colorSwatch: string;
  badge: string;
  notes: string;
}

const FILLING_OPTIONS: FillingOption[] = [
  {
    id: "raspberry",
    name: "Friske Nordiske Bringebær",
    colorSwatch: "#D1345B",
    badge: "Syrlig & Frisk",
    notes: "Hjemmelaget bringebærkompott med hele skogsbær.",
  },
  {
    id: "caramel",
    name: "Salt Fleur de Sel Karamell",
    colorSwatch: "#C68B45",
    badge: "Søt & Salt",
    notes: "Karamell kokt på havsalt og fløte, pisket med mascarpone.",
  },
  {
    id: "ganache",
    name: "Pisket Belgisk Sjokoladeganache",
    colorSwatch: "#3D2314",
    badge: "Sjokolade",
    notes: "Silkemyk og kremete ganache på 64% belgisk sjokolade.",
  },
  {
    id: "passion",
    name: "Pasjonsfrukt & Mango Curd",
    colorSwatch: "#E58F1C",
    badge: "Eksotisk",
    notes: "Frisk curd som gir en herlig tropisk kontrast mot bunnen.",
  },
  {
    id: "mascarpone",
    name: "Vanilje Bean Mascarpone",
    colorSwatch: "#FAF2DD",
    badge: "Silkelett",
    notes: "Italiensk mascarpone pisket med fløte og ekte vaniljefrø.",
  },
];

// 6. STEP 4: FROSTING & DECOR STYLES
interface FrostingOption {
  id: string;
  name: string;
  image: string;
  badge: string;
  styleNotes: string;
}

const FROSTING_OPTIONS: FrostingOption[] = [
  {
    id: "pink-buttercream",
    name: "Rosa Vintage Lambeth (Retro Rørdekor)",
    image: "/demo/cakes/cake-1.jpg",
    badge: "Instagram Hit",
    styleNotes: "Tette rørfolder, hjertebånd og vintage estetikk i pastellrosa og krem.",
  },
  {
    id: "chocolate-drip",
    name: "Mørk Sjokoladedrypp & Ganache",
    image: "/demo/cakes/cake-2.jpg",
    badge: "Klassisk",
    styleNotes: "Glatt sjokoladekrem med rennende mørkt ganachedrypp og ferske bær.",
  },
  {
    id: "white-chantilly",
    name: "Krittkvit Koreansk Bento Minimal",
    image: "/demo/cakes/cake-3.jpg",
    badge: "Minimalistisk",
    styleNotes: "Ren og skarp hvit finish med delikate små perler og enkel estetikk.",
  },
  {
    id: "pistachio-glaze",
    name: "Botanisk Pistasjglasur & Bær",
    image: "/demo/cakes/cake-4.jpg",
    badge: "Botanisk",
    styleNotes: "Lys pistasjgrønn krem toppet med spiselige blomster og ferske bær.",
  },
  {
    id: "tiered-roses",
    name: "Hvit Etasje med Friske Roser",
    image: "/demo/cakes/cake-5.jpg",
    badge: "Bryllup / Fest",
    styleNotes: "Tidløs silkemyk hvit krem pyntet med ekte økologiske roser og bladgull.",
  },
];

// 7. STEP 5: TOPPINGS & EXTRAS
interface ToppingExtra {
  id: string;
  name: string;
  priceDelta: number;
  description: string;
}

const TOPPING_OPTIONS: ToppingExtra[] = [
  {
    id: "lambeth-piping",
    name: "Vintage Lambeth Rørkant",
    priceDelta: 0,
    description: "Klassisk håndsprøytet rørkant i ønsket farge (Inkludert)",
  },
  {
    id: "fresh-berries",
    name: "Friske Norske Sesongbær",
    priceDelta: 0,
    description: "Jordbær, bringebær eller bjørnebær på toppen (Inkludert)",
  },
  {
    id: "gold-leaf",
    name: "24K Spiselig Bladgull & Sukkerperler",
    priceDelta: 50,
    description: "Luksuriøst gullflak og glitrende perler",
  },
  {
    id: "macarons",
    name: "Franske Håndlagde Makroner (4 stk)",
    priceDelta: 80,
    description: "4 ferske makroner plassert elegant på toppen",
  },
];

const PICKUP_TIMES = ["11:00 – 13:00", "13:00 – 15:00", "15:00 – 17:00", "17:00 – 18:30"];

// Minimum notice: 7 full days in advance
const MIN_DAYS_IN_ADVANCE = 7;

export default function PreviewCakesPage() {
  // Navigation / Mode: "custom" (Build Your Own) vs "preset" (Complete Signatures)
  const [orderMode, setOrderMode] = useState<"custom" | "preset">("custom");

  // Step-by-Step Customizer: Step 1 to 6 (Only ONE step shown at a time!)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedSize, setSelectedSize] = useState<CakeSizeTier>(CAKE_SIZES[1]); // Default 15cm Petite
  const [selectedSponge, setSelectedSponge] = useState<SpongeOption>(SPONGE_OPTIONS[0]);
  const [selectedFilling, setSelectedFilling] = useState<FillingOption>(FILLING_OPTIONS[0]);
  const [selectedFrosting, setSelectedFrosting] = useState<FrostingOption>(FROSTING_OPTIONS[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["lambeth-piping"]);
  const [customInscription, setCustomInscription] = useState<string>("Happy 25th Sofia!");
  const [candleCount, setCandleCount] = useState<string>("25");

  // Calendar State (Real Month Calendar)
  // Base date set around current date in Oslo (Oct 2026)
  const [calMonth, setCalMonth] = useState<number>(9); // 0-indexed: 9 = October
  const [calYear, setCalYear] = useState<number>(2026);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    // Default to 10 days from now (October 8th, 2026)
    return new Date(2026, 9, 8);
  });
  const [pickupTime, setPickupTime] = useState<string>(PICKUP_TIMES[1]);
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("pickup");

  // Contact Info
  const [customerName, setCustomerName] = useState<string>("Mathilde V.");
  const [customerPhone, setCustomerPhone] = useState<string>("+47 905 43 210");
  const [customerEmail, setCustomerEmail] = useState<string>("mathilde@oslo.no");
  const [dietaryNotes, setDietaryNotes] = useState<string>("Ingen nøtter i fyllet, takk.");

  // Order Confirmation State
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // Price Calculation
  const toppingsPrice = useMemo(() => {
    return selectedToppings.reduce((acc, id) => {
      const top = TOPPING_OPTIONS.find((t) => t.id === id);
      return acc + (top ? top.priceDelta : 0);
    }, 0);
  }, [selectedToppings]);

  const deliveryPrice = fulfillmentType === "delivery" ? 150 : 0;
  const totalPrice = selectedSize.basePrice + toppingsPrice + deliveryPrice;

  // Toggle Topping Checkbox (id is a string)
  const toggleTopping = (id: string) => {
    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]);
    }
  };

  // Select a preset signature cake and jump directly to Step 6 (Date & Contact)
  const applyPreset = (preset: typeof SIGNATURE_PRESETS[0]) => {
    const size = CAKE_SIZES.find((s) => s.id === preset.sizeId) || CAKE_SIZES[1];
    const sponge = SPONGE_OPTIONS.find((sp) => sp.id === preset.spongeId) || SPONGE_OPTIONS[0];
    const filling = FILLING_OPTIONS.find((f) => f.id === preset.fillingId) || FILLING_OPTIONS[0];
    const frosting = FROSTING_OPTIONS.find((fr) => fr.id === preset.frostingId) || FROSTING_OPTIONS[0];

    setSelectedSize(size);
    setSelectedSponge(sponge);
    setSelectedFilling(filling);
    setSelectedFrosting(frosting);
    setOrderMode("custom");
    setCurrentStep(6);

    const el = document.getElementById("order-builder");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Calendar Calculation Helpers
  const today = useMemo(() => new Date(2026, 8, 28), []); // 28 Sept 2026
  const minAllowedDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + MIN_DAYS_IN_ADVANCE);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [today]);

  const monthNames = [
    "Januar", "Februar", "Mars", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Desember",
  ];

  const daysInMonth = useMemo(() => {
    return new Date(calYear, calMonth + 1, 0).getDate();
  }, [calYear, calMonth]);

  const startDayOfWeek = useMemo(() => {
    // 0 = Sunday, 1 = Monday ... convert to Monday = 0
    const day = new Date(calYear, calMonth, 1).getDay();
    return (day + 6) % 7;
  }, [calYear, calMonth]);

  const handlePrevMonth = () => {
    if (calMonth === 9 && calYear === 2026) return; // Don't go before October 2026
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  const handleDateSelect = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    d.setHours(0, 0, 0, 0);
    if (d < minAllowedDate) return;
    setSelectedDate(d);
  };

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return "Ingen dato valgt";
    const dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
    const dName = dayNames[selectedDate.getDay()];
    const dNum = selectedDate.getDate();
    const mName = monthNames[selectedDate.getMonth()];
    const yNum = selectedDate.getFullYear();
    return `${dName} ${dNum}. ${mName} ${yNum}`;
  }, [selectedDate, monthNames]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Vennligst velg en hentedato i kalenderen.");
      return;
    }
    setIsConfirmed(true);
  };

  const stepTitles = [
    "1. Størrelse & Porsjoner",
    "2. Kakebunn (Sponge)",
    "3. Kremfyll",
    "4. Dekor & Glasur",
    "5. Tekst & Topping",
    "6. Kalender & Kontakt",
  ];

  return (
    <PreviewShell
      nicheTitle="Luffy Cakes Oslo"
      nicheSubtitle="Instagram DM-to-Booking Upgrade · Step-by-Step Customizer &amp; Lookbook"
      accentColor="#FFA8C5"
    >
      <div className="min-h-screen bg-[#FAF7EE] text-[#332F32] font-sans selection:bg-[#FFA8C5] selection:text-[#332F32] overflow-x-hidden">
        {/* =========================================================
            HEADER: CELL-BORDERED GRID BAR (EXACT INSP)
            ========================================================= */}
        <header className="sticky top-0 z-40 bg-[#FAF7EE] border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto flex items-stretch divide-x divide-[#E5E0D5] text-xs font-mono font-bold uppercase tracking-wider text-[#332F32]">
            {/* Cell 1: Logo */}
            <div className="p-3 sm:px-6 flex items-center flex-shrink-0">
              <LuffyCakesLogo />
            </div>

            {/* Cell 2: Galleri */}
            <a
              href="#gallery"
              className="hidden md:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              INSPIRASJONSGALLERI
            </a>

            {/* Cell 3: Bestilling */}
            <a
              href="#order-builder"
              className="hidden md:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              BESTILL KAKE
            </a>

            {/* Cell 4: Hvorfor dette */}
            <a
              href="#comparison"
              className="hidden lg:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              SLIPP DM-KAOSET
            </a>

            {/* Cell 5: Omtaler */}
            <a
              href="#reviews"
              className="hidden lg:flex items-center px-5 hover:bg-[#FFA8C5]/20 transition-colors"
            >
              OMTALER
            </a>

            {/* Cell 6: CTA */}
            <div className="ml-auto flex items-center px-4 sm:px-6">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("order-builder");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 rounded-full bg-[#332F32] text-white hover:bg-black font-mono font-black text-xs uppercase tracking-wider shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Start Bestilling ↓</span>
              </button>
            </div>
          </div>
        </header>

        {/* =========================================================
            HERO: 50/50 SPLIT SCREEN (EXACT LUFFY POP INSP)
            ========================================================= */}
        <section className="border-b border-[#E5E0D5]">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] sm:min-h-[520px]">
            {/* Left 50%: Pink Box */}
            <div className="md:col-span-6 bg-[#FFA8C5] p-8 sm:p-14 lg:p-16 flex flex-col justify-center space-y-6 border-b md:border-b-0 md:border-r border-[#E5E0D5]">
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
                Bygg din egen kake trinn-for-trinn eller velg en ferdig signaturfavoritt. Reserver dato i kalenderen og lås inn bestillingen direkte med Vipps.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#order-builder"
                  className="inline-block px-8 py-3.5 bg-white text-[#332F32] font-mono font-black text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  style={{
                    boxShadow: "6px 6px 0px #FFF59D",
                  }}
                >
                  START BESTILLING ↓
                </a>
                <a
                  href="#gallery"
                  className="inline-block px-6 py-3.5 bg-[#FAF7EE] text-[#332F32] font-mono font-bold text-xs uppercase tracking-wider border border-[#332F32] hover:bg-white transition-colors"
                >
                  SE KAKEGALLERI
                </a>
              </div>
            </div>

            {/* Right 50%: Cream Box with Hero Cake */}
            <div className="md:col-span-6 bg-[#FAF7EE] p-8 sm:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/5] flex items-center justify-center rounded-3xl overflow-hidden shadow-xl border-2 border-[#E5E0D5]">
                <Image
                  src="/demo/cakes/cake-1.jpg"
                  alt="Luffy Pink Lambeth Celebration Cake"
                  fill
                  className="object-cover hover:scale-104 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white font-mono text-[9px] font-black text-[#332F32] uppercase tracking-wider border border-[#332F32] shadow-xs">
                  ● SIGNATUR LAMBETH
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
            SECTION 1: INSPIRASJONSGALLERI & LOOKBOOK
            (Pure showcase of cake examples - NOT the choice menu!)
            ========================================================= */}
        <section id="gallery" className="py-12 sm:py-20 border-b border-[#E5E0D5] bg-[#FAF7EE]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E0D5] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF5983] font-bold block">
                  ● TIDLIGERE KAKEPROSJEKTER
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#332F32] leading-none">
                  INSPIRASJONSGALLERI
                </h2>
                <p className="font-mono text-xs text-[#666] pt-1">
                  Se eksempler på kaker vi har bakt til bursdager, jubileer og feiringer i Oslo.
                </p>
              </div>

              <SunburstSticker
                text="100% HÅNDLAGET I OSLO"
                className="scale-90 sm:scale-100 flex-shrink-0"
                textSize="text-[7.5px]"
              />
            </div>

            {/* 6 High-Res Cake Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-[#E5E0D5] hover:border-[#332F32] transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-md"
                >
                  <div>
                    {/* Cake Photo */}
                    <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7EE]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-white font-mono text-[9px] font-black uppercase border border-[#332F32] shadow-2xs">
                        {item.tag}
                      </div>
                    </div>

                    {/* Cake Details */}
                    <div className="p-5 font-mono space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-[#FF5983] font-bold uppercase">
                        <span>● {item.category}</span>
                        <span className="text-[#666]">{item.portions}</span>
                      </div>
                      <h3 className="font-black text-base text-[#332F32] uppercase tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#555] leading-relaxed pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Link to Customizer */}
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => {
                        const fr = FROSTING_OPTIONS.find((f) => f.id === item.defaultFrostingId);
                        if (fr) setSelectedFrosting(fr);
                        setOrderMode("custom");
                        setCurrentStep(1);
                        const el = document.getElementById("order-builder");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full py-2.5 px-4 rounded-xl border border-[#332F32] bg-[#FAF7EE] hover:bg-[#FFA8C5] text-[#332F32] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>Bruk denne stilen →</span>
                      <FiArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: HOVEDBESTILLING - 2 VEIVALG
            (Bygg Din Egen Kake ELLER Velg Ferdig Signaturkake)
            ========================================================= */}
        <section id="order-builder" className="py-12 sm:py-20 border-b border-[#E5E0D5] bg-[#FAF7EE] scroll-mt-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF5983] font-black block">
                ● 2 MÅTER Å BESTILLE PÅ
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#332F32] leading-tight">
                BESTILL DIN KAKE
              </h2>
              <p className="font-mono text-xs text-[#666] leading-relaxed">
                Bygg kaken fra bunnen av med vår trinn-for-trinn skreddersøm, eller velg en av våre populære ferdige signaturkaker med ett klikk.
              </p>
            </div>

            {/* Two Path Selector Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button
                type="button"
                onClick={() => setOrderMode("custom")}
                className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-mono transition-all cursor-pointer ${
                  orderMode === "custom"
                    ? "border-[#332F32] bg-white shadow-md ring-2 ring-[#FFA8C5]"
                    : "border-[#E5E0D5] bg-[#FAF7EE] opacity-80 hover:opacity-100 hover:border-[#332F32]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFA8C5] text-[#332F32] font-black uppercase">
                    ALTERNATIV 1
                  </span>
                  <span className="text-xs font-bold text-[#FF5983]">Trinn-for-trinn</span>
                </div>
                <h3 className="font-black text-base uppercase text-[#332F32] leading-snug">
                  Bygg Din Egen Kake
                </h3>
                <p className="text-[11px] text-[#666] mt-1">
                  Velg størrelse, kakebunn, fyll, dekorstil og håndskrevet tekst i 5 enkle steg.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setOrderMode("preset")}
                className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-mono transition-all cursor-pointer ${
                  orderMode === "preset"
                    ? "border-[#332F32] bg-white shadow-md ring-2 ring-[#FFA8C5]"
                    : "border-[#E5E0D5] bg-[#FAF7EE] opacity-80 hover:opacity-100 hover:border-[#332F32]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFF59D] text-[#332F32] font-black uppercase">
                    ALTERNATIV 2
                  </span>
                  <span className="text-xs font-bold text-emerald-700">Raskest (1 Klikk)</span>
                </div>
                <h3 className="font-black text-base uppercase text-[#332F32] leading-snug">
                  Ferdige Signaturkaker
                </h3>
                <p className="text-[11px] text-[#666] mt-1">
                  Velg en ferdig favoritt og gå direkte til dato og henting på 30 sekunder.
                </p>
              </button>
            </div>

            {/* =====================================================
                VEI B: FERDIGE SIGNATURKAKER (PRESETS)
                ===================================================== */}
            {orderMode === "preset" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-4"
              >
                <div className="text-center font-mono">
                  <span className="text-xs font-bold text-[#666]">
                    Velg en kake under for å låse inn valget og gå direkte til kalenderen:
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SIGNATURE_PRESETS.map((preset) => (
                    <div
                      key={preset.id}
                      className="bg-white border-2 border-[#332F32] rounded-2xl p-4 flex flex-col justify-between shadow-xs font-mono"
                    >
                      <div className="space-y-3">
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#E5E0D5]">
                          <Image
                            src={preset.image}
                            alt={preset.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#FFF59D] font-mono text-[9px] font-black uppercase border border-[#332F32]">
                            {preset.tag}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[10px] text-[#FF5983] font-black uppercase">
                              ● {preset.portions}
                            </span>
                            <span className="font-black text-lg text-[#332F32]">
                              {preset.basePrice} kr
                            </span>
                          </div>
                          <h4 className="font-black text-sm text-[#332F32] uppercase mt-1">
                            {preset.title}
                          </h4>
                          <p className="text-[11px] text-[#666] mt-2 leading-relaxed">
                            {preset.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-[#E5E0D5]">
                        <button
                          type="button"
                          onClick={() => applyPreset(preset)}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#332F32] hover:bg-black text-white font-mono text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Velg &amp; Gå Til Dato →</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* =====================================================
                VEI A: BYGG DIN EGEN KAKE (STEP-BY-STEP CUSTOMIZER)
                (Shows EXACTLY ONE step at a time!)
                ===================================================== */}
            {orderMode === "custom" && (
              <div className="space-y-6 pt-2">
                {/* Step Progress Bar & Tab Header */}
                <div className="bg-white border-2 border-[#332F32] rounded-2xl p-3 sm:p-4 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5E0D5]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FFA8C5] border border-[#332F32] flex items-center justify-center font-mono font-black text-xs text-[#332F32]">
                        {currentStep}
                      </span>
                      <span className="font-mono font-black text-xs sm:text-sm uppercase text-[#332F32] tracking-wide">
                        Steg {currentStep} av 6: {stepTitles[currentStep - 1].split(". ")[1]}
                      </span>
                    </div>

                    <div className="font-mono text-xs text-right">
                      <span className="text-[#888] block text-[10px] uppercase">Gjeldende Pris:</span>
                      <span className="font-black text-sm sm:text-base text-[#FF5983]">
                        {totalPrice} kr
                      </span>
                    </div>
                  </div>

                  {/* Clickable Step Pills */}
                  <div className="grid grid-cols-6 gap-1 sm:gap-2">
                    {stepTitles.map((title, idx) => {
                      const stepNum = idx + 1;
                      const isCurrent = currentStep === stepNum;
                      const isPast = currentStep > stepNum;
                      return (
                        <button
                          key={stepNum}
                          type="button"
                          onClick={() => setCurrentStep(stepNum)}
                          className={`py-2 px-1 sm:px-2 rounded-lg font-mono text-[9px] sm:text-xs text-center uppercase tracking-wider transition-all cursor-pointer truncate ${
                            isCurrent
                              ? "bg-[#332F32] text-white font-black"
                              : isPast
                              ? "bg-[#FFA8C5]/30 text-[#332F32] font-bold border border-[#FFA8C5]"
                              : "bg-[#FAF7EE] text-[#888] border border-[#E5E0D5]"
                          }`}
                        >
                          <span className="block font-black">{stepNum}</span>
                          <span className="hidden sm:inline text-[9px] opacity-90">
                            {title.split(" ")[1]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* THE ACTIVE STEP CONTAINER (Only ONE step shown at a time!) */}
                <div className="bg-white border-2 border-[#332F32] rounded-3xl p-6 sm:p-8 shadow-md">
                  <AnimatePresence mode="wait">
                    {/* ===================================================
                        STEP 1: STØRRELSE & PORSJONER
                        (Visual tier diagrams, NOT finished cakes!)
                        =================================================== */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 font-mono"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#FF5983] font-black uppercase tracking-widest block">
                            ● STEG 1 AV 6
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#332F32]">
                            Velg Størrelse &amp; Porsjoner
                          </h3>
                          <p className="text-xs text-[#666]">
                            Alle størrelser leveres med solid kakebrett og håndlaget eske. Prisen inkluderer kakebunn, fyll og dekor.
                          </p>
                        </div>

                        {/* 4 Clean Size Option Cards with SVG Diagrams */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {CAKE_SIZES.map((tier) => {
                            const isSelected = selectedSize.id === tier.id;
                            return (
                              <div
                                key={tier.id}
                                onClick={() => setSelectedSize(tier)}
                                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                                  isSelected
                                    ? "border-[#332F32] bg-[#FFA8C5]/20 ring-2 ring-[#332F32] shadow-sm"
                                    : "border-[#E5E0D5] bg-[#FAF7EE] hover:border-[#332F32] hover:bg-white"
                                }`}
                              >
                                <div className="space-y-3">
                                  {/* Visual Diagram Representation (NOT photo of finished cake) */}
                                  <div className="w-full aspect-video rounded-xl bg-white border border-[#E5E0D5] flex flex-col items-center justify-center p-3 relative">
                                    {tier.popular && (
                                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#FFF59D] text-[#332F32] text-[8px] font-black uppercase border border-[#332F32]">
                                        MEST POPULÆR
                                      </span>
                                    )}

                                    {/* SVG Tier Silhouette */}
                                    <div className="flex flex-col items-center justify-center gap-1">
                                      {tier.id === "grand" && (
                                        <div className="w-12 h-4 rounded-sm bg-[#FFA8C5] border border-[#332F32]" />
                                      )}
                                      <div
                                        className={`rounded-sm bg-[#332F32] ${
                                          tier.id === "bento"
                                            ? "w-10 h-6"
                                            : tier.id === "petite"
                                            ? "w-14 h-8"
                                            : tier.id === "signature"
                                            ? "w-20 h-8"
                                            : "w-22 h-7"
                                        }`}
                                      />
                                      <div className="w-24 h-1 bg-[#E5E0D5] rounded-full" />
                                    </div>
                                    <span className="text-[9px] text-[#666] font-bold mt-2">
                                      {tier.diameter}
                                    </span>
                                  </div>

                                  {/* Info */}
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] text-[#FF5983] font-black uppercase">
                                        ● {tier.portions}
                                      </span>
                                      <span className="font-black text-base text-[#332F32]">
                                        {tier.basePrice} kr
                                      </span>
                                    </div>

                                    <h4 className="font-black text-sm text-[#332F32] uppercase">
                                      {tier.name}
                                    </h4>

                                    <span className="text-[10px] text-[#888] block">
                                      {tier.layers}
                                    </span>

                                    <p className="text-[11px] text-[#555] leading-relaxed pt-2 border-t border-[#E5E0D5]">
                                      {tier.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="pt-4 mt-3 border-t border-[#E5E0D5] flex items-center justify-between text-xs font-bold">
                                  <span className={isSelected ? "text-[#332F32]" : "text-[#888]"}>
                                    {isSelected ? "Valgt Størrelse ✓" : "Velg Størrelse"}
                                  </span>
                                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                                    isSelected ? "bg-[#332F32] text-white border-[#332F32]" : "bg-white text-transparent border-[#888]"
                                  }`}>
                                    ✓
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Navigation Footer */}
                        <div className="pt-6 border-t border-[#E5E0D5] flex justify-end">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="px-6 py-3 rounded-xl bg-[#332F32] hover:bg-black text-white font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                          >
                            <span>Neste Steg: Kakebunn →</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ===================================================
                        STEP 2: KAKEBUNN (SPONGE)
                        =================================================== */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 font-mono"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#FF5983] font-black uppercase tracking-widest block">
                            ● STEG 2 AV 6
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#332F32]">
                            Velg Kakebunn (Sponge)
                          </h3>
                          <p className="text-xs text-[#666]">
                            Alle kakebunner bakes fra bunnen på bestillingsdagen med økologiske egg og ferskt meierismør.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {SPONGE_OPTIONS.map((sponge) => {
                            const isSelected = selectedSponge.id === sponge.id;
                            return (
                              <div
                                key={sponge.id}
                                onClick={() => setSelectedSponge(sponge)}
                                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                                  isSelected
                                    ? "border-[#332F32] bg-[#FFA8C5]/20 ring-2 ring-[#332F32] shadow-xs"
                                    : "border-[#E5E0D5] bg-[#FAF7EE] hover:border-[#332F32] hover:bg-white"
                                }`}
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                      <div
                                        className="w-6 h-6 rounded-full border border-[#332F32] shadow-2xs"
                                        style={{ backgroundColor: sponge.colorSwatch }}
                                      />
                                      <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#332F32] font-black uppercase border border-[#332F32]">
                                        {sponge.badge}
                                      </span>
                                    </div>
                                    {isSelected && (
                                      <span className="w-5 h-5 rounded-full bg-[#332F32] text-white flex items-center justify-center text-[10px]">
                                        ✓
                                      </span>
                                    )}
                                  </div>

                                  <div>
                                    <h4 className="font-black text-sm text-[#332F32] uppercase">
                                      {sponge.name}
                                    </h4>
                                    <p className="text-xs text-[#555] mt-1.5 leading-relaxed">
                                      {sponge.notes}
                                    </p>
                                  </div>
                                </div>

                                <div className="pt-3 mt-3 border-t border-[#E5E0D5] text-[10px] font-bold text-[#888]">
                                  {isSelected ? "Valgt bunn ✓" : "Klikk for å velge"}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Navigation Footer */}
                        <div className="pt-6 border-t border-[#E5E0D5] flex justify-between items-center">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="px-5 py-3 rounded-xl border border-[#332F32] text-[#332F32] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:bg-[#FAF7EE]"
                          >
                            <span>← Tilbake: Størrelse</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="px-6 py-3 rounded-xl bg-[#332F32] hover:bg-black text-white font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                          >
                            <span>Neste Steg: Kremfyll →</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ===================================================
                        STEP 3: KREMFYLL (FILLING)
                        =================================================== */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 font-mono"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#FF5983] font-black uppercase tracking-widest block">
                            ● STEG 3 AV 6
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#332F32]">
                            Velg Kremfyll
                          </h3>
                          <p className="text-xs text-[#666]">
                            Fyllet legges raust mellom lagene for å gi perfekt balanse mellom fuktighet, sødme og syrlighet.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {FILLING_OPTIONS.map((filling) => {
                            const isSelected = selectedFilling.id === filling.id;
                            return (
                              <div
                                key={filling.id}
                                onClick={() => setSelectedFilling(filling)}
                                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                                  isSelected
                                    ? "border-[#332F32] bg-[#FFA8C5]/20 ring-2 ring-[#332F32] shadow-xs"
                                    : "border-[#E5E0D5] bg-[#FAF7EE] hover:border-[#332F32] hover:bg-white"
                                }`}
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                      <div
                                        className="w-6 h-6 rounded-full border border-[#332F32] shadow-2xs"
                                        style={{ backgroundColor: filling.colorSwatch }}
                                      />
                                      <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#332F32] font-black uppercase border border-[#332F32]">
                                        {filling.badge}
                                      </span>
                                    </div>
                                    {isSelected && (
                                      <span className="w-5 h-5 rounded-full bg-[#332F32] text-white flex items-center justify-center text-[10px]">
                                        ✓
                                      </span>
                                    )}
                                  </div>

                                  <div>
                                    <h4 className="font-black text-sm text-[#332F32] uppercase">
                                      {filling.name}
                                    </h4>
                                    <p className="text-xs text-[#555] mt-1.5 leading-relaxed">
                                      {filling.notes}
                                    </p>
                                  </div>
                                </div>

                                <div className="pt-3 mt-3 border-t border-[#E5E0D5] text-[10px] font-bold text-[#888]">
                                  {isSelected ? "Valgt fyll ✓" : "Klikk for å velge"}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Navigation Footer */}
                        <div className="pt-6 border-t border-[#E5E0D5] flex justify-between items-center">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="px-5 py-3 rounded-xl border border-[#332F32] text-[#332F32] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:bg-[#FAF7EE]"
                          >
                            <span>← Tilbake: Kakebunn</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(4)}
                            className="px-6 py-3 rounded-xl bg-[#332F32] hover:bg-black text-white font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                          >
                            <span>Neste Steg: Dekor &amp; Glasur →</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ===================================================
                        STEP 4: DEKOR & GLASUR (FROSTING STYLE)
                        (Visual options with photos of the style)
                        =================================================== */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 font-mono"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#FF5983] font-black uppercase tracking-widest block">
                            ● STEG 4 AV 6
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#332F32]">
                            Velg Kakedekor &amp; Glasurstil
                          </h3>
                          <p className="text-xs text-[#666]">
                            Dette bestemmer det visuelle uttrykket på utsiden av kaken din. Bildet viser den ferdige stilen.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {FROSTING_OPTIONS.map((frosting) => {
                            const isSelected = selectedFrosting.id === frosting.id;
                            return (
                              <div
                                key={frosting.id}
                                onClick={() => setSelectedFrosting(frosting)}
                                className={`rounded-2xl border-2 overflow-hidden transition-all cursor-pointer flex flex-col justify-between group ${
                                  isSelected
                                    ? "border-[#332F32] bg-white ring-2 ring-[#FFA8C5] shadow-md"
                                    : "border-[#E5E0D5] bg-[#FAF7EE] hover:border-[#332F32] hover:bg-white"
                                }`}
                              >
                                <div>
                                  {/* Style Photo Preview */}
                                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7EE]">
                                    <Image
                                      src={frosting.image}
                                      alt={frosting.name}
                                      fill
                                      className="object-cover group-hover:scale-104 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-white font-mono text-[9px] font-black uppercase border border-[#332F32]">
                                      {frosting.badge}
                                    </div>
                                    {isSelected && (
                                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-[#332F32] text-white text-[10px] font-black uppercase">
                                        VALGT ✓
                                      </div>
                                    )}
                                  </div>

                                  <div className="p-4 space-y-1.5">
                                    <h4 className="font-black text-sm text-[#332F32] uppercase">
                                      {frosting.name}
                                    </h4>
                                    <p className="text-xs text-[#555] leading-relaxed">
                                      {frosting.styleNotes}
                                    </p>
                                  </div>
                                </div>

                                <div className="p-4 pt-0">
                                  <div className={`py-2 px-3 rounded-xl border text-center text-xs font-bold ${
                                    isSelected
                                      ? "bg-[#FFA8C5] text-[#332F32] border-[#332F32]"
                                      : "bg-[#FAF7EE] text-[#666] border-[#E5E0D5]"
                                  }`}>
                                    {isSelected ? "Valgt dekorstil ✓" : "Velg denne stilen"}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Navigation Footer */}
                        <div className="pt-6 border-t border-[#E5E0D5] flex justify-between items-center">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="px-5 py-3 rounded-xl border border-[#332F32] text-[#332F32] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:bg-[#FAF7EE]"
                          >
                            <span>← Tilbake: Kremfyll</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(5)}
                            className="px-6 py-3 rounded-xl bg-[#332F32] hover:bg-black text-white font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                          >
                            <span>Neste Steg: Tekst &amp; Topping →</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ===================================================
                        STEP 5: TEKST & TOPPING / EKSTRA
                        =================================================== */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step-5"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 font-mono"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#FF5983] font-black uppercase tracking-widest block">
                            ● STEG 5 AV 6
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#332F32]">
                            Personlig Tekst &amp; Ekstra Toppings
                          </h3>
                          <p className="text-xs text-[#666]">
                            Gjør kaken unik med håndskrevet rørtekst, bursdagslys og håndlagde oppgraderinger.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left: Inscription & Candles */}
                          <div className="p-5 rounded-2xl bg-[#FAF7EE] border border-[#E5E0D5] space-y-4">
                            <div>
                              <label className="text-[11px] font-black uppercase text-[#332F32] block mb-1.5">
                                Håndskrevet Tekst på Kaken (Valgfritt):
                              </label>
                              <input
                                type="text"
                                value={customInscription}
                                onChange={(e) => setCustomInscription(e.target.value)}
                                placeholder='f.eks. "Happy 25th Sofia!"'
                                className="w-full p-3 rounded-xl border border-[#332F32] bg-white text-[#332F32] font-bold text-xs"
                              />
                              <span className="text-[10px] text-[#777] block mt-1">
                                Skrives for hånd med konditorsprøyte i farge som matcher stilen.
                              </span>
                            </div>

                            <div>
                              <label className="text-[11px] font-black uppercase text-[#332F32] block mb-1.5">
                                Antall Bursdagslys (Inkludert):
                              </label>
                              <div className="grid grid-cols-4 gap-2">
                                {["0 lys", "1 lys", "18 lys", "25 lys"].map((c) => (
                                  <button
                                    key={c}
                                    type="button"
                                    onClick={() => setCandleCount(c)}
                                    className={`py-2 text-center rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                                      candleCount === c
                                        ? "bg-[#332F32] text-white border-[#332F32]"
                                        : "bg-white text-[#555] border-[#E5E0D5] hover:border-[#332F32]"
                                    }`}
                                  >
                                    {c}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right: Extras & Upgrades */}
                          <div className="p-5 rounded-2xl bg-[#FAF7EE] border border-[#E5E0D5] space-y-3">
                            <label className="text-[11px] font-black uppercase text-[#332F32] block">
                              Ekstra Toppings &amp; Pynt:
                            </label>

                            <div className="space-y-2">
                              {TOPPING_OPTIONS.map((top) => {
                                const isChecked = selectedToppings.includes(top.id);
                                return (
                                  <div
                                    key={top.id}
                                    onClick={() => toggleTopping(top.id)}
                                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                      isChecked
                                        ? "bg-white border-[#332F32] shadow-2xs"
                                        : "bg-white/60 border-[#E5E0D5] hover:bg-white"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {}}
                                        className="w-4 h-4 accent-[#332F32] rounded"
                                      />
                                      <div>
                                        <span className="font-bold text-xs text-[#332F32] block">
                                          {top.name}
                                        </span>
                                        <span className="text-[10px] text-[#777]">
                                          {top.description}
                                        </span>
                                      </div>
                                    </div>

                                    <span className="font-black text-xs text-[#FF5983]">
                                      {top.priceDelta > 0 ? `+${top.priceDelta} kr` : "Inkludert"}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Navigation Footer */}
                        <div className="pt-6 border-t border-[#E5E0D5] flex justify-between items-center">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(4)}
                            className="px-5 py-3 rounded-xl border border-[#332F32] text-[#332F32] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:bg-[#FAF7EE]"
                          >
                            <span>← Tilbake: Dekor</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(6)}
                            className="px-6 py-3 rounded-xl bg-[#332F32] hover:bg-black text-white font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                          >
                            <span>Neste: Kalender &amp; Reservasjon →</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ===================================================
                        STEP 6: KALENDER & RESERVASJON
                        (Locked-in Product Card + Real Interactive Calendar)
                        =================================================== */}
                    {currentStep === 6 && (
                      <motion.div
                        key="step-6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-8 font-mono text-xs"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#FF5983] font-black uppercase tracking-widest block">
                            ● SISTE STEG (6 AV 6)
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#332F32]">
                            Lås Inn Kake &amp; Reserver Dato
                          </h3>
                          <p className="text-xs text-[#666]">
                            Se din sammensatte kake under, velg ønsket dato i kalenderen (minst 7 dager i forveien) og bekreft med Vipps.
                          </p>
                        </div>

                        {!isConfirmed ? (
                          <form onSubmit={handleBookingSubmit} className="space-y-6">
                            {/* =================================================
                                1. LÅST PRODUKTOPPSUMMERING-KORT MED BILDE
                                ================================================= */}
                            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7EE] border-2 border-[#332F32] shadow-sm space-y-4">
                              <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D5]">
                                <div>
                                  <span className="text-[9px] px-2 py-0.5 rounded bg-white text-[#332F32] font-black uppercase border border-[#332F32]">
                                    LÅST KAKEDESIGN
                                  </span>
                                  <h4 className="font-black text-base sm:text-lg text-[#332F32] uppercase mt-1">
                                    {selectedSize.name} ({selectedSize.portions})
                                  </h4>
                                </div>

                                <div className="text-right">
                                  <span className="text-[10px] text-[#666] block uppercase">Totalpris:</span>
                                  <span className="font-black text-xl sm:text-2xl text-[#FF5983]">
                                    {totalPrice} kr
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                                {/* Thumbnail of Finished Product */}
                                <div className="md:col-span-4 relative aspect-square rounded-xl overflow-hidden border-2 border-[#332F32] bg-white shadow-2xs">
                                  <Image
                                    src={selectedFrosting.image}
                                    alt="Ferdig kakedesign"
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-white/95 text-[9px] font-bold text-center border border-[#E5E0D5] truncate">
                                    {selectedFrosting.name.split(" (")[0]}
                                  </div>
                                </div>

                                {/* Selections Breakdown Grid */}
                                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                                  <div className="p-2.5 rounded-lg bg-white border border-[#E5E0D5]">
                                    <span className="text-[9px] uppercase text-[#888] font-bold block">
                                      Kakebunn:
                                    </span>
                                    <span className="font-bold text-[#332F32]">
                                      {selectedSponge.name}
                                    </span>
                                  </div>

                                  <div className="p-2.5 rounded-lg bg-white border border-[#E5E0D5]">
                                    <span className="text-[9px] uppercase text-[#888] font-bold block">
                                      Kremfyll:
                                    </span>
                                    <span className="font-bold text-[#332F32]">
                                      {selectedFilling.name}
                                    </span>
                                  </div>

                                  <div className="p-2.5 rounded-lg bg-white border border-[#E5E0D5]">
                                    <span className="text-[9px] uppercase text-[#888] font-bold block">
                                      Dekorstil:
                                    </span>
                                    <span className="font-bold text-[#332F32]">
                                      {selectedFrosting.name}
                                    </span>
                                  </div>

                                  <div className="p-2.5 rounded-lg bg-white border border-[#E5E0D5]">
                                    <span className="text-[9px] uppercase text-[#888] font-bold block">
                                      Piped Tekst:
                                    </span>
                                    <span className="font-bold text-[#332F32] italic">
                                      &ldquo;{customInscription || "Ingen tekst"}&rdquo; ({candleCount})
                                    </span>
                                  </div>

                                  {/* Quick edit button to return to builder steps */}
                                  <div className="sm:col-span-2 pt-1 flex justify-between items-center text-[10px]">
                                    <span className="text-[#666]">
                                      Vil du gjøre endringer på kaken før bestilling?
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setCurrentStep(1)}
                                      className="text-[#332F32] font-black underline hover:text-[#FF5983] cursor-pointer"
                                    >
                                      Endre kakedetaljer ↺
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* =================================================
                                2. INTERAKTIV MÅNEDSKALENDER (1 UKE I FORVEIEN)
                                ================================================= */}
                            <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#332F32] shadow-xs space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E0D5]">
                                <div>
                                  <span className="text-[10px] text-[#FF5983] font-black uppercase tracking-wider block">
                                    ● 1-UKES REGEL FOR HÅNDLAGET BAKST
                                  </span>
                                  <h4 className="font-black text-sm uppercase text-[#332F32]">
                                    Velg Hentedato i Kalenderen
                                  </h4>
                                </div>

                                <div className="px-3 py-1 bg-[#FFF59D] text-[#332F32] font-mono text-[9px] font-black uppercase border border-[#332F32] inline-block">
                                  MINIMUM 7 DAGERS VARSEL
                                </div>
                              </div>

                              <p className="text-[11px] text-[#666] leading-relaxed">
                                Bakeriet vårt håndlager alt ferskt. Bestillinger krever minimum 7 dagers forhåndsvarsel for å sikre råvarer og dekorering. Grå datoer er utilgjengelige.
                              </p>

                              {/* Calendar Header with Month Navigation */}
                              <div className="flex items-center justify-between bg-[#FAF7EE] p-3 rounded-xl border border-[#E5E0D5]">
                                <button
                                  type="button"
                                  onClick={handlePrevMonth}
                                  disabled={calMonth === 9 && calYear === 2026}
                                  className="p-1.5 rounded-lg border border-[#332F32] bg-white text-[#332F32] hover:bg-[#FFA8C5] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                >
                                  <FiChevronLeft size={16} />
                                </button>

                                <span className="font-black text-sm uppercase text-[#332F32]">
                                  {monthNames[calMonth]} {calYear}
                                </span>

                                <button
                                  type="button"
                                  onClick={handleNextMonth}
                                  className="p-1.5 rounded-lg border border-[#332F32] bg-white text-[#332F32] hover:bg-[#FFA8C5] cursor-pointer"
                                >
                                  <FiChevronRight size={16} />
                                </button>
                              </div>

                              {/* Day Headers (Man – Søn) */}
                              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-[#777] uppercase py-1">
                                <div>Man</div>
                                <div>Tir</div>
                                <div>Ons</div>
                                <div>Tor</div>
                                <div>Fre</div>
                                <div>Lør</div>
                                <div>Søn</div>
                              </div>

                              {/* Calendar Days Matrix */}
                              <div className="grid grid-cols-7 gap-1.5">
                                {/* Blank cells before start of month */}
                                {Array.from({ length: startDayOfWeek }).map((_, i) => (
                                  <div key={`blank-${i}`} className="p-2" />
                                ))}

                                {/* Actual month days */}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                  const dayNum = i + 1;
                                  const cellDate = new Date(calYear, calMonth, dayNum);
                                  cellDate.setHours(0, 0, 0, 0);

                                  const isAllowed = cellDate >= minAllowedDate;
                                  const isSelected =
                                    selectedDate &&
                                    selectedDate.getDate() === dayNum &&
                                    selectedDate.getMonth() === calMonth &&
                                    selectedDate.getFullYear() === calYear;

                                  return (
                                    <button
                                      key={`day-${dayNum}`}
                                      type="button"
                                      disabled={!isAllowed}
                                      onClick={() => handleDateSelect(dayNum)}
                                      className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all ${
                                        isSelected
                                          ? "bg-[#332F32] text-white border-[#332F32] font-black shadow-xs ring-2 ring-[#FFA8C5]"
                                          : isAllowed
                                          ? "bg-[#FAF7EE] border-[#E5E0D5] text-[#332F32] font-bold hover:bg-[#FFA8C5]/30 hover:border-[#332F32] cursor-pointer"
                                          : "bg-stone-100 border-stone-200 text-stone-400 opacity-40 cursor-not-allowed line-through"
                                      }`}
                                    >
                                      <span className="text-xs block">{dayNum}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Selected Date Indicator Banner */}
                              <div className="p-3 rounded-xl bg-[#FAF7EE] border border-[#332F32] flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div>
                                  <span className="text-[9px] uppercase text-[#777] font-bold block">
                                    Valgt Hentedato:
                                  </span>
                                  <span className="font-black text-sm text-[#332F32]">
                                    {formattedSelectedDate}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-bold">
                                  <FiCheck size={14} />
                                  <span>Oppfyller 7 dagers forhåndsvarsel</span>
                                </div>
                              </div>

                              {/* Time Slots */}
                              <div className="space-y-2 pt-2">
                                <label className="text-[10px] uppercase font-bold text-[#332F32] block">
                                  Velg Hentetidspunkt:
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                  {PICKUP_TIMES.map((time) => {
                                    const isSelected = pickupTime === time;
                                    return (
                                      <button
                                        key={time}
                                        type="button"
                                        onClick={() => setPickupTime(time)}
                                        className={`p-2.5 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                                          isSelected
                                            ? "border-[#332F32] bg-[#FFA8C5] text-[#332F32] font-black shadow-2xs"
                                            : "border-[#E5E0D5] bg-[#FAF7EE] text-[#555] hover:border-[#332F32]"
                                        }`}
                                      >
                                        {time}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* =================================================
                                3. LEVERINGSMÅTE & KONTAKTOPPLYSNINGER
                                ================================================= */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Fulfillment */}
                              <div className="p-5 rounded-2xl bg-white border border-[#E5E0D5] space-y-3">
                                <label className="text-[11px] font-black uppercase text-[#332F32] block">
                                  Henting eller Budlevering:
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setFulfillmentType("pickup")}
                                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                                      fulfillmentType === "pickup"
                                        ? "bg-[#FFA8C5] border-[#332F32] text-[#332F32] shadow-2xs"
                                        : "border-[#E5E0D5] bg-[#FAF7EE] text-[#666]"
                                    }`}
                                  >
                                    Hentes på Grünerløkka (Gratis)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFulfillmentType("delivery")}
                                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                                      fulfillmentType === "delivery"
                                        ? "bg-[#FFA8C5] border-[#332F32] text-[#332F32] shadow-2xs"
                                        : "border-[#E5E0D5] bg-[#FAF7EE] text-[#666]"
                                    }`}
                                  >
                                    Budlevering i Oslo (+150 kr)
                                  </button>
                                </div>
                                <span className="text-[10px] text-[#777] block">
                                  {fulfillmentType === "pickup"
                                    ? "Adresse: Markveien 32, 0554 Oslo. Kaken pakkes i støtsikker eske."
                                    : "Kjøretillegg på 150 kr inkluderes i totalprisen."}
                                </span>
                              </div>

                              {/* Allergies / Special Notes */}
                              <div className="p-5 rounded-2xl bg-white border border-[#E5E0D5] space-y-2">
                                <label className="text-[11px] font-black uppercase text-[#332F32] block">
                                  Allergier &amp; Spesielle Merknader:
                                </label>
                                <textarea
                                  rows={2}
                                  value={dietaryNotes}
                                  onChange={(e) => setDietaryNotes(e.target.value)}
                                  placeholder="f.eks. Nøtteallergi, glutenredusert kakebunn..."
                                  className="w-full p-2.5 rounded-xl border border-[#E5E0D5] bg-[#FAF7EE] text-[#332F32] text-xs"
                                />
                                <span className="text-[10px] text-[#777] block">
                                  Oppgi alvorlige allergier så tilpasser vi produksjonen.
                                </span>
                              </div>
                            </div>

                            {/* Contact Inputs */}
                            <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#332F32] space-y-4">
                              <label className="text-[11px] font-black uppercase tracking-wider text-[#332F32] block">
                                Kontaktperson for Vipps-krav &amp; Hente-SMS
                              </label>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                  <label className="text-[10px] text-[#666] block mb-1">Ditt Navn</label>
                                  <input
                                    type="text"
                                    required
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Mathilde V."
                                    className="w-full p-3 rounded-xl border border-[#E5E0D5] bg-[#FAF7EE] text-[#332F32] font-bold text-xs"
                                  />
                                </div>

                                <div>
                                  <label className="text-[10px] text-[#666] block mb-1">Mobil for Vipps &amp; SMS</label>
                                  <input
                                    type="tel"
                                    required
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="+47 905 43 210"
                                    className="w-full p-3 rounded-xl border border-[#E5E0D5] bg-[#FAF7EE] text-[#332F32] font-bold text-xs"
                                  />
                                </div>

                                <div>
                                  <label className="text-[10px] text-[#666] block mb-1">E-post for Bekreftelse</label>
                                  <input
                                    type="email"
                                    required
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    placeholder="mathilde@oslo.no"
                                    className="w-full p-3 rounded-xl border border-[#E5E0D5] bg-[#FAF7EE] text-[#332F32] font-bold text-xs"
                                  />
                                </div>
                              </div>

                              {/* Submit Button */}
                              <div className="pt-2">
                                <button
                                  type="submit"
                                  className="w-full py-4 px-6 rounded-2xl bg-[#332F32] hover:bg-black text-white font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                >
                                  <span>RESERVER KAKE NÅ · {totalPrice} KR MED VIPPS</span>
                                  <FiArrowRight size={16} />
                                </button>
                              </div>
                            </div>
                          </form>
                        ) : (
                          /* =================================================
                              DIGITAL RESERVASJONSPASS (CONFIRMED)
                              ================================================= */
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 sm:p-8 rounded-3xl border-2 border-[#332F32] bg-white space-y-6 shadow-xl"
                          >
                            <div className="flex justify-between items-start border-b border-[#E5E0D5] pb-4">
                              <div className="flex items-center gap-3">
                                <LuffyCakesLogo className="w-10 h-10" />
                                <div>
                                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black uppercase inline-block mb-1">
                                    ● RESERVASJON BEKREFTET
                                  </span>
                                  <h3 className="text-lg font-black text-[#332F32] uppercase">
                                    Luffy Cakes Bestillingsbevis
                                  </h3>
                                  <span className="text-[#666] text-xs">Bestiller: {customerName}</span>
                                </div>
                              </div>
                              <span className="text-2xl font-black text-[#FF5983]">
                                {totalPrice} kr
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                              <div className="md:col-span-4 relative aspect-square rounded-2xl overflow-hidden border-2 border-[#332F32]">
                                <Image
                                  src={selectedFrosting.image}
                                  alt="Reservert kake"
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div>
                                  <span className="text-[10px] text-[#888] uppercase block">Kakestørrelse:</span>
                                  <span className="font-bold text-[#332F32]">
                                    {selectedSize.name} ({selectedSize.portions})
                                  </span>
                                </div>

                                <div>
                                  <span className="text-[10px] text-[#888] uppercase block">Dato &amp; Tid:</span>
                                  <span className="font-bold text-[#332F32]">
                                    {formattedSelectedDate} kl. {pickupTime}
                                  </span>
                                </div>

                                <div>
                                  <span className="text-[10px] text-[#888] uppercase block">Smaksprofil:</span>
                                  <span className="font-bold text-[#332F32]">
                                    {selectedSponge.name} med {selectedFilling.name.toLowerCase()}
                                  </span>
                                </div>

                                <div>
                                  <span className="text-[10px] text-[#888] uppercase block">Dekor &amp; Tekst:</span>
                                  <span className="font-bold text-[#332F32]">
                                    {selectedFrosting.name.split(" (")[0]} &middot; &ldquo;{customInscription}&rdquo;
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 rounded-xl border border-[#E5E0D5] bg-[#FAF7EE] flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                              <span className="text-[#555]">
                                {fulfillmentType === "delivery"
                                  ? "Levering: Budlevering i Oslo (+150 kr inkludert)"
                                  : "Henting: Markveien 32, Grünerløkka, 0554 Oslo"}
                              </span>
                              <span className="font-black text-[#332F32]">
                                Ordre #LC-{Date.now().toString().slice(-4)}
                              </span>
                            </div>

                            <div className="pt-2 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                              <span className="text-[#666]">
                                Vipps-krav og hente-SMS er sendt til {customerPhone}
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsConfirmed(false)}
                                className="text-[#332F32] underline font-bold hover:opacity-75 cursor-pointer text-left"
                              >
                                Endre bestilling
                              </button>
                            </div>

                            {/* Dev Agency Pitch Banner */}
                            <div className="pt-4 border-t border-[#E5E0D5] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFA8C5]/20 p-4 rounded-2xl">
                              <div className="text-xs">
                                <span className="font-black text-[#332F32] block">
                                  Vil du ha et slikt bookingsystem for ditt bakeri?
                                </span>
                                <span className="text-[#555]">
                                  Jeg bygger tilpassede nettsider som fjerner DM-kaoset for bakere i Oslo.
                                </span>
                              </div>
                              <Link
                                href="/contact?package=booking-drop"
                                className="px-4 py-2 rounded-xl bg-[#332F32] text-white font-mono text-xs font-black uppercase hover:bg-black transition-colors whitespace-nowrap"
                              >
                                Få et uforpliktende tilbud →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            SECTION 3: INSTAGRAM PROBLEM vs SOLUTION COMPARISON
            (Why Oslo bakers ditch the DMs for this page)
            ========================================================= */}
        <section id="comparison" className="py-12 sm:py-16 border-b border-[#E5E0D5] bg-[#FAF7EE]">
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
                  <li>• Kalenderen krever 7 dagers forhåndsvarsel automatisk.</li>
                  <li>• Både du og kunden får ferdig digital kvittering med Vipps.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: REVIEWS
            ========================================================= */}
        <section id="reviews" className="py-12 sm:py-20 border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF5983] font-bold block">
                  ● KUNDEOPPLEVELSER
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#332F32]">
                  Hva Kundene Sier
                </h2>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={16} fill="currentColor" />
                ))}
                <span className="font-mono text-xs font-black text-[#332F32] ml-2">5.0 / 5.0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-6 bg-white border border-[#E5E0D5] rounded-2xl space-y-3">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#332F32] leading-relaxed font-bold">
                  &ldquo;Bursdagskaken til datteren min var helt spektakulær! Så utrolig deilig å kunne bestille alt på nettsiden med nøyaktig smaksprofil og tekst i stedet for å vente i timevis på svar i DM.&rdquo;
                </p>
                <div className="text-[10px] text-[#666] pt-2 border-t border-[#E5E0D5]">
                  — Ingrid H., Grünerløkka
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E5E0D5] rounded-2xl space-y-3">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#332F32] leading-relaxed font-bold">
                  &ldquo;Bestilte en bento-kake til kjæresten min. Valgte vanilje og salt karamell. Både utseendet og smaken var 10/10. Kommer garantert tilbake!&rdquo;
                </p>
                <div className="text-[10px] text-[#666] pt-2 border-t border-[#E5E0D5]">
                  — Jonas K., Majorstuen
                </div>
              </div>

              <div className="p-6 bg-white border border-[#E5E0D5] rounded-2xl space-y-3">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#332F32] leading-relaxed font-bold">
                  &ldquo;Lambeth-kaken var et kunstverk på dessertbordet i konfirmasjonen. Håndskriften var nydelig og gjestene snakket om kaken i flere dager.&rdquo;
                </p>
                <div className="text-[10px] text-[#666] pt-2 border-t border-[#E5E0D5]">
                  — Camilla &amp; Fredrik, Frogner
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: FOOTER
            ========================================================= */}
        <footer className="py-12 bg-[#FAF7EE] border-t border-[#E5E0D5] font-mono text-xs text-[#332F32]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <LuffyCakesLogo />
              <p className="text-[11px] text-[#666] leading-relaxed">
                Håndlagde kaker i Oslo. Bakt på bestilling med lokale råvarer og vintage Lambeth-estetikk.
              </p>
            </div>

            <div>
              <span className="font-black text-xs uppercase block mb-2">Henting &amp; Verksted</span>
              <p className="text-[11px] text-[#666] leading-relaxed">
                Markveien 32<br />
                0554 Grünerløkka, Oslo<br />
                Torsdag – Søndag: 11:00 – 18:30
              </p>
            </div>

            <div>
              <span className="font-black text-xs uppercase block mb-2">Bestillingsregler</span>
              <p className="text-[11px] text-[#666] leading-relaxed">
                Minimum 7 dagers forhåndsvarsel.<br />
                Vipps-bekreftelse ved bestilling.<br />
                Avbestilling senest 4 dager før.
              </p>
            </div>

            <div>
              <span className="font-black text-xs uppercase block mb-2">Nettside Utviklet Av</span>
              <p className="text-[11px] text-[#666] leading-relaxed">
                A.Gure · Freelance Web Developer i Oslo.<br />
                <a href="mailto:hello@agure.space" className="underline hover:text-[#FF5983]">
                  hello@agure.space
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PreviewShell>
  );
}
