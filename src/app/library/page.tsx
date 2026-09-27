"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { UI_COMPONENTS_REGISTRY } from "@/components/library/registry";
import { ComponentCard } from "@/components/library/ComponentCard";
import { ComponentCategory, AestheticVibe } from "@/components/library/types";
import { 
  FiSearch, 
  FiFilter, 
  FiLayers, 
  FiGrid, 
  FiSun, 
  FiMoon, 
  FiCheck, 
  FiX, 
  FiArrowUp,
  FiShare2,
  FiCode,
  FiEye,
  FiStar
} from "react-icons/fi";

const CATEGORIES: { id: ComponentCategory; label: string; count: number }[] = [
  { id: "all", label: "ALL COMPONENTS", count: 178 },
  { id: "navs", label: "NAVIGATIONS", count: 24 },
  { id: "heroes", label: "HEADERS & HEROES", count: 24 },
  { id: "titles", label: "TITLES & TYPOGRAPHY", count: 22 },
  { id: "galleries", label: "IMAGE GALLERIES", count: 22 },
  { id: "dropdowns", label: "ACCORDIONS & DROPDOWNS", count: 22 },
  { id: "pricing", label: "PRICING & MENUS", count: 16 },
  { id: "reviews", label: "REVIEWS & SOCIAL PROOF", count: 14 },
  { id: "booking", label: "BOOKING & CTAs", count: 20 },
  { id: "footers", label: "LOCATION & FOOTERS", count: 14 },
];

const AESTHETIC_VIBES: AestheticVibe[] = [
  "All",
  "Terracotta / Earthy",
  "Patisserie / Pastel",
  "Wabi-Sabi / Sage",
  "Cyber Chrome / Dark",
  "Neo-Brutalist / Pop",
  "Luxury Atelier / Gold",
  "Editorial / Print",
  "Modern Magic / Glow",
  "Artisan / Linen",
];

export default function UILibraryPage() {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>("all");
  const [selectedVibe, setSelectedVibe] = useState<AestheticVibe>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [isLightMode, setIsLightMode] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "sections">("grid");
  const [copySuccess, setCopySuccess] = useState(false);
  const [previewSiteOpen, setPreviewSiteOpen] = useState(false);

  // Sync theme with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ag_theme");
    if (saved === "dark") {
      setIsLightMode(false);
      document.documentElement.classList.remove("theme-paper");
      document.documentElement.classList.add("theme-obsidian");
    } else {
      setIsLightMode(true);
      document.documentElement.classList.remove("theme-obsidian");
      document.documentElement.classList.add("theme-paper");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    if (next) {
      document.documentElement.classList.remove("theme-obsidian");
      document.documentElement.classList.add("theme-paper");
      localStorage.setItem("ag_theme", "light");
    } else {
      document.documentElement.classList.remove("theme-paper");
      document.documentElement.classList.add("theme-obsidian");
      localStorage.setItem("ag_theme", "dark");
    }
  };

  const handleSelect = (id: string) => {
    if (selectedComponents.includes(id)) {
      setSelectedComponents(selectedComponents.filter((item) => item !== id));
    } else {
      setSelectedComponents([...selectedComponents, id]);
    }
  };

  const filteredItems = useMemo(() => {
    return UI_COMPONENTS_REGISTRY.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchVibe = selectedVibe === "All" || item.aestheticVibe === selectedVibe;
      const matchSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.styleTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.aestheticVibe.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchVibe && matchSearch;
    });
  }, [activeCategory, selectedVibe, searchQuery]);

  const copyComposition = () => {
    const chosenDetails = UI_COMPONENTS_REGISTRY.filter((c) => selectedComponents.includes(c.id)).map(
      (c) => `- ${c.name} [${c.category.toUpperCase()}] — Vibe: ${c.aestheticVibe} (Style: ${c.styleTag})`
    );
    const text = `A.GURE 2,000 KR CUSTOM SITE BLUEPRINT:\n\n${chosenDetails.join("\n")}\n\nGenerated via agure.space/library`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Sort selected components in logical site order for live assembled preview
  const assembledItems = useMemo(() => {
    const categoryOrder: ComponentCategory[] = [
      "navs",
      "heroes",
      "titles",
      "galleries",
      "pricing",
      "reviews",
      "dropdowns",
      "booking",
      "footers",
    ];
    const picked = UI_COMPONENTS_REGISTRY.filter((c) => selectedComponents.includes(c.id));
    return picked.sort(
      (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
    );
  }, [selectedComponents]);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-36">
      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-card-border px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="font-heading font-black text-base sm:text-lg tracking-tight hover:opacity-80">
                A.GURE
              </Link>
              <span className="text-muted">/</span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                UI CUSTOMIZER VAULT
              </span>
              <span className="px-2 py-0.5 bg-foreground text-background text-[10px] font-mono font-bold">
                178 COMPONENTS
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className="md:hidden p-2 border border-card-border text-foreground hover:bg-muted/10 text-xs font-mono"
            >
              {isLightMode ? <FiMoon /> : <FiSun />}
            </button>
          </div>

          {/* Quick Search & Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xs" />
              <input
                type="text"
                placeholder="Search 178 components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-card-border bg-card text-foreground font-mono text-xs outline-none focus:border-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground text-xs"
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className="hidden sm:flex border border-card-border p-0.5 font-mono text-xs">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-2.5 py-1 flex items-center gap-1 ${
                  viewMode === "grid" ? "bg-foreground text-background font-bold" : "text-muted hover:text-foreground"
                }`}
              >
                <FiGrid className="text-xs" />
                <span className="text-[10px]">PINTEREST</span>
              </button>
              <button
                onClick={() => setViewMode("sections")}
                className={`px-2.5 py-1 flex items-center gap-1 ${
                  viewMode === "sections" ? "bg-foreground text-background font-bold" : "text-muted hover:text-foreground"
                }`}
              >
                <FiLayers className="text-xs" />
                <span className="text-[10px]">BY SECTION</span>
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 border border-card-border text-foreground hover:bg-muted/10 text-xs font-mono"
            >
              {isLightMode ? <FiMoon className="text-xs" /> : <FiSun className="text-xs" />}
              <span className="text-[11px]">{isLightMode ? "DARK" : "LIGHT"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Intro Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10 pb-6">
        <div className="border border-card-border bg-card p-6 sm:p-8 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-card-border">
            <div>
              <span className="text-[10px] text-muted uppercase tracking-widest block mb-1 font-bold">
                A.GURE · 2,000 KR TEMPLATE BUILDER &amp; COMPONENT VAULT
              </span>
              <h1 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tighter text-foreground leading-tight">
                Vast UI Component Library.
              </h1>
              <p className="text-xs text-muted mt-2 max-w-2xl leading-relaxed">
                178 uniquely styled UI components across 9 core sections. Compare warm terracotta, Parisian patisserie, Japanese wabi-sabi sage, cyberpunk chrome, and neo-brutalist pop designs. Select components to assemble your custom 1-page site blueprint.
              </p>
            </div>
            <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-card-border">
              <span className="text-3xl font-black font-heading text-foreground block">
                {filteredItems.length}
              </span>
              <span className="text-[10px] text-muted uppercase font-bold">MATCHING STYLES</span>
            </div>
          </div>

          {/* Aesthetic Universe / Vibe Filter Bar */}
          <div className="pt-4 pb-2">
            <div className="text-[10px] text-muted uppercase mb-2 font-bold flex items-center gap-1">
              <FiStar className="text-xs text-amber-500 fill-amber-500" />
              <span>AESTHETIC UNIVERSE &amp; THEME PALETTES:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {AESTHETIC_VIBES.map((vibe) => (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`px-3 py-1 text-xs font-mono transition-all rounded ${
                    selectedVibe === vibe
                      ? "bg-foreground text-background font-bold shadow-sm"
                      : "border border-card-border text-muted hover:text-foreground hover:border-foreground bg-card"
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 pt-4 border-t border-card-border flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] font-mono transition-all ${
                  activeCategory === cat.id
                    ? "bg-foreground text-background font-bold"
                    : "border border-card-border text-muted hover:text-foreground"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Component Display Canvas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        {filteredItems.length === 0 ? (
          <div className="w-full py-20 text-center border border-dashed border-card-border font-mono text-xs text-muted">
            No UI components match &quot;{searchQuery}&quot; under vibe &quot;{selectedVibe}&quot;.
            <br />
            <button
              onClick={() => {
                setActiveCategory("all");
                setSelectedVibe("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 border border-foreground text-foreground font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Pinterest Style Balanced Masonry Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            {filteredItems.map((item, idx) => (
              <ComponentCard
                key={item.id}
                item={item}
                index={idx}
                isSelected={selectedComponents.includes(item.id)}
                onSelect={handleSelect}
              />
            ))}
          </div>
        ) : (
          /* Grouped by Section Swimlanes */
          <div className="space-y-16">
            {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
              const catItems = filteredItems.filter((i) => i.category === cat.id);
              if (catItems.length === 0) return null;

              return (
                <div key={cat.id} id={cat.id} className="scroll-mt-24">
                  <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-foreground font-mono">
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground">
                        {cat.label}
                      </span>
                      <span className="px-2 py-0.5 bg-foreground text-background text-[10px] font-bold">
                        {catItems.length} STYLES
                      </span>
                    </div>
                    <span className="text-xs text-muted hidden sm:inline uppercase">
                      SECTION #{cat.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                    {catItems.map((item, idx) => (
                      <ComponentCard
                        key={item.id}
                        item={item}
                        index={idx}
                        isSelected={selectedComponents.includes(item.id)}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Floating Template Formula Tray */}
      {selectedComponents.length > 0 && (
        <div className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-8 z-40 max-w-lg w-full bg-card border-2 border-foreground p-4 shadow-2xl font-mono text-xs animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-card-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-foreground uppercase tracking-tight">
                CUSTOM 2,000 KR SITE FORMULA
              </span>
            </div>
            <span className="bg-foreground text-background px-2 py-0.5 text-[10px] font-bold">
              {selectedComponents.length} COMPONENTS
            </span>
          </div>

          <div className="max-h-32 overflow-y-auto space-y-1 mb-3 pr-1 text-[11px] text-muted">
            {assembledItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-1 border-b border-card-border/40">
                <div className="truncate pr-2">
                  <span className="px-1.5 py-0.2 rounded bg-foreground/10 text-foreground text-[9px] uppercase font-bold mr-1.5">
                    {item.category}
                  </span>
                  <span className="text-foreground font-semibold">{item.name}</span>
                </div>
                <button
                  onClick={() => handleSelect(item.id)}
                  className="text-muted hover:text-foreground text-[10px] px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPreviewSiteOpen(true)}
              className="flex-1 py-2.5 bg-foreground text-background font-bold text-xs uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              <FiEye className="text-sm" />
              <span>PREVIEW ASSEMBLED SITE</span>
            </button>
            <button
              onClick={copyComposition}
              className="px-3 py-2.5 border border-foreground text-foreground font-bold text-xs uppercase hover:bg-muted/10 transition-colors"
              title="Copy blueprint specification text"
            >
              {copySuccess ? <FiCheck className="text-emerald-500" /> : <FiCode />}
            </button>
            <button
              onClick={() => setSelectedComponents([])}
              className="px-3 py-2.5 border border-card-border text-muted hover:text-foreground text-xs uppercase"
            >
              CLEAR
            </button>
          </div>
        </div>
      )}

      {/* Live Assembled 1-Page Site Preview Modal */}
      {previewSiteOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setPreviewSiteOpen(false)}
        >
          <div 
            className="w-full max-w-4xl h-[92vh] bg-card border-2 border-foreground flex flex-col shadow-2xl overflow-hidden font-mono text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Browser Frame Bar */}
            <div className="p-3 border-b border-card-border bg-muted/10 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="font-bold text-foreground text-xs ml-2">
                  LIVE 1-PAGE PREVIEW // ASSEMBLED COMPOSITION ({assembledItems.length} SECTIONS)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyComposition}
                  className="px-3 py-1 bg-foreground text-background font-bold text-xs uppercase"
                >
                  {copySuccess ? "COPIED BLUEPRINT!" : "EXPORT BLUEPRINT"}
                </button>
                <button
                  onClick={() => setPreviewSiteOpen(false)}
                  className="p-1 hover:bg-muted/20 text-muted hover:text-foreground"
                >
                  <FiX className="text-base" />
                </button>
              </div>
            </div>

            {/* Scrollable Live 1-Page Website Flow */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-12 bg-neutral-100 dark:bg-neutral-950">
              {assembledItems.map((item, idx) => {
                const ItemComponent = item.component;
                return (
                  <div key={item.id} className="relative group">
                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-black text-white text-[9px] font-mono uppercase font-bold z-10">
                      STEP {idx + 1}: {item.category.toUpperCase()} — {item.name}
                    </div>
                    <div className="shadow-lg border border-black/10">
                      <ItemComponent />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
