"use client";

import { useState } from "react";
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
} from "react-icons/fi";
import DemoTopSwitcher from "@/components/demo/DemoTopSwitcher";
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

  // Active Theme / Palette
  const [activePalette, setActivePalette] = useState<PaletteTheme>(config.palettes[0]);
  const [paletteDockOpen, setPaletteDockOpen] = useState<boolean>(false);

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
  const [cakeInscription, setCakeInscription] = useState("");
  const [cakeAllergies, setCakeAllergies] = useState("");

  // Nails Niche Specific State
  const [nailStatus, setNailStatus] = useState<"bare" | "biab_removal" | "gelx_removal">("bare");
  const [nailShape, setNailShape] = useState<"almond" | "square" | "coffin" | "natural_oval">("almond");
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
      className="min-h-screen transition-colors duration-300 font-body relative pb-28"
      style={{
        backgroundColor: activePalette.bg,
        color: activePalette.text,
      }}
    >
      {/* ================= 1. DISCREET NOTICABLE TOP SWITCHER ================= */}
      <DemoTopSwitcher
        currentDemo={config.id}
        accentColor={activePalette.accent}
        borderColor={activePalette.border}
        textColor={activePalette.text}
        cardBg={activePalette.cardBg}
      />

      {/* Main Responsive Canvas */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-14 sm:space-y-16">

        {/* ================= 2. STUDIO BRAND HERO (3 DISTINCT ARCHETYPES) ================= */}
        
        {/* ARCHETYPE A: CAKES - CLASSICAL CENTERED SEAL */}
        {config.id === "cakes" && (
          <section className="text-center space-y-5 pt-2 max-w-xl mx-auto">
            {/* Logo Emblem */}
            <div className="flex justify-center pt-1">
              <div
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1.5 flex flex-col items-center justify-center transition-all shadow-sm"
                style={{
                  backgroundColor: activePalette.cardBg,
                  border: `1.5px solid ${activePalette.border}`,
                }}
              >
                {config.logoEmblem(activePalette.accent, activePalette.muted, activePalette.border)}
              </div>
            </div>

            {/* Typography Heading */}
            <div className="space-y-1.5">
              <h1
                className="text-2xl sm:text-4xl font-black tracking-[0.2em] uppercase"
                style={{
                  fontFamily: config.fontFamilyHeading,
                  color: activePalette.text,
                }}
              >
                {config.brandName}
              </h1>
              <p
                className="text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase"
                style={{ color: activePalette.muted }}
              >
                {config.brandSubtitle}
              </p>
            </div>

            {/* Studio Meta Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-mono">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{
                  backgroundColor: activePalette.cardBg,
                  border: `1px solid ${activePalette.border}`,
                  color: activePalette.muted,
                }}
              >
                <FiMapPin size={11} style={{ color: activePalette.accent }} />
                <span>{config.location}</span>
              </span>

              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: activePalette.cardBg,
                  border: `1px solid ${activePalette.border}`,
                  color: activePalette.text,
                }}
              >
                <span>{config.statusPill}</span>
              </span>

              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: activePalette.cardBg,
                  border: `1px solid ${activePalette.border}`,
                  color: activePalette.muted,
                }}
              >
                <FiInstagram size={11} />
                <span>{config.instagramHandle}</span>
              </a>
            </div>

            <p
              className="text-xs sm:text-sm font-body leading-relaxed max-w-md mx-auto pt-1"
              style={{ color: activePalette.muted }}
            >
              {config.brandDescription}
            </p>
          </section>
        )}

        {/* ARCHETYPE B: NAILS - ASYMMETRIC MODERNIST SPLIT */}
        {config.id === "nails" && (
          <section
            className="pt-2 sm:pt-4 border-b pb-8 sm:pb-10"
            style={{ borderColor: activePalette.border }}
          >
            <div className="flex flex-col-reverse md:flex-row md:items-end justify-between gap-6 sm:gap-8">
              {/* Left Column: Bold Typographic Headline & Specs */}
              <div className="space-y-4 max-w-xl">
                <div
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-widest font-semibold"
                  style={{
                    backgroundColor: activePalette.tagBg,
                    color: activePalette.accent,
                    border: `1px solid ${activePalette.border}`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{config.statusPill}</span>
                  <span>·</span>
                  <span>{config.location}</span>
                </div>

                <div className="space-y-1">
                  <h1
                    className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none"
                    style={{
                      fontFamily: config.fontFamilyHeading,
                      color: activePalette.text,
                    }}
                  >
                    {config.brandName}
                  </h1>
                  <p
                    className="text-xs sm:text-sm font-mono tracking-wide"
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

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-xs font-mono">
                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:opacity-80 transition-opacity font-medium"
                    style={{
                      borderColor: activePalette.border,
                      backgroundColor: activePalette.cardBg,
                      color: activePalette.text,
                    }}
                  >
                    <FiInstagram size={13} style={{ color: activePalette.accent }} />
                    <span>{config.instagramHandle}</span>
                  </a>

                  <span
                    className="px-3 py-1.5 rounded-lg border text-[11px]"
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
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl p-2 flex flex-col items-center justify-center shadow-sm transition-all"
                  style={{
                    backgroundColor: activePalette.cardBg,
                    border: `1.5px solid ${activePalette.border}`,
                  }}
                >
                  {config.logoEmblem(activePalette.accent, activePalette.muted, activePalette.border)}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ARCHETYPE C: WEDDING - NORDIC ATELIER CREST & HORIZONTAL META BAR */}
        {config.id === "wedding" && (
          <section
            className="text-center space-y-6 pt-2 pb-6 border-b"
            style={{ borderColor: activePalette.border }}
          >
            {/* Top Delicate Seal with Hairline Divider Lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <div className="h-px flex-1" style={{ backgroundColor: activePalette.border }} />
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-1.5 shadow-sm"
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
            <div className="space-y-2 max-w-xl mx-auto">
              <span
                className="text-[10px] font-mono tracking-[0.3em] uppercase block font-semibold"
                style={{ color: activePalette.accent }}
              >
                Atelier Floral · Haute Cérémonie
              </span>
              <h1
                className="text-3xl sm:text-5xl font-light tracking-[0.16em] uppercase"
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

            {/* 3-Column Editorial Metadata Bar */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border-y py-3 text-xs font-mono max-w-2xl mx-auto"
              style={{ borderColor: activePalette.border }}
            >
              <div className="py-1.5 sm:py-0 px-3 flex items-center justify-center gap-1.5" style={{ color: activePalette.muted }}>
                <FiMapPin size={12} style={{ color: activePalette.accent }} />
                <span>{config.location}</span>
              </div>
              <div className="py-1.5 sm:py-0 px-3 flex items-center justify-center gap-1.5 font-medium" style={{ color: activePalette.text }}>
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

        {/* ================= 3. CURATED LOOKBOOK (3 DISTINCT ARCHETYPES) ================= */}

        {/* ARCHETYPE A: CAKES - BALANCED 3x2 BOUTIQUE GRID */}
        {config.id === "cakes" && (
          <section className="space-y-4">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Boutique Counter Lookbook
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                  Recent Fresh Bakes
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                6-photo curation · Tap to inspect details
              </p>
            </div>

            {/* 3x2 Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {config.lookbook.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(item)}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    border: `1px solid ${activePalette.border}`,
                    backgroundColor: activePalette.cardBg,
                  }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-[11px] text-white font-mono flex items-center gap-1">
                        <FiMaximize2 size={11} /> Expand view
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-3 text-left">
                    <h3
                      className="text-xs sm:text-sm font-semibold truncate"
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

        {/* ARCHETYPE B: NAILS - ASYMMETRIC FASHION MOSAIC */}
        {config.id === "nails" && (
          <section className="space-y-4">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  High-Fashion Editorial Lookbook
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                  Studio Sets &amp; Gel Architecture
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                Asymmetric gallery · Tap to inspect apex &amp; chrome details
              </p>
            </div>

            {/* Asymmetric Masonry Mosaic */}
            <div className="space-y-3 sm:space-y-4">
              {/* Row 1: 1 Featured Wide Hero Card (2 cols) + 1 Detail Portrait Card (1 col) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {/* 2-Column Wide Hero Card */}
                {config.lookbook[0] && (
                  <div
                    onClick={() => setLightboxImage(config.lookbook[0])}
                    className="md:col-span-2 group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:shadow-lg"
                    style={{
                      borderColor: activePalette.border,
                      backgroundColor: activePalette.cardBg,
                    }}
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={config.lookbook[0].src}
                        alt={config.lookbook[0].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 650px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                        unoptimized
                      />
                      {/* Architectural Floating Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider shadow-sm"
                          style={{
                            backgroundColor: activePalette.cardBg,
                            color: activePalette.accent,
                            border: `1px solid ${activePalette.border}`,
                          }}
                        >
                          01 / FEATURED ARCHITECTURE
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                        <div className="text-left text-white space-y-0.5">
                          <h3 className="text-sm sm:text-base font-bold font-heading">
                            {config.lookbook[0].title}
                          </h3>
                          <p className="text-[11px] font-mono text-zinc-300">
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
                    className="group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:shadow-lg flex flex-col"
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
                          className="px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider"
                          style={{
                            backgroundColor: activePalette.cardBg,
                            color: activePalette.text,
                            border: `1px solid ${activePalette.border}`,
                          }}
                        >
                          02 / CHROME GLAZE
                        </span>
                      </div>
                    </div>
                    <div className="p-3 text-left">
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

              {/* Row 2: 4 Grid Cards Below (Items 2, 3, 4, 5) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {config.lookbook.slice(2, 6).map((item, idx) => {
                  const num = String(idx + 3).padStart(2, "0");
                  return (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage(item)}
                      className="group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:shadow-md"
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
                            className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold"
                            style={{
                              backgroundColor: `${activePalette.cardBg}E6`,
                              color: activePalette.text,
                            }}
                          >
                            {num}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 sm:p-2.5 text-left">
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

        {/* ARCHETYPE C: WEDDING - ROMANTIC EDITORIAL DIPTYCHS & PLATES */}
        {config.id === "wedding" && (
          <section className="space-y-6">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Ceremony &amp; Reception Archive
                </span>
                <h2 className="text-xl sm:text-2xl font-light font-heading tracking-wide">
                  Selected Floral Commissions
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                Plates I – VI · Oslo &amp; Viken Weddings
              </p>
            </div>

            {/* Row 1: Diptych (2 Large Side-by-Side Portrait Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {config.lookbook.slice(0, 2).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(item)}
                  className="group cursor-pointer space-y-2.5"
                >
                  <div
                    className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-lg"
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
                        Plate {idx === 0 ? "I" : "II"}
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
                  className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-lg"
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
                      Plate III · The Ceremony Landscape
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              {[config.lookbook[2], config.lookbook[4], config.lookbook[5]].filter(Boolean).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(item)}
                  className="group cursor-pointer space-y-2"
                >
                  <div
                    className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border transition-all group-hover:shadow-md"
                    style={{
                      borderColor: activePalette.border,
                      backgroundColor: activePalette.cardBg,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                      unoptimized
                    />
                    <div className="absolute top-2 left-2">
                      <span
                        className="px-2 py-0.5 rounded text-[9px] font-mono"
                        style={{
                          backgroundColor: `${activePalette.cardBg}E6`,
                          color: activePalette.text,
                        }}
                      >
                        Plate {idx === 0 ? "IV" : idx === 1 ? "V" : "VI"}
                      </span>
                    </div>
                  </div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-xs font-semibold truncate" style={{ color: activePalette.text }}>
                      {item.title}
                    </h4>
                    <p className="text-[10px] font-mono truncate" style={{ color: activePalette.muted }}>
                      {item.tag.split("·")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= 4. TRANSPARENT PRICE LIST / MENU (3 DISTINCT ARCHETYPES) ================= */}

        {/* ARCHETYPE A: CAKES - 2-COLUMN BOXED MENU CARDS */}
        {config.id === "cakes" && (
          <section id="services-menu" className="space-y-6">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Transparent Pricing
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                  Services &amp; Pricing
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                All prices in NOK · No surprises at checkout
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
                    className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all"
                    style={{
                      backgroundColor: active ? activePalette.accent : activePalette.cardBg,
                      color: active ? activePalette.accentFg : activePalette.muted,
                      border: `1px solid ${active ? activePalette.accent : activePalette.border}`,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {filteredServices.map((service) => {
                const isChosen = selectedService.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectService(service)}
                    className="p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all cursor-pointer relative flex flex-col justify-between"
                    style={{
                      backgroundColor: activePalette.cardBg,
                      border: `1.5px solid ${isChosen ? activePalette.accent : activePalette.border}`,
                      boxShadow: isChosen ? `0 4px 18px ${activePalette.border}` : "none",
                    }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span
                            className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-medium"
                            style={{
                              backgroundColor: activePalette.tagBg,
                              color: activePalette.accent,
                            }}
                          >
                            {service.servings || service.leadTime}
                          </span>
                          <h3
                            className="text-sm sm:text-base font-bold pt-1 leading-snug"
                            style={{ color: activePalette.text }}
                          >
                            {service.name}
                          </h3>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span
                            className="text-base sm:text-lg font-black font-mono block"
                            style={{ color: activePalette.text }}
                          >
                            {service.price > 0 ? `${service.price.toLocaleString("no-NO")} kr` : "Complimentary"}
                          </span>
                          <span className="text-[10px] font-mono" style={{ color: activePalette.muted }}>
                            {service.leadTime}
                          </span>
                        </div>
                      </div>

                      <p
                        className="text-xs font-body leading-relaxed pt-1"
                        style={{ color: activePalette.muted }}
                      >
                        {service.description}
                      </p>
                    </div>

                    <div
                      className="pt-4 mt-2 border-t flex items-center justify-between text-xs font-mono"
                      style={{ borderColor: activePalette.border }}
                    >
                      <span style={{ color: isChosen ? activePalette.accent : activePalette.muted }}>
                        {isChosen ? "✓ Currently Selected" : "Tap to select"}
                      </span>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-lg text-[11px] font-semibold transition-all"
                        style={{
                          backgroundColor: isChosen ? activePalette.accent : activePalette.tagBg,
                          color: isChosen ? activePalette.accentFg : activePalette.accent,
                        }}
                      >
                        {isChosen ? "Selected" : "Choose"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ARCHETYPE B: NAILS - SWISS ARCHITECTURAL LEDGER TABLE WITH DOT LEADERS */}
        {config.id === "nails" && (
          <section id="services-menu" className="space-y-6">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Treatment Ledger &amp; Price List
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                  Studio Treatments
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                All sets include precision Russian dry cuticle work · Fixed NOK rates
              </p>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {config.categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border font-semibold"
                    style={{
                      backgroundColor: active ? activePalette.accent : activePalette.cardBg,
                      color: active ? activePalette.accentFg : activePalette.muted,
                      borderColor: active ? activePalette.accent : activePalette.border,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Ledger Line-Item Rows */}
            <div className="space-y-2.5">
              {filteredServices.map((service) => {
                const isChosen = selectedService.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectService(service)}
                    className="p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:shadow-sm"
                    style={{
                      backgroundColor: isChosen ? activePalette.tagBg : activePalette.cardBg,
                      borderColor: isChosen ? activePalette.accent : activePalette.border,
                    }}
                  >
                    {/* Left: Duration Pill, Title & Description */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: activePalette.bg,
                            color: activePalette.accent,
                            border: `1px solid ${activePalette.border}`,
                          }}
                        >
                          {service.servings}
                        </span>
                        <span className="text-[10px] font-mono" style={{ color: activePalette.muted }}>
                          {service.leadTime}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold font-heading truncate" style={{ color: activePalette.text }}>
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-xs font-body line-clamp-1 sm:line-clamp-2" style={{ color: activePalette.muted }}>
                        {service.description}
                      </p>
                    </div>

                    {/* Dot Leader for Desktop */}
                    <div
                      className="hidden lg:block flex-1 mx-4 border-b border-dotted"
                      style={{ borderColor: activePalette.border }}
                    />

                    {/* Right: Monospace Price & Action Button */}
                    <div
                      className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0"
                      style={{ borderColor: activePalette.border }}
                    >
                      <span className="text-base sm:text-lg font-mono font-black" style={{ color: activePalette.text }}>
                        {service.price.toLocaleString("no-NO")} kr
                      </span>
                      <button
                        type="button"
                        className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                        style={{
                          backgroundColor: isChosen ? activePalette.accent : activePalette.bg,
                          color: isChosen ? activePalette.accentFg : activePalette.text,
                          border: `1px solid ${isChosen ? activePalette.accent : activePalette.border}`,
                        }}
                      >
                        {isChosen ? (
                          <>
                            <FiCheck size={12} />
                            <span>Selected</span>
                          </>
                        ) : (
                          <span>+ Select</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ARCHETYPE C: WEDDING - TIERED PACKAGE SUITE WITH DELIVERABLES */}
        {config.id === "wedding" && (
          <section id="services-menu" className="space-y-6">
            <div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
              style={{ borderColor: activePalette.border }}
            >
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                  style={{ color: activePalette.accent }}
                >
                  Floral Investment &amp; Collections
                </span>
                <h2 className="text-xl sm:text-2xl font-light font-heading tracking-wide">
                  Wedding Floral Suites
                </h2>
              </div>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                Transparent pricing with itemized deliverables · No hidden production fees
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
                      backgroundColor: active ? activePalette.accent : activePalette.cardBg,
                      color: active ? activePalette.accentFg : activePalette.muted,
                      borderColor: active ? activePalette.accent : activePalette.border,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* HIGHLIGHTED FULL-SUITE FEATURE BANNER (When "all" or "ceremony" is selected) */}
            {(selectedCategory === "all" || selectedCategory === "ceremony") && (
              <div
                onClick={() => handleSelectService(config.services[4])} // Full Bespoke Wedding Floral Suite
                className="p-5 sm:p-7 rounded-2xl border transition-all cursor-pointer relative shadow-sm group hover:shadow-md"
                style={{
                  backgroundColor: selectedService.id === config.services[4].id ? activePalette.tagBg : activePalette.cardBg,
                  borderColor: selectedService.id === config.services[4].id ? activePalette.accent : activePalette.accent,
                  borderWidth: "1.5px",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider"
                      style={{
                        backgroundColor: activePalette.accent,
                        color: activePalette.accentFg,
                      }}
                    >
                      <FiStar size={11} /> Most Requested Full Wedding Suite
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium font-heading tracking-wide pt-1" style={{ color: activePalette.text }}>
                      {config.services[4].name}
                    </h3>
                    <p className="text-xs sm:text-sm font-body leading-relaxed max-w-xl" style={{ color: activePalette.muted }}>
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

                {/* Included Deliverables Checklist */}
                {config.services[4].included && (
                  <div className="pt-4 mt-4 border-t space-y-1.5" style={{ borderColor: activePalette.border }}>
                    <span className="text-[10px] font-mono uppercase tracking-wider block font-semibold" style={{ color: activePalette.accent }}>
                      What&apos;s Included in this Collection:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono">
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
                    {selectedService.id === config.services[4].id ? "✓ Currently Selected Suite" : "Tap to choose full wedding suite"}
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

            {/* 2-Column Package Cards for Remaining Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices
                .filter((s) => (selectedCategory === "all" ? s.id !== config.services[4].id : true))
                .map((service) => {
                  const isChosen = selectedService.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleSelectService(service)}
                      className="p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between"
                      style={{
                        backgroundColor: activePalette.cardBg,
                        borderColor: isChosen ? activePalette.accent : activePalette.border,
                        borderWidth: isChosen ? "2px" : "1px",
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span
                              className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold"
                              style={{
                                backgroundColor: activePalette.tagBg,
                                color: activePalette.accent,
                              }}
                            >
                              {service.servings}
                            </span>
                            <h3 className="text-sm sm:text-base font-medium font-heading pt-1" style={{ color: activePalette.text }}>
                              {service.name}
                            </h3>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-base sm:text-lg font-mono font-bold block" style={{ color: activePalette.text }}>
                              {service.price > 0 ? `${service.price.toLocaleString("no-NO")} kr` : "Complimentary"}
                            </span>
                            <span className="text-[10px] font-mono" style={{ color: activePalette.muted }}>
                              {service.leadTime}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs font-body leading-relaxed" style={{ color: activePalette.muted }}>
                          {service.description}
                        </p>

                        {/* Deliverables Checklist */}
                        {service.included && (
                          <div className="pt-2 border-t space-y-1 text-xs font-mono" style={{ borderColor: activePalette.border }}>
                            {service.included.map((inc, i) => (
                              <div key={i} className="flex items-start gap-1.5" style={{ color: activePalette.text }}>
                                <FiCheck size={11} style={{ color: activePalette.accent }} className="mt-0.5 flex-shrink-0" />
                                <span className="text-[11px] leading-snug">{inc}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 mt-3 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: activePalette.border }}>
                        <span style={{ color: isChosen ? activePalette.accent : activePalette.muted }}>
                          {isChosen ? "✓ Selected" : "Tap to choose"}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1 rounded-lg text-xs font-mono font-semibold"
                          style={{
                            backgroundColor: isChosen ? activePalette.accent : activePalette.tagBg,
                            color: isChosen ? activePalette.accentFg : activePalette.accent,
                          }}
                        >
                          {isChosen ? "Selected" : "Choose"}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* ================= 5. 1-TAP BOOKING SHEET (3 DISTINCT ARCHETYPES) ================= */}

        <section id="booking-form-section" className="space-y-6 pt-4">
          <div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3"
            style={{ borderColor: activePalette.border }}
          >
            <div>
              <span
                className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                style={{ color: activePalette.accent }}
              >
                1-Tap Reservation
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
            <form
              onSubmit={handleBookingSubmit}
              className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border space-y-6"
              style={{
                backgroundColor: activePalette.cardBg,
                borderColor: activePalette.border,
              }}
            >
              {/* Selected Service Banner */}
              <div
                className="p-3.5 sm:p-4 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-mono"
                style={{
                  backgroundColor: activePalette.tagBg,
                  borderColor: activePalette.border,
                }}
              >
                <div>
                  <span className="text-[10px] uppercase block tracking-wider" style={{ color: activePalette.muted }}>
                    Booking for:
                  </span>
                  <span className="font-bold" style={{ color: activePalette.text }}>
                    {selectedService.name}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-black text-sm sm:text-base font-mono" style={{ color: activePalette.accent }}>
                    {config.id === "nails"
                      ? `${effectiveNailPrice.toLocaleString("no-NO")} kr`
                      : selectedService.price > 0
                      ? `${selectedService.price.toLocaleString("no-NO")} kr`
                      : "Complimentary"}
                  </span>
                </div>
              </div>

              {/* Step 1: Date Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                  1. {config.bookingConfig.dateLabel}
                </label>
                <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                  {config.bookingConfig.dates.map((d, i) => {
                    const isSelected = selectedDate.full === d.full;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        className="py-2.5 sm:py-3 px-1 rounded-xl text-center transition-all border flex flex-col items-center justify-center"
                        style={{
                          backgroundColor: isSelected ? activePalette.accent : activePalette.cardBg,
                          color: isSelected ? activePalette.accentFg : activePalette.text,
                          borderColor: isSelected ? activePalette.accent : activePalette.border,
                        }}
                      >
                        <span className="text-[10px] font-mono uppercase opacity-75">{d.day}</span>
                        <span className="text-base sm:text-lg font-black font-mono leading-none pt-0.5">{d.date}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Time Slot / Consultation Window */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                  2. {config.bookingConfig.timeLabel}
                </label>
                <div
                  className={`grid ${
                    config.id === "wedding" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
                  } gap-2`}
                >
                  {config.bookingConfig.timeSlots.map((slot, i) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className="py-2.5 px-2 rounded-xl text-center text-xs font-mono transition-all border truncate"
                        style={{
                          backgroundColor: isSelected ? activePalette.accent : activePalette.cardBg,
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

              {/* Step 3: Niche-Specific Custom Selectors & Inputs */}

              {/* 3A. CAKES NICHE INPUTS */}
              {config.id === "cakes" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      3. Piped Custom Message on Cake (Optional)
                    </label>
                    <input
                      type="text"
                      value={cakeInscription}
                      onChange={(e) => setCakeInscription(e.target.value)}
                      placeholder="e.g. 'Happy Birthday Julie 25' or 'Forever & Always'"
                      className="w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none transition-colors"
                      style={{
                        backgroundColor: activePalette.bg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      4. Dietary &amp; Allergy Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={cakeAllergies}
                      onChange={(e) => setCakeAllergies(e.target.value)}
                      placeholder="e.g. 'Nut allergy / please prepare in a clean area'"
                      className="w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none transition-colors"
                      style={{
                        backgroundColor: activePalette.bg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* 3B. NAILS NICHE INTERACTIVE CONSULTATION PILLS */}
              {config.id === "nails" && (
                <div className="space-y-4 pt-1">
                  {/* Current Nails Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      3. Current Natural Nail Status
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: "bare", label: "Bare Natural Nails", extra: "+0 kr" },
                        { id: "biab_removal", label: "Old BIAB (Removal)", extra: "+150 kr" },
                        { id: "gelx_removal", label: "Gel-X Extensions On", extra: "+200 kr" },
                      ].map((item) => {
                        const isSelected = nailStatus === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setNailStatus(item.id as any)}
                            className="p-2.5 rounded-xl text-left border text-xs font-mono transition-all flex items-center justify-between"
                            style={{
                              backgroundColor: isSelected ? activePalette.tagBg : activePalette.bg,
                              borderColor: isSelected ? activePalette.accent : activePalette.border,
                              color: isSelected ? activePalette.text : activePalette.muted,
                            }}
                          >
                            <span className="font-semibold">{item.label}</span>
                            <span className="text-[10px] opacity-80">{item.extra}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Desired Shape */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      4. Desired Nail Shape
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "almond", label: "Almond" },
                        { id: "square", label: "Square" },
                        { id: "coffin", label: "Coffin" },
                        { id: "natural_oval", label: "Natural Oval" },
                      ].map((shape) => {
                        const isSelected = nailShape === shape.id;
                        return (
                          <button
                            key={shape.id}
                            type="button"
                            onClick={() => setNailShape(shape.id as any)}
                            className="py-2 px-3 rounded-xl border text-xs font-mono text-center transition-all font-semibold"
                            style={{
                              backgroundColor: isSelected ? activePalette.accent : activePalette.bg,
                              color: isSelected ? activePalette.accentFg : activePalette.text,
                              borderColor: isSelected ? activePalette.accent : activePalette.border,
                            }}
                          >
                            {shape.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Art Complexity */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      5. Art Complexity Tier
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: "clean", label: "Clean Single Tone", add: "+0 kr" },
                        { id: "chrome", label: "Chrome / Glaze", add: "+100 kr" },
                        { id: "editorial_3d", label: "3D Gel Sculpting", add: "+250 kr" },
                      ].map((art) => {
                        const isSelected = nailArtLevel === art.id;
                        return (
                          <button
                            key={art.id}
                            type="button"
                            onClick={() => setNailArtLevel(art.id as any)}
                            className="p-2.5 rounded-xl text-left border text-xs font-mono transition-all flex items-center justify-between"
                            style={{
                              backgroundColor: isSelected ? activePalette.tagBg : activePalette.bg,
                              borderColor: isSelected ? activePalette.accent : activePalette.border,
                              color: isSelected ? activePalette.text : activePalette.muted,
                            }}
                          >
                            <span className="font-semibold">{art.label}</span>
                            <span className="text-[10px] opacity-80">{art.add}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inspo Reference Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      6. Inspo Reference or Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={nailInspoNote}
                      onChange={(e) => setNailInspoNote(e.target.value)}
                      placeholder="e.g. 'Bare nails currently. Almond shape. Want liquid chrome glaze like post #2.'"
                      className="w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none transition-colors"
                      style={{
                        backgroundColor: activePalette.bg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* 3C. WEDDING NICHE BRIDAL QUESTIONNAIRE */}
              {config.id === "wedding" && (
                <div className="space-y-4 pt-1">
                  {/* Consultation Format */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      3. Consultation Format
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setWeddingConsultationType("studio")}
                        className="p-3 rounded-xl border text-xs font-mono text-left transition-all flex items-center gap-2"
                        style={{
                          backgroundColor: weddingConsultationType === "studio" ? activePalette.tagBg : activePalette.bg,
                          borderColor: weddingConsultationType === "studio" ? activePalette.accent : activePalette.border,
                          color: activePalette.text,
                        }}
                      >
                        <FiCoffee size={14} style={{ color: activePalette.accent }} />
                        <div>
                          <span className="font-bold block">In-Studio Coffee &amp; Moodboard</span>
                          <span className="text-[10px]" style={{ color: activePalette.muted }}>Frogner Atelier, Oslo</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWeddingConsultationType("video")}
                        className="p-3 rounded-xl border text-xs font-mono text-left transition-all flex items-center gap-2"
                        style={{
                          backgroundColor: weddingConsultationType === "video" ? activePalette.tagBg : activePalette.bg,
                          borderColor: weddingConsultationType === "video" ? activePalette.accent : activePalette.border,
                          color: activePalette.text,
                        }}
                      >
                        <FiVideo size={14} style={{ color: activePalette.accent }} />
                        <div>
                          <span className="font-bold block">Online Video Consultation</span>
                          <span className="text-[10px]" style={{ color: activePalette.muted }}>Google Meet link provided</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Venue Name & Location */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      4. Wedding Venue &amp; City / Region *
                    </label>
                    <input
                      type="text"
                      required
                      value={weddingVenue}
                      onChange={(e) => setWeddingVenue(e.target.value)}
                      placeholder="e.g. 'Villa Eckbo, Frogner / Losby Gods / Hadeland Glassverk'"
                      className="w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none transition-colors"
                      style={{
                        backgroundColor: activePalette.bg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>

                  {/* Estimated Guest Count */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      5. Estimated Guest Count
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
                            className="py-2 px-2 rounded-xl border text-xs font-mono text-center transition-all font-semibold"
                            style={{
                              backgroundColor: isSelected ? activePalette.accent : activePalette.bg,
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

                  {/* Color Palette Vision */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                      6. Floral Vision &amp; Color Palette (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={weddingColorVision}
                      onChange={(e) => setWeddingColorVision(e.target.value)}
                      placeholder="e.g. 'Soft butter yellow, ivory creams, wild garden greenery, trailing French silk ribbon'"
                      className="w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none transition-colors"
                      style={{
                        backgroundColor: activePalette.bg,
                        borderColor: activePalette.border,
                        color: activePalette.text,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Client Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                    {config.id === "wedding" ? "Couple's Full Names *" : "Your Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={config.id === "wedding" ? "Astrid & Magnus" : "Astrid Lindgren"}
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
                    Phone Number (Vipps) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+47 912 34 567"
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

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                    {config.id === "wedding" ? "Wedding Instagram / Email" : "Instagram Handle (Optional)"}
                  </label>
                  <input
                    type="text"
                    placeholder="@yourhandle"
                    value={clientInstagram}
                    onChange={(e) => setClientInstagram(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                    style={{
                      backgroundColor: activePalette.bg,
                      borderColor: activePalette.border,
                      color: activePalette.text,
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
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
                    {config.id === "wedding"
                      ? `Inquire For Wedding Date · ${
                          selectedService.price > 0 ? `${selectedService.price.toLocaleString("no-NO")} kr` : "Complimentary Consultation"
                        }`
                      : config.id === "nails"
                      ? `Reserve Chair · ${effectiveNailPrice.toLocaleString("no-NO")} kr`
                      : `Request Pickup · ${
                          selectedService.price > 0 ? `${selectedService.price.toLocaleString("no-NO")} kr` : "Complimentary"
                        }`}
                  </span>
                </button>
                <p className="text-[10px] font-mono text-center pt-2" style={{ color: activePalette.muted }}>
                  {config.metaNotes}
                </p>
              </div>
            </form>
          ) : (
            /* ================= CONFIRMATION VOUCHER CARD ================= */
            <div
              className="p-6 sm:p-8 rounded-3xl border text-center space-y-5 animate-in fade-in duration-300"
              style={{
                backgroundColor: activePalette.cardBg,
                borderColor: activePalette.border,
              }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
                style={{ backgroundColor: activePalette.tagBg, color: activePalette.accent }}
              >
                <FiCheck size={24} />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold" style={{ color: activePalette.accent }}>
                  {config.id === "wedding" ? "Wedding Inquiry Received" : "Reservation Confirmed"}
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
                    {selectedDate.full} · {selectedTime}
                  </span>
                </div>

                {/* Nails Specs Summary */}
                {config.id === "nails" && (
                  <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                    <span style={{ color: activePalette.muted }}>Nail Specs:</span>
                    <span className="font-bold text-right" style={{ color: activePalette.text }}>
                      {nailShape.toUpperCase()} · {nailArtLevel.toUpperCase()}
                    </span>
                  </div>
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

      {/* ================= 6. LIGHTBOX MODAL ================= */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border"
            style={{
              backgroundColor: activePalette.cardBg,
              borderColor: activePalette.border,
            }}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              aria-label="Close image"
            >
              <FiX size={18} />
            </button>

            <div className="relative aspect-[4/5] w-full bg-zinc-950">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>

            <div className="p-4 sm:p-5 text-left space-y-1">
              <h3 className="text-base font-bold" style={{ color: activePalette.text }}>
                {lightboxImage.title}
              </h3>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                {lightboxImage.tag}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 7. FLOATING PALETTE SWITCHER DOCK ================= */}
      <div className="fixed bottom-4 right-4 z-40">
        {paletteDockOpen ? (
          <div
            className="p-3 rounded-2xl border shadow-xl backdrop-blur-md space-y-2 text-xs font-mono animate-in slide-in-from-bottom-2 duration-200"
            style={{
              backgroundColor: activePalette.cardBg,
              borderColor: activePalette.border,
              color: activePalette.text,
            }}
          >
            <div className="flex items-center justify-between pb-1 border-b" style={{ borderColor: activePalette.border }}>
              <span className="font-bold text-[11px] uppercase tracking-wider">Brand Palette</span>
              <button
                onClick={() => setPaletteDockOpen(false)}
                className="p-1 opacity-60 hover:opacity-100"
                aria-label="Close palette picker"
              >
                <FiX size={14} />
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {config.palettes.map((p) => {
                const isActive = activePalette.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePalette(p)}
                    className="w-full flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-left transition-all border"
                    style={{
                      backgroundColor: isActive ? p.tagBg : "transparent",
                      borderColor: isActive ? p.accent : "transparent",
                    }}
                  >
                    <div>
                      <span className="font-semibold block text-[11px]" style={{ color: p.text }}>
                        {p.name}
                      </span>
                      <span className="text-[9px]" style={{ color: p.muted }}>
                        {p.descriptor}
                      </span>
                    </div>
                    {/* Swatches */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.swatches[0] }} />
                      <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.swatches[1] }} />
                      <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.swatches[2] }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setPaletteDockOpen(true)}
            className="px-3.5 py-2 rounded-full border shadow-lg backdrop-blur-md text-xs font-mono font-semibold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: activePalette.cardBg,
              borderColor: activePalette.border,
              color: activePalette.text,
            }}
          >
            <FiSliders size={13} style={{ color: activePalette.accent }} />
            <span>Theme: {activePalette.name.split(" ")[0]}</span>
          </button>
        )}
      </div>

      {/* ================= 8. STICKY MOBILE BOOKING BAR ================= */}
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
