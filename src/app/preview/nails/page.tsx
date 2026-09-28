"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiVolumeX,
  FiArrowDown,
  FiArrowRight,
} from "react-icons/fi";
import PreviewShell from "@/components/preview/PreviewShell";

// Bespoke Scandinavian Nail Atelier Brand Logo
function StudioKloLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="36" height="36" rx="8" stroke="currentColor" strokeWidth="1.5" />
      {/* Architectural Nail Apex Arch */}
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

function AtelierStamp({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke="#161514" strokeWidth="1.2" opacity="0.3" />
      <circle cx="30" cy="30" r="25" stroke="#161514" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.3" />
      <path d="M22 36L30 18L38 36" stroke="#161514" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <circle cx="30" cy="30" r="1.5" fill="#161514" opacity="0.4" />
    </svg>
  );
}

interface NailService {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  photo: string;
  tag: string;
}

const NAIL_SERVICES: NailService[] = [
  {
    id: "biab",
    name: "Structured BIAB Gel Overlay",
    duration: "75 min",
    price: 750,
    description: "Strengthens natural nail apex. Includes Russian dry e-file cuticle care.",
    photo: "/demo/nails/nail-4.jpg",
    tag: "Most Popular",
  },
  {
    id: "japanese",
    name: "Japanese Natural Manicure",
    duration: "50 min",
    price: 550,
    description: "Non-chemical cuticle conditioning, organic beeswax buff, and matcha oil.",
    photo: "/demo/nails/nail-2.jpg",
    tag: "Natural Care",
  },
  {
    id: "clean-french",
    name: "Micro-Line French & BIAB Base",
    duration: "90 min",
    price: 900,
    description: "Natural nude builder overlay topped with ultra-fine white micro-tips.",
    photo: "/demo/nails/nail-1.jpg",
    tag: "Editorial",
  },
];

// Nail Shapes with exact architectural SVG silhouette paths matching Studio Klø
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
    desc: "Organic contour",
    svgPath: "M 10 38 L 10 20 C 10 10 14 4 20 4 C 26 4 30 10 30 20 L 30 38 Z",
  },
  {
    id: "almond",
    name: "Almond",
    desc: "Tapered apex",
    svgPath: "M 10 38 L 10 22 C 10 14 13 6 20 2 C 27 6 30 14 30 22 L 30 38 Z",
  },
  {
    id: "square",
    name: "Square",
    desc: "Sharp 90° edge",
    svgPath: "M 10 38 L 10 6 L 30 6 L 30 38 Z",
  },
  {
    id: "coffin",
    name: "Coffin",
    desc: "Tapered flat tip",
    svgPath: "M 10 38 L 12 18 L 15 4 L 25 4 L 28 18 L 30 38 Z",
  },
  {
    id: "stiletto",
    name: "Stiletto",
    desc: "Dramatic point",
    svgPath: "M 10 38 L 10 22 L 20 2 L 30 22 L 30 38 Z",
  },
];

const APPT_DATES = [
  { day: "Thu", date: "23", full: "Thursday, May 23" },
  { day: "Fri", date: "24", full: "Friday, May 24" },
  { day: "Sat", date: "25", full: "Saturday, May 25" },
  { day: "Mon", date: "27", full: "Monday, May 27" },
  { day: "Tue", date: "28", full: "Tuesday, May 28" },
];

const TIME_SLOTS = ["10:30", "12:30", "14:30", "16:30"];

export default function PreviewNailsPage() {
  const [selectedService, setSelectedService] = useState<NailService>(NAIL_SERVICES[0]);
  const [selectedShape, setSelectedShape] = useState<NailShapeOption>(NAIL_SHAPES[0]);
  const [silentAppt, setSilentAppt] = useState(false);
  const [selectedDate, setSelectedDate] = useState(APPT_DATES[2]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [clientName, setClientName] = useState("Mathilde");
  const [clientPhone, setClientPhone] = useState("+47 905 43 210");
  const [confirmed, setConfirmed] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  const lookbookPhotos = [
    { src: "/demo/nails/nail-1.jpg", title: "Clean French Micro-Tip", tag: "Micro-French" },
    { src: "/demo/nails/nail-4.jpg", title: "Structured BIAB Apex", tag: "Natural BIAB" },
    { src: "/demo/nails/nail-2.jpg", title: "Glazed Mineral Nude", tag: "Glazed Nude" },
    { src: "/demo/nails/nail-3.jpg", title: "Soft Sage Aura Buff", tag: "Aura Ombré" },
    { src: "/demo/nails/nail-5.jpg", title: "Fine-Line Minimalist Accent", tag: "Fine Line" },
    { src: "/demo/nails/nail-6.jpg", title: "Clean Japanese Glass Buff", tag: "Glass Buff" },
  ];

  // Smooth scroll to confirmation pass when booking is confirmed
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

  return (
    <PreviewShell
      nicheTitle="Studio Klō Nails"
      nicheSubtitle="Clean BIAB & Natural Nail Atelier · Frogner"
      accentColor="#161514"
    >
      <div className="text-[#161514] min-h-screen overflow-x-hidden">
        {/* BAND 1: HEADER & HERO (Alabaster Linen Background #FAF9F6) */}
        <section className="bg-[#FAF9F6] border-b border-black/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-5 sm:py-8 space-y-8 sm:space-y-10">
            {/* Header Strapped with Logo Icon */}
            <header className="w-full pb-4 border-b border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <StudioKloLogo className="w-8 h-8 sm:w-9 sm:h-9 text-[#161514] flex-shrink-0" />
                <div>
                  <span className="font-serif text-base sm:text-xl font-bold text-[#161514] tracking-wide block leading-tight">
                    STUDIO KLŌ
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-neutral-500 block">
                    Nail Atelier · Frogner
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6 text-xs">
                <a href="#lookbook" className="text-neutral-600 hover:text-black font-medium hidden sm:inline">
                  Lookbook
                </a>
                <a href="#booking-flow" className="text-neutral-600 hover:text-black font-medium hidden sm:inline">
                  Services
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("booking-flow");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#161514] text-white hover:bg-black transition-colors font-medium text-xs shadow-xs cursor-pointer"
                >
                  Book Chair ↓
                </button>
              </div>
            </header>

            {/* Fluid Editorial Hero with ENLARGED Primary Image */}
            <div className="pt-1 sm:pt-4 pb-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
                <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold">
                      NATURAL NAIL ATELIER · FROGNER OSLO
                    </span>
                  </div>

                  <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#161514] leading-[1.14] font-semibold tracking-tight">
                    Clean BIAB &amp; natural nail care.
                  </h1>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg">
                    Gentle dry e-file cuticle care, non-toxic European builder gels, and calm 1-on-1 chairs. We restore natural nail beds with clean 4-week wear.
                  </p>

                  <div className="pt-1 flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full border border-black/10 bg-white/70 text-neutral-800">
                      ✦ Non-toxic &amp; HEMA-Free
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 rounded-full border border-black/10 bg-white/70 text-neutral-800">
                      ✦ 4-week retention
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 rounded-full border border-black/10 bg-white/70 text-neutral-800">
                      ✦ Quiet appointments
                    </span>
                  </div>

                  <div className="pt-2 sm:pt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("booking-flow");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 sm:px-5 py-2.5 rounded-full bg-[#161514] text-white hover:bg-black font-medium text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-2"
                    >
                      <span>Reserve Studio Chair</span>
                      <FiArrowDown size={14} />
                    </button>
                    <span className="text-xs font-mono text-neutral-500">From 550 kr</span>
                  </div>
                </div>

                {/* Hero Photo Card - ENLARGED, Commandingly Proportioned */}
                <div className="lg:col-span-6 relative aspect-[3/4] sm:aspect-[4/5] min-h-[340px] sm:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 shadow-sm group">
                  <Image
                    src="/demo/nails/nail-1.jpg"
                    alt="Studio Klō BIAB Nails"
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute top-3.5 right-3.5">
                    <AtelierStamp className="w-14 h-14" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-xs rounded-xl border border-black/10 flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-[#161514]">Clean French Micro-Tip</span>
                    <span className="text-neutral-800 font-semibold font-mono">From 750 kr · 90 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 2: STUDIO LOOKBOOK (Picnic Mat Accent Band: Warm Raw Travertine Stone #EFECE5) */}
        <section id="lookbook" className="bg-[#EFECE5] border-b border-[#DFDCD4] py-10 sm:py-16 scroll-mt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4">
            <div className="flex justify-between items-baseline px-1 border-b border-[#DFDCD4] pb-3">
              <div>
                <span className="font-serif text-base font-bold text-[#161514] block">
                  Studio Lookbook
                </span>
                <span className="text-xs text-neutral-600">Tap photo to enlarge details</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-600">
                6 Recent Sets
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
              {lookbookPhotos.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoModal(item.src)}
                  className="group relative aspect-[3/4] bg-white/60 rounded-xl overflow-hidden border border-[#D5D2CA] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-white text-xs font-serif leading-tight">
                      {item.title}
                    </span>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/95 text-[9px] font-medium text-neutral-800 border border-[#D5D2CA] shadow-xs">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BAND 3: RESERVATION DESK (Step 1 Treatment & Step 2 Shape with SVG SILHOUETTE ICONS) */}
        <section id="booking-flow" className="bg-[#FAF9F6] border-b border-black/10 py-10 sm:py-16 scroll-mt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <div className="flex items-center gap-2.5">
                <StudioKloLogo className="w-5 h-5 text-[#161514]" />
                <span className="font-serif text-base font-bold text-[#161514]">
                  RESERVE YOUR APPOINTMENT
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-500">Bygdin gate 4 · Frogner</span>
            </div>

            {!confirmed ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                {/* Step 1: Treatment Cards */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-black block">
                      Step 1 · Choose Treatment
                    </label>
                    <span className="text-[10px] text-neutral-500 font-mono">Includes cuticle cleansing</span>
                  </div>

                  <div className="space-y-2.5">
                    {NAIL_SERVICES.map((s) => {
                      const isSelected = selectedService.id === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setSelectedService(s)}
                          className={`p-3 sm:p-3.5 rounded-xl border-2 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            isSelected
                              ? "border-black bg-white ring-1 ring-black shadow-xs"
                              : "border-black/10 bg-white/60 hover:bg-white hover:border-black/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Photo thumbnail */}
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-black/10">
                              <Image
                                src={s.photo}
                                alt={s.name}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <h4 className="font-serif text-sm font-bold text-black">
                                  {s.name}
                                </h4>
                                {s.tag && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-200 text-neutral-800 font-medium">
                                    {s.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-600 leading-snug line-clamp-1">
                                {s.description}
                              </p>
                              <span className="text-[10px] text-neutral-400 font-mono block">
                                {s.duration}
                              </span>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="font-serif text-sm sm:text-base font-bold text-black block">
                              {s.price} kr
                            </span>
                            <span className={`text-[10px] font-medium ${isSelected ? "text-black font-bold" : "text-neutral-400"}`}>
                              {isSelected ? "Selected ✓" : "Tap to Select"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Nail Shape Preference with MATCHING SVG SILHOUETTES */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-black block">
                      Step 2 · Nail Shape Architecture
                    </label>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                      {selectedShape.name} Selected
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
                          className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between group active:scale-[0.98] cursor-pointer ${
                            isSelected
                              ? "border-black bg-white ring-1 ring-black shadow-xs"
                              : "border-black/10 bg-white/70 hover:bg-white hover:border-black/30"
                          }`}
                        >
                          {/* Matching Architectural Silhouette SVG */}
                          <div className="w-8 h-10 flex items-center justify-center mb-1.5 transition-transform group-hover:-translate-y-0.5">
                            <svg viewBox="0 0 40 44" className="w-7 h-9 overflow-visible">
                              <path
                                d={shape.svgPath}
                                fill={isSelected ? "#161514" : "rgba(22, 21, 20, 0.08)"}
                                stroke="#161514"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div>
                            <span className="font-serif text-xs font-bold block text-black leading-tight">
                              {shape.name}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono block mt-0.5">
                              {shape.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Date & Time Slot */}
                <div className="space-y-3 pt-2 border-t border-black/10">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-black block">
                    Step 3 · Date &amp; Time
                  </label>

                  {/* Day selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono">
                    {APPT_DATES.map((d) => {
                      const isSelected = selectedDate.full === d.full;
                      return (
                        <button
                          key={d.full}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className={`p-2.5 rounded-lg border text-center transition-all ${
                            isSelected
                              ? "bg-black text-white border-black font-bold shadow-xs"
                              : "bg-white/70 border-black/10 text-neutral-800 hover:bg-white hover:border-black/30"
                          }`}
                        >
                          <span className="text-[10px] block opacity-70">{d.day}</span>
                          <span className="text-sm font-bold block">{d.date}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Time slots */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`p-2 rounded-lg border text-center text-xs transition-all ${
                            isSelected
                              ? "border-black bg-neutral-200 font-bold text-black shadow-2xs"
                              : "border-black/10 bg-white/70 text-neutral-600 hover:bg-white hover:border-black/30"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Quiet Atmosphere Toggle */}
                <div className="p-3.5 rounded-xl border border-black/10 bg-white/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <FiVolumeX className="text-neutral-600 flex-shrink-0" size={16} />
                    <div>
                      <span className="font-serif text-xs font-bold text-black block">
                        Quiet Appointment
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        {silentAppt
                          ? "Requested: Pure peaceful relaxation without small talk."
                          : "Prefer no small talk? Tap to request a silent session."}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSilentAppt(!silentAppt)}
                    className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                      silentAppt
                        ? "bg-black text-white"
                        : "border border-black/20 bg-white text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {silentAppt ? "Enabled ✓" : "Enable"}
                  </button>
                </div>

                {/* Step 5: Client Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-1 font-mono">Your Name</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Mathilde"
                      className="w-full p-2.5 border border-black/15 rounded-lg bg-white text-black outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-1 font-mono">Mobile for Vipps / SMS</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+47 905 43 210"
                      className="w-full p-2.5 border border-black/15 rounded-lg bg-white text-black outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#161514] hover:bg-black text-white font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve Studio Chair · {selectedService.price} kr</span>
                  <FiArrowRight size={15} />
                </button>
              </form>
            ) : (
              /* Confirmed Studio Chair Pass (Smooth scroll target) */
              <motion.div
                id="confirmed-chair-pass"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-5 sm:p-6 rounded-2xl border-2 border-black bg-white space-y-4 font-mono text-xs shadow-sm"
              >
                <div className="flex justify-between items-start border-b border-black/10 pb-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <StudioKloLogo className="w-8 h-8 sm:w-10 sm:h-10 text-[#161514] flex-shrink-0" />
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold inline-block mb-1">
                        ● CHAIR CONFIRMED
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-black">
                        Studio Klō Reservation Pass
                      </h3>
                      <span className="text-neutral-500">Guest: {clientName}</span>
                    </div>
                  </div>
                  <span className="text-base font-bold text-black">
                    {selectedService.price} kr
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Treatment:</span>
                    <span className="font-semibold text-black">
                      {selectedService.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Shape:</span>
                    <span className="font-semibold text-black">
                      {selectedShape.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Date &amp; Time:</span>
                    <span className="font-semibold text-black">
                      {selectedDate.full} at {selectedTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Session Style:</span>
                    <span className="font-semibold text-black">
                      {silentAppt ? "Quiet Session (No small talk)" : "Standard 1-on-1"}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-black/10 bg-neutral-50 flex justify-between items-center text-[11px]">
                  <span className="text-neutral-600">Location: Bygdin gate 4, Frogner</span>
                  <span className="font-bold text-black">Studio Chair 1</span>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[10px] sm:text-[11px] text-neutral-500">SMS confirmation sent to {clientPhone}</span>
                  <button
                    type="button"
                    onClick={() => setConfirmed(false)}
                    className="text-black underline font-semibold hover:text-neutral-700"
                  >
                    Modify Booking
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* BAND 4: FOOTER (Deep Ink Charcoal Accent Band #161514) */}
        <footer className="bg-[#161514] text-[#FAF9F6] py-8 border-t border-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-2">
            <div className="flex justify-center items-center gap-2">
              <StudioKloLogo className="w-5 h-5 text-white" />
              <span className="font-serif font-bold text-white tracking-wider">STUDIO KLŌ</span>
            </div>
            <p className="font-mono text-[10px] sm:text-[11px] text-white/70">Bygdin gate 4, Frogner, 0257 Oslo · Tuesday – Saturday 10:00–18:00</p>
          </div>
        </footer>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoModal(null)}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <div className="relative max-w-lg w-full aspect-square rounded-xl overflow-hidden border border-white/20">
              <Image
                src={activePhotoModal}
                alt="Enlarged Nail Set"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black"
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
