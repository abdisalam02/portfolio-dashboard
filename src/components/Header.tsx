"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { applyPaletteAndFonts } from "./ThemeFontSwitcher";
import { runThemeTransition } from "./theme-transition";
import { TextRoll } from "./ui/text-roll";
import InkSignature from "./InkSignature";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const legalLink = { label: "Personvern", href: "/privacy" };

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [pulseIndex, setPulseIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Touch screens have no hover, so the drawer rolls one link at a time on a slow timer.
  // Only runs while the drawer is open so it costs nothing the rest of the time.
  useEffect(() => {
    if (!mobileMenuOpen || reduceMotion) return;
    let step = 0;
    let offTimer: number | undefined;
    const run = () => {
      setPulseIndex(step % navLinks.length);
      step += 1;
      offTimer = window.setTimeout(() => setPulseIndex(null), 1100);
    };
    const firstTimer = window.setTimeout(run, 700);
    const interval = window.setInterval(run, 3200);
    return () => {
      window.clearTimeout(firstTimer);
      window.clearInterval(interval);
      if (offTimer) window.clearTimeout(offTimer);
      setPulseIndex(null);
    };
  }, [mobileMenuOpen, reduceMotion]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ag_theme");
    if (saved === "dark") {
      setIsLightMode(false);
      document.documentElement.classList.remove("theme-paper");
      document.documentElement.classList.add("theme-obsidian");
    } else {
      setIsLightMode(true);
      document.documentElement.classList.remove("theme-obsidian");
      document.documentElement.classList.add("theme-paper");
    }

    // Stay in sync when the automatic roulette occasionally flips Dark / Light mode
    const onAutoModeChange = (e: Event) => {
      const custom = e as CustomEvent<{ isLightMode: boolean }>;
      if (custom.detail && typeof custom.detail.isLightMode === "boolean") {
        setIsLightMode(custom.detail.isLightMode);
      }
    };
    window.addEventListener("ag-auto-theme-mode-change", onAutoModeChange);
    return () =>
      window.removeEventListener("ag-auto-theme-mode-change", onAutoModeChange);
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextLight = !isLightMode;
    setIsLightMode(nextLight);
    localStorage.setItem("ag_theme", nextLight ? "light" : "dark");

    const savedPalette = localStorage.getItem("ag_wada_palette") || "00";
    const savedFont = localStorage.getItem("ag_font_pair") || "00";

    runThemeTransition(() => {
      applyPaletteAndFonts(savedPalette, savedFont, !nextLight);

      window.dispatchEvent(
        new CustomEvent("ag-manual-theme-toggle", {
          detail: { isLightMode: nextLight },
        })
      );
    }, { trigger: event.currentTarget });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-background/95 border-b border-card-border"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand Name (Fixed height box so font changes never shift the navbar) */}
          <Link
            href="/"
            className="flex flex-col group"
          >
            <span className="text-base sm:text-lg font-black tracking-tight font-heading h-[1.15em] leading-none inline-flex items-center group-hover:opacity-80 transition-opacity">
              A.GURE
            </span>
            <span className="text-[10px] font-mono text-muted leading-none mt-1">
              Oslo
            </span>
          </Link>

          {/* Desktop Nav Links & Light/Dark Toggle */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`text-xs font-mono transition-colors ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <TextRoll center>{link.label}</TextRoll>
                </Link>
              ))}
              <Link
                href={legalLink.href}
                aria-current={pathname === legalLink.href ? "page" : undefined}
                className="text-[10px] font-mono text-muted/70 hover:text-foreground transition-colors"
              >
                <TextRoll center>{legalLink.label}</TextRoll>
              </Link>
            </nav>

            {/* Light/Dark Variant Toggle for Active Palette */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-full bg-card border border-card-border text-foreground hover:border-accent transition-all flex items-center gap-1.5 text-xs font-mono"
              title={
                isLightMode
                  ? "Switch active palette to Dark Mode"
                  : "Switch active palette to Light Mode"
              }
              aria-label="Toggle palette light or dark mode"
            >
              {isLightMode ? (
                <FiMoon size={13} />
              ) : (
                <FiSun size={13} className="text-accent" />
              )}
              <span className="text-[10px] font-semibold">
                {isLightMode ? "DARK" : "LIGHT"}
              </span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-card border border-card-border text-foreground hover:border-accent transition-colors flex items-center justify-center"
              aria-label="Toggle palette light or dark mode"
            >
              {isLightMode ? (
                <FiMoon size={16} />
              ) : (
                <FiSun size={16} className="text-accent" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-card border border-card-border text-foreground hover:border-accent transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-28 px-6 bg-background md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col pt-4">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`block py-3 border-b border-card-border transition-colors ${
                    pathname === link.href ? "text-accent" : "text-foreground"
                  }`}
                >
                  <TextRoll
                    center
                    active={pulseIndex === idx}
                    className="text-5xl font-black font-heading uppercase tracking-tight"
                  >
                    {link.label}
                  </TextRoll>
                </Link>
              ))}

              <Link
                href={legalLink.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={pathname === legalLink.href ? "page" : undefined}
                className="pt-4 text-[11px] font-mono text-muted self-start"
              >
                <TextRoll center>{legalLink.label}</TextRoll>
              </Link>
            </div>

            {/* Translucent signature replaces the old theme/contact buttons so the drawer stays quiet */}
            <div className="flex justify-center opacity-35 pointer-events-none select-none">
              <InkSignature size="footer" replayEveryScroll={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
