"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState<"default" | "link" | "text">("default");
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [data-cursor='link']")) {
        setHoverState("link");
      } else if (target.closest("p, h1, h2, h3, h4, h5, h6, span, label")) {
        setHoverState("text");
      } else {
        setHoverState("default");
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible, isTouchDevice]);

  const size = hoverState === "link" ? 60 : hoverState === "text" ? 4 : 12;
  const mixBlend = hoverState === "link" ? "mix-blend-difference" : "";

  if (isTouchDevice) return null;

  return (
    <>
      {/* Crosshair / Dot */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 border-accent flex items-center justify-center ${mixBlend}`}
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {hoverState === "link" && (
          <span className="text-accent text-[10px] font-bold tracking-widest uppercase">
            VIEW
          </span>
        )}
      </motion.div>
      {/* Small trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-accent rounded-full pointer-events-none z-[9998]"
        animate={{
          x: position.x - 2,
          y: position.y - 2,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
        }}
      />
    </>
  );
}
