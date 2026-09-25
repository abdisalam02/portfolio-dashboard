"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

interface DemoTopSwitcherProps {
  currentDemo: "cakes" | "nails" | "wedding";
  accentColor?: string;
  borderColor?: string;
  textColor?: string;
  cardBg?: string;
}

export default function DemoTopSwitcher({
  currentDemo,
  accentColor,
  borderColor,
  textColor,
  cardBg,
}: DemoTopSwitcherProps) {
  return (
    <nav
      aria-label="Demo suite navigation"
      className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: cardBg ? `${cardBg}E6` : "rgba(255, 255, 255, 0.88)",
        borderColor: borderColor || "rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-6 h-12 flex items-center justify-between gap-2 text-xs font-mono">
        {/* Back Link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0 text-[11px] sm:text-xs"
          style={{ color: textColor || "#141416" }}
          title="Back to A.Gure pricing"
        >
          <FiArrowLeft size={13} />
          <span>Back to Pricing</span>
        </Link>

        {/* Center Breadcrumb Pill */}
        <div className="hidden sm:flex items-center gap-2">
          <span
            className="text-[10px] uppercase tracking-widest font-mono opacity-60"
            style={{ color: textColor || "#141416" }}
          >
            Tier 1 Client Showcase
          </span>
          <span className="opacity-30">/</span>
          <span
            className="text-[10px] uppercase tracking-wider font-mono font-bold"
            style={{ color: accentColor || "#141416" }}
          >
            {currentDemo === "cakes"
              ? "Maison Sucre (Bakery)"
              : currentDemo === "nails"
              ? "Studio Klō (Nails)"
              : "Astrid Bridal (Wedding)"}
          </span>
        </div>

        {/* Tier Indicator Pill */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <span
            className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold border shadow-xs"
            style={{
              borderColor: borderColor || "rgba(0, 0, 0, 0.12)",
              color: accentColor || "#141416",
              backgroundColor: cardBg || "#FFFFFF",
            }}
          >
            2,000 kr · One-Time
          </span>
        </div>
      </div>
    </nav>
  );
}
