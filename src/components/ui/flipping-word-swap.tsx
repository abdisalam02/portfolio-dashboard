"use client";

import type { CSSProperties } from "react";
import Letter3DSwap from "./letter-3d-swap";

export interface FlippingWordSwapProps {
  /** The title text shown. */
  word1: string;
  /** Duration of each letter roll in milliseconds. */
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Kept as the title API used across the site. The effect itself lives in
 * letter-3d-swap.tsx (font-change roll plus fit-to-width).
 */
export function FlippingWordSwap({
  word1,
  duration,
  className = "",
  style,
}: FlippingWordSwapProps) {
  return (
    <span className={`block w-full ${className}`} style={style}>
      <Letter3DSwap text={word1} duration={duration} />
    </span>
  );
}

export default FlippingWordSwap;
