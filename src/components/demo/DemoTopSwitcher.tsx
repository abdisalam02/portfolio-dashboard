"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { LuCroissant, LuSparkles } from "react-icons/lu";
import { GiDiamondRing } from "react-icons/gi";

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
  const demos = [
    { id: "cakes", short: "Bakery", brand: "Maison Sucre", icon: LuCroissant, href: "/demo" },
    { id: "nails", short: "Nails", brand: "Studio Klø", icon: LuSparkles, href: "/demo/nails" },
    { id: "wedding", short: "Wedding", brand: "Astrid Bridal", icon: GiDiamondRing, href: "/demo/wedding" },
  ] as const;

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: cardBg ? `${cardBg}F5` : "rgba(255, 255, 255, 0.94)",
        borderColor: borderColor || "rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="max-w-4xl mx-auto px-2.5 sm:px-6 h-11 sm:h-12 flex items-center justify-between gap-1.5 sm:gap-3 text-xs font-mono">
        {/* Left: Back Link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 opacity-75 hover:opacity-100 transition-opacity flex-shrink-0 text-[11px] sm:text-xs font-semibold"
          style={{ color: textColor || "#141416" }}
          title="Back to A.Gure pricing"
        >
          <FiArrowLeft size={12} className="flex-shrink-0" />
          <span className="hidden xs:inline">Pricing</span>
        </Link>

        {/* Center: Live Demo Switcher Tabs (Fitted for mobile screens) */}
        <div
          className="flex items-center gap-0.5 sm:gap-1 p-0.5 rounded-full border shadow-2xs overflow-hidden max-w-[210px] sm:max-w-none justify-center"
          style={{
            borderColor: borderColor || "rgba(0, 0, 0, 0.1)",
            backgroundColor: cardBg || "#FFFFFF",
          }}
        >
          {demos.map((d) => {
            const isActive = currentDemo === d.id;
            const Icon = d.icon;
            return (
              <Link
                key={d.id}
                href={d.href}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all whitespace-nowrap"
                style={{
                  backgroundColor: isActive ? (accentColor || "#141416") : "transparent",
                  color: isActive ? "#FFFFFF" : (textColor || "#141416"),
                  fontWeight: isActive ? 700 : 500,
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                <Icon size={11} className="flex-shrink-0" />
                <span className="hidden md:inline">{d.brand}</span>
                <span className="md:hidden">{d.short}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: Compact Pricing Badge */}
        <div className="flex-shrink-0 flex items-center">
          <Link
            href="/contact?package=the-booking-drop"
            className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold border hover:opacity-80 transition-opacity whitespace-nowrap shadow-2xs"
            style={{
              borderColor: borderColor || "rgba(0, 0, 0, 0.12)",
              color: accentColor || "#141416",
              backgroundColor: cardBg || "#FFFFFF",
            }}
          >
            2,000 kr
          </Link>
        </div>
      </div>
    </header>
  );
}


