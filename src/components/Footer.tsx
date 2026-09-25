"use client";

import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-card-border py-14 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-card-border">
        {/* Brand & Location */}
        <div className="space-y-1">
          <span className="text-xl font-black font-heading tracking-tight text-foreground">
            A.GURE
          </span>
          <p className="text-sm text-muted font-body">
            Web Developer &amp; Designer · Oslo, Norway
          </p>
        </div>

        {/* Navigation & Contact Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-muted font-body">
          <Link href="/#work" className="hover:text-foreground transition-colors">
            Work
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
          <a
            href="https://github.com/abdisalam02"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abdi-salam-qorane-gure-416766183/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="mailto:hello@agure.space"
            className="hover:text-foreground transition-colors font-mono"
          >
            hello@agure.space
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-card border border-card-border text-foreground hover:border-foreground transition-colors ml-2"
            title="Back to Top"
            aria-label="Back to top"
          >
            <FiArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted font-body gap-4">
        <span>© {new Date().getFullYear()} A.Gure. All rights reserved.</span>
        <span>Oslo, Norway</span>
      </div>
    </footer>
  );
}
