"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FiExternalLink, FiPause, FiPlay } from "react-icons/fi";

interface AutoScrollFrameProps {
  imgSrc: string;
  alt: string;
  liveUrl: string;
  domain: string;
  mobileImgSrc?: string;
}

export default function AutoScrollFrame({
  imgSrc,
  alt,
  liveUrl,
  domain,
  mobileImgSrc,
}: AutoScrollFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isManualPaused, setIsManualPaused] = useState(false);

  useEffect(() => {
    let animId: number;
    const container = containerRef.current;
    if (!container) return;

    let lastTime = performance.now();
    const speed = 40; // pixels per second - smooth, gentle reading pace
    let isResetting = false;

    const step = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isManualPaused && !isResetting && container) {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 3) {
          isResetting = true;
          setTimeout(() => {
            if (container) {
              container.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => {
                isResetting = false;
              }, 1200);
            }
          }, 2000);
        } else {
          container.scrollTop += speed * delta;
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isManualPaused]);

  return (
    <div className="relative group">
      {/* Main Desktop Frame */}
      <div className="rounded-2xl bg-card border border-card-border shadow-2xl overflow-hidden">
        {/* Clean Header Bar with Explicit Pause Controls */}
        <div className="px-3 sm:px-4 py-2.5 bg-background/85 border-b border-card-border/60 flex items-center justify-between text-xs font-mono text-muted gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="truncate font-semibold text-foreground/90">{domain}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border hidden sm:inline-flex items-center gap-1 ${
                isManualPaused
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold"
                  : "bg-white/5 border-white/10 text-muted"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isManualPaused ? "bg-amber-400" : "bg-emerald-400 animate-pulse"
                }`}
              />
              <span>{isManualPaused ? "PAUSED — SCROLL MANUALLY" : "AUTO-SCROLLING"}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Prominent Pause to Scroll Button */}
            <button
              type="button"
              onClick={() => setIsManualPaused(!isManualPaused)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-all shadow-sm ${
                isManualPaused
                  ? "bg-foreground text-background font-bold"
                  : "bg-card border border-card-border text-foreground hover:border-foreground"
              }`}
              title={isManualPaused ? "Resume auto-scroll" : "Pause auto-scroll to inspect manually"}
              aria-label={isManualPaused ? "Resume auto-scroll" : "Pause to scroll manually"}
            >
              {isManualPaused ? <FiPlay size={11} /> : <FiPause size={11} />}
              <span>{isManualPaused ? "RESUME" : "PAUSE TO SCROLL"}</span>
            </button>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-md bg-card border border-card-border text-foreground hover:border-foreground transition-colors flex items-center gap-1 text-[11px] font-mono"
            >
              <span>OPEN</span>
              <FiExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Scrollable Viewport Canvas:
            On mobile, when auto-scrolling, pointer-events are disabled so user swiping smoothly scrolls the page.
            When paused via the button, manual scrolling inside the frame is unlocked! */}
        <div
          ref={containerRef}
          className={`relative w-full h-[460px] sm:h-[500px] bg-black/60 select-none ${
            isManualPaused
              ? "overflow-y-auto pointer-events-auto touch-pan-y cursor-grab active:cursor-grabbing"
              : "overflow-hidden sm:overflow-y-auto pointer-events-none sm:pointer-events-auto touch-none sm:touch-auto"
          }`}
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="w-full relative">
            <Image
              src={imgSrc}
              alt={alt}
              width={1440}
              height={4800}
              className="w-full h-auto object-top pointer-events-auto"
              priority
            />
          </div>

          {/* Persistent Status Cue */}
          <div className="absolute bottom-3 left-3 pointer-events-none px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-md border border-card-border text-[10px] font-mono text-muted flex items-center gap-1.5 shadow-md">
            {isManualPaused ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-foreground font-semibold">Paused • Scroll freely to explore</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Auto-scrolling • Tap &apos;PAUSE TO SCROLL&apos; to explore</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlapping Mobile Screen Frame */}
      {mobileImgSrc && (
        <div className="hidden sm:block absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-4 w-[160px] sm:w-[190px] md:w-[210px] aspect-[9/18] rounded-2xl border-4 border-card bg-black shadow-2xl overflow-hidden ring-1 ring-white/10 group-hover:-translate-y-1 transition-transform duration-500">
          <div className="relative w-full h-full">
            <Image
              src={mobileImgSrc}
              alt={`${alt} mobile view`}
              fill
              sizes="220px"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}
    </div>
  );
}
