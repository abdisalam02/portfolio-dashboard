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

  // svh, not dvh: dvh re-measures as the mobile address bar collapses, resizing the hero and shifting everything below mid-scroll
  return (
    <section className="relative min-h-svh flex flex-col justify-between pt-28 pb-8 sm:pt-36 sm:pb-10 md:pt-40 md:pb-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Main Typographic Core: Larger Handwritten Ink Signature */}
      <div className="flex flex-col space-y-8 md:space-y-10 my-auto">
        <div className="space-y-4 sm:space-y-5">
          <h1>
            <span className="sr-only">A. Gure</span>
            <InkSignature size="hero" replayEveryScroll={true} />
          </h1>

          <p className="text-xs sm:text-sm font-body text-muted">
            Web developer &amp; designer, Oslo
          </p>
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

        {/* Direct Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center gap-6 pt-2"
        >
          <a
            href="#work"
            onClick={scrollToWork}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-fg text-sm font-body font-medium hover:opacity-90 transition-opacity active:scale-95"
          >
            <span>View work</span>
            <FiArrowDown className="text-sm" />
          </a>

          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-body text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-card-border hover:decoration-accent"
          >
            <span>All projects</span>
            <FiArrowUpRight className="text-sm text-accent" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
