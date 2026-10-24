"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import AutoScrollFrame from "./AutoScrollFrame";
import SadijaReelPreview from "./SadijaReelPreview";

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
    <section id="work" className="py-20 md:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Monumental Editorial Section Header */}
      <div className="border-t border-b border-card-border py-8 sm:py-12 mb-12 md:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex items-start gap-2 sm:gap-3">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black font-heading tracking-tighter leading-[0.88] text-foreground">
              {headingTitle}
            </h2>
            <sup className="text-base sm:text-2xl font-mono font-bold text-accent pt-1 sm:pt-2">
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

        {/* Expanded Editorial Details Strip on the Dedicated /work Page */}
        {isWorkPage && (
          <div className="mt-8 pt-8 border-t border-card-border grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-xs">
            <div className="p-4 rounded-xl bg-card border border-card-border space-y-2">
              <span className="font-mono text-accent font-bold block">01 / WHAT I BUILD</span>
              <p className="font-body text-foreground/90 leading-relaxed">
                Custom websites, automated booking calendars, 3D product showcases, and mobile-first bio experiences built around how customers actually act on their phones.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-card-border space-y-2">
              <span className="font-mono text-accent font-bold block">02 / APPROACH</span>
              <p className="font-body text-foreground/90 leading-relaxed">
                1-on-1 design and code from start to finish. No bloated page builders or generic templates. Fast load times, clean typography, and direct ownership.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-card-border space-y-2">
              <span className="font-mono text-accent font-bold block">03 / ARCHIVE INDEX</span>
              <div className="flex flex-col space-y-1 font-mono pt-0.5">
                {visibleProjects.map((p, i) => (
                  <a
                    key={p.id}
                    href={`#project-${p.id}`}
                    className="flex items-center justify-between py-1 border-b border-card-border/60 hover:text-accent text-foreground/85 transition-colors"
                  >
                    <span>
                      0{i + 1} / {p.name}
                    </span>
                    <span className="text-accent">{p.year} ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editorial Hairline Project Index Rows */}
      <div className="divide-y divide-card-border border-b border-card-border">
        {visibleProjects.map((project, idx) => {
          const displayIndex = `0${idx + 1}`;
          return (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className="py-14 md:py-24 first:pt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Left Column: Outlined Index Number, Human Story & Circular Action Button */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-2 lg:order-1">
                <div className="space-y-6">
                  {/* Outlined Index Number + Year/Category Row */}
                  <div className="flex items-baseline justify-between border-b border-card-border pb-4">
                    <span
                      className="outline-index text-5xl sm:text-6xl font-black font-heading leading-none select-none text-accent"
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

                  {/* Brand Mark, Title & Circular ↗ Launch Icon */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-lg bg-card border border-card-border flex items-center justify-center p-1.5 flex-shrink-0">
                        <Image
                          src={project.logoSrc}
                          alt={`${project.name} mark`}
                          fill
                          sizes="36px"
                          className="object-contain p-1"
                        />
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-foreground">
                        {project.name}
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
