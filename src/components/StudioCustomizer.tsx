"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSliders, FiX, FiCheck } from "react-icons/fi";

const typoOptions = [
  {
    id: "font-pair-1",
    name: "Architectural (Default)",
    sub: "Space Grotesk + JetBrains Mono",
    desc: "Razor-sharp modern tech bento",
  },
  {
    id: "font-pair-2",
    name: "Swiss Editorial",
    sub: "Syne + Inter",
    desc: "Sculptural high-fashion agency",
  },
  {
    id: "font-pair-3",
    name: "Luxury Minimalist",
    sub: "Cinzel + Grotesk",
    desc: "Atelier & bespoke jewelry feel",
  },
];

const paletteOptions = [
  {
    id: "theme-obsidian",
    name: "Obsidian Chalk (Default)",
    preview: "#08080a",
    border: "rgba(255,255,255,0.2)",
    accent: "#ffffff",
    tag: "099 Inspo Dark",
  },
  {
    id: "theme-paper",
    name: "Warm Editorial Paper",
    preview: "#f6f5f2",
    border: "rgba(0,0,0,0.2)",
    accent: "#111113",
    tag: "Clean Light",
  },
  {
    id: "theme-chrome",
    name: "Liquid Chrome & Steel",
    preview: "#030304",
    border: "rgba(203,213,225,0.4)",
    accent: "#cbd5e1",
    tag: "Metallic Jewelry",
  },
];

export default function StudioCustomizer() {
  const [open, setOpen] = useState(false);
  const [currentTypo, setCurrentTypo] = useState("font-pair-1");
  const [currentPalette, setCurrentPalette] = useState("theme-obsidian");

  useEffect(() => {
    const savedTypo = localStorage.getItem("ag_typo") || "font-pair-1";
    const savedPalette = localStorage.getItem("ag_palette") || "theme-obsidian";
    setTypo(savedTypo);
    setPalette(savedPalette);
  }, []);

  const setTypo = (id: string) => {
    setCurrentTypo(id);
    localStorage.setItem("ag_typo", id);
    const html = document.documentElement;
    html.classList.remove("font-pair-1", "font-pair-2", "font-pair-3");
    html.classList.add(id);
  };

  const setPalette = (id: string) => {
    setCurrentPalette(id);
    localStorage.setItem("ag_palette", id);
    const html = document.documentElement;
    html.classList.remove("theme-obsidian", "theme-paper", "theme-chrome");
    html.classList.add(id);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-card/90 backdrop-blur-md border border-card-border shadow-2xl hover:border-foreground/40 transition-all text-xs font-mono tracking-wider text-foreground active:scale-95"
        title="Customizer: Test Fonts & Color Palettes"
      >
        <FiSliders className="text-sm transition-transform duration-300 group-hover:rotate-45" />
        <span className="hidden sm:inline">CUSTOMIZE STUDIO</span>
      </button>

      {/* Modal / Drawer Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-16 right-0 w-[92vw] sm:w-96 p-6 rounded-2xl bg-card border border-card-border shadow-2xl space-y-6 text-foreground"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-card-border">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-muted block uppercase">
                    Client Experience Tester
                  </span>
                  <h4 className="text-sm font-bold tracking-tight">Studio Customizer</h4>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-muted hover:text-foreground"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Color Palette Selector */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-muted block uppercase">
                  1. Color Palette
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {paletteOptions.map((pal) => {
                    const isSelected = currentPalette === pal.id;
                    return (
                      <button
                        key={pal.id}
                        onClick={() => setPalette(pal.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-foreground bg-white/10 shadow-sm"
                            : "border-card-border hover:border-white/20 bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-5 h-5 rounded-full border shadow-inner flex items-center justify-center text-[10px]"
                            style={{
                              backgroundColor: pal.preview,
                              borderColor: pal.border,
                            }}
                          >
                            {isSelected && <FiCheck className="text-foreground text-[10px]" />}
                          </span>
                          <div>
                            <span className="text-xs font-semibold block">{pal.name}</span>
                            <span className="text-[10px] text-muted font-mono">{pal.tag}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-mono text-muted uppercase">ACTIVE</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typography Selector */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-muted block uppercase">
                  2. Headline & Brand Typography
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {typoOptions.map((typo) => {
                    const isSelected = currentTypo === typo.id;
                    return (
                      <button
                        key={typo.id}
                        onClick={() => setTypo(typo.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-foreground bg-white/10 shadow-sm"
                            : "border-card-border hover:border-white/20 bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">{typo.name}</span>
                          {isSelected && <FiCheck className="text-foreground text-xs" />}
                        </div>
                        <span className="text-[11px] text-muted block font-mono">{typo.sub}</span>
                        <span className="text-[10px] text-muted/80 block mt-0.5">{typo.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Note */}
              <p className="text-[10px] text-muted leading-relaxed font-mono pt-2 border-t border-card-border">
                Changes apply instantly across all pages and persist in your browser for testing.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
