"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface InkSignatureProps {
  size?: "hero" | "footer";
  replayEveryScroll?: boolean;
  className?: string;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const easeOutExpo = (t: number) => {
  const x = clamp01(t);
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

const easeInOutCubic = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export default function InkSignature({
  size = "hero",
  replayEveryScroll = true,
  className = "",
}: InkSignatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const hasPlayedOnceRef = useRef(false);

  const [writeProgress, setWriteProgress] = useState(0);
  const [underlineProgress, setUnderlineProgress] = useState(0);

  const playAnimation = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setWriteProgress(0);
    setUnderlineProgress(0);

    const startTime = performance.now();
    const WRITE_DURATION = 1350;
    const UNDERLINE_DELAY = 980;
    const UNDERLINE_DURATION = 720;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const wProg = easeInOutCubic(elapsed / WRITE_DURATION);
      const uProg =
        elapsed < UNDERLINE_DELAY
          ? 0
          : easeOutExpo((elapsed - UNDERLINE_DELAY) / UNDERLINE_DURATION);

      setWriteProgress(wProg);
      setUnderlineProgress(uProg);

      if (elapsed < UNDERLINE_DELAY + UNDERLINE_DURATION + 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setWriteProgress(1);
        setUnderlineProgress(1);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    const triggerWhenFontsReady = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      } catch {
        // Ignore font readiness errors
      }
      if (!cancelled) {
        window.setTimeout(() => {
          if (!cancelled) playAnimation();
        }, 90);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (replayEveryScroll || !hasPlayedOnceRef.current) {
              hasPlayedOnceRef.current = true;
              triggerWhenFontsReady();
            }
          } else if (replayEveryScroll) {
            // Reset when scrolled out of view so it freshly signs every time you scroll down
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            setWriteProgress(0);
            setUnderlineProgress(0);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playAnimation, replayEveryScroll]);

  const clipRightPercent = (1 - writeProgress) * 100;

  const textSizeClass =
    size === "hero"
      ? "text-[6.75rem] sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13.5rem]"
      : "text-[4.5rem] sm:text-[5.75rem] md:text-[6.75rem]";

  const underlineSizeClass =
    size === "hero"
      ? "-mt-3 sm:-mt-5 h-6 sm:h-8 w-64 sm:w-80 md:w-96"
      : "-mt-2 sm:-mt-3 h-4 sm:h-5 w-44 sm:w-56";

  return (
    <div
      ref={containerRef}
      onClick={playAnimation}
      title="Click to replay ink signature"
      className={`inline-flex flex-col items-start cursor-pointer select-none ${className}`}
    >
      <div className="relative py-2 pr-6">
        <span
          className={`font-signature ${textSizeClass} font-normal leading-[0.86] text-foreground block whitespace-nowrap`}
          style={{
            clipPath: `inset(-20% ${clipRightPercent}% -20% 0%)`,
            WebkitClipPath: `inset(-20% ${clipRightPercent}% -20% 0%)`,
          }}
        >
          A. Gure
        </span>

        {/* Live traveling ink nib point in accent color while signing */}
        {writeProgress > 0.02 && writeProgress < 0.98 && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent"
            style={{
              left: `${8 + writeProgress * 82}%`,
              opacity: 0.85,
            }}
          />
        )}
      </div>

      {/* Hand-drawn SVG ink flourish underline using the palette's 3rd Accent Color */}
      <svg
        viewBox="0 0 230 20"
        className={`${underlineSizeClass} text-accent overflow-visible`}
        aria-hidden="true"
      >
        <path
          d="M 16 12 Q 82 3, 148 11 T 214 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeDasharray="230"
          strokeDashoffset={230 * (1 - underlineProgress)}
        />
      </svg>
    </div>
  );
}
