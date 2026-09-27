import React from "react";

export type ComponentCategory =
  | "all"
  | "navs"
  | "heroes"
  | "titles"
  | "galleries"
  | "dropdowns"
  | "pricing"
  | "reviews"
  | "booking"
  | "footers";

export type AestheticVibe =
  | "All"
  | "Terracotta / Earthy"
  | "Patisserie / Pastel"
  | "Wabi-Sabi / Sage"
  | "Cyber Chrome / Dark"
  | "Neo-Brutalist / Pop"
  | "Luxury Atelier / Gold"
  | "Editorial / Print"
  | "Modern Magic / Glow"
  | "Artisan / Linen";

export interface UIComponentItem {
  id: string;
  category: ComponentCategory;
  name: string;
  styleTag: string; // e.g. "Brutalist", "Editorial", "Monospace", "Minimal", "Luxury", "Neo-Pop", "Magic UI"
  aestheticVibe: AestheticVibe;
  description: string;
  component: React.ComponentType;
  codeSnippet: string;
  badge?: string;
}
