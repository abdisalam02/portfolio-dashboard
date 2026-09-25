import React from "react";

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

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  servings?: string; // or duration / scope
  price: number;
  leadTime: string;
  description: string;
  included?: string[];
}

export interface LookbookItem {
  src: string;
  title: string;
  tag: string;
}

export interface DemoConfig {
  id: "cakes" | "nails" | "wedding";
  badgeLabel: string;
  brandName: string;
  brandSubtitle: string;
  brandDescription: string;
  location: string;
  locationDetails: string;
  statusPill: string;
  instagramHandle: string;
  instagramUrl: string;
  metaNotes: string;
  fontFamilyHeading: string;
  logoEmblem: (accent: string, muted: string, border: string) => React.ReactNode;
  palettes: PaletteTheme[];
  lookbook: LookbookItem[];
  categories: Array<{ id: string; label: string }>;
  services: ServiceItem[];
  bookingConfig: {
    sectionTitle: string;
    sectionSubtitle: string;
    dateLabel: string;
    timeLabel: string;
    dates: Array<{ day: string; date: string; full: string }>;
    timeSlots: string[];
    customLabel: string;
    customPlaceholder: string;
    nicheType: "cakes" | "nails" | "wedding";
  };
}

/* =========================================================================
   1. CAKES DEMO: MAISON SUCRE (Artisanal Pâtisserie)
   ========================================================================= */
export const cakesDemoConfig: DemoConfig = {
  id: "cakes",
  badgeLabel: "Bakery & Cakes Demo",
  brandName: "MAISON SUCRE",
  brandSubtitle: "Atelier de Pâtisserie · Oslo",
  brandDescription:
    "Handcrafted vintage celebration cakes, Korean bento drops, and French tartlets. Baked fresh in Frogner for your special moments.",
  location: "Bygdøy Allé, Frogner",
  locationDetails: "Frogner Atelier, Oslo",
  statusPill: "Weekend Collections",
  instagramHandle: "@maisonsucre.oslo",
  instagramUrl: "https://instagram.com",
  metaNotes: "Pickup Fridays & Saturdays · Pre-orders close Thursdays at 20:00",
  fontFamilyHeading: "var(--font-cinzel), serif",
  logoEmblem: (accent, muted, border) => (
    <div
      className="w-full h-full rounded-full flex flex-col items-center justify-center p-2 text-center relative"
      style={{ border: `1px solid ${border}` }}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-0.5"
        style={{ color: accent }}
      >
        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
        <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <path d="M32 9L33.2 12.8L37 14L33.2 15.2L32 19L30.8 15.2L27 14L30.8 12.8L32 9Z" fill="currentColor" />
        <rect x="26" y="21" width="12" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
        <path d="M26 23.5C28 24.5 30 24.5 32 23.5C34 22.5 36 22.5 38 23.5" stroke="currentColor" strokeWidth="0.75" />
        <rect x="21" y="29" width="22" height="10" rx="2" stroke="currentColor" strokeWidth="1.25" fill="none" />
        <path d="M21 32.5C24 34 28 34 32 32.5C36 31 40 31 43 32.5" stroke="currentColor" strokeWidth="0.75" />
        <path d="M19 40H45M28 40L26 46H38L36 40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 28C13 32 14 38 18 42" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <path d="M49 28C51 32 50 38 46 42" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      </svg>
      <span className="text-[8px] font-mono tracking-[0.25em] uppercase font-bold" style={{ color: muted }}>
        EST. 2024
      </span>
    </div>
  ),
  palettes: [
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
  ],
  lookbook: [
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
  ],
  categories: [
    { id: "all", label: "Full Menu" },
    { id: "vintage", label: "Vintage Lambeth" },
    { id: "celebration", label: "Celebration Cakes" },
    { id: "bento", label: "Bento Boxes" },
    { id: "pastries", label: "French Pastries" },
  ],
  services: [
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
  ],
  bookingConfig: {
    sectionTitle: "Select Your Order & Pickup Window",
    sectionSubtitle: "Freshly baked each morning. Choose your pickup slot at our Frogner atelier.",
    dateLabel: "Pickup Date",
    timeLabel: "Pickup Window",
    dates: [
      { day: "Fri", date: "24", full: "Friday, Oct 24" },
      { day: "Sat", date: "25", full: "Saturday, Oct 25" },
      { day: "Sun", date: "26", full: "Sunday, Oct 26" },
      { day: "Thu", date: "30", full: "Thursday, Oct 30" },
      { day: "Fri", date: "31", full: "Friday, Oct 31" },
    ],
    timeSlots: ["10:00 – 12:00", "12:00 – 14:00", "14:00 – 16:00", "16:00 – 18:00"],
    customLabel: "Piped Custom Message (Optional)",
    customPlaceholder: "e.g. 'Happy Birthday Julie 25' or 'Forever & Always'",
    nicheType: "cakes",
  },
};

/* =========================================================================
   2. NAILS DEMO: STUDIO KLŌ (Bespoke Gel & BIAB Atelier)
   ========================================================================= */
export const nailsDemoConfig: DemoConfig = {
  id: "nails",
  badgeLabel: "Nail Studio Demo",
  brandName: "STUDIO KLØ",
  brandSubtitle: "Bespoke Gel & BIAB Atelier · Grünerløkka, Oslo",
  brandDescription:
    "Scandinavian minimalism meets Japanese structured gel. Clean cuticle work, natural nail health, chrome finishes, and bespoke 3D editorial nail art.",
  location: "Thorvald Meyers gate, Grünerløkka",
  locationDetails: "Studio 4B, Oslo",
  statusPill: "October Slots Open",
  instagramHandle: "@studioklo.oslo",
  instagramUrl: "https://instagram.com",
  metaNotes: "1-on-1 private appointments · 48h cancellation notice · Card & Vipps",
  fontFamilyHeading: "var(--font-heading), sans-serif",
  logoEmblem: (accent, muted, border) => (
    <div
      className="w-full h-full rounded-2xl flex flex-col items-center justify-center p-2 text-center relative"
      style={{ border: `1px solid ${border}` }}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-0.5"
        style={{ color: accent }}
      >
        {/* Modern Minimalist Arch Frame */}
        <rect x="14" y="8" width="36" height="48" rx="18" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.8" />
        <rect x="18" y="12" width="28" height="40" rx="14" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
        {/* Clean Monogram K L Ø */}
        <text
          x="32"
          y="35"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="monospace"
          fontWeight="900"
          fontSize="14"
          letterSpacing="0.1em"
        >
          KLØ
        </text>
        {/* Subtle Diamond Sparkle Top */}
        <path d="M32 16L33 19L36 20L33 21L32 24L31 21L28 20L31 19L32 16Z" fill="currentColor" />
        {/* Bottom studio mark */}
        <circle cx="32" cy="46" r="1.5" fill="currentColor" />
      </svg>
      <span className="text-[8px] font-mono tracking-[0.25em] uppercase font-bold" style={{ color: muted }}>
        NAILS · OSLO
      </span>
    </div>
  ),
  palettes: [
    {
      id: "alabaster",
      name: "Alabaster & Chrome",
      descriptor: "Minimalist Scandinavian Studio",
      swatches: ["#F5F3EF", "#141416", "#9B8065"],
      bg: "#F5F3EF",
      cardBg: "#FFFFFF",
      border: "rgba(20, 20, 22, 0.12)",
      text: "#141416",
      muted: "#6A6A74",
      accent: "#9B8065",
      accentFg: "#FFFFFF",
      tagBg: "rgba(155, 128, 101, 0.08)",
    },
    {
      id: "olive",
      name: "Sage & Nude",
      descriptor: "Copenhagen Botanical Gel",
      swatches: ["#F0F2ED", "#162017", "#5A6B53"],
      bg: "#F0F2ED",
      cardBg: "#FFFFFF",
      border: "rgba(90, 107, 83, 0.14)",
      text: "#162017",
      muted: "#5D6A5A",
      accent: "#5A6B53",
      accentFg: "#FFFFFF",
      tagBg: "rgba(90, 107, 83, 0.08)",
    },
    {
      id: "mauve",
      name: "Milk Rose & Cassis",
      descriptor: "Glazed Editorial Palette",
      swatches: ["#FAF4F3", "#26131A", "#9E586D"],
      bg: "#FAF4F3",
      cardBg: "#FFFFFF",
      border: "rgba(158, 88, 109, 0.14)",
      text: "#26131A",
      muted: "#765963",
      accent: "#9E586D",
      accentFg: "#FFFFFF",
      tagBg: "rgba(158, 88, 109, 0.08)",
    },
    {
      id: "noir",
      name: "Noir & Titanium",
      descriptor: "High-Fashion Editorial",
      swatches: ["#0C0C0D", "#F8F7F5", "#A0A5AD"],
      bg: "#0C0C0D",
      cardBg: "#151518",
      border: "rgba(248, 247, 245, 0.12)",
      text: "#F8F7F5",
      muted: "#8C8C96",
      accent: "#C5C9D1",
      accentFg: "#0C0C0D",
      tagBg: "rgba(197, 201, 209, 0.12)",
    },
  ],
  lookbook: [
    {
      src: "/demo/nails/nail-1.jpg",
      title: "Clean French Micro-Tip",
      tag: "Structured BIAB Overlay · Sheer Nude Base",
    },
    {
      src: "/demo/nails/nail-2.jpg",
      title: "Liquid Chrome Glaze Set",
      tag: "Sculpted Gel-X · Mirror Titanium Powder",
    },
    {
      src: "/demo/nails/nail-3.jpg",
      title: "Negative Space Architectural Lines",
      tag: "Matte Black & Gloss Details · E-file Manicure",
    },
    {
      src: "/demo/nails/nail-4.jpg",
      title: "Studio Nail Care & Restoration",
      tag: "Russian Cuticle Prep · Natural Keratin Oil",
    },
    {
      src: "/demo/nails/nail-5.jpg",
      title: "Almond Nude BIAB Strengthening",
      tag: "Zero-Damage Gel · Flawless Apex Structure",
    },
    {
      src: "/demo/nails/nail-6.jpg",
      title: "3D Molten Silver Drops",
      tag: "Bespoke Textured Chrome & Gel Sculpting",
    },
  ],
  categories: [
    { id: "all", label: "All Services" },
    { id: "biab", label: "BIAB & Gel" },
    { id: "extensions", label: "Gel-X Sets" },
    { id: "care", label: "Manicure & Care" },
  ],
  services: [
    {
      id: "biab-overlay",
      name: "Structured BIAB Gel Overlay",
      category: "biab",
      servings: "75 mins",
      price: 650,
      leadTime: "Natural nails",
      description: "Reinforced rubber-base builder gel applied over your natural nails with flawless apex architecture for maximum retention.",
    },
    {
      id: "chrome-glaze",
      name: "Minimalist Chrome & Micro French",
      category: "biab",
      servings: "90 mins",
      price: 850,
      leadTime: "Most popular",
      description: "Full BIAB overlay with your choice of pearl glaze, liquid mirror chrome, or hand-painted ultra-fine micro French tips.",
    },
    {
      id: "gelx-full",
      name: "Full Sculpted Gel-X Extensions",
      category: "extensions",
      servings: "105 mins",
      price: 1100,
      leadTime: "Zero natural damage",
      description: "100% soft-gel full cover extensions tailored to your custom length (Short/Med/Long) and shape (Almond, Coffin, Square).",
    },
    {
      id: "editorial-3d",
      name: "Editorial 3D & Bespoke Art Set",
      category: "extensions",
      servings: "120 mins",
      price: 1350,
      leadTime: "Custom styling",
      description: "Full set featuring bespoke textured 3D gel droplets, hand-crafted chrome lines, and Japanese negative-space placement.",
    },
    {
      id: "russian-care",
      name: "Russian E-File Dry Manicure",
      category: "care",
      servings: "50 mins",
      price: 500,
      leadTime: "Nail health focus",
      description: "Detailed medical-grade diamond e-file cuticle clean, precision nail shaping, warm organic oil soak, and high-shine buff.",
    },
    {
      id: "soakoff-restore",
      name: "Safe Soak-Off & Nail Restoration",
      category: "care",
      servings: "45 mins",
      price: 350,
      leadTime: "Gentle removal",
      description: "Acetone-free gentle e-file removal of old extensions followed by an IBX deep repair keratin treatment.",
    },
  ],
  bookingConfig: {
    sectionTitle: "Select Service & Reserve Chair",
    sectionSubtitle: "Private 1-on-1 studio in Grünerløkka. Appointments include precision cuticle prep.",
    dateLabel: "Appointment Date",
    timeLabel: "Preferred Time",
    dates: [
      { day: "Tue", date: "21", full: "Tuesday, Oct 21" },
      { day: "Wed", date: "22", full: "Wednesday, Oct 22" },
      { day: "Thu", date: "23", full: "Thursday, Oct 23" },
      { day: "Fri", date: "24", full: "Friday, Oct 24" },
      { day: "Sat", date: "25", full: "Saturday, Oct 25" },
    ],
    timeSlots: ["10:30 – 12:00", "12:30 – 14:00", "14:30 – 16:00", "16:30 – 18:00", "18:30 – 20:00"],
    customLabel: "Nails Status & Inspo Note",
    customPlaceholder: "e.g. 'Bare nails currently. Almond shape. Want chrome glaze like post #2.'",
    nicheType: "nails",
  },
};

/* =========================================================================
   3. WEDDING DEMO: ASTRID BRIDAL (Ceremony & Bridal Florals)
   ========================================================================= */
export const weddingDemoConfig: DemoConfig = {
  id: "wedding",
  badgeLabel: "Wedding Services Demo",
  brandName: "ASTRID BRIDAL",
  brandSubtitle: "Bespoke Ceremony & Reception Florals · Oslo",
  brandDescription:
    "Ethereal, sculptural Scandinavian wedding florals. Romantic organic bridal bouquets, ceremony meadow aisles, and candlelit reception styling across Oslo and Viken.",
  location: "Oscars gate, Frogner",
  locationDetails: "Private Studio, Oslo",
  statusPill: "2025/2026 Season Open",
  instagramHandle: "@astridbridal.oslo",
  instagramUrl: "https://instagram.com",
  metaNotes: "Limited dates per season · Complimentary moodboard consultation · On-site styling",
  fontFamilyHeading: "var(--font-cinzel), serif",
  logoEmblem: (accent, muted, border) => (
    <div
      className="w-full h-full rounded-full flex flex-col items-center justify-center p-2 text-center relative"
      style={{ border: `1px solid ${border}` }}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-0.5"
        style={{ color: accent }}
      >
        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
        {/* Intertwined Bridal Rings */}
        <circle cx="28" cy="22" r="6" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.85" />
        <circle cx="36" cy="22" r="6" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.85" />
        {/* Botanical Garden Rose & Olive Branch */}
        <path d="M32 30V48" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M32 36C26 33 24 38 27 41C30 42 32 39 32 36Z" fill="currentColor" opacity="0.6" />
        <path d="M32 40C38 37 40 42 37 45C34 46 32 43 32 40Z" fill="currentColor" opacity="0.6" />
        {/* Petite Top Star */}
        <path d="M32 9L32.8 11.5L35 12L32.8 12.5L32 15L31.2 12.5L29 12L31.2 11.5L32 9Z" fill="currentColor" />
      </svg>
      <span className="text-[8px] font-mono tracking-[0.25em] uppercase font-bold" style={{ color: muted }}>
        BRUD · OSLO
      </span>
    </div>
  ),
  palettes: [
    {
      id: "champagne",
      name: "Champagne & Linen",
      descriptor: "Timeless Scandinavian Wedding",
      swatches: ["#FAF7F2", "#1C1917", "#A88B67"],
      bg: "#FAF7F2",
      cardBg: "#FFFFFF",
      border: "rgba(28, 25, 23, 0.12)",
      text: "#1C1917",
      muted: "#6E6862",
      accent: "#A88B67",
      accentFg: "#FFFFFF",
      tagBg: "rgba(168, 139, 103, 0.08)",
    },
    {
      id: "rosewine",
      name: "Dusty Rose & Wine",
      descriptor: "Romantic Garden Ceremony",
      swatches: ["#FDF6F6", "#29161E", "#B06D80"],
      bg: "#FDF6F6",
      cardBg: "#FFFFFF",
      border: "rgba(176, 109, 128, 0.14)",
      text: "#29161E",
      muted: "#755B64",
      accent: "#B06D80",
      accentFg: "#FFFFFF",
      tagBg: "rgba(176, 109, 128, 0.08)",
    },
    {
      id: "eucalyptus",
      name: "Eucalyptus & Spruce",
      descriptor: "Nordic Botanical Meadow",
      swatches: ["#F4F6F2", "#17231B", "#63755A"],
      bg: "#F4F6F2",
      cardBg: "#FFFFFF",
      border: "rgba(99, 117, 90, 0.14)",
      text: "#17231B",
      muted: "#5C6A5A",
      accent: "#63755A",
      accentFg: "#FFFFFF",
      tagBg: "rgba(99, 117, 90, 0.08)",
    },
    {
      id: "blacktie",
      name: "Black Tie & Ivory",
      descriptor: "Luxury Grand Reception",
      swatches: ["#0E0E10", "#F5F2EA", "#C5A869"],
      bg: "#0E0E10",
      cardBg: "#16161A",
      border: "rgba(245, 242, 234, 0.12)",
      text: "#F5F2EA",
      muted: "#949088",
      accent: "#C5A869",
      accentFg: "#0E0E10",
      tagBg: "rgba(197, 168, 105, 0.12)",
    },
  ],
  lookbook: [
    {
      src: "/demo/wedding/wedding-1.jpg",
      title: "Signature Organic Bridal Bouquet",
      tag: "David Austin Roses · Peonies & Trailing Silk",
    },
    {
      src: "/demo/wedding/wedding-2.jpg",
      title: "Ceremony Floral Meadow Arch",
      tag: "Organic Curved Ground Arch · Wild Delphiniums",
    },
    {
      src: "/demo/wedding/wedding-3.jpg",
      title: "Bridesmaid Posy & Buttonholes",
      tag: "Coordinated Floral Palette · Silk Ribbon Finish",
    },
    {
      src: "/demo/wedding/wedding-4.jpg",
      title: "Nordic Outdoor Ceremony Aisle",
      tag: "Subtle Floral Markers · Natural Grass Setting",
    },
    {
      src: "/demo/wedding/wedding-5.jpg",
      title: "Curated Candlelit Tablescape",
      tag: "Handcrafted Ceramic Bud Vases & Taper Candles",
    },
    {
      src: "/demo/wedding/wedding-6.jpg",
      title: "Groom & Groomsman Boutonnières",
      tag: "Textured Seed Heads & Miniature Garden Blooms",
    },
  ],
  categories: [
    { id: "all", label: "All Packages" },
    { id: "party", label: "Bridal Party" },
    { id: "ceremony", label: "Ceremony Styling" },
    { id: "reception", label: "Tables & Receptions" },
  ],
  services: [
    {
      id: "city-hall",
      name: "City Hall Intimate Romance",
      category: "party",
      servings: "2–4 pieces",
      price: 2400,
      leadTime: "1 week notice",
      description: "Curated for civil weddings and intimate celebrations. Includes premium organic bridal bouquet and matching tailored boutonnière.",
      included: [
        "1x Statement Organic Bridal Bouquet with trailing silk ribbon",
        "1x Tailored Groom Boutonnière with botanical detail",
        "Protective glass travel vase & morning studio pickup/drop"
      ],
    },
    {
      id: "signature-bridal-party",
      name: "Signature Bridal Party Package",
      category: "party",
      servings: "Complete bridal party",
      price: 5200,
      leadTime: "Bespoke styling",
      description: "Statement organic bridal bouquet, 2 bridesmaid posies, 3 groom & groomsman boutonnieres, and delicate pinned hair blooms.",
      included: [
        "1x Deluxe Bridal Bouquet with seasonal Garden Roses & Sweet Peas",
        "2x Petite Bridesmaid Bouquets tailored in complementary tones",
        "3x Groom & Groomsmen Boutonnières with organic textures",
        "Delicate fresh floral hair pins for the bride",
        "On-site morning bridal delivery & floral care briefing"
      ],
    },
    {
      id: "ceremony-meadow",
      name: "Ceremony Meadow & Ground Arch",
      category: "ceremony",
      servings: "On-site installation",
      price: 8500,
      leadTime: "Full venue setup",
      description: "Organic curved meadow floral installation framing the couple during vows. Repurposed for the reception stage after ceremony.",
      included: [
        "Curved floral ground arch framing the ceremony vows",
        "Aisle entrance floral markers or floral clusters",
        "Repurposing & moving to bridal table after ceremony",
        "Full installation, mechanics, water vessels & pack-down"
      ],
    },
    {
      id: "tablescape-curated",
      name: "Reception Tablescape & Bud Vases",
      category: "reception",
      servings: "Up to 10 tables",
      price: 7800,
      leadTime: "Complete styling",
      description: "Curated ceramic bud vase trios, taper candle pairings, and organic scattered greenery for up to 10 dining tables.",
      included: [
        "30x Handcrafted ceramic bud vases with seasonal blooms",
        "10x Sets of Danish dinner taper candles & hurricane glass",
        "Scattered Italian Ruscus & organic garden greenery runners",
        "On-site afternoon placement & midnight teardown"
      ],
    },
    {
      id: "full-bespoke-wedding",
      name: "Full Bespoke Wedding Floral Suite",
      category: "ceremony",
      servings: "End-to-end wedding",
      price: 18500,
      leadTime: "Limited 12 per season",
      description: "Complete bridal party flowers, ceremony ground arch, aisle meadows, dining tablescapes, on-site setup, and midnight pack-down.",
      included: [
        "Complete Signature Bridal Party Floral Suite",
        "Ceremony curved ground arch & entrance florals",
        "Up to 12 guest dining tablescapes with bud vases & candles",
        "Head table focal floral arrangement",
        "Dedicated lead florist on-site for morning setup & late strike"
      ],
    },
    {
      id: "consultation-moodboard",
      name: "Complimentary Vision Consultation",
      category: "party",
      servings: "30 mins",
      price: 0,
      leadTime: "Online or Frogner studio",
      description: "Meet with Astrid to review your venue, dress style, color palette, and receive a customized floral proposal.",
      included: [
        "30-minute private vision session (Frogner studio or Video)",
        "Curated digital moodboard & floral color palette palette",
        "Detailed line-item proposal locked for 14 days"
      ],
    },
  ],
  bookingConfig: {
    sectionTitle: "Inquire for Your Wedding Date",
    sectionSubtitle: "We accept a limited number of weddings per season to give each couple our undivided attention.",
    dateLabel: "Wedding / Ceremony Date",
    timeLabel: "Consultation Slot",
    dates: [
      { day: "Sat", date: "14", full: "Saturday, Jun 14" },
      { day: "Sat", date: "21", full: "Saturday, Jun 21" },
      { day: "Sat", date: "28", full: "Saturday, Jun 28" },
      { day: "Sat", date: "05", full: "Saturday, Jul 05" },
      { day: "Sat", date: "12", full: "Saturday, Jul 12" },
    ],
    timeSlots: ["11:00 Coffee Consultation", "13:30 Studio Tasting", "16:00 Video Call", "18:00 Evening Call"],
    customLabel: "Venue, Guest Count & Color Vision",
    customPlaceholder: "e.g. 'Villa Eckbo, Oslo. ~70 guests. Palette of soft creams, dusty rose, and wild garden greenery.'",
    nicheType: "wedding",
  },
};
