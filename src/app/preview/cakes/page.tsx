"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiArrowRight,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiHeart,
  FiRefreshCw,
  FiPhone,
  FiMail,
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

// ==========================================
// BESPOKE FLATICON-STYLE SVG VECTOR ICONS
// Clean, colorful, high-detail culinary vectors
// ==========================================

// 1. SIZES ICONS
function BentoBoxIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="8" y="14" width="32" height="24" rx="4" fill="#FAF7EE" stroke="#332F32" strokeWidth="2" />
      <path d="M8 22H40" stroke="#FFA8C5" strokeWidth="3" />
      <rect x="14" y="26" width="20" height="8" rx="2" fill="#FFA8C5" stroke="#332F32" strokeWidth="1.5" />
      <circle cx="24" cy="30" r="2" fill="#FFF59D" />
      <path d="M18 10L24 14L30 10" stroke="#332F32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PetiteCakeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="12" y="22" width="24" height="16" rx="3" fill="#FAF7EE" stroke="#332F32" strokeWidth="2" />
      <path d="M12 26Q18 30 24 26Q30 30 36 26" fill="#FFA8C5" stroke="#332F32" strokeWidth="1.5" />
      <line x1="24" y1="22" x2="24" y2="12" stroke="#332F32" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="9" r="2.5" fill="#FFF59D" stroke="#332F32" strokeWidth="1.5" />
      <circle cx="16" cy="34" r="1.5" fill="#FF5983" />
      <circle cx="24" cy="34" r="1.5" fill="#FF5983" />
      <circle cx="32" cy="34" r="1.5" fill="#FF5983" />
    </svg>
  );
}

function SignatureGateauIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="8" y="20" width="32" height="18" rx="3" fill="#FAF7EE" stroke="#332F32" strokeWidth="2" />
      <path d="M8 24C12 28 16 22 20 26C24 30 28 22 32 26C36 30 40 24 40 24" fill="#3D2314" stroke="#332F32" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3" fill="#D1345B" stroke="#332F32" strokeWidth="1.5" />
      <circle cx="24" cy="15" r="3" fill="#D1345B" stroke="#332F32" strokeWidth="1.5" />
      <circle cx="32" cy="16" r="3" fill="#D1345B" stroke="#332F32" strokeWidth="1.5" />
      <path d="M16 13C16 10 18 8 20 8" stroke="#332F32" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TwoTierGrandIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="8" y="26" width="32" height="14" rx="2" fill="#FAF7EE" stroke="#332F32" strokeWidth="2" />
      <rect x="14" y="14" width="20" height="12" rx="2" fill="#FFA8C5" stroke="#332F32" strokeWidth="2" />
      <circle cx="24" cy="10" r="3" fill="#FFF59D" stroke="#332F32" strokeWidth="1.5" />
      <path d="M8 29Q16 32 24 29Q32 32 40 29" stroke="#FFA8C5" strokeWidth="2" fill="none" />
      <circle cx="24" cy="6" r="1.5" fill="#D1345B" />
    </svg>
  );
}

// 2. SPONGE INGREDIENT ICONS
function VanillaFlowerIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 4C18 9 24 10 24 14C24 18 19 20 16 20C13 20 8 18 8 14C8 10 14 9 16 4Z" fill="#FFF6E5" stroke="#332F32" strokeWidth="1.5" />
      <circle cx="16" cy="14" r="3" fill="#FFF59D" stroke="#332F32" strokeWidth="1.5" />
      <path d="M16 20C16 26 12 28 8 30" stroke="#332F32" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 20C20 25 24 28 28 29" stroke="#332F32" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CocoaChocolateIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect x="6" y="8" width="20" height="16" rx="2" fill="#4A2E1B" stroke="#332F32" strokeWidth="1.5" />
      <line x1="16" y1="8" x2="16" y2="24" stroke="#FAF7EE" strokeWidth="1.5" />
      <line x1="6" y1="16" x2="26" y2="16" stroke="#FAF7EE" strokeWidth="1.5" />
      <circle cx="23" cy="23" r="3" fill="#8A2232" stroke="#332F32" strokeWidth="1" />
    </svg>
  );
}

function PistachioNutIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 6C9 6 6 12 6 18C6 24 11 26 16 26C21 26 26 24 26 18C26 12 23 6 16 6Z" fill="#FAF7EE" stroke="#332F32" strokeWidth="1.5" />
      <ellipse cx="16" cy="17" rx="5" ry="7" fill="#B8C9A3" stroke="#332F32" strokeWidth="1.5" />
      <path d="M16 10V24" stroke="#8EA873" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RedVelvetHeartIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 27L6 17C3 14 3 9 7 6C11 3 14 5 16 9C18 5 21 3 25 6C29 9 29 14 26 17L16 27Z" fill="#8A2232" stroke="#332F32" strokeWidth="1.5" />
      <path d="M10 13Q16 17 22 13" stroke="#FAF7EE" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LemonCitrusIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="10" fill="#FFF1A8" stroke="#332F32" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="7" fill="#FFF59D" />
      <line x1="16" y1="9" x2="16" y2="23" stroke="#332F32" strokeWidth="1" />
      <line x1="9" y1="16" x2="23" y2="16" stroke="#332F32" strokeWidth="1" />
      <circle cx="19" cy="12" r="0.75" fill="#332F32" />
      <circle cx="13" cy="20" r="0.75" fill="#332F32" />
    </svg>
  );
}

// 3. FILLING ICONS
function RaspberryFruitIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="14" r="3.5" fill="#D1345B" stroke="#332F32" strokeWidth="1" />
      <circle cx="12" cy="18" r="3.5" fill="#D1345B" stroke="#332F32" strokeWidth="1" />
      <circle cx="20" cy="18" r="3.5" fill="#D1345B" stroke="#332F32" strokeWidth="1" />
      <circle cx="16" cy="22" r="3.5" fill="#D1345B" stroke="#332F32" strokeWidth="1" />
      <path d="M16 10V6M16 6C13 6 12 8 12 8M16 6C19 6 20 8 20 8" stroke="#332F32" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SaltCaramelSwirlIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 6C22 6 26 11 26 17C26 23 21 26 16 26C11 26 6 22 6 16C6 10 11 8 16 8C20 8 22 11 22 15C22 18 19 20 16 20C13 20 12 18 12 16" stroke="#C68B45" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="20" y="8" width="3" height="3" rx="0.5" fill="#FAF7EE" stroke="#332F32" strokeWidth="1" />
      <rect x="8" y="20" width="3" height="3" rx="0.5" fill="#FAF7EE" stroke="#332F32" strokeWidth="1" />
    </svg>
  );
}

function GanacheChocolateIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 6C16 6 24 14 24 19C24 23.5 20.5 26 16 26C11.5 26 8 23.5 8 19C8 14 16 6 16 6Z" fill="#3D2314" stroke="#332F32" strokeWidth="1.5" />
      <path d="M12 18Q16 22 20 18" stroke="#FAF7EE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PassionCurdIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="10" fill="#E58F1C" stroke="#332F32" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="7" fill="#FFA8C5" />
      <circle cx="14" cy="14" r="1" fill="#332F32" />
      <circle cx="18" cy="14" r="1" fill="#332F32" />
      <circle cx="16" cy="18" r="1" fill="#332F32" />
      <circle cx="13" cy="17" r="1" fill="#332F32" />
    </svg>
  );
}

function MascarponeCreamIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 6C19 6 22 9 22 13C24 14 26 16 26 19C26 23 22 25 16 25C10 25 6 23 6 19C6 16 8 14 10 13C10 9 13 6 16 6Z" fill="#FAF2DD" stroke="#332F32" strokeWidth="1.5" />
      <circle cx="14" cy="15" r="0.75" fill="#332F32" />
      <circle cx="18" cy="17" r="0.75" fill="#332F32" />
      <circle cx="16" cy="20" r="0.75" fill="#332F32" />
    </svg>
  );
}

// 4. TOPPING ICONS
function GoldSparklesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 4L18.5 12.5L27 15L18.5 17.5L16 26L13.5 17.5L5 15L13.5 12.5L16 4Z" fill="#FFF59D" stroke="#332F32" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="24" cy="8" r="2" fill="#FFA8C5" />
      <circle cx="8" cy="24" r="2" fill="#FFA8C5" />
    </svg>
  );
}

function FrenchMacaronIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect x="7" y="10" width="18" height="6" rx="3" fill="#FFA8C5" stroke="#332F32" strokeWidth="1.5" />
      <rect x="7" y="18" width="18" height="6" rx="3" fill="#FFA8C5" stroke="#332F32" strokeWidth="1.5" />
      <line x1="8" y1="16" x2="24" y2="16" stroke="#FAF7EE" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ==========================================
// 1. CAROUSEL DATA (100% Real Celebration Cakes)
// ==========================================
const GALLERY_CAKES = [
  {
    id: "vintage-lambeth",
    title: "Vintage Heart Lambeth",
    portions: "6–8 porsjoner · 15 cm",
    image: "/demo/cakes/cake-1.jpg",
    tag: "Retro Hit",
    description: "Hjerteformet kake med klassisk rørdekor, rysjekanter og perler i vintage pastellrosa.",
    presetFrostingId: "pink-buttercream",
  },
  {
    id: "dark-ganache",
    title: "Midnight Valrhona Ganache",
    portions: "12–16 porsjoner · 20 cm",
    image: "/demo/cakes/cake-2.jpg",
    tag: "Mørk Kakao",
    description: "70% Valrhona sjokoladebunn toppet med fløyelsmyk rennende ganache og ferske bær.",
    presetFrostingId: "chocolate-drip",
  },
  {
    id: "korean-bento",
    title: "Sweet Bento Box Heart",
    portions: "2–3 porsjoner · 10 cm",
    image: "/demo/cakes/cake-3.jpg",
    tag: "Koreansk Bento",
    description: "Søt minikake levert i bento-eske med personlig håndskrift, tre-skje og bursdagslys.",
    presetFrostingId: "white-chantilly",
  },
  {
    id: "pistachio-botanical",
    title: "Siciliansk Pistasj & Bær",
    portions: "6–8 porsjoner · 15 cm",
    image: "/demo/cakes/cake-4.jpg",
    tag: "Sesongfavoritt",
    description: "Røstede Bronte-pistasjnøtter malt i kakebunnen med frisk mascarponekrem og bær.",
    presetFrostingId: "pistachio-glaze",
  },
  {
    id: "tiered-wedding",
    title: "Two-Tier Grand Romance",
    portions: "24–30 porsjoner · 2 etasjer",
    image: "/demo/cakes/cake-5.jpg",
    tag: "Bryllup & Fest",
    description: "To etasjer bygd på kakebrett med støtte, silkemyk finish og ekte friske roser.",
    presetFrostingId: "tiered-roses",
  },
];

// ==========================================
// 2. FERDIGE SIGNATURKAKER
// ==========================================
const SIGNATURE_PRESETS = [
  {
    id: "sig-vintage-pink",
    title: "Vintage Pink Lambeth",
    portions: "6–8 porsjoner · 15 cm",
    basePrice: 480,
    image: "/demo/cakes/cake-1.jpg",
    tag: "Mest Populær",
    sizeId: "petite",
    spongeId: "vanilla",
    spongeName: "Madagascar Vanilje",
    fillingId: "raspberry",
    fillingName: "Nordiske Bringebær",
    frostingId: "pink-buttercream",
    frostingName: "Rosa Vintage Lambeth",
  },
  {
    id: "sig-valrhona-ganache",
    title: "Midnight Valrhona Ganache",
    portions: "12–16 porsjoner · 20 cm",
    basePrice: 780,
    image: "/demo/cakes/cake-2.jpg",
    tag: "Rik Kakao",
    sizeId: "signature",
    spongeId: "chocolate",
    spongeName: "Valrhona 70% Kakao",
    fillingId: "ganache",
    fillingName: "Belgisk Ganache",
    frostingId: "chocolate-drip",
    frostingName: "Mørk Sjokoladedrypp",
  },
  {
    id: "sig-bento-lunchbox",
    title: "Koreansk Sweet Bento",
    portions: "2–3 porsjoner · 10 cm",
    basePrice: 240,
    image: "/demo/cakes/cake-3.jpg",
    tag: "Bento Box",
    sizeId: "bento",
    spongeId: "vanilla",
    spongeName: "Madagascar Vanilje",
    fillingId: "caramel",
    fillingName: "Salt Karamell",
    frostingId: "white-chantilly",
    frostingName: "Krittkvit Chantilly",
  },
  {
    id: "sig-grand-romance",
    title: "Two-Tier Grand Romance",
    portions: "24–30 porsjoner · 2 etasjer",
    basePrice: 1480,
    image: "/demo/cakes/cake-5.jpg",
    tag: "Bryllup & Fest",
    sizeId: "grand",
    spongeId: "pistachio",
    spongeName: "Siciliansk Pistasj",
    fillingId: "passion",
    fillingName: "Pasjonsfrukt Curd",
    frostingId: "tiered-roses",
    frostingName: "Hvit Etasje med Roser",
  },
];

// ==========================================
// 3. STEP OPTIONS WITH BESPOKE FLATICON VECTORS
// ==========================================
interface CakeSizeTier {
  id: string;
  name: string;
  portions: string;
  diameter: string;
  basePrice: number;
  popular?: boolean;
  IconComponent: React.ComponentType<{ className?: string }>;
}

const CAKE_SIZES: CakeSizeTier[] = [
  { id: "bento", name: "Bento Lunchbox", portions: "2–3 pers", diameter: "10 cm", basePrice: 240, IconComponent: BentoBoxIcon },
  { id: "petite", name: "Petite Celebration", portions: "6–8 pers", diameter: "15 cm", basePrice: 480, popular: true, IconComponent: PetiteCakeIcon },
  { id: "signature", name: "Signature Gateau", portions: "12–16 pers", diameter: "20 cm", basePrice: 780, IconComponent: SignatureGateauIcon },
  { id: "grand", name: "Two-Tier Grand", portions: "24–30 pers", diameter: "22cm + 15cm", basePrice: 1480, IconComponent: TwoTierGrandIcon },
];

const SPONGE_OPTIONS = [
  { id: "vanilla", name: "Madagascar Vanilje", swatch: "#FFF6E5", note: "Luftig bourbon-chiffon", IconComponent: VanillaFlowerIcon },
  { id: "chocolate", name: "Valrhona 70% Kakao", swatch: "#4A2E1B", note: "Mørk og saftig fransk kakao", IconComponent: CocoaChocolateIcon },
  { id: "pistachio", name: "Røstet Pistasj", swatch: "#B8C9A3", note: "Siciliansk nøttebunn", IconComponent: PistachioNutIcon },
  { id: "red-velvet", name: "Red Velvet", swatch: "#8A2232", note: "Klassisk silkemyk sørstat", IconComponent: RedVelvetHeartIcon },
  { id: "lemon", name: "Sitron & Valmue", swatch: "#FFF1A8", note: "Frisk sitronzest og frø", IconComponent: LemonCitrusIcon },
];

const FILLING_OPTIONS = [
  { id: "raspberry", name: "Nordiske Bringebær", swatch: "#D1345B", note: "Syrlig skogsbærkompott", IconComponent: RaspberryFruitIcon },
  { id: "caramel", name: "Salt Karamell", swatch: "#C68B45", note: "Fleur de sel og mascarpone", IconComponent: SaltCaramelSwirlIcon },
  { id: "ganache", name: "Mørk Sjokoladeganache", swatch: "#3D2314", note: "64% belgisk sjokolade", IconComponent: GanacheChocolateIcon },
  { id: "passion", name: "Pasjonsfrukt Curd", swatch: "#E58F1C", note: "Frisk og eksotisk syre", IconComponent: PassionCurdIcon },
  { id: "mascarpone", name: "Vanilje Mascarpone", swatch: "#FAF2DD", note: "Silkelett italiensk krem", IconComponent: MascarponeCreamIcon },
];

const FROSTING_OPTIONS = [
  {
    id: "pink-buttercream",
    name: "Rosa Vintage Lambeth",
    image: "/demo/cakes/cake-1.jpg",
    note: "Rik retro rørdekor og perler",
  },
  {
    id: "chocolate-drip",
    name: "Mørk Sjokoladedrypp",
    image: "/demo/cakes/cake-2.jpg",
    note: "Glatt krem med mørk ganachedrypp",
  },
  {
    id: "white-chantilly",
    name: "Krittkvit Bento Minimal",
    image: "/demo/cakes/cake-3.jpg",
    note: "Ren hvit finish og perler",
  },
  {
    id: "pistachio-glaze",
    name: "Botanisk Pistasj & Bær",
    image: "/demo/cakes/cake-4.jpg",
    note: "Lys pistasjkrem og markbær",
  },
  {
    id: "tiered-roses",
    name: "Hvit Etasje med Roser",
    image: "/demo/cakes/cake-5.jpg",
    note: "To etasjer med ekte roser",
  },
];

const TOPPING_OPTIONS = [
  { id: "gold-leaf", name: "24K Spiselig Bladgull", priceDelta: 50, IconComponent: GoldSparklesIcon },
  { id: "macarons", name: "Franske Makroner (4 stk)", priceDelta: 80, IconComponent: FrenchMacaronIcon },
];

const PICKUP_TIMES = ["11:00 – 13:00", "13:00 – 15:00", "15:00 – 17:00", "17:00 – 18:30"];
const MIN_DAYS_IN_ADVANCE = 7;

export default function PreviewCakesPage() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Active Section Tracker for Scroll-and-Lock Nav
  const [activeSection, setActiveSection] = useState<"hero" | "gallery" | "studio" | "comparison" | "reviews">("hero");

  // Ordering Mode: "custom" (Builder) vs "preset" (1-Click)
  const [orderMode, setOrderMode] = useState<"custom" | "preset">("custom");

  // Step state: 1 to 6
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedSize, setSelectedSize] = useState<CakeSizeTier>(CAKE_SIZES[1]); // Default 15cm Petite
  const [selectedSponge, setSelectedSponge] = useState(SPONGE_OPTIONS[0]);
  const [selectedFilling, setSelectedFilling] = useState(FILLING_OPTIONS[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTING_OPTIONS[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [customInscription, setCustomInscription] = useState<string>("Happy 25th Sofia!");
  const [candleCount, setCandleCount] = useState<string>("25 lys");

  // Calendar State (1-Week in advance)
  const [calMonth, setCalMonth] = useState<number>(9); // 9 = October
  const [calYear, setCalYear] = useState<number>(2026);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => new Date(2026, 9, 8));
  const [pickupTime, setPickupTime] = useState<string>(PICKUP_TIMES[1]);
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("pickup");

  // Customer Contact Info
  const [customerName, setCustomerName] = useState<string>("Mathilde V.");
  const [customerPhone, setCustomerPhone] = useState<string>("+47 905 43 210");
  const [customerEmail, setCustomerEmail] = useState<string>("mathilde@oslo.no");
  const [dietaryNotes, setDietaryNotes] = useState<string>("Ingen nøtter i fyllet, takk.");

  // Order Confirmed State
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // Total price
  const toppingsTotal = useMemo(() => {
    return selectedToppings.reduce((acc, id) => {
      const top = TOPPING_OPTIONS.find((t) => t.id === id);
      return acc + (top ? top.priceDelta : 0);
    }, 0);
  }, [selectedToppings]);

  const deliveryPrice = fulfillmentType === "delivery" ? 150 : 0;
  const totalPrice = selectedSize.basePrice + toppingsTotal + deliveryPrice;

  // Scroll Spy for Changing Sticky Nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 130;
      const heroEl = document.getElementById("hero");
      const galleryEl = document.getElementById("gallery");
      const studioEl = document.getElementById("order-studio");
      const comparisonEl = document.getElementById("comparison");
      const reviewsEl = document.getElementById("reviews");

      if (reviewsEl && scrollPos >= reviewsEl.offsetTop) {
        setActiveSection("reviews");
      } else if (comparisonEl && scrollPos >= comparisonEl.offsetTop) {
        setActiveSection("comparison");
      } else if (studioEl && scrollPos >= studioEl.offsetTop) {
        setActiveSection("studio");
      } else if (galleryEl && scrollPos >= galleryEl.offsetTop) {
        setActiveSection("gallery");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel Scroll Controls
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmt = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmt : scrollAmt,
        behavior: "smooth",
      });
    }
  };

  const toggleTopping = (id: string) => {
    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]);
    }
  };

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

    const el = document.getElementById("order-studio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Calendar Logic
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

  const daysInMonth = useMemo(() => new Date(calYear, calMonth + 1, 0).getDate(), [calYear, calMonth]);
  const startDayOfWeek = useMemo(() => {
    const day = new Date(calYear, calMonth, 1).getDay();
    return (day + 6) % 7; // Monday = 0
  }, [calYear, calMonth]);

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return "Velg en dato i kalenderen";
    const dayNames = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];
    const dName = dayNames[selectedDate.getDay()];
    const dNum = selectedDate.getDate();
    const mName = monthNames[selectedDate.getMonth()];
    return `${dName} ${dNum}. ${mName} ${selectedDate.getFullYear()}`;
  }, [selectedDate, monthNames]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Vennligst velg en dato i kalenderen.");
      return;
    }
    setIsConfirmed(true);
  };

  const stepLabels = ["Størrelse", "Kakebunn", "Kremfyll", "Dekorstil", "Tekst & Ekstra", "Bestilling"];

  return (
    <PreviewShell
      nicheTitle="Luffy Cakes Oslo"
      nicheSubtitle="Instagram DM-to-Booking Upgrade · Fast Compact Studio &amp; Lookbook"
      accentColor="#FFA8C5"
    >
      <div className="min-h-screen bg-[#FAF7EE] text-[#332F32] font-sans selection:bg-[#FFA8C5] selection:text-[#332F32] overflow-x-hidden">
        {/* =========================================================
            HEADER: DYNAMIC SCROLL-AND-LOCK CHANGING NAV BAR
            ========================================================= */}
        <header className="sticky top-0 z-40 bg-[#FAF7EE]/95 backdrop-blur-md border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#332F32] h-14 px-3 sm:px-6">
            {/* Logo: Always Locked Pinned On Left */}
            <div className="flex items-center flex-shrink-0 pr-4 border-r border-[#E5E0D5]">
              <LuffyCakesLogo />
            </div>

            {/* Dynamic Center & Right Section Indicator with Scroll Lock */}
            <div className="flex-1 flex items-center justify-between pl-4 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeSection === "hero" && (
                  <motion.div
                    key="hero-nav"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="hidden md:flex items-center gap-6 text-[#555]">
                      <a href="#gallery" className="hover:text-[#332F32] transition-colors">
                        LOOKBOOK
                      </a>
                      <a href="#order-studio" className="hover:text-[#332F32] transition-colors">
                        BESTILL KAKE
                      </a>
                      <a href="#comparison" className="hover:text-[#332F32] transition-colors">
                        SLIPP DM
                      </a>
                      <a href="#reviews" className="hover:text-[#332F32] transition-colors">
                        OMTALER
                      </a>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById("order-studio");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#332F32] text-white hover:bg-black font-black text-xs uppercase tracking-wider shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Start Bestilling ↓</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeSection === "gallery" && (
                  <motion.div
                    key="gallery-nav"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF5983] animate-pulse" />
                      <span className="font-black text-[#332F32] text-xs uppercase truncate">
                        LOOKBOOK · 5 KAKESTILER
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("order-studio");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#FFA8C5] text-[#332F32] border border-[#332F32] font-black text-[11px] uppercase tracking-wider hover:bg-[#FF9EBC] cursor-pointer"
                    >
                      Gå Til Kakebygger ↓
                    </button>
                  </motion.div>
                )}

                {activeSection === "studio" && (
                  <motion.div
                    key="studio-nav"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#332F32]" />
                      <span className="font-black text-[#332F32] text-xs uppercase truncate">
                        KAKEBYGGER · STEG {currentStep}/6: {stepLabels[currentStep - 1]}
                      </span>
                      <span className="hidden lg:inline text-[10px] text-[#666]">
                        ({selectedSize.name})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#FFF59D] text-[#332F32] font-black text-xs border border-[#332F32]">
                        {totalPrice} kr
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(6)}
                        className="px-3 py-1.5 rounded-full bg-[#332F32] text-white font-black text-[11px] uppercase tracking-wider hover:bg-black cursor-pointer"
                      >
                        Til Kassen →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeSection === "comparison" && (
                  <motion.div
                    key="comparison-nav"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span className="font-black text-[#332F32] text-xs uppercase truncate">
                        SLIPP DM-KAOSET · FOR BRANSJEN
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("order-studio");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#332F32] text-white font-black text-[11px] uppercase tracking-wider hover:bg-black cursor-pointer"
                    >
                      Reserver Kake ↓
                    </button>
                  </motion.div>
                )}

                {activeSection === "reviews" && (
                  <motion.div
                    key="reviews-nav"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-black text-[#332F32] text-xs uppercase truncate">
                        KUNDEOMTALER · 5.0 / 5.0 ★
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("order-studio");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#FFA8C5] text-[#332F32] border border-[#332F32] font-black text-xs uppercase tracking-wider hover:bg-[#FF9EBC] cursor-pointer"
                    >
                      Reserver Kake ↓
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* =========================================================
            HERO: PUNCHY 50/50 SPLIT
            ========================================================= */}
        <section id="hero" className="border-b border-[#E5E0D5]">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px] sm:min-h-[440px]">
            {/* Left Pink Hero */}
            <div className="md:col-span-6 bg-[#FFA8C5] p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-3.5 border-b md:border-b-0 md:border-r border-[#E5E0D5]">
              <div className="inline-flex">
                <span className="px-2.5 py-0.5 bg-white text-[#332F32] font-mono text-[9px] font-black uppercase tracking-widest border border-[#332F32]">
                  SLIPP DM-KAOSET PÅ INSTAGRAM
                </span>
              </div>

              <div className="space-y-0.5">
                <h1 className="text-4xl sm:text-5xl font-black uppercase text-[#332F32] tracking-tighter leading-[0.92]">
                  LUFFY CAKES
                </h1>
                <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#332F32]/90 pt-2 leading-relaxed">
                  Design kaken din i 5 raske steg eller velg en signaturkake. Lås inn dato i kalenderen og bekreft med Vipps.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#order-studio"
                  className="px-6 py-3 bg-white text-[#332F32] font-mono font-black text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  style={{ boxShadow: "4px 4px 0px #FFF59D" }}
                >
                  BESTILL KAKE NÅ ↓
                </a>
                <a
                  href="#gallery"
                  className="px-5 py-3 bg-[#FAF7EE] text-[#332F32] font-mono font-bold text-xs uppercase tracking-wider border border-[#332F32] hover:bg-white transition-colors"
                >
                  SE LOOKBOOK
                </a>
              </div>
            </div>

            {/* Right Cream Canvas with Featured Lambeth Cake */}
            <div className="md:col-span-6 bg-[#FAF7EE] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-2 border-[#E5E0D5]">
                <Image
                  src="/demo/cakes/cake-1.jpg"
                  alt="Vintage Lambeth Heart Cake"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-white font-mono text-[9px] font-black text-[#332F32] uppercase border border-[#332F32]">
                  ● SIGNATUR LAMBETH
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-xs font-mono text-xs flex justify-between items-center border border-[#E5E0D5] rounded-xl">
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
            SECTION 1: INSPIRASJON CAROUSEL (SWIPEABLE LOOKBOOK)
            ========================================================= */}
        <section id="gallery" className="py-10 sm:py-12 border-b border-[#E5E0D5] bg-[#FAF7EE]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF5983] font-bold block">
                  ● KAKESTILER &amp; LOOKBOOK
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#332F32]">
                  Inspirasjonsgalleri
                </h2>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  aria-label="Previous cake"
                  className="w-9 h-9 rounded-full border-2 border-[#332F32] bg-white hover:bg-[#FFA8C5] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  aria-label="Next cake"
                  className="w-9 h-9 rounded-full border-2 border-[#332F32] bg-white hover:bg-[#FFA8C5] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Horizontal Swipeable Track */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {GALLERY_CAKES.map((cake) => (
                <div
                  key={cake.id}
                  className="snap-start w-[260px] sm:w-[280px] flex-shrink-0 bg-white border-2 border-[#332F32] rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow font-mono"
                >
                  <div>
                    <div className="relative aspect-square w-full bg-[#FAF7EE]">
                      <Image
                        src={cake.image}
                        alt={cake.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white font-mono text-[9px] font-black uppercase border border-[#332F32]">
                        {cake.tag}
                      </div>
                    </div>

                    <div className="p-3.5 space-y-1">
                      <span className="text-[10px] text-[#FF5983] font-bold block uppercase">
                        ● {cake.portions}
                      </span>
                      <h3 className="font-black text-sm text-[#332F32] uppercase">
                        {cake.title}
                      </h3>
                      <p className="text-[11px] text-[#666] leading-relaxed">
                        {cake.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 pt-0">
                    <button
                      type="button"
                      onClick={() => {
                        const fr = FROSTING_OPTIONS.find((f) => f.id === cake.presetFrostingId);
                        if (fr) setSelectedFrosting(fr);
                        setOrderMode("custom");
                        setCurrentStep(4);
                        const el = document.getElementById("order-studio");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full py-2 px-3 rounded-xl border border-[#332F32] bg-[#FAF7EE] hover:bg-[#FFA8C5] text-[#332F32] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>Bruk stil i kakebygger →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: BESTILLINGS-STUDIO (WITH BESPOKE FLATICON ICONS)
            ========================================================= */}
        <section id="order-studio" className="py-10 sm:py-12 border-b border-[#E5E0D5] bg-[#FAF7EE] scroll-mt-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-5">
            {/* Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E0D5] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF5983] font-bold block">
                  ● BESTILLINGS-STUDIO
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#332F32]">
                  Sett Sammen Kake
                </h2>
              </div>

              {/* Mode Toggle Pills */}
              <div className="inline-flex rounded-xl border-2 border-[#332F32] bg-white p-1 font-mono text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setOrderMode("custom")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    orderMode === "custom" ? "bg-[#332F32] text-white" : "text-[#555] hover:text-[#332F32]"
                  }`}
                >
                  Bygg Kake (Trinn-for-trinn)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderMode("preset")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    orderMode === "preset" ? "bg-[#FFA8C5] text-[#332F32]" : "text-[#555] hover:text-[#332F32]"
                  }`}
                >
                  Signaturkaker (1 Klikk)
                </button>
              </div>
            </div>

            {/* VEI B: FERDIGE SIGNATURKAKER */}
            {orderMode === "preset" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 font-mono">
                {SIGNATURE_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    className="p-3.5 bg-white border-2 border-[#332F32] rounded-2xl flex flex-col justify-between shadow-2xs space-y-3"
                  >
                    <div>
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#E5E0D5] mb-2">
                        <Image src={preset.image} alt={preset.title} fill className="object-cover" />
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#FFF59D] text-[9px] font-black uppercase border border-[#332F32]">
                          {preset.tag}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] text-[#FF5983] font-black uppercase">● {preset.portions}</span>
                        <span className="font-black text-[#332F32]">{preset.basePrice} kr</span>
                      </div>
                      <h3 className="font-black text-sm text-[#332F32] uppercase mt-1">{preset.title}</h3>
                      <p className="text-[11px] text-[#666] mt-1 leading-relaxed">
                        {preset.spongeName} med {preset.fillingName.toLowerCase()}.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#332F32] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Velg &amp; Gå Til Dato →
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* VEI A: BYGG DIN EGEN KAKE (HIGH-DENSITY GRID CONSOLE WITH BESPOKE FLATICON VECTORS) */}
            {orderMode === "custom" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start font-mono">
                {/* Left Side: Option Selector & Step Nav (lg:col-span-7) */}
                <div className="lg:col-span-7 space-y-3.5">
                  {/* Step Pills Bar */}
                  <div className="grid grid-cols-6 gap-1 bg-white p-1.5 rounded-2xl border-2 border-[#332F32]">
                    {stepLabels.map((lbl, idx) => {
                      const num = idx + 1;
                      const isActive = currentStep === num;
                      const isDone = currentStep > num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setCurrentStep(num)}
                          className={`py-1.5 px-1 text-center rounded-xl transition-all cursor-pointer truncate ${
                            isActive
                              ? "bg-[#332F32] text-white font-black"
                              : isDone
                              ? "bg-[#FFA8C5]/30 text-[#332F32] font-bold"
                              : "text-[#888] hover:text-[#332F32]"
                          }`}
                        >
                          <span className="block text-xs font-black">{num}</span>
                          <span className="hidden sm:inline text-[9px] uppercase">{lbl}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ACTIVE STEP PANEL */}
                  <div className="bg-white border-2 border-[#332F32] rounded-3xl p-4 sm:p-5 shadow-sm">
                    {/* STEP 1: STØRRELSE (WITH BESPOKE FLATICON ICONS) */}
                    {currentStep === 1 && (
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-2">
                          <span className="font-black text-sm uppercase text-[#332F32]">
                            Steg 1 · Velg Kakestørrelse
                          </span>
                          <span className="text-[10px] text-[#666]">Inkludert kakebrett &amp; eske</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {CAKE_SIZES.map((tier) => {
                            const isSel = selectedSize.id === tier.id;
                            const IconComponent = tier.IconComponent;
                            return (
                              <div
                                key={tier.id}
                                onClick={() => setSelectedSize(tier)}
                                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${
                                  isSel
                                    ? "border-[#332F32] bg-[#FFA8C5]/20 ring-2 ring-[#332F32]"
                                    : "border-[#E5E0D5] bg-[#FAF7EE] hover:border-[#332F32]"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-white border border-[#332F32] flex items-center justify-center flex-shrink-0 shadow-2xs">
                                    <IconComponent className="w-7 h-7" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-black text-xs uppercase text-[#332F32]">{tier.name}</span>
                                      {tier.popular && (
                                        <span className="px-1.5 py-0.5 rounded bg-[#FFF59D] text-[8px] font-black uppercase border border-[#332F32]">
                                          Populær
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[11px] text-[#FF5983] font-bold block mt-0.5">
                                      {tier.portions} · {tier.diameter}
                                    </span>
                                  </div>
                                </div>
                                <span className="font-black text-sm text-[#332F32]">{tier.basePrice} kr</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: BUNN (WITH BESPOKE FLATICON SPONGE ICONS) */}
                    {currentStep === 2 && (
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-2">
                          <span className="font-black text-sm uppercase text-[#332F32]">
                            Steg 2 · Velg Kakebunn (Sponge)
                          </span>
                          <span className="text-[10px] text-[#666]">Bakes ferskt på bestillingsdagen</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {SPONGE_OPTIONS.map((sp) => {
                            const isSel = selectedSponge.id === sp.id;
                            const IconComp = sp.IconComponent;
                            return (
                              <div
                                key={sp.id}
                                onClick={() => setSelectedSponge(sp)}
                                className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                  isSel
                                    ? "border-[#332F32] bg-[#FFA8C5]/20 ring-2 ring-[#332F32]"
                                    : "border-[#E5E0D5] bg-[#FAF7EE] hover:border-[#332F32]"
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className="w-8 h-8 rounded-lg border border-[#332F32] flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: sp.swatch }}
                                  >
                                    <IconComp className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <span className="font-black text-xs text-[#332F32] block">{sp.name}</span>
                                    <span className="text-[10px] text-[#666]">{sp.note}</span>
                                  </div>
                                </div>
                                {isSel && <FiCheck size={16} className="text-[#332F32]" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: FYLL (WITH BESPOKE FLATICON FILLING ICONS) */}
                    {currentStep === 3 && (
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-2">
                          <span className="font-black text-sm uppercase text-[#332F32]">
                            Steg 3 · Velg Kremfyll
                          </span>
                          <span className="text-[10px] text-[#666]">Rikt lagt mellom bunnene</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {FILLING_OPTIONS.map((fill) => {
                            const isSel = selectedFilling.id === fill.id;
                            const IconComp = fill.IconComponent;
                            return (
                              <div
                                key={fill.id}
                                onClick={() => setSelectedFilling(fill)}
                                className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                  isSel
                                    ? "border-[#332F32] bg-[#FFA8C5]/20 ring-2 ring-[#332F32]"
                                    : "border-[#E5E0D5] bg-[#FAF7EE] hover:border-[#332F32]"
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className="w-8 h-8 rounded-lg border border-[#332F32] flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: fill.swatch }}
                                  >
                                    <IconComp className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <span className="font-black text-xs text-[#332F32] block">{fill.name}</span>
                                    <span className="text-[10px] text-[#666]">{fill.note}</span>
                                  </div>
                                </div>
                                {isSel && <FiCheck size={16} className="text-[#332F32]" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: DEKOR & STIL */}
                    {currentStep === 4 && (
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-2">
                          <span className="font-black text-sm uppercase text-[#332F32]">
                            Steg 4 · Velg Dekor &amp; Glasurstil
                          </span>
                          <span className="text-[10px] text-[#666]">Endrer forhåndsvisningen</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {FROSTING_OPTIONS.map((fr) => {
                            const isSel = selectedFrosting.id === fr.id;
                            return (
                              <div
                                key={fr.id}
                                onClick={() => setSelectedFrosting(fr)}
                                className={`p-2 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2.5 ${
                                  isSel
                                    ? "border-[#332F32] bg-white ring-2 ring-[#FFA8C5] shadow-xs"
                                    : "border-[#E5E0D5] bg-[#FAF7EE] hover:border-[#332F32]"
                                }`}
                              >
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#E5E0D5] flex-shrink-0">
                                  <Image src={fr.image} alt={fr.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="font-black text-xs text-[#332F32] block truncate">{fr.name}</span>
                                  <span className="text-[10px] text-[#666] block leading-tight">{fr.note}</span>
                                </div>
                                {isSel && <FiCheck size={16} className="text-[#332F32] flex-shrink-0" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 5: TEKST, LYS & TOPPINGS */}
                    {currentStep === 5 && (
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-2">
                          <span className="font-black text-sm uppercase text-[#332F32]">
                            Steg 5 · Personlig Tekst &amp; Toppings
                          </span>
                          <span className="text-[10px] text-[#666]">Gjør kaken unik</span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                              Håndskrevet Tekst på Kaken:
                            </label>
                            <input
                              type="text"
                              value={customInscription}
                              onChange={(e) => setCustomInscription(e.target.value)}
                              placeholder='f.eks. "Happy 25th Sofia!"'
                              className="w-full p-2.5 rounded-xl border border-[#332F32] bg-white text-[#332F32] font-bold text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                              Bursdagslys (Inkludert):
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              {["Uten lys", "1 lys", "18 lys", "25 lys"].map((c) => (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => setCandleCount(c)}
                                  className={`py-1.5 text-center rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                                    candleCount === c
                                      ? "bg-[#332F32] text-white border-[#332F32]"
                                      : "bg-[#FAF7EE] text-[#555] border-[#E5E0D5]"
                                  }`}
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold text-[#332F32] block mb-1">
                              Ekstra Toppings:
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {TOPPING_OPTIONS.map((top) => {
                                const isChecked = selectedToppings.includes(top.id);
                                const TopIcon = top.IconComponent;
                                return (
                                  <div
                                    key={top.id}
                                    onClick={() => toggleTopping(top.id)}
                                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                      isChecked
                                        ? "bg-white border-[#332F32] shadow-2xs"
                                        : "bg-[#FAF7EE] border-[#E5E0D5]"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {}}
                                        className="w-3.5 h-3.5 accent-[#332F32]"
                                      />
                                      <TopIcon className="w-5 h-5" />
                                      <span className="text-xs font-bold text-[#332F32]">{top.name}</span>
                                    </div>
                                    <span className="text-xs font-black text-[#FF5983]">+{top.priceDelta} kr</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 6: KALENDER & MERGED CONFIRMATION FORM */}
                    {currentStep === 6 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-2">
                          <span className="font-black text-sm uppercase text-[#332F32]">
                            Steg 6 · Velg Hentedato (Min. 7 Dager)
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFF59D] text-[#332F32] font-black uppercase border border-[#332F32]">
                            7 dagers varsel
                          </span>
                        </div>

                        {!isConfirmed ? (
                          <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                            {/* Calendar Navigation & Month Matrix */}
                            <div className="p-3 rounded-2xl bg-[#FAF7EE] border border-[#E5E0D5] space-y-2">
                              <div className="flex items-center justify-between">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (calMonth === 9 && calYear === 2026) return;
                                    setCalMonth(calMonth === 0 ? 11 : calMonth - 1);
                                  }}
                                  disabled={calMonth === 9 && calYear === 2026}
                                  className="p-1 rounded border border-[#332F32] bg-white text-[#332F32] disabled:opacity-30 cursor-pointer"
                                >
                                  <FiChevronLeft size={16} />
                                </button>
                                <span className="font-black text-xs uppercase text-[#332F32]">
                                  {monthNames[calMonth]} {calYear}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCalMonth(calMonth === 11 ? 0 : calMonth + 1)}
                                  className="p-1 rounded border border-[#332F32] bg-white text-[#332F32] cursor-pointer"
                                >
                                  <FiChevronRight size={16} />
                                </button>
                              </div>

                              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] text-[#777] uppercase">
                                <div>Man</div><div>Tir</div><div>Ons</div><div>Tor</div><div>Fre</div><div>Lør</div><div>Søn</div>
                              </div>

                              <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: startDayOfWeek }).map((_, i) => (
                                  <div key={`blank-${i}`} className="p-1" />
                                ))}

                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                  const dayNum = i + 1;
                                  const cellDate = new Date(calYear, calMonth, dayNum);
                                  cellDate.setHours(0, 0, 0, 0);
                                  const isAllowed = cellDate >= minAllowedDate;
                                  const isSelected =
                                    selectedDate &&
                                    selectedDate.getDate() === dayNum &&
                                    selectedDate.getMonth() === calMonth;

                                  return (
                                    <button
                                      key={`day-${dayNum}`}
                                      type="button"
                                      disabled={!isAllowed}
                                      onClick={() => {
                                        const d = new Date(calYear, calMonth, dayNum);
                                        d.setHours(0, 0, 0, 0);
                                        setSelectedDate(d);
                                      }}
                                      className={`p-1.5 rounded-lg border text-center transition-all ${
                                        isSelected
                                          ? "bg-[#332F32] text-white border-[#332F32] font-black"
                                          : isAllowed
                                          ? "bg-white border-[#E5E0D5] text-[#332F32] font-bold hover:bg-[#FFA8C5]/30 cursor-pointer"
                                          : "bg-stone-100 border-stone-200 text-stone-400 opacity-40 cursor-not-allowed line-through"
                                      }`}
                                    >
                                      <span className="text-xs block">{dayNum}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              <div className="pt-1 flex items-center justify-between text-[11px] font-bold">
                                <span className="text-[#332F32]">Valgt: {formattedSelectedDate}</span>
                                <span className="text-emerald-800 text-[10px]">✓ Oppfyller 7 dagers varsel</span>
                              </div>
                            </div>

                            {/* Time Slots */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {PICKUP_TIMES.map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setPickupTime(time)}
                                  className={`p-2 rounded-lg border text-center text-xs transition-all cursor-pointer ${
                                    pickupTime === time
                                      ? "bg-[#FFA8C5] border-[#332F32] text-[#332F32] font-black shadow-2xs"
                                      : "bg-[#FAF7EE] border-[#E5E0D5] text-[#666]"
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>

                            {/* Fulfillment Mode */}
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setFulfillmentType("pickup")}
                                className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                                  fulfillmentType === "pickup"
                                    ? "bg-[#FFA8C5] border-[#332F32] text-[#332F32]"
                                    : "bg-[#FAF7EE] border-[#E5E0D5] text-[#666]"
                                }`}
                              >
                                Hentes på Grünerløkka (Gratis)
                              </button>
                              <button
                                type="button"
                                onClick={() => setFulfillmentType("delivery")}
                                className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                                  fulfillmentType === "delivery"
                                    ? "bg-[#FFA8C5] border-[#332F32] text-[#332F32]"
                                    : "bg-[#FAF7EE] border-[#E5E0D5] text-[#666]"
                                }`}
                              >
                                Budlevering i Oslo (+150 kr)
                              </button>
                            </div>

                            {/* Customer Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <input
                                type="text"
                                required
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Ditt Navn"
                                className="p-2.5 rounded-xl border border-[#E5E0D5] bg-[#FAF7EE] text-xs font-bold text-[#332F32]"
                              />
                              <input
                                type="tel"
                                required
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                placeholder="Mobil for Vipps &amp; SMS"
                                className="p-2.5 rounded-xl border border-[#E5E0D5] bg-[#FAF7EE] text-xs font-bold text-[#332F32]"
                              />
                              <input
                                type="email"
                                required
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                placeholder="E-post for kvittering"
                                className="p-2.5 rounded-xl border border-[#E5E0D5] bg-[#FAF7EE] text-xs font-bold text-[#332F32]"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full py-3.5 px-4 rounded-xl bg-[#332F32] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>BEKREFT RESERVASJON · {totalPrice} KR MED VIPPS</span>
                              <FiArrowRight size={14} />
                            </button>
                          </form>
                        ) : (
                          /* =================================================
                              MERGED CONFIGURATION + CONFIRMATION LUXURY PASS
                              ================================================= */
                          <div className="p-5 sm:p-6 rounded-3xl border-2 border-[#332F32] bg-[#FAF7EE] space-y-4">
                            {/* Voucher Header Bar */}
                            <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#E5E0D5]">
                              <div className="flex items-center gap-2.5">
                                <LuffyCakesLogo className="w-7 h-7" />
                                <div>
                                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase inline-block">
                                    ● RESERVASJON BEKREFTET
                                  </span>
                                  <h3 className="font-black text-sm text-[#332F32] uppercase">
                                    Luffy Cakes Bestillingsbevis
                                  </h3>
                                </div>
                              </div>

                              <div className="text-right">
                                <span className="px-3.5 py-1 rounded-full bg-[#FFA8C5] text-[#332F32] font-black text-sm border border-[#332F32] inline-block shadow-2xs">
                                  {totalPrice} kr
                                </span>
                              </div>
                            </div>

                            {/* Main Body: Merging Image Aspect & Specifications */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                              {/* Left: Framed Cake Image */}
                              <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden border-2 border-[#332F32] bg-white shadow-2xs">
                                <Image
                                  src={selectedFrosting.image}
                                  alt="Bestilt kake"
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-white font-mono text-[9px] font-black uppercase border border-[#332F32]">
                                  {selectedSize.name}
                                </div>
                                <div className="absolute bottom-2 left-2 right-2 p-1 bg-white/95 text-[9px] font-bold text-center border border-[#E5E0D5] rounded">
                                  {selectedSize.portions}
                                </div>
                              </div>

                              {/* Right: Clean, Structured Specs List (ZERO TRUNCATION) */}
                              <div className="sm:col-span-7 space-y-2 text-xs">
                                <div className="p-2.5 rounded-xl bg-white border border-[#E5E0D5]">
                                  <span className="text-[9px] uppercase text-[#888] font-bold block">
                                    Hentedato &amp; Tid:
                                  </span>
                                  <span className="font-black text-[#332F32] block">
                                    {formattedSelectedDate}
                                  </span>
                                  <span className="text-[11px] text-[#FF5983] font-bold">
                                    kl. {pickupTime}
                                  </span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white border border-[#E5E0D5]">
                                  <span className="text-[9px] uppercase text-[#888] font-bold block">
                                    Smak &amp; Fyll:
                                  </span>
                                  <span className="font-black text-[#332F32] block">
                                    {selectedSponge.name}
                                  </span>
                                  <span className="text-[11px] text-[#666]">
                                    med {selectedFilling.name.toLowerCase()}
                                  </span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white border border-[#E5E0D5]">
                                  <span className="text-[9px] uppercase text-[#888] font-bold block">
                                    Dekorstil &amp; Hilsen:
                                  </span>
                                  <span className="font-black text-[#332F32] block">
                                    {selectedFrosting.name.split(" (")[0]}
                                  </span>
                                  <span className="text-[11px] text-[#555] italic block">
                                    &ldquo;{customInscription}&rdquo; ({candleCount})
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Location & Order ID */}
                            <div className="p-3 rounded-xl bg-white border border-[#E5E0D5] flex items-center justify-between text-xs">
                              <div>
                                <span className="text-[9px] uppercase text-[#888] font-bold block">Hentested</span>
                                <span className="font-bold text-[#332F32]">
                                  {fulfillmentType === "delivery"
                                    ? "Budlevering i Oslo (+150 kr inkludert)"
                                    : "Markveien 32, Grünerløkka, 0554 Oslo"}
                                </span>
                              </div>
                              <span className="font-black text-xs text-[#332F32] px-2.5 py-1 rounded bg-[#FAF7EE] border border-[#332F32]">
                                Ordre #LC-9165
                              </span>
                            </div>

                            {/* Footer SMS & Vipps Confirmation Note */}
                            <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] border-t border-[#E5E0D5]">
                              <span className="text-[#666]">
                                Vipps-krav og SMS-kvittering er sendt til {customerPhone}
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsConfirmed(false)}
                                className="text-[#332F32] font-black underline cursor-pointer hover:text-[#FF5983]"
                              >
                                Endre bestilling ↺
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Integrated Next/Previous Actions Bar */}
                    {currentStep < 6 && (
                      <div className="pt-3.5 mt-3.5 border-t border-[#E5E0D5] flex items-center justify-between">
                        <button
                          type="button"
                          disabled={currentStep === 1}
                          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                          className="px-4 py-2 rounded-xl border border-[#332F32] text-[#332F32] text-xs font-bold disabled:opacity-30 disabled:pointer-events-none cursor-pointer hover:bg-[#FAF7EE]"
                        >
                          ← Forrige
                        </button>

                        <button
                          type="button"
                          onClick={() => setCurrentStep((s) => Math.min(6, s + 1))}
                          className="px-5 py-2.5 rounded-xl bg-[#332F32] hover:bg-black text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Neste: {stepLabels[currentStep]} →</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Sticky Live Preview Console (lg:col-span-5) */}
                <div className="lg:col-span-5 sticky top-20 space-y-3">
                  <div className="bg-white border-2 border-[#332F32] rounded-3xl p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D5]">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#888]">
                        DIN KAKE-KONFIGURASJON
                      </span>
                      <span className="text-lg font-black text-[#FF5983]">{totalPrice} kr</span>
                    </div>

                    {/* Cake Photo */}
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-[#332F32] bg-[#FAF7EE]">
                      <Image
                        src={selectedFrosting.image}
                        alt="Kake Forhåndsvisning"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white font-mono text-[9px] font-black uppercase border border-[#332F32]">
                        {selectedSize.name} · {selectedSize.portions}
                      </div>
                    </div>

                    {/* Compact Specs Breakdown List */}
                    <div className="space-y-1.5 text-xs divide-y divide-[#E5E0D5]">
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-[10px] text-[#777] uppercase">Kakebunn:</span>
                        <span className="font-bold text-[#332F32]">{selectedSponge.name}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-[10px] text-[#777] uppercase">Kremfyll:</span>
                        <span className="font-bold text-[#332F32]">{selectedFilling.name}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-[10px] text-[#777] uppercase">Dekorstil:</span>
                        <span className="font-bold text-[#332F32]">{selectedFrosting.name.split(" (")[0]}</span>
                      </div>
                      {customInscription && (
                        <div className="flex justify-between items-center pt-1.5">
                          <span className="text-[10px] text-[#777] uppercase">Tekst:</span>
                          <span className="font-bold text-[#332F32] italic">&ldquo;{customInscription}&rdquo;</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Button to Finish Order */}
                    {currentStep < 6 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(6)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#FFA8C5] hover:bg-[#FF9EBC] text-[#332F32] text-xs font-black uppercase tracking-wider border border-[#332F32] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Gå Rett Til Bestilling →</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            SECTION 3: DM vs STUDIO BOOKING (TIGHT COMPARISON)
            ========================================================= */}
        <section id="comparison" className="py-10 sm:py-12 border-b border-[#E5E0D5] bg-[#FAF7EE]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4 font-mono">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5983]">
                HVORFOR BRUKE DETTE I STEDET FOR &quot;SEND DM FOR BESTILLING&quot;?
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#332F32]">
                Slutt Å Bruke 3 Timer Om Dagen I Innboksen
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/70 border border-red-200 space-y-2.5">
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold uppercase inline-block">
                  ✕ Instagram DM (Før)
                </span>
                <ul className="space-y-1.5 text-[#555] leading-relaxed">
                  <li>• 12 meldinger fram og tilbake for å avklare dato og porsjoner.</li>
                  <li>• Kunder ghoster etter manuell prisberegning.</li>
                  <li>• Dobbelbookinger fordi datoer ligger spredt i innboksen.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-[#332F32] shadow-xs space-y-2.5">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase inline-block">
                  ✓ Studioside (Nå)
                </span>
                <ul className="space-y-1.5 text-[#332F32] font-bold leading-relaxed">
                  <li>• Kunden ser prisen per størrelse umiddelbart og velger selv.</li>
                  <li>• Kalenderen håndhever 7 dagers forhåndsvarsel automatisk.</li>
                  <li>• Digitalt bestillingsbevis og betaling via Vipps.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: REVIEWS (COMPACT 3-GRID)
            ========================================================= */}
        <section id="reviews" className="py-10 sm:py-12 border-b border-[#E5E0D5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-2">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#332F32]">
                Hva Kundene Sier
              </h2>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} fill="currentColor" />
                ))}
                <span className="text-xs font-black text-[#332F32] ml-1">5.0 / 5.0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white border border-[#E5E0D5] rounded-2xl space-y-2">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={11} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#332F32] font-bold leading-relaxed">
                  &ldquo;Bursdagskaken var helt spektakulær! Så deilig å kunne bestille alt på nettsiden i stedet for å vente i timevis på svar i DM.&rdquo;
                </p>
                <div className="text-[10px] text-[#666]">Ingrid H. · Grünerløkka</div>
              </div>

              <div className="p-4 bg-white border border-[#E5E0D5] rounded-2xl space-y-2">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={11} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#332F32] font-bold leading-relaxed">
                  &ldquo;Bestilte en bento-kake til kjæresten min. Både utseendet og smaken var 10/10. Kommer garantert tilbake!&rdquo;
                </p>
                <div className="text-[10px] text-[#666]">Jonas K. · Majorstuen</div>
              </div>

              <div className="p-4 bg-white border border-[#E5E0D5] rounded-2xl space-y-2">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={11} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#332F32] font-bold leading-relaxed">
                  &ldquo;Lambeth-kaken var et kunstverk på dessertbordet. Håndskriften var nydelig og gjestene snakket om den i dagevis.&rdquo;
                </p>
                <div className="text-[10px] text-[#666]">Camilla &amp; Fredrik · Frogner</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: FOOTER (COMPACT & CLEAN)
            ========================================================= */}
        <footer className="py-8 bg-[#FAF7EE] border-t border-[#E5E0D5] font-mono text-xs text-[#332F32]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <LuffyCakesLogo />
              <span className="text-[11px] text-[#666]">Markveien 32, 0554 Oslo</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-[#888]">Utviklet av A.Gure</span>
              <Link
                href="/contact?package=booking-drop"
                className="px-3 py-1.5 rounded-lg bg-[#332F32] text-white font-bold hover:bg-black transition-colors"
              >
                Få en slik side til ditt bakeri →
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </PreviewShell>
  );
}
