"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import AutoScrollFrame from "./AutoScrollFrame";
import SadijaReelPreview from "./SadijaReelPreview";
import FlippingWordSwap from "./ui/flipping-word-swap";
import StackingCards, { StackingCardItem } from "./ui/stacking-cards";

interface Project {
  id: string;
  name: string;
  statusLabel: string;
  category: string;
  year: string;
  logoSrc: string;
  description: string;
  deliverables: string[];
  liveUrl: string;
  desktopFull: string;
  mobileImg: string;
  phoneReelOnly?: boolean;
}

const allProjects: Project[] = [
  {
    id: "sadija",
    name: "Sadija",
    statusLabel: "Live Project",
    category: "Creator Portfolio & Editorial Lookbook / Oslo",
    year: "2026",
    logoSrc: "/showcase/sadija/logo.png",
    description:
      "An editorial lookbook and mobile creator site built for Sadija. Designed specifically for vertical phone browsing to replace a standard bio link with a full visual archive, integrated media player, and direct brand inquiry flow.",
    deliverables: ["Mobile-First Lookbook", "Integrated YouTube & Spotify", "Direct Brand Inquiry"],
    liveUrl: "https://sadija.vercel.app/",
    desktopFull: "/showcase/sadija_fullpage_clean.png",
    mobileImg: "/showcase/sadija_mobile.png",
    phoneReelOnly: true,
  },
  {
    id: "noire",
    name: "Noire",
    statusLabel: "In development",
    category: "Tooth Gems & Custom Jewelry / Oslo",
    year: "2026",
    logoSrc: "/showcase/noire/double-layer-star.png",
    description:
      "I designed and built an automated mobile booking site for an Oslo tooth gem studio, replacing messy Instagram DMs with a direct calendar and clear service menu.",
    deliverables: ["Automated Booking Calendar", "Interactive Treatment Menu", "Mobile-First Checkout"],
    liveUrl: "https://noire-rosy.vercel.app/",
    desktopFull: "/showcase/noire_fullpage_clean.png",
    mobileImg: "/showcase/noire_mobile.png",
  },
  {
    id: "grillz",
    name: "Grillz",
    statusLabel: "In development",
    category: "Custom Grillz Atelier / Oslo",
    year: "2026",
    logoSrc: "/showcase/grillz/LOGO_CHROME_2.png",
    description:
      "A custom showcase for an independent grillz maker in Oslo, featuring interactive 3D pieces and a direct custom order pipeline.",
    deliverables: ["Real-Time 3D Model Inspection", "Direct Order Pipeline", "Custom Brand Identity"],
    liveUrl: "https://grillz-six.vercel.app/",
    desktopFull: "/showcase/grillz_fullpage_clean.png",
    mobileImg: "/showcase/grillz_mobile.png",
  },
];

interface ClientWorkProps {
  headingTitle?: string;
  showSadija?: boolean;
  isWorkPage?: boolean;
}

export default function ClientWork({
  headingTitle = "PROJECTS",
  showSadija = false,
  isWorkPage = false,
}: ClientWorkProps) {
  const visibleProjects = showSadija
    ? allProjects
    : allProjects.filter((p) => p.id !== "sadija");

  const countFormatted = `0${visibleProjects.length}`;

  return (
    <section id="work" className="py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Monumental Editorial Section Header with 3D Font-Flip on Title */}
      <div className="border-t border-b border-card-border py-8 sm:py-10 mb-8 md:mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex items-start gap-2 sm:gap-3 min-w-0 max-w-full flex-1">
            <h2 className="min-w-0 flex-1 text-[clamp(2.25rem,10vw,6.5rem)] font-black font-heading tracking-tighter leading-[0.88] text-foreground">
              <FlippingWordSwap word1={headingTitle} />
            </h2>
            <sup className="text-base sm:text-2xl font-mono font-bold text-accent pt-1 sm:pt-2 flex-shrink-0">
              {countFormatted}
            </sup>
          </div>

          <div className="max-w-md space-y-2 lg:text-right">
            <p className="text-sm sm:text-base text-foreground font-body leading-relaxed">
              {isWorkPage
                ? "Selected websites, booking engines, and mobile experiences designed and built from scratch in Oslo."
                : "Real websites I've built."}
            </p>
            {!isWorkPage && (
              <div>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:opacity-80 transition-opacity underline underline-offset-4"
                >
                  <span>View full archive including Sadija (03)</span>
                  <FiArrowUpRight size={13} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Dedicated /work page: three cards that stack as you scroll. Each slot is one card tall, so the effect adds about three card heights of scroll and no blank gap. Each card has its own layout: ledger, matrix, index. */}
        {isWorkPage && (
          <StackingCards totalCards={3} className="mt-8 pt-6 border-t border-card-border">
            {/* 01: ledger. Hollow index left, ruled list right, each row points at the site it came from. */}
            <StackingCardItem index={0} className="h-[15rem] sm:h-[12.5rem] pb-3 z-[1]">
              <div className="h-full p-4 sm:p-5 rounded-xl bg-card border border-card-border overflow-hidden grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8">
                <div className="sm:col-span-4 flex sm:flex-col items-center sm:items-start justify-between sm:justify-between">
                  <span
                    className="outline-index text-5xl sm:text-7xl font-black font-heading h-[1.05em] inline-flex items-center leading-none select-none text-accent"
                    aria-hidden="true"
                  >
                    01
                  </span>
                  <span className="font-mono text-[11px] text-muted uppercase tracking-wide">
                    What I build
                  </span>
                </div>
                <ul className="sm:col-span-8 divide-y divide-card-border font-body text-sm text-foreground/90">
                  {[
                    ["Custom websites", "From scratch"],
                    ["Booking calendars", "Noire"],
                    ["3D product showcases", "Grillz"],
                    ["Mobile-first bio sites", "Sadija"],
                  ].map(([what, where]) => (
                    <li key={what} className="flex items-baseline justify-between gap-3 py-1.5 first:pt-0 last:pb-0">
                      <span>{what}</span>
                      <span className="font-mono text-[11px] text-muted flex-shrink-0">{where}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StackingCardItem>

            {/* 02: matrix. Four ruled cells, one fact each. */}
            <StackingCardItem index={1} className="h-[15rem] sm:h-[12.5rem] pb-3 z-[2]">
              <div className="h-full rounded-xl bg-card border border-card-border overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-card-border">
                  <span className="font-mono text-[11px] text-muted uppercase tracking-wide">Approach</span>
                  <span
                    className="outline-index text-2xl font-black font-heading h-[1.05em] inline-flex items-center leading-none select-none text-accent"
                    aria-hidden="true"
                  >
                    02
                  </span>
                </div>
                <dl className="flex-1 grid grid-cols-2 sm:grid-cols-4 divide-x divide-card-border [&>div:nth-child(n+3)]:border-t sm:[&>div:nth-child(n+3)]:border-t-0 [&>div]:border-card-border">
                  {[
                    ["1-on-1", "Design and code, start to finish."],
                    ["No templates", "No page builders or generic themes."],
                    ["Light pages", "Fast load times, clean type."],
                    ["Yours", "You own the finished site and your content."],
                  ].map(([term, detail], i) => (
                    <div key={term} className="p-3 sm:p-4 flex flex-col justify-between gap-1">
                      <dt className="font-mono text-[11px] text-accent font-bold">
                        {String.fromCharCode(97 + i)} / {term}
                      </dt>
                      <dd className="font-body text-xs text-foreground/85 leading-snug">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </StackingCardItem>

            {/* 03: index. Inverted card so the stack ends on a solid block; rows jump to each project. */}
            <StackingCardItem index={2} className="h-[15rem] sm:h-[12.5rem] pb-3 z-[3]">
              <div className="h-full p-4 sm:p-5 rounded-xl bg-accent text-accent-fg overflow-hidden flex flex-col">
                <div className="flex items-center justify-between pb-2 border-b border-accent-fg/30">
                  <span className="font-mono text-[11px] uppercase tracking-wide opacity-80">Archive index</span>
                  <span className="font-mono text-[11px] opacity-80">03</span>
                </div>
                <div className="flex-1 flex flex-col justify-around">
                  {visibleProjects.map((p, i) => (
                    <a
                      key={p.id}
                      href={`#project-${p.id}`}
                      className="group flex items-center justify-between gap-3 py-1.5 border-b border-accent-fg/20 last:border-b-0"
                    >
                      <span className="flex items-baseline gap-3 min-w-0">
                        <span className="font-mono text-[11px] opacity-70">0{i + 1}</span>
                        <span className="font-body text-base font-bold truncate group-hover:underline underline-offset-4">
                          {p.name}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-mono text-[11px] opacity-70">{p.year}</span>
                        <span className="w-7 h-7 rounded-full border border-accent-fg/50 flex items-center justify-center group-hover:bg-accent-fg group-hover:text-accent transition-colors">
                          <FiArrowUpRight size={13} className="rotate-90" />
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </StackingCardItem>
          </StackingCards>
        )}
      </div>

      {/* Editorial Hairline Project Index Rows (Immediately Connected Below Header) */}
      <div className="divide-y divide-card-border border-b border-card-border">
        {visibleProjects.map((project, idx) => {
          const displayIndex = `0${idx + 1}`;
          return (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className="py-12 md:py-20 first:pt-2 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Left Column: Outlined Index Number, Human Story & Circular Action Button */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-2 lg:order-1">
                <div className="space-y-6">
                  {/* Outlined Index Number + Year/Category Row */}
                  <div className="flex items-baseline justify-between border-b border-card-border pb-4">
                    <span
                      className="outline-index text-5xl sm:text-6xl font-black font-heading h-[1.05em] inline-flex items-center leading-none select-none text-accent"
                      aria-hidden="true"
                    >
                      {displayIndex}
                    </span>
                    <div className="text-right">
                      <span className="text-xs font-mono text-accent font-bold block">
                        {project.year} / {project.statusLabel}
                      </span>
                      <span className="text-xs text-muted font-body">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Brand Mark, Title (with FlippingWordSwap) & Circular ↗ Launch Icon */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative w-9 h-9 rounded-lg bg-card border border-card-border flex items-center justify-center p-1.5 flex-shrink-0">
                        <Image
                          src={project.logoSrc}
                          alt={`${project.name} mark`}
                          fill
                          sizes="36px"
                          className="object-contain p-1"
                        />
                      </div>
                      <h3 className="min-w-0 flex-1 text-3xl sm:text-4xl font-black font-heading tracking-tight text-foreground">
                        <FlippingWordSwap word1={project.name} />
                      </h3>
                    </div>

                    {/* Circular 1px Launch Button */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full border border-accent text-accent hover:bg-accent hover:text-accent-fg transition-colors flex items-center justify-center flex-shrink-0"
                      title={`Open ${project.name} live site`}
                      aria-label={`Open ${project.name} live site`}
                    >
                      <FiArrowUpRight size={18} />
                    </a>
                  </div>

                  {/* Grounded Human Story */}
                  <p className="text-base text-muted leading-relaxed font-body">
                    {project.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono text-muted/80 block">
                      Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((item, i) => (
                        <span
                          key={i}
                          className="text-xs font-body px-3 py-1.5 rounded-lg bg-card border border-card-border text-foreground/90"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Link to Live App */}
                <div className="pt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-accent-fg text-xs font-mono font-bold hover:opacity-90 transition-all active:scale-95"
                  >
                    <span>VISIT LIVE WEBSITE</span>
                    <FiArrowUpRight className="text-sm" />
                  </a>
                </div>
              </div>

              {/* Right Column: Pure iPhone Mockup for Sadija, AutoScrollFrame for Desktop+Mobile sites */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                {project.phoneReelOnly ? (
                  <SadijaReelPreview />
                ) : (
                  <>
                    <AutoScrollFrame
                      imgSrc={project.desktopFull}
                      alt={`${project.name} full website`}
                      liveUrl={project.liveUrl}
                      domain={project.liveUrl.replace("https://", "")}
                      mobileImgSrc={project.mobileImg}
                    />

                    {/* On Mobile (< sm screens): Compact Mobile Highlight Card */}
                    <div className="sm:hidden mt-4 flex items-center gap-4 p-3 rounded-xl bg-card border border-card-border">
                      <div className="w-16 h-24 rounded-lg overflow-hidden border border-card-border bg-black relative flex-shrink-0">
                        <Image
                          src={project.mobileImg}
                          alt={`${project.name} mobile view`}
                          fill
                          sizes="64px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex flex-col space-y-1 text-xs">
                        <span className="font-bold text-foreground">Mobile-First Experience</span>
                        <span className="text-muted leading-tight">Built for direct customer actions on smartphones.</span>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-accent hover:underline pt-1 inline-flex items-center gap-1 text-[11px]"
                        >
                          Open live site ↗
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
