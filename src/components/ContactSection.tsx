"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCopy, FiCheck, FiArrowUpRight, FiMail } from "react-icons/fi";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "hello@abdisalam.space";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-card-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Human Casual Invitation */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight uppercase">
            Got a project in mind?
          </h2>
          <p className="text-base sm:text-lg text-muted font-body max-w-xl leading-relaxed">
            Whether you need a new website, a redesign, or just want to chat, feel free to reach out.
          </p>
        </div>

        {/* Right Column: Direct Contact & Action */}
        <div className="lg:col-span-5 flex flex-col space-y-4 pt-2">
          <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-card-border bg-card/60">
            <span className="text-sm sm:text-base font-mono text-foreground truncate">
              {email}
            </span>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-card-border hover:border-foreground transition-colors text-xs font-mono text-foreground active:scale-95"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <FiCheck className="text-emerald-400" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <FiCopy />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>

          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-foreground text-background text-xs font-mono font-bold tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-md"
          >
            <FiMail />
            <span>SEND A MESSAGE</span>
            <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
