"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiVolumeX,
  FiArrowDown,
  FiArrowRight,
  FiCheck,
  FiClock,
  FiMapPin,
  FiStar,
  FiCamera,
  FiZap,
} from "react-icons/fi";
import PreviewShell from "@/components/preview/PreviewShell";

// ==========================================
// 4 BESPOKE HARMONIZED COLOR PALETTES
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
  "scandi-linen": {
    id: "scandi-linen",
    name: "Scandinavian Linen & Ink",
    tag: "Minimalist Atelier",
    dot: "#161514",
    swatches: ["#FAF9F6", "#C9A87C", "#161514"],
    bgPrimary: "#FAF9F6",
    bgSecondary: "#EFECE5",
    cardBg: "#FFFFFF",
    textPrimary: "#161514",
    textMuted: "#6B6965",
    accent: "#161514",
    accentMuted: "#C9A87C",
    border: "rgba(22, 21, 20, 0.12)",
  },
  "y2k-pink": {
    id: "y2k-pink",
    name: "Y2K Rose Bubble Chic",
    tag: "Inspo: y2k-pink-nail-cards",
    dot: "#E55B7D",
    swatches: ["#FFF0F3", "#F6A8B8", "#E55B7D"],
    bgPrimary: "#FFF0F3",
    bgSecondary: "#FCE4EC",
    cardBg: "#FFFFFF",
    textPrimary: "#2B161B",
    textMuted: "#8C5362",
    accent: "#E55B7D",
    accentMuted: "#F6A8B8",
    border: "rgba(229, 91, 125, 0.22)",
  },
  "luna-editorial": {
    id: "luna-editorial",
    name: "Luna Cashmere & Rose",
    tag: "Inspo: luna-nail-studio",
    dot: "#B87D75",
    swatches: ["#FBF8F5", "#D4A0A0", "#2E2522"],
    bgPrimary: "#FBF8F5",
    bgSecondary: "#F5ECE4",
    cardBg: "#FFFFFF",
    textPrimary: "#2E2522",
    textMuted: "#7A6C67",
    accent: "#B87D75",
    accentMuted: "#D4A0A0",
    border: "rgba(184, 125, 117, 0.22)",
  },
  "matcha-sage": {
    id: "matcha-sage",
    name: "Matcha & Soft Sage",
    tag: "Organic Botanical",
    dot: "#4A6B5D",
    swatches: ["#F5F7F3", "#8BA89B", "#1C2621"],
    bgPrimary: "#F5F7F3",
    bgSecondary: "#EBF0E8",
    cardBg: "#FFFFFF",
    textPrimary: "#1C2621",
    textMuted: "#5C6E65",
    accent: "#4A6B5D",
    accentMuted: "#8BA89B",
    border: "rgba(74, 107, 93, 0.22)",
  },
};

// Studio Klø Custom Architectural Logo
function StudioKloLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="36" height="36" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 28V16C12 11.5817 15.5817 8 20 8C24.4183 8 28 11.5817 28 16V28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line x1="16" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <circle cx="20" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 4 Signature Nail Services (from Luna Nail Studio layout)
interface NailService {
  id: string;
  number: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  photo: string;
  tag: string;
}

const NAIL_SERVICES: NailService[] = [
  {
    id: "classic-clean",
    number: "01",
    name: "Klassisk Manikyr & Cuticle Prep",
    duration: "50 min",
    price: 550,
    description: "Russisk tørr e-file presisjonspleie, forming, organisk neglebåndsolje og polert glans.",
    photo: "/demo/nails/nail-2.jpg",
    tag: "Naturlig Pleie",
  },
  {
    id: "biab-structured",
    number: "02",
    name: "Structured BIAB Gel Overlay",
    duration: "75 min",
    price: 750,
    description: "Forsterker naturlig negleapex med europeisk HEMA-fri builder gel. 4 ukers holdbarhet.",
    photo: "/demo/nails/nail-4.jpg",
    tag: "Mest Populær",
  },
  {
    id: "micro-french",
    number: "03",
    name: "Koreansk Glass & Micro-Art",
    duration: "90 min",
    price: 850,
    description: "Ultra-fine håndmalte micro-tips, mineral krom, eller minimalistisk aura gradient over BIAB.",
    photo: "/demo/nails/nail-1.jpg",
    tag: "Editorial Chic",
  },
  {
    id: "japanese-powder",
    number: "04",
    name: "Japansk Styrkende Næring",
    duration: "60 min",
    price: 650,
    description: "Ikke-kjemisk voks- og silisiumpolering som herder svekkede neglesenger etter extensions.",
    photo: "/demo/nails/nail-6.jpg",
    tag: "Neglerestaurering",
  },
];

// Nail Shapes with exact SVG silhouettes
interface NailShapeOption {
  id: string;
  name: string;
  desc: string;
  svgPath: string;
}

const NAIL_SHAPES: NailShapeOption[] = [
  {
    id: "natural_oval",
    name: "Natural Oval",
    desc: "Organisk kurve",
    svgPath: "M 10 38 L 10 20 C 10 10 14 4 20 4 C 26 4 30 10 30 20 L 30 38 Z",
  },
  {
    id: "almond",
    name: "Almond",
    desc: "Smalnet spiss",
    svgPath: "M 10 38 L 10 22 C 10 14 13 6 20 2 C 27 6 30 14 30 22 L 30 38 Z",
  },
  {
    id: "square",
    name: "Square",
    desc: "Skarp 90° kant",
    svgPath: "M 10 38 L 10 6 L 30 6 L 30 38 Z",
  },
  {
    id: "coffin",
    name: "Coffin",
    desc: "Avkortet spiss",
    svgPath: "M 10 38 L 12 18 L 15 4 L 25 4 L 28 18 L 30 38 Z",
  },
  {
    id: "stiletto",
    name: "Stiletto",
    desc: "Dramatisk profil",
    svgPath: "M 10 38 L 10 22 L 20 2 L 30 22 L 30 38 Z",
  },
];

// Y2K Weekly Slots Matrix Data
interface WeekDaySlot {
  day: string;
  date: string;
  slots: { time: string; status: "open" | "last" | "full" }[];
}

const WEEKLY_SLOTS_DATA: WeekDaySlot[] = [
  {
    day: "MAN",
    date: "28. OKT",
    slots: [
      { time: "10:00", status: "full" },
      { time: "12:00", status: "open" },
      { time: "14:00", status: "open" },
      { time: "16:00", status: "last" },
    ],
  },
  {
    day: "TIR",
    date: "29. OKT",
    slots: [
      { time: "10:00", status: "open" },
      { time: "12:00", status: "full" },
      { time: "14:00", status: "open" },
      { time: "16:00", status: "open" },
    ],
  },
  {
    day: "ONS",
    date: "30. OKT",
    slots: [
      { time: "10:00", status: "open" },
      { time: "12:00", status: "last" },
      { time: "14:00", status: "full" },
      { time: "16:00", status: "open" },
    ],
  },
  {
    day: "TOR",
    date: "31. OKT",
    slots: [
      { time: "10:00", status: "open" },
      { time: "12:00", status: "open" },
      { time: "14:00", status: "open" },
      { time: "16:00", status: "last" },
    ],
  },
  {
    day: "FRE",
    date: "1. NOV",
    slots: [
      { time: "10:00", status: "last" },
      { time: "12:00", status: "full" },
      { time: "14:00", status: "open" },
      { time: "16:00", status: "open" },
    ],
  },
  {
    day: "LØR",
    date: "2. NOV",
    slots: [
      { time: "11:00", status: "last" },
      { time: "13:00", status: "last" },
      { time: "15:00", status: "full" },
      { time: "17:00", status: "open" },
    ],
  },
];

// Verified reviews stack from Y2K Pin
const REVIEWS = [
  {
    name: "Mathilde V.",
    set: "Structured BIAB · Coffin",
    text: "Beste BIAB i Oslo. Ingen avskalling etter 5 uker, og neglebåndene er så pene. Den rolige stolen var en drøm.",
    rating: 5,
    avatar: "/demo/nails/nail-1.jpg",
  },
  {
    name: "Emilie Solheim",
    set: "Micro-French · Almond",
    text: "Presisjonen på micro-fransk er helt vill. Veldig deilig å slippe småprat når man bare vil slappe av.",
    rating: 5,
    avatar: "/demo/nails/nail-4.jpg",
  },
  {
    name: "Nora Lind",
    set: "Japansk Næring · Oval",
    text: "Reddet neglene mine etter 2 år med tunge akrylnegler. Studioet i Frogner føles som et ekte spa.",
    rating: 5,
    avatar: "/demo/nails/nail-3.jpg",
  },
];

export default function PreviewNailsPage() {
  const [paletteKey, setPaletteKey] = useState<string>("scandi-linen");
  const [palettePickerOpen, setPalettePickerOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<NailService>(NAIL_SERVICES[1]);
  const [selectedShape, setSelectedShape] = useState<NailShapeOption>(NAIL_SHAPES[1]);
  const [silentAppt, setSilentAppt] = useState(true);
  const [selectedDaySlot, setSelectedDaySlot] = useState({
    day: "FRE",
    date: "1. NOV",
    time: "14:00",
  });
  const [clientName, setClientName] = useState("Mathilde V.");
  const [clientPhone, setClientPhone] = useState("+47 905 43 210");
  const [confirmed, setConfirmed] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  // Y2K Camera Viewfinder state
  const [cameraZoom, setCameraZoom] = useState<"0.5" | "1x" | "3x">("1x");
  const [cameraPhotoIdx, setCameraPhotoIdx] = useState(0);

  const cameraPhotos = [
    { src: "/demo/nails/nail-1.jpg", label: "MICRO FRENCH", spec: "ISO 100 · F/2.8 · FROGNER" },
    { src: "/demo/nails/nail-4.jpg", label: "STRUCTURED BIAB", spec: "ISO 160 · F/1.8 · APEX" },
    { src: "/demo/nails/nail-2.jpg", label: "GLAZED MINERAL", spec: "ISO 100 · F/2.0 · NATURAL" },
    { src: "/demo/nails/nail-3.jpg", label: "AURA OMBRÉ", spec: "ISO 200 · F/2.8 · EDITORIAL" },
  ];

  // Restore saved palette
  useEffect(() => {
    const saved = localStorage.getItem("klo_nail_palette");
    if (saved && PALETTES[saved]) {
      setPaletteKey(saved);
    }
  }, []);

  const changePalette = (id: string) => {
    setPaletteKey(id);
    localStorage.setItem("klo_nail_palette", id);
    setPalettePickerOpen(false);
  };

  const currentTheme = PALETTES[paletteKey] || PALETTES["scandi-linen"];

  // Smooth scroll to confirmation voucher pass
  useEffect(() => {
    if (confirmed) {
      const timer = setTimeout(() => {
        const pass = document.getElementById("confirmed-chair-pass");
        if (pass) {
          pass.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [confirmed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  // Inline CSS variables injected on the outer container
  const themeVars = {
    "--klo-bg": currentTheme.bgPrimary,
    "--klo-bg-alt": currentTheme.bgSecondary,
    "--klo-card": currentTheme.cardBg,
    "--klo-text": currentTheme.textPrimary,
    "--klo-muted": currentTheme.textMuted,
    "--klo-accent": currentTheme.accent,
    "--klo-accent-muted": currentTheme.accentMuted,
    "--klo-border": currentTheme.border,
  } as React.CSSProperties;

  return (
    <PreviewShell
      nicheTitle="Studio Klō Nails"
      nicheSubtitle="Luna Editorial × Y2K Pop Harmonized Atelier · Frogner"
      accentColor={currentTheme.accent}
    >
      <div
        style={themeVars}
        className="min-h-screen text-[var(--klo-text)] bg-[var(--klo-bg)] transition-colors duration-300 font-sans selection:bg-[var(--klo-accent)] selection:text-white"
      >
        {/* =========================================================
            TOP STICKY COMMAND BAR (Brand Logo + Palette Switcher 🎨)
            ========================================================= */}
        <header className="sticky top-0 z-30 bg-[var(--klo-bg)]/90 backdrop-blur-md border-b border-[var(--klo-border)] transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StudioKloLogo className="w-8 h-8 text-[var(--klo-accent)] flex-shrink-0" />
              <div>
                <span className="font-serif text-base sm:text-lg font-bold tracking-tight block leading-none">
                  STUDIO KLŌ
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-[var(--klo-muted)] block mt-0.5">
                  Frogner Atelier · Oslo
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Palette Changer Button with 🎨 Icon */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPalettePickerOpen(!palettePickerOpen)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-full border border-[var(--klo-border)] bg-[var(--klo-card)] hover:border-[var(--klo-accent)] text-xs font-mono flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  title="Change Studio Color Palette"
                >
                  <span className="text-sm">🎨</span>
                  <span className="hidden sm:inline font-bold text-[10px] uppercase">
                    {currentTheme.name.split(" ")[0]}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-black/20"
                    style={{ backgroundColor: currentTheme.dot }}
                  />
                </button>

                {/* Palette Dropdown Drawer */}
                {palettePickerOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 p-3 rounded-2xl bg-[var(--klo-card)] border-2 border-[var(--klo-accent)] shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--klo-border)]">
                      <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--klo-text)]">
                        Studio Color Palettes
                      </span>
                      <button
                        onClick={() => setPalettePickerOpen(false)}
                        className="text-[var(--klo-muted)] hover:text-[var(--klo-text)] p-0.5"
                      >
                        <FiX size={14} />
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {Object.values(PALETTES).map((pal) => (
                        <button
                          key={pal.id}
                          onClick={() => changePalette(pal.id)}
                          className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                            paletteKey === pal.id
                              ? "border-[var(--klo-accent)] bg-[var(--klo-accent)]/10 font-bold"
                              : "border-[var(--klo-border)] hover:border-[var(--klo-accent)]/50 bg-[var(--klo-bg)]"
                          }`}
                        >
                          <div>
                            <span className="text-[11px] block text-[var(--klo-text)]">
                              {pal.name}
                            </span>
                            <span className="text-[9px] text-[var(--klo-muted)] block">
                              {pal.tag}
                            </span>
                          </div>

                          <div className="flex gap-1">
                            {pal.swatches.map((color, i) => (
                              <span
                                key={i}
                                className="w-3.5 h-3.5 rounded-full border border-black/15 flex-shrink-0"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Book Action Button */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("booking-flow");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--klo-accent)] text-white hover:opacity-90 font-medium text-xs shadow-xs transition-opacity cursor-pointer"
              >
                Reserver Stol ↓
              </button>
            </div>
          </div>
        </header>

        {/* =========================================================
            SECTION 1: EDITORIAL HERO (Luna Scandinavian Chic)
            ========================================================= */}
        <section className="border-b border-[var(--klo-border)] py-8 sm:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--klo-accent)]/10 text-[var(--klo-accent)] text-[10px] font-mono font-bold uppercase tracking-wider">
                    NATURLIG BIAB ATELIER · FROGNER
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl text-[var(--klo-text)] leading-[1.12] font-semibold tracking-tight">
                  Manikyr som krever et ekstra blikk.
                </h1>

                <p className="text-xs sm:text-sm text-[var(--klo-muted)] leading-relaxed">
                  Skånsom tørr e-file cuticle care, europeisk giftfri BIAB builder gel og en rolig 1-til-1 stol. Vi bygger naturlig styrke med 4 ukers feilfri holdbarhet.
                </p>

                <div className="flex flex-wrap gap-2 text-[10px] font-mono pt-1">
                  <span className="px-2.5 py-1 rounded-full border border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-text)]">
                    ✦ HEMA-fri formel
                  </span>
                  <span className="px-2.5 py-1 rounded-full border border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-text)]">
                    ✦ 4 ukers holdbarhet
                  </span>
                  <span className="px-2.5 py-1 rounded-full border border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-text)]">
                    ✦ Valgfri stillegående time
                  </span>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("booking-flow");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-5 py-3 rounded-full bg-[var(--klo-accent)] text-white hover:opacity-95 font-medium text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Reserver Stol i Frogner</span>
                    <FiArrowDown size={14} />
                  </button>
                  <span className="text-xs font-mono text-[var(--klo-muted)]">
                    Fra 550 kr · Bygdin gate 4
                  </span>
                </div>
              </div>

              {/* Hero Image Card */}
              <div className="lg:col-span-6 relative aspect-[4/5] min-h-[350px] sm:min-h-[460px] rounded-3xl overflow-hidden border border-[var(--klo-border)] shadow-md group">
                <Image
                  src="/demo/nails/nail-1.jpg"
                  alt="Studio Klō BIAB Atelier"
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--klo-card)]/90 backdrop-blur-xs text-[10px] font-mono font-bold text-[var(--klo-text)] border border-[var(--klo-border)] shadow-xs">
                  ● ATELIER KLØ
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[var(--klo-card)]/95 backdrop-blur-md border border-[var(--klo-border)] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-serif font-bold text-[var(--klo-text)] block">
                      Clean Micro-French BIAB
                    </span>
                    <span className="text-[10px] text-[var(--klo-muted)] font-mono">
                      Bygdin gate 4, Frogner
                    </span>
                  </div>
                  <span className="font-serif font-bold text-[var(--klo-accent)] text-sm">
                    750 kr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: 4-STEP JOURNEY STRIP (from Luna Nail Studio)
            ========================================================= */}
        <section className="bg-[var(--klo-bg-alt)] border-b border-[var(--klo-border)] py-6 sm:py-8 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)] space-y-1">
                <span className="w-5 h-5 rounded-full bg-[var(--klo-accent)] text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
                <span className="font-bold text-[11px] text-[var(--klo-text)] block pt-1">
                  Velg Behandling
                </span>
                <p className="text-[10px] text-[var(--klo-muted)] leading-tight">
                  Klassisk, BIAB eller glass-art tilpasset dine negler.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)] space-y-1">
                <span className="w-5 h-5 rounded-full bg-[var(--klo-accent)] text-white text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
                <span className="font-bold text-[11px] text-[var(--klo-text)] block pt-1">
                  Reserver Tid
                </span>
                <p className="text-[10px] text-[var(--klo-muted)] leading-tight">
                  Velg dag og stol i sanntid. Ingen venteliste.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)] space-y-1">
                <span className="w-5 h-5 rounded-full bg-[var(--klo-accent)] text-white text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
                <span className="font-bold text-[11px] text-[var(--klo-text)] block pt-1">
                  Rolig Stol i Frogner
                </span>
                <p className="text-[10px] text-[var(--klo-muted)] leading-tight">
                  Matcha latte eller stillhet. 1-til-1 oppmerksomhet.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)] space-y-1">
                <span className="w-5 h-5 rounded-full bg-[var(--klo-accent)] text-white text-[10px] font-bold flex items-center justify-center">
                  4
                </span>
                <span className="font-bold text-[11px] text-[var(--klo-text)] block pt-1">
                  Perfekt Resultat
                </span>
                <p className="text-[10px] text-[var(--klo-muted)] leading-tight">
                  Forseglet apex og 4 ukers garanti mot avskalling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: 4-CARD TREATMENT MENU (from Luna Nail Studio)
            ========================================================= */}
        <section id="services-menu" className="py-10 sm:py-16 border-b border-[var(--klo-border)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--klo-border)] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--klo-muted)] block">
                  ATELIERETS MENY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--klo-text)]">
                  Behandlinger &amp; Prisliste
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[var(--klo-muted)]">
                Alle sett inkluderer e-file cuticle cleansing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NAIL_SERVICES.map((s) => {
                const isSelected = selectedService.id === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedService(s);
                      const el = document.getElementById("booking-flow");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-[var(--klo-accent)] bg-[var(--klo-card)] shadow-md ring-1 ring-[var(--klo-accent)]"
                        : "border-[var(--klo-border)] bg-[var(--klo-card)] hover:border-[var(--klo-accent)]/60 hover:shadow-xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-[var(--klo-accent)] tracking-wider">
                          /{s.number} {s.tag}
                        </span>
                        <span className="font-serif text-lg font-bold text-[var(--klo-text)]">
                          {s.price} kr
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-[var(--klo-text)] leading-snug">
                        {s.name}
                      </h3>
                      <p className="text-xs text-[var(--klo-muted)] mt-1.5 leading-relaxed">
                        {s.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[var(--klo-border)] flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--klo-muted)] flex items-center gap-1">
                        <FiClock size={12} />
                        {s.duration}
                      </span>
                      <span
                        className={`text-[11px] font-bold ${
                          isSelected ? "text-[var(--klo-accent)]" : "text-[var(--klo-muted)]"
                        }`}
                      >
                        {isSelected ? "Valgt for time ✓" : "Velg behandling →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: Y2K INTERACTIVE CAMERA VIEWFINDER LOOKBOOK
            (Direct from y2k-pink-nail-cards)
            ========================================================= */}
        <section id="lookbook" className="bg-[var(--klo-bg-alt)] border-b border-[var(--klo-border)] py-10 sm:py-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--klo-border)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <FiCamera className="text-[var(--klo-accent)]" size={14} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--klo-muted)] block">
                    INTERAKTIVT KAMERA LOOKBOOK
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--klo-text)]">
                  Estetikk i Detaljer
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[var(--klo-muted)]">
                Trykk på bilde for å forstørre detaljer
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Main Camera Viewfinder Card (Y2K Aesthetic) */}
              <div className="md:col-span-7 relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[var(--klo-border)] bg-black shadow-xl group">
                <Image
                  src={cameraPhotos[cameraPhotoIdx].src}
                  alt={cameraPhotos[cameraPhotoIdx].label}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    cameraZoom === "0.5" ? "scale-95" : cameraZoom === "3x" ? "scale-125" : "scale-105"
                  }`}
                  onClick={() => setActivePhotoModal(cameraPhotos[cameraPhotoIdx].src)}
                />

                {/* Viewfinder UI Overlays */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-full">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-bold tracking-widest">LIVE VIEW</span>
                    </div>
                    <span>{cameraPhotos[cameraPhotoIdx].spec}</span>
                  </div>

                  {/* Center Crosshairs */}
                  <div className="self-center w-16 h-16 border border-white/40 rounded-full flex items-center justify-center opacity-70">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>

                  {/* Bottom Viewfinder Pill & Zoom */}
                  <div className="space-y-2 pointer-events-auto">
                    {/* Zoom Toggle */}
                    <div className="flex justify-center gap-1.5">
                      {(["0.5", "1x", "3x"] as const).map((z) => (
                        <button
                          key={z}
                          onClick={() => setCameraZoom(z)}
                          className={`w-7 h-7 rounded-full text-[10px] font-mono font-bold flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                            cameraZoom === z
                              ? "bg-white text-black ring-2 ring-black"
                              : "bg-black/60 text-white hover:bg-black/90"
                          }`}
                        >
                          {z}
                        </button>
                      ))}
                    </div>

                    <div className="p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-between text-white text-xs">
                      <div>
                        <span className="font-serif font-bold block">
                          {cameraPhotos[cameraPhotoIdx].label}
                        </span>
                        <span className="text-[10px] font-mono text-white/70">
                          Trykk for fullskjerm visning
                        </span>
                      </div>
                      <button
                        onClick={() => setActivePhotoModal(cameraPhotos[cameraPhotoIdx].src)}
                        className="px-2.5 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold uppercase hover:bg-white/90 cursor-pointer"
                      >
                        Forstørr ↗
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Lookbook Thumbnail Pickers */}
              <div className="md:col-span-5 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--klo-muted)] block">
                  Velg sett for inspeksjon:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {cameraPhotos.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCameraPhotoIdx(idx)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                        cameraPhotoIdx === idx
                          ? "border-[var(--klo-accent)] ring-2 ring-[var(--klo-accent)] scale-102 shadow-sm"
                          : "border-[var(--klo-border)] opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                        <span className="text-white text-[10px] font-mono font-bold leading-tight">
                          {item.label}
                        </span>
                      </div>
                      {cameraPhotoIdx === idx && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--klo-accent)]" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)] font-mono text-[11px] text-[var(--klo-muted)] space-y-1">
                  <div className="flex items-center justify-between text-[var(--klo-text)] font-bold">
                    <span>Atelier Klø Signatur</span>
                    <span>Oslo</span>
                  </div>
                  <p className="text-[10px] leading-relaxed">
                    Bygd med bio-kompatible mineralpigmenter og japansk presisjon for maksimal neglehelse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: THIS WEEK SLOTS OPENING MATRIX
            (Direct from y2k-pink-nail-cards)
            ========================================================= */}
        <section className="py-10 sm:py-16 border-b border-[var(--klo-border)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--klo-border)] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--klo-accent)] font-bold block">
                  ● DENNE UKENS LEDIGE STOLER
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--klo-text)]">
                  Live Tilgjengelighetskalender
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[var(--klo-muted)]">
                Trykk på en ledig tid for å fylle ut reservasjonen
              </span>
            </div>

            {/* Matrix Board */}
            <div className="rounded-3xl border-2 border-[var(--klo-border)] bg-[var(--klo-card)] p-4 sm:p-6 shadow-sm overflow-x-auto">
              <div className="min-w-[480px] space-y-2.5 font-mono text-xs">
                {WEEKLY_SLOTS_DATA.map((col) => (
                  <div
                    key={col.day}
                    className="flex items-center gap-3 p-2 rounded-xl bg-[var(--klo-bg)]/60 border border-[var(--klo-border)]"
                  >
                    <div className="w-24 flex-shrink-0">
                      <span className="font-bold text-xs text-[var(--klo-text)] block">
                        {col.day}
                      </span>
                      <span className="text-[10px] text-[var(--klo-muted)] block">
                        {col.date}
                      </span>
                    </div>

                    <div className="flex-1 grid grid-cols-4 gap-2">
                      {col.slots.map((slot, i) => {
                        const isMatch =
                          selectedDaySlot.day === col.day &&
                          selectedDaySlot.time === slot.time;
                        return (
                          <button
                            key={i}
                            disabled={slot.status === "full"}
                            onClick={() => {
                              setSelectedDaySlot({
                                day: col.day,
                                date: col.date,
                                time: slot.time,
                              });
                              const el = document.getElementById("booking-flow");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className={`py-2 px-1 text-center rounded-lg border text-[11px] font-mono transition-all flex flex-col items-center justify-center ${
                              slot.status === "full"
                                ? "border-transparent text-neutral-400 bg-neutral-100 line-through cursor-not-allowed opacity-50"
                                : isMatch
                                ? "bg-[var(--klo-accent)] text-white border-[var(--klo-accent)] font-bold shadow-xs scale-102"
                                : slot.status === "last"
                                ? "border-[var(--klo-accent)]/50 bg-[var(--klo-accent)]/10 text-[var(--klo-accent)] hover:bg-[var(--klo-accent)] hover:text-white"
                                : "border-[var(--klo-border)] bg-[var(--klo-card)] text-[var(--klo-text)] hover:border-[var(--klo-accent)]"
                            }`}
                          >
                            <span className="font-bold">{slot.time}</span>
                            <span className="text-[8px] uppercase tracking-wider block opacity-80">
                              {slot.status === "full"
                                ? "Full"
                                : slot.status === "last"
                                ? "Siste"
                                : "Ledig"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: RESERVATION DESK (Step 1-4 with Shape & Slot)
            ========================================================= */}
        <section id="booking-flow" className="py-10 sm:py-16 border-b border-[var(--klo-border)] bg-[var(--klo-bg)] scroll-mt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--klo-border)] pb-3">
              <div className="flex items-center gap-2.5">
                <StudioKloLogo className="w-5 h-5 text-[var(--klo-accent)]" />
                <span className="font-serif text-lg font-bold text-[var(--klo-text)]">
                  FULLFØR RESERVASJON
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--klo-muted)]">
                Bygdin gate 4 · Frogner
              </span>
            </div>

            {!confirmed ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
                {/* Chosen Treatment Summary */}
                <div className="p-4 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[var(--klo-muted)] uppercase tracking-wider block">
                      Valgt Behandling:
                    </span>
                    <span className="font-serif text-base font-bold text-[var(--klo-text)]">
                      {selectedService.name}
                    </span>
                    <span className="text-[11px] text-[var(--klo-muted)] block mt-0.5">
                      {selectedService.duration} · {selectedService.description}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg font-bold text-[var(--klo-accent)] block">
                      {selectedService.price} kr
                    </span>
                    <a
                      href="#services-menu"
                      className="text-[10px] text-[var(--klo-muted)] underline hover:text-[var(--klo-text)]"
                    >
                      Endre behandling
                    </a>
                  </div>
                </div>

                {/* Step 2: Nail Shape Preference with Matching SVG SILHOUETTES */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--klo-text)] block">
                      Steg 1 · Neglefasong &amp; Arkitektur
                    </label>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--klo-accent)] font-bold">
                      {selectedShape.name} Valgt
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                    {NAIL_SHAPES.map((shape) => {
                      const isSelected = selectedShape.id === shape.id;
                      return (
                        <button
                          key={shape.id}
                          type="button"
                          onClick={() => setSelectedShape(shape)}
                          className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between group active:scale-[0.98] cursor-pointer ${
                            isSelected
                              ? "border-[var(--klo-accent)] bg-[var(--klo-card)] ring-2 ring-[var(--klo-accent)] shadow-xs"
                              : "border-[var(--klo-border)] bg-[var(--klo-card)] hover:border-[var(--klo-accent)]/50"
                          }`}
                        >
                          <div className="w-8 h-10 flex items-center justify-center mb-1.5 transition-transform group-hover:-translate-y-0.5">
                            <svg viewBox="0 0 40 44" className="w-7 h-9 overflow-visible">
                              <path
                                d={shape.svgPath}
                                fill={isSelected ? currentTheme.accent : "rgba(0, 0, 0, 0.05)"}
                                stroke={isSelected ? currentTheme.accent : currentTheme.textPrimary}
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div>
                            <span className="font-serif text-xs font-bold block text-[var(--klo-text)] leading-tight">
                              {shape.name}
                            </span>
                            <span className="text-[10px] text-[var(--klo-muted)] font-mono block mt-0.5">
                              {shape.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Date & Slot Picked */}
                <div className="p-4 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-[var(--klo-bg)] text-[var(--klo-accent)] font-bold text-sm">
                      <FiClock size={16} />
                    </span>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[var(--klo-muted)] block">
                        Valgt Dag &amp; Tid:
                      </span>
                      <span className="font-bold text-sm text-[var(--klo-text)]">
                        {selectedDaySlot.day} {selectedDaySlot.date} kl. {selectedDaySlot.time}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Reservert i stol
                  </span>
                </div>

                {/* Step 4: Quiet Atmosphere Toggle */}
                <div className="p-4 rounded-2xl border border-[var(--klo-border)] bg-[var(--klo-card)] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FiVolumeX className="text-[var(--klo-muted)] flex-shrink-0" size={18} />
                    <div>
                      <span className="font-serif text-xs font-bold text-[var(--klo-text)] block">
                        Stillegående Time (Valgfritt)
                      </span>
                      <span className="text-[11px] text-[var(--klo-muted)] block">
                        {silentAppt
                          ? "Aktiv: Vi stiller kun nødvendige spørsmål. Nyt roen og musikken."
                          : "Standard 1-til-1 konsultasjon og hyggelig prat."}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSilentAppt(!silentAppt)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      silentAppt
                        ? "bg-[var(--klo-accent)] text-white shadow-xs"
                        : "border border-[var(--klo-border)] bg-[var(--klo-bg)] text-[var(--klo-muted)]"
                    }`}
                  >
                    {silentAppt ? "Aktivert ✓" : "Aktiver"}
                  </button>
                </div>

                {/* Step 5: Client Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-[var(--klo-muted)] block mb-1">Ditt Navn</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Mathilde V."
                      className="w-full p-3 border border-[var(--klo-border)] rounded-xl bg-[var(--klo-card)] text-[var(--klo-text)] outline-none focus:border-[var(--klo-accent)]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--klo-muted)] block mb-1">Mobil for Vipps &amp; SMS-bekreftelse</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+47 905 43 210"
                      className="w-full p-3 border border-[var(--klo-border)] rounded-xl bg-[var(--klo-card)] text-[var(--klo-text)] outline-none focus:border-[var(--klo-accent)]"
                    />
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[var(--klo-accent)] hover:opacity-95 text-white font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserver Studio Stol · {selectedService.price} kr</span>
                  <FiArrowRight size={15} />
                </button>
              </form>
            ) : (
              /* Confirmed Studio Chair Pass */
              <motion.div
                id="confirmed-chair-pass"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-5 sm:p-7 rounded-3xl border-2 border-[var(--klo-accent)] bg-[var(--klo-card)] space-y-4 font-mono text-xs shadow-lg"
              >
                <div className="flex justify-between items-start border-b border-[var(--klo-border)] pb-4">
                  <div className="flex items-center gap-3">
                    <StudioKloLogo className="w-10 h-10 text-[var(--klo-accent)] flex-shrink-0" />
                    <div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold inline-block mb-1">
                        ● STOL BEKREFTET
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[var(--klo-text)]">
                        Studio Klō Reservasjonskort
                      </h3>
                      <span className="text-[var(--klo-muted)]">Gjest: {clientName}</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-[var(--klo-accent)]">
                    {selectedService.price} kr
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-[var(--klo-muted)] block">Behandling:</span>
                    <span className="font-semibold text-[var(--klo-text)]">
                      {selectedService.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--klo-muted)] block">Neglefasong:</span>
                    <span className="font-semibold text-[var(--klo-text)]">
                      {selectedShape.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--klo-muted)] block">Tidspunkt:</span>
                    <span className="font-semibold text-[var(--klo-text)]">
                      {selectedDaySlot.day} {selectedDaySlot.date} kl. {selectedDaySlot.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--klo-muted)] block">Atmosfære:</span>
                    <span className="font-semibold text-[var(--klo-text)]">
                      {silentAppt ? "Stillegående Stol (Uten smalltalk)" : "Standard 1-til-1 samtale"}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--klo-border)] bg-[var(--klo-bg)] flex justify-between items-center text-[11px]">
                  <span className="text-[var(--klo-muted)]">Sted: Bygdin gate 4, Frogner, Oslo</span>
                  <span className="font-bold text-[var(--klo-text)]">Studio Stol 1</span>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[11px] text-[var(--klo-muted)]">
                    SMS sendt til {clientPhone} (Betales via Vipps ved oppmøte)
                  </span>
                  <button
                    type="button"
                    onClick={() => setConfirmed(false)}
                    className="text-[var(--klo-accent)] underline font-semibold hover:opacity-80 cursor-pointer"
                  >
                    Endre bestilling
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* =========================================================
            SECTION 7: REVIEWS & ATELIER STATS (from Luna & Y2K)
            ========================================================= */}
        <section className="bg-[var(--klo-bg-alt)] border-b border-[var(--klo-border)] py-10 sm:py-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
            {/* Metric Stats Counters (from Luna Nail Studio) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-center">
              <div className="p-4 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)]">
                <span className="font-serif text-2xl font-bold text-[var(--klo-text)] block">
                  1 200+
                </span>
                <span className="text-[10px] text-[var(--klo-muted)] uppercase tracking-wider block mt-0.5">
                  Fornøyde Kunder
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)]">
                <span className="font-serif text-2xl font-bold text-[var(--klo-text)] block">
                  5+ År
                </span>
                <span className="text-[10px] text-[var(--klo-muted)] uppercase tracking-wider block mt-0.5">
                  Spesialkompetanse
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)]">
                <span className="font-serif text-2xl font-bold text-[var(--klo-text)] block">
                  100%
                </span>
                <span className="text-[10px] text-[var(--klo-muted)] uppercase tracking-wider block mt-0.5">
                  Giftfri HEMA-Fri
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)]">
                <span className="font-serif text-2xl font-bold text-[var(--klo-text)] block flex items-center justify-center gap-1">
                  <span>4.9</span>
                  <FiStar className="text-[var(--klo-accent)] fill-[var(--klo-accent)] text-lg" />
                </span>
                <span className="text-[10px] text-[var(--klo-muted)] uppercase tracking-wider block mt-0.5">
                  Google Vurdering
                </span>
              </div>
            </div>

            {/* "What They Said" Stories (from y2k-pink-nail-cards) */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--klo-muted)] text-center block">
                [ HVA GJESTENE SIER ]
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {REVIEWS.map((rev, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[var(--klo-card)] border border-[var(--klo-border)] flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5 text-[var(--klo-accent)]">
                          {[...Array(rev.rating)].map((_, idx) => (
                            <FiStar key={idx} className="fill-[var(--klo-accent)]" size={12} />
                          ))}
                        </div>
                        <span className="text-[9px] font-mono text-[var(--klo-muted)]">
                          Verifisert
                        </span>
                      </div>
                      <p className="text-xs text-[var(--klo-text)] leading-relaxed italic">
                        &ldquo;{rev.text}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[var(--klo-border)] flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--klo-border)] flex-shrink-0">
                        <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-[var(--klo-text)] block leading-none">
                          {rev.name}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--klo-muted)]">
                          {rev.set}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Atelier Info & Map Card */}
            <div className="p-5 rounded-3xl bg-[var(--klo-card)] border border-[var(--klo-border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="space-y-1 text-center sm:text-left">
                <span className="font-serif font-bold text-base text-[var(--klo-text)] block">
                  Studio Klō Frogner Atelier
                </span>
                <span className="text-[var(--klo-muted)] block flex items-center justify-center sm:justify-start gap-1">
                  <FiMapPin size={12} />
                  Bygdin gate 4, 0257 Oslo (Trikk 12 til Frogner plass)
                </span>
              </div>

              <div className="flex items-center gap-4 text-center sm:text-right">
                <div>
                  <span className="text-[10px] text-[var(--klo-muted)] block">Åpningstider:</span>
                  <span className="font-bold text-[var(--klo-text)]">Tir–Lør 10:00–18:00</span>
                </div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-full border border-[var(--klo-border)] hover:border-[var(--klo-accent)] text-[var(--klo-text)] font-bold transition-colors"
                >
                  @studioklo.oslo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 8: FOOTER
            ========================================================= */}
        <footer className="py-8 border-t border-[var(--klo-border)] bg-[var(--klo-bg)] transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-2">
            <div className="flex justify-center items-center gap-2">
              <StudioKloLogo className="w-5 h-5 text-[var(--klo-accent)]" />
              <span className="font-serif font-bold tracking-wider text-[var(--klo-text)]">
                STUDIO KLŌ
              </span>
            </div>
            <p className="font-mono text-[10px] sm:text-[11px] text-[var(--klo-muted)]">
              Bygdin gate 4, Frogner, 0257 Oslo · Naturlig BIAB &amp; Neglearkitektur
            </p>
          </div>
        </footer>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoModal(null)}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <div className="relative max-w-lg w-full aspect-square rounded-2xl overflow-hidden border border-white/20">
              <Image
                src={activePhotoModal}
                alt="Enlarged Set"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer"
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
