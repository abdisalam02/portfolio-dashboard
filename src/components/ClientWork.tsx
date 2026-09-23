"use client";

import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import AutoScrollFrame from "./AutoScrollFrame";

interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  logoSrc: string;
  description: string;
  deliverables: string[];
  liveUrl: string;
  desktopFull: string;
  mobileImg: string;
}

const projects: Project[] = [
  {
    id: "noire",
    name: "by Gangina",
    category: "Tooth Gems & Custom Jewelry · Oslo",
    year: "2024 / 2025",
    logoSrc: "/showcase/noire/double-layer-star.png",
    description:
      "I designed and built an automated mobile booking site for an Oslo tooth gem studio, replacing messy Instagram DMs with a direct calendar and transparent service menu.",
    deliverables: ["Automated Booking Calendar", "Dynamic Treatment Menu", "Mobile-First Checkout"],
    liveUrl: "https://noire-rosy.vercel.app/",
    desktopFull: "/showcase/noire_fullpage_clean.png",
    mobileImg: "/showcase/noire_mobile.png",
  },
  {
    id: "grillz",
    name: "MNO.CRM",
    category: "Custom Grillz Atelier · Oslo",
    year: "2024",
    logoSrc: "/showcase/grillz/LOGO_CHROME_2.png",
    description:
      "A custom showcase for an independent grillz maker in Oslo, featuring interactive 3D pieces and a direct custom order pipeline.",
    deliverables: ["Real-Time 3D Model Inspection", "Direct Order Pipeline", "Custom Brand Identity"],
    liveUrl: "https://grillz-six.vercel.app/",
    desktopFull: "/showcase/grillz_fullpage_clean.png",
    mobileImg: "/showcase/grillz_mobile.png",
  },
];

export default function ClientWork() {
  return (
    <section id="work" className="py-20 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header - Clean, No AI Eyebrows */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-card-border gap-4">
        <div className="space-y-1.5">
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight uppercase">
            Live Projects
          </h2>
          <p className="text-xs text-muted/70 font-mono">
            These websites are currently under design and use placeholder images.
          </p>
        </div>
        <p className="text-xs sm:text-sm text-muted font-body max-w-xs sm:text-right">
          Recent websites I&apos;ve designed and built.
        </p>
      </div>

      {/* Projects Stack */}
      <div className="space-y-24 md:space-y-36">
        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            {/* Left Column: Human Business Story & Deliverables */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-2 lg:order-1">
              <div className="space-y-6">
                {/* Year & Category */}
                <div className="flex items-center gap-3 text-xs text-muted font-body">
                  <span>{project.year}</span>
                  <span className="w-1 h-1 rounded-full bg-card-border" />
                  <span>{project.category}</span>
                </div>

                {/* Brand Mark & Title */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-lg bg-card border border-card-border flex items-center justify-center p-1.5 flex-shrink-0">
                      <Image
                        src={project.logoSrc}
                        alt={`${project.name} mark`}
                        fill
                        sizes="32px"
                        className="object-contain p-1 filter drop-shadow"
                      />
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-foreground">
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Grounded Human Story */}
                <p className="text-base text-muted leading-relaxed font-body">
                  {project.description}
                </p>

                {/* Deliverables List (Editorial, Clean) */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono tracking-wider text-muted/80 uppercase block">
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-foreground text-background text-xs font-mono font-bold tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-md"
                >
                  <span>VISIT LIVE WEBSITE</span>
                  <FiArrowUpRight className="text-sm" />
                </a>
              </div>
            </div>

            {/* Right Column: Side-by-Side Dual Presentation with Native Smooth Auto-Scroll */}
            <div className="lg:col-span-7 order-1 lg:order-2">
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
                  <span className="text-muted leading-tight">Optimized for direct customer bookings on smartphones.</span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-foreground hover:underline pt-1 inline-flex items-center gap-1 text-[11px]"
                  >
                    Open live site ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
