"use client";

import React from "react";

export type NailShapeType = "almond" | "square" | "coffin" | "natural_oval" | "stiletto";

interface NailShapeSelectorProps {
  selectedShape: NailShapeType;
  onSelectShape: (shape: NailShapeType) => void;
  accentColor: string;
  accentFg: string;
  cardBg: string;
  borderColor: string;
  textColor: string;
  tagBg: string;
}

interface ShapeOption {
  id: NailShapeType;
  name: string;
  desc: string;
  svgPath: string;
}

const SHAPES: ShapeOption[] = [
  {
    id: "almond",
    name: "Almond",
    desc: "Tapered & feminine",
    // Almond SVG: rounded base, tapered sides, curved almond apex
    svgPath: "M 10 38 L 10 22 C 10 14 13 6 20 2 C 27 6 30 14 30 22 L 30 38 Z",
  },
  {
    id: "square",
    name: "Square",
    desc: "Sharp 90° edges",
    // Square SVG: parallel walls, flat top
    svgPath: "M 10 38 L 10 6 L 30 6 L 30 38 Z",
  },
  {
    id: "coffin",
    name: "Coffin",
    desc: "Tapered flat tip",
    // Coffin SVG: tapered sides, flat top
    svgPath: "M 10 38 L 12 18 L 15 4 L 25 4 L 28 18 L 30 38 Z",
  },
  {
    id: "natural_oval",
    name: "Oval",
    desc: "Classic natural curve",
    // Oval SVG: gentle smooth curve
    svgPath: "M 10 38 L 10 20 C 10 10 14 4 20 4 C 26 4 30 10 30 20 L 30 38 Z",
  },
  {
    id: "stiletto",
    name: "Stiletto",
    desc: "Dramatic sharp point",
    // Stiletto SVG: tapered to sharp apex point
    svgPath: "M 10 38 L 10 22 L 20 2 L 30 22 L 30 38 Z",
  },
];

export default function NailShapeSelector({
  selectedShape,
  onSelectShape,
  accentColor,
  accentFg,
  cardBg,
  borderColor,
  textColor,
  tagBg,
}: NailShapeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider block" style={{ color: textColor }}>
          Nail Shape Architecture
        </label>
        <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded font-bold" style={{ backgroundColor: tagBg, color: accentColor }}>
          {selectedShape.toUpperCase()} SELECTED
        </span>
      </div>

      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex overflow-x-auto snap-x snap-mandatory gap-2.5 pb-2.5 pt-1 scroll-smooth scrollbar-none overscroll-x-contain sm:grid sm:grid-cols-5 sm:gap-2.5 sm:overflow-visible sm:pb-0 sm:snap-none">
        {SHAPES.map((shape) => {
          const isSelected = selectedShape === shape.id;
          return (
            <button
              key={shape.id}
              type="button"
              onClick={() => onSelectShape(shape.id)}
              className="snap-start flex-shrink-0 w-28 sm:w-auto p-3 sm:p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between group active:scale-[0.97] cursor-pointer shadow-xs"
              style={{
                backgroundColor: isSelected ? tagBg : cardBg,
                borderColor: isSelected ? accentColor : borderColor,
                boxShadow: isSelected ? `0 0 0 1.5px ${accentColor}` : "none",
              }}
            >
              {/* Silhouette SVG Preview */}
              <div className="w-10 h-12 flex items-center justify-center mb-1.5 transition-transform group-hover:-translate-y-0.5">
                <svg
                  width="36"
                  height="44"
                  viewBox="0 0 40 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors"
                >
                  {/* Finger outline hint */}
                  <path
                    d="M 6 42 L 6 26 C 6 12 12 6 20 6 C 28 6 34 12 34 26 L 34 42"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity={isSelected ? 0.35 : 0.2}
                    style={{ color: textColor }}
                  />
                  {/* Nail plate fill */}
                  <path
                    d={shape.svgPath}
                    fill={isSelected ? accentColor : "currentColor"}
                    fillOpacity={isSelected ? 0.9 : 0.25}
                    stroke={isSelected ? accentColor : "currentColor"}
                    strokeWidth="1.5"
                    style={{ color: textColor }}
                  />
                  {/* Highlight sheen */}
                  <path
                    d="M 16 10 L 16 28"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity={isSelected ? 0.5 : 0.2}
                  />
                </svg>
              </div>

              <div>
                <span
                  className="font-mono text-xs font-bold block"
                  style={{ color: isSelected ? accentColor : textColor }}
                >
                  {shape.name}
                </span>
                <span
                  className="text-[9px] font-mono block opacity-75 truncate"
                  style={{ color: textColor }}
                >
                  {shape.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
