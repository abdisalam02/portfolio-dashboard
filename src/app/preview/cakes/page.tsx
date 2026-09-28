"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiPause,
  FiPlay,
  FiShoppingBag,
  FiArrowDown,
} from "react-icons/fi";
import PreviewShell from "@/components/preview/PreviewShell";

// Bespoke Artisan Patisserie Brand Mark & Crest
function MaisonChouxLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" stroke="#8B263E" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="16.5" stroke="#8B263E" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
      {/* Tiered Gateau Silhouette */}
      <rect x="13" y="24" width="14" height="4" rx="1" fill="#8B263E" />
      <rect x="15" y="19" width="10" height="4" rx="1" fill="#8B263E" />
      <rect x="17.5" y="15" width="5" height="3" rx="0.5" fill="#8B263E" />
      <circle cx="20" cy="12.5" r="1.5" fill="#8B263E" />
      {/* Delicate scalloped garland */}
      <path d="M14 24Q17 26 20 24Q23 26 26 24" stroke="#FAF7F2" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function PatisserieSeal({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke="#8B263E" strokeWidth="1.2" opacity="0.6" />
      <circle cx="30" cy="30" r="25" stroke="#8B263E" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.6" />
      <path d="M22 36L30 18L38 36" stroke="#8B263E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M25 31H35" stroke="#8B263E" strokeWidth="1" />
      <circle cx="30" cy="30" r="1.5" fill="#8B263E" />
    </svg>
  );
}

interface CakeFlavor {
  id: string;
  name: string;
  sponge: string;
  accent: string;
  dotColor: string;
}

const FLAVORS: CakeFlavor[] = [
  {
    id: "pistachio-raspberry",
    name: "Sicilian Pistachio & Wild Raspberry",
    sponge: "Roasted pistachio sponge · Fresh raspberry coulis",
    accent: "White chocolate ganache",
    dotColor: "#E05375",
  },
  {
    id: "valrhona-caramel",
    name: "Valrhona Guanaja & Salted Caramel",
    sponge: "70% dark cocoa sponge · Fleur de sel caramel",
    accent: "Whipped dark ganache",
    dotColor: "#6B3A2A",
  },
  {
    id: "champagne-peach",
    name: "Champagne Peach & Madagascar Vanilla",
    sponge: "Vanilla bean chiffon · Summer peach curd",
    accent: "Elderflower cream",
    dotColor: "#E8A87C",
  },
];

interface CakeTier {
  id: string;
  name: string;
  slicesCount: number;
  servings: string;
  diameter: string;
  price: number;
  costPerSlice: number;
  sliceGraphicType: "petite" | "signature" | "grand";
  badge?: string;
}

const TIERS: CakeTier[] = [
  {
    id: "petite",
    name: "Petite Celebration",
    slicesCount: 8,
    servings: "6–8 portions",
    diameter: "15 cm · Single Tier",
    price: 650,
    costPerSlice: 81,
    sliceGraphicType: "petite",
  },
  {
    id: "signature",
    name: "Signature Tall Lambeth",
    slicesCount: 15,
    servings: "12–15 portions",
    diameter: "20 cm · Double Height",
    price: 950,
    costPerSlice: 63,
    sliceGraphicType: "signature",
    badge: "Most Ordered",
  },
  {
    id: "grand",
    name: "Grand Mariage Tiered",
    slicesCount: 45,
    servings: "30–45 portions",
    diameter: "2 Stacked Tiers",
    price: 2800,
    costPerSlice: 62,
    sliceGraphicType: "grand",
  },
];

const DATES = [
  { day: "Fri", date: "24", full: "Friday, May 24" },
  { day: "Sat", date: "25", full: "Saturday, May 25" },
  { day: "Sun", date: "26", full: "Sunday, May 26" },
  { day: "Fri", date: "31", full: "Friday, May 31" },
  { day: "Sat", date: "01", full: "Saturday, June 01" },
];

export default function PreviewCakesPage() {
  const [selectedTier, setSelectedTier] = useState<CakeTier>(TIERS[1]);
  const [selectedFlavor, setSelectedFlavor] = useState<CakeFlavor>(FLAVORS[0]);
  const [selectedDate, setSelectedDate] = useState(DATES[1]);
  const [inscription, setInscription] = useState("Happy Birthday Camilla");
  const [clientName, setClientName] = useState("Camilla");
  const [clientPhone, setClientPhone] = useState("+47 912 34 567");
  const [confirmed, setConfirmed] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  // Auto-scroll gallery state & ref
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Tight Masonry Trio sequence - Substantially enlarged & visually commanding
  const tightMasonryBakes = [
    { src: "/demo/cakes/cake-1.jpg", title: "Vintage Lambeth Garlands", num: "01. LAMBETH", hClass: "h-72 sm:h-96" },
    { src: "/demo/cakes/cake-2.jpg", title: "Pearl Beaded Heart Tier", num: "02. PERLE", hClass: "h-56 sm:h-72 mt-8 sm:mt-12" },
    { src: "/demo/cakes/cake-3.jpg", title: "Garden Pressed Violet Cake", num: "03. BOTANIQUE", hClass: "h-64 sm:h-84 mt-3 sm:mt-5" },
    { src: "/demo/cakes/cake-4.jpg", title: "Pure White French Piping", num: "04. PUR BLANC", hClass: "h-72 sm:h-96" },
    { src: "/demo/cakes/cake-5.jpg", title: "Wild Raspberry & Ganache", num: "05. FRAMBOISE", hClass: "h-54 sm:h-70 mt-7 sm:mt-10" },
    { src: "/demo/cakes/cake-6.jpg", title: "Grand 2-Tier Celebration", num: "06. MARIAGE", hClass: "h-64 sm:h-84 mt-2 sm:mt-4" },
    { src: "/demo/cakes/cake-1.jpg", title: "Vintage Lambeth Garlands", num: "07. LAMBETH", hClass: "h-72 sm:h-96" },
    { src: "/demo/cakes/cake-2.jpg", title: "Pearl Beaded Heart Tier", num: "08. PERLE", hClass: "h-56 sm:h-72 mt-8 sm:mt-12" },
    { src: "/demo/cakes/cake-3.jpg", title: "Pressed Flora Sponge", num: "09. BOTANIQUE", hClass: "h-64 sm:h-84 mt-3 sm:mt-5" },
  ];

  // Continuous Auto-Scroll Effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    const scrollStep = () => {
      if (!isPaused && el) {
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += 0.7;
        }
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  // Smooth scroll to confirmation pass when order is confirmed
  useEffect(() => {
    if (confirmed) {
      const timer = setTimeout(() => {
        const pass = document.getElementById("cake-order-pass");
        if (pass) {
          pass.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [confirmed]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <PreviewShell
      nicheTitle="Maison Choux Patisserie"
      nicheSubtitle="Artisan Celebration Cakes · Grünerløkka"
      accentColor="#8B263E"
    >
      <div className="text-[#4A1521] min-h-screen overflow-x-hidden">
        {/* BAND 1: HEADER & HERO (Warm Linen Cream Background) */}
        <section className="bg-[#FAF7F2] border-b border-[#EBD6DC]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-5 sm:py-8 space-y-8 sm:space-y-10">
            {/* Header Strapped with Logo Icon */}
            <header className="w-full pb-4 border-b border-[#EBD6DC] flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <MaisonChouxLogo className="w-8 h-8 sm:w-9 sm:h-9 text-[#8B263E] flex-shrink-0" />
                <div>
                  <span className="font-serif text-base sm:text-xl font-bold text-[#4A1521] tracking-wide block leading-tight">
                    MAISON CHOUX
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-[#8B263E] block">
                    Pâtisserie Fine · Oslo
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6 text-xs">
                <a href="#gallery" className="text-[#783648] hover:text-[#4A1521] font-medium hidden sm:inline">
                  Recent Bakes
                </a>
                <a href="#portions" className="text-[#783648] hover:text-[#4A1521] font-medium hidden sm:inline">
                  Slices &amp; Cost
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("order-desk");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#8B263E] text-white hover:bg-[#731F33] transition-colors font-medium text-xs shadow-xs cursor-pointer"
                >
                  Order Cake ↓
                </button>
              </div>
            </header>

            {/* Fluid Editorial Hero */}
            <div className="pt-1 sm:pt-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="md:col-span-7 space-y-3.5 sm:space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8B263E] font-bold">
                      CELEBRATION PATISSERIE · GRÜNERLØKKA
                    </span>
                  </div>

                  <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#4A1521] leading-[1.14] font-semibold tracking-tight">
                    Handcrafted celebration cakes, baked fresh in Oslo.
                  </h1>

                  <p className="text-xs sm:text-sm text-[#783648] leading-relaxed max-w-lg">
                    Vintage Lambeth garlands, organic berry curd, and real Madagascar vanilla bean. Baked to order for birthdays, weddings, and weekend tables.
                  </p>

                  <div className="pt-1 flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full border border-[#EBD6DC] bg-white/70 text-[#6D1B2F]">
                      ✦ Fresh organic berries
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 rounded-full border border-[#EBD6DC] bg-white/70 text-[#6D1B2F]">
                      ✦ 48h notice
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 rounded-full border border-[#EBD6DC] bg-white/70 text-[#6D1B2F]">
                      ✦ Thorvald Meyers gate 42
                    </span>
                  </div>

                  <div className="pt-2 sm:pt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("portions");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 sm:px-5 py-2.5 rounded-full bg-[#8B263E] text-white hover:bg-[#731F33] font-medium text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-2"
                    >
                      <span>Choose Size &amp; Slices</span>
                      <FiArrowDown size={14} />
                    </button>
                    <span className="text-xs font-mono text-[#8B263E]">From 650 kr</span>
                  </div>
                </div>

                {/* Appetizing Hero Photo Card */}
                <div className="md:col-span-5 relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-[#EBD6DC] shadow-sm group">
                  <Image
                    src="/demo/cakes/cake-1.jpg"
                    alt="Fresh Vintage Lambeth Cake"
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute top-3 right-3">
                    <PatisserieSeal className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-white/95 backdrop-blur-xs rounded-xl border border-[#EBD6DC] flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-[#4A1521]">Signature Lambeth Tier</span>
                    <span className="text-[#8B263E] font-semibold font-mono">950 kr · 15 Slices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 2: RECENT BAKES GALLERY (Enlarged Tight Masonry Trio, Clean Background, No "Auto-Scrolling" badge) */}
        <section id="gallery" className="bg-[#F4E2E8] border-b border-[#E8CAD2] py-10 sm:py-16 scroll-mt-10 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4">
            <div className="flex items-center justify-between text-xs px-1 border-b border-[#E0BDC7] pb-3">
              <span className="font-serif text-base sm:text-lg font-bold text-[#4A1521]">
                Recent Bakes
              </span>

              {/* Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1.5 rounded-md border border-[#E0BDC7] bg-white/80 hover:bg-white text-[#8B263E] text-xs transition-colors"
                  title={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <FiPlay size={11} /> : <FiPause size={11} />}
                </button>
                <button
                  type="button"
                  onClick={() => handleManualScroll("left")}
                  className="p-1.5 rounded-md border border-[#E0BDC7] bg-white/80 hover:bg-white text-[#8B263E] text-xs transition-colors"
                >
                  <FiChevronLeft size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleManualScroll("right")}
                  className="p-1.5 rounded-md border border-[#E0BDC7] bg-white/80 hover:bg-white text-[#8B263E] text-xs transition-colors"
                >
                  <FiChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* Seamless Enlarged Tight Masonry Trio Track */}
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing py-3"
            >
              <div className="flex gap-4 sm:gap-6 items-start min-w-[1700px]">
                {tightMasonryBakes.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePhotoModal(item.src)}
                    className={`relative w-60 sm:w-80 ${item.hClass} flex-shrink-0 rounded-2xl overflow-hidden border border-[#E0BDC7] bg-white/50 cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                      <span className="text-white text-xs sm:text-sm font-serif leading-tight">
                        {item.title}
                      </span>
                    </div>
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 text-[9px] font-mono font-bold text-[#8B263E] border border-[#E0BDC7] shadow-xs">
                      {item.num}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BAND 3: SIZES & SLICES (Normal Warm Linen Cream #FAF7F2) */}
        <section id="portions" className="bg-[#FAF7F2] border-b border-[#EBD6DC] py-10 sm:py-16 scroll-mt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4">
            <div className="flex justify-between items-baseline px-1 border-b border-[#EBD6DC] pb-2">
              <div>
                <span className="font-serif text-base font-bold text-[#4A1521] block">
                  Select Size &amp; Slices
                </span>
                <span className="text-xs text-[#783648]">Tap any tier to calculate portions and start order</span>
              </div>
              <span className="text-[11px] font-mono text-[#8B263E] font-semibold">
                Cost Per Slice
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
              {TIERS.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => {
                      setSelectedTier(tier);
                      const el = document.getElementById("order-desk");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`p-4 sm:p-5 rounded-xl border-2 bg-white/90 cursor-pointer transition-all duration-200 shadow-xs flex flex-col justify-between relative ${
                      isSelected
                        ? "border-[#8B263E] bg-[#FDF7F8] ring-2 ring-[#8B263E]/20 shadow-md"
                        : "border-[#EBD6DC] hover:border-[#8B263E]/50"
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#8B263E] text-white text-[9px] font-semibold tracking-wide">
                        {tier.badge}
                      </span>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] text-[#783648] font-mono uppercase block font-semibold">
                            {tier.diameter}
                          </span>
                          <h4 className="font-serif text-base font-bold text-[#4A1521]">
                            {tier.name}
                          </h4>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#8B263E] text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>

                      {/* Cake Slice SVG Diagrams */}
                      <div className="py-2 flex items-center justify-center">
                        {tier.sliceGraphicType === "petite" && (
                          <svg className="w-20 h-20" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="#FDF7F8" stroke="#8B263E" strokeWidth="2.5" />
                            <line x1="50" y1="10" x2="50" y2="90" stroke="#8B263E" strokeWidth="1.5" strokeDasharray="3,3" />
                            <line x1="10" y1="50" x2="90" y2="50" stroke="#8B263E" strokeWidth="1.5" strokeDasharray="3,3" />
                            <line x1="22" y1="22" x2="78" y2="78" stroke="#8B263E" strokeWidth="1.5" strokeDasharray="3,3" />
                            <line x1="78" y1="22" x2="22" y2="78" stroke="#8B263E" strokeWidth="1.5" strokeDasharray="3,3" />
                            <path d="M 50 50 L 50 10 A 40 40 0 0 1 78 22 Z" fill="#8B263E" opacity="0.3" />
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
                              const rad = (ang * Math.PI) / 180;
                              const x = 50 + 36 * Math.cos(rad);
                              const y = 50 + 36 * Math.sin(rad);
                              return <circle key={i} cx={x} cy={y} r="2.5" fill="#8B263E" />;
                            })}
                            <circle cx="50" cy="50" r="5" fill="#8B263E" />
                          </svg>
                        )}

                        {tier.sliceGraphicType === "signature" && (
                          <svg className="w-20 h-20" viewBox="0 0 100 100">
                            <rect x="22" y="34" width="56" height="46" rx="5" fill="#FDF7F8" stroke="#8B263E" strokeWidth="2.5" />
                            <line x1="36" y1="34" x2="36" y2="80" stroke="#8B263E" strokeWidth="1.5" strokeDasharray="3,3" />
                            <line x1="50" y1="34" x2="50" y2="80" stroke="#8B263E" strokeWidth="1.5" strokeDasharray="3,3" />
                            <line x1="64" y1="34" x2="64" y2="80" stroke="#8B263E" strokeWidth="1.5" strokeDasharray="3,3" />
                            <ellipse cx="50" cy="34" rx="28" ry="11" fill="#FFFFFF" stroke="#8B263E" strokeWidth="2.5" />
                            <path d="M 24 50 Q 36 60 50 50 Q 64 60 76 50" fill="none" stroke="#8B263E" strokeWidth="2" />
                            <circle cx="50" cy="30" r="4" fill="#8B263E" />
                          </svg>
                        )}

                        {tier.sliceGraphicType === "grand" && (
                          <svg className="w-20 h-20" viewBox="0 0 100 100">
                            <rect x="16" y="52" width="68" height="34" rx="4" fill="#FDF7F8" stroke="#8B263E" strokeWidth="2.5" />
                            <line x1="33" y1="52" x2="33" y2="86" stroke="#8B263E" strokeWidth="1" strokeDasharray="2,2" />
                            <line x1="50" y1="52" x2="50" y2="86" stroke="#8B263E" strokeWidth="1" strokeDasharray="2,2" />
                            <line x1="67" y1="52" x2="67" y2="86" stroke="#8B263E" strokeWidth="1" strokeDasharray="2,2" />
                            <rect x="28" y="24" width="44" height="28" rx="4" fill="#FFFFFF" stroke="#8B263E" strokeWidth="2" />
                            <line x1="50" y1="24" x2="50" y2="52" stroke="#8B263E" strokeWidth="1" strokeDasharray="2,2" />
                            <circle cx="50" cy="18" r="4" fill="#8B263E" />
                          </svg>
                        )}
                      </div>

                      {/* Slices & Cost Info */}
                      <div className="space-y-1 text-center font-mono">
                        <span className="text-xs font-semibold text-[#4A1521] block">
                          {tier.servings}
                        </span>
                        <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#EBD6DC] text-[11px] text-[#8B263E] font-bold">
                          ~{tier.costPerSlice} kr / slice
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#EBD6DC] flex justify-between items-center text-xs font-mono">
                      <span className="text-[#783648]">Total:</span>
                      <span className="text-base font-bold text-[#8B263E]">
                        {tier.price} kr
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BAND 4: FLAVORS TASTING MENU (Picnic Mat Accent Band: Warm Almond Brioche #F1E6DC) */}
        <section className="bg-[#F1E6DC] border-b border-[#E3D3C5] py-10 sm:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-3">
            <span className="font-serif text-base font-bold text-[#4A1521] block px-1 border-b border-[#E3D3C5] pb-2">
              Patisserie Flavors
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {FLAVORS.map((f) => {
                const isSelected = selectedFlavor.id === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFlavor(f)}
                    className={`p-3.5 rounded-xl border bg-white/80 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#8B263E] bg-[#FAF7F2] ring-1 ring-[#8B263E]"
                        : "border-[#E3D3C5] hover:border-[#8B263E]/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: f.dotColor }}
                      />
                      <h4 className="font-serif text-xs font-bold text-[#4A1521] truncate">
                        {f.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#783648] leading-snug">
                      {f.sponge}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BAND 5: ORDER DESK (Normal Warm Linen Cream #FAF7F2) */}
        <section id="order-desk" className="bg-[#FAF7F2] py-10 sm:py-16 scroll-mt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-5">
            <div className="flex items-center justify-between border-b border-[#EBD6DC] pb-2">
              <div className="flex items-center gap-2.5">
                <MaisonChouxLogo className="w-5 h-5 text-[#8B263E]" />
                <span className="font-serif text-base font-bold text-[#4A1521]">
                  ORDER YOUR CAKE
                </span>
              </div>
              <span className="text-xs font-mono text-[#783648]">Thorvald Meyers gate 42</span>
            </div>

            <div className="space-y-6">
              {!confirmed ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  {/* Step 1: Selected Size & Price Summary */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B263E] block">
                      1. Chosen Format
                    </label>
                    <div className="p-3.5 rounded-xl border border-[#8B263E] bg-white/90 flex justify-between items-center shadow-xs">
                      <div>
                        <span className="font-serif text-sm font-bold text-[#4A1521] block">
                          {selectedTier.name} ({selectedTier.servings})
                        </span>
                        <span className="text-[11px] text-[#783648] font-mono">
                          {selectedTier.diameter} · ~{selectedTier.costPerSlice} kr / slice
                        </span>
                      </div>
                      <span className="text-base font-bold text-[#8B263E] font-mono">
                        {selectedTier.price} kr
                      </span>
                    </div>
                  </div>

                  {/* Step 2: Flavor Choice */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B263E] block">
                      2. Flavor Profile
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {FLAVORS.map((f) => {
                        const isSelected = selectedFlavor.id === f.id;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setSelectedFlavor(f)}
                            className={`p-2.5 rounded-lg border text-left transition-all ${
                              isSelected
                                ? "border-[#8B263E] bg-[#FDF7F8] font-bold text-[#4A1521]"
                                : "border-[#EBD6DC] bg-white/70 text-[#783648] hover:bg-white"
                            }`}
                          >
                            <span className="block truncate">{f.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Piped Fondant Inscription */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B263E] block">
                        3. Piped Inscription on Cake
                      </label>
                      <span className="text-[10px] text-[#783648] font-mono">Live cursive preview</span>
                    </div>

                    <input
                      type="text"
                      value={inscription}
                      onChange={(e) => setInscription(e.target.value)}
                      placeholder="e.g. Happy Birthday Camilla"
                      maxLength={32}
                      className="w-full p-2.5 border border-[#EBD6DC] rounded-lg bg-white text-[#4A1521] font-medium outline-none focus:border-[#8B263E] shadow-2xs"
                    />

                    {/* Live French Calligraphy Fondant Preview */}
                    <div className="p-3.5 rounded-lg border border-[#EBD6DC] bg-white/70 text-center">
                      <span className="text-[10px] text-[#783648] uppercase tracking-wider font-mono block mb-1">
                        Piped in French Calligraphy:
                      </span>
                      <span className="font-serif italic text-xl text-[#8B263E] block">
                        &ldquo;{inscription || "Your Message"}&rdquo;
                      </span>
                    </div>
                  </div>

                  {/* Step 4: Pick Up Date */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B263E] block">
                      4. Pick Up Date (Grünerløkka)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono">
                      {DATES.map((d) => {
                        const isSelected = selectedDate.full === d.full;
                        return (
                          <button
                            key={d.full}
                            type="button"
                            onClick={() => setSelectedDate(d)}
                            className={`p-2.5 rounded-lg border text-center transition-all ${
                              isSelected
                                ? "bg-[#8B263E] text-white border-[#8B263E] font-bold shadow-xs"
                                : "bg-white/70 border-[#EBD6DC] text-[#4A1521] hover:border-[#8B263E]/40"
                            }`}
                          >
                            <span className="text-[10px] block opacity-80">{d.day}</span>
                            <span className="text-sm font-bold block">{d.date}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 5: Name & Vipps Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[10px] text-[#783648] block mb-1 font-mono">Your Name</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Camilla"
                        className="w-full p-2.5 border border-[#EBD6DC] rounded-lg bg-white text-[#4A1521] outline-none focus:border-[#8B263E]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#783648] block mb-1 font-mono">Mobile for Vipps Confirmation</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+47 912 34 567"
                        className="w-full p-2.5 border border-[#EBD6DC] rounded-lg bg-white text-[#4A1521] outline-none focus:border-[#8B263E]"
                      />
                    </div>
                  </div>

                  {/* Submit Order Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#8B263E] hover:bg-[#731F33] text-white font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiShoppingBag size={15} />
                    <span>Confirm Order · Vipps {selectedTier.price} kr</span>
                  </button>
                </form>
              ) : (
                /* Confirmed Bakery Collection Slip (Smooth scroll target) */
                <motion.div
                  id="cake-order-pass"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-5 sm:p-6 rounded-2xl border-2 border-[#8B263E] bg-[#FDF7F8] space-y-4 shadow-sm"
                >
                  <div className="flex justify-between items-start border-b border-[#EBD6DC] pb-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <MaisonChouxLogo className="w-8 h-8 sm:w-10 sm:h-10 text-[#8B263E] flex-shrink-0" />
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold inline-block mb-1">
                          ● ORDER CONFIRMED
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#4A1521]">
                          Maison Choux Collection Pass
                        </h3>
                        <span className="text-xs text-[#783648]">Reserved for {clientName}</span>
                      </div>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-[#8B263E] font-mono">
                      {selectedTier.price} kr
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-[#783648] font-mono block">Format:</span>
                      <span className="font-semibold text-[#4A1521]">
                        {selectedTier.name} ({selectedTier.servings})
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#783648] font-mono block">Flavor:</span>
                      <span className="font-semibold text-[#4A1521]">
                        {selectedFlavor.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#783648] font-mono block">Pick Up Date:</span>
                      <span className="font-semibold text-[#4A1521]">
                        {selectedDate.full} (10:00 – 16:00)
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#783648] font-mono block">Atelier Location:</span>
                      <span className="font-semibold text-[#4A1521]">
                        Thorvald Meyers gate 42, Oslo
                      </span>
                    </div>
                  </div>

                  {inscription && (
                    <div className="p-3 rounded-lg border border-[#EBD6DC] bg-white text-center">
                      <span className="text-[10px] text-[#783648] font-mono block">Fondant Script:</span>
                      <span className="font-serif italic text-base text-[#8B263E]">
                        &ldquo;{inscription}&rdquo;
                      </span>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="text-[10px] sm:text-[11px] text-[#783648]">Vipps receipt sent to {clientPhone}</span>
                    <button
                      type="button"
                      onClick={() => setConfirmed(false)}
                      className="text-[#8B263E] underline font-medium hover:text-[#731F33]"
                    >
                      Modify Order
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* BAND 6: FOOTER (Deep Heritage Burgundy Accent Band #4A1521) */}
        <footer className="bg-[#4A1521] text-[#FAF7F2] py-8 border-t border-[#3B111A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-2">
            <div className="flex justify-center items-center gap-2">
              <MaisonChouxLogo className="w-5 h-5 text-[#FAF7F2]" />
              <span className="font-serif font-bold text-white tracking-wider">MAISON CHOUX</span>
            </div>
            <p className="font-mono text-[10px] sm:text-[11px] text-[#FAF7F2]/80">Thorvald Meyers gate 42, 0555 Oslo · Tuesday – Sunday 09:00–17:00</p>
          </div>
        </footer>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoModal(null)}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <div className="relative max-w-lg w-full aspect-square rounded-xl overflow-hidden border border-white/20">
              <Image
                src={activePhotoModal}
                alt="Enlarged Cake"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black"
              >
                <FiX size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PreviewShell>
  );
}
