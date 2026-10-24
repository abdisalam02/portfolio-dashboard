"use client";

import { useRef, useEffect } from "react";

/**
 * Pure iPhone Mockup Showcase for Sadija.
 * Optimized for mobile Safari & Chrome hardware video decoding:
 * 1. Seeks strictly to 0.0s (the exact IDR keyframe of the MP4 stream) instead of 0.2s,
 *    preventing non-keyframe software decode stalls on mobile.
 * 2. Uses a GPU-promoted 3D transform layer (translate3d + backface-visibility: hidden)
 *    at native pixel density instead of oversized fractional percentage layout widths.
 * 3. Pauses automatically when scrolled out of view via IntersectionObserver.
 */
export default function SadijaReelPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    const el = containerRef.current;
    if (!v || !el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    // Loop strictly at 23.85s back to keyframe 0.0s before the 24.35s signature curtain
    if (v.currentTime >= 23.85) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center"
    >
      {/* Slim 19.5:9 iPhone Hardware Chassis */}
      <div
        className="relative rounded-[42px] p-[8px] bg-[#141518] border border-card-border"
        style={{
          boxShadow:
            "0 22px 44px -12px rgba(0, 0, 0, 0.26), inset 0 0 0 1.25px rgba(255, 255, 255, 0.16)",
        }}
      >
        {/* Hardware Side Buttons */}
        <div className="pointer-events-none absolute -left-[2.5px] top-[72px] w-[2.5px] h-[16px] rounded-l-sm bg-[#2a2b30]" />
        <div className="pointer-events-none absolute -left-[2.5px] top-[102px] w-[2.5px] h-[32px] rounded-l-sm bg-[#2a2b30]" />
        <div className="pointer-events-none absolute -left-[2.5px] top-[142px] w-[2.5px] h-[32px] rounded-l-sm bg-[#2a2b30]" />
        <div className="pointer-events-none absolute -right-[2.5px] top-[116px] w-[2.5px] h-[44px] rounded-r-sm bg-[#2a2b30]" />

        {/* Inner Phone Screen Viewport sized for crisp 1:1 pixel density */}
        <div
          className="relative w-[248px] sm:w-[266px] aspect-[271/587] rounded-[34px] overflow-hidden bg-[#fcfbf8]"
          style={{
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
            transform: "translateZ(0)",
          }}
        >
          {/* Dynamic Island */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[6px] left-1/2 -translate-x-1/2 z-20 w-[58px] h-[13px] rounded-full bg-[#0b0b0d]"
          />

          {/* GPU-Accelerated Video Layer */}
          <div
            className="w-[159.41%] h-[130.83%] will-change-transform [backface-visibility:hidden]"
            style={{
              transform: "translate3d(-18.63%, -15.43%, 0)",
            }}
          >
            <video
              ref={videoRef}
              src="/showcase/sadija/sadija-reel-agure.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-fill pointer-events-none select-none [backface-visibility:hidden]"
            />
          </div>

          {/* Home Indicator Bar */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[5px] left-1/2 -translate-x-1/2 z-20 w-[82px] h-[3.5px] rounded-full bg-[#141518]/25"
          />
        </div>
      </div>
    </div>
  );
}
