"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* Desktop Nav Links */}
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg bg-card border border-card-border text-foreground hover:border-foreground transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer - Clean, Large Links, No Numbering */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-28 px-6 bg-[#08080a] md:hidden flex flex-col justify-between pb-12"
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
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-foreground text-background text-xs font-mono font-bold tracking-wider"
              >
                <span>GET IN TOUCH</span>
                <FiArrowUpRight size={16} />
              </Link>

              <div className="text-center text-xs font-mono text-muted pt-2">
                niwache12@gmail.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
