"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";

export default function Hero() {
  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex flex-col justify-between pt-28 pb-8 sm:pt-36 sm:pb-10 md:pt-40 md:pb-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Main Typographic Core */}
      <div className="flex flex-col space-y-8 md:space-y-12 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black font-heading tracking-tighter leading-[0.88] uppercase text-foreground">
            A.GURE
          </h1>

          <p className="text-xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground/90 font-heading max-w-3xl">
            Web Developer &amp; Designer
          </p>
        </motion.div>

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

        {/* Direct Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <a
            href="#work"
            onClick={scrollToWork}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-xs font-mono font-bold tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-md"
          >
            <span>VIEW WORK</span>
            <FiArrowDown className="text-sm" />
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-card border border-card-border text-foreground text-xs font-mono tracking-wider hover:border-foreground transition-all active:scale-95"
          >
            <span>CONTACT ME</span>
            <FiArrowUpRight className="text-sm text-muted" />
          </Link>
        </motion.div>
      </div>

      {/* Subtle bottom hint indicating to scroll down */}
      <div className="flex items-center justify-between text-[11px] font-mono text-muted/60 pt-4 border-t border-card-border/40">
        <span>SCROLL TO EXPLORE</span>
        <FiArrowDown className="animate-bounce" />
      </div>
    </section>
  );
}
