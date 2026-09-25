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
  const demos = [
    { id: "cakes", label: "Bakery", icon: "🎂", href: "/demo" },
    { id: "nails", label: "Nail Studio", icon: "💅", href: "/demo/nails" },
    { id: "wedding", label: "Wedding Florals", icon: "💍", href: "/demo/wedding" },
  ] as const;

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
          className="inline-flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity flex-shrink-0 text-[11px] sm:text-xs"
          style={{ color: textColor || "#141416" }}
          title="Back to A.Gure pricing"
        >
          <FiArrowLeft size={13} />
          <span className="hidden sm:inline">Pricing</span>
        </Link>

        {/* Demo Switcher Pills */}
        <div
          className="inline-flex items-center p-0.5 rounded-full border shadow-sm transition-all"
          style={{
            backgroundColor: cardBg || "#FFFFFF",
            borderColor: borderColor || "rgba(0, 0, 0, 0.12)",
          }}
        >
          {demos.map((d) => {
            const isActive = currentDemo === d.id;
            return (
              <Link
                key={d.id}
                href={d.href}
                className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all ${
                  isActive
                    ? "shadow-sm font-semibold scale-[1.02]"
                    : "opacity-60 hover:opacity-100 hover:scale-[1.01]"
                }`}
                style={{
                  backgroundColor: isActive
                    ? accentColor || "#141416"
                    : "transparent",
                  color: isActive
                    ? "#FFFFFF"
                    : textColor || "#141416",
                }}
              >
                <span className="text-[12px] leading-none">{d.icon}</span>
                <span className={isActive ? "inline" : "hidden xs:inline sm:inline"}>
                  {d.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Tier Indicator Pill */}
        <div className="flex-shrink-0">
          <span
            className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold border"
            style={{
              borderColor: borderColor || "rgba(0, 0, 0, 0.1)",
              color: accentColor || "#141416",
              backgroundColor: cardBg || "#FFFFFF",
            }}
          >
            2,000 kr
          </span>
        </div>
      </div>
    </nav>
  );
}
