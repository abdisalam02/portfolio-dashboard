"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-[10px] font-bold tracking-widest border-2 border-foreground px-3 py-1.5 hover:bg-accent hover:text-[#111] hover:border-accent transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}
