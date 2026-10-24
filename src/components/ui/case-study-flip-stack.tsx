"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import FlippingWordSwap from "./flipping-word-swap";

export interface CaseStudyFlipItem {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags?: string[];
  links?: { label: string; href: string }[];
  surfaceVariant: "card" | "accent" | "contrasted";
}

interface CaseStudyFlipStackProps {
  items?: CaseStudyFlipItem[];
  className?: string;
}

const STUDIO_WORK_ITEMS: CaseStudyFlipItem[] = [
  {
    number: "01",
    eyebrow: "01 / WHAT I BUILD",
    title: "Custom websites, booking engines & mobile lookbooks",
    description:
      "Built around how customers actually act on their phones. Automated booking calendars, clear service menus, 3D product inspection, and editorial bio sites that replace messy DMs.",
    image: "/showcase/noire_fullpage_clean.png",
    imageAlt: "Noire custom booking engine preview",
    tags: ["Automated Booking", "Interactive Menus", "3D Product Views"],
    surfaceVariant: "card",
  },
  {
    number: "02",
    eyebrow: "02 / APPROACH",
    title: "1-on-1 design and code from start to finish in Oslo",
    description:
      "No bloated page builders or generic templates. Every layout, typography pairing, and scroll interaction is written from scratch for fast load times and direct client ownership.",
    image: "/showcase/grillz_fullpage_clean.png",
    imageAlt: "Grillz custom 3D showcase preview",
    tags: ["Zero Page Builders", "Mobile-First Speed", "Full Ownership"],
    surfaceVariant: "accent",
  },
  {
    number: "03",
    eyebrow: "03 / ARCHIVE INDEX",
    title: "Three selected builds ready to explore below",
    description:
      "Jump directly to any project in the index below to inspect the live mobile reel, desktop scroll, and deliverables.",
    image: "/showcase/sadija_mobile.png",
    imageAlt: "Sadija mobile lookbook preview",
    links: [
      { label: "01 / Sadija (Creator Lookbook)", href: "#project-sadija" },
      { label: "02 / Noire (Booking Studio)", href: "#project-noire" },
      { label: "03 / Grillz (3D Atelier)", href: "#project-grillz" },
    ],
    surfaceVariant: "contrasted",
  },
];

function FlipCard({
  item,
  index,
  total,
  progress,
  reduceMotion,
}: {
  item: CaseStudyFlipItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const end = Math.min(start + segment, 1);
  const entryStart = Math.max(0, start - segment);
  const entryEnd =
    index === 0 ? 0.0001 : Math.min(start, entryStart + segment * 0.7);

  // Last card stays in place at the end of the stack scroll so the transition into the project rows is natural
  const isLast = index === total - 1;
  const exitStart = start;
  const exitEnd = end;
  const stackedCardGap = Math.min(20, 60 / Math.max(total - 1, 1));
  const stackedOffset = index * stackedCardGap;
  const restingOffset = Math.min(index * 14, 36);
  const restingScale = 1 - Math.min(index * 0.015, 0.04);

  const exitYPercent = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion || isLast ? [0, 0] : [0, -116]
  );
  const exitStackOffset = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion || isLast ? [0, 0] : [0, stackedOffset]
  );
  const exitY = useMotionTemplate`calc(${exitYPercent}% + ${exitStackOffset}px)`;
  const rotateX = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion || isLast ? [0, 0] : [0, 22]
  );
  const entryScale = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [1, 1] : [restingScale, 1]
  );
  const entryY = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [0, 0] : [restingOffset, 0]
  );

  // Morph card colors to the active Sanzo Wada palette CSS variables
  const surfaceStyle =
    item.surfaceVariant === "accent"
      ? {
          backgroundColor: "var(--accent)",
          color: "var(--accent-fg)",
          borderColor: "var(--card-border)",
        }
      : item.surfaceVariant === "contrasted"
      ? {
          backgroundColor: "var(--fg)",
          color: "var(--bg)",
          borderColor: "var(--card-border)",
        }
      : {
          backgroundColor: "var(--card-bg)",
          color: "var(--fg)",
          borderColor: "var(--card-border)",
        };

  return (
    <motion.article
      className="absolute inset-x-0 top-0 h-[440px] sm:h-[420px] will-change-transform"
      style={{
        y: exitY,
        rotateX,
        zIndex: total - index,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <motion.div
        className="grid h-full overflow-hidden rounded-xl border border-card-border sm:grid-cols-[1.2fr_0.8fr] transition-colors duration-500"
        style={{
          ...surfaceStyle,
          y: entryY,
          scale: entryScale,
          transformOrigin: "50% 100%",
        }}
      >
        {/* Left Editorial Column */}
        <div className="flex min-w-0 flex-col justify-between p-6 sm:p-9">
          <div className="flex items-center justify-between border-b border-current/15 pb-3">
            <span className="outline-index text-3xl sm:text-4xl font-black font-heading leading-none">
              {item.number}
            </span>
            <span className="text-[11px] font-mono opacity-80">
              {item.eyebrow}
            </span>
          </div>

          <div className="my-auto py-4 space-y-3">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading leading-[0.98] tracking-tight">
              <FlippingWordSwap word1={item.title} />
            </h3>
            <p className="text-xs sm:text-sm font-body leading-relaxed opacity-85 max-w-xl">
              {item.description}
            </p>
          </div>

          {/* Bottom Tags or Archive Jump Links */}
          <div>
            {item.tags && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md border border-current/20 text-[11px] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {item.links && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg border border-current/25 hover:border-current text-[11px] font-mono flex items-center justify-between transition-colors"
                  >
                    <span className="truncate">{link.label}</span>
                    <span>↓</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Preview Image Window */}
        <div className="relative hidden sm:block m-4 ml-0 overflow-hidden rounded-lg border border-current/15 bg-black/40">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="400px"
            className="object-cover object-top"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

/**
 * Adapted from @componentry/case-study-flip-stack
 * Morphed to match A.Gure's editorial hairline aesthetic and live Sanzo Wada palette tokens.
 */
export function CaseStudyFlipStack({
  items = STUDIO_WORK_ITEMS,
  className = "",
}: CaseStudyFlipStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const safeItems = items.length > 0 ? items : STUDIO_WORK_ITEMS;

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
    restDelta: 0.0005,
  });

  const cardProgress = reduceMotion ? scrollYProgress : smoothProgress;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={stackRef}
        className="relative"
        style={{ height: `${safeItems.length * 72}vh` }}
      >
        <div className="sticky top-24 flex flex-col justify-center overflow-hidden py-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-3">
            <span>STUDIO OVERVIEW · SCROLL TO FLIP CARDS</span>
            <span>01 — 0{safeItems.length}</span>
          </div>

          <div className="relative mx-auto h-[455px] sm:h-[435px] w-full [perspective:900px]">
            {[...safeItems].reverse().map((item, reverseIndex) => {
              const index = safeItems.length - reverseIndex - 1;
              return (
                <FlipCard
                  key={`${item.number}-${index}`}
                  item={item}
                  index={index}
                  total={safeItems.length}
                  progress={cardProgress}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyFlipStack;
