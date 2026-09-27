"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiArrowUpRight } from "react-icons/fi";

// 01. Horizontal Filmstrip Carousel
export function GalleryFilmstrip() {
  const [index, setIndex] = useState(0);
  const slides = [
    { src: "/demo/nails/nail-1.jpg", title: "Clean French Micro-Tip", price: "750 kr" },
    { src: "/demo/nails/nail-2.jpg", title: "Structured Chrome Overlay", price: "800 kr" },
    { src: "/demo/nails/nail-3.jpg", title: "Milk White BIAB", price: "700 kr" },
    { src: "/demo/nails/nail-4.jpg", title: "Aura Airbrush Gradient", price: "850 kr" },
  ];

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="w-full bg-card border border-card-border p-5">
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <span className="text-foreground font-bold">FILMSTRIP 0{index + 1} / 0{slides.length}</span>
        <div className="flex gap-1">
          <button onClick={prev} className="p-1.5 border border-card-border hover:bg-muted/10">
            <FiChevronLeft className="text-xs" />
          </button>
          <button onClick={next} className="p-1.5 border border-card-border hover:bg-muted/10">
            <FiChevronRight className="text-xs" />
          </button>
        </div>
      </div>
      <div className="relative h-60 w-full border border-card-border overflow-hidden">
        <Image
          src={slides[index].src}
          alt={slides[index].title}
          fill
          className="object-cover transition-all duration-500"
        />
        <div className="absolute bottom-0 inset-x-0 p-3 bg-card/90 backdrop-blur-sm border-t border-card-border flex justify-between items-center text-xs font-mono">
          <span className="font-bold text-foreground">{slides[index].title}</span>
          <span className="text-muted">{slides[index].price}</span>
        </div>
      </div>
    </div>
  );
}

// 02. Asymmetrical Editorial Duo
export function GalleryEditorialDuo() {
  return (
    <div className="w-full bg-card border border-card-border p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="sm:col-span-2 relative h-64 border border-card-border overflow-hidden group">
        <Image
          src="/demo/wedding/wedding-1.jpg"
          alt="Lead Look"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-card/90 text-[10px] font-mono border border-card-border">
          PRIMARY SPECIMEN
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative h-36 border border-card-border overflow-hidden">
          <Image
            src="/demo/wedding/wedding-2.jpg"
            alt="Macro Texture"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3 bg-muted/5 border border-card-border font-mono text-[11px] flex-1 flex flex-col justify-center">
          <div className="text-[10px] text-muted uppercase">Macro Specimen</div>
          <div className="font-bold text-foreground mt-0.5">Grain & Linen Detail</div>
          <div className="text-muted text-[10px] mt-2">Captured on 35mm analogue film.</div>
        </div>
      </div>
    </div>
  );
}

// 03. Tight Masonry Trio
export function GalleryMasonryTrio() {
  return (
    <div className="w-full bg-card border border-card-border p-5 grid grid-cols-3 gap-2">
      <div className="relative h-56 border border-card-border overflow-hidden group">
        <Image src="/demo/cakes/cake-1.jpg" alt="Cake 1" fill className="object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-card/90 text-[9px] font-mono border border-card-border">
          01. CHERRY
        </div>
      </div>
      <div className="relative h-44 mt-6 border border-card-border overflow-hidden group">
        <Image src="/demo/cakes/cake-2.jpg" alt="Cake 2" fill className="object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-card/90 text-[9px] font-mono border border-card-border">
          02. MATCHA
        </div>
      </div>
      <div className="relative h-52 border border-card-border overflow-hidden group">
        <Image src="/demo/cakes/cake-3.jpg" alt="Cake 3" fill className="object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-card/90 text-[9px] font-mono border border-card-border">
          03. LAMBETH
        </div>
      </div>
    </div>
  );
}

// 04. Polaroid / Exhibition Specimen Cards
export function GalleryPolaroidSpecimen() {
  return (
    <div className="w-full bg-card border border-card-border p-6 flex flex-wrap justify-center gap-6">
      <div className="w-48 bg-card border border-card-border p-3 shadow-sm hover:-rotate-1 transition-transform">
        <div className="relative h-40 w-full border border-card-border bg-neutral-100 overflow-hidden">
          <Image src="/demo/nails/nail-2.jpg" alt="Polaroid 1" fill className="object-cover" />
        </div>
        <div className="mt-3 font-mono text-[10px]">
          <div className="font-bold text-foreground uppercase">Set #041 · French Chrome</div>
          <div className="text-muted">Oslo Studio · 14.03.2026</div>
        </div>
      </div>
      <div className="w-48 bg-card border border-card-border p-3 shadow-sm hover:rotate-1 transition-transform">
        <div className="relative h-40 w-full border border-card-border bg-neutral-100 overflow-hidden">
          <Image src="/demo/nails/nail-3.jpg" alt="Polaroid 2" fill className="object-cover" />
        </div>
        <div className="mt-3 font-mono text-[10px]">
          <div className="font-bold text-foreground uppercase">Set #042 · Soft BIAB</div>
          <div className="text-muted">Oslo Studio · 18.03.2026</div>
        </div>
      </div>
    </div>
  );
}

// 05. Full-Bleed Vertical Scroll Stacker
export function GalleryVerticalStacker() {
  return (
    <div className="w-full bg-card border border-card-border p-4 font-mono text-xs">
      <div className="text-[10px] text-muted uppercase mb-3">[ SERIES // CHRONOLOGY ]</div>
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        <div className="relative h-44 border border-card-border overflow-hidden">
          <Image src="/demo/wedding/wedding-3.jpg" alt="Stack 1" fill className="object-cover" />
          <div className="absolute top-2 left-2 bg-foreground text-background px-2 py-0.5 text-[10px] font-bold">
            01 / CEREMONY
          </div>
        </div>
        <div className="relative h-44 border border-card-border overflow-hidden">
          <Image src="/demo/wedding/wedding-4.jpg" alt="Stack 2" fill className="object-cover" />
          <div className="absolute top-2 left-2 bg-foreground text-background px-2 py-0.5 text-[10px] font-bold">
            02 / RECEPTION
          </div>
        </div>
      </div>
    </div>
  );
}

// 06. Interactive Hover Zoom & Detail Preview
export function GalleryHoverZoom() {
  const [hovered, setHovered] = useState<number | null>(null);

  const items = [
    { src: "/demo/nails/nail-5.jpg", name: "Almond Sculpt", time: "90 min", price: "800 kr" },
    { src: "/demo/nails/nail-6.jpg", name: "Short Square Micro", time: "75 min", price: "750 kr" },
  ];

  return (
    <div className="w-full bg-card border border-card-border p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <div
          key={item.name}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          className="relative h-52 border border-card-border overflow-hidden cursor-pointer"
        >
          <Image
            src={item.src}
            alt={item.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              hovered === idx ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-3 inset-x-3 text-white font-mono text-xs flex justify-between items-end">
            <div>
              <div className="font-bold">{item.name}</div>
              <div className="text-[10px] text-white/70">{item.time}</div>
            </div>
            <span className="px-2 py-1 bg-white text-black font-bold text-[10px]">
              {item.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// 07. Minimal 6-Grid Lookbook with Badge Pointers
export function GallerySixGrid() {
  const grid = [
    { src: "/demo/nails/nail-1.jpg", tag: "FRENCH" },
    { src: "/demo/nails/nail-2.jpg", tag: "CHROME" },
    { src: "/demo/nails/nail-3.jpg", tag: "BIAB" },
    { src: "/demo/nails/nail-4.jpg", tag: "AURA" },
    { src: "/demo/nails/nail-5.jpg", tag: "ALMOND" },
    { src: "/demo/nails/nail-6.jpg", tag: "NATURAL" },
  ];

  return (
    <div className="w-full bg-card border border-card-border p-4">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {grid.map((g) => (
          <div key={g.tag} className="relative aspect-square border border-card-border overflow-hidden group">
            <Image src={g.src} alt={g.tag} fill className="object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute bottom-1 left-1 px-1 py-0.5 bg-card/90 text-[8px] font-mono border border-card-border font-bold">
              {g.tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 08. Offset Overlap Layering (Physical Photo Stack)
export function GalleryOffsetStack() {
  return (
    <div className="w-full bg-card border border-card-border p-6 flex justify-center items-center h-64 overflow-hidden relative">
      <div className="relative w-44 h-48 border border-card-border shadow-md -rotate-6 z-0 overflow-hidden">
        <Image src="/demo/cakes/cake-4.jpg" alt="Under cake" fill className="object-cover" />
      </div>
      <div className="relative w-48 h-52 border-2 border-foreground shadow-xl rotate-3 -ml-12 z-10 overflow-hidden">
        <Image src="/demo/cakes/cake-5.jpg" alt="Top cake" fill className="object-cover" />
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-foreground text-background text-[10px] font-mono font-bold">
          LAYERED DUO
        </div>
      </div>
    </div>
  );
}

// 09. Before / After Split Slider Layout
export function GalleryBeforeAfter() {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-foreground">TRANSFORMATION SCAN</span>
        <div className="flex border border-card-border p-0.5">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-2 py-0.5 text-[10px] ${!showAfter ? "bg-foreground text-background font-bold" : "text-muted"}`}
          >
            BEFORE
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-2 py-0.5 text-[10px] ${showAfter ? "bg-foreground text-background font-bold" : "text-muted"}`}
          >
            AFTER (4 WEEKS)
          </button>
        </div>
      </div>
      <div className="relative h-56 border border-card-border overflow-hidden">
        <Image
          src={showAfter ? "/demo/nails/nail-1.jpg" : "/demo/nails/nail-4.jpg"}
          alt="Before / After"
          fill
          className="object-cover transition-opacity duration-300"
        />
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-card/90 border border-card-border text-[10px] font-bold">
          {showAfter ? "AFTER: Apex Balanced Structured Gel" : "BEFORE: Bare Damaged Nail Beds"}
        </div>
      </div>
    </div>
  );
}

// 10. Blueprint Greyscale to Color Reveal
export function GalleryBlueprintReveal() {
  return (
    <div className="w-full bg-card border border-card-border p-5 grid grid-cols-2 gap-4 font-mono text-xs">
      <div className="relative h-48 border border-card-border overflow-hidden group cursor-pointer">
        <Image
          src="/demo/wedding/wedding-5.jpg"
          alt="Blueprint 1"
          fill
          className="object-cover filter grayscale contrast-125 group-hover:filter-none transition-all duration-500"
        />
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-card/90 text-[9px] border border-card-border">
          HOVER FOR COLOR
        </div>
      </div>
      <div className="relative h-48 border border-card-border overflow-hidden group cursor-pointer">
        <Image
          src="/demo/wedding/wedding-6.jpg"
          alt="Blueprint 2"
          fill
          className="object-cover filter grayscale contrast-125 group-hover:filter-none transition-all duration-500"
        />
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-card/90 text-[9px] border border-card-border">
          HOVER FOR COLOR
        </div>
      </div>
    </div>
  );
}

// 11. Circular Architectural Framing
export function GalleryCircularFraming() {
  return (
    <div className="w-full bg-card border border-card-border p-6 flex justify-around items-center">
      <div className="text-center">
        <div className="relative w-28 h-36 sm:w-32 sm:h-44 rounded-t-full border border-card-border overflow-hidden mx-auto shadow-sm">
          <Image src="/demo/cakes/cake-6.jpg" alt="Arch 1" fill className="object-cover" />
        </div>
        <span className="font-mono text-[10px] text-muted block mt-2">ARCH NO. 1</span>
      </div>
      <div className="text-center">
        <div className="relative w-28 h-36 sm:w-32 sm:h-44 rounded-t-full border border-card-border overflow-hidden mx-auto shadow-sm">
          <Image src="/demo/cakes/cake-1.jpg" alt="Arch 2" fill className="object-cover" />
        </div>
        <span className="font-mono text-[10px] text-muted block mt-2">ARCH NO. 2</span>
      </div>
    </div>
  );
}

// 12. 1-Large + 2-Small Focus Gallery
export function GalleryFocusTrio() {
  return (
    <div className="w-full bg-card border border-card-border p-5 grid grid-cols-1 sm:grid-cols-5 gap-3">
      <div className="sm:col-span-3 relative h-56 border border-card-border overflow-hidden">
        <Image src="/demo/nails/nail-2.jpg" alt="Focus Lead" fill className="object-cover" />
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-foreground text-background text-[10px] font-mono font-bold">
          MAIN SPECIMEN
        </div>
      </div>
      <div className="sm:col-span-2 flex flex-col gap-3">
        <div className="relative h-[106px] border border-card-border overflow-hidden">
          <Image src="/demo/nails/nail-3.jpg" alt="Sub 1" fill className="object-cover" />
        </div>
        <div className="relative h-[106px] border border-card-border overflow-hidden">
          <Image src="/demo/nails/nail-4.jpg" alt="Sub 2" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
