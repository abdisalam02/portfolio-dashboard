"use client";

import { useRef, useEffect } from "react";

/**
 * Pure iPhone Mockup Showcase for Sadija.
 * Crops out all outer canvas text ("My first client...", "agure.space") and
 * loops strictly between 0.2s and 24.0s so the end signature screen never appears.
 * Only the live scrolling Sadija mobile page inside the slim iPhone chassis is shown.
 */
export default function SadijaReelPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0.2;
  }, []);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    // Cut before the 24.35s fade-to-signature finale so only the website scroll plays
    if (v.currentTime >= 23.9) {
      v.currentTime = 0.2;
      v.play().catch(() => {});
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Slim 19.5:9 iPhone Hardware Chassis */}
      <div
        className="relative rounded-[44px] p-[9px] bg-[#141518] border border-card-border"
        style={{
          boxShadow:
            "0 24px 48px -12px rgba(0, 0, 0, 0.26), inset 0 0 0 1.25px rgba(255, 255, 255, 0.16)",
        }}
      >
        {/* Hardware Side Buttons */}
        <div className="pointer-events-none absolute -left-[2.5px] top-[76px] w-[2.5px] h-[18px] rounded-l-sm bg-[#2a2b30]" />
        <div className="pointer-events-none absolute -left-[2.5px] top-[108px] w-[2.5px] h-[34px] rounded-l-sm bg-[#2a2b30]" />
        <div className="pointer-events-none absolute -left-[2.5px] top-[150px] w-[2.5px] h-[34px] rounded-l-sm bg-[#2a2b30]" />
        <div className="pointer-events-none absolute -right-[2.5px] top-[122px] w-[2.5px] h-[48px] rounded-r-sm bg-[#2a2b30]" />

        {/* Inner 271x587 (390:844) Phone Screen Viewport — Cropped strictly to the inner phone screen of the recording */}
        <div className="relative w-[271px] sm:w-[290px] aspect-[271/587] rounded-[35px] overflow-hidden bg-[#fcfbf8]">
          {/* Dynamic Island */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[7px] left-1/2 -translate-x-1/2 z-20 w-[62px] h-[14px] rounded-full bg-[#0b0b0d]"
          />

          {/* In ReelDirector (432x768), the inner 271x587 screen sits at left=80.5px (18.63%), top=118.5px (15.43%).
              Scaling the 432x768 video to 159.41% width and 130.83% height and offsetting aligns the inner phone screen 1:1. */}
          <video
            ref={videoRef}
            src="/showcase/sadija/sadija-reel-agure.mp4"
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="absolute max-w-none pointer-events-none select-none"
            style={{
              width: "159.41%",
              height: "130.83%",
              left: "-29.7%",
              top: "-20.19%",
            }}
          />

          {/* Home Indicator Bar */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[5px] left-1/2 -translate-x-1/2 z-20 w-[86px] h-[3.5px] rounded-full bg-[#141518]/25"
          />
        </div>
      </div>
    </div>
  );
}
