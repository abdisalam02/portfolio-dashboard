"use client";

import React, { useState } from "react";
import { FiCheck, FiArrowRight, FiZap, FiHeart, FiStar } from "react-icons/fi";

// 01. Classic Editorial Ledger
export function PricingEditorialLedger() {
  const items = [
    { name: "Structured BIAB Gel Overlay", time: "90 min", price: "750 kr" },
    { name: "Full Set Sculpted Extensions", time: "120 min", price: "950 kr" },
    { name: "Japanese Chrome Finish", time: "+15 min", price: "+100 kr" },
    { name: "Hand-Painted Nail Art Tier 2", time: "+30 min", price: "+150 kr" },
  ];

  return (
    <div className="w-full bg-[#fcfaf7] border border-neutral-300 p-5 sm:p-6 font-mono text-xs text-neutral-900">
      <div className="flex justify-between items-center pb-3 border-b-2 border-black mb-4">
        <span className="font-bold text-black uppercase">TREATMENT ARCHITECTURE</span>
        <span className="text-[10px] text-neutral-500">INCL. DRY CUTICLE CARE</span>
      </div>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.name} className="flex justify-between items-baseline border-b border-dashed border-neutral-200 pb-2">
            <div>
              <span className="font-bold text-black block sm:inline">{it.name}</span>
              <span className="text-[10px] text-neutral-500 sm:ml-2">({it.time})</span>
            </div>
            <span className="font-black text-black">{it.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 02. Brutalist 3-Tier Comparison
export function PricingBrutalist3Tier() {
  return (
    <div className="w-full bg-white border-2 border-black p-4 text-black font-mono text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="border-2 border-black p-3 bg-neutral-50">
          <span className="text-[10px] font-bold uppercase text-neutral-500">TIER 01</span>
          <h4 className="font-black text-base text-black mt-1">BASIC BIAB</h4>
          <span className="text-xl font-black text-black block my-2">600 KR</span>
          <p className="text-[11px] text-neutral-600 mb-3">Clear or nude structured gel overlay without nail art.</p>
          <button className="w-full py-1.5 border border-black font-bold hover:bg-black hover:text-white">SELECT</button>
        </div>
        <div className="border-3 border-black p-3 bg-[#fde047] shadow-[3px_3px_0px_#000]">
          <span className="text-[10px] font-black uppercase bg-black text-white px-1.5 py-0.5">MOST POPULAR</span>
          <h4 className="font-black text-base text-black mt-1">CHROME &amp; FRENCH</h4>
          <span className="text-xl font-black text-black block my-2">750 KR</span>
          <p className="text-[11px] text-black font-semibold mb-3">Structured overlay with choice of glazed chrome or micro french.</p>
          <button className="w-full py-1.5 bg-black text-white font-black hover:bg-neutral-800">SELECT →</button>
        </div>
        <div className="border-2 border-black p-3 bg-neutral-50">
          <span className="text-[10px] font-bold uppercase text-neutral-500">TIER 03</span>
          <h4 className="font-black text-base text-black mt-1">FREESTYLE ART</h4>
          <span className="text-xl font-black text-black block my-2">950 KR</span>
          <p className="text-[11px] text-neutral-600 mb-3">Full custom 10-finger airbrush aura, 3D drops, and charms.</p>
          <button className="w-full py-1.5 border border-black font-bold hover:bg-black hover:text-white">SELECT</button>
        </div>
      </div>
    </div>
  );
}

// 03. Warm Terracotta Workshop Pricing
export function PricingTerracottaCards() {
  return (
    <div className="w-full bg-[#fbf7f2] border border-[#e3d7cb] p-5 text-[#2c221e]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl border border-[#e3d7cb] shadow-sm">
          <span className="text-xs font-mono text-[#c25e3e] font-bold">1-ON-1 INTENSIVE</span>
          <h4 className="font-serif text-lg font-bold text-[#2c221e] mt-1">Solo Wheel Session</h4>
          <span className="text-2xl font-bold text-[#2c221e] block my-2">1,200 kr</span>
          <p className="text-xs text-[#6e584c] mb-3">2.5 hours private instruction. Keep up to 3 glazed pieces.</p>
          <button className="w-full py-2 rounded-full bg-[#c25e3e] text-white text-xs font-bold hover:bg-[#a64e32]">Book Solo</button>
        </div>
        <div className="p-4 bg-white rounded-xl border border-[#e3d7cb] shadow-sm">
          <span className="text-xs font-mono text-[#c25e3e] font-bold">COMMUNITY TABLE</span>
          <h4 className="font-serif text-lg font-bold text-[#2c221e] mt-1">Weekend Group of 4</h4>
          <span className="text-2xl font-bold text-[#2c221e] block my-2">850 kr <span className="text-xs font-normal text-[#8c7466]">/ person</span></span>
          <p className="text-xs text-[#6e584c] mb-3">3 hours relaxed wheel practice with wine and cheese included.</p>
          <button className="w-full py-2 rounded-full bg-[#2c221e] text-white text-xs font-bold hover:bg-[#1a1411]">Book Seat</button>
        </div>
      </div>
    </div>
  );
}

// 04. French Patisserie Cake Tiers Pricing
export function PricingPatisserieTiers() {
  return (
    <div className="w-full bg-[#fdf5f7] border border-[#f5d9e3] p-5 rounded-md text-[#541624]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-white rounded border border-[#f5d9e3] text-center">
          <span className="text-[10px] font-mono uppercase text-[#a1445b] font-bold">PETITE CELEBRATION</span>
          <h4 className="font-serif text-base font-bold text-[#541624] mt-1">6–8 Servings</h4>
          <span className="text-xl font-bold text-[#8b263e] block my-1">650 kr</span>
          <p className="text-[11px] text-[#783244]">1 tier, 15cm diameter. Vintage piped cursive message.</p>
        </div>
        <div className="p-3 bg-white rounded border-2 border-[#8b263e] text-center shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#8b263e] font-bold">POPULAR SIZE</span>
          <h4 className="font-serif text-base font-bold text-[#541624] mt-1">12–15 Servings</h4>
          <span className="text-xl font-bold text-[#8b263e] block my-1">950 kr</span>
          <p className="text-[11px] text-[#783244]">1 tall tier, 20cm diameter. Lambeth piping + organic fruit.</p>
        </div>
        <div className="p-3 bg-white rounded border border-[#f5d9e3] text-center">
          <span className="text-[10px] font-mono uppercase text-[#a1445b] font-bold">GRAND WEDDING</span>
          <h4 className="font-serif text-base font-bold text-[#541624] mt-1">30–45 Servings</h4>
          <span className="text-xl font-bold text-[#8b263e] block my-1">2,800 kr</span>
          <p className="text-[11px] text-[#783244]">2 or 3 stacked tiers. Custom floral installation.</p>
        </div>
      </div>
    </div>
  );
}

// 05. Japanese Wabi-Sabi Zen Menu
export function PricingWabiSabiMenu() {
  return (
    <div className="w-full bg-[#f4f7f2] border border-[#d6e0d2] p-5 rounded text-[#213123] font-mono text-xs">
      <div className="space-y-3">
        <div className="p-3 bg-white/80 rounded border border-[#d6e0d2] flex justify-between items-center">
          <div>
            <span className="font-serif text-sm font-bold block text-[#1e2e21]">Micro Japanese Manicure</span>
            <span className="text-[10px] text-[#557359]">Gentle dry cuticle cleanse + natural buff shine</span>
          </div>
          <span className="font-bold text-sm text-[#2d4230]">550 kr</span>
        </div>
        <div className="p-3 bg-white/80 rounded border border-[#d6e0d2] flex justify-between items-center">
          <div>
            <span className="font-serif text-sm font-bold block text-[#1e2e21]">Organic BIAB Overlay</span>
            <span className="text-[10px] text-[#557359]">Non-toxic strengthening coat + matcha cuticle balm</span>
          </div>
          <span className="font-bold text-sm text-[#2d4230]">750 kr</span>
        </div>
      </div>
    </div>
  );
}

// 06. Cyberpunk Chrome Grillz Pricing
export function PricingCyberGrillzCaps() {
  return (
    <div className="w-full bg-[#0a0a0d] border border-[#bef264]/40 p-5 text-white font-mono text-xs shadow-[0_0_15px_rgba(190,242,100,0.1)]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-zinc-900 border border-zinc-800">
          <span className="text-[#bef264] text-[10px] block">SINGLE CAP</span>
          <h4 className="text-base font-black text-white mt-1">CHROME TOOTH</h4>
          <span className="text-lg font-black text-[#bef264] block my-1">1,200 KR</span>
          <p className="text-[10px] text-zinc-400">Precision laser scanned medical chrome-cobalt.</p>
        </div>
        <div className="p-3 bg-zinc-900 border-2 border-[#bef264]">
          <span className="text-[#bef264] text-[10px] block">4-TOOTH BRIDGE</span>
          <h4 className="text-base font-black text-white mt-1">SOLID 18K GOLD</h4>
          <span className="text-lg font-black text-[#bef264] block my-1">4,800 KR</span>
          <p className="text-[10px] text-zinc-400">Deep mirror polish with diamond cut edges.</p>
        </div>
        <div className="p-3 bg-zinc-900 border border-zinc-800">
          <span className="text-[#bef264] text-[10px] block">CUSTOM GEM INLAY</span>
          <h4 className="text-base font-black text-white mt-1">OPAL / MOISSANITE</h4>
          <span className="text-lg font-black text-[#bef264] block my-1">6,500 KR</span>
          <p className="text-[10px] text-zinc-400">Australian fire opal inlay into white gold cap.</p>
        </div>
      </div>
    </div>
  );
}

// 07. Neo-Brutalist Pop Sticker Pricing
export function PricingNeoPopStickers() {
  return (
    <div className="w-full bg-[#e0e7ff] border-3 border-black p-5 text-black font-mono shadow-[4px_4px_0px_#000]">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 bg-white border-2 border-black p-4 shadow-[2px_2px_0px_#000]">
          <span className="px-2 py-0.5 bg-[#fde047] border border-black text-[10px] font-black uppercase">QUICK REFRESH</span>
          <h4 className="font-heading font-black text-lg mt-1">BASIC GEL SET</h4>
          <span className="text-2xl font-black block my-1">550 KR</span>
          <p className="text-xs text-neutral-600">Cuticle clean + 1 solid gel color.</p>
        </div>
        <div className="flex-1 bg-[#f43f5e] border-3 border-black p-4 text-white shadow-[3px_3px_0px_#000] -rotate-1">
          <span className="px-2 py-0.5 bg-black text-[#fde047] border border-black text-[10px] font-black uppercase">✦ INSTA FAMOUS</span>
          <h4 className="font-heading font-black text-lg mt-1">FULL ART SET</h4>
          <span className="text-2xl font-black block my-1">850 KR</span>
          <p className="text-xs text-white/90">Chrome, 3D drops, aura gradients &amp; French tips.</p>
        </div>
      </div>
    </div>
  );
}

// 08. Magic UI Glowing Dark Card
export function PricingMagicGlowingCard() {
  return (
    <div className="w-full bg-neutral-950 border border-white/10 p-6 rounded-2xl text-white font-mono text-xs">
      <div className="max-w-md mx-auto p-5 rounded-xl bg-neutral-900/80 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-cyan-400 text-[10px] font-bold uppercase flex items-center gap-1">
            <FiZap /> THE COMPLETE STUDIO DROP
          </span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[9px] border border-cyan-500/30 font-bold">ONE-TIME</span>
        </div>
        <span className="text-3xl font-black block text-white my-1">2,000 KR</span>
        <p className="text-neutral-400 text-[11px] mb-4">Complete 1-page mobile site with lookbook, Vipps deposits &amp; custom domain setup.</p>
        <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase shadow-md hover:opacity-90">
          RESERVE YOUR BUILD
        </button>
      </div>
    </div>
  );
}

// 09. Luxury Fine Jewelry Pricing
export function PricingLuxuryJewelryCarat() {
  return (
    <div className="w-full bg-[#0a0a0d] border border-[#3b3221] p-5 text-[#d4af37] font-serif text-xs">
      <div className="space-y-3">
        <div className="flex justify-between items-center border-b border-[#3b3221] pb-2">
          <div>
            <span className="text-[#f5e8cd] font-bold block text-sm">Solid 18k Yellow Gold Signet</span>
            <span className="text-[10px] font-mono text-[#8a7650]">Recycled Nordic Gold · 12 Grams</span>
          </div>
          <span className="font-mono text-sm text-[#d4af37] font-bold">8,500 kr</span>
        </div>
        <div className="flex justify-between items-center border-b border-[#3b3221] pb-2">
          <div>
            <span className="text-[#f5e8cd] font-bold block text-sm">Colombian Emerald Solitaire Ring</span>
            <span className="text-[10px] font-mono text-[#8a7650]">0.85ct Unheated Emerald · Platinum Band</span>
          </div>
          <span className="font-mono text-sm text-[#d4af37] font-bold">18,500 kr</span>
        </div>
      </div>
    </div>
  );
}

// 10. Wedding Photography 3 Packages
export function PricingWeddingPackages() {
  return (
    <div className="w-full bg-[#faf7f2] border border-[#ded5c7] p-5 rounded text-[#2b2118] font-serif text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-white rounded border border-[#ded5c7]">
          <span className="text-[10px] font-mono uppercase text-[#786452] font-bold">ELOPEMENT</span>
          <h4 className="font-bold text-sm mt-1">3 Hours Coverage</h4>
          <span className="text-lg font-bold block my-1">12,000 kr</span>
          <p className="text-[11px] text-[#5c4c3e] font-sans">150+ high-res edited images. Ceremony + portraits.</p>
        </div>
        <div className="p-3 bg-white rounded border-2 border-[#33271e] shadow-sm">
          <span className="text-[10px] font-mono uppercase bg-[#33271e] text-white px-1.5 py-0.5 font-bold">MOST POPULAR</span>
          <h4 className="font-bold text-sm mt-1">Half Day (6 Hours)</h4>
          <span className="text-lg font-bold block my-1">22,000 kr</span>
          <p className="text-[11px] text-[#5c4c3e] font-sans">350+ edited images. Ceremony, portraits &amp; dinner speeches.</p>
        </div>
        <div className="p-3 bg-white rounded border border-[#ded5c7]">
          <span className="text-[10px] font-mono uppercase text-[#786452] font-bold">FULL CELEBRATION</span>
          <h4 className="font-bold text-sm mt-1">10 Hours Coverage</h4>
          <span className="text-lg font-bold block my-1">34,000 kr</span>
          <p className="text-[11px] text-[#5c4c3e] font-sans">600+ edited images + 35mm analogue film highlights.</p>
        </div>
      </div>
    </div>
  );
}

// 11. Traditional Barber Price Board
export function PricingBarberBoard() {
  return (
    <div className="w-full bg-[#18181b] border-2 border-zinc-700 p-5 text-white font-mono text-xs">
      <div className="flex justify-between items-center pb-2 border-b-2 border-zinc-700 mb-3 text-[#ea580c] font-black uppercase">
        <span>SERVICE TARIFF</span>
        <span>TORSHOV BARBER</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span>01. CLASSIC FADE / SCISSOR CUT</span>
          <span className="font-bold text-white">450 KR</span>
        </div>
        <div className="flex justify-between items-center">
          <span>02. BEARD SCULPT + HOT TOWEL SHAVE</span>
          <span className="font-bold text-white">350 KR</span>
        </div>
        <div className="flex justify-between items-center text-[#ea580c] font-bold">
          <span>03. FULL COMBO (HAIRCUT + BEARD SHAVE)</span>
          <span>700 KR</span>
        </div>
      </div>
    </div>
  );
}

// 12. Botanical Weekly Flower Subscription
export function PricingBotanicalSubscription() {
  return (
    <div className="w-full bg-[#f6f2e8] border border-[#d2c7b4] p-5 text-[#30281e]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-white rounded border border-[#d2c7b4]">
          <span className="text-[10px] font-mono text-[#7d6c56] font-bold uppercase">BI-WEEKLY VASE</span>
          <h4 className="font-serif text-sm font-bold text-[#30281e]">Wild Garden Bunch</h4>
          <span className="text-lg font-bold text-[#30281e] block my-1">380 kr <span className="text-xs font-normal">/ delivery</span></span>
          <p className="text-xs text-[#594d3c]">Delivered every other Friday. Seasonal blooms.</p>
        </div>
        <div className="p-3 bg-white rounded border border-[#d2c7b4]">
          <span className="text-[10px] font-mono text-[#7d6c56] font-bold uppercase">WEEKLY ATELIER</span>
          <h4 className="font-serif text-sm font-bold text-[#30281e]">Architectural Grand Vase</h4>
          <span className="text-lg font-bold text-[#30281e] block my-1">650 kr <span className="text-xs font-normal">/ delivery</span></span>
          <p className="text-xs text-[#594d3c]">Delivered every Friday for offices and studios.</p>
        </div>
      </div>
    </div>
  );
}

// 13. Interactive Addon Checklist Calculator
export function PricingAddonChecklist() {
  const [base] = useState(750);
  const [addons, setAddons] = useState<{ [key: string]: number }>({
    "French Micro-Tips": 100,
  });

  const available = [
    { name: "French Micro-Tips", price: 100 },
    { name: "Glazed Chrome Finish", price: 120 },
    { name: "Old Gel Removal", price: 150 },
    { name: "Cuticle Oil Dropper Bottle", price: 90 },
  ];

  const toggle = (name: string, price: number) => {
    const next = { ...addons };
    if (next[name]) {
      delete next[name];
    } else {
      next[name] = price;
    }
    setAddons(next);
  };

  const total = base + Object.values(addons).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full bg-white border border-neutral-300 p-5 font-mono text-xs text-neutral-900">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-black uppercase">LIVE FORMULA CALCULATOR</span>
        <span className="text-sm font-black text-black">TOTAL: {total} KR</span>
      </div>
      <div className="space-y-1.5 mb-3">
        {available.map((a) => {
          const isSelected = !!addons[a.name];
          return (
            <div
              key={a.name}
              onClick={() => toggle(a.name, a.price)}
              className={`p-2 border cursor-pointer flex justify-between items-center transition-all ${
                isSelected ? "border-black bg-neutral-100 font-bold" : "border-neutral-200 text-neutral-600"
              }`}
            >
              <span>{a.name}</span>
              <span>{isSelected ? `✓ +${a.price} kr` : `+${a.price} kr`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 14. Slider Total vs Deposit Pill
export function PricingSliderDeposit() {
  return (
    <div className="w-full bg-[#f9f9f9] border border-neutral-300 p-5 font-mono text-xs text-neutral-900">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">APPOINTMENT SUMMARY</span>
        <span className="text-base font-black text-black">750 KR</span>
      </div>
      <div className="p-3 bg-white border border-neutral-300 rounded flex justify-between items-center">
        <div>
          <span className="text-[10px] text-neutral-500 block font-bold">DUE NOW VIA VIPPS</span>
          <span className="text-base font-black text-emerald-600">250 KR DEPOSIT</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-neutral-500 block font-bold">DUE AT STUDIO CHAIR</span>
          <span className="font-bold text-neutral-800">500 KR BALANCE</span>
        </div>
      </div>
    </div>
  );
}

// 15. Split Two-Tone Chair vs Home Visit
export function PricingSplitTwoTone() {
  return (
    <div className="w-full flex border-2 border-black font-mono text-xs overflow-hidden">
      <div className="w-1/2 p-4 bg-white text-black border-r-2 border-black flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase text-neutral-500">STUDIO CHAIR</span>
          <h4 className="font-bold text-sm mt-1">In-Studio Visit</h4>
          <span className="text-xl font-black block my-1">750 KR</span>
        </div>
        <span className="text-[10px] text-neutral-500">Torggata Studio</span>
      </div>
      <div className="w-1/2 p-4 bg-black text-white flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase text-neutral-400">MOBILE SERVICE</span>
          <h4 className="font-bold text-sm mt-1">At-Home / Hotel</h4>
          <span className="text-xl font-black block my-1">1,350 KR</span>
        </div>
        <span className="text-[10px] text-neutral-400">Within Oslo Zone 1</span>
      </div>
    </div>
  );
}

// 16. Fast Horizontal Pricing Pills
export function PricingMinimalistPills() {
  return (
    <div className="w-full bg-white border border-neutral-300 p-4 font-mono text-xs">
      <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-2">QUICK PRICE LIST</span>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-black">BIAB: <strong>750 kr</strong></span>
        <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-black">French: <strong>+100 kr</strong></span>
        <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-black">Chrome: <strong>+100 kr</strong></span>
        <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-black">Old Gel Removal: <strong>+150 kr</strong></span>
      </div>
    </div>
  );
}
