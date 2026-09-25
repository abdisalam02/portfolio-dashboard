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
    { id: "cakes", label: "Bakery", brand: "Maison Sucre", icon: LuCroissant, href: "/demo" },
    { id: "nails", label: "Nails", brand: "Studio Klø", icon: LuSparkles, href: "/demo/nails" },
    { id: "wedding", label: "Wedding", brand: "Astrid Bridal", icon: GiDiamondRing, href: "/demo/wedding" },
  ] as const;

  return (
    <nav
      aria-label="Demo showcase header"
      className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: cardBg ? `${cardBg}F0` : "rgba(255, 255, 255, 0.92)",
        borderColor: borderColor || "rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-6 h-12 flex items-center justify-between gap-3 text-xs font-mono">
        {/* Back Link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0 text-[11px] sm:text-xs font-medium"
          style={{ color: textColor || "#141416" }}
          title="Back to A.Gure pricing"
        >
          <FiArrowLeft size={13} />
          <span>Pricing</span>
        </Link>

        {/* Center Client Example Switcher Tabs */}
        <div
          className="flex items-center gap-1 p-0.5 rounded-full border shadow-2xs"
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
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all"
                style={{
                  backgroundColor: isActive ? (accentColor || "#141416") : "transparent",
                  color: isActive ? "#FFFFFF" : (textColor || "#141416"),
                  fontWeight: isActive ? 700 : 500,
                  opacity: isActive ? 1 : 0.75,
                }}
              >
                <Icon size={12} />
                <span className="hidden sm:inline">{d.brand}</span>
                <span className="sm:hidden">{d.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Info Pill */}
        <div className="flex-shrink-0 flex items-center">
          <Link
            href="/contact?package=the-booking-drop"
            className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold border hover:opacity-80 transition-opacity"
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
    </nav>
  );
}

