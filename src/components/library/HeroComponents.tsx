"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  FiArrowRight, 
  FiCheck, 
  FiClock, 
  FiCalendar, 
  FiMapPin, 
  FiCornerDownRight, 
  FiExternalLink 
} from "react-icons/fi";

// 01. The Big Ink (Pure Typographic Scale)
export function HeroBigInk() {
  return (
    <div className="w-full bg-card border border-card-border p-6 sm:p-10">
      <div className="flex items-center justify-between text-xs font-mono text-muted mb-6">
        <span>[ DISPATCH 2026 ]</span>
        <span>OSLO, NORWAY</span>
      </div>
      <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tighter leading-none text-foreground">
        SOLO BUILDER.<br />
        ZERO FLUFF.<br />
        <span className="text-muted/60">LIVE IN 48H.</span>
      </h1>
      <div className="mt-8 pt-6 border-t border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-mono text-muted max-w-sm leading-relaxed">
          I build high-end booking sites for independent creators and studios. Talk directly to me. No agency bloat.
        </p>
        <button className="px-5 py-3 bg-foreground text-background font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity self-start sm:self-auto">
          VIEW TIER 1 DROP →
        </button>
      </div>
    </div>
  );
}

// 02. Editorial 50/50 Split Screen
export function HeroSplitScreen() {
  return (
    <div className="w-full bg-card border border-card-border grid grid-cols-1 md:grid-cols-2">
      <div className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-card-border">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
            Atelier No. 04 · Oslo
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-foreground mt-3 leading-tight">
            Nail architecture tailored to your natural silhouette.
          </h2>
          <p className="text-xs font-mono text-muted mt-4 leading-relaxed">
            Specializing in structured BIAB gels and Japanese chrome micro-tips. By appointment only.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <button className="px-4 py-2.5 bg-foreground text-background font-mono text-xs font-bold uppercase">
            Reserve Set
          </button>
          <span className="text-xs font-mono text-muted">Starting from 750 kr</span>
        </div>
      </div>
      <div className="relative h-64 md:h-auto min-h-[220px] bg-muted/10 overflow-hidden">
        <Image
          src="/demo/nails/nail-1.jpg"
          alt="Studio Klø Nails"
          fill
          className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-card/90 backdrop-blur-sm text-[10px] font-mono border border-card-border">
          FIG 1.0 — FRENCH CHROME
        </div>
      </div>
    </div>
  );
}

// 03. Floating Portrait Vignette
export function HeroPortraitVignette() {
  return (
    <div className="w-full bg-card border border-card-border p-6 sm:p-10 text-center">
      <span className="text-xs font-mono uppercase tracking-widest text-muted">
        Independent Fine Bakery
      </span>
      <h2 className="font-serif italic text-2xl sm:text-4xl text-foreground mt-2 mb-6">
        Couture celebration cakes baked in Grünerløkka.
      </h2>
      <div className="relative mx-auto w-44 h-56 sm:w-52 sm:h-64 border border-card-border overflow-hidden shadow-sm">
        <Image
          src="/demo/cakes/cake-1.jpg"
          alt="Vintage Lambeth Cake"
          fill
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 py-1 bg-foreground/90 text-background text-[10px] font-mono uppercase tracking-wider">
          ORDER WEEKEND SLICE
        </div>
      </div>
      <p className="text-xs font-mono text-muted mt-5 max-w-xs mx-auto">
        Natural sourdough sponge, seasonal berry compote, custom piped script.
      </p>
    </div>
  );
}

// 04. Newspaper 3-Column Broadside
export function HeroNewspaperBroadside() {
  return (
    <div className="w-full bg-card border border-card-border p-5 sm:p-6 font-mono text-xs">
      <div className="border-b-2 border-foreground pb-2 mb-4 flex items-center justify-between text-[11px] font-bold">
        <span>THE CREATIVE COURIER</span>
        <span>VOL. XII // NO. 44</span>
        <span>PRICE: ZERO MONTHLY FEES</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-card-border pt-1">
        <div className="pr-0 sm:pr-4">
          <div className="text-[10px] text-muted uppercase font-bold mb-1">§ 01. The Problem</div>
          <p className="text-muted leading-relaxed text-[11px]">
            &quot;DM for price&quot; drives customers away. Clients want instant transparency, clear treatment menus, and 10-second Vipps checkout.
          </p>
        </div>
        <div className="pt-4 sm:pt-0 sm:px-4">
          <div className="text-[10px] text-foreground uppercase font-bold mb-1">§ 02. The Solution</div>
          <h3 className="font-heading font-black text-base text-foreground uppercase leading-tight mb-2">
            THE BOOKING DROP
          </h3>
          <p className="text-muted leading-relaxed text-[11px]">
            A custom 1-page mobile site built in 48 hours to 1 week. Flat 2,000 kr one-time.
          </p>
        </div>
        <div className="pt-4 sm:pt-0 sm:pl-4 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-muted uppercase font-bold mb-1">§ 03. Live Metrics</div>
            <div className="text-foreground font-bold text-lg">94%</div>
            <div className="text-[10px] text-muted">Client reservation completion rate.</div>
          </div>
          <button className="w-full mt-4 py-2 border border-foreground font-bold hover:bg-foreground hover:text-background transition-colors text-[11px]">
            INSPECT CASE STUDY →
          </button>
        </div>
      </div>
    </div>
  );
}

// 05. Cinematic Lookbook Cover
export function HeroCinematicCover() {
  return (
    <div className="relative w-full h-80 sm:h-96 border border-card-border overflow-hidden bg-black flex flex-col justify-between p-6">
      <Image
        src="/demo/wedding/wedding-1.jpg"
        alt="Editorial Wedding Collection"
        fill
        className="object-cover opacity-60 hover:opacity-75 transition-opacity duration-700"
      />
      <div className="relative z-10 flex items-center justify-between text-white/80 font-mono text-xs">
        <span className="tracking-widest uppercase">KONTRAST // 2026</span>
        <span>AUTUMN PORTFOLIO</span>
      </div>
      <div className="relative z-10">
        <span className="px-2 py-0.5 bg-white text-black font-mono text-[10px] uppercase font-bold tracking-wider">
          EXHIBITION
        </span>
        <h2 className="font-serif italic text-3xl sm:text-5xl text-white mt-2 leading-none">
          Documentary intimacy in raw light.
        </h2>
        <div className="mt-4 flex items-center gap-4">
          <button className="px-4 py-2 bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200">
            VIEW FULL SERIES
          </button>
          <span className="text-xs font-mono text-white/70">8 SLOTS REMAINING</span>
        </div>
      </div>
    </div>
  );
}

// 06. Brutalist Wireframe Blueprint
export function HeroBrutalistWireframe() {
  return (
    <div className="w-full bg-card border-2 border-foreground p-5 font-mono text-xs relative">
      <div className="absolute top-2 left-2 text-[10px] text-muted">+</div>
      <div className="absolute top-2 right-2 text-[10px] text-muted">+</div>
      <div className="absolute bottom-2 left-2 text-[10px] text-muted">+</div>
      <div className="absolute bottom-2 right-2 text-[10px] text-muted">+</div>

      <div className="border-b border-foreground pb-2 mb-4 flex items-center justify-between">
        <span className="bg-foreground text-background px-1.5 py-0.5 text-[10px] font-bold">
          SPEC_ID: HERO_V6
        </span>
        <span className="text-muted text-[10px]">W: 100% · H: AUTO</span>
      </div>
      <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground leading-tight">
        CUSTOM WEBSITES FOR CREATIVE STUDIOS WITHOUT SAAS SUBSCRIPTIONS.
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-dashed border-card-border pt-4 text-[11px]">
        <div>
          <span className="text-muted block text-[10px]">DELIVERY WINDOW:</span>
          <span className="font-bold text-foreground">48H — 1 WEEK</span>
        </div>
        <div>
          <span className="text-muted block text-[10px]">BASE RETAINER:</span>
          <span className="font-bold text-foreground">2,000 KR (ONE-TIME)</span>
        </div>
      </div>
    </div>
  );
}

// 07. Sequential 01-02-03 Value Ledger
export function HeroSequentialLedger() {
  const steps = [
    { num: "01", title: "Fill Questionnaire", desc: "Pick your layout, typography, services and photo lookbook in 5 minutes." },
    { num: "02", title: "Site Built In 48h", desc: "I code your site directly, connect your colors, and deploy to your custom domain." },
    { num: "03", title: "Direct Vipps Bookings", desc: "Your clients pick their slot and pay deposits directly without awkward DMs." },
  ];

  return (
    <div className="w-full bg-card border border-card-border p-6 font-mono">
      <div className="text-[10px] text-muted uppercase tracking-widest mb-4">
        SIMPLE 3-STEP PROCESS
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-card-border">
        {steps.map((s, i) => (
          <div key={s.num} className={i === 0 ? "pr-3" : "pt-4 md:pt-0 md:px-3"}>
            <span className="text-2xl font-bold font-heading text-foreground block mb-1">
              {s.num}
            </span>
            <h4 className="text-xs font-bold text-foreground uppercase mb-1">
              {s.title}
            </h4>
            <p className="text-[11px] text-muted leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 08. Product / Service Focus Halo
export function HeroProductFocus() {
  return (
    <div className="w-full bg-card border border-card-border p-6 flex flex-col sm:flex-row items-center gap-6">
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 border border-card-border bg-muted/5 flex items-center justify-center flex-shrink-0">
        <Image
          src="/demo/nails/nail-2.jpg"
          alt="Sculpted BIAB"
          fill
          className="object-cover p-2"
        />
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-foreground text-background text-[9px] font-mono font-bold">
          SIGNATURE
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1">
          <span>TREATMENT FOCUS</span>
          <span>·</span>
          <span className="text-foreground font-bold">750 KR</span>
        </div>
        <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground leading-snug">
          Structured BIAB Gel Overlay with Diamond French
        </h3>
        <p className="text-xs font-mono text-muted mt-2 leading-relaxed">
          Reinforces natural nail plates with high-apex architecture. Lasts 4+ weeks with zero chipping.
        </p>
        <button className="mt-4 px-4 py-2 border border-foreground text-xs font-mono font-bold hover:bg-foreground hover:text-background transition-colors">
          BOOK THIS EXACT SET →
        </button>
      </div>
    </div>
  );
}

// 09. Asymmetric Bleed Layout
export function HeroAsymmetricBleed() {
  return (
    <div className="w-full bg-card border border-card-border overflow-hidden flex flex-col md:flex-row">
      <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
        <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
          STUDIO DOSSIER 2026
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground mt-2 leading-tight">
          Clean digital spaces for brands with high standards.
        </h2>
        <p className="text-xs font-mono text-muted mt-3 max-w-md leading-relaxed">
          High-contrast Scandinavian layouts. No generic WordPress templates or endless monthly subscriptions.
        </p>
      </div>
      <div className="md:w-2/5 relative h-48 md:h-auto min-h-[180px] bg-muted/20">
        <Image
          src="/demo/cakes/cake-2.jpg"
          alt="Minimalist Cake Design"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

// 10. Direct Lead Capture Single-Input Hero
export function HeroSingleInput() {
  const [handle, setHandle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full bg-card border border-card-border p-6 sm:p-8 font-mono">
      <div className="inline-block px-2 py-0.5 border border-card-border text-[10px] text-muted uppercase mb-3">
        Instagram Link-in-Bio Upgrader
      </div>
      <h2 className="font-heading font-black text-xl sm:text-3xl uppercase text-foreground leading-tight">
        Drop your @handle. I’ll draft your mobile booking layout.
      </h2>
      <p className="text-xs text-muted mt-2 mb-6">
        No sales calls. I review your page and send a prototype mockup within 24 hours.
      </p>
      {submitted ? (
        <div className="p-3 bg-foreground text-background text-xs font-bold flex items-center gap-2">
          <FiCheck className="text-sm" />
          <span>Mockup queued for {handle}. Check your DMs shortly.</span>
        </div>
      ) : (
        <form 
          onSubmit={(e) => { e.preventDefault(); if (handle) setSubmitted(true); }}
          className="flex flex-col sm:flex-row gap-2 max-w-md"
        >
          <input
            type="text"
            placeholder="@yourstudio"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="flex-1 p-2.5 border border-card-border text-xs text-foreground bg-transparent focus:border-foreground outline-none"
            required
          />
          <button type="submit" className="px-5 py-2.5 bg-foreground text-background font-bold text-xs uppercase hover:opacity-90">
            Send Mockup
          </button>
        </form>
      )}
    </div>
  );
}

// 11. Quad Masonry Mini-Collage Hero
export function HeroQuadMasonry() {
  return (
    <div className="w-full bg-card border border-card-border p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
          PORTFOLIO ARCHIVE
        </span>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-foreground uppercase mt-2">
          Real client sites built for Oslo creators.
        </h2>
        <p className="text-xs font-mono text-muted mt-3 leading-relaxed">
          From nail technicians to independent cake studios. Every site is built custom, mobile-first, and lightning fast.
        </p>
        <div className="mt-5 flex gap-3 text-xs font-mono">
          <span className="px-2.5 py-1 border border-card-border">NAILS</span>
          <span className="px-2.5 py-1 border border-card-border">BAKERY</span>
          <span className="px-2.5 py-1 border border-card-border">JEWELRY</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 h-56">
        <div className="relative border border-card-border overflow-hidden">
          <Image src="/demo/nails/nail-3.jpg" alt="Work 1" fill className="object-cover hover:scale-105 transition-transform" />
        </div>
        <div className="relative border border-card-border overflow-hidden">
          <Image src="/demo/cakes/cake-3.jpg" alt="Work 2" fill className="object-cover hover:scale-105 transition-transform" />
        </div>
        <div className="relative border border-card-border overflow-hidden">
          <Image src="/demo/wedding/wedding-2.jpg" alt="Work 3" fill className="object-cover hover:scale-105 transition-transform" />
        </div>
        <div className="relative border border-card-border overflow-hidden">
          <Image src="/demo/nails/nail-4.jpg" alt="Work 4" fill className="object-cover hover:scale-105 transition-transform" />
        </div>
      </div>
    </div>
  );
}

// 12. Monospace Studio Dossier
export function HeroStudioDossier() {
  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div className="border-b border-card-border pb-3 flex items-center justify-between">
        <div>
          <span className="text-foreground font-bold">DOSSIER // AG-2026-OSL</span>
          <span className="text-muted text-[10px] block">SECURITY CLEARANCE: PUBLIC ARCHIVE</span>
        </div>
        <div className="text-right text-[10px] text-muted">
          STATUS: <span className="text-emerald-500 font-bold">AVAILABLE FOR COMMISSIONS</span>
        </div>
      </div>
      <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-card-border">
        <div>
          <span className="text-[10px] text-muted block">BUILD SPEED</span>
          <span className="font-bold text-foreground">48H — 1 WEEK</span>
        </div>
        <div>
          <span className="text-[10px] text-muted block">TECH STACK</span>
          <span className="font-bold text-foreground">NEXT.JS 15 / VIPPS</span>
        </div>
        <div>
          <span className="text-[10px] text-muted block">STARTING RATE</span>
          <span className="font-bold text-foreground">2,000 KR FLAT</span>
        </div>
        <div>
          <span className="text-[10px] text-muted block">LOCATION</span>
          <span className="font-bold text-foreground">OSLO (NO REMOTE AGENCY)</span>
        </div>
      </div>
      <div className="pt-3 flex items-center justify-between">
        <span className="text-muted text-[11px]">Direct 1-on-1 development with A.Gure</span>
        <span className="text-foreground font-bold underline cursor-pointer">START QUESTIONNAIRE →</span>
      </div>
    </div>
  );
}

// 13. Minimal Studio Business Card Header
export function HeroBusinessCard() {
  return (
    <div className="w-full p-4 sm:p-8 flex justify-center bg-muted/5 border border-card-border">
      <div className="w-full max-w-md bg-card border-2 border-foreground p-6 shadow-sm font-mono text-xs">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-heading font-black text-xl text-foreground tracking-tight">
              A.GURE
            </h3>
            <span className="text-[10px] text-muted uppercase">Web Developer & Designer</span>
          </div>
          <div className="w-5 h-5 border border-foreground flex items-center justify-center font-bold text-[10px]">
            AG
          </div>
        </div>
        <div className="space-y-1 text-muted text-[11px]">
          <p>Oslo, Norway</p>
          <p className="text-foreground font-semibold">hello@agure.space</p>
          <p>agure.space/demo</p>
        </div>
        <div className="mt-6 pt-4 border-t border-card-border flex justify-between items-center text-[10px] text-muted">
          <span>TIER 1 BOOKING DROP</span>
          <span className="text-foreground font-bold uppercase">2,000 KR ONE-TIME</span>
        </div>
      </div>
    </div>
  );
}

// 14. High-Fashion Kinetic Headline
export function HeroKineticHeadline() {
  return (
    <div className="w-full bg-card border border-card-border p-6 sm:p-10 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/10 border border-card-border text-[10px] font-mono text-foreground uppercase tracking-widest mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
        SPRING 2026 COMMISSIONS
      </div>
      <h1 className="text-3xl sm:text-5xl text-foreground leading-tight tracking-tight">
        <span className="font-serif italic font-normal">Sculptural digital form</span><br />
        <span className="font-heading font-black uppercase tracking-tighter">Engineered for conversion.</span>
      </h1>
      <p className="text-xs font-mono text-muted max-w-md mx-auto mt-4 leading-relaxed">
        We replace awkward DMs with structured price ledgers, calendar slots, and 10-second Vipps deposits.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="px-5 py-2.5 bg-foreground text-background font-mono text-xs font-bold uppercase">
          Explore Demos
        </button>
      </div>
    </div>
  );
}
