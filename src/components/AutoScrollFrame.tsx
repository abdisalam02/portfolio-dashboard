"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

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
  mobileImgSrc,
}: AutoScrollFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animId: number;
    const container = containerRef.current;
    if (!container) return;

    let lastTime = performance.now();
    const speed = 38;
    let isResetting = false;
    let subpixelScroll = container.scrollTop;

    const step = (now: number) => {
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!isPaused && !isResetting && container) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        if (maxScroll > 0 && subpixelScroll >= maxScroll - 3) {
          isResetting = true;
          setTimeout(() => {
            if (container) {
              subpixelScroll = 0;
              container.scrollTop = 0;
              isResetting = false;
            }
          }, 1600);
        } else if (maxScroll > 0) {
          subpixelScroll += speed * delta;
          container.scrollTop = subpixelScroll;
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPaused]);

  return (
    <div
      className="relative group"
      style={{ overflowAnchor: "none" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Clean Frameless Desktop Viewport */}
      <div className="rounded-xl bg-card border border-card-border overflow-hidden">
        <div
          className="relative w-full h-[440px] sm:h-[500px] overflow-hidden bg-black/60 select-none"
          style={{ overflowAnchor: "none" }}
        >
          <div
            ref={containerRef}
            className="w-full h-full overflow-y-hidden pointer-events-none select-none"
            style={{ scrollbarWidth: "none", overflowAnchor: "none" }}
          >
            <div className="w-full relative pointer-events-none">
              <Image
                src={imgSrc}
                alt={alt}
                width={1440}
                height={4800}
                className="w-full h-auto object-top pointer-events-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Mobile Screen Frame */}
      {mobileImgSrc && (
        <div className="hidden sm:block absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-4 w-[160px] sm:w-[190px] md:w-[210px] aspect-[9/18] rounded-xl border-4 border-card bg-black overflow-hidden ring-1 ring-card-border">
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
