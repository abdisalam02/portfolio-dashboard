"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Adapted from fancycomponents.dev "letter-3d-swap". The original rolls letters
// on hover; here the roll fires when the site swaps its heading font, the front
// face keeps the outgoing font and the back face shows the incoming one.
// Two extras the original does not have:
//  1. Cubes only exist while a swap runs, so idle titles are plain text with no
//     per-letter compositor layers.
//  2. The title is fitted to its container width, so wide or long fonts shrink
//     instead of running behind neighbouring elements.
//  3. The roll waits for the incoming face to download, then measures its fitted
//     size and applies it on the first frame of the turn. That frame also hands
//     layout width over to the incoming face, so the new size and the new title
//     width are both there from the start and nothing changes after the roll.

const FACE_HEIGHT = 1.08; // em, matches the fixed title box so fonts never change row height
const HALF_DEPTH = FACE_HEIGHT / 2;
const MIN_SCALE = 0.4;
const FONT_LOAD_CAP_MS = 2500;

// Rough optical-size correction so very wide or very tall display faces sit at
// the same visual weight as the rest. The measured fit below still guards width.
const FONT_SIZE_FACTOR: Record<string, number> = {
  "var(--font-archivo-black)": 0.88,
  "var(--font-syne)": 0.9,
  "var(--font-comico)": 0.88,
  "var(--font-cinzel)": 0.9,
  "var(--font-stardom)": 0.9,
  "var(--font-technor)": 0.9,
  "var(--font-clash)": 0.94,
  "var(--font-chillax)": 0.94,
  "var(--font-boska)": 0.94,
  "var(--font-telma)": 0.94,
  "var(--font-antonio)": 1.1,
  "var(--font-bebas)": 1.1,
  "var(--font-khand)": 1.06,
};

type Phase = "idle" | "preparing" | "armed" | "swapping";

export interface Letter3DSwapProps {
  text: string;
  /** Duration of each letter's roll in milliseconds. */
  duration?: number;
  className?: string;
}

function readHeadingFactor() {
  if (typeof document === "undefined") return 1;
  const v = document.documentElement.style.getPropertyValue("--font-heading").trim();
  return FONT_SIZE_FACTOR[v] ?? 1;
}

// "var(--font-boska)" -> '"Boska", serif, sans-serif'. The probe is removed at once.
function resolveFontStack(fontVar: string) {
  const probe = document.createElement("span");
  probe.style.cssText =
    "position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;";
  probe.style.fontFamily = fontVar;
  probe.textContent = "M";
  document.body.appendChild(probe);
  const stack = getComputedStyle(probe).fontFamily;
  probe.remove();
  return stack;
}

// Start the download even while the incoming face is still edge-on (hidden).
// Without this the browser only fetches it once the cube turns, which is what
// made the finished title snap to a new width a moment after the flip.
function waitForFont(stack: string, timers: number[]) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    timers.push(window.setTimeout(finish, FONT_LOAD_CAP_MS));
    document.fonts.load(`1em ${stack}`).then(finish, finish);
  });
}

export function Letter3DSwap({ text, duration = 520, className = "" }: Letter3DSwapProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [fonts, setFonts] = useState<{ prev?: string; next?: string }>({});
  const timersRef = useRef<number[]>([]);
  const swapIdRef = useRef(0);
  const measureRef = useRef<(fontVar?: string, apply?: boolean) => number | null>(
    () => null
  );
  const pendingScaleRef = useRef<number | null>(null);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  const letters = useMemo(() => Array.from(text), [text]);
  const stagger = Math.min(36, 420 / Math.max(1, letters.length));

  // Fit the title to the width its parent gives it. The ghost span holds the
  // natural width at 1em; scale is whichever is smaller, the font's own factor
  // or the ratio that makes the text fit.
  useEffect(() => {
    const root = rootRef.current;
    const ghost = ghostRef.current;
    if (!root || !ghost) return;

    const measure = (fontVar?: string, apply = true) => {
      const avail = root.clientWidth;
      const natural = ghost.getBoundingClientRect().width;
      if (!avail || !natural) return null;
      const factor = fontVar
        ? FONT_SIZE_FACTOR[fontVar] ?? 1
        : readHeadingFactor();
      const next = Math.max(MIN_SCALE, Math.min(factor, avail / natural));
      const rounded = Math.round(next * 1000) / 1000;
      if (apply) setScale((cur) => (Math.abs(cur - rounded) > 0.004 ? rounded : cur));
      return rounded;
    };
    measureRef.current = measure;

    measure();
    const ro = new ResizeObserver(() => {
      // During preparing the ghost briefly shows the incoming face before it has
      // loaded. Keep the visible title at the outgoing size until the explicit
      // measure below runs; otherwise it does a small fallback-metric wobble.
      if (phaseRef.current === "preparing") return;
      measure();
    });
    ro.observe(root);
    ro.observe(ghost);
    document.fonts?.ready.then(() => measure()).catch(() => {});

    return () => {
      ro.disconnect();
    };
  }, [text]);

  // Start a swap: hold the outgoing font on screen until the incoming face is
  // downloaded and its fitted size is known, then let the roll run at that size.
  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
    };

    const onFontChange = (e: Event) => {
      const detail = (e as CustomEvent<{ prevFontVar?: string; nextFontVar?: string }>).detail;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      clearTimers();
      const swapId = ++swapIdRef.current;
      pendingScaleRef.current = null;
      setFonts({ prev: detail?.prevFontVar, next: detail?.nextFontVar });
      setPhase("preparing");

      const prepare = async () => {
        if (detail?.nextFontVar) {
          const stack = resolveFontStack(detail.nextFontVar);
          if (stack) await waitForFont(stack, timersRef.current);
        }
        if (swapIdRef.current !== swapId) return;
        // Two frames: one for the preparing render, one for the loaded metrics.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (swapIdRef.current !== swapId) return;
            pendingScaleRef.current = measureRef.current(detail?.nextFontVar, false);
            setPhase("armed");
          });
        });
      };
      void prepare();
    };

    window.addEventListener("ag-font-change", onFontChange);
    return () => {
      window.removeEventListener("ag-font-change", onFontChange);
      swapIdRef.current += 1;
      clearTimers();
    };
  }, []);

  // armed -> swapping needs one painted frame at rotateX(0) or the transition has nothing to animate from.
  // The new fitted size is applied on the same frame the roll starts, so the incoming
  // face is already at its final size and the outgoing face does not resize on screen first.
  useEffect(() => {
    if (phase !== "armed") return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (pendingScaleRef.current !== null) setScale(pendingScaleRef.current);
        setPhase("swapping");
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "swapping") return;
    const total = (letters.length - 1) * stagger + duration + 80;
    const t = window.setTimeout(() => {
      setPhase("idle");
      setFonts({});
    }, total);
    timersRef.current.push(t);
    return () => window.clearTimeout(t);
  }, [phase, letters.length, stagger, duration]);

  const showCubes = phase !== "idle";
  const rolling = phase === "swapping";

  return (
    <span
      ref={rootRef}
      className={`relative flex w-full items-center select-none overflow-x-clip [perspective:900px] ${className}`}
      style={{ height: `${FACE_HEIGHT}em` }}
    >
      <span className="sr-only">{text}</span>

      <span
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap"
        style={{
          lineHeight: FACE_HEIGHT,
          fontFamily: fonts.next ? `${fonts.next}, sans-serif` : undefined,
        }}
      >
        {text}
      </span>

      <span
        aria-hidden="true"
        className="inline-flex whitespace-nowrap [transform-style:preserve-3d]"
        style={{
          fontSize: `${scale}em`,
          lineHeight: FACE_HEIGHT,
        }}
      >
        {!showCubes && text}

        {showCubes &&
          letters.map((ch, i) => (
            <span
              key={i}
              className="relative inline-block [transform-style:preserve-3d] will-change-transform"
              style={{
                height: `${FACE_HEIGHT}em`,
                transform: `translateZ(-${HALF_DEPTH}em) rotateX(${rolling ? 90 : 0}deg)`,
                transition: rolling
                  ? `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${Math.round(i * stagger)}ms`
                  : "none",
              }}
            >
              <span
                className={`${
                  rolling ? "absolute left-0 top-0" : "relative"
                } block [backface-visibility:hidden]`}
                style={{
                  height: `${FACE_HEIGHT}em`,
                  transform: `translateZ(${HALF_DEPTH}em)`,
                  fontFamily: fonts.prev ? `${fonts.prev}, sans-serif` : undefined,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
              {/* In flow before the turn, so the outgoing face keeps its width while
                  the font downloads. Hidden behind the cube once the turn starts. */}
              <span
                className={`${
                  rolling ? "relative" : "absolute left-0 top-0"
                } block [backface-visibility:hidden]`}
                style={{
                  height: `${FACE_HEIGHT}em`,
                  transform: `rotateX(-90deg) translateZ(${HALF_DEPTH}em)`,
                  fontFamily: fonts.next ? `${fonts.next}, sans-serif` : undefined,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            </span>
          ))}
      </span>
    </span>
  );
}

export default Letter3DSwap;
