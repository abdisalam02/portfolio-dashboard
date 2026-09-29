"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiVolumeX,
} from "react-icons/fi";
import PreviewShell from "@/components/preview/PreviewShell";

// ==========================================
// 4 REFINED COLOR PALETTES (LUNA × NOIR × BLOB)
// ==========================================
interface PaletteTheme {
  id: string;
  name: string;
  tag: string;
  dot: string;
  swatches: [string, string, string];
  bgPrimary: string;
  bgSecondary: string;
  cardBg: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  accentMuted: string;
  border: string;
}

const PALETTES: Record<string, PaletteTheme> = {
  "luna-editorial": {
    id: "luna-editorial",
    name: "Luna Cashmere & Rose",
    tag: "Inspo: luna-nail-studio",
    dot: "#C48B82",
    swatches: ["#FAF8F5", "#D4A0A0", "#2A2421"],
    bgPrimary: "#FAF8F5",
    bgSecondary: "#F3EDE5",
    cardBg: "#FFFFFF",
    textPrimary: "#2A2421",
    textMuted: "#7A6F68",
    accent: "#C48B82",
    accentMuted: "#E8C2BC",
    border: "rgba(42, 36, 33, 0.12)",
  },
  "anastasia-noir": {
    id: "anastasia-noir",
    name: "Anastasia Noir & Gold",
    tag: "Inspo: anastasia-nail-master-noir",
    dot: "#C9A87C",
    swatches: ["#161514", "#C9A87C", "#FAF9F6"],
    bgPrimary: "#161514",
    bgSecondary: "#211F1D",
    cardBg: "#1C1A18",
    textPrimary: "#FAF9F6",
    textMuted: "#9E9A93",
    accent: "#C9A87C",
    accentMuted: "#8B7355",
    border: "rgba(201, 168, 124, 0.2)",
  },
  "pastel-blob": {
    id: "pastel-blob",
    name: "Pastel Blob Blush",
    tag: "Inspo: pastel-blob-nail-menu",
    dot: "#F48B9E",
    swatches: ["#FFFFFF", "#F9D5DB", "#1C1C1C"],
    bgPrimary: "#FFFFFF",
    bgSecondary: "#FDF4F6",
    cardBg: "#FFFFFF",
    textPrimary: "#1C1C1C",
    textMuted: "#73686A",
    accent: "#F48B9E",
    accentMuted: "#F9D5DB",
    border: "rgba(244, 139, 158, 0.25)",
  },
  "matcha-sage": {
    id: "matcha-sage",
    name: "Matcha Botanical",
    tag: "Organic Atelier",
    dot: "#4A6B5D",
    swatches: ["#F5F7F3", "#8BA89B", "#1C2621"],
    bgPrimary: "#F5F7F3",
    bgSecondary: "#EBF0E8",
    cardBg: "#FFFFFF",
    textPrimary: "#1C2621",
    textMuted: "#5C6E65",
    accent: "#4A6B5D",
    accentMuted: "#8BA89B",
    border: "rgba(74, 107, 93, 0.2)",
  },
};

// Studio Klø Minimal Logo
function StudioKloLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="36" height="36" rx="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 28V16C12 11.5817 15.5817 8 20 8C24.4183 8 28 11.5817 28 16V28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="20" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ==========================================
// DATA DEFINITIONS
// ==========================================

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  duration: string;
  price: number;
  desc: string;
  tag: string;
  photo: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: "all" | "biab" | "french" | "chrome" | "3d";
  price: number;
  duration: string;
  image: string;
  tag: string;
  serviceId: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "biab-structured",
    number: "01",
    name: "Structured BIAB Gel",
    duration: "75 min",
    price: 750,
    desc: "Naturlig forsterkning med HEMA-fri apex-gele. 4 ukers hold.",
    tag: "Populær",
    photo: "/demo/nails/pin-biab.jpg",
  },
  {
    id: "korean-glass",
    number: "02",
    name: "Koreansk Glass & Fransk",
    duration: "90 min",
    price: 850,
    desc: "Translucent glassfinish med ultra-tynne håndmalte micro-tips.",
    tag: "Editorial",
    photo: "/demo/nails/pin-glass-french.jpg",
  },
  {
    id: "classic-clean",
    number: "03",
    name: "Russisk Manikyr & Prep",
    duration: "50 min",
    price: 550,
    desc: "Tørr e-file presisjonspleie, forming og naturlig glassglans.",
    tag: "Naturlig",
    photo: "/demo/nails/pin-russian-prep.jpg",
  },
  {
    id: "glazed-chrome",
    number: "04",
    name: "Hailey Glazed Donut",
    duration: "85 min",
    price: 900,
    desc: "Perleskinnende iriserende krompulver over melkehvit apex-gele.",
    tag: "Trending",
    photo: "/demo/nails/pin-glazed-donut.jpg",
  },
];

const LOOKBOOK: LookbookItem[] = [
  {
    id: "look-1",
    title: "Koreansk Micro-French",
    category: "french",
    price: 850,
    duration: "90 min",
    image: "/demo/nails/pin-glass-french.jpg",
    tag: "Fransk",
    serviceId: "korean-glass",
  },
  {
    id: "look-2",
    title: "Hailey Glazed Donut",
    category: "chrome",
    price: 900,
    duration: "85 min",
    image: "/demo/nails/pin-glazed-donut.jpg",
    tag: "Krom",
    serviceId: "glazed-chrome",
  },
  {
    id: "look-3",
    title: "Structured BIAB Gel",
    category: "biab",
    price: 750,
    duration: "75 min",
    image: "/demo/nails/pin-biab.jpg",
    tag: "BIAB",
    serviceId: "biab-structured",
  },
  {
    id: "look-4",
    title: "Russisk Cuticle Prep",
    category: "biab",
    price: 550,
    duration: "50 min",
    image: "/demo/nails/pin-russian-prep.jpg",
    tag: "Prep",
    serviceId: "classic-clean",
  },
  {
    id: "look-5",
    title: "Tortoiseshell & Obsidian",
    category: "3d",
    price: 1100,
    duration: "95 min",
    image: "/demo/nails/nail-5.jpg",
    tag: "Art",
    serviceId: "korean-glass",
  },
  {
    id: "look-6",
    title: "Clean Natural Apex",
    category: "biab",
    price: 750,
    duration: "75 min",
    image: "/demo/nails/nail-4.jpg",
    tag: "BIAB",
    serviceId: "biab-structured",
  },
];

// Simple Weekly Slot Strip
interface DayOption {
  day: string;
  date: string;
  slots: string[];
}

const SLOT_PATTERNS: string[][] = [
  ["12:00", "14:30", "16:30"],
  ["10:00", "14:00", "16:00"],
  ["10:00", "12:00", "16:00"],
  ["10:00", "12:00", "14:00"],
  ["10:00", "14:00", "16:00"],
  ["11:00", "13:00", "17:00"],
];

const NO_DAY_NAMES = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];
const NO_MONTH_NAMES = [
  "jan", "feb", "mar", "apr", "mai", "jun",
  "jul", "aug", "sep", "okt", "nov", "des",
];

function buildSchedule(): DayOption[] {
  const schedule: DayOption[] = [];
  const base = new Date();
  base.setDate(base.getDate() + 1);
  for (let i = 0; i < 6; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    schedule.push({
      day: NO_DAY_NAMES[d.getDay()],
      date: `${d.getDate()}. ${NO_MONTH_NAMES[d.getMonth()]}`,
      slots: SLOT_PATTERNS[i],
    });
  }
  return schedule;
}

const DAYS_SCHEDULE: DayOption[] = buildSchedule();

export default function StudioKloNailsView() {
  // Theme State
  const [paletteKey, setPaletteKey] = useState<string>("luna-editorial");
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Large Viewfinder & Lookbook Carousel State
  const [activeLookIdx, setActiveLookIdx] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<"0.5x" | "1x" | "2x">("1x");
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [filter, setFilter] = useState<"all" | "biab" | "french" | "chrome" | "3d">("all");
  const [modalPhoto, setModalPhoto] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Booking selections
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(4); // Fre 1. nov
  const [selectedTime, setSelectedTime] = useState<string>("14:00");
  const [silentMode, setSilentMode] = useState<boolean>(true);

  // Guest & Confirmation
  const [name, setName] = useState("Mathilde V.");
  const [phone, setPhone] = useState("+47 905 43 210");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("klo_nail_palette_v3");
    if (saved && PALETTES[saved]) setPaletteKey(saved);
  }, []);

  const changePalette = (id: string) => {
    setPaletteKey(id);
    localStorage.setItem("klo_nail_palette_v3", id);
    setPaletteOpen(false);
  };

  const theme = PALETTES[paletteKey] || PALETTES["luna-editorial"];

  // Filtered lookbook list
  const filteredLookbook = useMemo(() => {
    if (filter === "all") return LOOKBOOK;
    return LOOKBOOK.filter((item) => item.category === filter);
  }, [filter]);

  // Keep active index in bounds when filter changes
  useEffect(() => {
    setActiveLookIdx(0);
  }, [filter]);

  const activeLook = filteredLookbook[activeLookIdx] || filteredLookbook[0] || LOOKBOOK[0];

  // Auto-switch images when idle (cycles every 4.5 seconds)
  useEffect(() => {
    if (isInteracting) return;
    const interval = setInterval(() => {
      setActiveLookIdx((prev) => (prev + 1) % filteredLookbook.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isInteracting, filteredLookbook.length]);

  // Handle user interaction timeout
  const registerInteraction = () => {
    setIsInteracting(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 10000); // 10s idle cooldown before auto-rotation resumes
  };

  const scrollCarousel = (dir: "left" | "right") => {
    registerInteraction();
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: dir === "left" ? -240 : 240,
        behavior: "smooth",
      });
    }
  };

  const selectLookItem = (index: number, item: LookbookItem) => {
    registerInteraction();
    setActiveLookIdx(index);
    const service = SERVICES.find((s) => s.id === item.serviceId);
    if (service) setSelectedService(service);
  };

  const pickLookAndBook = (item: LookbookItem) => {
    registerInteraction();
    const service = SERVICES.find((s) => s.id === item.serviceId);
    if (service) setSelectedService(service);
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      const el = document.getElementById("pass");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const themeVars = {
    "--klo-bg": theme.bgPrimary,
    "--klo-bg-alt": theme.bgSecondary,
    "--klo-card": theme.cardBg,
    "--klo-text": theme.textPrimary,
    "--klo-muted": theme.textMuted,
    "--klo-accent": theme.accent,
    "--klo-accent-muted": theme.accentMuted,
    "--klo-border": theme.border,
  } as React.CSSProperties;

  return (
    <PreviewShell
      nicheTitle="Studio Klō Nails"
      nicheSubtitle="Luna Editorial × Pastel Blob × Anastasia Noir · Frogner"
      accentColor={theme.accent}
    >
      <div
        style={themeVars}
        className="min-h-screen text-[var(--klo-text)] bg-[var(--klo-bg)] transition-colors duration-300 font-sans selection:bg-[var(--klo-accent)] selection:text-white"
      >
        {/* =========================================================
            HEADER (Clean: Logo + Palette + "Bestill")
            ========================================================= */}
        <header className="sticky top-0 z-40 bg-[var(--klo-bg)]/95 backdrop-blur-md border-b border-[var(--klo-border)] transition-colors">
          <div className="max-w-xl mx-auto px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StudioKloLogo className="w-5 h-5 text-[var(--klo-accent)]" />
              <span className="font-serif font-bold text-sm tracking-tight">
                STUDIO KLŌ
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Palette Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPaletteOpen(!paletteOpen)}
                  className="w-7 h-7 rounded-full border border-[var(--klo-border)] bg-[var(--klo-card)] flex items-center justify-center text-xs cursor-pointer shadow-2xs"
                  title="Fargetema"
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: theme.dot }}
                  />
                </button>

                {paletteOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)] shadow-xl z-50 animate-in fade-in slide-in-from-top-2 text-xs">
                    <div className="space-y-1">
                      {Object.values(PALETTES).map((pal) => (
                        <button
                          key={pal.id}
                          onClick={() => changePalette(pal.id)}
                          className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-colors ${
                            paletteKey === pal.id
                              ? "bg-[var(--klo-accent)]/15 font-bold"
                              : "hover:bg-[var(--klo-bg-alt)]"
                          }`}
                        >
                          <span className="text-[11px]">{pal.name}</span>
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/15"
                            style={{ backgroundColor: pal.dot }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Punchy 1-Word CTA */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("booking");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3.5 py-1.5 rounded-full bg-[var(--klo-accent)] text-white text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
              >
                Bestill
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 py-6 space-y-10">
          {/* =========================================================
              1. HERO SECTION
              ========================================================= */}
          <section className="space-y-4 text-center pt-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--klo-muted)] block">
              Frogner · Oslo
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">
              Manikyr som krever et ekstra blikk.
            </h1>

            <p className="text-xs text-[var(--klo-muted)] leading-relaxed max-w-sm mx-auto">
              Europeisk HEMA-fri BIAB builder gel og skånsom russisk cuticle care.
              En rolig 1-til-1 stol i Frogner.
            </p>

            {/* Anastasia Noir Style 2 Main Action Pills */}
            <div className="flex justify-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("booking");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 rounded-full bg-[var(--klo-text)] text-[var(--klo-bg)] text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                Bestill time
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("menu");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 rounded-full border border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-text)] text-xs font-medium hover:border-[var(--klo-text)] transition-colors cursor-pointer"
              >
                Se meny
              </button>
            </div>

            {/* 3 Simple Trust Points (Luna Style) */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono text-[10px] text-[var(--klo-muted)]">
              <div className="p-2 rounded-xl bg-[var(--klo-bg-alt)] border border-[var(--klo-border)]">
                <span className="font-bold text-[var(--klo-text)] block">HEMA-fri</span>
                <span>Trygg formel</span>
              </div>
              <div className="p-2 rounded-xl bg-[var(--klo-bg-alt)] border border-[var(--klo-border)]">
                <span className="font-bold text-[var(--klo-text)] block">4 Uker</span>
                <span>Garantert hold</span>
              </div>
              <div className="p-2 rounded-xl bg-[var(--klo-bg-alt)] border border-[var(--klo-border)]">
                <span className="font-bold text-[var(--klo-text)] block">Rolig Stol</span>
                <span>Valgfri stillhet</span>
              </div>
            </div>
          </section>

          {/* =========================================================
              2. COMBINED INTERACTIVE VIEWFINDER LOOKBOOK
              (Large zoomable viewer at top + set thumbnails below + auto-rotation)
              ========================================================= */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--klo-muted)] block">
                  Lookbook &amp; Sett
                </span>
                <h2 className="font-serif text-lg font-bold">
                  Signatur-Sett
                </h2>
              </div>

              {/* Desktop arrows */}
              <div className="flex gap-1">
                <button
                  onClick={() => scrollCarousel("left")}
                  aria-label="Forrige"
                  className="w-7 h-7 rounded-full border border-[var(--klo-border)] bg-[var(--klo-card)] flex items-center justify-center text-xs cursor-pointer hover:border-[var(--klo-accent)]"
                >
                  <FiChevronLeft size={13} />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  aria-label="Neste"
                  className="w-7 h-7 rounded-full border border-[var(--klo-border)] bg-[var(--klo-card)] flex items-center justify-center text-xs cursor-pointer hover:border-[var(--klo-accent)]"
                >
                  <FiChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* 1-Word Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1 font-mono text-xs">
              {[
                { id: "all", label: "Alle" },
                { id: "biab", label: "BIAB" },
                { id: "french", label: "Fransk" },
                { id: "chrome", label: "Krom" },
                { id: "3d", label: "3D" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    registerInteraction();
                    setFilter(c.id as any);
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                    filter === c.id
                      ? "bg-[var(--klo-accent)] text-white font-bold"
                      : "border border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-muted)]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* LARGE VIEWFINDER / IMAGE VIEWER WITH IPHONE-STYLE ZOOM */}
            <div
              onMouseEnter={registerInteraction}
              onTouchStart={registerInteraction}
              className="relative aspect-[4/5] sm:aspect-[1/1] w-full min-h-[380px] sm:min-h-[440px] rounded-[2rem] overflow-hidden border border-[var(--klo-border)] shadow-md group bg-neutral-900"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLook.image}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => setModalPhoto(activeLook.image)}
                >
                  <Image
                    src={activeLook.image}
                    alt={activeLook.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 580px"
                    className={`object-cover transition-transform duration-500 ease-out will-change-transform ${
                      zoomLevel === "0.5x"
                        ? "scale-100"
                        : zoomLevel === "2x"
                        ? "scale-160"
                        : "scale-125"
                    }`}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Viewfinder Overlays */}
              <div className="absolute inset-0 p-3.5 flex flex-col justify-between pointer-events-none">
                {/* Top Info Bar */}
                <div className="flex justify-between items-center text-[10px] font-mono text-white/90">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold tracking-wider">LIVE VIEW</span>
                    <span>· {activeLook.tag}</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs border border-white/10 font-bold">
                    {activeLook.price} kr
                  </span>
                </div>

                {/* Bottom Controls: Zoom Buttons + Quick Select Pill */}
                <div className="space-y-2 pointer-events-auto">
                  {/* iPhone-style camera zoom pills */}
                  <div className="flex justify-center gap-1.5">
                    {(["0.5x", "1x", "2x"] as const).map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          registerInteraction();
                          setZoomLevel(z);
                        }}
                        className={`w-7 h-7 rounded-full text-[10px] font-mono font-bold flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-xs ${
                          zoomLevel === z
                            ? "bg-white text-black ring-2 ring-black/40 scale-105"
                            : "bg-black/60 text-white hover:bg-black/80"
                        }`}
                      >
                        {z}
                      </button>
                    ))}
                  </div>

                  {/* Active Set Summary Bar */}
                  <div className="p-3 rounded-2xl bg-[var(--klo-card)]/95 backdrop-blur-md border border-[var(--klo-border)] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-serif font-bold text-sm block leading-none">
                        {activeLook.title}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--klo-muted)] block mt-0.5">
                      {activeLook.duration}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => pickLookAndBook(activeLook)}
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--klo-accent)] text-white text-xs font-mono font-bold hover:opacity-95 transition-opacity cursor-pointer shadow-2xs"
                    >
                      Bestill
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* THUMBNAIL FILMSTRIP BELOW (Tapping updates large view above) */}
            <div
              ref={carouselRef}
              className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory pb-2 pt-1 scroll-smooth [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-[var(--klo-border)] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--klo-accent)] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:opacity-90"
            >
              {filteredLookbook.map((item, idx) => {
                const isCurrent = activeLook.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => selectLookItem(idx, item)}
                    className={`flex-shrink-0 w-[150px] sm:w-[165px] snap-start rounded-2xl border-2 transition-all cursor-pointer overflow-hidden p-2 flex flex-col justify-between ${
                      isCurrent
                        ? "border-[var(--klo-accent)] bg-[var(--klo-card)] shadow-xs ring-1 ring-[var(--klo-accent)] scale-102"
                        : "border-[var(--klo-border)] bg-[var(--klo-card)] hover:border-[var(--klo-accent)]/50"
                    }`}
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="165px"
                        className="object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/60 text-white font-mono text-[8px] font-bold">
                        {item.tag}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-serif font-bold truncate">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="font-bold text-[var(--klo-accent)]">
                          {item.price} kr
                        </span>
                        <span className={isCurrent ? "font-bold text-[var(--klo-text)]" : "text-[var(--klo-muted)]"}>
                          {isCurrent ? "Viser ✓" : "Velg"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Themed Carousel Progress Slider */}
            <div className="w-full px-1 pt-0.5">
              <div className="h-1 w-full bg-[var(--klo-border)] rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "var(--klo-accent)",
                    width: `${100 / filteredLookbook.length}%`,
                    transform: `translateX(${activeLookIdx * 100}%)`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* =========================================================
              3. PRICE MENU (Pastel Blob Style Divided List)
              ========================================================= */}
          <section id="menu" className="space-y-4 pt-2">
            <div className="border-b border-[var(--klo-border)] pb-2 flex justify-between items-end">
              <div>
                <span className="font-serif italic text-xs text-[var(--klo-accent)] block">
                  Manikyr
                </span>
                <h2 className="font-serif text-xl font-bold tracking-tight">
                  PRISLISTE
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[var(--klo-muted)]">
                Inkl. russisk cuticle prep
              </span>
            </div>

            {/* Divided Minimal List */}
            <div className="space-y-0 divide-y divide-[var(--klo-border)]">
              {SERVICES.map((s) => {
                const isSelected = selectedService.id === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedService(s);
                      const el = document.getElementById("booking");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`py-3.5 flex items-center justify-between cursor-pointer transition-colors group ${
                      isSelected ? "text-[var(--klo-accent)]" : ""
                    }`}
                  >
                    <div className="pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[var(--klo-muted)]">
                          /{s.number}
                        </span>
                        <h3 className="font-serif font-bold text-sm text-[var(--klo-text)] group-hover:text-[var(--klo-accent)] transition-colors">
                          {s.name}
                        </h3>
                      </div>
                      <p className="text-[11px] text-[var(--klo-muted)] mt-0.5">
                        {s.desc}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="font-serif font-bold text-base text-[var(--klo-text)] block">
                        {s.price} kr
                      </span>
                      <span className={`text-[10px] font-mono ${isSelected ? "text-[var(--klo-accent)] font-bold" : "text-[var(--klo-muted)]"}`}>
                        {isSelected ? "Valgt ✓" : "Velg →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* =========================================================
              4. STUDIO POLICIES (Styled with Background Color & Badge)
              ========================================================= */}
          <section className="p-4 sm:p-5 rounded-3xl border border-[var(--klo-border)] bg-[var(--klo-bg-alt)] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[var(--klo-border)] pb-2 font-mono">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--klo-text)]">
                STUDIO POLICIES
              </span>
              <span className="text-[9px] text-[var(--klo-muted)]">Frogner Atelier</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)]">
                <span className="w-5 h-5 rounded-full bg-[var(--klo-accent)]/15 text-[var(--klo-accent)] font-bold text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  01
                </span>
                <div>
                  <h4 className="font-serif font-bold text-xs text-[var(--klo-text)]">
                    Stillegående Stol (Valgfritt)
                  </h4>
                  <p className="text-[11px] text-[var(--klo-muted)] mt-0.5 leading-relaxed font-sans">
                    Nyt stillheten med matcha eller musikk. Vi stiller kun nødvendige spørsmål – ingen påtvunget smalltalk.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)]">
                <span className="w-5 h-5 rounded-full bg-[var(--klo-accent)]/15 text-[var(--klo-accent)] font-bold text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  02
                </span>
                <div>
                  <h4 className="font-serif font-bold text-xs text-[var(--klo-text)]">
                    100% HEMA-Frie Produkter
                  </h4>
                  <p className="text-[11px] text-[var(--klo-muted)] mt-0.5 leading-relaxed font-sans">
                    Kun sertifiserte europeiske builder geleer som ivaretar naturlig neglehelse og forebygger allergi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)]">
                <span className="w-5 h-5 rounded-full bg-[var(--klo-accent)]/15 text-[var(--klo-accent)] font-bold text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  03
                </span>
                <div>
                  <h4 className="font-serif font-bold text-xs text-[var(--klo-text)]">
                    24t Fleksibel Avbestilling
                  </h4>
                  <p className="text-[11px] text-[var(--klo-muted)] mt-0.5 leading-relaxed font-sans">
                    Flytt eller avbestill kostnadsfritt inntil 24 timer før oppmøte.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              5. STREAMLINED BOOKING (With Image under Valgt Behandling)
              ========================================================= */}
          <section id="booking" className="space-y-4 pt-2">
            <div className="border-b border-[var(--klo-border)] pb-2 flex justify-between items-end">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--klo-muted)] block">
                  Reservasjon
                </span>
                <h2 className="font-serif text-xl font-bold">
                  Velg Tid &amp; Bestill
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[var(--klo-accent)] font-bold">
                {selectedService.price} kr
              </span>
            </div>

            {!confirmed ? (
              <form onSubmit={handleBooking} className="space-y-4">
                {/* 1. Picked Service Card WITH LARGE IMAGE SHOWN */}
                <div className="rounded-3xl border border-[var(--klo-border)] bg-[var(--klo-card)] overflow-hidden shadow-xs">
                  <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-neutral-900">
                    <Image
                      src={selectedService.photo}
                      alt={selectedService.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 580px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Valgt Behandling</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[9px] flex items-center gap-1">
                      <FiClock size={11} className="text-white/80" />
                      <span>{selectedService.duration}</span>
                    </div>

                    {/* Bottom Info inside the image overlay */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white">
                      <div className="pr-2">
                        <span className="font-serif font-bold text-base sm:text-lg block drop-shadow-sm leading-snug">
                          {selectedService.name}
                        </span>
                        <span className="text-[11px] text-white/85 block mt-0.5 drop-shadow-sm font-sans">
                          {selectedService.desc}
                        </span>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="font-serif font-bold text-lg sm:text-xl text-white block drop-shadow-sm leading-none">
                          {selectedService.price} kr
                        </span>
                        <span className="text-[9px] font-mono text-white/70 block mt-0.5">
                          Inkl. prep
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Pick Day Strip */}
                <div className="space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] text-[var(--klo-muted)] block uppercase">
                    Velg Dag (Denne Uken):
                  </span>
                  <div className="grid grid-cols-6 gap-1">
                    {DAYS_SCHEDULE.map((d, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedDayIdx(idx)}
                        className={`p-1.5 rounded-xl border text-center transition-colors cursor-pointer ${
                          selectedDayIdx === idx
                            ? "bg-[var(--klo-text)] text-[var(--klo-bg)] border-[var(--klo-text)] font-bold"
                            : "border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-muted)] hover:border-[var(--klo-text)]"
                        }`}
                      >
                        <span className="block text-[9px]">{d.day}</span>
                        <span className="block text-xs font-bold">{d.date.split(".")[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Pick Time Slot */}
                <div className="space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] text-[var(--klo-muted)] block uppercase">
                    Ledige Tider ({DAYS_SCHEDULE[selectedDayIdx].day} {DAYS_SCHEDULE[selectedDayIdx].date}):
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {DAYS_SCHEDULE[selectedDayIdx].slots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-xl border text-center transition-colors cursor-pointer text-xs ${
                          selectedTime === time
                            ? "bg-[var(--klo-accent)] text-white border-[var(--klo-accent)] font-bold"
                            : "border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-text)] hover:border-[var(--klo-accent)]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Silent Mode Quick Switch */}
                <div className="p-3 rounded-2xl border border-[var(--klo-border)] bg-[var(--klo-card)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FiVolumeX className="text-[var(--klo-muted)]" size={15} />
                    <span className="font-serif">Stillegående time (uten smalltalk)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSilentMode(!silentMode)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors cursor-pointer ${
                      silentMode
                        ? "bg-[var(--klo-accent)] text-white font-bold"
                        : "border border-[var(--klo-border)] text-[var(--klo-muted)]"
                    }`}
                  >
                    {silentMode ? "Aktiv ✓" : "Nei"}
                  </button>
                </div>

                {/* 5. Contact Inputs */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ditt navn"
                    className="p-2.5 rounded-xl border border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-text)] outline-none focus:border-[var(--klo-accent)]"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobil"
                    className="p-2.5 rounded-xl border border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-text)] outline-none focus:border-[var(--klo-accent)]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[var(--klo-accent)] text-white text-xs font-medium hover:opacity-95 transition-opacity cursor-pointer shadow-sm text-center"
                >
                  Bekreft time · {selectedService.price} kr
                </button>

                <p className="text-[10px] text-center font-mono text-[var(--klo-muted)]">
                  Ingen forhåndsbetaling. Betales med Vipps ved oppmøte.
                </p>
              </form>
            ) : (
              /* =========================================================
                 SLIM DIGITAL BOARDING PASS
                 ========================================================= */
              <motion.div
                id="pass"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-[var(--klo-accent)] bg-[var(--klo-card)] p-4 sm:p-5 space-y-3 font-mono text-xs shadow-md"
              >
                <div className="flex justify-between items-start border-b border-[var(--klo-border)] pb-3">
                  <div>
                    <span className="text-[9px] text-[var(--klo-accent)] font-bold block uppercase tracking-wider">
                      ● STOL BEKREFTET
                    </span>
                    <h3 className="font-serif text-base font-bold text-[var(--klo-text)] mt-0.5">
                      Studio Klō Frogner
                    </h3>
                  </div>
                  <span className="font-serif font-bold text-base text-[var(--klo-accent)]">
                    {selectedService.price} kr
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--klo-bg)] border border-[var(--klo-border)]">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[var(--klo-border)] flex-shrink-0">
                    <Image
                      src={selectedService.photo}
                      alt={selectedService.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-xs block">
                      {selectedService.name}
                    </span>
                    <span className="text-[10px] text-[var(--klo-muted)] block">
                      {DAYS_SCHEDULE[selectedDayIdx].day} {DAYS_SCHEDULE[selectedDayIdx].date} kl. {selectedTime}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pb-2 border-b border-[var(--klo-border)]">
                  <div>
                    <span className="text-[9px] text-[var(--klo-muted)] block uppercase">Gjest</span>
                    <span className="font-bold text-[var(--klo-text)]">{name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[var(--klo-muted)] block uppercase">Atmosfære</span>
                    <span className="font-bold text-[var(--klo-text)]">
                      {silentMode ? "Stillegående stol" : "Standard"}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-[var(--klo-muted)] flex justify-between items-center">
                  <span>Eksempelgata 12, Oslo</span>
                  <span>Betales via Vipps</span>
                </div>

                <button
                  type="button"
                  onClick={() => setConfirmed(false)}
                  className="w-full py-2 text-center text-[var(--klo-accent)] underline text-[11px] font-bold cursor-pointer"
                >
                  Endre time
                </button>
              </motion.div>
            )}
          </section>

          {/* =========================================================
              6. CONTACT & LOCATION
              ========================================================= */}
          <section className="p-4 rounded-2xl border border-[var(--klo-border)] bg-[var(--klo-bg-alt)] space-y-2 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[var(--klo-muted)] block font-bold">
              KONTAKT &amp; STED
            </span>
            <div className="flex justify-between items-center text-[11px]">
              <span>Adresse: Eksempelgata 12, Oslo</span>
              <span className="text-[var(--klo-muted)]">T-bane / Trikk</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span>Åpningstider: Tir–Lør 10:00–18:00</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--klo-accent)] font-bold hover:underline"
              >
                @studioklo.oslo ↗
              </a>
            </div>
          </section>
        </main>

        {/* Minimal Footer */}
        <footer className="py-6 border-t border-[var(--klo-border)] text-center font-mono text-[10px] text-[var(--klo-muted)] space-y-1">
          <div>STUDIO KLØ · FROGNER ATELIER · 2026</div>
          <div className="text-[9px] opacity-60">Demo — fiktiv virksomhet</div>
        </footer>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {modalPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <div className="relative max-w-sm w-full aspect-square rounded-2xl overflow-hidden border border-white/20">
              <Image src={modalPhoto} alt="Zoom" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setModalPhoto(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-white cursor-pointer"
              >
                <FiX size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PreviewShell>
  );
}
