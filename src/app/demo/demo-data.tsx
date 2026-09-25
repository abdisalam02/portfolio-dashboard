import React from "react";
import { LuCroissant } from "react-icons/lu";
import { GiDiamondRing } from "react-icons/gi";

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
  imageSrc?: string;
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
  fontFamilyHeading: "var(--font-playfair), serif",
  logoEmblem: (accent) => (
    <div className="flex flex-col items-center justify-center">
      <LuCroissant size={36} style={{ color: accent }} />
    </div>
  ),
  palettes: [
    {
      id: "blanc-caramel",
      name: "Blanc & Caramel",
      descriptor: "Clean White & Salted Caramel",
      swatches: ["#FFFFFF", "#141416", "#A35C2E"],
      bg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "rgba(20, 20, 22, 0.10)",
      text: "#141416",
      muted: "#666570",
      accent: "#A35C2E",
      accentFg: "#FFFFFF",
      tagBg: "rgba(163, 92, 46, 0.08)",
    },
    {
      id: "blanc-framboise",
      name: "Blanc & Framboise",
      descriptor: "Clean White & Parisian Berry",
      swatches: ["#FFFFFF", "#141416", "#9E2548"],
      bg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "rgba(20, 20, 22, 0.10)",
      text: "#141416",
      muted: "#666570",
      accent: "#9E2548",
      accentFg: "#FFFFFF",
      tagBg: "rgba(158, 37, 72, 0.08)",
    },
    {
      id: "blanc-sauge",
      name: "Blanc & Sauge",
      descriptor: "Clean White & Nordic Sage",
      swatches: ["#FFFFFF", "#141416", "#2E5E3D"],
      bg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "rgba(20, 20, 22, 0.10)",
      text: "#141416",
      muted: "#666570",
      accent: "#2E5E3D",
      accentFg: "#FFFFFF",
      tagBg: "rgba(46, 94, 61, 0.08)",
    },
    {
      id: "noir",
      name: "Chocolat Noir & Or",
      descriptor: "Midnight Patisserie",
      swatches: ["#0E0E10", "#FAF7F2", "#C8AC70"],
      bg: "#0E0E10",
      cardBg: "#16161A",
      border: "rgba(250, 247, 242, 0.12)",
      text: "#FAF7F2",
      muted: "#96959E",
      accent: "#C8AC70",
      accentFg: "#0E0E10",
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
      title: "Korean Aesthetic Bento Cake",
      tag: "Retro Piped Buttercream · Clamshell Drop Box",
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
      title: "Fresh French Croissants & Pastries",
      tag: "Golden Flaky Butter Viennoiserie · Fresh Every Morning",
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
      imageSrc: "/demo/cakes/cake-1.jpg",
    },
    {
      id: "botanical-two-tier",
      name: "Two-Tier Botanical Cake",
      category: "celebration",
      servings: "16–20 servings",
      price: 1250,
      leadTime: "3 days notice",
      description: "Organic edible pressed florals, textured Swiss meringue buttercream, and delicate natural gold leaf touches.",
      imageSrc: "/demo/cakes/cake-5.jpg",
    },
    {
      id: "dark-cherry-ganache",
      name: "Dark Chocolate & Amarena Drip",
      category: "celebration",
      servings: "8–10 servings",
      price: 720,
      leadTime: "48h notice",
      description: "70% Valrhona dark chocolate sponge, wild Italian Amarena cherries, and silky bittersweet ganache glaze.",
      imageSrc: "/demo/cakes/cake-2.jpg",
    },
    {
      id: "strawberry-naked",
      name: "Nordic Berry & Mascarpone Cake",
      category: "celebration",
      servings: "8–10 servings",
      price: 690,
      leadTime: "48h notice",
      description: "Madagascan vanilla bean chiffon, whipped mascarpone cream, and fresh seasonal Norwegian berries.",
      imageSrc: "/demo/cakes/cake-6.jpg",
    },
    {
      id: "matcha-bento",
      name: "Matcha & Berry Bento Box",
      category: "bento",
      servings: "2–3 servings",
      price: 420,
      leadTime: "24h notice",
      description: "Korean-style petite celebration cake packaged in an eco sugarcane box. Japanese Uji matcha & raspberry compote.",
      imageSrc: "/demo/cakes/cake-3.jpg",
    },
    {
      id: "artisan-tart-box",
      name: "Artisan Fruit Tartlet Box (4 pcs)",
      category: "pastries",
      servings: "4 pieces",
      price: 380,
      leadTime: "24h notice",
      description: "Buttery sablé crusts filled with Tahitian vanilla pastry cream and topped with glazed fresh berries.",
      imageSrc: "/demo/cakes/cake-4.jpg",
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
  fontFamilyHeading: "var(--font-syne), sans-serif",
  logoEmblem: (accent, muted) => (
    <div className="flex flex-col items-center justify-center">
      <span
        className="text-2xl sm:text-3xl font-black tracking-[0.14em] uppercase leading-none font-mono"
        style={{ color: accent }}
      >
        KLØ
      </span>
      <div className="w-8 h-px my-1.5 opacity-40" style={{ backgroundColor: accent }} />
      <span className="text-[7.5px] font-mono tracking-[0.25em] uppercase font-bold" style={{ color: muted }}>
        STUDIO · OSLO
      </span>
    </div>
  ),
  palettes: [
    {
      id: "titanium",
      name: "Titanium & Chalk",
      descriptor: "Sharp High-Fashion Studio",
      swatches: ["#F8F9FA", "#0E0F12", "#2B3240"],
      bg: "#F8F9FA",
      cardBg: "#FFFFFF",
      border: "rgba(14, 15, 18, 0.12)",
      text: "#0E0F12",
      muted: "#5B5F6D",
      accent: "#1E293B",
      accentFg: "#FFFFFF",
      tagBg: "rgba(30, 41, 59, 0.08)",
    },
    {
      id: "noir",
      name: "Mirror Chrome & Noir",
      descriptor: "Editorial Darkroom",
      swatches: ["#09090B", "#F8F7F5", "#C8CCD4"],
      bg: "#09090B",
      cardBg: "#121215",
      border: "rgba(248, 247, 245, 0.12)",
      text: "#F8F7F5",
      muted: "#8C8C96",
      accent: "#CBD5E1",
      accentFg: "#09090B",
      tagBg: "rgba(203, 213, 225, 0.12)",
    },
    {
      id: "glazed",
      name: "Glazed Milk & Mauve",
      descriptor: "Hailey Glaze Aesthetic",
      swatches: ["#FAF4F5", "#26131A", "#9E586D"],
      bg: "#FAF4F5",
      cardBg: "#FFFFFF",
      border: "rgba(158, 88, 109, 0.14)",
      text: "#26131A",
      muted: "#765963",
      accent: "#9E586D",
      accentFg: "#FFFFFF",
      tagBg: "rgba(158, 88, 109, 0.08)",
    },
    {
      id: "sage",
      name: "Sage BIAB & Nude",
      descriptor: "Scandinavian Natural Gel",
      swatches: ["#EFF2EC", "#142016", "#4E6649"],
      bg: "#EFF2EC",
      cardBg: "#FFFFFF",
      border: "rgba(78, 102, 73, 0.14)",
      text: "#142016",
      muted: "#596B56",
      accent: "#4E6649",
      accentFg: "#FFFFFF",
      tagBg: "rgba(78, 102, 73, 0.08)",
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
      imageSrc: "/demo/nails/nail-3.jpg",
    },
    {
      id: "chrome-glaze",
      name: "Minimalist Chrome & Micro French",
      category: "biab",
      servings: "90 mins",
      price: 850,
      leadTime: "Most popular",
      description: "Full BIAB overlay with your choice of pearl glaze, liquid mirror chrome, or hand-painted ultra-fine micro French tips.",
      imageSrc: "/demo/nails/nail-2.jpg",
    },
    {
      id: "gelx-full",
      name: "Full Sculpted Gel-X Extensions",
      category: "extensions",
      servings: "105 mins",
      price: 1100,
      leadTime: "Zero natural damage",
      description: "100% soft-gel full cover extensions tailored to your custom length (Short/Med/Long) and shape (Almond, Coffin, Square).",
      imageSrc: "/demo/nails/nail-4.jpg",
    },
    {
      id: "editorial-3d",
      name: "Editorial 3D & Bespoke Art Set",
      category: "extensions",
      servings: "120 mins",
      price: 1350,
      leadTime: "Custom styling",
      description: "Full set featuring bespoke textured 3D gel droplets, hand-crafted chrome lines, and Japanese negative-space placement.",
      imageSrc: "/demo/nails/nail-5.jpg",
    },
    {
      id: "russian-care",
      name: "Russian E-File Dry Manicure",
      category: "care",
      servings: "50 mins",
      price: 500,
      leadTime: "Nail health focus",
      description: "Detailed medical-grade diamond e-file cuticle clean, precision nail shaping, warm organic oil soak, and high-shine buff.",
      imageSrc: "/demo/nails/nail-6.jpg",
    },
    {
      id: "soakoff-restore",
      name: "Safe Soak-Off & Nail Restoration",
      category: "care",
      servings: "45 mins",
      price: 350,
      leadTime: "Gentle removal",
      description: "Acetone-free gentle e-file removal of old extensions followed by an IBX deep repair keratin treatment.",
      imageSrc: "/demo/nails/nail-1.jpg",
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
  fontFamilyHeading: "var(--font-cormorant), serif",
  logoEmblem: (accent) => (
    <div className="flex flex-col items-center justify-center">
      <GiDiamondRing size={30} style={{ color: accent }} />
    </div>
  ),
  palettes: [
    {
      id: "ivory",
      name: "Diamond Ivory & Charcoal",
      descriptor: "Timeless Vogue Bridal",
      swatches: ["#FAF9F6", "#161618", "#7D6F5E"],
      bg: "#FAF9F6",
      cardBg: "#FFFFFF",
      border: "rgba(22, 22, 24, 0.12)",
      text: "#161618",
      muted: "#68676E",
      accent: "#7D6F5E",
      accentFg: "#FFFFFF",
      tagBg: "rgba(125, 111, 94, 0.08)",
    },
    {
      id: "rosewine",
      name: "Dusty Rose & Wine",
      descriptor: "Romantic Garden Ceremony",
      swatches: ["#FCF5F6", "#29151F", "#AD5B74"],
      bg: "#FCF5F6",
      cardBg: "#FFFFFF",
      border: "rgba(173, 91, 116, 0.14)",
      text: "#29151F",
      muted: "#755964",
      accent: "#AD5B74",
      accentFg: "#FFFFFF",
      tagBg: "rgba(173, 91, 116, 0.08)",
    },
    {
      id: "eucalyptus",
      name: "Eucalyptus & Spruce",
      descriptor: "Nordic Botanical Meadow",
      swatches: ["#F2F6F1", "#132317", "#4F6E4D"],
      bg: "#F2F6F1",
      cardBg: "#FFFFFF",
      border: "rgba(79, 110, 77, 0.14)",
      text: "#132317",
      muted: "#566C55",
      accent: "#4F6E4D",
      accentFg: "#FFFFFF",
      tagBg: "rgba(79, 110, 77, 0.08)",
    },
    {
      id: "blacktie",
      name: "Black Tie & Ivory",
      descriptor: "Luxury Grand Reception",
      swatches: ["#0A0A0C", "#F6F4EC", "#C4A666"],
      bg: "#0A0A0C",
      cardBg: "#141418",
      border: "rgba(246, 244, 236, 0.12)",
      text: "#F6F4EC",
      muted: "#949088",
      accent: "#C4A666",
      accentFg: "#0A0A0C",
      tagBg: "rgba(196, 166, 102, 0.12)",
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
