"use client";

import React, { useState } from "react";
import { 
  FiArrowUpRight, 
  FiMenu, 
  FiX, 
  FiShoppingBag, 
  FiCalendar, 
  FiGrid, 
  FiLayers, 
  FiClock,
  FiChevronDown 
} from "react-icons/fi";

// 01. Classic Editorial Split
export function NavEditorialSplit() {
  return (
    <nav className="w-full py-4 px-6 bg-card border border-card-border flex items-center justify-between">
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
    </nav>
  );
}

// 02. Brutalist Boxed Grid
export function NavBrutalistGrid() {
  return (
    <nav className="w-full grid grid-cols-2 sm:grid-cols-4 border border-foreground divide-x divide-foreground bg-card text-xs font-mono">
      <div className="p-3 font-bold tracking-tighter uppercase text-foreground bg-card">
        STUDIO KLØ
      </div>
      <div className="p-3 text-muted flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px]">AVAIL: MAR 2026</span>
      </div>
      <div className="p-3 text-muted hover:text-foreground cursor-pointer hidden sm:flex items-center justify-center">
        [ RATES & SPECS ]
      </div>
      <div className="p-3 bg-foreground text-background font-bold text-center uppercase cursor-pointer hover:opacity-90">
        RESERVE SLOT →
      </div>
    </nav>
  );
}

// 03. Center Floating Pill
export function NavFloatingPill() {
  const [active, setActive] = useState("Works");
  return (
    <div className="w-full py-3 flex items-center justify-center">
      <nav className="inline-flex items-center gap-1 p-1.5 bg-card/95 backdrop-blur-md border border-card-border shadow-lg">
        {["Works", "Treatments", "About", "Contact"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-3 py-1.5 text-xs font-mono transition-all ${
              active === tab 
                ? "bg-foreground text-background font-medium" 
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}

// 04. Monospace Terminal HUD
export function NavTerminalHud() {
  return (
    <nav className="w-full p-3 bg-card border-b-2 border-card-border font-mono text-[11px] text-muted flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-foreground font-bold">SYS.VER//2.4</span>
        <span className="hidden sm:inline text-muted/60">59°54&apos;N 10°45&apos;E</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-foreground">ROOT: [LOOKBOOK]</span>
        <span className="hover:text-foreground cursor-pointer">SERVICES</span>
        <span className="hover:text-foreground cursor-pointer">INTAKE</span>
      </div>
      <div className="flex items-center gap-1 text-foreground font-semibold">
        <FiClock className="text-xs" />
        <span>19:30 CET</span>
      </div>
    </nav>
  );
}

// 05. Magazine Stacked Header Nav
export function NavMagazineStack() {
  return (
    <header className="w-full bg-card border border-card-border py-4 px-6 text-center">
      <div className="font-heading text-lg font-black tracking-widest text-foreground uppercase">
        NOIRE ATELIER
      </div>
      <div className="text-[10px] font-mono tracking-widest text-muted mt-0.5 uppercase">
        Independent Fine Jewelry & Gems · Oslo
      </div>
      <div className="w-full h-px bg-card-border my-3" />
      <div className="flex items-center justify-center gap-6 text-xs font-serif tracking-wider text-muted">
        <span className="hover:text-foreground cursor-pointer">COLLECTION</span>
        <span>/</span>
        <span className="hover:text-foreground cursor-pointer">ARCHIVE</span>
        <span>/</span>
        <span className="hover:text-foreground cursor-pointer">CONSULTATION</span>
        <span>/</span>
        <span className="hover:text-foreground cursor-pointer text-foreground font-medium">BESPOKE ORDER</span>
      </div>
    </header>
  );
}

// 06. Minimalist Underline Rule
export function NavUnderlineRule() {
  const [hovered, setHovered] = useState<string | null>("Lookbook");
  const links = ["Lookbook", "Services", "Pricing", "Book Chair"];

  return (
    <nav className="w-full py-4 px-6 bg-card border-b border-card-border flex items-center justify-between">
      <span className="font-heading font-black text-sm tracking-tight">K L Ø</span>
      <div className="flex items-center gap-6 text-xs font-mono">
        {links.map((link) => (
          <div
            key={link}
            onMouseEnter={() => setHovered(link)}
            className="relative cursor-pointer py-1"
          >
            <span className={hovered === link ? "text-foreground font-bold" : "text-muted"}>
              {link}
            </span>
            {hovered === link && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground transition-all" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

// 07. Quadrant Corner Anchors
export function NavCornerAnchors() {
  return (
    <div className="w-full h-24 p-4 border border-card-border bg-card relative text-xs font-mono">
      <span className="absolute top-3 left-4 font-bold text-foreground">01/ BRAND</span>
      <span className="absolute top-3 right-4 text-foreground hover:underline cursor-pointer">
        RESERVE →
      </span>
      <span className="absolute bottom-3 left-4 text-muted text-[10px]">
        OSLO, NO · LAT 59.91
      </span>
      <span className="absolute bottom-3 right-4 text-muted text-[10px]">
        MENU [INDEX]
      </span>
      <div className="h-full flex items-center justify-center text-[11px] text-muted tracking-widest uppercase">
        Quadrant Corner Anchor System
      </div>
    </div>
  );
}

// 08. Mobile App Bottom Dock
export function NavBottomDock() {
  const [active, setActive] = useState("treatments");

  return (
    <div className="w-full p-2 flex justify-center bg-card/40 border border-card-border">
      <div className="w-full max-w-sm bg-card border border-card-border p-2 flex items-center justify-around shadow-md">
        <button 
          onClick={() => setActive("lookbook")}
          className={`flex flex-col items-center gap-1 text-[10px] font-mono ${
            active === "lookbook" ? "text-foreground font-bold" : "text-muted"
          }`}
        >
          <FiGrid className="text-sm" />
          <span>Lookbook</span>
        </button>
        <button 
          onClick={() => setActive("treatments")}
          className={`flex flex-col items-center gap-1 text-[10px] font-mono ${
            active === "treatments" ? "text-foreground font-bold" : "text-muted"
          }`}
        >
          <FiLayers className="text-sm" />
          <span>Rates</span>
        </button>
        <button 
          onClick={() => setActive("book")}
          className="flex items-center gap-1 px-3 py-1.5 bg-foreground text-background text-[11px] font-mono font-bold uppercase shadow-sm"
        >
          <FiCalendar className="text-xs" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
}

// 09. Continuous Marquee Ticker Nav
export function NavMarqueeTicker() {
  return (
    <div className="w-full border border-card-border bg-card overflow-hidden">
      <div className="bg-foreground text-background py-1 px-4 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap overflow-hidden flex">
        <span className="animate-marquee inline-block">
          STUDIO KLØ · MARCH SLOTS OPEN · BOOK VIA VIPPS IN 10S · NO HIDDEN FEES · OSLO CENTRAL · 
        </span>
      </div>
      <div className="p-3 px-6 flex items-center justify-between text-xs font-mono">
        <span className="font-bold text-foreground">KLØ NAILS</span>
        <div className="flex gap-4 text-muted">
          <span className="hover:text-foreground cursor-pointer">MENU</span>
          <span className="hover:text-foreground cursor-pointer">BEFORE/AFTER</span>
          <span className="text-foreground font-bold cursor-pointer">VIPPS BOOK</span>
        </div>
      </div>
    </div>
  );
}

// 10. Atelier Compact Cart & Book
export function NavAtelierCart() {
  return (
    <nav className="w-full py-3.5 px-6 bg-card border border-card-border flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-foreground" />
        <span className="font-serif text-sm tracking-wide text-foreground">Atelier V</span>
      </div>
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="text-muted hidden sm:inline">1 SELECTION (BIAB GEL)</span>
        <button className="flex items-center gap-2 px-3 py-1 border border-card-border hover:border-foreground text-foreground transition-all">
          <FiShoppingBag className="text-xs" />
          <span>750 KR</span>
          <span className="text-[10px] text-muted">· CHECKOUT</span>
        </button>
      </div>
    </nav>
  );
}

// 11. Minimal Dot & Drawer Trigger
export function NavDotDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-card border border-card-border relative">
      <nav className="p-4 px-6 flex items-center justify-between">
        <span className="font-heading font-black tracking-tighter text-sm">GURE.STUDIO</span>
        <button 
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-1 border border-card-border text-xs font-mono hover:bg-muted/10 transition-colors"
        >
          {open ? <FiX className="text-xs" /> : <FiMenu className="text-xs" />}
          <span>{open ? "CLOSE" : "MENU"}</span>
        </button>
      </nav>
      {open && (
        <div className="p-6 border-t border-card-border bg-card grid grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <div className="text-[10px] text-muted mb-2 uppercase">Direct Links</div>
            <div className="flex flex-col gap-2">
              <span className="text-foreground font-bold hover:underline cursor-pointer">01. Lookbook Archive</span>
              <span className="text-foreground font-bold hover:underline cursor-pointer">02. Price Calculator</span>
              <span className="text-foreground font-bold hover:underline cursor-pointer">03. Client Questionnaire</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-muted mb-2 uppercase">Contact & Location</div>
            <div className="text-muted text-[11px] leading-relaxed">
              Oslo, Norway<br />
              hello@agure.space<br />
              +47 900 00 000
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 12. Split Dual-Tone (50/50 Yin-Yang)
export function NavSplitDualTone() {
  return (
    <nav className="w-full flex border border-card-border text-xs font-mono overflow-hidden">
      <div className="w-1/2 p-3.5 px-5 bg-card text-foreground flex items-center justify-between border-r border-card-border">
        <span className="font-bold">A.GURE / ARCHIVE</span>
        <span className="text-[10px] text-muted hidden sm:inline">PAGE 01</span>
      </div>
      <div className="w-1/2 p-3.5 px-5 bg-foreground text-background flex items-center justify-between">
        <div className="flex gap-4">
          <span className="hover:opacity-80 cursor-pointer">WORKS</span>
          <span className="hover:opacity-80 cursor-pointer hidden sm:inline">RATES</span>
        </div>
        <span className="font-bold hover:underline cursor-pointer">BOOK DROP →</span>
      </div>
    </nav>
  );
}

// 13. Index Ledger Numbers Nav
export function NavIndexNumbers() {
  return (
    <nav className="w-full py-4 px-6 bg-card border border-card-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
      <div className="font-bold text-foreground tracking-tight">[ STUDIO PROTOCOL ]</div>
      <div className="flex items-center gap-6 text-muted">
        <span className="hover:text-foreground cursor-pointer"><strong className="text-foreground">01</strong> / SETS</span>
        <span className="hover:text-foreground cursor-pointer"><strong className="text-foreground">02</strong> / TIME</span>
        <span className="hover:text-foreground cursor-pointer"><strong className="text-foreground">03</strong> / VIPPS</span>
        <span className="hover:text-foreground cursor-pointer text-foreground font-bold"><strong className="underline">04</strong> / CONFIRM</span>
      </div>
    </nav>
  );
}

// 14. Industrial Folder Tab Bar
export function NavFolderTabs() {
  const [tab, setTab] = useState("OVERVIEW");
  const tabs = ["OVERVIEW", "SPECIMENS", "BOOKING_MANIFEST"];

  return (
    <div className="w-full bg-card border-b border-card-border pt-2 px-4 flex items-end gap-1 font-mono text-xs">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`px-4 py-2 border-t border-x border-card-border transition-all ${
            tab === t
              ? "bg-card text-foreground font-bold border-b-transparent -mb-px z-10"
              : "bg-muted/10 text-muted hover:text-foreground"
          }`}
        >
          {t}
        </button>
      ))}
      <div className="ml-auto pb-2 text-[10px] text-muted hidden sm:block">
        DOC-ID: #882-OSLO
      </div>
    </div>
  );
}
