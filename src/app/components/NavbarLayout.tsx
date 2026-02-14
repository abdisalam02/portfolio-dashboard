"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { cn } from "@/utils/cn";

export default function FloatingNavbar({ children }: { children: React.ReactNode }) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuContentRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);



  // Measure the menu content height for smooth CSS transition
  useEffect(() => {
    if (menuContentRef.current) {
      setMenuHeight(menuContentRef.current.scrollHeight);
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans selection:bg-cyan-500/30 selection:text-white">
      <header
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
        )}
      >
        {/* The Island Container - stays pill-shaped, just grows taller */}
        <div
          className={cn(
            "relative backdrop-blur-xl border shadow-lg overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "bg-white dark:bg-zinc-900 border-black/[0.08] dark:border-white/[0.08]",
            "rounded-[1.5rem] sm:rounded-full",
            mobileMenuOpen && "shadow-2xl !rounded-[1.5rem]"
          )}
        >
          {/* Top Bar - Always visible */}
          <div className="px-6 py-3 flex items-center justify-between relative z-20">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground relative z-10">
              Portfolio<span className="text-cyan-500">.</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:text-foreground hover:bg-foreground/5",
                      isActive ? "text-foreground bg-foreground/10 shadow-sm" : "text-foreground/60"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4 relative z-10">
              <div className="hidden md:block scale-90">
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors active:scale-90"
                aria-label="Toggle menu"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                >
                  {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                </motion.div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Content - Pure CSS height transition */}
          <div
            ref={menuContentRef}
            className="md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              maxHeight: mobileMenuOpen ? `${menuHeight}px` : "0px",
              opacity: mobileMenuOpen ? 1 : 0,
            }}
          >
            <div className="flex flex-col px-4 pb-5 pt-1">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-200 active:scale-[0.97]",
                      isActive
                        ? "bg-foreground text-background font-semibold"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                    )}
                    style={{
                      transitionDelay: mobileMenuOpen ? `${i * 30}ms` : "0ms",
                      transform: mobileMenuOpen ? "translateY(0)" : "translateY(-8px)",
                      opacity: mobileMenuOpen ? 1 : 0,
                      transition: `all 400ms cubic-bezier(0.32, 0.72, 0, 1) ${mobileMenuOpen ? i * 30 : 0}ms`,
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Divider + Theme Toggle */}
              <div
                className="border-t border-foreground/[0.06] mt-3 pt-3 px-2 flex items-center justify-between"
                style={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  transition: `opacity 400ms cubic-bezier(0.32, 0.72, 0, 1) ${mobileMenuOpen ? 180 : 0}ms`,
                }}
              >
                <span className="text-sm font-medium text-foreground/50">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32">{children}</main>
    </div>
  );
}
