"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
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
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

interface ServiceItem {
  id: string;
  name: string;
  category: "all" | "vintage" | "celebration" | "bento" | "pastries";
  servings: string;
  price: number;
  leadTime: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    id: "vintage-heart",
    name: "Vintage Lambeth Heart Cake",
    category: "vintage",
    servings: "6–8 servings",
    price: 650,
    leadTime: "48h notice",
    description: "Retro multi-layered piped buttercream heart cake with maraschino cherries and personalized piped wording.",
  },
  {
    id: "botanical-two-tier",
    name: "Two-Tier Botanical Cake",
    category: "celebration",
    servings: "16–20 servings",
    price: 1250,
    leadTime: "3 days notice",
    description: "Organic edible pressed florals, textured Swiss meringue buttercream, and delicate natural gold leaf touches.",
  },
  {
    id: "dark-cherry-ganache",
    name: "Dark Chocolate & Amarena Drip",
    category: "celebration",
    servings: "8–10 servings",
    price: 720,
    leadTime: "48h notice",
    description: "70% Valrhona dark chocolate sponge, wild Italian Amarena cherries, and silky bittersweet ganache glaze.",
  },
  {
    id: "strawberry-naked",
    name: "Nordic Berry & Mascarpone Cake",
    category: "celebration",
    servings: "8–10 servings",
    price: 690,
    leadTime: "48h notice",
    description: "Madagascan vanilla bean chiffon, whipped mascarpone cream, and fresh seasonal Norwegian berries.",
  },
  {
    id: "matcha-bento",
    name: "Matcha & Berry Bento Box",
    category: "bento",
    servings: "2–3 servings",
    price: 420,
    leadTime: "24h notice",
    description: "Korean-style petite celebration cake packaged in an eco sugarcane box. Japanese Uji matcha & raspberry compote.",
  },
  {
    id: "artisan-tart-box",
    name: "Artisan Fruit Tartlet Box (4 pcs)",
    category: "pastries",
    servings: "4 pieces",
    price: 380,
    leadTime: "24h notice",
    description: "Buttery sablé crusts filled with Tahitian vanilla pastry cream and topped with glazed fresh berries.",
  },
];

// Curated authentic real photography (Unsplash License)
const lookbook = [
  {
    src: "/demo/cakes/cake-1.jpg",
    title: "Vintage Rosette Heart Cake",
    tag: "Retro Lambeth Piping · Madagascan Vanilla & Raspberry",
  },
  {
    src: "/demo/cakes/cake-2.jpg",
    title: "Valrhona Ganache & Dark Cherry",
    tag: "Dark Chocolate Sponge · Silky Ganache Drip",
  },
  {
    src: "/demo/cakes/cake-3.jpg",
    title: "Nordic Berry Shortcake",
    tag: "Fresh Strawberries · Whipped Vanilla Mascarpone",
  },
  {
    src: "/demo/cakes/cake-4.jpg",
    title: "Artisan Fresh Berry Tartlets",
    tag: "Crisp Butter Sablé · Tahitian Pastry Cream",
  },
  {
    src: "/demo/cakes/cake-5.jpg",
    title: "Two-Tier Botanical Celebration",
    tag: "Textured Swiss Buttercream · Organic Edible Florals",
  },
  {
    src: "/demo/cakes/cake-6.jpg",
    title: "Petite Layered Tasting Cake",
    tag: "Single Serving Cake Drop · Salted Caramel Buttercream",
  },
];

const dates = [
  { day: "Fri", date: "24", full: "Friday, Oct 24" },
  { day: "Sat", date: "25", full: "Saturday, Oct 25" },
  { day: "Sun", date: "26", full: "Sunday, Oct 26" },
  { day: "Thu", date: "30", full: "Thursday, Oct 30" },
  { day: "Fri", date: "31", full: "Friday, Oct 31" },
];

const pickupTimes = ["10:00 – 12:00", "12:00 – 14:00", "14:00 – 16:00", "16:00 – 18:00"];

// 4 Distinct High-Taste Brand Palettes
export interface PaletteTheme {
  id: string;
  name: string;
  descriptor: string;
  swatches: [string, string, string]; // [bg, text, accent]
  bg: string;
  cardBg: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentFg: string;
  tagBg: string;
}

const palettes: PaletteTheme[] = [
  {
    id: "vanilla",
    name: "Warm Vanilla & Honey",
    descriptor: "Artisanal Warm Paper",
    swatches: ["#FAF6EE", "#231B15", "#8C6339"],
    bg: "#FAF6EE",
    cardBg: "#FFFFFF",
    border: "rgba(35, 27, 21, 0.12)",
    text: "#231B15",
    muted: "#766A60",
    accent: "#8C6339",
    accentFg: "#FFFFFF",
    tagBg: "rgba(140, 99, 57, 0.08)",
  },
  {
    id: "rose",
    name: "Rose & Cassis",
    descriptor: "Parisian Patisserie",
    swatches: ["#FCF5F6", "#2D121B", "#992E4E"],
    bg: "#FCF5F6",
    cardBg: "#FFFFFF",
    border: "rgba(153, 46, 78, 0.14)",
    text: "#2D121B",
    muted: "#7C5A67",
    accent: "#992E4E",
    accentFg: "#FFFFFF",
    tagBg: "rgba(153, 46, 78, 0.08)",
  },
  {
    id: "matcha",
    name: "Matcha & Forest",
    descriptor: "Copenhagen Botanical",
    swatches: ["#F3F6F3", "#142418", "#386142"],
    bg: "#F3F6F3",
    cardBg: "#FFFFFF",
    border: "rgba(56, 97, 66, 0.14)",
    text: "#142418",
    muted: "#566C5A",
    accent: "#386142",
    accentFg: "#FFFFFF",
    tagBg: "rgba(56, 97, 66, 0.08)",
  },
  {
    id: "noir",
    name: "Midnight Atelier",
    descriptor: "Obsidian & Chalk",
    swatches: ["#101012", "#FAF7F2", "#C8AC70"],
    bg: "#101012",
    cardBg: "#17171B",
    border: "rgba(250, 247, 242, 0.12)",
    text: "#FAF7F2",
    muted: "#96959E",
    accent: "#C8AC70",
    accentFg: "#101012",
    tagBg: "rgba(200, 172, 112, 0.12)",
  },
];

export default function TierOneDemoPage() {
  const [activePalette, setActivePalette] = useState<PaletteTheme>(palettes[0]);
  const [showDemoNotes, setShowDemoNotes] = useState<boolean>(true);
  const [paletteDockOpen, setPaletteDockOpen] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);
  const [selectedDate, setSelectedDate] = useState(dates[1]);
  const [selectedTime, setSelectedTime] = useState(pickupTimes[1]);
  const [customText, setCustomText] = useState("");
  const [flavorPreference, setFlavorPreference] = useState("Madagascan Vanilla & Raspberry");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientInstagram, setClientInstagram] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<(typeof lookbook)[0] | null>(null);

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    const formEl = document.getElementById("order-form-section");
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
      className="min-h-screen transition-colors duration-400 font-body relative pb-28"
      style={{
        backgroundColor: activePalette.bg,
        color: activePalette.text,
      }}
    >
      {/* ================= MINIMAL DISCREET TOP NAV ================= */}
      <header className="max-w-md mx-auto px-4 pt-6 pb-2 flex items-center justify-between text-xs font-mono">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: activePalette.text }}
        >
          <FiArrowLeft size={13} />
          <span>Back to Pricing</span>
        </Link>
        <span
          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
          style={{
            backgroundColor: activePalette.tagBg,
            color: activePalette.accent,
          }}
        >
          2,000 kr Tier Demo
        </span>
      </header>

      {/* Main Responsive Canvas (Clean mobile-first with beautiful desktop web layout) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-10 space-y-14 sm:space-y-16">
        {/* ================= 1. ATELIER BRAND HERO ================= */}
        <section className="text-center space-y-5 pt-2 max-w-xl mx-auto">
          {/* Authentic Atelier Emblem Logo */}
          <div className="flex justify-center pt-1">
            <div
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 flex flex-col items-center justify-center transition-all shadow-md"
              style={{
                backgroundColor: activePalette.cardBg,
                border: `1.5px solid ${activePalette.border}`,
              }}
            >
              <div
                className="w-full h-full rounded-full flex flex-col items-center justify-center p-2 text-center relative"
                style={{
                  border: `1px solid ${activePalette.border}`,
                }}
              >
                {/* Handcrafted Patisserie Seal SVG with Tiered Cake & Wheat */}
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-0.5"
                  style={{ color: activePalette.accent }}
                >
                  {/* Outer Beaded Seal */}
                  <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
                  <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
                  
                  {/* Star Top Accent */}
                  <path d="M32 9L33.2 12.8L37 14L33.2 15.2L32 19L30.8 15.2L27 14L30.8 12.8L32 9Z" fill="currentColor" />

                  {/* Elegant Tiered Cake Silhouette */}
                  {/* Top Tier */}
                  <rect x="26" y="21" width="12" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
                  <path d="M26 23.5C28 24.5 30 24.5 32 23.5C34 22.5 36 22.5 38 23.5" stroke="currentColor" strokeWidth="0.75" />
                  
                  {/* Bottom Tier */}
                  <rect x="21" y="29" width="22" height="10" rx="2" stroke="currentColor" strokeWidth="1.25" fill="none" />
                  <path d="M21 32.5C24 34 28 34 32 32.5C36 31 40 31 43 32.5" stroke="currentColor" strokeWidth="0.75" />

                  {/* Cake Pedestal Stand */}
                  <path d="M19 40H45M28 40L26 46H38L36 40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Laurel branches on sides */}
                  <path d="M15 28C13 32 14 38 18 42" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
                  <path d="M49 28C51 32 50 38 46 42" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
                </svg>

                <span
                  className="text-[8px] font-mono tracking-[0.25em] uppercase font-bold"
                  style={{ color: activePalette.muted }}
                >
                  EST. 2024
                </span>
              </div>
            </div>
          </div>

          {/* Luxury Serif Typography */}
          <div className="space-y-1.5">
            <h1
              className="text-2xl sm:text-4xl font-black tracking-[0.25em] uppercase"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                color: activePalette.text,
              }}
            >
              MAISON SUCRE
            </h1>
            <p
              className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase"
              style={{ color: activePalette.muted }}
            >
              Atelier de Pâtisserie · Oslo
            </p>
          </div>

          {/* Studio Meta (No AI pulsing dots — calm Scandinavian editorial) */}
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
              <span>Bygdøy Allé, Frogner</span>
            </span>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium"
              style={{
                backgroundColor: activePalette.cardBg,
                border: `1px solid ${activePalette.border}`,
                color: activePalette.text,
              }}
            >
              <span>Weekend Collections</span>
            </span>

            <a
              href="https://instagram.com"
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
              <span>@maisonsucre.oslo</span>
            </a>
          </div>

          <p
            className="text-xs sm:text-sm font-body leading-relaxed max-w-md mx-auto pt-1"
            style={{ color: activePalette.muted }}
          >
            Handcrafted vintage celebration cakes, Korean bento drops, and French tartlets. Baked fresh in Frogner for your special moments.
          </p>

          {/* Lowkey Demo Guide Hint (Whisper footnote) */}
          {showDemoNotes && (
            <p className="text-[10px] font-mono italic opacity-60 pt-1">
              ✦ Demo Note: Your custom logo, bio, location, and Instagram handle go here.
            </p>
          )}

          {/* Quick Reserve Jump Button */}
          <div className="pt-2">
            <a
              href="#order-form-section"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-wider active:scale-[0.99] transition-all shadow-sm"
              style={{
                backgroundColor: activePalette.accent,
                color: activePalette.accentFg,
              }}
            >
              <span>REQUEST YOUR CAKE</span>
              <FiArrowUpRight size={14} />
            </a>
          </div>
        </section>

        {/* ================= 2. THE EDITORIAL PRICE MENU ================= */}
        <section className="space-y-4 pt-6" style={{ borderTop: `1px solid ${activePalette.border}` }}>
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: activePalette.muted }}>
                Transparent Pricing
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight">
                Menu &amp; Sizes
              </h2>
            </div>
            <span className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
              6 Signature Offerings
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono flex-wrap">
            {[
              { id: "all", label: "All Items" },
              { id: "vintage", label: "Vintage Cakes" },
              { id: "celebration", label: "Celebration" },
              { id: "bento", label: "Bento Boxes" },
              { id: "pastries", label: "Tarts & Pastries" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className="px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer"
                style={{
                  backgroundColor: selectedCategory === cat.id ? activePalette.accent : activePalette.cardBg,
                  color: selectedCategory === cat.id ? activePalette.accentFg : activePalette.muted,
                  border: `1px solid ${selectedCategory === cat.id ? activePalette.accent : activePalette.border}`,
                  fontWeight: selectedCategory === cat.id ? "bold" : "normal",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items (Responsive 2-column grid on desktop, 1-column on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className="p-4 sm:p-5 rounded-xl transition-all cursor-pointer shadow-sm relative group flex flex-col justify-between"
                  style={{
                    backgroundColor: activePalette.cardBg,
                    border: `1.5px solid ${isSelected ? activePalette.accent : activePalette.border}`,
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold font-heading uppercase" style={{ color: activePalette.text }}>
                          {service.name}
                        </span>
                        {isSelected && (
                          <span
                            className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: activePalette.accent,
                              color: activePalette.accentFg,
                            }}
                          >
                            SELECTED
                          </span>
                        )}
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-xs sm:text-sm font-mono font-bold" style={{ color: activePalette.text }}>
                          {service.price} kr
                        </div>
                        <div className="text-[10px] font-mono" style={{ color: activePalette.muted }}>
                          {service.servings}
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs font-body leading-relaxed" style={{ color: activePalette.muted }}>
                      {service.description}
                    </p>
                  </div>

                  <div
                    className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono"
                    style={{ borderTop: `1px solid ${activePalette.border}` }}
                  >
                    <span style={{ color: activePalette.muted }}>
                      Lead time: {service.leadTime}
                    </span>
                    <span
                      className="font-bold inline-flex items-center gap-1 group-hover:underline"
                      style={{ color: activePalette.accent }}
                    >
                      <span>{isSelected ? "Selected ✓" : "Select for order ↗"}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lowkey Demo Guide Hint */}
          {showDemoNotes && (
            <p className="text-[10px] font-mono italic opacity-60 pt-1">
              ✦ Demo Note: Your exact menu, flavors, and pricing. Tapping any item auto-populates the booking form.
            </p>
          )}
        </section>

        {/* ================= 3. CLICKABLE 6-PHOTO LOOKBOOK ================= */}
        <section className="space-y-4 pt-6" style={{ borderTop: `1px solid ${activePalette.border}` }}>
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: activePalette.muted }}>
                Studio Portfolio
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight">
                Recent Bakes
              </h2>
            </div>
            <span className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
              Tap photo to zoom
            </span>
          </div>

          {/* 6-Photo Responsive Grid (3-cols on mobile, 6-cols on desktop panoramic view) */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
            {lookbook.map((item, i) => (
              <div
                key={i}
                onClick={() => setLightboxImage(item)}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-sm transition-transform duration-200 active:scale-95"
                style={{
                  backgroundColor: activePalette.cardBg,
                  border: `1px solid ${activePalette.border}`,
                }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <FiMaximize2 size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Lowkey Demo Guide Hint */}
          {showDemoNotes && (
            <p className="text-[10px] font-mono italic opacity-60 pt-1">
              ✦ Demo Note: 6 real client photos from your Instagram feed. Visitors can tap any photo to view full size.
            </p>
          )}
        </section>

        {/* ================= 4. BUILT-IN ORDER & BOOKING FORM ================= */}
        <section
          id="order-form-section"
          className="pt-6 space-y-6"
          style={{ borderTop: `1px solid ${activePalette.border}` }}
        >
          <div className="space-y-0.5 max-w-xl">
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold" style={{ color: activePalette.muted }}>
              Direct Reserve Form
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight">
              Request Your Cake
            </h2>
            <p className="text-xs sm:text-sm font-body" style={{ color: activePalette.muted }}>
              Reserve your collection date and customize your cake details.
            </p>
          </div>

          {bookingConfirmed ? (
            <div
              className="p-6 sm:p-8 rounded-2xl text-center space-y-4 shadow-sm max-w-md mx-auto"
              style={{
                backgroundColor: activePalette.cardBg,
                border: `1.5px solid ${activePalette.accent}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-2xl"
                style={{
                  backgroundColor: activePalette.tagBg,
                  color: activePalette.accent,
                }}
              >
                <FiCheckCircle />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black font-heading uppercase" style={{ color: activePalette.text }}>
                  Order Request Received!
                </h3>
                <p className="text-xs font-body leading-relaxed" style={{ color: activePalette.muted }}>
                  Thanks <strong>{clientName || "friend"}</strong>! We&apos;ve received your request for:
                </p>
              </div>

              <div
                className="p-4 rounded-xl text-xs font-mono space-y-2 text-left"
                style={{
                  backgroundColor: activePalette.bg,
                  border: `1px solid ${activePalette.border}`,
                }}
              >
                <div className="flex justify-between">
                  <span style={{ color: activePalette.muted }}>Cake:</span>
                  <span className="font-bold">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: activePalette.muted }}>Collection Date:</span>
                  <span className="font-bold">{selectedDate.full}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: activePalette.muted }}>Time Window:</span>
                  <span className="font-bold">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: activePalette.muted }}>Flavor Pairing:</span>
                  <span className="font-bold">{flavorPreference}</span>
                </div>
                {customText && (
                  <div className="flex justify-between">
                    <span style={{ color: activePalette.muted }}>Piped Text:</span>
                    <span className="font-bold">&quot;{customText}&quot;</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t" style={{ borderColor: activePalette.border }}>
                  <span style={{ color: activePalette.muted }}>Total Price:</span>
                  <span className="font-bold text-sm" style={{ color: activePalette.accent }}>
                    {selectedService.price} kr
                  </span>
                </div>
              </div>

              {/* Deposit Prompt (Built-in Manual Vipps flow) */}
              <div
                className="p-4 rounded-xl text-xs font-mono text-left space-y-1"
                style={{
                  backgroundColor: activePalette.tagBg,
                  border: `1px solid ${activePalette.border}`,
                }}
              >
                <div className="font-bold" style={{ color: activePalette.text }}>
                  📱 Deposit Step (Manual Vipps):
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: activePalette.muted }}>
                  To lock in your date, please Vipps a <strong>50% deposit ({Math.round(selectedService.price / 2)} kr)</strong> to <strong>#91823 (Maison Sucre)</strong> with reference &quot;{clientName || "Cake"}&quot;.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBookingConfirmed(false)}
                className="text-xs font-mono underline opacity-70 hover:opacity-100 pt-2 block mx-auto cursor-pointer"
                style={{ color: activePalette.text }}
              >
                ← Place another request
              </button>
            </div>
          ) : (
            /* Responsive 2-column layout on Desktop, 1-column on Mobile */
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Chosen cake preview & studio info */}
              <div className="md:col-span-5 space-y-4 md:sticky md:top-8">
                {/* Selected Service Card */}
                <div
                  className="p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-sm"
                  style={{
                    backgroundColor: activePalette.cardBg,
                    border: `1px solid ${activePalette.border}`,
                  }}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase" style={{ color: activePalette.muted }}>
                      Chosen Creation
                    </span>
                    <div className="text-sm font-bold font-heading uppercase" style={{ color: activePalette.text }}>
                      {selectedService.name}
                    </div>
                    <p className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                      {selectedService.servings} · {selectedService.leadTime}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-mono font-bold" style={{ color: activePalette.accent }}>
                      {selectedService.price} kr
                    </span>
                  </div>
                </div>

                {/* Studio Policies / Pickup Info */}
                <div
                  className="p-4 rounded-xl text-xs font-mono space-y-1.5"
                  style={{
                    backgroundColor: activePalette.cardBg,
                    border: `1px solid ${activePalette.border}`,
                    color: activePalette.muted,
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: activePalette.text }}>
                    <FiClock size={12} />
                    <span>Studio Pickup &amp; Collection Info</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Collections take place at our Frogner studio on Fridays and Saturdays between 10:00 and 18:00. Cancellations require 48 hours notice.
                  </p>
                </div>

                {/* Lowkey Demo Guide Hint on Payment */}
                {showDemoNotes && (
                  <div
                    className="p-3.5 rounded-xl text-[10px] font-mono leading-relaxed"
                    style={{
                      backgroundColor: activePalette.tagBg,
                      border: `1px solid ${activePalette.border}`,
                      color: activePalette.muted,
                    }}
                  >
                    ✦ <strong>Demo Note:</strong> Included in 2,000 kr tier: Built-in request form with manual Vipps deposit prompt. Automated card/Vipps deposit checkout is an add-on (+1,200 kr).
                  </div>
                )}
              </div>

              {/* Right Column: Order inputs & Submit */}
              <div className="md:col-span-7 space-y-4">
                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider" style={{ color: activePalette.text }}>
                    1. Pick Collection Date
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {dates.map((d, i) => {
                      const isSelected = selectedDate.full === d.full;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className="py-2.5 px-1 rounded-xl text-center transition-all shadow-sm cursor-pointer"
                          style={{
                            backgroundColor: isSelected ? activePalette.accent : activePalette.cardBg,
                            color: isSelected ? activePalette.accentFg : activePalette.text,
                            border: `1px solid ${isSelected ? activePalette.accent : activePalette.border}`,
                          }}
                        >
                          <div className="text-[10px] font-mono uppercase opacity-75">{d.day}</div>
                          <div className="text-base font-bold font-heading">{d.date}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Window */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider" style={{ color: activePalette.text }}>
                    2. Collection Time Window
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {pickupTimes.map((t, i) => {
                      const isSelected = selectedTime === t;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className="py-2.5 px-3 rounded-xl transition-all shadow-sm text-center cursor-pointer"
                          style={{
                            backgroundColor: isSelected ? activePalette.accent : activePalette.cardBg,
                            color: isSelected ? activePalette.accentFg : activePalette.text,
                            border: `1px solid ${isSelected ? activePalette.accent : activePalette.border}`,
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Flavor Pairing */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider" style={{ color: activePalette.text }}>
                    3. Select Flavor Pairing
                  </label>
                  <select
                    value={flavorPreference}
                    onChange={(e) => setFlavorPreference(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-xs font-body shadow-sm focus:outline-none cursor-pointer"
                    style={{
                      backgroundColor: activePalette.cardBg,
                      border: `1px solid ${activePalette.border}`,
                      color: activePalette.text,
                    }}
                  >
                    <option value="Madagascan Vanilla & Raspberry">Madagascan Vanilla Bean &amp; Raspberry Compote</option>
                    <option value="Valrhona Dark Chocolate Ganache">Valrhona 70% Dark Chocolate &amp; Salted Caramel</option>
                    <option value="Pistachio & Wild Strawberry">Bronte Pistachio &amp; Fresh Wild Strawberry</option>
                    <option value="Matcha & White Peach">Japanese Uji Matcha &amp; White Peach</option>
                  </select>
                </div>

                {/* Custom Piping Wording */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider" style={{ color: activePalette.text }}>
                    4. Custom Piping Message (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Happy Birthday Sofie"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    maxLength={35}
                    className="w-full px-3 py-2.5 rounded-xl text-xs font-body shadow-sm focus:outline-none"
                    style={{
                      backgroundColor: activePalette.cardBg,
                      border: `1px solid ${activePalette.border}`,
                      color: activePalette.text,
                    }}
                  />
                </div>

                {/* Contact Details */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider" style={{ color: activePalette.text }}>
                    5. Your Details
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-xs font-body shadow-sm focus:outline-none"
                      style={{
                        backgroundColor: activePalette.cardBg,
                        border: `1px solid ${activePalette.border}`,
                        color: activePalette.text,
                      }}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        placeholder="Phone (for SMS) *"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs font-body shadow-sm focus:outline-none"
                        style={{
                          backgroundColor: activePalette.cardBg,
                          border: `1px solid ${activePalette.border}`,
                          color: activePalette.text,
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Instagram @handle"
                        value={clientInstagram}
                        onChange={(e) => setClientInstagram(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs font-body shadow-sm focus:outline-none"
                        style={{
                          backgroundColor: activePalette.cardBg,
                          border: `1px solid ${activePalette.border}`,
                          color: activePalette.text,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-xs font-mono font-bold tracking-wider active:scale-[0.99] transition-all shadow-sm cursor-pointer"
                    style={{
                      backgroundColor: activePalette.accent,
                      color: activePalette.accentFg,
                    }}
                  >
                    SEND ORDER REQUEST ({selectedService.price} KR)
                  </button>
                </div>
              </div>
            </form>
          )}
        </section>
      </main>

      {/* ================= LIGHTBOX MODAL ================= */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-sm w-full bg-[#18181b] rounded-2xl overflow-hidden border border-white/20 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                sizes="400px"
                className="object-cover object-center"
              />
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>
            <div className="p-4 space-y-1 text-white">
              <div className="text-sm font-bold font-heading">{lightboxImage.title}</div>
              <div className="text-xs text-zinc-400 font-mono">{lightboxImage.tag}</div>
            </div>
          </div>
        </div>
      )}

      {/* ================= REFINED FLOATING COLOR PALETTE DOCK ================= */}
      {/* Light, clean, warm-paper aesthetic — zero dark boxes */}
      <aside
        aria-label="Interactive brand palette switcher"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md transition-all duration-300"
      >
        <div className="bg-white/95 backdrop-blur-md text-[#1F1A16] rounded-2xl border border-black/10 shadow-xl p-3 space-y-2.5">
          {/* Header row with toggle to collapse/expand */}
          <div className="flex items-center justify-between px-1 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setPaletteDockOpen(!paletteDockOpen)}
              className="flex items-center gap-1.5 text-[#1F1A16] hover:opacity-80 font-bold cursor-pointer"
            >
              <span>🎨 Studio Vibe:</span>
              <span
                className="underline underline-offset-2"
                style={{ color: activePalette.accent }}
              >
                {activePalette.name}
              </span>
              <span className="text-xs opacity-50">{paletteDockOpen ? "▴" : "▾"}</span>
            </button>

            {/* Guide notes toggle */}
            <button
              type="button"
              onClick={() => setShowDemoNotes(!showDemoNotes)}
              className="inline-flex items-center gap-1 text-[10px] text-[#766A60] hover:text-[#1F1A16] px-2 py-0.5 rounded bg-black/[0.04] border border-black/5 cursor-pointer transition-colors"
              title="Toggle lowkey demo annotations"
            >
              {showDemoNotes ? <FiEyeOff size={11} /> : <FiEye size={11} />}
              <span>{showDemoNotes ? "Hide Notes" : "Show Notes"}</span>
            </button>
          </div>

          {/* Actual Visual Color Swatches (4 Palettes with genuine spaced 3-dot discs) */}
          <div className={`grid grid-cols-4 gap-1.5 pt-0.5 ${paletteDockOpen ? "hidden" : "grid"}`}>
            {palettes.map((p) => {
              const isActive = activePalette.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePalette(p)}
                  className={`p-2 rounded-xl text-left transition-all relative flex flex-col items-center justify-center gap-1.5 cursor-pointer border ${
                    isActive
                      ? "bg-black/[0.07] border-black/30 shadow-sm"
                      : "bg-black/[0.02] hover:bg-black/[0.05] border-black/10"
                  }`}
                  style={{
                    outline: isActive ? `2px solid ${activePalette.accent}` : "none",
                  }}
                  title={`Switch theme to ${p.name}`}
                >
                  {/* Visual 3-color disc swatch kit (clean, spaced, distinct dots) */}
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/25 shadow-sm flex-shrink-0"
                      style={{ backgroundColor: p.swatches[0] }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/25 shadow-sm flex-shrink-0"
                      style={{ backgroundColor: p.swatches[1] }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/25 shadow-sm flex-shrink-0"
                      style={{ backgroundColor: p.swatches[2] }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-center tracking-tight leading-tight text-[#231B15] font-medium">
                    {p.id === "vanilla"
                      ? "Vanilla"
                      : p.id === "rose"
                      ? "Rose"
                      : p.id === "matcha"
                      ? "Matcha"
                      : "Noir"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Subtitle explaining the feature */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#766A60] px-1 pt-0.5 border-t border-black/10">
            <span>Tap any palette to test live design vibes</span>
            <Link href="/pricing" className="text-[#1F1A16] font-bold hover:underline">
              Exit Demo ↗
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
