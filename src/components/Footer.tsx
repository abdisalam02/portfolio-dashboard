"use client";

import Link from "next/link";
import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import LegalFooter from "@/components/LegalFooter";
import InkSignature from "@/components/InkSignature";
import FlippingWordSwap from "@/components/ui/flipping-word-swap";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-card-border pt-16 pb-14 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Bold Full-Width LET'S TALK + Scroll-Triggered Handwritten Signature (Re-runs every scroll) */}
      <div className="pb-14 border-b border-card-border flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-4 min-w-0 flex-1 max-w-full">
          <h2 className="text-[clamp(2.35rem,11vw,7.5rem)] font-black font-heading tracking-tighter leading-[0.88] text-foreground max-w-full">
            <FlippingWordSwap word1="LET'S TALK" />
          </h2>
          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-mono">
            <a
              href="mailto:hello@agure.space"
              className="inline-flex items-center gap-1.5 text-accent hover:opacity-75 transition-opacity border-b border-accent pb-0.5 font-bold"
            >
              <span>hello@agure.space</span>
              <FiArrowUpRight size={14} />
            </a>
            <a
              href="https://instagram.com/a.gure"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
            >
              <span>Instagram (@a.gure)</span>
              <FiArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Scroll-Animated Ink Signature (Replays Every Time You Scroll Down) + Back to Top */}
        <div className="flex items-end justify-between md:justify-end gap-6">
          <InkSignature size="footer" replayEveryScroll={true} />

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-card border border-card-border text-foreground hover:border-accent hover:text-accent transition-colors mb-2"
            title="Back to Top"
            aria-label="Back to top"
          >
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Compartmentalized 1px Hairline Footer Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 border-b border-l border-card-border text-xs font-mono text-muted bg-card/40">
        <div className="p-3.5 border-r border-t border-card-border font-bold text-foreground">
          A.Gure
        </div>
        <div className="p-3.5 border-r border-t border-card-border text-accent font-semibold">
          © 2026
        </div>
        <div className="p-3.5 border-r border-t border-card-border">
          Oslo, Norway
        </div>
        <a
          href="mailto:hello@agure.space"
          className="p-3.5 border-r border-t border-card-border hover:text-accent transition-colors truncate"
        >
          hello@agure.space
        </a>
        <Link
          href="/work"
          className="p-3.5 border-r border-t border-card-border hover:text-accent transition-colors"
        >
          Work
        </Link>
        <a
          href="https://www.linkedin.com/in/abdi-salam-qorane-gure-416766183/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 border-r border-t border-card-border hover:text-accent transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/abdisalam02"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 border-r border-t border-card-border hover:text-accent transition-colors"
        >
          GitHub
        </a>
      </div>

      <LegalFooter />

      {/* Skiper UI's free licence requires attribution; Fancy Components credited alongside */}
      <p className="pt-4 text-[10px] font-mono text-muted/70">
        Motion effects adapted from{" "}
        <a
          href="https://skiper-ui.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Skiper UI
        </a>{" "}
        and{" "}
        <a
          href="https://fancycomponents.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Fancy Components
        </a>
        .
      </p>
    </footer>
  );
}
