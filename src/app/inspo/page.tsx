"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import inspoData from "@/data/inspo-index.json";
import { FiSearch, FiX, FiCopy, FiCheck } from "react-icons/fi";

type InspoItem = {
  file: string;
  niche: string;
  componentType: string;
  aesthetic: string;
  palette: string[];
  layoutNotes: string;
  uxFeatures: string[];
  suggestedPrompt: string;
};

const items = inspoData as InspoItem[];

const NICHES = [
  "all",
  "nails",
  "hair",
  "brows-lashes",
  "skincare-clinic",
  "cakes",
  "creative-studio",
  "fitness",
  "general",
] as const;

const COMPONENT_TYPES = [
  "all",
  "hero",
  "booking-availability",
  "price-list",
  "artist-bio",
  "policies",
  "lookbook-grid",
  "full-page",
  "services-menu",
  "contact-form",
  "testimonials",
  "about-section",
  "product-showcase",
  "navigation",
  "footer",
] as const;

const AESTHETICS = [
  "all",
  "scandinavian-clean",
  "luxury-editorial",
  "y2k-pop",
  "warm-organic",
  "retro-newspaper",
  "minimal-mono",
  "dark-luxury",
  "soft-feminine",
] as const;

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 text-[10px] font-mono whitespace-nowrap transition-all flex-shrink-0 uppercase tracking-wider ${
        active
          ? "bg-foreground text-background font-bold"
          : "border border-card-border text-muted hover:text-foreground hover:border-foreground"
      }`}
    >
      {label.replace(/-/g, " ")}
    </button>
  );
}

function InspectModal({
  item,
  onClose,
}: {
  item: InspoItem;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = useCallback(() => {
    navigator.clipboard.writeText(item.suggestedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [item.suggestedPrompt]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background border border-card-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-background border-b border-card-border p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted">
              {item.niche} · {item.componentType} · {item.aesthetic}
            </p>
            <p className="text-xs font-mono text-foreground mt-0.5 truncate max-w-[280px]">
              {item.file}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="relative w-full aspect-[3/4] sm:aspect-auto sm:h-[500px] bg-card border border-card-border mb-6">
            <Image
              src={`/abdisalamqlayout/${item.file}`}
              alt={item.layoutNotes}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted mb-2">
                Color Palette
              </h4>
              <div className="flex gap-2 flex-wrap">
                {item.palette.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => navigator.clipboard.writeText(hex)}
                    className="group flex items-center gap-1.5 border border-card-border px-2 py-1 hover:border-foreground transition-colors"
                    title={`Copy ${hex}`}
                  >
                    <span
                      className="w-4 h-4 border border-black/10 flex-shrink-0"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="text-[10px] font-mono text-foreground">
                      {hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted mb-1.5">
                Layout Breakdown
              </h4>
              <p className="text-xs text-foreground leading-relaxed">
                {item.layoutNotes}
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted mb-2">
                UX Features
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.uxFeatures.map((f) => (
                  <span
                    key={f}
                    className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-foreground/5 text-foreground border border-card-border"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-card-border pt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted">
                  AI Prompt
                </h4>
                <button
                  onClick={copyPrompt}
                  className="flex items-center gap-1 text-[10px] font-mono text-muted hover:text-foreground transition-colors"
                >
                  {copied ? (
                    <>
                      <FiCheck size={10} /> Copied
                    </>
                  ) : (
                    <>
                      <FiCopy size={10} /> Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-foreground leading-relaxed bg-card border border-card-border p-3 font-mono">
                {item.suggestedPrompt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InspoVaultPage() {
  const [niche, setNiche] = useState("all");
  const [componentType, setComponentType] = useState("all");
  const [aesthetic, setAesthetic] = useState("all");
  const [search, setSearch] = useState("");
  const [inspecting, setInspecting] = useState<InspoItem | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (niche !== "all" && item.niche !== niche) return false;
      if (componentType !== "all" && item.componentType !== componentType)
        return false;
      if (aesthetic !== "all" && item.aesthetic !== aesthetic) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${item.niche} ${item.componentType} ${item.aesthetic} ${item.layoutNotes} ${item.uxFeatures.join(" ")} ${item.suggestedPrompt}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [niche, componentType, aesthetic, search]);

  const nicheCounts = useMemo(() => {
    const m: Record<string, number> = {};
    items.forEach((i) => {
      m[i.niche] = (m[i.niche] || 0) + 1;
    });
    return m;
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <Link
                href="/library"
                className="font-heading font-black text-sm tracking-tight hover:opacity-80"
              >
                A.GURE
              </Link>
              <span className="text-muted text-xs">/</span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider hidden sm:inline">
                Inspo Vault
              </span>
              <span className="px-2 py-0.5 bg-foreground text-background text-[10px] font-mono font-bold">
                {items.length} PINS
              </span>
              <span className="text-muted text-xs hidden lg:inline">·</span>
              <span className="text-xs font-mono text-muted hidden lg:inline">
                {filtered.length} showing
              </span>
            </div>

            <div className="relative w-full max-w-[200px] sm:max-w-[260px]">
              <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted text-xs" />
              <input
                type="text"
                placeholder="Search inspo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-7 pr-7 py-1.5 border border-card-border bg-card text-foreground font-mono text-xs outline-none focus:border-foreground"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  <FiX size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[9px] font-mono text-muted uppercase font-bold flex-shrink-0 mr-1 hidden sm:inline">
                Niche:
              </span>
              {NICHES.map((n) => (
                <Pill
                  key={n}
                  label={
                    n === "all" ? `All (${items.length})` : `${n}${nicheCounts[n] ? ` (${nicheCounts[n]})` : ""}`
                  }
                  active={niche === n}
                  onClick={() => setNiche(n)}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[9px] font-mono text-muted uppercase font-bold flex-shrink-0 mr-1 hidden sm:inline">
                Type:
              </span>
              {COMPONENT_TYPES.map((t) => (
                <Pill
                  key={t}
                  label={t}
                  active={componentType === t}
                  onClick={() => setComponentType(t)}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[9px] font-mono text-muted uppercase font-bold flex-shrink-0 mr-1 hidden sm:inline">
                Vibe:
              </span>
              {AESTHETICS.map((a) => (
                <Pill
                  key={a}
                  label={a}
                  active={aesthetic === a}
                  onClick={() => setAesthetic(a)}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        {filtered.length === 0 ? (
          <div className="w-full py-20 text-center border border-dashed border-card-border font-mono text-xs text-muted">
            No inspo matches your filters.
            <br />
            <button
              onClick={() => {
                setNiche("all");
                setComponentType("all");
                setAesthetic("all");
                setSearch("");
              }}
              className="mt-4 px-4 py-2 border border-foreground text-foreground font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item) => (
              <div
                key={item.file}
                className="break-inside-avoid cursor-pointer group border border-card-border hover:border-foreground transition-colors bg-card"
                onClick={() => setInspecting(item)}
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={`/abdisalamqlayout/${item.file}`}
                    alt={item.layoutNotes}
                    width={400}
                    height={600}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-2.5">
                  <div className="flex flex-wrap gap-1 mb-1">
                    <span className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-foreground text-background font-bold">
                      {item.niche}
                    </span>
                    <span className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 border border-card-border text-muted">
                      {item.componentType}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    {item.palette.slice(0, 5).map((hex) => (
                      <span
                        key={hex}
                        className="w-3 h-3 border border-black/10 flex-shrink-0"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {inspecting && (
        <InspectModal
          item={inspecting}
          onClose={() => setInspecting(null)}
        />
      )}
    </main>
  );
}
