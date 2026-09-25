"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiClock,
  FiCalendar,
  FiInstagram,
  FiMapPin,
  FiCheckCircle,
  FiX,
  FiMaximize2,
  FiCheck,
  FiArrowUpRight,
  FiSliders,
  FiCoffee,
  FiVideo,
  FiTag,
  FiStar,
  FiHeart,
  FiAward,
  FiChevronRight,
  FiShoppingBag,
  FiFileText,
} from "react-icons/fi";
import DemoTopSwitcher from "@/components/demo/DemoTopSwitcher";
import NailShapeSelector, { NailShapeType } from "@/components/demo/NailShapeSelector";
import {
  cakesDemoConfig,
  nailsDemoConfig,
  weddingDemoConfig,
  PaletteTheme,
  ServiceItem,
  LookbookItem,
} from "@/app/demo/demo-data";

interface BookingDropTemplateProps {
  niche?: "cakes" | "nails" | "wedding";
}

export default function BookingDropTemplate({ niche = "cakes" }: BookingDropTemplateProps) {
  const config =
    niche === "nails"
      ? nailsDemoConfig
      : niche === "wedding"
      ? weddingDemoConfig
      : cakesDemoConfig;

  // Active Theme / Palette - Synchronizes immediately when route / niche changes
  const [activePalette, setActivePalette] = useState<PaletteTheme>(config.palettes[0]);

  const [isDockCollapsed, setIsDockCollapsed] = useState(false);

  const demoList = [
    { id: "cakes", label: "Bakery", brand: "Maison Sucre", icon: "🎂", href: "/demo" },
    { id: "nails", label: "Nail Studio", brand: "Studio Klō", icon: "💅", href: "/demo/nails" },
    { id: "wedding", label: "Weddings", brand: "Astrid Bridal", icon: "💍", href: "/demo/wedding" },
  ] as const;

  useEffect(() => {
    setActivePalette(config.palettes[0]);
    setSelectedService(config.services[0]);
    setSelectedCategory("all");
    setSelectedDate(config.bookingConfig.dates[1]);
    setSelectedTime(config.bookingConfig.timeSlots[1]);
    setClientName("");
    setClientPhone("");
    setClientInstagram("");
    setCakeInscription("");
    setCakeAllergies("");
    setNailInspoNote("");
    setWeddingVenue("");
    setWeddingColorVision("");
    setBookingConfirmed(false);
  }, [config.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Common State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<ServiceItem>(config.services[0]);
  const [selectedDate, setSelectedDate] = useState(config.bookingConfig.dates[1]);
  const [selectedTime, setSelectedTime] = useState(config.bookingConfig.timeSlots[1]);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientInstagram, setClientInstagram] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<LookbookItem | null>(null);

  // Cakes Niche Specific State
  const [cakeBakeWindow, setCakeBakeWindow] = useState<"morning" | "afternoon">("morning");
  const [cakeInscription, setCakeInscription] = useState("");
  const [cakeAllergies, setCakeAllergies] = useState("");

  // Nails Niche Specific State
  const [nailStatus, setNailStatus] = useState<"bare" | "biab_removal" | "gelx_removal">("bare");
  const [nailShape, setNailShape] = useState<NailShapeType>("almond");
  const [nailArtLevel, setNailArtLevel] = useState<"clean" | "chrome" | "editorial_3d">("chrome");
  const [nailInspoNote, setNailInspoNote] = useState("");

  // Wedding Niche Specific State
  const [weddingConsultationType, setWeddingConsultationType] = useState<"studio" | "video">("studio");
  const [weddingVenue, setWeddingVenue] = useState("");
  const [weddingGuestCount, setWeddingGuestCount] = useState<"<40" | "40-80" | "80-150+">("40-80");
  const [weddingColorVision, setWeddingColorVision] = useState("");

  // Filtered Services
  const filteredServices =
    selectedCategory === "all"
      ? config.services
      : config.services.filter((s) => s.category === selectedCategory);

  // Nails Dynamic Price Calculation
  const removalAddon = nailStatus === "biab_removal" ? 150 : nailStatus === "gelx_removal" ? 200 : 0;
  const artAddon =
    nailArtLevel === "chrome" && selectedService.id !== "chrome-glaze"
      ? 100
      : nailArtLevel === "editorial_3d" && selectedService.id !== "editorial-3d"
      ? 250
      : 0;
  const effectiveNailPrice = selectedService.price + removalAddon + artAddon;

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    const formEl = document.getElementById("booking-form-section");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 font-body relative pb-36 sm:pb-32"
      style={{
        backgroundColor: activePalette.bg,
        color: activePalette.text,
      }}
    >
      {/* ================= 1. TOP SWITCHER ================= */}
      <DemoTopSwitcher
        currentDemo={config.id}
        accentColor={activePalette.accent}
        borderColor={activePalette.border}
        textColor={activePalette.text}
        cardBg={activePalette.cardBg}
      />


      {/* Main Responsive Canvas */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-16 sm:space-y-20">

        {/* ================= 3. STUDIO BRAND HERO (3 RADICAL ARCHETYPES) ================= */}

        {/* -------------------------------------------------------------
            ARCHETYPE A: CAKES - TACTILE FRENCH PATISSERIE & WAX SEAL
            ------------------------------------------------------------- */}
        {config.id === "cakes" && (
          <section className="text-center space-y-6 pt-2 max-w-2xl mx-auto">
            {/* Vintage Double-Line Cartouche Frame */}
            <div
              className="p-6 sm:p-8 rounded-3xl border-2 transition-all relative shadow-sm"
              style={{
                backgroundColor: activePalette.cardBg,
                borderColor: activePalette.border,
                outline: `1px solid ${activePalette.border}`,
                outlineOffset: "4px",
              }}
            >
              {/* Bakery Stamp Seal */}
              <div className="flex justify-center -mt-12 sm:-mt-14 mb-3">
                <div
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-2 flex flex-col items-center justify-center transition-transform hover:rotate-6 shadow-md"
                  style={{
                    backgroundColor: activePalette.bg,
                    border: `2px solid ${activePalette.accent}`,
                  }}
                >
                  {config.logoEmblem(activePalette.accent, activePalette.muted, activePalette.border)}
                </div>
              </div>

              {/* Typography Heading */}
              <div className="space-y-2">
                <span
                  className="text-[10px] font-mono tracking-[0.3em] uppercase block font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Fournil Artisanal · Fait Maison
                </span>
                <h1
                  className="text-3xl sm:text-5xl font-black tracking-[0.18em] uppercase"
                  style={{
                    fontFamily: config.fontFamilyHeading,
                    color: activePalette.text,
                  }}
                >
                  {config.brandName}
                </h1>
                <p
                  className="text-xs sm:text-sm font-mono tracking-[0.15em] uppercase pt-0.5"
                  style={{ color: activePalette.muted }}
                >
                  {config.brandSubtitle}
                </p>
              </div>

              {/* French Bakery Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-[11px] font-mono">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border"
                  style={{
                    backgroundColor: activePalette.bg,
                    borderColor: activePalette.border,
                    color: activePalette.muted,
                  }}
                >
                  <FiMapPin size={11} style={{ color: activePalette.accent }} />
                  <span>{config.location}</span>
                </span>

                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold"
                  style={{
                    backgroundColor: activePalette.tagBg,
                    borderColor: activePalette.accent,
                    color: activePalette.accent,
                  }}
                >
                  <span>{config.statusPill}</span>
                </span>

                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full border hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: activePalette.bg,
                    borderColor: activePalette.border,
                    color: activePalette.text,
                  }}
                >
                  <FiInstagram size={11} />
                  <span>{config.instagramHandle}</span>
                </a>
              </div>

              <p
                className="text-xs sm:text-sm font-body leading-relaxed max-w-lg mx-auto pt-4 italic"
                style={{ color: activePalette.muted }}
              >
                &ldquo;{config.brandDescription}&rdquo;
              </p>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            ARCHETYPE B: NAILS - Y2K / HIGH-FASHION CHROME ATELIER
            ------------------------------------------------------------- */}
        {config.id === "nails" && (
          <section
            className="pt-2 sm:pt-4 border-b pb-8 sm:pb-12"
            style={{ borderColor: activePalette.border }}
          >
            <div className="flex flex-col-reverse md:flex-row md:items-end justify-between gap-6 sm:gap-8">
              {/* Left Column: Bold Typographic Headline & Specs */}
              <div className="space-y-4 max-w-xl">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold shadow-sm"
                  style={{
                    backgroundColor: activePalette.tagBg,
                    color: activePalette.accent,
                    border: `1px solid ${activePalette.border}`,
                  }}
                >
                  <span>{config.statusPill}</span>
                  <span>·</span>
                  <span>{config.location}</span>
                </div>

                <div className="space-y-1">
                  <h1
                    className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-none"
                    style={{
                      fontFamily: config.fontFamilyHeading,
                      color: activePalette.text,
                    }}
                  >
                    {config.brandName}
                  </h1>
                  <p
                    className="text-xs sm:text-sm font-mono tracking-wider pt-1 uppercase font-semibold"
                    style={{ color: activePalette.muted }}
                  >
                    {config.brandSubtitle}
                  </p>
                </div>

                <p
                  className="text-xs sm:text-sm font-body leading-relaxed max-w-lg"
                  style={{ color: activePalette.muted }}
                >
                  {config.brandDescription}
                </p>

                {/* High-Fashion Studio Stamps */}
                <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-mono uppercase font-bold">
                  {["100% Japanese Soft Gel", "Zero Damage Apex", "1-on-1 Sessions", "Private Studio 4B"].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md border"
                      style={{
                        backgroundColor: activePalette.cardBg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border hover:opacity-80 transition-opacity font-bold shadow-sm"
                    style={{
                      borderColor: activePalette.accent,
                      backgroundColor: activePalette.cardBg,
                      color: activePalette.text,
                    }}
                  >
                    <FiInstagram size={13} style={{ color: activePalette.accent }} />
                    <span>{config.instagramHandle}</span>
                  </a>

                  <span
                    className="px-3 py-2 rounded-xl border text-[11px]"
                    style={{
                      borderColor: activePalette.border,
                      backgroundColor: activePalette.cardBg,
                      color: activePalette.muted,
                    }}
                  >
                    {config.metaNotes}
                  </span>
                </div>
              </div>

              {/* Right Column: Architectural Monogram Emblem Card */}
              <div className="flex-shrink-0 self-start md:self-end">
                <div
                  className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl p-3 flex flex-col items-center justify-center shadow-lg transition-all border-2 relative overflow-hidden group hover:scale-[1.02]"
                  style={{
                    backgroundColor: activePalette.cardBg,
                    borderColor: activePalette.accent,
                  }}
                >
                  {/* Subtle Corner Stamps */}
                  <span className="absolute top-2 right-2 text-[8px] font-mono tracking-widest uppercase opacity-40">
                    2024
                  </span>
                  <span className="absolute bottom-2 left-2 text-[8px] font-mono tracking-widest uppercase opacity-40">
                    4B
                  </span>
                  {config.logoEmblem(activePalette.accent, activePalette.muted, activePalette.border)}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            ARCHETYPE C: WEDDING - LUXURY VOGUE WEDDINGS EXHIBITION
            ------------------------------------------------------------- */}
        {config.id === "wedding" && (
          <section
            className="text-center space-y-6 pt-2 pb-6 border-b"
            style={{ borderColor: activePalette.border }}
          >
            {/* Top Delicate Seal with Hairline Divider Lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 max-w-xl mx-auto">
              <div className="h-px flex-1" style={{ backgroundColor: activePalette.border }} />
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center p-2 shadow-sm"
                style={{
                  backgroundColor: activePalette.cardBg,
                  border: `1px solid ${activePalette.border}`,
                }}
              >
                {config.logoEmblem(activePalette.accent, activePalette.muted, activePalette.border)}
              </div>
              <div className="h-px flex-1" style={{ backgroundColor: activePalette.border }} />
            </div>

            {/* Centered Editorial Titles */}
            <div className="space-y-3 max-w-xl mx-auto">
              <span
                className="text-[10px] font-mono tracking-[0.35em] uppercase block font-semibold"
                style={{ color: activePalette.accent }}
              >
                Atelier Floral · Haute Cérémonie
              </span>
              <h1
                className="text-4xl sm:text-6xl font-light tracking-[0.2em] uppercase"
                style={{
                  fontFamily: config.fontFamilyHeading,
                  color: activePalette.text,
                }}
              >
                {config.brandName}
              </h1>
              <p
                className="text-xs sm:text-sm font-body italic leading-relaxed max-w-md mx-auto"
                style={{ color: activePalette.muted }}
              >
                {config.brandDescription}
              </p>
            </div>

            {/* 3-Column Exhibition Bar */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border-y py-3.5 text-xs font-mono max-w-3xl mx-auto"
              style={{ borderColor: activePalette.border }}
            >
              <div className="py-1.5 sm:py-0 px-3 flex items-center justify-center gap-1.5" style={{ color: activePalette.muted }}>
                <FiMapPin size={12} style={{ color: activePalette.accent }} />
                <span>{config.location}</span>
              </div>
              <div className="py-1.5 sm:py-0 px-3 flex items-center justify-center gap-1.5 font-semibold" style={{ color: activePalette.text }}>
                <span>{config.statusPill}</span>
              </div>
              <div className="py-1.5 sm:py-0 px-3 flex items-center justify-center gap-1.5" style={{ color: activePalette.muted }}>
                <FiInstagram size={12} />
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {config.instagramHandle}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ================= 4. CURATED LOOKBOOK (NO ARTIFICIAL NUMBERING) ================= */}

        {/* -------------------------------------------------------------
            LOOKBOOK A: CAKES - THE PASTRY DISPLAY CASE
            ------------------------------------------------------------- */}
        {config.id === "cakes" && (
          <section id="lookbook-gallery" className="space-y-5">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  La Vitrine · Pastry Counter
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                  Fresh Daily Drops
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                Boutique display · Tap to inspect details
              </p>
            </div>

            {/* 3x2 Grid styled like pastry counter display cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
              {config.lookbook.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(item)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border"
                  style={{
                    borderColor: activePalette.border,
                    backgroundColor: activePalette.cardBg,
                  }}
                >
                  {/* Photo with 4:5 Aspect Ratio */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-[11px] text-white font-mono flex items-center gap-1">
                        <FiMaximize2 size={11} /> Agrandir la vue
                      </span>
                    </div>
                  </div>

                  {/* Tactile French Pastry Tag - Clean Editorial, zero artificial numbering */}
                  <div className="p-3 sm:p-3.5 text-left border-t" style={{ borderColor: activePalette.border }}>
                    <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider mb-1" style={{ color: activePalette.accent }}>
                      <span>Édition Limitée</span>
                      <span>Fait maison</span>
                    </div>
                    <h3
                      className="text-xs sm:text-sm font-bold truncate leading-snug"
                      style={{ color: activePalette.text }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[10px] sm:text-[11px] font-mono truncate pt-0.5"
                      style={{ color: activePalette.muted }}
                    >
                      {item.tag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            LOOKBOOK B: NAILS - HIGH-FASHION ASYMMETRIC MACRO GALLERY
            ------------------------------------------------------------- */}
        {config.id === "nails" && (
          <section id="lookbook-gallery" className="space-y-5">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Macro Portfolio
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                  Studio Sets &amp; Gel Architecture
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                Asymmetric macro gallery · Tap to inspect apex &amp; chrome
              </p>
            </div>

            {/* Asymmetric Magazine Collage Grid */}
            <div className="space-y-3 sm:space-y-4">
              {/* Row 1: 1 Featured Wide Hero Card (2 cols) + 1 Detail Portrait Card (1 col) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {/* 2-Column Wide Hero Card */}
                {config.lookbook[0] && (
                  <div
                    onClick={() => setLightboxImage(config.lookbook[0])}
                    className="md:col-span-2 group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 hover:shadow-xl"
                    style={{
                      borderColor: activePalette.accent,
                      backgroundColor: activePalette.cardBg,
                    }}
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={config.lookbook[0].src}
                        alt={config.lookbook[0].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 680px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                        unoptimized
                      />
                      {/* Clean Studio Pill Tag */}
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold tracking-wider shadow-md backdrop-blur-md"
                          style={{
                            backgroundColor: `${activePalette.cardBg}E6`,
                            color: activePalette.accent,
                            border: `1px solid ${activePalette.accent}`,
                          }}
                        >
                          Natural Almond · French Micro-Tip
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4 sm:p-5">
                        <div className="text-left text-white space-y-0.5">
                          <h3 className="text-base sm:text-lg font-bold font-heading">
                            {config.lookbook[0].title}
                          </h3>
                          <p className="text-xs font-mono text-zinc-300">
                            {config.lookbook[0].tag}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1 Detail Card */}
                {config.lookbook[1] && (
                  <div
                    onClick={() => setLightboxImage(config.lookbook[1])}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 hover:shadow-lg flex flex-col"
                    style={{
                      borderColor: activePalette.border,
                      backgroundColor: activePalette.cardBg,
                    }}
                  >
                    <div className="relative aspect-[4/5] md:aspect-auto md:flex-1 w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={config.lookbook[1].src}
                        alt={config.lookbook[1].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                        unoptimized
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-2.5 py-1 rounded text-[9px] font-mono uppercase font-bold tracking-wider shadow-sm"
                          style={{
                            backgroundColor: activePalette.cardBg,
                            color: activePalette.text,
                            border: `1px solid ${activePalette.border}`,
                          }}
                        >
                          Titanium Liquid Chrome
                        </span>
                      </div>
                    </div>
                    <div className="p-3 text-left border-t" style={{ borderColor: activePalette.border }}>
                      <h3 className="text-xs sm:text-sm font-bold truncate" style={{ color: activePalette.text }}>
                        {config.lookbook[1].title}
                      </h3>
                      <p className="text-[10px] font-mono truncate pt-0.5" style={{ color: activePalette.muted }}>
                        {config.lookbook[1].tag}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 2: 4 Grid Cards Below (Items 2, 3, 4, 5) with genuine style tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {config.lookbook.slice(2, 6).map((item, idx) => {
                  const tagLabels = ["Negative Space", "Cuticle Care", "Apex BIAB", "3D Molten Gel"];
                  return (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage(item)}
                      className="group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                      style={{
                        borderColor: activePalette.border,
                        backgroundColor: activePalette.cardBg,
                      }}
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 220px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority
                          unoptimized
                        />
                        <div className="absolute top-2 left-2">
                          <span
                            className="px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase"
                            style={{
                              backgroundColor: `${activePalette.cardBg}E6`,
                              color: activePalette.text,
                              border: `1px solid ${activePalette.border}`,
                            }}
                          >
                            {tagLabels[idx] || "Studio Set"}
                          </span>
                        </div>
                      </div>
                      <div className="p-2.5 text-left border-t" style={{ borderColor: activePalette.border }}>
                        <h4 className="text-xs font-bold truncate" style={{ color: activePalette.text }}>
                          {item.title}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] font-mono truncate" style={{ color: activePalette.muted }}>
                          {item.tag.split("·")[0]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            LOOKBOOK C: WEDDING - BOTANICAL MONOGRAPH ARCHIVAL PORTFOLIO
            ------------------------------------------------------------- */}
        {config.id === "wedding" && (
          <section id="lookbook-gallery" className="space-y-6">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Archival Portfolio
                </span>
                <h2 className="text-xl sm:text-2xl font-light font-heading tracking-wide">
                  Selected Floral Commissions
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                Private Portfolio · Oslo &amp; Viken Weddings
              </p>
            </div>

            {/* Row 1: Diptych (2 Large Side-by-Side Portrait Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
              {config.lookbook.slice(0, 2).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(item)}
                  className="group cursor-pointer space-y-3"
                >
                  <div
                    className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border shadow-sm transition-all duration-700 group-hover:shadow-xl"
                    style={{
                      borderColor: activePalette.border,
                      backgroundColor: activePalette.cardBg,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 450px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      unoptimized
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest backdrop-blur-md"
                        style={{
                          backgroundColor: `${activePalette.cardBg}E6`,
                          color: activePalette.text,
                          border: `1px solid ${activePalette.border}`,
                        }}
                      >
                        {idx === 0 ? "The Bridal Bouquet" : "Ceremony Ground Arch"}
                      </span>
                    </div>
                  </div>
                  <div className="text-center space-y-0.5 pt-1">
                    <h3 className="text-sm sm:text-base font-medium font-heading tracking-wide" style={{ color: activePalette.text }}>
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono italic" style={{ color: activePalette.muted }}>
                      {item.tag}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Full-Width Ceremony Landscape Banner */}
            {config.lookbook[3] && (
              <div
                onClick={() => setLightboxImage(config.lookbook[3])}
                className="group cursor-pointer space-y-2 pt-2"
              >
                <div
                  className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border shadow-sm transition-all duration-700 group-hover:shadow-xl"
                  style={{
                    borderColor: activePalette.border,
                    backgroundColor: activePalette.cardBg,
                  }}
                >
                  <Image
                    src={config.lookbook[3].src}
                    alt={config.lookbook[3].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest backdrop-blur-md"
                      style={{
                        backgroundColor: `${activePalette.cardBg}E6`,
                        color: activePalette.text,
                        border: `1px solid ${activePalette.border}`,
                      }}
                    >
                      Outdoor Ceremony Landscape
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
                  <h3 className="text-xs sm:text-sm font-medium font-heading" style={{ color: activePalette.text }}>
                    {config.lookbook[3].title}
                  </h3>
                  <p className="text-[11px] font-mono italic" style={{ color: activePalette.muted }}>
                    {config.lookbook[3].tag}
                  </p>
                </div>
              </div>
            )}

            {/* Row 3: 3 Detail Vignettes (Items 2, 4, 5) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 pt-2">
              {[
                { item: config.lookbook[2], label: "Bridesmaid Posies" },
                { item: config.lookbook[4], label: "Curated Tablescape" },
                { item: config.lookbook[5], label: "Boutonnière Detail" },
              ]
                .filter((v) => v.item)
                .map((entry, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxImage(entry.item)}
                    className="group cursor-pointer space-y-2"
                  >
                    <div
                      className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border transition-all duration-500 group-hover:shadow-md"
                      style={{
                        borderColor: activePalette.border,
                        backgroundColor: activePalette.cardBg,
                      }}
                    >
                      <Image
                        src={entry.item.src}
                        alt={entry.item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                        unoptimized
                      />
                      <div className="absolute top-2 left-2">
                        <span
                          className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider"
                          style={{
                            backgroundColor: `${activePalette.cardBg}E6`,
                            color: activePalette.text,
                          }}
                        >
                          {entry.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-left space-y-0.5">
                      <h4 className="text-xs font-semibold truncate" style={{ color: activePalette.text }}>
                        {entry.item.title}
                      </h4>
                      <p className="text-[10px] font-mono truncate" style={{ color: activePalette.muted }}>
                        {entry.item.tag.split("·")[0]}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ================= 5. RADICAL MENU REDESIGN (ZERO-CARD LAYOUTS) ================= */}

        {/* -------------------------------------------------------------
            MENU A: CAKES - AUTHENTIC PARISIAN BRASSERIE CARTE (ZERO CARDS)
            ------------------------------------------------------------- */}
        {config.id === "cakes" && (
          <section id="services-menu" className="space-y-6">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  La Carte du Fournil
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                  Pâtisserie &amp; Tarifs
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                Prix en NOK · Ingrédients bio de première qualité · Précommandes
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {config.categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border"
                    style={{
                      backgroundColor: active ? activePalette.accent : "transparent",
                      color: active ? activePalette.accentFg : activePalette.text,
                      borderColor: active ? activePalette.accent : activePalette.border,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Parisian Carte Sheet (Continuous Layout, Zero SaaS Cards) */}
            <div
              className="p-6 sm:p-10 rounded-3xl border-2 transition-all space-y-8 shadow-sm"
              style={{
                backgroundColor: activePalette.cardBg,
                borderColor: activePalette.border,
                outline: `1px solid ${activePalette.border}`,
                outlineOffset: "4px",
              }}
            >
              {/* Carte Top Title Ornament */}
              <div className="text-center space-y-1 pb-4 border-b border-dashed" style={{ borderColor: activePalette.border }}>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase block" style={{ color: activePalette.accent }}>
                  Atelier de Pâtisserie · Frogner Oslo
                </span>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider font-heading" style={{ color: activePalette.text }}>
                  Carte des Créations &amp; Commandes
                </h3>
                <p className="text-xs font-mono italic" style={{ color: activePalette.muted }}>
                  Chaque pièce est confectionnée à la main avec du beurre français AOP et des vanilles grand cru
                </p>
              </div>

              {/* Items List - Continuous Dot-Leader Brasserie Lines */}
              <div className="space-y-6">
                {filteredServices.map((service) => {
                  const isChosen = selectedService.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleSelectService(service)}
                      className={`p-3 sm:p-4 rounded-xl transition-all cursor-pointer group ${
                        isChosen ? "ring-1" : "hover:bg-black/[0.02]"
                      }`}
                      style={{
                        backgroundColor: isChosen ? activePalette.tagBg : "transparent",
                        outline: isChosen ? `1px solid ${activePalette.accent}` : "none",
                      }}
                    >
                      {/* Top Line: Title + Dot Leader + Price */}
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="flex items-baseline gap-2 flex-shrink-0">
                          <h4
                            className="text-sm sm:text-base font-bold font-heading tracking-wide transition-colors"
                            style={{ color: isChosen ? activePalette.accent : activePalette.text }}
                          >
                            {service.name}
                          </h4>
                          <span className="text-[11px] font-mono italic opacity-60 hidden sm:inline" style={{ color: activePalette.muted }}>
                            ({service.servings || service.leadTime})
                          </span>
                        </div>

                        {/* Dot Leader Bridge */}
                        <div
                          className="flex-1 border-b border-dotted mx-2 hidden sm:block opacity-30"
                          style={{ borderColor: activePalette.text }}
                        />

                        {/* Price & Action */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-sm sm:text-base font-bold font-mono" style={{ color: activePalette.text }}>
                            {service.price > 0 ? `${service.price},-` : "Offert"}
                          </span>

                          <button
                            type="button"
                            className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all"
                            style={{
                              backgroundColor: isChosen ? activePalette.accent : "transparent",
                              color: isChosen ? activePalette.accentFg : activePalette.accent,
                              border: `1px solid ${activePalette.accent}`,
                            }}
                          >
                            {isChosen ? "✓ Commandé" : "Choisir"}
                          </button>
                        </div>
                      </div>

                      {/* Description Line */}
                      <p
                        className="text-xs font-body italic leading-relaxed pt-1 max-w-2xl"
                        style={{ color: activePalette.muted }}
                      >
                        {service.description}
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[10px] font-mono sm:hidden" style={{ color: activePalette.muted }}>
                        <span>{service.servings}</span>
                        <span>·</span>
                        <span>{service.leadTime}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Carte Footer Note */}
              <div
                className="pt-4 border-t border-dashed flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                style={{ borderColor: activePalette.border, color: activePalette.muted }}
              >
                <span>Commandes à retirer au 14 Bygdøy Allé, Frogner</span>
                <span className="font-semibold" style={{ color: activePalette.accent }}>
                  Sélection active: {selectedService.name} ({selectedService.price} kr)
                </span>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            MENU B: NAILS - THE DAVID MALLETT DOT-LEADER TREATMENT LEDGER (ZERO CARDS)
            ------------------------------------------------------------- */}
        {config.id === "nails" && (
          <section id="services-menu" className="space-y-6">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Treatment Ledger
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                  Studio Services &amp; Rates
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                Russian dry cuticle prep included with all services · Transparent NOK rates
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {config.categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border font-bold"
                    style={{
                      backgroundColor: active ? activePalette.accent : "transparent",
                      color: active ? activePalette.accentFg : activePalette.text,
                      borderColor: active ? activePalette.accent : activePalette.border,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Full-Bleed Treatment Ledger Table (David Mallett / Pear.no Style, Zero Box Cards) */}
            <div
              className="border-t border-b divide-y transition-all"
              style={{ borderColor: activePalette.border }}
            >
              {filteredServices.map((service) => {
                const isChosen = selectedService.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectService(service)}
                    className={`py-4 sm:py-5 px-3 sm:px-4 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 ${
                      isChosen ? "border-l-4" : "hover:bg-black/[0.02]"
                    }`}
                    style={{
                      backgroundColor: isChosen ? activePalette.tagBg : "transparent",
                      borderLeftColor: isChosen ? activePalette.accent : "transparent",
                    }}
                  >
                    {/* Left: Duration Pill, Service Name, and Description */}
                    <div className="space-y-1 flex-1 max-w-xl">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: activePalette.cardBg,
                            color: activePalette.accent,
                            border: `1px solid ${activePalette.border}`,
                          }}
                        >
                          {service.servings}
                        </span>

                        <h3
                          className="text-sm sm:text-base font-bold font-heading tracking-tight"
                          style={{ color: isChosen ? activePalette.accent : activePalette.text }}
                        >
                          {service.name}
                        </h3>
                      </div>

                      <p
                        className="text-xs font-body leading-relaxed pt-0.5 line-clamp-2"
                        style={{ color: activePalette.muted }}
                      >
                        {service.description}
                      </p>
                    </div>

                    {/* Desktop Continuous Dot-Leader Line */}
                    <div
                      className="hidden md:block flex-1 border-b border-dotted mx-4 opacity-25"
                      style={{ borderColor: activePalette.text }}
                    />

                    {/* Right: Monospace Rate & Selection State */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0 pt-1 sm:pt-0">
                      <div className="text-right">
                        <span className="text-base sm:text-lg font-mono font-black block" style={{ color: activePalette.text }}>
                          {service.price.toLocaleString("no-NO")} kr
                        </span>
                        <span className="text-[10px] font-mono block opacity-60" style={{ color: activePalette.muted }}>
                          {service.leadTime}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all flex-shrink-0"
                        style={{
                          backgroundColor: isChosen ? activePalette.accent : "transparent",
                          borderColor: isChosen ? activePalette.accent : activePalette.border,
                          color: isChosen ? activePalette.accentFg : activePalette.muted,
                        }}
                      >
                        {isChosen ? <FiCheck size={14} /> : <span className="text-xs font-mono">+</span>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Summary Bar */}
            <div
              className="p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono"
              style={{
                backgroundColor: activePalette.cardBg,
                borderColor: activePalette.border,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activePalette.accent }} />
                <span>Selected: <strong>{selectedService.name}</strong></span>
              </div>
              <span className="font-bold" style={{ color: activePalette.accent }}>
                {effectiveNailPrice.toLocaleString("no-NO")} kr total
              </span>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            MENU C: WEDDING - ARCHITECTURAL MONOGRAPH COMMISSION GUIDE (ZERO CARDS)
            ------------------------------------------------------------- */}
        {config.id === "wedding" && (
          <section id="services-menu" className="space-y-6">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Commission Index
                </span>
                <h2 className="text-xl sm:text-2xl font-light font-heading tracking-wide">
                  Wedding Floral Suites &amp; Investment
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                Transparent pricing with itemized deliverables · No production surprises
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {config.categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border font-medium"
                    style={{
                      backgroundColor: active ? activePalette.accent : "transparent",
                      color: active ? activePalette.accentFg : activePalette.muted,
                      borderColor: active ? activePalette.accent : activePalette.border,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Architectural Full-Bleed Suite Layout */}
            <div className="space-y-6">
              {/* Highlighted Flagship Suite Feature (Item 4) */}
              {(selectedCategory === "all" || selectedCategory === "ceremony") && (
                <div
                  onClick={() => handleSelectService(config.services[4])}
                  className="p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer relative shadow-sm"
                  style={{
                    backgroundColor: selectedService.id === config.services[4].id ? activePalette.tagBg : activePalette.cardBg,
                    borderColor: activePalette.accent,
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider"
                        style={{
                          backgroundColor: activePalette.accent,
                          color: activePalette.accentFg,
                        }}
                      >
                        <FiStar size={11} /> Flagship Commission · Limited 12 Per Season
                      </span>
                      <h3 className="text-xl sm:text-2xl font-normal font-heading tracking-wide pt-1" style={{ color: activePalette.text }}>
                        {config.services[4].name}
                      </h3>
                      <p className="text-xs sm:text-sm font-body italic leading-relaxed" style={{ color: activePalette.muted }}>
                        {config.services[4].description}
                      </p>
                    </div>

                    <div className="text-left sm:text-right flex-shrink-0">
                      <span className="text-2xl sm:text-3xl font-mono font-black block" style={{ color: activePalette.text }}>
                        {config.services[4].price.toLocaleString("no-NO")} kr
                      </span>
                      <span className="text-xs font-mono" style={{ color: activePalette.muted }}>
                        {config.services[4].leadTime}
                      </span>
                    </div>
                  </div>

                  {/* Included Deliverables Architectural Checklist */}
                  {config.services[4].included && (
                    <div className="pt-4 mt-4 border-t space-y-2" style={{ borderColor: activePalette.border }}>
                      <span className="text-[10px] font-mono uppercase tracking-wider block font-semibold" style={{ color: activePalette.accent }}>
                        Itemized Floral Deliverables Checklist:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        {config.services[4].included.map((item, i) => (
                          <div key={i} className="flex items-center gap-2" style={{ color: activePalette.text }}>
                            <FiCheck size={13} style={{ color: activePalette.accent }} className="flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 mt-3 flex items-center justify-between text-xs font-mono">
                    <span style={{ color: activePalette.muted }}>
                      {selectedService.id === config.services[4].id ? "✓ Currently Selected Wedding Suite" : "Touch to select this flagship suite"}
                    </span>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold shadow-sm"
                      style={{
                        backgroundColor: activePalette.accent,
                        color: activePalette.accentFg,
                      }}
                    >
                      {selectedService.id === config.services[4].id ? "Selected" : "Select Suite"}
                    </button>
                  </div>
                </div>
              )}

              {/* Architectural Monograph Table for Remaining Services */}
              <div
                className="border-t border-b divide-y transition-all"
                style={{ borderColor: activePalette.border }}
              >
                {filteredServices
                  .filter((s) => (selectedCategory === "all" ? s.id !== config.services[4].id : true))
                  .map((service) => {
                    const isChosen = selectedService.id === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => handleSelectService(service)}
                        className={`py-5 px-3 sm:px-5 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                          isChosen ? "border-l-4" : "hover:bg-black/[0.02]"
                        }`}
                        style={{
                          backgroundColor: isChosen ? activePalette.tagBg : "transparent",
                          borderLeftColor: isChosen ? activePalette.accent : "transparent",
                        }}
                      >
                        <div className="space-y-1.5 flex-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold"
                              style={{
                                backgroundColor: activePalette.cardBg,
                                color: activePalette.accent,
                                border: `1px solid ${activePalette.border}`,
                              }}
                            >
                              {service.servings}
                            </span>
                            <h4
                              className="text-base sm:text-lg font-medium font-heading tracking-wide"
                              style={{ color: isChosen ? activePalette.accent : activePalette.text }}
                            >
                              {service.name}
                            </h4>
                          </div>

                          <p className="text-xs font-body italic leading-relaxed" style={{ color: activePalette.muted }}>
                            {service.description}
                          </p>

                          {service.included && (
                            <div className="pt-2 space-y-1 text-xs font-mono" style={{ color: activePalette.muted }}>
                              {service.included.slice(0, 2).map((inc, i) => (
                                <div key={i} className="flex items-start gap-1.5">
                                  <FiCheck size={11} style={{ color: activePalette.accent }} className="mt-0.5 flex-shrink-0" />
                                  <span className="text-[11px] leading-snug">{inc}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Monograph Rate on Right */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0 pt-1 sm:pt-0">
                          <div className="text-right">
                            <span className="text-base sm:text-lg font-mono font-bold block" style={{ color: activePalette.text }}>
                              {service.price > 0 ? `${service.price.toLocaleString("no-NO")} kr` : "Complimentary"}
                            </span>
                            <span className="text-[10px] font-mono block opacity-60" style={{ color: activePalette.muted }}>
                              {service.leadTime}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all"
                            style={{
                              backgroundColor: isChosen ? activePalette.accent : "transparent",
                              color: isChosen ? activePalette.accentFg : activePalette.accent,
                              border: `1px solid ${activePalette.accent}`,
                            }}
                          >
                            {isChosen ? "Selected" : "Choose"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {/* ================= 6. RADICAL BOOKING REDESIGN (3 CONTEXTUAL FLOWS) ================= */}

        <section id="booking-form-section" className="space-y-6 pt-4">
          <div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
            style={{ borderColor: activePalette.border }}
          >
            <div>
              <span
                className="text-[10px] font-mono uppercase tracking-[0.25em] font-semibold"
                style={{ color: activePalette.accent }}
              >
                Reservation &amp; Inquiry
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                {config.bookingConfig.sectionTitle}
              </h2>
            </div>
            <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
              {config.bookingConfig.sectionSubtitle}
            </p>
          </div>

          {!bookingConfirmed ? (
            /* -------------------------------------------------------------
               BOOKING FORM A: CAKES - TACTILE TEAR-OFF BAKERY CHIT
               ------------------------------------------------------------- */
            config.id === "cakes" ? (
              <form
                onSubmit={handleBookingSubmit}
                className="rounded-3xl border-2 border-dashed p-6 sm:p-10 space-y-8 shadow-sm relative"
                style={{
                  backgroundColor: activePalette.cardBg,
                  borderColor: activePalette.border,
                }}
              >
                {/* Perforated Chit Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-dashed" style={{ borderColor: activePalette.border }}>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest block" style={{ color: activePalette.accent }}>
                      BON DE COMMANDE · TICKET N° MS-849
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: activePalette.muted }}>
                      Fournil Maison Sucre · Bygdøy Allé 14, Frogner
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold" style={{ color: activePalette.text }}>
                      Article Sélectionné: {selectedService.name}
                    </span>
                    <span className="text-xs font-mono block font-black" style={{ color: activePalette.accent }}>
                      Total: {selectedService.price} NOK
                    </span>
                  </div>
                </div>

                {/* Step 1: Collection Day */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                    1. Jour de Retrait au Fournil (Pickup Date)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {config.bookingConfig.dates.map((d, i) => {
                      const isSelected = selectedDate.full === d.full;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className="py-3 px-2 rounded-xl text-center transition-all border flex flex-col items-center justify-center group"
                          style={{
                            backgroundColor: isSelected ? activePalette.accent : "transparent",
                            color: isSelected ? activePalette.accentFg : activePalette.text,
                            borderColor: isSelected ? activePalette.accent : activePalette.border,
                          }}
                        >
                          <span className="text-[10px] font-mono uppercase opacity-75">{d.day}</span>
                          <span className="text-lg font-black font-mono leading-none pt-0.5">{d.date}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Fresh Bake Window (Morning vs Afternoon) */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                    2. Créneau de Cuisson Fraîche (Bake Window)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCakeBakeWindow("morning")}
                      className="p-3.5 rounded-xl border text-left transition-all flex items-center justify-between"
                      style={{
                        backgroundColor: cakeBakeWindow === "morning" ? activePalette.tagBg : "transparent",
                        borderColor: cakeBakeWindow === "morning" ? activePalette.accent : activePalette.border,
                        color: activePalette.text,
                      }}
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-mono font-bold block">☀️ Fournée du Matin (10:00 – 13:00)</span>
                        <span className="text-[10px] font-mono opacity-70">Sorti du four à 06:00 · Idéal pour les déjeuners</span>
                      </div>
                      {cakeBakeWindow === "morning" && <FiCheck size={14} style={{ color: activePalette.accent }} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setCakeBakeWindow("afternoon")}
                      className="p-3.5 rounded-xl border text-left transition-all flex items-center justify-between"
                      style={{
                        backgroundColor: cakeBakeWindow === "afternoon" ? activePalette.tagBg : "transparent",
                        borderColor: cakeBakeWindow === "afternoon" ? activePalette.accent : activePalette.border,
                        color: activePalette.text,
                      }}
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-mono font-bold block">🌙 Fournée de l&apos;Après-Midi (14:00 – 18:00)</span>
                        <span className="text-[10px] font-mono opacity-70">Finition glacée à midi · Idéal pour les soirées</span>
                      </div>
                      {cakeBakeWindow === "afternoon" && <FiCheck size={14} style={{ color: activePalette.accent }} />}
                    </button>
                  </div>
                </div>

                {/* Step 3: Tactile Handwritten Buttercream Inscription Card */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                    3. Message Personnalisé Écrit au Cornet de Chocolat (Optionnel)
                  </label>
                  <div
                    className="p-4 rounded-xl border space-y-2"
                    style={{
                      backgroundColor: activePalette.tagBg,
                      borderColor: activePalette.border,
                    }}
                  >
                    <input
                      type="text"
                      value={cakeInscription}
                      onChange={(e) => setCakeInscription(e.target.value)}
                      placeholder="ex: 'Joyeux Anniversaire Julie 25' ou 'Pour Toujours'"
                      className="w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-mono focus:outline-none"
                      style={{
                        backgroundColor: activePalette.cardBg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                    <span className="text-[10px] font-mono italic block opacity-75" style={{ color: activePalette.muted }}>
                      Calligraphié à la main sur le gâteau avec ganache noire ou glaçage royal
                    </span>
                  </div>
                </div>

                {/* Step 4: Contact & Allergies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                      Nom et Prénom (Full Name) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Camille Bernard"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                      style={{
                        backgroundColor: activePalette.bg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                      Téléphone SMS (Pour notification de retrait) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+47 000 00 000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                      style={{
                        backgroundColor: activePalette.bg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: activePalette.accent,
                      color: activePalette.accentFg,
                    }}
                  >
                    <FiShoppingBag size={16} />
                    <span>
                      Confirmer la Commande · {selectedService.price} NOK
                    </span>
                  </button>
                  <p className="text-[10px] font-mono text-center pt-2" style={{ color: activePalette.muted }}>
                    Retrait direct à l&apos;Atelier Frogner · Règlement par Vipps ou Carte lors du retrait
                  </p>
                </div>
              </form>
            ) : /* -------------------------------------------------------------
               BOOKING FORM B: NAILS - MINIMALIST SCANDINAVIAN CHAIR SLIP
               ------------------------------------------------------------- */
            config.id === "nails" ? (
              <form
                onSubmit={handleBookingSubmit}
                className="p-6 sm:p-10 rounded-2xl border transition-all space-y-8 shadow-sm"
                style={{
                  backgroundColor: activePalette.cardBg,
                  borderColor: activePalette.border,
                }}
              >
                {/* Minimalist Top Chair Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b" style={{ borderColor: activePalette.border }}>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest block" style={{ color: activePalette.accent }}>
                      STUDIO KLØ · CHAIR RESERVATION SLIP
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: activePalette.muted }}>
                      Studio 4B, Thorvald Meyers gate, Grünerløkka
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold block" style={{ color: activePalette.text }}>
                      {selectedService.name}
                    </span>
                    <span className="text-sm font-mono font-black" style={{ color: activePalette.accent }}>
                      {effectiveNailPrice.toLocaleString("no-NO")} kr total
                    </span>
                  </div>
                </div>

                {/* 1. Visual SVG Nail Shape Architecture Configurator */}
                <NailShapeSelector
                  selectedShape={nailShape}
                  onSelectShape={setNailShape}
                  accentColor={activePalette.accent}
                  accentFg={activePalette.accentFg}
                  cardBg={activePalette.bg}
                  borderColor={activePalette.border}
                  textColor={activePalette.text}
                  tagBg={activePalette.tagBg}
                />

                {/* 2. Natural Nail Status & Art Complexity Tiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current Nails Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      Current Nail Status
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { id: "bare", label: "Bare Natural Nails", extra: "+0 kr" },
                        { id: "biab_removal", label: "Old BIAB (Removal)", extra: "+150 kr" },
                        { id: "gelx_removal", label: "Old Extensions On", extra: "+200 kr" },
                      ].map((item) => {
                        const isSelected = nailStatus === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setNailStatus(item.id as any)}
                            className="w-full p-2.5 rounded-lg text-left border text-xs font-mono transition-all flex items-center justify-between"
                            style={{
                              backgroundColor: isSelected ? activePalette.tagBg : "transparent",
                              borderColor: isSelected ? activePalette.accent : activePalette.border,
                              color: activePalette.text,
                            }}
                          >
                            <span className="font-semibold">{item.label}</span>
                            <span className="text-[10px] opacity-80">{item.extra}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Art Complexity */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      Art Level
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { id: "clean", label: "Clean Single Tone", add: "+0 kr" },
                        { id: "chrome", label: "Titanium Chrome / Glaze", add: "+100 kr" },
                        { id: "editorial_3d", label: "3D Molten Sculpting", add: "+250 kr" },
                      ].map((art) => {
                        const isSelected = nailArtLevel === art.id;
                        return (
                          <button
                            key={art.id}
                            type="button"
                            onClick={() => setNailArtLevel(art.id as any)}
                            className="w-full p-2.5 rounded-lg text-left border text-xs font-mono transition-all flex items-center justify-between"
                            style={{
                              backgroundColor: isSelected ? activePalette.tagBg : "transparent",
                              borderColor: isSelected ? activePalette.accent : activePalette.border,
                              color: activePalette.text,
                            }}
                          >
                            <span className="font-semibold">{art.label}</span>
                            <span className="text-[10px] opacity-80">{art.add}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Chair Date & Time Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      Appointment Date
                    </label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {config.bookingConfig.dates.map((d, i) => {
                        const isSelected = selectedDate.full === d.full;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedDate(d)}
                            className="py-2.5 px-1 rounded-lg text-center transition-all border flex flex-col items-center justify-center"
                            style={{
                              backgroundColor: isSelected ? activePalette.accent : "transparent",
                              color: isSelected ? activePalette.accentFg : activePalette.text,
                              borderColor: isSelected ? activePalette.accent : activePalette.border,
                            }}
                          >
                            <span className="text-[9px] font-mono uppercase opacity-75">{d.day}</span>
                            <span className="text-base font-bold font-mono">{d.date}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      Chair Slot
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {config.bookingConfig.timeSlots.slice(0, 4).map((slot, i) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className="py-2 px-2 rounded-lg text-center text-xs font-mono transition-all border font-semibold truncate"
                            style={{
                              backgroundColor: isSelected ? activePalette.accent : "transparent",
                              color: isSelected ? activePalette.accentFg : activePalette.text,
                              borderColor: isSelected ? activePalette.accent : activePalette.border,
                            }}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. Minimalist Scandinavian Underlined Inputs (Zero Box Cards) */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                    Client Specifications &amp; Contact
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full py-2.5 bg-transparent border-b-2 text-xs font-mono focus:outline-none transition-colors"
                      style={{
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Mobile Phone (Vipps) *"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full py-2.5 bg-transparent border-b-2 text-xs font-mono focus:outline-none transition-colors"
                      style={{
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Inspo notes / length preference (optional)"
                    value={nailInspoNote}
                    onChange={(e) => setNailInspoNote(e.target.value)}
                    className="w-full py-2.5 bg-transparent border-b-2 text-xs font-mono focus:outline-none transition-colors"
                    style={{
                      borderColor: activePalette.border,
                      color: activePalette.text,
                    }}
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: activePalette.accent,
                      color: activePalette.accentFg,
                    }}
                  >
                    <FiCheckCircle size={16} />
                    <span>
                      Reserve Studio Chair · {effectiveNailPrice.toLocaleString("no-NO")} kr
                    </span>
                  </button>
                  <p className="text-[10px] font-mono text-center pt-2" style={{ color: activePalette.muted }}>
                    Russian cuticle prep included · 48h cancellation notice · Studio 4B, Grünerløkka
                  </p>
                </div>
              </form>
            ) : (
              /* -------------------------------------------------------------
                 BOOKING FORM C: WEDDING - BESPOKE COMMISSION DOSSIER
                 ------------------------------------------------------------- */
              <form
                onSubmit={handleBookingSubmit}
                className="p-6 sm:p-10 rounded-3xl border-2 transition-all space-y-8 shadow-sm"
                style={{
                  backgroundColor: activePalette.cardBg,
                  borderColor: activePalette.border,
                }}
              >
                {/* Dossier Header */}
                <div className="text-center space-y-1 pb-4 border-b" style={{ borderColor: activePalette.border }}>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-semibold block" style={{ color: activePalette.accent }}>
                    Wedding Atelier · Season 2025/2026
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light font-heading tracking-wide" style={{ color: activePalette.text }}>
                    Private Commission Inquiry Dossier
                  </h3>
                  <p className="text-xs font-mono italic" style={{ color: activePalette.muted }}>
                    Selected Collection: <strong>{selectedService.name}</strong> ({selectedService.price > 0 ? `${selectedService.price.toLocaleString("no-NO")} kr` : "Complimentary Consultation"})
                  </p>
                </div>

                {/* 1. Consultation Format */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                    1. Consultation Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWeddingConsultationType("studio")}
                      className="p-3.5 rounded-xl border text-left transition-all flex items-center gap-3"
                      style={{
                        backgroundColor: weddingConsultationType === "studio" ? activePalette.tagBg : "transparent",
                        borderColor: weddingConsultationType === "studio" ? activePalette.accent : activePalette.border,
                        color: activePalette.text,
                      }}
                    >
                      <FiCoffee size={18} style={{ color: activePalette.accent }} />
                      <div>
                        <span className="font-bold block text-xs font-mono">In-Studio Coffee &amp; Moodboard</span>
                        <span className="text-[10px] font-mono opacity-70">Oscars gate atelier, Frogner Oslo</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWeddingConsultationType("video")}
                      className="p-3.5 rounded-xl border text-left transition-all flex items-center gap-3"
                      style={{
                        backgroundColor: weddingConsultationType === "video" ? activePalette.tagBg : "transparent",
                        borderColor: weddingConsultationType === "video" ? activePalette.accent : activePalette.border,
                        color: activePalette.text,
                      }}
                    >
                      <FiVideo size={18} style={{ color: activePalette.accent }} />
                      <div>
                        <span className="font-bold block text-xs font-mono">Online Video Consultation</span>
                        <span className="text-[10px] font-mono opacity-70">Google Meet link provided</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Venue & Region */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                    2. Ceremony &amp; Reception Venue Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={weddingVenue}
                    onChange={(e) => setWeddingVenue(e.target.value)}
                    placeholder="e.g. 'Villa Eckbo, Frogner / Losby Gods / Hadeland Glassverk'"
                    className="w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                    style={{
                      backgroundColor: activePalette.bg,
                      borderColor: activePalette.border,
                      color: activePalette.text,
                    }}
                  />
                </div>

                {/* 3. Estimated Guest Count Scale */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                    3. Estimated Guest Count Scale
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "<40", label: "Intimate (<40)" },
                      { id: "40-80", label: "Classic (40–80)" },
                      { id: "80-150+", label: "Grand (80–150+)" },
                    ].map((count) => {
                      const isSelected = weddingGuestCount === count.id;
                      return (
                        <button
                          key={count.id}
                          type="button"
                          onClick={() => setWeddingGuestCount(count.id as any)}
                          className="py-2.5 px-2 rounded-xl border text-xs font-mono text-center transition-all font-semibold"
                          style={{
                            backgroundColor: isSelected ? activePalette.accent : "transparent",
                            color: isSelected ? activePalette.accentFg : activePalette.text,
                            borderColor: isSelected ? activePalette.accent : activePalette.border,
                          }}
                        >
                          {count.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Wedding Date / Preferred Consultation Date */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                    4. Wedding / Consultation Date
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {config.bookingConfig.dates.map((d, i) => {
                      const isSelected = selectedDate.full === d.full;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className="py-2.5 px-2 rounded-xl text-center transition-all border flex flex-col items-center justify-center"
                          style={{
                            backgroundColor: isSelected ? activePalette.accent : "transparent",
                            color: isSelected ? activePalette.accentFg : activePalette.text,
                            borderColor: isSelected ? activePalette.accent : activePalette.border,
                          }}
                        >
                          <span className="text-[10px] font-mono uppercase opacity-75">{d.day}</span>
                          <span className="text-sm font-bold font-mono">{d.date}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Floral Vision Notes */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                    5. Floral Vision &amp; Color Mood (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={weddingColorVision}
                    onChange={(e) => setWeddingColorVision(e.target.value)}
                    placeholder="e.g. 'Soft butter yellow, ivory creams, wild garden greenery, trailing French silk ribbon'"
                    className="w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                    style={{
                      backgroundColor: activePalette.bg,
                      borderColor: activePalette.border,
                      color: activePalette.text,
                    }}
                  />
                </div>

                {/* 6. Couple's Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                      Couple&apos;s Full Names *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Astrid & Magnus"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                      style={{
                        backgroundColor: activePalette.bg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+47 000 00 000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                      style={{
                        backgroundColor: activePalette.bg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: activePalette.accent,
                      color: activePalette.accentFg,
                    }}
                  >
                    <FiFileText size={16} />
                    <span>
                      Submit Wedding Inquiry · {selectedService.price > 0 ? `${selectedService.price.toLocaleString("no-NO")} kr` : "Complimentary Consultation"}
                    </span>
                  </button>
                  <p className="text-[10px] font-mono text-center pt-2" style={{ color: activePalette.muted }}>
                    Strictly limited weddings per season · Proposals locked for 14 days following consultation
                  </p>
                </div>
              </form>
            )
          ) : (
            /* ================= CONFIRMATION VOUCHER / BOOKING PASS ================= */
            <div
              className="p-6 sm:p-10 rounded-3xl border text-center space-y-5 animate-in fade-in duration-300 shadow-md"
              style={{
                backgroundColor: activePalette.cardBg,
                borderColor: activePalette.border,
              }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center shadow-sm"
                style={{ backgroundColor: activePalette.tagBg, color: activePalette.accent }}
              >
                <FiCheck size={24} />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold" style={{ color: activePalette.accent }}>
                  {config.id === "wedding"
                    ? "Wedding Commission Inquiry Received"
                    : config.id === "nails"
                    ? "Studio Klō Digital Booking Pass"
                    : "Bon de Commande Reçu"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading" style={{ color: activePalette.text }}>
                  You&apos;re on the schedule, {clientName || "Friend"}!
                </h3>
                <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                  Confirmation ref: #{config.id.toUpperCase()}-{Math.floor(1000 + Math.random() * 9000)}
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div
                className="max-w-md mx-auto p-4 rounded-xl border text-left text-xs font-mono space-y-2.5"
                style={{
                  backgroundColor: activePalette.bg,
                  borderColor: activePalette.border,
                }}
              >
                <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                  <span style={{ color: activePalette.muted }}>Service / Collection:</span>
                  <span className="font-bold text-right" style={{ color: activePalette.text }}>
                    {selectedService.name}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                  <span style={{ color: activePalette.muted }}>Date &amp; Time:</span>
                  <span className="font-bold" style={{ color: activePalette.text }}>
                    {selectedDate.full} · {config.id === "cakes" ? (cakeBakeWindow === "morning" ? "Fournée Matin (10:00–13:00)" : "Fournée Après-Midi (14:00–18:00)") : selectedTime}
                  </span>
                </div>

                {/* Nails Specs Summary */}
                {config.id === "nails" && (
                  <>
                    <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                      <span style={{ color: activePalette.muted }}>Nail Architecture:</span>
                      <span className="font-bold text-right uppercase" style={{ color: activePalette.accent }}>
                        {nailShape} Shape · {nailArtLevel}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                      <span style={{ color: activePalette.muted }}>Total Rate:</span>
                      <span className="font-bold text-right" style={{ color: activePalette.text }}>
                        {effectiveNailPrice.toLocaleString("no-NO")} kr (Inc. Cuticle Prep)
                      </span>
                    </div>
                  </>
                )}

                {/* Wedding Venue Summary */}
                {config.id === "wedding" && weddingVenue && (
                  <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                    <span style={{ color: activePalette.muted }}>Venue &amp; Guests:</span>
                    <span className="font-bold text-right" style={{ color: activePalette.text }}>
                      {weddingVenue} ({weddingGuestCount})
                    </span>
                  </div>
                )}

                {/* Cake Inscription Summary */}
                {config.id === "cakes" && cakeInscription && (
                  <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                    <span style={{ color: activePalette.muted }}>Inscription:</span>
                    <span className="font-bold text-right truncate max-w-[200px]" style={{ color: activePalette.text }}>
                      &ldquo;{cakeInscription}&rdquo;
                    </span>
                  </div>
                )}

                <div className="flex justify-between pt-1">
                  <span style={{ color: activePalette.muted }}>Studio / Location:</span>
                  <span className="font-bold" style={{ color: activePalette.accent }}>
                    {config.locationDetails}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(false)}
                  className="px-5 py-2.5 rounded-xl border text-xs font-mono hover:opacity-80 transition-opacity"
                  style={{
                    borderColor: activePalette.border,
                    color: activePalette.text,
                    backgroundColor: activePalette.cardBg,
                  }}
                >
                  Make another test booking
                </button>
                <Link
                  href="/contact?package=the-booking-drop"
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm"
                  style={{
                    backgroundColor: activePalette.accent,
                    color: activePalette.accentFg,
                  }}
                >
                  <span>Build your site for 2,000 kr</span>
                  <FiArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* ================= 7. MODERN EDITORIAL LIGHTBOX MODAL (NO DARK BOXES, AIRY & TRANSPARENT) ================= */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/25 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Frameless Floating Image Card with Clean Frosted Header & Footer */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full flex flex-col items-center gap-3 animate-in zoom-in-95 duration-200"
          >
            {/* Top Bar: Archival Tag + Modern Frosted Close Button */}
            <div className="w-full flex items-center justify-between px-1">
              <span
                className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-xl border"
                style={{
                  backgroundColor: `${activePalette.cardBg}F0`,
                  borderColor: activePalette.border,
                  color: activePalette.accent,
                }}
              >
                Lookbook Archival View
              </span>

              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide shadow-md backdrop-blur-xl border transition-all cursor-pointer hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: `${activePalette.cardBg}F0`,
                  borderColor: activePalette.border,
                  color: activePalette.text,
                }}
                aria-label="Close image preview"
              >
                <FiX size={13} className="stroke-[2.5]" />
                <span>Close</span>
                <span className="text-[10px] opacity-60 font-mono hidden sm:inline">[ESC]</span>
              </button>
            </div>

            {/* High-Resolution Frameless Photo */}
            <div
              className="relative w-full aspect-[4/5] sm:aspect-square max-h-[62vh] rounded-3xl overflow-hidden shadow-2xl border"
              style={{
                backgroundColor: activePalette.cardBg,
                borderColor: activePalette.border,
              }}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                sizes="(max-width: 640px) 95vw, 600px"
                className="object-cover"
                priority
              />
            </div>

            {/* Luminous Frosted Glass Caption & Direct Action Pill (ZERO DARK BOXES) */}
            <div
              className="w-full p-4 rounded-2xl border shadow-xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              style={{
                backgroundColor: `${activePalette.cardBg}FA`,
                borderColor: activePalette.border,
                color: activePalette.text,
              }}
            >
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm sm:text-base font-bold truncate tracking-tight font-heading" style={{ color: activePalette.text }}>
                  {lightboxImage.title}
                </h3>
                <p className="text-xs font-mono truncate" style={{ color: activePalette.muted }}>
                  {lightboxImage.tag}
                </p>
              </div>

              <div className="flex-shrink-0 pt-1 sm:pt-0">
                <button
                  type="button"
                  onClick={() => {
                    setLightboxImage(null);
                    const el = document.getElementById("booking-form-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: activePalette.accent,
                    color: activePalette.accentFg,
                  }}
                >
                  <span>Book This Look</span>
                  <FiArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 8. UNIFIED INTERACTIVE STUDIO DOCK (DEMOS + PALETTES) ================= */}
      <aside
        aria-label="Interactive studio demo switcher and palette dock"
        className="fixed bottom-14 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-lg transition-all duration-300"
      >
        {isDockCollapsed ? (
          /* Collapsed Floating Pill - Minimalist, unobtrusive */
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsDockCollapsed(false)}
              className="backdrop-blur-xl rounded-full border shadow-xl px-4 py-2 flex items-center gap-2.5 text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: `${activePalette.cardBg}F8`,
                borderColor: activePalette.border,
                color: activePalette.text,
              }}
              title="Expand live demo switcher and color palettes"
            >
              <span className="flex items-center gap-1 text-[13px]">
                <span>🎂</span>
                <span>💅</span>
                <span>💍</span>
              </span>
              <span className="font-bold">Switch Demo &amp; Palettes</span>
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: activePalette.accent }}
              />
              <span className="text-[10px] opacity-75 font-mono">▲</span>
            </button>
          </div>
        ) : (
          /* Expanded Unified Studio Control Panel */
          <div
            className="backdrop-blur-xl rounded-2xl border shadow-2xl p-2.5 sm:p-3.5 space-y-2.5 transition-colors"
            style={{
              backgroundColor: `${activePalette.cardBg}FA`,
              borderColor: activePalette.border,
            }}
          >
            {/* Top Row: Demos Header & Collapse Toggle */}
            <div className="flex items-center justify-between px-1 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 font-bold" style={{ color: activePalette.text }}>
                <span className="text-xs">⚡</span>
                <span>Select Demo Archetype:</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDockCollapsed(true)}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium transition-all hover:opacity-80 border cursor-pointer active:scale-95"
                style={{
                  borderColor: activePalette.border,
                  color: activePalette.muted,
                  backgroundColor: activePalette.bg,
                }}
                title="Minimize toolbar to clear screen"
              >
                <span>Hide</span>
                <span>▼</span>
              </button>
            </div>

            {/* 3 Live Demo Segmented Buttons (Prominent & Highly Visible) */}
            <div className="grid grid-cols-3 gap-1.5">
              {demoList.map((d) => {
                const isCurrent = config.id === d.id;
                return (
                  <Link
                    key={d.id}
                    href={d.href}
                    className="p-1.5 sm:p-2 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-0.5 border cursor-pointer group"
                    style={{
                      backgroundColor: isCurrent ? activePalette.accent : "transparent",
                      color: isCurrent ? activePalette.accentFg : activePalette.text,
                      borderColor: isCurrent ? activePalette.accent : activePalette.border,
                      outline: isCurrent ? `1.5px solid ${activePalette.accent}` : "none",
                    }}
                    title={`Switch to ${d.brand} (${d.label})`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{d.icon}</span>
                      <span className="text-[11px] font-mono font-bold truncate">
                        {d.label}
                      </span>
                    </div>
                    <span
                      className="text-[9px] font-mono truncate max-w-full opacity-80"
                      style={{ color: isCurrent ? activePalette.accentFg : activePalette.muted }}
                    >
                      {d.brand}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t my-1" style={{ borderColor: activePalette.border }} />

            {/* Row 2: 4 Palette Themes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 font-bold" style={{ color: activePalette.text }}>
                  <span>🎨 Colorway:</span>
                  <span className="underline underline-offset-2" style={{ color: activePalette.accent }}>
                    {activePalette.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono hidden sm:inline" style={{ color: activePalette.muted }}>
                  Instant live test
                </span>
              </div>

              {/* 4 Color Swatch Buttons */}
              <div className="grid grid-cols-4 gap-1.5">
                {config.palettes.map((p) => {
                  const isActive = activePalette.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePalette(p)}
                      className="p-1.5 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        backgroundColor: isActive ? p.tagBg : "transparent",
                        borderColor: isActive ? p.accent : activePalette.border,
                        outline: isActive ? `1.5px solid ${p.accent}` : "none",
                      }}
                      title={`Switch theme to ${p.name}`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: p.swatches[0] }}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: p.swatches[1] }}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: p.swatches[2] }}
                        />
                      </div>
                      <span
                        className="text-[10px] font-mono truncate max-w-full font-medium"
                        style={{ color: activePalette.text }}
                      >
                        {p.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ================= 9. STICKY MOBILE BOOKING BAR ================= */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 border-t backdrop-blur-md p-3 sm:hidden transition-colors"
        style={{
          backgroundColor: `${activePalette.cardBg}F2`,
          borderColor: activePalette.border,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="truncate">
            <span className="text-[10px] font-mono block truncate" style={{ color: activePalette.muted }}>
              Selected Service
            </span>
            <span className="text-xs font-bold font-mono truncate block" style={{ color: activePalette.text }}>
              {selectedService.name}
            </span>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById("booking-form-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex-shrink-0 flex items-center gap-1 shadow-sm active:scale-95 transition-all"
            style={{
              backgroundColor: activePalette.accent,
              color: activePalette.accentFg,
            }}
          >
            <span>
              Book (
              {config.id === "nails"
                ? `${effectiveNailPrice} kr`
                : selectedService.price > 0
                ? `${selectedService.price} kr`
                : "Free"}
              )
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
