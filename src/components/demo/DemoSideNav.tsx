"use client";

import React, { useState, useEffect } from "react";
import { FiShoppingBag, FiCalendar, FiBookOpen, FiImage, FiCompass, FiArrowUp } from "react-icons/fi";
import { PaletteTheme } from "@/app/demo/demo-data";

interface DemoSideNavProps {
  currentDemo: "cakes" | "nails" | "wedding";
  palette: PaletteTheme;
}

export default function DemoSideNav({ currentDemo, palette }: DemoSideNavProps) {
  const [activeSection, setActiveSection] = useState<string>("brand-hero");

  const navItems =
    currentDemo === "cakes"
      ? [
          { id: "brand-hero", label: "Atelier", icon: FiCompass },
          { id: "lookbook-gallery", label: "Vitrine", icon: FiImage },
          { id: "services-menu", label: "Menu", icon: FiBookOpen },
          { id: "booking-form-section", label: "Order", icon: FiShoppingBag },
        ]
      : currentDemo === "nails"
      ? [
          { id: "brand-hero", label: "Studio", icon: FiCompass },
          { id: "services-menu", label: "Services", icon: FiBookOpen },
          { id: "booking-form-section", label: "Reserve", icon: FiCalendar },
        ]
      : [
          { id: "brand-hero", label: "Studio", icon: FiCompass },
          { id: "lookbook-gallery", label: "Works", icon: FiImage },
          { id: "services-menu", label: "Suites", icon: FiBookOpen },
          { id: "booking-form-section", label: "Inquire", icon: FiCalendar },
        ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop / Tablet Floating Side Rail (Fixed to Right Edge) */}
      <nav
        aria-label="Section navigation"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-2 p-2 rounded-2xl border backdrop-blur-md shadow-xl transition-all duration-300"
        style={{
          backgroundColor: `${palette.cardBg}EE`,
          borderColor: palette.border,
        }}
      >
        <div className="px-2 pt-1 pb-1 border-b w-full flex items-center justify-between gap-2" style={{ borderColor: palette.border }}>
          <span className="text-[9px] font-mono uppercase tracking-widest font-bold opacity-60" style={{ color: palette.accent }}>
            Jump To
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[9px] font-mono hover:opacity-75 transition-opacity"
            style={{ color: palette.muted }}
            title="Scroll to Top"
          >
            <FiArrowUp size={10} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`group flex items-center justify-between gap-2.5 px-2.5 py-1.5 rounded-xl text-left transition-all cursor-pointer ${
                  isActive ? "shadow-2xs font-bold" : "hover:bg-black/5 opacity-75 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: isActive ? palette.accent : "transparent",
                  color: isActive ? palette.accentFg : palette.text,
                }}
              >
                <span className="text-xs font-mono tracking-wide">
                  {item.label}
                </span>
                <Icon size={11} className={isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"} />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Floating Side Micro-Pill (Fixed to Right Edge with Small Titles) */}
      <nav
        aria-label="Mobile section navigation"
        className="fixed right-1.5 top-1/2 -translate-y-1/2 z-30 flex sm:hidden flex-col items-end gap-1 p-1 rounded-xl border backdrop-blur-md shadow-lg"
        style={{
          backgroundColor: `${palette.cardBg}F2`,
          borderColor: palette.border,
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider transition-all shadow-2xs whitespace-nowrap"
              style={{
                backgroundColor: isActive ? palette.accent : "transparent",
                color: isActive ? palette.accentFg : palette.muted,
                fontWeight: isActive ? 700 : 500,
                border: isActive ? `1px solid ${palette.accent}` : "none",
              }}
              title={item.label}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}


