"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

export interface FlippingWordSwapProps {
  /** The short title shown. */
  word1: string;
  /** Duration of the 3D flip in milliseconds. */
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Zero-layout-shift 3D Title Flip.
 * Locks the container height to 1.08em with leading-none and items-center
 * so switching between fonts with different ascenders/descenders never shifts
 * a single pixel of surrounding page layout.
 */
export function FlippingWordSwap({
  word1,
  duration = 420,
  className = "",
  style,
}: FlippingWordSwapProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [outgoingFont, setOutgoingFont] = useState<string | undefined>(undefined);
  const [incomingFont, setIncomingFont] = useState<string | undefined>(undefined);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const onFontChange = (e: Event) => {
      const custom = e as CustomEvent<{
        prevFontVar?: string;
        nextFontVar?: string;
      }>;
      const prevF = custom.detail?.prevFontVar;
      const nextF = custom.detail?.nextFontVar;

      if (timerRef.current) window.clearTimeout(timerRef.current);

      setOutgoingFont(prevF);
      setIncomingFont(nextF);
      setIsFlipping(true);

      timerRef.current = window.setTimeout(() => {
        setIsFlipping(false);
        setOutgoingFont(undefined);
        setIncomingFont(undefined);
      }, duration + 60);
    };

    window.addEventListener("ag-font-change", onFontChange);
    return () => {
      window.removeEventListener("ag-font-change", onFontChange);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [duration]);

  return (
    <span
      className={`relative inline-grid h-[1.08em] leading-none items-center select-none align-bottom overflow-hidden whitespace-nowrap [perspective:800px] ${className}`}
      style={style}
    >
      {/* Outgoing Font Layer */}
      <span
        aria-hidden={isFlipping ? "true" : undefined}
        className="col-start-1 row-start-1 inline-flex items-center h-[1.08em] leading-none [backface-visibility:hidden]"
        style={{
          fontFamily: outgoingFont ? `${outgoingFont}, sans-serif` : undefined,
          transformOrigin: "center top",
          transform: isFlipping ? "rotateX(82deg)" : "rotateX(0deg)",
          opacity: isFlipping ? 0 : 1,
          transition: isFlipping
            ? `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${duration}ms ease`
            : "none",
        }}
      >
        {word1}
      </span>

      {/* Incoming Font Layer */}
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 inline-flex items-center h-[1.08em] leading-none [backface-visibility:hidden]"
        style={{
          fontFamily: incomingFont ? `${incomingFont}, sans-serif` : undefined,
          transformOrigin: "center bottom",
          transform: isFlipping ? "rotateX(0deg)" : "rotateX(-82deg)",
          opacity: isFlipping ? 1 : 0,
          transition: isFlipping
            ? `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${duration}ms ease`
            : "none",
        }}
      >
        {word1}
      </span>
    </span>
  );
}

export default FlippingWordSwap;
