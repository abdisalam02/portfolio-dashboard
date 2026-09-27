import React from "react";

export type ComponentCategory =
  | "all"
  | "navs"
  | "heroes"
  | "titles"
  | "galleries"
  | "dropdowns"
  | "booking";

export interface UIComponentItem {
  id: string;
  category: ComponentCategory;
  name: string;
  styleTag: string; // e.g. "Brutalist", "Editorial", "Monospace", "Minimal", "Luxury"
  description: string;
  component: React.ComponentType;
  codeSnippet: string;
  badge?: string;
}
