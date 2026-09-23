"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiArrowUpRight, FiArrowLeft, FiClock } from "react-icons/fi";

const tiers = [
  {
    index: "01",
    id: "booking-drop",
    name: "The Booking Drop",
    tagline: "Solo Artists, MUAs & Chair Renters",
    price: "4,000",
    currency: "kr",
    period: "flat rate · one-time",
    turnaround: "1 Week",
    description:
      "A fast, mobile-first booking site designed to replace messy Instagram DMs with automated client scheduling.",
    deliverables: [
      { code: "01 / INTERFACE", text: "Mobile-first booking site styled around your Instagram palette" },
      { code: "02 / SCHEDULER", text: "Direct integration with Timma, Fresha, Calendly, or WhatsApp" },
      { code: "03 / MENU", text: "Treatment & service menu with transparent prices and durations" },
      { code: "04 / OWNERSHIP", text: "100% full code & asset ownership. Zero monthly platform lock-ins" },
    ],
    example: {
      title: "Booking Drop",
      category: "Solo Artist / Chair Renter",
      note: "Dedicated mobile drop with 1-tap booking scheduler & service menu",
      isComingSoon: true,
    },
    cta: "Inquire — 4,000 kr",
    href: "/contact?package=booking-drop",
  },
  {
    index: "02",
    id: "studio",
    name: "The Studio",
    tagline: "Private Studios, Tattooists & Barbershops",
    price: "7,500",
    currency: "kr",
    period: "flat rate · one-time",
    turnaround: "1 – 2 Weeks",
    description:
      "A complete multi-section studio website with client galleries, studio policies, and local Oslo discovery.",
    deliverables: [
      { code: "01 / ARCHITECTURE", text: "Multi-section site: Services, About, Policies & Portfolio" },
      { code: "02 / GALLERY", text: "High-resolution before & after client showcase" },
      { code: "03 / DISCOVERY", text: "Google Maps integration and local Oslo search setup" },
      { code: "04 / POLICIES", text: "Deposits, aftercare instructions, and verified client reviews" },
    ],
    example: {
      title: "By Gangina",
      category: "Tooth Gems & Jewelry · Oslo",
      note: "Live multi-page studio showcase with automated booking calendar, treatment menu & policies",
      imgSrc: "/showcase/noire_mobile.png",
      liveUrl: "https://noire-rosy.vercel.app/",
      isComingSoon: false,
    },
    cta: "Inquire — 7,500 kr",
    href: "/contact?package=studio",
  },
  {
    index: "03",
    id: "flagship",
    name: "The Flagship",
    tagline: "Established Salons, Jewelry Ateliers & Brands",
    price: "12,500",
    currency: "kr",
    period: "flat rate · one-time",
    turnaround: "2 – 3 Weeks",
    description:
      "Magazine-grade digital flagship like MNO.CRM. Custom art direction, interactive showcases, and full launch.",
    deliverables: [
      { code: "01 / ART DIRECTION", text: "Bespoke editorial typography and luxury Scandinavian art direction" },
      { code: "02 / INTERACTION", text: "Interactive 3D piece inspection, video reel showcases, and custom motions" },
      { code: "03 / BRAND POLISH", text: "Complete brand aesthetic refinement and custom asset styling" },
      { code: "04 / SETUP INCLUDED", text: "Custom .no domain registration, business email setup, and priority launch" },
    ],
    example: {
      title: "MNO.CRM",
      category: "Custom Grillz Atelier · Oslo",
      note: "Interactive 3D model inspection, custom direct order pipeline, and chrome identity",
      imgSrc: "/showcase/grillz_mobile.png",
      liveUrl: "https://grillz-six.vercel.app/",
      isComingSoon: false,
    },
    cta: "Inquire — 12,500 kr",
    href: "/contact?package=flagship",
  },
];

const addOns = [
  {
    label: "Custom Domain & DNS Setup",
    price: "800 kr",
    note: "Registration of .no or .com with professional DNS connection (Included in Flagship)",
  },
  {
    label: "Additional Dedicated Page",
    price: "1,500 kr",
    note: "Extra page such as Academy, Lookbook, or Aftercare Guide",
  },
  {
    label: "Cloud Hosting & Care",
    price: "249 kr / mo",
    note: "Optional ultra-fast cloud hosting, SSL padlock, and text/photo updates whenever you need",
  },
];

const faqs = [
  {
    q: "Do I actually own the website once you're done?",
    a: "Yes, 100%. All the code, design files, and domain are yours. There are no monthly platform fees and no lock-in contracts. If you ever want to move it somewhere else, you have total freedom.",
  },
  {
    q: "What if I already use Timma, Fresha, or take bookings via WhatsApp?",
    a: "I plug right into whatever you already use. If you use Timma or Fresha, clients tap directly into your calendar. If you prefer manual confirmation, I set up a 1-tap WhatsApp or booking form.",
  },
  {
    q: "Do I need to buy a domain before we start?",
    a: "No. If you already have one on Domeneshop or GoDaddy, I'll connect it. If not, I can register a clean .no or .com for you so you don't have to deal with DNS settings.",
  },
  {
    q: "How does payment and deposits work?",
    a: "50% upfront deposit to lock in your dates and start building, and the remaining 50% only when the website is live, tested on your phone, and you're completely happy with it.",
  },
  {
    q: "Can I update my prices or add services later?",
    a: "Yes. The code is built clean so text and pricing are easy to change. You can edit them yourself or just shoot me a quick text/DM and I'll update it for you.",
  },
  {
    q: "I don't have professional photos yet, can we still build?",
    a: "Definitely. We can pull high-res shots directly from your Instagram feed, use clean editorial typography, and add fresh photos whenever you have them.",
  },
];

export default function PricingPage() {
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

        {/* Editorial Section Header */}
        <div className="pb-10 md:pb-16 border-b border-card-border space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-muted">
            <span>[ RATES &amp; DELIVERABLES ]</span>
            <span className="w-1 h-1 rounded-full bg-card-border" />
            <span>OSLO 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight uppercase leading-[0.92]">
            Pricing &amp; Packages
          </h1>

          <p className="text-base sm:text-lg text-muted font-body max-w-2xl leading-relaxed pt-2">
            Straightforward flat rates for independent businesses and creatives in Oslo.
            Direct 1-on-1 development, no recurring retainers, and you own 100% of your website.
          </p>
        </div>

        {/* The 3 Core Tiers (Swiss Editorial Stacked Rows) */}
        <div className="divide-y divide-card-border">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start group"
            >
              {/* Left Column: Index, Title, Tagline, Price & Inquire */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-4 text-xs font-mono text-muted">
                  <span className="text-foreground font-bold">[{tier.index}]</span>
                  <span>{tier.tagline}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-muted">
                    <FiClock size={12} />
                    <span>{tier.turnaround}</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight uppercase text-foreground">
                    {tier.name}
                  </h2>
                  <p className="text-sm text-muted font-body leading-relaxed max-w-md">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-foreground">
                    {tier.price} {tier.currency}
                  </span>
                  <span className="text-xs font-mono text-muted uppercase">
                    {tier.period}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href={tier.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-xs font-mono font-bold tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-sm"
                  >
                    <span>{tier.cta.toUpperCase()}</span>
                    <FiArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Deliverables Specifications + Visual Example Strip */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                {/* Specifications Box */}
                <div className="bg-card/40 border border-card-border rounded-xl p-6 sm:p-7">
                  <div className="text-[11px] font-mono tracking-wider text-muted uppercase pb-3 mb-4 border-b border-card-border/60">
                    Deliverables &amp; Specifications
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {tier.deliverables.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-xs font-mono font-bold text-foreground tracking-wide">
                          {item.code}
                        </div>
                        <div className="text-xs text-muted font-body leading-relaxed">
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Live Example or Coming Soon Card */}
                {tier.example && (
                  <div className="bg-card/25 border border-card-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                    {tier.example.isComingSoon ? (
                      <div className="w-full sm:w-28 h-28 rounded-lg bg-background/80 border border-dashed border-card-border flex flex-col items-center justify-center p-3 text-center flex-shrink-0">
                        <span className="text-[10px] font-mono text-muted tracking-widest uppercase">
                          COMING SOON
                        </span>
                      </div>
                    ) : (
                      <div className="relative w-full sm:w-28 h-32 rounded-lg bg-black border border-card-border overflow-hidden flex-shrink-0 group/preview">
                        <Image
                          src={tier.example.imgSrc!}
                          alt={tier.example.title}
                          fill
                          sizes="120px"
                          className="object-cover object-top group-hover/preview:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-mono">
                        <span className="text-foreground font-bold tracking-wide uppercase">
                          {tier.example.title}
                        </span>
                        <span className="text-muted/50">•</span>
                        <span className="text-muted">{tier.example.category}</span>
                      </div>
                      <p className="text-xs text-muted font-body leading-relaxed">
                        {tier.example.note}
                      </p>
                      {!tier.example.isComingSoon && tier.example.liveUrl && (
                        <div className="pt-1">
                          <a
                            href={tier.example.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-foreground hover:underline"
                          >
                            <span>VIEW LIVE EXAMPLE</span>
                            <FiArrowUpRight size={12} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Short Connected Add-Ons Strip */}
        <div className="pt-10 pb-16 border-t border-card-border">
          <div className="text-xs font-mono tracking-wider text-muted uppercase mb-6 flex items-center gap-2">
            <span>A LA CARTE UPGRADES</span>
            <span className="w-1 h-1 rounded-full bg-card-border" />
            <span className="text-muted/60">Optional add-ons</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-card border border-card-border space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-1">
                    <span className="text-xs font-mono font-bold text-foreground">
                      {addon.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-foreground whitespace-nowrap">
                      {addon.price}
                    </span>
                  </div>
                  <p className="text-xs text-muted font-body leading-relaxed">
                    {addon.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agency Note (Concise, Grounded, Zero AI Bloat) */}
        <div className="py-12 px-6 sm:px-10 rounded-2xl bg-card border border-card-border mb-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="text-[11px] font-mono tracking-widest text-muted uppercase">
              Independent vs Agency
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight uppercase">
              No bloated retainers. No middlemen.
            </h3>
            <p className="text-sm text-muted font-body leading-relaxed">
              Agencies in Oslo easily charge 40,000+ kr with weeks of meetings and monthly contracts.
              I work directly with you 1-on-1, build your site in about a week, and charge a flat rate. You own your code 100%.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0 text-xs font-mono">
            <div className="px-4 py-2 rounded-lg bg-background border border-card-border text-foreground">
              ⚡ ~1 week turnaround
            </div>
            <div className="px-4 py-2 rounded-lg bg-background border border-card-border text-foreground">
              🤝 Direct 1-on-1 communication
            </div>
            <div className="px-4 py-2 rounded-lg bg-background border border-card-border text-foreground">
              📦 100% your code &amp; domain
            </div>
          </div>
        </div>

        {/* Casual FAQs */}
        <div className="space-y-10">
          <div className="border-b border-card-border pb-6 space-y-1">
            <div className="text-[11px] font-mono tracking-widest text-muted uppercase">
              Common Questions
            </div>
            <h3 className="text-3xl sm:text-4xl font-black font-heading tracking-tight uppercase">
              Frequently Asked
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-base font-bold font-heading text-foreground">
                  {faq.q}
                </h4>
                <p className="text-sm text-muted font-body leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Direct Inquiry Callout */}
        <div className="mt-20 pt-12 border-t border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-black font-heading uppercase text-foreground">
              Ready to build your site?
            </h4>
            <p className="text-xs sm:text-sm text-muted font-body">
              Drop an inquiry with your Instagram handle or email <span className="font-mono text-foreground">hello@abdisalam.space</span> directly.
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
