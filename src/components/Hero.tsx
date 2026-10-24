"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import InkSignature from "./InkSignature";

export default function Hero() {
  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-dvh flex flex-col justify-between pt-28 pb-8 sm:pt-36 sm:pb-10 md:pt-40 md:pb-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Main Typographic Core: Larger Handwritten Ink Signature */}
      <div className="flex flex-col space-y-8 md:space-y-10 my-auto">
        <div className="space-y-4 sm:space-y-5">
          <h1>
            <span className="sr-only">A. Gure</span>
            <InkSignature size="hero" replayEveryScroll={true} />
          </h1>

          <div className="flex items-center gap-2.5 pt-1">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <p className="text-xs sm:text-sm font-mono text-foreground/85">
              WEB DEVELOPER &amp; DESIGNER / OSLO
            </p>
          </div>
        </div>

        {/* Human Casual Statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl"
        >
          <p className="text-base sm:text-lg md:text-xl text-muted font-body leading-relaxed">
            I build and redesign websites.
          </p>
        </motion.div>

        {/* Direct Actions Using Palette Accent + Surface Colors */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <a
            href="#work"
            onClick={scrollToWork}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-accent-fg text-xs font-mono font-bold hover:opacity-90 transition-all active:scale-95"
          >
            <span>VIEW WORK</span>
            <FiArrowDown className="text-sm" />
          </a>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-card border border-card-border text-foreground text-xs font-mono hover:border-accent transition-all active:scale-95"
          >
            <span>ALL PROJECTS (03)</span>
            <FiArrowUpRight className="text-sm text-accent" />
          </Link>
        </motion.div>
      </div>

      {/* Subtle bottom hint indicating to scroll down */}
      <div className="flex items-center justify-between text-[11px] font-mono text-muted/70 pt-4 border-t border-card-border">
        <span>SCROLL TO EXPLORE</span>
        <FiArrowDown className="text-accent" />
      </div>
    </section>
  );
}
