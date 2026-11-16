"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCopy, FiCheck, FiArrowUpRight, FiMail } from "react-icons/fi";
import FlippingWordSwap from "@/components/ui/flipping-word-swap";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "hello@agure.space";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Direct Inquiry Prompt */}
        <div className="lg:col-span-7 space-y-4 min-w-0 max-w-full overflow-hidden">
          <h2 className="text-[clamp(1.5rem,4.8vw,3.5rem)] font-black font-heading tracking-tight max-w-full overflow-hidden">
            <FlippingWordSwap word1="DIRECT INQUIRIES" />
          </h2>
          <p className="text-base sm:text-lg text-muted font-body max-w-xl leading-relaxed">
            Send your current URL, scope, or timeline.
          </p>
        </div>

        {/* Right Column: Direct Contact & Action */}
        <div className="lg:col-span-5 flex flex-col space-y-4 pt-2">
          <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-card-border bg-card">
            <span className="text-sm sm:text-base font-mono text-foreground truncate">
              {email}
            </span>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-card-border hover:border-accent transition-colors text-xs font-body text-foreground active:scale-95"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <FiCheck className="text-accent" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <FiCopy />
                  <span>Copy email</span>
                </>
              )}
            </button>
          </div>

          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-accent text-accent-fg text-sm font-body font-medium hover:opacity-90 transition-opacity active:scale-95"
          >
            <FiMail />
            <span>Send a message</span>
            <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
