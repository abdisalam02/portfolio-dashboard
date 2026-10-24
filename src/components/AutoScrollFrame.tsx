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
    const speed = 40;
    let isResetting = false;

    const step = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPaused && !isResetting && container) {
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
  }, [isPaused]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Clean Frameless Desktop Viewport */}
      <div className="rounded-xl bg-card border border-card-border overflow-hidden">
        <div className="relative w-full h-[440px] sm:h-[500px] overflow-hidden bg-black/60 select-none">
          <div
            ref={containerRef}
            className="w-full h-full overflow-y-auto pointer-events-none select-none"
            style={{ scrollbarWidth: "none" }}
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
