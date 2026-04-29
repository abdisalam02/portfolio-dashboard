"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const accentPresets = [
  { name: "Lime", value: "#C8FF00" },
  { name: "Coral", value: "#FF6B6B" },
  { name: "Cyan", value: "#00D4FF" },
  { name: "Violet", value: "#A855F7" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Rose", value: "#FB7185" },
  { name: "Mint", value: "#34D399" },
  { name: "Sky", value: "#38BDF8" },
];

export default function AccentPicker() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("#C8FF00");
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeAccent = (color: string) => {
    setCurrent(color);
    document.documentElement.style.setProperty("--accent", color);
  };

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-[999]" style={{ cursor: "auto" }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 right-0 border-2 border-foreground bg-background p-3 mb-2 w-48"
          >
            <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-3">
              ACCENT COLOR
            </span>
            <div className="grid grid-cols-4 gap-2">
              {accentPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => changeAccent(preset.value)}
                  className="group relative w-9 h-9 border-2 transition-all hover:scale-110"
                  style={{
                    backgroundColor: preset.value,
                    borderColor: current === preset.value ? "var(--foreground)" : "transparent",
                  }}
                  title={preset.name}
                >
                  {current === preset.value && (
                    <span className="absolute inset-0 flex items-center justify-center text-[#111] font-black text-xs">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 border-2 border-foreground flex items-center justify-center hover:scale-105 transition-transform"
        style={{ backgroundColor: current, cursor: "auto" }}
        title="Change accent color"
      >
        <span className="text-[#111] font-black text-lg">◆</span>
      </button>
    </div>
  );
}
