"use client";

import React from "react";
import Image from "next/image";

// 01. High-Contrast Serif & Grotesk Counterpoint
export function TitleSerifGrotesk() {
  return (
    <div className="w-full bg-card border border-card-border p-6 sm:p-8">
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-2">
        SECTION 01 · CURATED SELECTION
      </span>
      <h2 className="text-2xl sm:text-4xl text-foreground leading-tight">
        <span className="font-serif italic font-normal">Modern treatments</span>{" "}
        <span className="font-heading font-black uppercase tracking-tight">Built with precision.</span>
      </h2>
      <p className="text-xs font-mono text-muted mt-2 max-w-sm">
        Every appointment includes thorough Russian cuticle prep and structured apex balancing.
      </p>
    </div>
  );
}

// 02. Monospace Index Lead
export function TitleMonoIndex() {
  return (
    <div className="w-full bg-card border border-card-border p-6 font-mono">
      <div className="flex items-center gap-3 text-xs text-muted mb-3">
        <span className="text-foreground font-bold">[ 02 // LEDGER ]</span>
        <div className="h-px flex-1 bg-card-border" />
        <span className="text-[10px]">ALL PRICES IN NOK</span>
      </div>
      <h3 className="font-heading font-bold text-2xl uppercase tracking-tight text-foreground">
        TREATMENT MENU & ADD-ONS
      </h3>
      <p className="text-xs text-muted mt-1">
        Transparent fixed rates. No surprise charges at the studio chair.
      </p>
    </div>
  );
}

// 03. Heavy Architectural Sans with Hairline Rule
export function TitleHeavyRule() {
  return (
    <div className="w-full bg-card border border-card-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b-2 border-foreground">
        <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tighter text-foreground leading-none">
          PORTFOLIO ARCHIVE
        </h2>
        <span className="text-xs font-mono text-muted uppercase tracking-widest">
          2024 — 2026 RELEASES
        </span>
      </div>
      <div className="flex justify-between items-center text-[11px] font-mono text-muted mt-2">
        <span>TOTAL CLIENTS: 18 STUDIOS</span>
        <span>LOCATION: OSLO / NORGE</span>
      </div>
    </div>
  );
}

// 04. Ghost Contrast (Ink + Whisper Grey)
export function TitleGhostContrast() {
  return (
    <div className="w-full bg-card border border-card-border p-6 sm:p-8">
      <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight leading-tight">
        <span className="text-foreground">CLEAN LOOKBOOK.</span><br />
        <span className="text-muted/30">ZERO COMPLICATIONS.</span>
      </h2>
      <p className="text-xs font-mono text-muted mt-3 max-w-sm leading-relaxed">
        High contrast typographic hierarchy guides your visitors effortlessly to checkout.
      </p>
    </div>
  );
}

// 05. Drop-Cap Editorial Manifesto
export function TitleDropCap() {
  return (
    <div className="w-full bg-card border border-card-border p-6 font-serif">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted mb-3">
        THE STUDIO PHILOSOPHY
      </div>
      <div className="flex gap-4 items-start">
        <span className="font-heading font-black text-5xl sm:text-6xl text-foreground leading-none select-none">
          T
        </span>
        <p className="text-sm sm:text-base text-foreground leading-relaxed pt-1">
          he modern studio booking link should look like a luxury fashion editorial, not a generic spreadsheet. We build bespoke mobile pages where every detail is intentional.
        </p>
      </div>
    </div>
  );
}

// 06. Super-Tracked All-Caps Luxury Spacing
export function TitleSuperTracked() {
  return (
    <div className="w-full bg-card border border-card-border p-6 sm:p-8 text-center">
      <span className="text-[10px] font-mono text-muted uppercase tracking-[0.3em] block mb-2">
        A U T U M N   /   W I N T E R
      </span>
      <h2 className="font-serif text-lg sm:text-2xl text-foreground uppercase tracking-[0.35em] font-light">
        S P E C I M E N   G A L L E R Y
      </h2>
      <div className="w-12 h-px bg-foreground mx-auto mt-4" />
    </div>
  );
}

// 07. Highlight Ink Block Marker
export function TitleInkBlock() {
  return (
    <div className="w-full bg-card border border-card-border p-6 flex flex-wrap items-center gap-3">
      <span className="px-3 py-1 bg-foreground text-background font-mono text-xs font-bold uppercase tracking-wider">
        TIER 1 DROP
      </span>
      <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-foreground">
        THE 1-PAGE MOBILE SITE
      </h3>
      <span className="text-xs font-mono text-muted ml-auto">
        2,000 KR ONE-TIME
      </span>
    </div>
  );
}

// 08. Hanging Indent Section Header
export function TitleHangingIndent() {
  return (
    <div className="w-full bg-card border border-card-border p-6 sm:p-8 font-mono">
      <div className="flex gap-4">
        <span className="text-sm font-bold text-muted select-none">§04</span>
        <div>
          <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-foreground">
            FREQUENT QUESTIONS & POLICIES
          </h3>
          <p className="text-xs text-muted mt-1 leading-relaxed">
            Straightforward rules on deposits, cancellations, and prep before your visit.
          </p>
        </div>
      </div>
    </div>
  );
}

// 09. Inline Visual Token (Mini Thumbnail in Title)
export function TitleInlineToken() {
  return (
    <div className="w-full bg-card border border-card-border p-6">
      <h2 className="font-heading font-black text-xl sm:text-3xl uppercase tracking-tight text-foreground flex flex-wrap items-center gap-2 sm:gap-3 leading-tight">
        <span>FEATURED</span>
        <span className="inline-block relative w-12 h-6 sm:w-16 sm:h-8 border border-card-border overflow-hidden align-middle">
          <Image src="/demo/nails/nail-5.jpg" alt="Token" fill className="object-cover" />
        </span>
        <span>TREATMENTS &</span>
        <span className="text-muted">LOOKS</span>
      </h2>
      <span className="text-[11px] font-mono text-muted block mt-2">
        CLICK ANY SET BELOW TO EXPAND SPECIFICATIONS
      </span>
    </div>
  );
}

// 10. Split Number & Topic Ledger
export function TitleSplitLedger() {
  return (
    <div className="w-full bg-card border border-card-border p-5 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center font-mono text-xs">
      <div className="text-2xl font-bold font-heading text-foreground">
        № 03
      </div>
      <div className="sm:col-span-2">
        <div className="font-bold uppercase text-foreground">APPOINTMENT SCHEDULING</div>
        <div className="text-muted text-[11px]">Next opening: Thursday March 27</div>
      </div>
      <div className="text-left sm:text-right">
        <span className="px-2 py-1 border border-card-border text-[10px] text-muted uppercase">
          LIVE CALENDAR
        </span>
      </div>
    </div>
  );
}

// 11. Minimalist Bracket Enclosure
export function TitleBracketEnclosure() {
  return (
    <div className="w-full bg-card border border-card-border p-6 text-center font-mono">
      <div className="inline-flex items-center gap-2 text-foreground font-bold text-sm sm:text-base tracking-widest uppercase">
        <span className="text-muted">[</span>
        <span>THE STUDIO SPECIFICATION</span>
        <span className="text-muted">]</span>
      </div>
      <div className="text-[11px] text-muted mt-1 uppercase tracking-wider">
        BY APPOINTMENT · BYGG 4 · OSLO
      </div>
    </div>
  );
}

// 12. Rotated Vertical Accent Spine
export function TitleVerticalSpine() {
  return (
    <div className="w-full bg-card border border-card-border p-6 flex gap-5 items-stretch">
      <div className="flex items-center justify-center border-r border-card-border pr-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted -rotate-90 whitespace-nowrap">
          CATEGORY // 08
        </span>
      </div>
      <div>
        <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-foreground">
          LOOKBOOK CATALOGUE
        </h3>
        <p className="text-xs font-mono text-muted mt-1 max-w-sm">
          High-definition photography of real studio clients. Natural daylight, zero artificial skin blurring.
        </p>
      </div>
    </div>
  );
}
