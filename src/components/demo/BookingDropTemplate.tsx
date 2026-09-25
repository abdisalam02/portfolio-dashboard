"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
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
} from "react-icons/fi";
import DemoTopSwitcher from "@/components/demo/DemoTopSwitcher";
import {
  cakesDemoConfig,
  nailsDemoConfig,
  weddingDemoConfig,
  PaletteTheme,
  ServiceItem,
  LookbookItem,
} from "@/app/demo/demo-data";

interface BookingDropTemplateProps {
  niche?: "cakes" | "nails" | "wedding";
}

export default function BookingDropTemplate({ niche = "cakes" }: BookingDropTemplateProps) {
  const config =
    niche === "nails"
      ? nailsDemoConfig
      : niche === "wedding"
      ? weddingDemoConfig
      : cakesDemoConfig;
  const [activePalette, setActivePalette] = useState<PaletteTheme>(config.palettes[0]);
  const [paletteDockOpen, setPaletteDockOpen] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<ServiceItem>(config.services[0]);
  const [selectedDate, setSelectedDate] = useState(config.bookingConfig.dates[1]);
  const [selectedTime, setSelectedTime] = useState(config.bookingConfig.timeSlots[1]);
  const [customFieldText, setCustomFieldText] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientInstagram, setClientInstagram] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<LookbookItem | null>(null);

  const filteredServices =
    selectedCategory === "all"
      ? config.services
      : config.services.filter((s) => s.category === selectedCategory);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    const formEl = document.getElementById("booking-form-section");
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
      className="min-h-screen transition-colors duration-300 font-body relative pb-28"
      style={{
        backgroundColor: activePalette.bg,
        color: activePalette.text,
      }}
    >
      {/* ================= 1. DISCREET NOTICABLE TOP SWITCHER ================= */}
      <DemoTopSwitcher
        currentDemo={config.id}
        accentColor={activePalette.accent}
        borderColor={activePalette.border}
        textColor={activePalette.text}
        cardBg={activePalette.cardBg}
      />

      {/* Main Responsive Canvas */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-14 sm:space-y-16">
        
        {/* ================= 2. STUDIO BRAND HERO ================= */}
        <section className="text-center space-y-5 pt-2 max-w-xl mx-auto">
          {/* Logo Emblem */}
          <div className="flex justify-center pt-1">
            <div
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1.5 flex flex-col items-center justify-center transition-all shadow-sm"
              style={{
                backgroundColor: activePalette.cardBg,
                border: `1.5px solid ${activePalette.border}`,
              }}
            >
              {config.logoEmblem(activePalette.accent, activePalette.muted, activePalette.border)}
            </div>
          </div>

          {/* Typography Heading */}
          <div className="space-y-1.5">
            <h1
              className="text-2xl sm:text-4xl font-black tracking-[0.2em] uppercase"
              style={{
                fontFamily: config.fontFamilyHeading,
                color: activePalette.text,
              }}
            >
              {config.brandName}
            </h1>
            <p
              className="text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase"
              style={{ color: activePalette.muted }}
            >
              {config.brandSubtitle}
            </p>
          </div>

          {/* Studio Meta Badges */}
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
              <span>{config.location}</span>
            </span>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium"
              style={{
                backgroundColor: activePalette.cardBg,
                border: `1px solid ${activePalette.border}`,
                color: activePalette.text,
              }}
            >
              <span>{config.statusPill}</span>
            </span>

            <a
              href={config.instagramUrl}
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
              <span>{config.instagramHandle}</span>
            </a>
          </div>

          <p
            className="text-xs sm:text-sm font-body leading-relaxed max-w-md mx-auto pt-1"
            style={{ color: activePalette.muted }}
          >
            {config.brandDescription}
          </p>
        </section>

        {/* ================= 3. CURATED 6-PHOTO LOOKBOOK ================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3" style={{ borderColor: activePalette.border }}>
            <div>
              <span
                className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                style={{ color: activePalette.accent }}
              >
                Portfolio &amp; Lookbook
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                Recent Client Work
              </h2>
            </div>
            <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
              6-photo high-converting curation · Tap to inspect
            </p>
          </div>

          {/* 6-Photo Responsive Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {config.lookbook.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage(item)}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  border: `1px solid ${activePalette.border}`,
                  backgroundColor: activePalette.cardBg,
                }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] text-white font-mono flex items-center gap-1">
                      <FiMaximize2 size={11} /> Expand view
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 text-left">
                  <h3
                    className="text-xs sm:text-sm font-semibold truncate"
                    style={{ color: activePalette.text }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[10px] sm:text-[11px] font-mono truncate pt-0.5"
                    style={{ color: activePalette.muted }}
                  >
                    {item.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 4. TRANSPARENT PRICE LIST / MENU ================= */}
        <section id="services-menu" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3" style={{ borderColor: activePalette.border }}>
            <div>
              <span
                className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                style={{ color: activePalette.accent }}
              >
                Transparent Pricing
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                Services &amp; Pricing
              </h2>
            </div>
            <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
              All prices in NOK · No surprises at checkout
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {config.categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all"
                  style={{
                    backgroundColor: active ? activePalette.accent : activePalette.cardBg,
                    color: active ? activePalette.accentFg : activePalette.muted,
                    border: `1px solid ${active ? activePalette.accent : activePalette.border}`,
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {filteredServices.map((service) => {
              const isChosen = selectedService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className="p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all cursor-pointer relative flex flex-col justify-between"
                  style={{
                    backgroundColor: activePalette.cardBg,
                    border: `1.5px solid ${isChosen ? activePalette.accent : activePalette.border}`,
                    boxShadow: isChosen ? `0 4px 18px ${activePalette.border}` : "none",
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-medium"
                          style={{
                            backgroundColor: activePalette.tagBg,
                            color: activePalette.accent,
                          }}
                        >
                          {service.servings || service.leadTime}
                        </span>
                        <h3
                          className="text-sm sm:text-base font-bold pt-1 leading-snug"
                          style={{ color: activePalette.text }}
                        >
                          {service.name}
                        </h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span
                          className="text-base sm:text-lg font-black font-mono block"
                          style={{ color: activePalette.text }}
                        >
                          {service.price > 0 ? `${service.price.toLocaleString("no-NO")} kr` : "Complimentary"}
                        </span>
                        <span className="text-[10px] font-mono" style={{ color: activePalette.muted }}>
                          {service.leadTime}
                        </span>
                      </div>
                    </div>

                    <p
                      className="text-xs font-body leading-relaxed pt-1"
                      style={{ color: activePalette.muted }}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: activePalette.border }}>
                    <span style={{ color: isChosen ? activePalette.accent : activePalette.muted }}>
                      {isChosen ? "✓ Currently Selected" : "Tap to select"}
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-lg text-[11px] font-semibold transition-all"
                      style={{
                        backgroundColor: isChosen ? activePalette.accent : activePalette.tagBg,
                        color: isChosen ? activePalette.accentFg : activePalette.accent,
                      }}
                    >
                      {isChosen ? "Selected" : "Choose"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 5. 1-TAP BOOKING REQUEST FORM ================= */}
        <section id="booking-form-section" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b pb-3" style={{ borderColor: activePalette.border }}>
            <div>
              <span
                className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                style={{ color: activePalette.accent }}
              >
                1-Tap Reservation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                {config.bookingConfig.sectionTitle}
              </h2>
            </div>
            <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
              {config.bookingConfig.sectionSubtitle}
            </p>
          </div>

          {!bookingConfirmed ? (
            <form
              onSubmit={handleBookingSubmit}
              className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border space-y-6"
              style={{
                backgroundColor: activePalette.cardBg,
                borderColor: activePalette.border,
              }}
            >
              {/* Selected Service Banner */}
              <div
                className="p-3.5 sm:p-4 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-mono"
                style={{
                  backgroundColor: activePalette.tagBg,
                  borderColor: activePalette.border,
                }}
              >
                <div>
                  <span className="text-[10px] uppercase block tracking-wider" style={{ color: activePalette.muted }}>
                    Booking for:
                  </span>
                  <span className="font-bold" style={{ color: activePalette.text }}>
                    {selectedService.name}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-black text-sm sm:text-base" style={{ color: activePalette.accent }}>
                    {selectedService.price > 0 ? `${selectedService.price.toLocaleString("no-NO")} kr` : "Included"}
                  </span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                  1. {config.bookingConfig.dateLabel}
                </label>
                <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                  {config.bookingConfig.dates.map((d, i) => {
                    const isSelected = selectedDate.full === d.full;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        className="py-2.5 sm:py-3 px-1 rounded-xl text-center transition-all border flex flex-col items-center justify-center"
                        style={{
                          backgroundColor: isSelected ? activePalette.accent : activePalette.cardBg,
                          color: isSelected ? activePalette.accentFg : activePalette.text,
                          borderColor: isSelected ? activePalette.accent : activePalette.border,
                        }}
                      >
                        <span className="text-[10px] font-mono uppercase opacity-75">{d.day}</span>
                        <span className="text-base sm:text-lg font-black font-mono leading-none pt-0.5">{d.date}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                  2. {config.bookingConfig.timeLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {config.bookingConfig.timeSlots.map((slot, i) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className="py-2.5 px-2 rounded-xl text-center text-xs font-mono transition-all border truncate"
                        style={{
                          backgroundColor: isSelected ? activePalette.accent : activePalette.cardBg,
                          color: isSelected ? activePalette.accentFg : activePalette.text,
                          borderColor: isSelected ? activePalette.accent : activePalette.border,
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Niche Custom Notes Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: activePalette.text }}>
                  3. {config.bookingConfig.customLabel}
                </label>
                <input
                  type="text"
                  value={customFieldText}
                  onChange={(e) => setCustomFieldText(e.target.value)}
                  placeholder={config.bookingConfig.customPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none transition-colors"
                  style={{
                    backgroundColor: activePalette.bg,
                    borderColor: activePalette.border,
                    color: activePalette.text,
                  }}
                />
              </div>

              {/* Client Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Astrid Lindgren"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                    style={{
                      backgroundColor: activePalette.bg,
                      borderColor: activePalette.border,
                      color: activePalette.text,
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                    Phone Number (Vipps) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+47 912 34 567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                    style={{
                      backgroundColor: activePalette.bg,
                      borderColor: activePalette.border,
                      color: activePalette.text,
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono" style={{ color: activePalette.muted }}>
                    Instagram Handle (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="@yourhandle"
                    value={clientInstagram}
                    onChange={(e) => setClientInstagram(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none"
                    style={{
                      backgroundColor: activePalette.bg,
                      borderColor: activePalette.border,
                      color: activePalette.text,
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: activePalette.accent,
                    color: activePalette.accentFg,
                  }}
                >
                  <FiCheckCircle size={16} />
                  <span>Request Booking · {selectedService.price > 0 ? `${selectedService.price.toLocaleString("no-NO")} kr` : "Complimentary"}</span>
                </button>
                <p className="text-[10px] font-mono text-center pt-2" style={{ color: activePalette.muted }}>
                  {config.metaNotes}
                </p>
              </div>
            </form>
          ) : (
            /* ================= CONFIRMATION VOUCHER CARD ================= */
            <div
              className="p-6 sm:p-8 rounded-3xl border text-center space-y-5 animate-in fade-in duration-300"
              style={{
                backgroundColor: activePalette.cardBg,
                borderColor: activePalette.border,
              }}
            >
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: activePalette.tagBg, color: activePalette.accent }}>
                <FiCheck size={24} />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold" style={{ color: activePalette.accent }}>
                  Booking Request Received
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading" style={{ color: activePalette.text }}>
                  You&apos;re on the schedule, {clientName || "Friend"}!
                </h3>
                <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                  Confirmation ref: #{config.id.toUpperCase()}-{Math.floor(1000 + Math.random() * 9000)}
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div
                className="max-w-md mx-auto p-4 rounded-xl border text-left text-xs font-mono space-y-2"
                style={{
                  backgroundColor: activePalette.bg,
                  borderColor: activePalette.border,
                }}
              >
                <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                  <span style={{ color: activePalette.muted }}>Service:</span>
                  <span className="font-bold text-right" style={{ color: activePalette.text }}>{selectedService.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                  <span style={{ color: activePalette.muted }}>Date &amp; Time:</span>
                  <span className="font-bold" style={{ color: activePalette.text }}>{selectedDate.full} · {selectedTime}</span>
                </div>
                {customFieldText && (
                  <div className="flex justify-between border-b pb-2" style={{ borderColor: activePalette.border }}>
                    <span style={{ color: activePalette.muted }}>Notes:</span>
                    <span className="font-bold text-right truncate max-w-[200px]" style={{ color: activePalette.text }}>{customFieldText}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span style={{ color: activePalette.muted }}>Studio:</span>
                  <span className="font-bold" style={{ color: activePalette.accent }}>{config.locationDetails}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(false)}
                  className="px-5 py-2.5 rounded-xl border text-xs font-mono hover:opacity-80 transition-opacity"
                  style={{
                    borderColor: activePalette.border,
                    color: activePalette.text,
                    backgroundColor: activePalette.cardBg,
                  }}
                >
                  Make another test booking
                </button>
                <Link
                  href="/contact?package=the-booking-drop"
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm"
                  style={{
                    backgroundColor: activePalette.accent,
                    color: activePalette.accentFg,
                  }}
                >
                  <span>Build your site for 2,000 kr</span>
                  <FiArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* ================= 6. LIGHTBOX MODAL ================= */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border"
            style={{
              backgroundColor: activePalette.cardBg,
              borderColor: activePalette.border,
            }}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              aria-label="Close image"
            >
              <FiX size={18} />
            </button>

            <div className="relative aspect-[4/5] w-full bg-zinc-950">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>

            <div className="p-4 sm:p-5 text-left space-y-1">
              <h3 className="text-base font-bold" style={{ color: activePalette.text }}>
                {lightboxImage.title}
              </h3>
              <p className="text-xs font-mono" style={{ color: activePalette.muted }}>
                {lightboxImage.tag}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 7. FLOATING PALETTE SWITCHER DOCK ================= */}
      <div className="fixed bottom-4 right-4 z-40">
        {paletteDockOpen ? (
          <div
            className="p-3 rounded-2xl border shadow-xl backdrop-blur-md space-y-2 text-xs font-mono animate-in slide-in-from-bottom-2 duration-200"
            style={{
              backgroundColor: activePalette.cardBg,
              borderColor: activePalette.border,
              color: activePalette.text,
            }}
          >
            <div className="flex items-center justify-between pb-1 border-b" style={{ borderColor: activePalette.border }}>
              <span className="font-bold text-[11px] uppercase tracking-wider">Brand Palette</span>
              <button
                onClick={() => setPaletteDockOpen(false)}
                className="p-1 opacity-60 hover:opacity-100"
                aria-label="Close palette picker"
              >
                <FiX size={14} />
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {config.palettes.map((p) => {
                const isActive = activePalette.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePalette(p)}
                    className="w-full flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-left transition-all border"
                    style={{
                      backgroundColor: isActive ? p.tagBg : "transparent",
                      borderColor: isActive ? p.accent : "transparent",
                    }}
                  >
                    <div>
                      <span className="font-semibold block text-[11px]" style={{ color: p.text }}>
                        {p.name}
                      </span>
                      <span className="text-[9px]" style={{ color: p.muted }}>
                        {p.descriptor}
                      </span>
                    </div>
                    {/* Swatches */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.swatches[0] }} />
                      <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.swatches[1] }} />
                      <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.swatches[2] }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setPaletteDockOpen(true)}
            className="px-3.5 py-2 rounded-full border shadow-lg backdrop-blur-md text-xs font-mono font-semibold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: activePalette.cardBg,
              borderColor: activePalette.border,
              color: activePalette.text,
            }}
          >
            <FiSliders size={13} style={{ color: activePalette.accent }} />
            <span>Theme: {activePalette.name.split(" ")[0]}</span>
          </button>
        )}
      </div>

      {/* ================= 8. STICKY MOBILE BOOKING BAR ================= */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 border-t backdrop-blur-md p-3 sm:hidden transition-colors"
        style={{
          backgroundColor: `${activePalette.cardBg}F2`,
          borderColor: activePalette.border,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="truncate">
            <span className="text-[10px] font-mono block truncate" style={{ color: activePalette.muted }}>
              Selected Service
            </span>
            <span className="text-xs font-bold font-mono truncate block" style={{ color: activePalette.text }}>
              {selectedService.name}
            </span>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById("booking-form-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex-shrink-0 flex items-center gap-1 shadow-sm active:scale-95 transition-all"
            style={{
              backgroundColor: activePalette.accent,
              color: activePalette.accentFg,
            }}
          >
            <span>Book ({selectedService.price > 0 ? `${selectedService.price} kr` : "Free"})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
