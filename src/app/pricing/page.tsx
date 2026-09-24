"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FiArrowUpRight,
  FiArrowLeft,
  FiClock,
  FiInstagram,
  FiLayers,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function PricingPage() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const toggleTier = (id: string) => {
    setExpandedTier(expandedTier === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />

      <div className="pt-28 sm:pt-36 md:pt-40 pb-24 md:pb-32 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-colors"
          >
            <FiArrowLeft />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="pb-10 md:pb-16 border-b border-card-border space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-muted">
            <span>PRICING</span>
            <span className="w-1 h-1 rounded-full bg-card-border" />
            <span>OSLO 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight uppercase leading-[0.92]">
            Simple Pricing
          </h1>

          <p className="text-base sm:text-lg text-muted font-body max-w-2xl leading-relaxed pt-1">
            Clear prices for clean websites. No monthly fees, no agency fluff.
            Just fast sites that turn visitors into paying clients.
          </p>
        </div>

        {/* Tiers Container */}
        <div className="divide-y divide-card-border">
          {/* ================= TIER 1: THE BOOKING DROP ================= */}
          <div className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Summary & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-[11px] font-mono font-bold text-foreground">
                  <FiInstagram size={13} className="text-foreground flex-shrink-0" />
                  <span>FOR INSTAGRAM BUSINESSES &amp; SOLO ARTISTS</span>
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase text-foreground">
                  The Booking Drop
                </h2>
                <p className="text-sm text-muted font-body leading-relaxed max-w-md">
                  A 1-page mobile site to replace &quot;DM to book&quot; with a clean price list and 1-tap booking.
                </p>
              </div>

              {/* 1-Page Notice */}
              <div className="text-[11px] font-mono text-muted">
                <span>↳ 1-page site · Need extra pages? Check add-ons below</span>
              </div>

              {/* Price & Turnaround */}
              <div className="pt-1 space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-foreground">
                    2,000 kr
                  </span>
                  <span className="text-xs font-mono text-muted uppercase">
                    one-time
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted pt-1">
                  <FiClock size={13} />
                  <span>Turnaround: 48 to 72 hours</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href="/contact?package=booking-drop"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-xs font-mono font-bold tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-sm"
                >
                  <span>GET THIS — 2,000 KR</span>
                  <FiArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: What's included + Always visible Demo */}
            <div className="lg:col-span-7 space-y-5">
              {/* Short Core Points (Scannable, Not Overwhelming) */}
              <div className="bg-card/40 border border-card-border rounded-xl p-5 sm:p-6 space-y-4">
                <div className="text-xs font-mono font-bold text-foreground uppercase tracking-wider pb-2 border-b border-card-border/60">
                  What you get:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <FiCheck size={14} className="text-foreground mt-0.5 flex-shrink-0" />
                    <span><strong>1-Page Mobile Site:</strong> Styled to match your Instagram colors &amp; vibe.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck size={14} className="text-foreground mt-0.5 flex-shrink-0" />
                    <span><strong>Built-in Booking Form:</strong> Pick a service, select a date, and book directly (or link to Timma/Fresha).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck size={14} className="text-foreground mt-0.5 flex-shrink-0" />
                    <span><strong>Clear Price Menu:</strong> Stops people having to ask you &quot;how much?&quot; in DMs.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck size={14} className="text-foreground mt-0.5 flex-shrink-0" />
                    <span><strong>6-Photo Lookbook:</strong> Highlighting your best work or studio space.</span>
                  </div>
                </div>

                {/* View More Details Toggle */}
                <div className="pt-2 border-t border-card-border/60">
                  <button
                    type="button"
                    onClick={() => toggleTier("booking-drop")}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span>{expandedTier === "booking-drop" ? "Hide extra details" : "View more details"}</span>
                    {expandedTier === "booking-drop" ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                  </button>

                  {/* Expandable Extra Details */}
                  {expandedTier === "booking-drop" && (
                    <div className="mt-4 pt-3 border-t border-card-border/40 text-xs text-muted space-y-2 font-body leading-relaxed">
                      <p>
                        <strong>How it works:</strong> You send me your Instagram handle, your treatment/price list, 6 photos, and your booking preferences. I build your site in 2–3 days, you test it on your phone, and we launch.
                      </p>
                      <p>
                        <strong>Hosting &amp; Domain:</strong> Included with a fast online link ready to paste right into your bio. If you want your own custom address like <code>yourstudio.no</code>, I can set that up as an add-on.
                      </p>
                      <p>
                        <strong>Payment:</strong> 50% deposit before I start, 50% only when the site is live and you&apos;re completely happy.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Demo Box — ALWAYS VISIBLE OUTSIDE THE DETAILS TOGGLE */}
              <div className="bg-card/30 border border-card-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 hover:border-foreground/30 transition-colors">
                <div className="relative w-full sm:w-28 h-28 rounded-lg bg-black border border-card-border overflow-hidden flex-shrink-0">
                  <Image
                    src="/demo/cakes/cake-1.jpg"
                    alt="Maison Sucre Demo Preview"
                    fill
                    sizes="120px"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white font-bold">
                    LIVE DEMO
                  </div>
                </div>
                <div className="flex-1 space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono">
                    <span className="font-bold uppercase tracking-wider text-foreground">
                      Maison Sucre · Cake Studio
                    </span>
                    <span className="text-muted/60">•</span>
                    <span className="text-muted text-[11px]">2,000 kr Tier</span>
                  </div>
                  <p className="text-xs text-muted font-body leading-relaxed">
                    Test out the exact 1-page booking site I build for 2,000 kr. Try out the 4 live color themes, select a cake, tap past work photos to zoom, and test the ordering flow.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/tier-one-demo"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-foreground hover:underline"
                    >
                      <span>TEST LIVE DEMO</span>
                      <FiArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= TIER 2: THE STUDIO WEBSITE ================= */}
          <div className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Summary & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-card-border text-[11px] font-mono font-bold text-foreground">
                  <FiLayers size={13} className="text-foreground flex-shrink-0" />
                  <span>FOR STUDIOS, SALONS &amp; BIGGER PROJECTS</span>
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase text-foreground">
                  The Studio Website
                </h2>
                <p className="text-sm text-muted font-body leading-relaxed max-w-md">
                  Full custom websites with multiple pages, studio policies, booking calendars, and unique branding.
                </p>
              </div>

              {/* Scope Notice */}
              <div className="text-[11px] font-mono text-muted">
                <span>↳ Multi-page site · Custom design built around your brand</span>
              </div>

              {/* Price & Turnaround */}
              <div className="pt-1 space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-foreground">
                    5,500 – 12,500 kr
                  </span>
                  <span className="text-xs font-mono text-muted uppercase">
                    price range
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted pt-1">
                  <FiClock size={13} />
                  <span>Turnaround: 1 to 2 weeks</span>
                </div>
              </div>

              {/* How the price range works */}
              <div className="p-3.5 rounded-lg bg-card/60 border border-card-border/70 text-xs text-muted space-y-1 font-mono">
                <div className="font-bold text-foreground">How the price works:</div>
                <div>• Clean multi-page studio (like By Gangina): ~6,000 kr</div>
                <div>• Custom 3D flagship site (like MNO.CRM): ~12,500 kr</div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href="/contact?package=studio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-xs font-mono font-bold tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-sm"
                >
                  <span>TALK ABOUT YOUR PROJECT</span>
                  <FiArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: What's included + Always visible Real Examples */}
            <div className="lg:col-span-7 space-y-5">
              {/* Short Core Points */}
              <div className="bg-card/40 border border-card-border rounded-xl p-5 sm:p-6 space-y-4">
                <div className="text-xs font-mono font-bold text-foreground uppercase tracking-wider pb-2 border-b border-card-border/60">
                  What you get:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <FiCheck size={14} className="text-foreground mt-0.5 flex-shrink-0" />
                    <span><strong>Multi-Page Setup:</strong> Dedicated pages for Services, Story, Policies &amp; Booking.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck size={14} className="text-foreground mt-0.5 flex-shrink-0" />
                    <span><strong>Custom Booking Flow:</strong> Built-in calendar booking with confirmation emails.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck size={14} className="text-foreground mt-0.5 flex-shrink-0" />
                    <span><strong>Google Maps &amp; SEO:</strong> Set up so people in Oslo find you when searching.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck size={14} className="text-foreground mt-0.5 flex-shrink-0" />
                    <span><strong>Tailored Design:</strong> Custom typography, smooth animations, and zero templates.</span>
                  </div>
                </div>

                {/* View More Details Toggle */}
                <div className="pt-2 border-t border-card-border/60">
                  <button
                    type="button"
                    onClick={() => toggleTier("studio")}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span>{expandedTier === "studio" ? "Hide extra details" : "View more details"}</span>
                    {expandedTier === "studio" ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                  </button>

                  {/* Expandable Extra Details */}
                  {expandedTier === "studio" && (
                    <div className="mt-4 pt-3 border-t border-card-border/40 text-xs text-muted space-y-2 font-body leading-relaxed">
                      <p>
                        <strong>Standard Studio (~6,000 kr):</strong> Perfect if you have a private studio, salon chair, or clinic. Includes your treatment menu, cancellation policies, aftercare guides, Instagram photo lookbook, and direct booking system.
                      </p>
                      <p>
                        <strong>Custom Flagship (~12,500 kr):</strong> For luxury ataliers, jewelry makers, or fashion brands that need interactive 3D model inspection, custom order forms, and custom .no domain setup included.
                      </p>
                      <p>
                        <strong>Code &amp; Assets:</strong> You own everything 100%. No recurring fees unless you choose our monthly update service.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Real Project Demos — ALWAYS VISIBLE OUTSIDE THE DETAILS TOGGLE */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-muted uppercase tracking-wider">
                  Real websites I&apos;ve built:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* By Gangina */}
                  <div className="bg-card/30 border border-card-border rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-foreground/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-20 rounded-md bg-black border border-card-border overflow-hidden flex-shrink-0">
                        <Image
                          src="/showcase/noire_mobile.png"
                          alt="By Gangina"
                          fill
                          sizes="60px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <div className="text-[10px] font-mono text-muted uppercase">
                          Studio Tier (~6,000 kr)
                        </div>
                        <h4 className="text-sm font-bold font-heading uppercase text-foreground truncate">
                          By Gangina
                        </h4>
                        <p className="text-[11px] text-muted font-mono truncate">
                          Tooth Gems · Oslo
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted font-body leading-relaxed">
                      Multi-page studio booking site with automated calendar, treatment menu &amp; policies.
                    </p>

                    <div className="pt-1 border-t border-card-border/50">
                      <a
                        href="https://noire-rosy.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-foreground hover:underline font-bold"
                      >
                        <span>OPEN WEBSITE</span>
                        <FiArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>

                  {/* MNO.CRM */}
                  <div className="bg-card/30 border border-card-border rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-foreground/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-20 rounded-md bg-black border border-card-border overflow-hidden flex-shrink-0">
                        <Image
                          src="/showcase/grillz_mobile.png"
                          alt="MNO.CRM"
                          fill
                          sizes="60px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <div className="text-[10px] font-mono text-muted uppercase">
                          Flagship Tier (~12,500 kr)
                        </div>
                        <h4 className="text-sm font-bold font-heading uppercase text-foreground truncate">
                          MNO.CRM
                        </h4>
                        <p className="text-[11px] text-muted font-mono truncate">
                          Custom Grillz · Oslo
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted font-body leading-relaxed">
                      Custom 3D model piece inspection, direct client order system, and chrome identity.
                    </p>

                    <div className="pt-1 border-t border-card-border/50">
                      <a
                        href="https://grillz-six.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-foreground hover:underline font-bold"
                      >
                        <span>OPEN WEBSITE</span>
                        <FiArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="pt-12 pb-16 border-t border-card-border">
          <div className="space-y-1 mb-6">
            <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-foreground">
              Add-ons
            </h3>
            <p className="text-xs font-mono text-muted">
              Extra stuff you can add to any website
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Payment Addon */}
            <div className="p-5 rounded-xl bg-card border border-card-border space-y-2 hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between gap-2 pb-1">
                <span className="text-xs font-mono font-bold text-foreground">
                  Deposit Payments (Vipps / Cards)
                </span>
                <span className="text-xs font-mono font-bold text-foreground whitespace-nowrap px-2 py-0.5 rounded bg-background border border-card-border">
                  +1,200 kr
                </span>
              </div>
              <p className="text-xs text-muted font-body leading-relaxed">
                Take deposits when clients book so they actually show up. Supports Vipps, Apple Pay, and cards.
              </p>
            </div>

            {/* Admin page */}
            <div className="p-5 rounded-xl bg-card border border-card-border space-y-2 hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between gap-2 pb-1">
                <span className="text-xs font-mono font-bold text-foreground">
                  Admin Page to Manage Hours
                </span>
                <span className="text-xs font-mono font-bold text-foreground whitespace-nowrap px-2 py-0.5 rounded bg-background border border-card-border">
                  +1,500 kr
                </span>
              </div>
              <p className="text-xs text-muted font-body leading-relaxed">
                A private login page where you can block off days, change your available hours, and view bookings.
              </p>
            </div>

            {/* Extra page */}
            <div className="p-5 rounded-xl bg-card border border-card-border space-y-2 hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between gap-2 pb-1">
                <span className="text-xs font-mono font-bold text-foreground">
                  Extra Dedicated Page
                </span>
                <span className="text-xs font-mono font-bold text-foreground whitespace-nowrap px-2 py-0.5 rounded bg-background border border-card-border">
                  +800 kr
                </span>
              </div>
              <p className="text-xs text-muted font-body leading-relaxed">
                Add an extra page to the 2,000 kr site (e.g. Academy &amp; Courses, Studio Policies, or Aftercare).
              </p>
            </div>

            {/* Custom domain */}
            <div className="p-5 rounded-xl bg-card border border-card-border space-y-2 hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between gap-2 pb-1">
                <span className="text-xs font-mono font-bold text-foreground">
                  Custom Domain (.no or .com)
                </span>
                <span className="text-xs font-mono font-bold text-foreground whitespace-nowrap px-2 py-0.5 rounded bg-background border border-card-border">
                  +600 kr
                </span>
              </div>
              <p className="text-xs text-muted font-body leading-relaxed">
                I register and connect your custom web address so you never have to deal with DNS settings.
              </p>
            </div>

            {/* Monthly updates */}
            <div className="p-5 rounded-xl bg-card border border-card-border space-y-2 hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between gap-2 pb-1">
                <span className="text-xs font-mono font-bold text-foreground">
                  Monthly Updates
                </span>
                <span className="text-xs font-mono font-bold text-foreground whitespace-nowrap px-2 py-0.5 rounded bg-background border border-card-border">
                  +250 kr / mo
                </span>
              </div>
              <p className="text-xs text-muted font-body leading-relaxed">
                Text or DM me anytime you want to change prices, add treatments, or swap photos.
              </p>
            </div>
          </div>
        </div>

        {/* Why work with me */}
        <div className="py-10 px-6 sm:px-10 rounded-2xl bg-card border border-card-border mb-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="text-[11px] font-mono text-muted uppercase">
              Why work with me?
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight uppercase">
              No middleman. Direct 1-on-1 building.
            </h3>
            <p className="text-sm text-muted font-body leading-relaxed">
              I&apos;m 24, I work solo, and I talk straight. Agencies in Oslo charge 40,000+ kr and hand you off to account managers for weeks. When you work with me, we talk directly, we build in days, and you own everything 100%.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0 text-xs font-mono">
            <div className="px-4 py-2 rounded-lg bg-background border border-card-border text-foreground">
              ⚡ 48h to 1 week turnaround
            </div>
            <div className="px-4 py-2 rounded-lg bg-background border border-card-border text-foreground">
              🤝 Direct 1-on-1 contact
            </div>
            <div className="px-4 py-2 rounded-lg bg-background border border-card-border text-foreground">
              📦 100% your code &amp; domain
            </div>
          </div>
        </div>

        {/* Casual FAQs */}
        <div className="space-y-10">
          <div className="border-b border-card-border pb-6 space-y-1">
            <div className="text-[11px] font-mono text-muted uppercase">
              Good to know
            </div>
            <h3 className="text-3xl sm:text-4xl font-black font-heading tracking-tight uppercase">
              Common Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="space-y-2">
              <h4 className="text-base font-bold font-heading text-foreground">
                How does payment work?
              </h4>
              <p className="text-sm text-muted font-body leading-relaxed">
                50% deposit before I start building, and the remaining 50% only when the website is live, tested on your phone, and you&apos;re completely happy with it.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold font-heading text-foreground">
                What if I already use Timma, Fresha, or WhatsApp?
              </h4>
              <p className="text-sm text-muted font-body leading-relaxed">
                I connect directly to whatever you already use. If you use Timma or Fresha, one tap puts clients right into your calendar. If you like manual confirmation, I set up a direct WhatsApp or Vipps button.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold font-heading text-foreground">
                Do I need photos ready before we start?
              </h4>
              <p className="text-sm text-muted font-body leading-relaxed">
                Not necessarily. Just send me what you have on your Instagram feed or camera roll. I&apos;ll pick the best shots, crop them clean, and style them to look high-end.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold font-heading text-foreground">
                Can I change my prices or add services later?
              </h4>
              <p className="text-sm text-muted font-body leading-relaxed">
                Yes, anytime. The code is built clean so text and prices are simple to change. You can do it yourself or just shoot me a quick text and I&apos;ll update it for you.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold font-heading text-foreground">
                Do I actually own the website once it&apos;s done?
              </h4>
              <p className="text-sm text-muted font-body leading-relaxed">
                Yes, 100%. All the code, design, and domain are yours. There are no monthly platform fees and no lock-in contracts.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold font-heading text-foreground">
                How do online deposits and Vipps work?
              </h4>
              <p className="text-sm text-muted font-body leading-relaxed">
                We can add automatic card/Vipps deposits through Stripe for +1,200 kr. Or, if you want zero transaction fees, I can set up a direct Vipps payment prompt on the booking form with your Vipps number.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-20 pt-12 border-t border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-black font-heading uppercase text-foreground">
              Ready to get your website up?
            </h4>
            <p className="text-xs sm:text-sm text-muted font-body">
              Drop a message with your Instagram handle or email <span className="font-mono text-foreground">hello@abdisalam.space</span> directly.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-xs font-mono font-bold tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-sm"
            >
              <span>GET IN TOUCH</span>
              <FiArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
