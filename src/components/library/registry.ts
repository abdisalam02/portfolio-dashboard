import { UIComponentItem } from "./types";
import {
  NavEditorialSplit,
  NavBrutalistGrid,
  NavFloatingPill,
  NavTerminalHud,
  NavMagazineStack,
  NavUnderlineRule,
  NavCornerAnchors,
  NavBottomDock,
  NavMarqueeTicker,
  NavAtelierCart,
  NavDotDrawer,
  NavSplitDualTone,
  NavIndexNumbers,
  NavFolderTabs,
} from "./NavComponents";

import {
  HeroBigInk,
  HeroSplitScreen,
  HeroPortraitVignette,
  HeroNewspaperBroadside,
  HeroCinematicCover,
  HeroBrutalistWireframe,
  HeroSequentialLedger,
  HeroProductFocus,
  HeroAsymmetricBleed,
  HeroSingleInput,
  HeroQuadMasonry,
  HeroStudioDossier,
  HeroBusinessCard,
  HeroKineticHeadline,
} from "./HeroComponents";

import {
  TitleSerifGrotesk,
  TitleMonoIndex,
  TitleHeavyRule,
  TitleGhostContrast,
  TitleDropCap,
  TitleSuperTracked,
  TitleInkBlock,
  TitleHangingIndent,
  TitleInlineToken,
  TitleSplitLedger,
  TitleBracketEnclosure,
  TitleVerticalSpine,
} from "./TitleComponents";

import {
  GalleryFilmstrip,
  GalleryEditorialDuo,
  GalleryMasonryTrio,
  GalleryPolaroidSpecimen,
  GalleryVerticalStacker,
  GalleryHoverZoom,
  GallerySixGrid,
  GalleryOffsetStack,
  GalleryBeforeAfter,
  GalleryBlueprintReveal,
  GalleryCircularFraming,
  GalleryFocusTrio,
} from "./GalleryComponents";

import {
  AccordionHairlineRule,
  AccordionBrutalistCell,
  AccordionNumberedDossier,
  AccordionSideBySide,
  AccordionPlusMinus,
  AccordionFloatingCards,
  AccordionServicePrice,
  AccordionTabPills,
  AccordionCodeInspector,
  AccordionChevronSnap,
  AccordionNestedDrilldown,
  AccordionBorderlessGhost,
} from "./DropdownComponents";

import {
  BookingDateStrip,
  BookingTimeMatrix,
  BookingBoardingPass,
  BookingVippsDeposit,
  BookingSelectorChips,
  BookingThreeField,
  BookingMobileBottomPill,
  BookingMonoTerminal,
  BookingIntakeCard,
  BookingInstaLauncher,
} from "./BookingComponents";

export const UI_COMPONENTS_REGISTRY: UIComponentItem[] = [
  // -------------------------------------------------------------
  // NAVIGATIONS (14 items)
  // -------------------------------------------------------------
  {
    id: "nav-editorial-split",
    category: "navs",
    name: "Classic Editorial Split",
    styleTag: "Editorial",
    description: "Serif wordmark, hairline spacing, and minimal text links with booking arrow indicator.",
    component: NavEditorialSplit,
    codeSnippet: `<nav className="w-full py-4 px-6 bg-card border border-card-border flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="font-heading font-bold text-sm tracking-tight text-foreground">A.GURE</span>
    <span className="text-[10px] font-mono text-muted uppercase tracking-widest hidden sm:inline">OSLO · EST. 2024</span>
  </div>
  <div className="flex items-center gap-6 text-xs font-mono text-muted">
    <span className="hover:text-foreground cursor-pointer transition-colors">WORK</span>
    <span className="hover:text-foreground cursor-pointer transition-colors">RATES</span>
    <span className="hover:text-foreground cursor-pointer transition-colors">STUDIO</span>
    <span className="text-foreground font-semibold flex items-center gap-1 cursor-pointer">
      BOOK <FiArrowUpRight className="text-xs" />
    </span>
  </div>
</nav>`,
  },
  {
    id: "nav-brutalist-grid",
    category: "navs",
    name: "Brutalist Boxed Grid",
    styleTag: "Brutalist",
    description: "4-cell table structure with bold outlines, live availability beacon, and solid button cell.",
    component: NavBrutalistGrid,
    codeSnippet: `<nav className="w-full grid grid-cols-2 sm:grid-cols-4 border border-foreground divide-x divide-foreground bg-card text-xs font-mono">
  <div className="p-3 font-bold tracking-tighter uppercase text-foreground bg-card">STUDIO KLØ</div>
  <div className="p-3 text-muted flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    <span className="text-[11px]">AVAIL: MAR 2026</span>
  </div>
  <div className="p-3 text-muted hover:text-foreground cursor-pointer hidden sm:flex items-center justify-center">[ RATES & SPECS ]</div>
  <div className="p-3 bg-foreground text-background font-bold text-center uppercase cursor-pointer hover:opacity-90">RESERVE SLOT →</div>
</nav>`,
  },
  {
    id: "nav-floating-pill",
    category: "navs",
    name: "Center Floating Geometric Pill",
    styleTag: "Minimal",
    description: "Compact floating island with sharp 0px geometry and high-contrast tab states.",
    component: NavFloatingPill,
    codeSnippet: `<nav className="inline-flex items-center gap-1 p-1.5 bg-card/95 backdrop-blur-md border border-card-border shadow-lg">
  {["Works", "Treatments", "About", "Contact"].map((tab) => (
    <button key={tab} className="px-3 py-1.5 text-xs font-mono transition-all text-muted hover:text-foreground">
      {tab}
    </button>
  ))}
</nav>`,
  },
  {
    id: "nav-terminal-hud",
    category: "navs",
    name: "Monospace Terminal HUD",
    styleTag: "Monospace",
    description: "Technical heads-up display showing system version, coordinates, and live Oslo clock.",
    component: NavTerminalHud,
    codeSnippet: `<nav className="w-full p-3 bg-card border-b-2 border-card-border font-mono text-[11px] text-muted flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="text-foreground font-bold">SYS.VER//2.4</span>
    <span className="hidden sm:inline text-muted/60">59°54'N 10°45'E</span>
  </div>
  <div className="flex items-center gap-4">
    <span className="text-foreground">ROOT: [LOOKBOOK]</span>
    <span className="hover:text-foreground cursor-pointer">SERVICES</span>
  </div>
  <div className="flex items-center gap-1 text-foreground font-semibold">
    <FiClock className="text-xs" />
    <span>19:30 CET</span>
  </div>
</nav>`,
  },
  {
    id: "nav-magazine-stack",
    category: "navs",
    name: "Magazine Stacked Header Nav",
    styleTag: "Luxury",
    description: "High-fashion masthead with centered brand wordmark, delicate rule, and serif links.",
    component: NavMagazineStack,
    codeSnippet: `<header className="w-full bg-card border border-card-border py-4 px-6 text-center">
  <div className="font-heading text-lg font-black tracking-widest text-foreground uppercase">NOIRE ATELIER</div>
  <div className="text-[10px] font-mono tracking-widest text-muted mt-0.5 uppercase">Independent Fine Jewelry & Gems · Oslo</div>
  <div className="w-full h-px bg-card-border my-3" />
  <div className="flex items-center justify-center gap-6 text-xs font-serif tracking-wider text-muted">
    <span className="hover:text-foreground cursor-pointer">COLLECTION</span>
    <span>/</span>
    <span className="hover:text-foreground cursor-pointer">BESPOKE ORDER</span>
  </div>
</header>`,
  },
  {
    id: "nav-underline-rule",
    category: "navs",
    name: "Minimalist Underline Rule",
    styleTag: "Minimal",
    description: "Stark monochrome links with an active ink baseline underline that tracks hovered words.",
    component: NavUnderlineRule,
    codeSnippet: `<nav className="w-full py-4 px-6 bg-card border-b border-card-border flex items-center justify-between">
  <span className="font-heading font-black text-sm tracking-tight">K L Ø</span>
  <div className="flex items-center gap-6 text-xs font-mono">
    {links.map((link) => (
      <div key={link} className="relative cursor-pointer py-1">
        <span className="text-foreground font-bold">{link}</span>
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground transition-all" />
      </div>
    ))}
  </div>
</nav>`,
  },
  {
    id: "nav-corner-anchors",
    category: "navs",
    name: "Quadrant Corner Anchors",
    styleTag: "Architectural",
    description: "Pushes navigation elements to the four extreme corners of the viewport quadrant.",
    component: NavCornerAnchors,
    codeSnippet: `<div className="w-full h-24 p-4 border border-card-border bg-card relative text-xs font-mono">
  <span className="absolute top-3 left-4 font-bold text-foreground">01/ BRAND</span>
  <span className="absolute top-3 right-4 text-foreground hover:underline cursor-pointer">RESERVE →</span>
  <span className="absolute bottom-3 left-4 text-muted text-[10px]">OSLO, NO · LAT 59.91</span>
  <span className="absolute bottom-3 right-4 text-muted text-[10px]">MENU [INDEX]</span>
</div>`,
  },
  {
    id: "nav-bottom-dock",
    category: "navs",
    name: "Mobile App Bottom Dock",
    styleTag: "Mobile-First",
    description: "Fixed thumb-friendly bottom dock inspired by iOS, optimized for 375px mobile screens.",
    component: NavBottomDock,
    codeSnippet: `<div className="w-full p-2 flex justify-center bg-card/40 border border-card-border">
  <div className="w-full max-w-sm bg-card border border-card-border p-2 flex items-center justify-around shadow-md">
    <button className="flex flex-col items-center gap-1 text-[10px] font-mono text-muted">
      <FiGrid className="text-sm" /><span>Lookbook</span>
    </button>
    <button className="flex items-center gap-1 px-3 py-1.5 bg-foreground text-background text-[11px] font-mono font-bold uppercase">
      <FiCalendar className="text-xs" /><span>Book</span>
    </button>
  </div>
</div>`,
  },
  {
    id: "nav-marquee-ticker",
    category: "navs",
    name: "Continuous Marquee Ticker Nav",
    styleTag: "Kinetic",
    description: "An animated scrolling announcement ribbon paired directly with a clean navbar below.",
    component: NavMarqueeTicker,
    codeSnippet: `<div className="w-full border border-card-border bg-card overflow-hidden">
  <div className="bg-foreground text-background py-1 px-4 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap overflow-hidden flex">
    <span className="animate-marquee inline-block">STUDIO KLØ · MARCH SLOTS OPEN · BOOK VIA VIPPS IN 10S · </span>
  </div>
  <div className="p-3 px-6 flex items-center justify-between text-xs font-mono">
    <span className="font-bold text-foreground">KLØ NAILS</span>
  </div>
</div>`,
  },
  {
    id: "nav-atelier-cart",
    category: "navs",
    name: "Atelier Compact Cart & Book",
    styleTag: "Luxury",
    description: "Minimalist boutique bar showing selected treatments and direct checkout amount in NOK.",
    component: NavAtelierCart,
    codeSnippet: `<nav className="w-full py-3.5 px-6 bg-card border border-card-border flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="w-2.5 h-2.5 bg-foreground" />
    <span className="font-serif text-sm tracking-wide text-foreground">Atelier V</span>
  </div>
  <button className="flex items-center gap-2 px-3 py-1 border border-card-border text-foreground">
    <FiShoppingBag className="text-xs" /><span>750 KR</span>
  </button>
</nav>`,
  },
  {
    id: "nav-dot-drawer",
    category: "navs",
    name: "Minimal Dot & Drawer Trigger",
    styleTag: "Minimal",
    description: "Ultra-lean bar featuring a single toggle that unfolds a two-column contact and links drawer.",
    component: NavDotDrawer,
    codeSnippet: `<nav className="p-4 px-6 flex items-center justify-between">
  <span className="font-heading font-black tracking-tighter text-sm">GURE.STUDIO</span>
  <button className="flex items-center gap-1.5 px-3 py-1 border border-card-border text-xs font-mono">
    <FiMenu className="text-xs" /><span>MENU</span>
  </button>
</nav>`,
  },
  {
    id: "nav-split-dualtone",
    category: "navs",
    name: "Split Dual-Tone (50/50 Yin-Yang)",
    styleTag: "Brutalist",
    description: "Half light paper background on left, half dark obsidian background on right with clean contrast.",
    component: NavSplitDualTone,
    codeSnippet: `<nav className="w-full flex border border-card-border text-xs font-mono overflow-hidden">
  <div className="w-1/2 p-3.5 px-5 bg-card text-foreground flex items-center justify-between border-r border-card-border">
    <span className="font-bold">A.GURE / ARCHIVE</span>
  </div>
  <div className="w-1/2 p-3.5 px-5 bg-foreground text-background flex items-center justify-between">
    <span className="font-bold hover:underline cursor-pointer">BOOK DROP →</span>
  </div>
</nav>`,
  },
  {
    id: "nav-index-numbers",
    category: "navs",
    name: "Index Ledger Numbers Nav",
    styleTag: "Architectural",
    description: "Architectural numbering system for structured studio workflow: 01 Sets, 02 Time, 03 Vipps.",
    component: NavIndexNumbers,
    codeSnippet: `<nav className="w-full py-4 px-6 bg-card border border-card-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
  <div className="font-bold text-foreground tracking-tight">[ STUDIO PROTOCOL ]</div>
  <div className="flex items-center gap-6 text-muted">
    <span className="hover:text-foreground cursor-pointer"><strong className="text-foreground">01</strong> / SETS</span>
    <span className="hover:text-foreground cursor-pointer"><strong className="text-foreground">02</strong> / TIME</span>
  </div>
</nav>`,
  },
  {
    id: "nav-folder-tabs",
    category: "navs",
    name: "Industrial Folder Tab Bar",
    styleTag: "Utility",
    description: "Physical project file folder tabs with sharp corner notches and document identifiers.",
    component: NavFolderTabs,
    codeSnippet: `<div className="w-full bg-card border-b border-card-border pt-2 px-4 flex items-end gap-1 font-mono text-xs">
  {tabs.map((t) => (
    <button key={t} className="px-4 py-2 border-t border-x border-card-border bg-card text-foreground font-bold">
      {t}
    </button>
  ))}
</div>`,
  },

  // -------------------------------------------------------------
  // HEADERS / HEROES (14 items)
  // -------------------------------------------------------------
  {
    id: "hero-big-ink",
    category: "heroes",
    name: "The Big Ink Typographic Scale",
    styleTag: "Brutalist",
    description: "Dominant uppercase display typography without hero images, driven by high-contrast ink and facts.",
    component: HeroBigInk,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-6 sm:p-10">
  <div className="flex items-center justify-between text-xs font-mono text-muted mb-6">
    <span>[ DISPATCH 2026 ]</span><span>OSLO, NORWAY</span>
  </div>
  <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tighter leading-none text-foreground">
    SOLO BUILDER.<br />ZERO FLUFF.<br /><span className="text-muted/60">LIVE IN 48H.</span>
  </h1>
  <button className="px-5 py-3 bg-foreground text-background font-mono text-xs font-bold uppercase">
    VIEW TIER 1 DROP →
  </button>
</div>`,
  },
  {
    id: "hero-split-screen",
    category: "heroes",
    name: "Editorial 50/50 Split Screen",
    styleTag: "Editorial",
    description: "Two-column balanced layout with studio manifesto on left and full-height photography on right.",
    component: HeroSplitScreen,
    codeSnippet: `<div className="w-full bg-card border border-card-border grid grid-cols-1 md:grid-cols-2">
  <div className="p-6 sm:p-8 flex flex-col justify-between border-r border-card-border">
    <h2 className="font-serif text-2xl sm:text-4xl text-foreground">Nail architecture tailored to your natural silhouette.</h2>
    <button className="px-4 py-2.5 bg-foreground text-background font-mono text-xs font-bold uppercase">Reserve Set</button>
  </div>
  <div className="relative h-64 md:h-auto overflow-hidden">
    <Image src="/demo/nails/nail-1.jpg" alt="Studio Klø Nails" fill className="object-cover" />
  </div>
</div>`,
  },
  {
    id: "hero-portrait-vignette",
    category: "heroes",
    name: "Floating Portrait Vignette",
    styleTag: "Luxury",
    description: "Centered couture bakery statement with framed 4:5 vertical specimen and order prompt.",
    component: HeroPortraitVignette,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-6 sm:p-10 text-center">
  <h2 className="font-serif italic text-2xl sm:text-4xl text-foreground mb-6">Couture celebration cakes baked in Grünerløkka.</h2>
  <div className="relative mx-auto w-44 h-56 border border-card-border overflow-hidden">
    <Image src="/demo/cakes/cake-1.jpg" alt="Cake" fill className="object-cover" />
  </div>
</div>`,
  },
  {
    id: "hero-newspaper-broadside",
    category: "heroes",
    name: "Newspaper 3-Column Broadside",
    styleTag: "Editorial",
    description: "Classic publication layout: Problem dispatch, package solution, and live metrics ledger.",
    component: HeroNewspaperBroadside,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-5 sm:p-6 font-mono text-xs">
  <div className="border-b-2 border-foreground pb-2 mb-4 flex justify-between font-bold">
    <span>THE CREATIVE COURIER</span><span>PRICE: ZERO MONTHLY FEES</span>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-x divide-card-border">
    <div>§ 01. The Problem: "DM for price" drives clients away.</div>
    <div>§ 02. The Solution: The Booking Drop (2,000 kr flat).</div>
    <div>§ 03. Live Metrics: 94% conversion rate.</div>
  </div>
</div>`,
  },
  {
    id: "hero-cinematic-cover",
    category: "heroes",
    name: "Cinematic Lookbook Cover",
    styleTag: "Luxury",
    description: "Full-bleed atmospheric photography with sharp typography overlay and badge counter.",
    component: HeroCinematicCover,
    codeSnippet: `<div className="relative w-full h-80 sm:h-96 border border-card-border overflow-hidden bg-black flex flex-col justify-between p-6">
  <Image src="/demo/wedding/wedding-1.jpg" alt="Wedding" fill className="object-cover opacity-60" />
  <div className="relative z-10">
    <h2 className="font-serif italic text-3xl sm:text-5xl text-white">Documentary intimacy in raw light.</h2>
  </div>
</div>`,
  },
  {
    id: "hero-brutalist-wireframe",
    category: "heroes",
    name: "Brutalist Wireframe Blueprint",
    styleTag: "Brutalist",
    description: "Visible grid coordinates, crosshair corner markers, and transparent pricing specs.",
    component: HeroBrutalistWireframe,
    codeSnippet: `<div className="w-full bg-card border-2 border-foreground p-5 font-mono text-xs relative">
  <div className="absolute top-2 left-2">+</div><div className="absolute top-2 right-2">+</div>
  <h2 className="font-heading font-black text-2xl uppercase text-foreground">CUSTOM WEBSITES FOR CREATIVE STUDIOS WITHOUT SAAS SUBSCRIPTIONS.</h2>
</div>`,
  },
  {
    id: "hero-sequential-ledger",
    category: "heroes",
    name: "Sequential 01-02-03 Value Ledger",
    styleTag: "Minimal",
    description: "Step-by-step breakdown illustrating how simple the booking experience is for clients.",
    component: HeroSequentialLedger,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-6 font-mono">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-x divide-card-border">
    <div>01 / Pick Set</div><div>02 / Choose Slot</div><div>03 / Instant Vipps</div>
  </div>
</div>`,
  },
  {
    id: "hero-product-focus",
    category: "heroes",
    name: "Product / Service Focus Halo",
    styleTag: "Minimal",
    description: "Showcases a single flagship treatment with micro specifications and instant booking button.",
    component: HeroProductFocus,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-6 flex flex-col sm:flex-row items-center gap-6">
  <div className="relative w-36 h-36 border border-card-border">
    <Image src="/demo/nails/nail-2.jpg" alt="BIAB" fill className="object-cover" />
  </div>
  <div>
    <h3 className="font-heading font-black text-xl text-foreground">Structured BIAB Gel Overlay with Diamond French</h3>
    <button className="mt-4 px-4 py-2 border border-foreground text-xs font-mono font-bold">BOOK THIS EXACT SET →</button>
  </div>
</div>`,
  },
  {
    id: "hero-asymmetric-bleed",
    category: "heroes",
    name: "Asymmetric Bleed Layout",
    styleTag: "Editorial",
    description: "Bold title pushed far left while imagery bleeds seamlessly to the right boundary.",
    component: HeroAsymmetricBleed,
    codeSnippet: `<div className="w-full bg-card border border-card-border overflow-hidden flex flex-col md:flex-row">
  <div className="p-6 md:p-8 md:w-3/5">
    <h2 className="font-serif text-3xl text-foreground">Clean digital spaces for brands with high standards.</h2>
  </div>
  <div className="md:w-2/5 relative h-48 bg-muted/20">
    <Image src="/demo/cakes/cake-2.jpg" alt="Cake" fill className="object-cover" />
  </div>
</div>`,
  },
  {
    id: "hero-single-input",
    category: "heroes",
    name: "Direct Lead Capture Single-Input Hero",
    styleTag: "Utility",
    description: "High-converting lead form: Enter your @handle to receive a custom booking preview within 24h.",
    component: HeroSingleInput,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-6 sm:p-8 font-mono">
  <h2 className="font-heading font-black text-xl text-foreground">Drop your @handle. I’ll draft your mobile booking layout.</h2>
  <form className="flex gap-2 max-w-md mt-4">
    <input type="text" placeholder="@yourstudio" className="flex-1 p-2.5 border border-card-border" />
    <button type="submit" className="px-5 py-2.5 bg-foreground text-background font-bold text-xs uppercase">Send Mockup</button>
  </form>
</div>`,
  },
  {
    id: "hero-quad-masonry",
    category: "heroes",
    name: "Quad Masonry Mini-Collage Hero",
    styleTag: "Editorial",
    description: "Pairs value proposition with a tight 2x2 micro-gallery representing 4 diverse client disciplines.",
    component: HeroQuadMasonry,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
  <h2 className="font-heading font-black text-2xl text-foreground uppercase">Real client sites built for Oslo creators.</h2>
  <div className="grid grid-cols-2 gap-2 h-56">
    <div className="relative border border-card-border"><Image src="/demo/nails/nail-3.jpg" fill className="object-cover" alt="1" /></div>
    <div className="relative border border-card-border"><Image src="/demo/cakes/cake-3.jpg" fill className="object-cover" alt="2" /></div>
  </div>
</div>`,
  },
  {
    id: "hero-studio-dossier",
    category: "heroes",
    name: "Monospace Studio Dossier",
    styleTag: "Monospace",
    description: "Authentic studio intake specs: Oslo coordinates, 48h turnaround, and flat 2,000 kr rate.",
    component: HeroStudioDossier,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
  <div className="border-b border-card-border pb-3 flex justify-between">
    <span>DOSSIER // AG-2026-OSL</span><span>STATUS: AVAILABLE</span>
  </div>
  <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
    <div>BUILD SPEED: 48H — 1 WEEK</div><div>RATE: 2,000 KR FLAT</div>
  </div>
</div>`,
  },
  {
    id: "hero-business-card",
    category: "heroes",
    name: "Minimal Studio Business Card Header",
    styleTag: "Minimal",
    description: "Simulates a crisp, physical luxury business card set against a warm paper background.",
    component: HeroBusinessCard,
    codeSnippet: `<div className="w-full p-4 flex justify-center bg-muted/5 border border-card-border">
  <div className="w-full max-w-md bg-card border-2 border-foreground p-6 font-mono text-xs">
    <h3 className="font-heading font-black text-xl text-foreground">A.GURE</h3>
    <p>Oslo, Norway · hello@agure.space</p>
    <div className="mt-4 pt-4 border-t border-card-border flex justify-between">
      <span>TIER 1 BOOKING DROP</span><span className="font-bold">2,000 KR ONE-TIME</span>
    </div>
  </div>
</div>`,
  },
  {
    id: "hero-kinetic-headline",
    category: "heroes",
    name: "High-Fashion Kinetic Headline",
    styleTag: "Kinetic",
    description: "Expressive counterpoint combining sculptural italic serif with razor-sharp architectural sans.",
    component: HeroKineticHeadline,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-6 sm:p-10 text-center">
  <h1 className="text-3xl sm:text-5xl text-foreground leading-tight">
    <span className="font-serif italic font-normal">Sculptural digital form</span><br />
    <span className="font-heading font-black uppercase tracking-tighter">Engineered for conversion.</span>
  </h1>
</div>`,
  },

  // -------------------------------------------------------------
  // TITLES & SECTION OPENERS (12 items)
  // -------------------------------------------------------------
  {
    id: "title-serif-grotesk",
    category: "titles",
    name: "Serif & Grotesk Counterpoint",
    styleTag: "Editorial",
    description: "Harmonious balance between flowing editorial serif and strict geometric uppercase sans.",
    component: TitleSerifGrotesk,
    codeSnippet: `<h2 className="text-2xl sm:text-4xl text-foreground leading-tight">
  <span className="font-serif italic font-normal">Modern treatments</span>{" "}
  <span className="font-heading font-black uppercase tracking-tight">Built with precision.</span>
</h2>`,
  },
  {
    id: "title-mono-index",
    category: "titles",
    name: "Monospace Index Lead",
    styleTag: "Monospace",
    description: "System index tag [ 02 // LEDGER ] with a thin horizontal rule spanning the section width.",
    component: TitleMonoIndex,
    codeSnippet: `<div className="flex items-center gap-3 text-xs text-muted mb-3 font-mono">
  <span className="text-foreground font-bold">[ 02 // LEDGER ]</span>
  <div className="h-px flex-1 bg-card-border" />
  <span className="text-[10px]">ALL PRICES IN NOK</span>
</div>`,
  },
  {
    id: "title-heavy-rule",
    category: "titles",
    name: "Heavy Architectural Sans with Hairline Rule",
    styleTag: "Architectural",
    description: "36px uppercase sans headline underlined by a solid 2px ink divider with client count specs.",
    component: TitleHeavyRule,
    codeSnippet: `<div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b-2 border-foreground">
  <h2 className="font-heading font-black text-3xl uppercase tracking-tighter text-foreground">PORTFOLIO ARCHIVE</h2>
  <span className="text-xs font-mono text-muted uppercase">2024 — 2026 RELEASES</span>
</div>`,
  },
  {
    id: "title-ghost-contrast",
    category: "titles",
    name: "Ghost Contrast (Ink + Whisper Grey)",
    styleTag: "Minimal",
    description: "High typographic hierarchy using solid black ink for the core point and 30% ghost grey for subtitle.",
    component: TitleGhostContrast,
    codeSnippet: `<h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight leading-tight">
  <span className="text-foreground">CLEAN LOOKBOOK.</span><br />
  <span className="text-muted/30">ZERO COMPLICATIONS.</span>
</h2>`,
  },
  {
    id: "title-drop-cap",
    category: "titles",
    name: "Drop-Cap Editorial Manifesto",
    styleTag: "Editorial",
    description: "Classic print publication style featuring a massive drop-capital letter opening the statement.",
    component: TitleDropCap,
    codeSnippet: `<div className="flex gap-4 items-start font-serif">
  <span className="font-heading font-black text-5xl text-foreground leading-none">T</span>
  <p className="text-sm text-foreground leading-relaxed pt-1">he modern studio booking link should look like a luxury fashion editorial...</p>
</div>`,
  },
  {
    id: "title-super-tracked",
    category: "titles",
    name: "Super-Tracked All-Caps Luxury Spacing",
    styleTag: "Luxury",
    description: "Extreme letter tracking (0.35em) with centered divider rule for high-end exhibition galleries.",
    component: TitleSuperTracked,
    codeSnippet: `<h2 className="font-serif text-lg sm:text-2xl text-foreground uppercase tracking-[0.35em] font-light text-center">
  S P E C I M E N   G A L L E R Y
</h2>`,
  },
  {
    id: "title-ink-block",
    category: "titles",
    name: "Highlight Ink Block Marker",
    styleTag: "Brutalist",
    description: "Solid high-contrast black tag pill marking tier and pricing details immediately.",
    component: TitleInkBlock,
    codeSnippet: `<div className="flex flex-wrap items-center gap-3">
  <span className="px-3 py-1 bg-foreground text-background font-mono text-xs font-bold uppercase">TIER 1 DROP</span>
  <h3 className="font-heading font-bold text-xl uppercase text-foreground">THE 1-PAGE MOBILE SITE</h3>
</div>`,
  },
  {
    id: "title-hanging-indent",
    category: "titles",
    name: "Hanging Indent Section Header",
    styleTag: "Editorial",
    description: "Section numeral hangs gracefully in the left margin, evoking classical Swiss typesetting.",
    component: TitleHangingIndent,
    codeSnippet: `<div className="flex gap-4 font-mono">
  <span className="text-sm font-bold text-muted select-none">§04</span>
  <div><h3 className="font-heading font-bold text-xl uppercase text-foreground">FREQUENT QUESTIONS & POLICIES</h3></div>
</div>`,
  },
  {
    id: "title-inline-token",
    category: "titles",
    name: "Inline Visual Token (Thumbnail in Title)",
    styleTag: "Kinetic",
    description: "Embeds a real photographic thumbnail directly inside the flow of headline text.",
    component: TitleInlineToken,
    codeSnippet: `<h2 className="font-heading font-black text-xl uppercase tracking-tight text-foreground flex items-center gap-2">
  <span>FEATURED</span>
  <span className="relative w-12 h-6 border border-card-border overflow-hidden inline-block"><Image src="/demo/nails/nail-5.jpg" fill alt="" /></span>
  <span>TREATMENTS</span>
</h2>`,
  },
  {
    id: "title-split-ledger",
    category: "titles",
    name: "Split Number & Topic Ledger",
    styleTag: "Architectural",
    description: "Clean tabular row splitting numeral, section title, description, and status indicator.",
    component: TitleSplitLedger,
    codeSnippet: `<div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center font-mono text-xs">
  <div className="text-2xl font-bold font-heading text-foreground">№ 03</div>
  <div className="sm:col-span-2 font-bold uppercase text-foreground">APPOINTMENT SCHEDULING</div>
</div>`,
  },
  {
    id: "title-bracket-enclosure",
    category: "titles",
    name: "Minimalist Bracket Enclosure",
    styleTag: "Minimal",
    description: "Geometric brackets [ TITLE ] framing clean monospace subtitle and studio address.",
    component: TitleBracketEnclosure,
    codeSnippet: `<div className="inline-flex items-center gap-2 text-foreground font-bold tracking-widest uppercase font-mono">
  <span className="text-muted">[</span><span>THE STUDIO SPECIFICATION</span><span className="text-muted">]</span>
</div>`,
  },
  {
    id: "title-vertical-spine",
    category: "titles",
    name: "Rotated Vertical Accent Spine",
    styleTag: "Architectural",
    description: "90-degree rotated category tag on the left edge paired with a high-contrast headline.",
    component: TitleVerticalSpine,
    codeSnippet: `<div className="flex gap-5 items-stretch">
  <span className="font-mono text-[9px] uppercase tracking-widest text-muted -rotate-90">CATEGORY // 08</span>
  <h3 className="font-heading font-black text-2xl uppercase text-foreground">LOOKBOOK CATALOGUE</h3>
</div>`,
  },

  // -------------------------------------------------------------
  // MAIN IMAGES & GALLERIES (12 items)
  // -------------------------------------------------------------
  {
    id: "gallery-filmstrip",
    category: "galleries",
    name: "Horizontal Filmstrip Carousel",
    styleTag: "Minimal",
    description: "Slide-based specimen filmstrip with previous/next controls, index counter, and price overlay.",
    component: GalleryFilmstrip,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-5">
  <div className="flex justify-between mb-3 font-mono text-xs">
    <span>FILMSTRIP 01 / 04</span><div className="flex gap-1"><button>◀</button><button>▶</button></div>
  </div>
  <div className="relative h-60 w-full overflow-hidden"><Image src="/demo/nails/nail-1.jpg" fill alt="" /></div>
</div>`,
  },
  {
    id: "gallery-editorial-duo",
    category: "galleries",
    name: "Asymmetrical Editorial Duo",
    styleTag: "Editorial",
    description: "Primary widescreen photograph paired with secondary macro texture specimen and analogue notes.",
    component: GalleryEditorialDuo,
    codeSnippet: `<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <div className="sm:col-span-2 relative h-64 border border-card-border overflow-hidden"><Image src="/demo/wedding/wedding-1.jpg" fill alt="" /></div>
  <div className="relative h-36 border border-card-border overflow-hidden"><Image src="/demo/wedding/wedding-2.jpg" fill alt="" /></div>
</div>`,
  },
  {
    id: "gallery-masonry-trio",
    category: "galleries",
    name: "Tight Masonry Trio",
    styleTag: "Minimal",
    description: "Three offset vertical columns with staggered heights, crisp outlines, and specimen tags.",
    component: GalleryMasonryTrio,
    codeSnippet: `<div className="grid grid-cols-3 gap-2">
  <div className="relative h-56 border border-card-border overflow-hidden"><Image src="/demo/cakes/cake-1.jpg" fill alt="" /></div>
  <div className="relative h-44 mt-6 border border-card-border overflow-hidden"><Image src="/demo/cakes/cake-2.jpg" fill alt="" /></div>
  <div className="relative h-52 border border-card-border overflow-hidden"><Image src="/demo/cakes/cake-3.jpg" fill alt="" /></div>
</div>`,
  },
  {
    id: "gallery-polaroid-specimen",
    category: "galleries",
    name: "Polaroid / Exhibition Specimen Cards",
    styleTag: "Editorial",
    description: "Physical photographic cards with white borders, date stamps, and set titles.",
    component: GalleryPolaroidSpecimen,
    codeSnippet: `<div className="w-48 bg-card border border-card-border p-3 shadow-sm">
  <div className="relative h-40 border border-card-border overflow-hidden"><Image src="/demo/nails/nail-2.jpg" fill alt="" /></div>
  <div className="mt-3 font-mono text-[10px] font-bold text-foreground uppercase">Set #041 · French Chrome</div>
</div>`,
  },
  {
    id: "gallery-vertical-stacker",
    category: "galleries",
    name: "Full-Bleed Vertical Scroll Stacker",
    styleTag: "Architectural",
    description: "Scrollable column of widescreen images with pinned numeral markers (01 Ceremony, 02 Reception).",
    component: GalleryVerticalStacker,
    codeSnippet: `<div className="space-y-4 max-h-72 overflow-y-auto">
  <div className="relative h-44 border border-card-border"><Image src="/demo/wedding/wedding-3.jpg" fill alt="" /></div>
  <div className="relative h-44 border border-card-border"><Image src="/demo/wedding/wedding-4.jpg" fill alt="" /></div>
</div>`,
  },
  {
    id: "gallery-hover-zoom",
    category: "galleries",
    name: "Interactive Hover Zoom & Detail Preview",
    styleTag: "Kinetic",
    description: "Smooth 110% zoom with bottom treatment metadata slide-up and price badge on mouseover.",
    component: GalleryHoverZoom,
    codeSnippet: `<div className="relative h-52 border border-card-border overflow-hidden group cursor-pointer">
  <Image src="/demo/nails/nail-5.jpg" fill className="object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
  <div className="absolute bottom-3 inset-x-3 text-white font-mono text-xs flex justify-between">
    <span>Almond Sculpt</span><span className="bg-white text-black font-bold px-2 py-0.5">800 kr</span>
  </div>
</div>`,
  },
  {
    id: "gallery-six-grid",
    category: "galleries",
    name: "Minimal 6-Grid Lookbook with Badges",
    styleTag: "Minimal",
    description: "Compact 2x3 or 6-across thumbnail matrix with category tags (FRENCH, CHROME, BIAB, AURA).",
    component: GallerySixGrid,
    codeSnippet: `<div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
  {grid.map((g) => (
    <div key={g.tag} className="relative aspect-square border border-card-border overflow-hidden">
      <Image src={g.src} fill alt="" />
      <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-card/90 text-[8px] font-mono font-bold">{g.tag}</span>
    </div>
  ))}
</div>`,
  },
  {
    id: "gallery-offset-stack",
    category: "galleries",
    name: "Offset Overlap Layering (Photo Stack)",
    styleTag: "Editorial",
    description: "Two tilted photographs overlapping each other with natural shadows, mimicking prints on a studio table.",
    component: GalleryOffsetStack,
    codeSnippet: `<div className="relative w-44 h-48 border border-card-border -rotate-6 z-0 overflow-hidden"><Image src="/demo/cakes/cake-4.jpg" fill alt="" /></div>
<div className="relative w-48 h-52 border-2 border-foreground rotate-3 -ml-12 z-10 overflow-hidden"><Image src="/demo/cakes/cake-5.jpg" fill alt="" /></div>`,
  },
  {
    id: "gallery-before-after",
    category: "galleries",
    name: "Before / After Split Slider Layout",
    styleTag: "Utility",
    description: "Interactive toggle comparing natural bare nail beds with apex-balanced structured BIAB gel.",
    component: GalleryBeforeAfter,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
  <div className="flex justify-between mb-3"><button onClick={() => setShowAfter(false)}>BEFORE</button><button onClick={() => setShowAfter(true)}>AFTER</button></div>
  <div className="relative h-56 border border-card-border overflow-hidden"><Image src={showAfter ? "/demo/nails/nail-1.jpg" : "/demo/nails/nail-4.jpg"} fill alt="" /></div>
</div>`,
  },
  {
    id: "gallery-blueprint-reveal",
    category: "galleries",
    name: "Blueprint Greyscale to Color Reveal",
    styleTag: "Brutalist",
    description: "Photographs display in stark monochrome greyscale until hovered, revealing rich natural light.",
    component: GalleryBlueprintReveal,
    codeSnippet: `<div className="relative h-48 border border-card-border overflow-hidden group">
  <Image src="/demo/wedding/wedding-5.jpg" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
</div>`,
  },
  {
    id: "gallery-circular-framing",
    category: "galleries",
    name: "Circular Architectural Framing",
    styleTag: "Luxury",
    description: "Arch-topped geometric picture frames reminiscent of classical Scandinavian studio doorways.",
    component: GalleryCircularFraming,
    codeSnippet: `<div className="relative w-28 h-36 rounded-t-full border border-card-border overflow-hidden mx-auto shadow-sm">
  <Image src="/demo/cakes/cake-6.jpg" fill className="object-cover" alt="" />
</div>`,
  },
  {
    id: "gallery-focus-trio",
    category: "galleries",
    name: "1-Large + 2-Small Focus Gallery",
    styleTag: "Editorial",
    description: "60/40 layout featuring a dominant showcase photo flanked by two compact detail thumbnails.",
    component: GalleryFocusTrio,
    codeSnippet: `<div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
  <div className="sm:col-span-3 relative h-56 border border-card-border overflow-hidden"><Image src="/demo/nails/nail-2.jpg" fill alt="" /></div>
  <div className="sm:col-span-2 flex flex-col gap-3">
    <div className="relative h-[106px] border border-card-border overflow-hidden"><Image src="/demo/nails/nail-3.jpg" fill alt="" /></div>
    <div className="relative h-[106px] border border-card-border overflow-hidden"><Image src="/demo/nails/nail-4.jpg" fill alt="" /></div>
  </div>
</div>`,
  },

  // -------------------------------------------------------------
  // DROPDOWNS & ACCORDIONS (12 items)
  // -------------------------------------------------------------
  {
    id: "accordion-hairline-rule",
    category: "dropdowns",
    name: "Minimal Hairline Rule Accordion",
    styleTag: "Minimal",
    description: "Hairline dividers, pure typography, and smooth +/- character morph without bulky backgrounds.",
    component: AccordionHairlineRule,
    codeSnippet: `<div className="divide-y divide-card-border font-mono text-xs">
  {items.map((item) => (
    <div key={item.q} className="py-3">
      <button className="w-full flex justify-between font-bold"><span>{item.q}</span><span>+</span></button>
      <p className="text-muted text-[11px] pt-2">{item.a}</p>
    </div>
  ))}
</div>`,
  },
  {
    id: "accordion-brutalist-cell",
    category: "dropdowns",
    name: "Boxed Brutalist Cell Accordion",
    styleTag: "Brutalist",
    description: "Thick solid border containers with inverted solid headers and sharp [OPEN]/[CLOSE] state badges.",
    component: AccordionBrutalistCell,
    codeSnippet: `<div className="border border-foreground">
  <button className="w-full p-3 flex justify-between font-bold bg-foreground text-background">
    <span>WHAT HAPPENS IF I AM LATE?</span><span>[CLOSE]</span>
  </button>
  <div className="p-3 bg-card text-foreground text-[11px] border-t border-foreground">Grace period is 15 minutes...</div>
</div>`,
  },
  {
    id: "accordion-numbered-dossier",
    category: "dropdowns",
    name: "Numbered Dossier Accordion",
    styleTag: "Monospace",
    description: "Indexed accordion list (01 Intake, 02 Vipps Confirmation) with clean collapse buttons.",
    component: AccordionNumberedDossier,
    codeSnippet: `<div className="border-b border-card-border pb-3 font-mono text-xs">
  <div className="flex items-center gap-3">
    <span className="font-bold text-foreground text-sm">01</span>
    <span className="font-bold text-foreground flex-1 uppercase">INTAKE & HEALTH CHECK</span>
  </div>
</div>`,
  },
  {
    id: "accordion-side-by-side",
    category: "dropdowns",
    name: "Side-by-Side 2-Column Ledger",
    styleTag: "Architectural",
    description: "Select question topics on the left column, view instantaneous answers in the right reading pane.",
    component: AccordionSideBySide,
    codeSnippet: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
  <div className="space-y-1.5 border-r border-card-border pr-4">
    {entries.map((e) => (<button key={e.title} className="w-full text-left p-2">{e.title}</button>))}
  </div>
  <div className="p-2"><p className="text-muted text-[11px]">{entries[selected].text}</p></div>
</div>`,
  },
  {
    id: "accordion-plus-minus",
    category: "dropdowns",
    name: "Plus / Minus Minimalist Switcher",
    styleTag: "Minimal",
    description: "Boxed + and - toggle controls with clean answer reveal for retention guarantees.",
    component: AccordionPlusMinus,
    codeSnippet: `<div className="flex justify-between items-center cursor-pointer font-mono text-xs">
  <span className="font-bold text-foreground uppercase">ARE RETENTIONS GUARANTEED?</span>
  <span className="w-6 h-6 flex items-center justify-center border border-card-border">+</span>
</div>`,
  },
  {
    id: "accordion-floating-cards",
    category: "dropdowns",
    name: "Floating Card Separator Accordion",
    styleTag: "Minimal",
    description: "Isolated card containers with subtle drop shadow and rotating chevron indicators.",
    component: AccordionFloatingCards,
    codeSnippet: `<div className="bg-card border border-card-border p-3 shadow-sm font-mono text-xs">
  <div className="flex justify-between items-center cursor-pointer font-bold text-foreground">
    <span>Can I bring inspiration photos?</span><FiChevronDown />
  </div>
</div>`,
  },
  {
    id: "accordion-service-price",
    category: "dropdowns",
    name: "Service Item with Price & Expandable Specs",
    styleTag: "Editorial",
    description: "Combines treatment menu pricing (750 kr) with an expandable checklist of inclusions.",
    component: AccordionServicePrice,
    codeSnippet: `<div className="flex items-center justify-between cursor-pointer py-1 font-mono text-xs">
  <div><span className="font-bold text-foreground block">STRUCTURED BIAB GEL</span></div>
  <div><span className="font-bold text-foreground text-sm">750 KR</span></div>
</div>`,
  },
  {
    id: "accordion-tab-pills",
    category: "dropdowns",
    name: "Horizontal Filter Dropdown / Tab Pill Bar",
    styleTag: "Utility",
    description: "Switch between studio policies, appointment preparation, and deposit details effortlessly.",
    component: AccordionTabPills,
    codeSnippet: `<div className="flex gap-2 border-b border-card-border pb-3 mb-3 font-mono text-xs">
  {["policies", "prep", "deposits"].map((tab) => (
    <button key={tab} className="px-3 py-1 uppercase text-[10px] font-bold">{tab}</button>
  ))}
</div>`,
  },
  {
    id: "accordion-code-inspector",
    category: "dropdowns",
    name: "Monospace Code-Block Inspector Dropdown",
    styleTag: "Monospace",
    description: "Terminal query simulator that expands to output pure JSON data of pricing deliverables.",
    component: AccordionCodeInspector,
    codeSnippet: `<div className="p-2 border border-card-border bg-muted/10 font-mono text-xs flex justify-between">
  <span>&gt; query: package_specs.json</span><span>EXECUTE</span>
</div>`,
  },
  {
    id: "accordion-chevron-snap",
    category: "dropdowns",
    name: "Luxury Atelier Micro-FAQ (Chevron Snap)",
    styleTag: "Luxury",
    description: "Serif question text paired with an animated 180-degree snapping chevron arrow.",
    component: AccordionChevronSnap,
    codeSnippet: `<div className="flex justify-between items-center cursor-pointer">
  <span className="font-serif italic text-base text-foreground">Do you take custom bespoke commissions?</span>
  <FiChevronDown className="rotate-180 transition-transform" />
</div>`,
  },
  {
    id: "accordion-nested-drilldown",
    category: "dropdowns",
    name: "Multi-Tier Sub-Item Drilldown",
    styleTag: "Utility",
    description: "Parent category unfolds to reveal interactive sub-treatment add-ons with dynamic checkboxes.",
    component: AccordionNestedDrilldown,
    codeSnippet: `<div className="space-y-2 mt-3 font-mono text-xs">
  {["Chrome French (+100 kr)", "3D Gel Droplets (+150 kr)"].map((sub) => (
    <div key={sub} className="p-2 border flex justify-between"><span>{sub}</span><span>+ ADD</span></div>
  ))}
</div>`,
  },
  {
    id: "accordion-borderless-ghost",
    category: "dropdowns",
    name: "Borderless Ghost Expandable",
    styleTag: "Minimal",
    description: "Zero external border lines; uses dot pulse and generous whitespace breathing room.",
    component: AccordionBorderlessGhost,
    codeSnippet: `<div className="flex items-center gap-3 cursor-pointer">
  <span className="w-2 h-2 rounded-full bg-foreground" />
  <span className="font-heading font-black text-sm uppercase text-foreground">WHAT IF I NEED CHANGES AFTER DELIVERY?</span>
</div>`,
  },

  // -------------------------------------------------------------
  // BOOKING & CTA MODULES (10 items)
  // -------------------------------------------------------------
  {
    id: "booking-date-strip",
    category: "booking",
    name: "1-Tap Calendar Date Pill Strip",
    styleTag: "Minimal",
    description: "Horizontal date selector showing day, date number, and slot count with instant active highlight.",
    component: BookingDateStrip,
    codeSnippet: `<div className="grid grid-cols-5 gap-2 font-mono text-xs">
  {dates.map((d) => (
    <button key={d.date} className="p-2 border text-center bg-foreground text-background font-bold">
      <div>{d.day}</div><div className="text-base font-bold">{d.date}</div>
    </button>
  ))}
</div>`,
  },
  {
    id: "booking-time-matrix",
    category: "booking",
    name: "Minimalist Time Slot Matrix",
    styleTag: "Utility",
    description: "Structured grid of appointment times with unavailable slots crossed out and clear active states.",
    component: BookingTimeMatrix,
    codeSnippet: `<div className="grid grid-cols-3 sm:grid-cols-6 gap-2 font-mono text-xs">
  {times.map((t) => (
    <button key={t.time} className="py-2 text-center border text-xs border-foreground bg-foreground text-background font-bold">{t.time}</button>
  ))}
</div>`,
  },
  {
    id: "booking-boarding-pass",
    category: "booking",
    name: "Digital Boarding Pass / Ticket Slip",
    styleTag: "Editorial",
    description: "Ticket voucher aesthetic with perforated dashed lines, booking confirmation badge, and pass ID.",
    component: BookingBoardingPass,
    codeSnippet: `<div className="border-2 border-foreground p-5 font-mono text-xs">
  <div className="flex justify-between border-b border-dashed border-card-border pb-4">
    <span className="font-heading font-black text-lg text-foreground">STUDIO KLØ OSLO</span>
    <span className="bg-emerald-500/10 text-emerald-600 px-2 py-1 font-bold">CONFIRMED</span>
  </div>
  <div className="py-4 grid grid-cols-4 gap-4">
    <div>GUEST: SOFIA LIND</div><div>SLOT: SAT 27 · 12:30</div>
  </div>
</div>`,
  },
  {
    id: "booking-vipps-deposit",
    category: "booking",
    name: "Direct Vipps / Card Quick Deposit Box",
    styleTag: "Utility",
    description: "250 kr chair deposit calculator with 1-click Vipps checkout button (Norwegian standard).",
    component: BookingVippsDeposit,
    codeSnippet: `<div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
  <div className="flex justify-between items-center mb-4">
    <span>SECURE CHAIR RESERVATION</span><span className="font-heading font-black text-lg">250 KR</span>
  </div>
  <button className="w-full py-3 bg-[#ff5b24] text-white font-bold uppercase">PAY 250 KR DEPOSIT VIA VIPPS →</button>
</div>`,
  },
  {
    id: "booking-selector-chips",
    category: "booking",
    name: "Treatment Selector Chips",
    styleTag: "Minimal",
    description: "Multi-select formula chips for assembling custom treatment packages with live item counter.",
    component: BookingSelectorChips,
    codeSnippet: `<div className="flex flex-wrap gap-2 font-mono text-xs">
  {chips.map((chip) => (
    <button key={chip} className="px-3 py-1.5 border border-foreground bg-foreground text-background font-bold">{chip} ✓</button>
  ))}
</div>`,
  },
  {
    id: "booking-three-field",
    category: "booking",
    name: "Clean 3-Field Booking Slip",
    styleTag: "Minimal",
    description: "Direct input slip requiring only full name, Norwegian phone number, and one-tap confirm button.",
    component: BookingThreeField,
    codeSnippet: `<div className="space-y-3 font-mono text-xs">
  <input type="text" placeholder="e.g. Sofia Lind" className="w-full p-2.5 border border-card-border bg-transparent" />
  <input type="tel" placeholder="901 23 456" className="w-full p-2.5 border border-card-border bg-transparent" />
  <button className="w-full py-3 bg-foreground text-background font-bold uppercase">CONFIRM SLOT & PAY DEPOSIT</button>
</div>`,
  },
  {
    id: "booking-mobile-bottom-pill",
    category: "booking",
    name: "Floating Mobile Bottom Action Pill",
    styleTag: "Mobile-First",
    description: "Sticky mobile call-to-action displaying next available slot and instant booking trigger.",
    component: BookingMobileBottomPill,
    codeSnippet: `<div className="w-full max-w-md bg-card border border-card-border p-2.5 flex items-center justify-between shadow-lg font-mono text-xs">
  <div><span className="text-emerald-500 font-bold">SLOT OPEN: TOMORROW 14:00</span></div>
  <button className="px-4 py-2 bg-foreground text-background font-bold uppercase">BOOK NOW</button>
</div>`,
  },
  {
    id: "booking-mono-terminal",
    category: "booking",
    name: "Monospaced Booking Terminal",
    styleTag: "Monospace",
    description: "Simulated developer terminal interface with command execution and status signals.",
    component: BookingMonoTerminal,
    codeSnippet: `<div className="bg-neutral-950 text-neutral-100 border border-neutral-800 p-4 font-mono text-xs">
  <div>&gt; checking studio availability... [OK]</div>
  <div>&gt; slot confirmed: Friday 27 March 12:30 CET</div>
  <input type="text" value="reserve --service=biab" className="bg-transparent text-white" />
</div>`,
  },
  {
    id: "booking-intake-card",
    category: "booking",
    name: "Consultation Intake Questionnaire Card",
    styleTag: "Editorial",
    description: "Multi-step client questionnaire module for selecting nail shapes, lengths, or cake flavors.",
    component: BookingIntakeCard,
    codeSnippet: `<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
  {["Almond", "Square", "Coffin", "Natural Oval"].map((s) => (
    <button key={s} className="p-2 border border-foreground bg-foreground text-background font-bold">{s}</button>
  ))}
</div>`,
  },
  {
    id: "booking-insta-launcher",
    category: "booking",
    name: "Instagram Direct Booking Launcher",
    styleTag: "Utility",
    description: "Direct link-in-bio card showing exact mobile destination URL with 1-click copy action.",
    component: BookingInstaLauncher,
    codeSnippet: `<div className="p-3 bg-muted/10 border border-card-border flex justify-between items-center font-mono text-xs">
  <span className="text-foreground font-bold">agure.space/demo/nails</span>
  <button className="px-2.5 py-1 bg-foreground text-background text-[10px] font-bold uppercase">COPY LINK</button>
</div>`,
  },
];
