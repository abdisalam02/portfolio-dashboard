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
    <footer className="pt-20 md:pt-28 pb-14 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Direct Email Close + Handwritten Signature */}
      <div className="pb-14 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-4 min-w-0 flex-1 max-w-full">
          <p className="text-sm font-body text-muted">
            Direct email &amp; project inquiries
          </p>
          <h2 className="text-[clamp(1.6rem,6vw,4.5rem)] font-black font-heading tracking-tighter leading-[0.95] text-foreground max-w-full break-all sm:break-normal">
            <a
              href="mailto:hello@agure.space"
              className="hover:text-accent transition-colors"
            >
              <FlippingWordSwap word1="hello@agure.space" />
            </a>
          </h2>
          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-body">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-accent hover:opacity-75 transition-opacity underline underline-offset-4 font-medium"
            >
              <span>Project form</span>
              <FiArrowUpRight size={14} />
            </Link>
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

        {/* Scroll-Animated Ink Signature + Back to Top */}
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

      {/* Borderless Footer Navigation & Colophon */}
      <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-body text-muted">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="font-semibold text-foreground">A.Gure</span>
          <span>Oslo, Norway</span>
          <span>© 2026</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/work" className="hover:text-foreground transition-colors">
            Work
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Personvern
          </Link>
          <a
            href="https://www.linkedin.com/in/abdi-salam-qorane-gure-416766183/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/abdisalam02"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
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
