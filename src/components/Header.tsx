"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ag_theme");
    if (saved === "light") {
      setIsLightMode(true);
      document.documentElement.classList.remove("theme-obsidian");
      document.documentElement.classList.add("theme-paper");
    } else {
      setIsLightMode(false);
      document.documentElement.classList.remove("theme-paper");
      document.documentElement.classList.add("theme-obsidian");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    if (next) {
      document.documentElement.classList.remove("theme-obsidian");
      document.documentElement.classList.add("theme-paper");
      localStorage.setItem("ag_theme", "light");
    } else {
      document.documentElement.classList.remove("theme-paper");
      document.documentElement.classList.add("theme-obsidian");
      localStorage.setItem("ag_theme", "dark");
    }
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
            ? "py-3 bg-background/90 backdrop-blur-xl border-b border-card-border"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand Name */}
          <Link
            href="/"
            className="flex flex-col group"
          >
            <span className="text-base sm:text-lg font-black tracking-tight font-heading group-hover:opacity-80 transition-opacity">
              A.GURE
            </span>
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
              Freelancer
            </span>
          </Link>

          {/* Desktop Nav Links & Theme Toggle */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-mono tracking-wider text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-full bg-card border border-card-border text-foreground hover:border-foreground transition-all flex items-center gap-1.5 text-xs font-mono"
              title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle theme"
            >
              {isLightMode ? <FiMoon size={13} /> : <FiSun size={13} className="text-amber-400" />}
              <span className="uppercase text-[10px] tracking-wider font-semibold">
                {isLightMode ? "DARK" : "LIGHT"}
              </span>
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-card border border-card-border text-foreground hover:border-foreground transition-colors flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {isLightMode ? <FiMoon size={17} /> : <FiSun size={17} className="text-amber-400" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-card border border-card-border text-foreground hover:border-foreground transition-colors"
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
            <div className="flex flex-col space-y-6 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-5xl font-black font-heading tracking-tight hover:text-muted transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-card-border">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-card-border text-foreground text-xs font-mono font-bold tracking-wider uppercase mb-2"
              >
                {isLightMode ? <FiMoon size={15} /> : <FiSun size={15} className="text-amber-400" />}
                <span>SWITCH TO {isLightMode ? "DARK MODE" : "LIGHT MODE"}</span>
              </button>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-foreground text-background text-xs font-mono font-bold tracking-wider"
              >
                <span>GET IN TOUCH</span>
                <FiArrowUpRight size={16} />
              </Link>

              <div className="text-center text-xs font-mono text-muted pt-2">
                hello@abdisalam.space
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
