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
  const [isHovered, setIsHovered] = useState(false);

  const navItems =
    currentDemo === "cakes"
      ? [
          { id: "brand-hero", num: "00", label: "Atelier", icon: FiCompass },
          { id: "lookbook-gallery", num: "01", label: "Vitrine", icon: FiImage },
          { id: "services-menu", num: "02", label: "La Carte", icon: FiBookOpen },
          { id: "booking-form-section", num: "03", label: "Commande", icon: FiShoppingBag },
        ]
      : currentDemo === "nails"
      ? [
          { id: "brand-hero", num: "00", label: "Studio 4B", icon: FiCompass },
          { id: "services-menu", num: "01", label: "Rates & Sets", icon: FiBookOpen },
          { id: "booking-form-section", num: "02", label: "Reserve Chair", icon: FiCalendar },
        ]
      : [
          { id: "brand-hero", num: "00", label: "Exhibition", icon: FiCompass },
          { id: "lookbook-gallery", num: "01", label: "Portfolio", icon: FiImage },
          { id: "services-menu", num: "02", label: "Suites", icon: FiBookOpen },
          { id: "booking-form-section", num: "03", label: "Inquire", icon: FiCalendar },
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
      {/* Desktop Floating Side Rail (Right Side) */}
      <nav
        aria-label="Section navigation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2.5 p-2 rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-300"
        style={{
          backgroundColor: `${palette.cardBg}EE`,
          borderColor: palette.border,
        }}
      >
        <div className="px-2 pt-1 pb-1 border-b w-full flex items-center justify-between gap-2" style={{ borderColor: palette.border }}>
          <span className="text-[9px] font-mono uppercase tracking-widest font-bold" style={{ color: palette.accent }}>
            Index
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
                className={`group flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl text-left transition-all cursor-pointer ${
                  isActive ? "shadow-xs" : "hover:bg-black/5"
                }`}
                style={{
                  backgroundColor: isActive ? palette.accent : "transparent",
                  color: isActive ? palette.accentFg : palette.text,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono font-bold"
                    style={{ color: isActive ? palette.accentFg : palette.muted }}
                  >
                    {item.num}
                  </span>
                  <span
                    className={`text-xs font-mono tracking-wide transition-all ${
                      isActive ? "font-bold" : "opacity-80 group-hover:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <Icon size={12} className={isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"} />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile / Tablet Floating Quick Traverse Pills (Subtle Bottom Floating Strip) */}
      <nav
        aria-label="Mobile section navigation"
        className="fixed bottom-16 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 flex xl:hidden items-center gap-1 p-1 rounded-full border backdrop-blur-md shadow-md max-w-[92vw] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          backgroundColor: `${palette.cardBg}F5`,
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
              className="px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider transition-all whitespace-nowrap"
              style={{
                backgroundColor: isActive ? palette.accent : "transparent",
                color: isActive ? palette.accentFg : palette.muted,
              }}
            >
              {item.num} {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
