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
  const [isHovered, setIsHovered] = useState(false);

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

      if (!isManualPaused && !isHovered && !isResetting && container) {
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
  }, [isManualPaused, isHovered]);

  return (
    <div className="relative group">
      {/* Main Desktop Frame */}
      <div className="rounded-2xl bg-card border border-card-border shadow-2xl overflow-hidden">
        {/* Subtle Clean Header Bar (No Faux Mac Dots) */}
        <div className="px-4 py-2.5 bg-background/85 border-b border-card-border/60 flex items-center justify-between text-xs font-mono text-muted">
          <div className="flex items-center gap-2">
            <span className="truncate">{domain}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted hidden sm:inline">
              {isHovered ? "PAUSED" : "AUTO-SCROLL"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsManualPaused(!isManualPaused)}
              className="hover:text-foreground transition-colors flex items-center gap-1 text-[11px]"
              title={isManualPaused ? "Resume Auto-scroll" : "Pause Auto-scroll"}
            >
              {isManualPaused ? <FiPlay size={10} /> : <FiPause size={10} />}
              <span>{isManualPaused ? "PLAY" : "PAUSE"}</span>
            </button>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1 text-[11px]"
            >
              <span>OPEN</span>
              <FiExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Scrollable Viewport Canvas */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full h-[460px] sm:h-[500px] overflow-y-auto bg-black/60 select-none"
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

          {/* Hover Status Cue */}
          <div className="absolute bottom-3 left-3 pointer-events-none px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-md border border-card-border text-[10px] font-mono text-muted transition-opacity duration-300 opacity-70 group-hover:opacity-100">
            {isHovered ? "Scroll freely to explore" : "Hover to pause"}
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
