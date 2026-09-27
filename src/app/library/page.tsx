"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { UI_COMPONENTS_REGISTRY } from "@/components/library/registry";
import { ComponentCard } from "@/components/library/ComponentCard";
import { ComponentCategory } from "@/components/library/types";
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
  FiCode
} from "react-icons/fi";

const CATEGORIES: { id: ComponentCategory; label: string; count: number }[] = [
  { id: "all", label: "ALL COMPONENTS", count: 74 },
  { id: "navs", label: "NAVIGATIONS", count: 14 },
  { id: "heroes", label: "HEADERS & HEROES", count: 14 },
  { id: "titles", label: "TITLES & TYPOGRAPHY", count: 12 },
  { id: "galleries", label: "IMAGE GALLERIES", count: 12 },
  { id: "dropdowns", label: "ACCORDIONS & DROPDOWNS", count: 12 },
  { id: "booking", label: "BOOKING & CTAs", count: 10 },
];

const STYLE_TAGS = [
  "All",
  "Editorial",
  "Brutalist",
  "Minimal",
  "Monospace",
  "Luxury",
  "Kinetic",
  "Utility",
  "Architectural",
];

export default function UILibraryPage() {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>("all");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [isLightMode, setIsLightMode] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "sections">("grid");
  const [copySuccess, setCopySuccess] = useState(false);

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
      const matchStyle = selectedStyle === "All" || item.styleTag.toLowerCase() === selectedStyle.toLowerCase();
      const matchSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.styleTag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchStyle && matchSearch;
    });
  }, [activeCategory, selectedStyle, searchQuery]);

  const copyComposition = () => {
    const chosenDetails = UI_COMPONENTS_REGISTRY.filter((c) => selectedComponents.includes(c.id)).map(
      (c) => `- ${c.name} (${c.category}) [${c.styleTag}]`
    );
    const text = `A.GURE CUSTOM TEMPLATE SPECIFICATION:\n\n${chosenDetails.join("\n")}\n\nGenerated via agure.space/library`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-32">
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
                UI COMPONENT VAULT
              </span>
              <span className="px-2 py-0.5 bg-foreground text-background text-[10px] font-mono font-bold">
                74 STYLES
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
                placeholder="Search 74 components..."
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

      {/* Hero Intro Manifesto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-6">
        <div className="border border-card-border bg-card p-6 sm:p-10 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-card-border">
            <div>
              <span className="text-[10px] text-muted uppercase tracking-widest block mb-2">
                ARCHITECTURAL SPECIFICATION LIBRARY · OSLO
              </span>
              <h1 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tighter text-foreground leading-tight">
                Vast UI Component Library.
              </h1>
              <p className="text-xs text-muted mt-2 max-w-xl leading-relaxed">
                74 meticulously engineered, non-AI interface components. Spaced evenly, mobile-ready, and categorized into 6 core studio sections. Inspect clean JSX code or assemble a custom template formula.
              </p>
            </div>
            <div className="text-right sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-card-border">
              <span className="text-2xl font-bold font-heading text-foreground block">
                {filteredItems.length} / 74
              </span>
              <span className="text-[10px] text-muted uppercase">ACTIVE COMPONENTS</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono transition-all ${
                  activeCategory === cat.id
                    ? "bg-foreground text-background font-bold shadow-sm"
                    : "border border-card-border text-muted hover:text-foreground hover:border-foreground"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Style Filter Pills */}
          <div className="mt-4 pt-4 border-t border-card-border flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-muted uppercase mr-2 flex items-center gap-1">
              <FiFilter className="text-[10px]" /> STYLE:
            </span>
            {STYLE_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedStyle(tag)}
                className={`px-2 py-0.5 text-[10px] uppercase font-mono ${
                  selectedStyle === tag
                    ? "bg-foreground text-background font-bold"
                    : "text-muted hover:text-foreground border border-transparent hover:border-card-border"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Component Display Canvas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        {filteredItems.length === 0 ? (
          <div className="w-full py-20 text-center border border-dashed border-card-border font-mono text-xs text-muted">
            No UI components match &quot;{searchQuery}&quot; under style &quot;{selectedStyle}&quot;.
            <br />
            <button
              onClick={() => {
                setActiveCategory("all");
                setSelectedStyle("All");
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
                      SECTION IDENTIFIER: #{cat.id}
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

      {/* Floating Template Assembly Drawer */}
      {selectedComponents.length > 0 && (
        <div className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-8 z-40 max-w-lg w-full bg-card border-2 border-foreground p-4 shadow-2xl font-mono text-xs animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-card-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-foreground uppercase tracking-tight">
                CUSTOM TEMPLATE FORMULA
              </span>
            </div>
            <span className="bg-foreground text-background px-2 py-0.5 text-[10px] font-bold">
              {selectedComponents.length} SELECTED
            </span>
          </div>

          <div className="max-h-28 overflow-y-auto space-y-1 mb-3 pr-1 text-[11px] text-muted">
            {selectedComponents.map((id) => {
              const comp = UI_COMPONENTS_REGISTRY.find((c) => c.id === id);
              return (
                <div key={id} className="flex justify-between items-center py-0.5">
                  <span className="text-foreground font-semibold truncate pr-2">
                    {comp?.name}
                  </span>
                  <button
                    onClick={() => handleSelect(id)}
                    className="text-muted hover:text-foreground text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button
              onClick={copyComposition}
              className="flex-1 py-2.5 bg-foreground text-background font-bold text-xs uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {copySuccess ? <FiCheck className="text-sm" /> : <FiCode className="text-sm" />}
              <span>{copySuccess ? "COPIED SPECIFICATION!" : "EXPORT FORMULA SPEC"}</span>
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
    </main>
  );
}
