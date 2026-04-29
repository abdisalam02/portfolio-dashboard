"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function BrutalistNavbar({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "INDEX" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/skills", label: "SKILLS" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 border-b-2 border-foreground bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold tracking-tighter hover:text-accent transition-colors">
            AG_PORTFOLIO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-4 text-xs font-bold tracking-widest border-l-2 border-foreground transition-colors ${
                    isActive
                      ? "bg-accent text-[#111]"
                      : "hover:bg-foreground hover:text-background"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="border-l-2 border-foreground px-4 py-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-xs font-bold tracking-widest border-2 border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            {mobileMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="fixed top-14 left-0 w-full z-40 bg-background border-b-2 border-foreground overflow-hidden"
          >
            <div className="flex flex-col">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-6 py-5 text-sm font-bold tracking-widest border-b border-foreground/20 transition-colors ${
                      isActive
                        ? "bg-accent text-[#111]"
                        : "hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="px-6 py-4 flex items-center justify-between border-b border-foreground/20">
                <span className="text-xs font-bold tracking-widest">THEME</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-14">{children}</main>
    </div>
  );
}
