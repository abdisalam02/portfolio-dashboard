"use client";

import { motion } from "framer-motion";

// Adapted from Skiper UI "skiper58" (staggered letter roll). Adds an `active`
// prop so touch screens can trigger the same roll on a timer instead of hover.
const STAGGER = 0.035;

interface TextRollProps {
  children: string;
  className?: string;
  center?: boolean;
  active?: boolean;
}

export function TextRoll({
  children,
  className = "",
  center = false,
  active = false,
}: TextRollProps) {
  const letters = Array.from(children);

  const delayFor = (i: number) =>
    center
      ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
      : STAGGER * i;

  // Non-breaking space keeps word gaps from collapsing inside inline-block letters
  const glyph = (l: string) => (l === " " ? "\u00A0" : l);

  return (
    <motion.span
      initial="initial"
      animate={active ? "hovered" : "initial"}
      whileHover="hovered"
      className={`relative block overflow-hidden whitespace-nowrap ${className}`}
      style={{ lineHeight: 1.1 }}
    >
      <span className="sr-only">{children}</span>

      <span className="block" aria-hidden="true">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ ease: "easeInOut", delay: delayFor(i) }}
            className="inline-block"
          >
            {glyph(l)}
          </motion.span>
        ))}
      </span>

      <span className="absolute inset-0 block" aria-hidden="true">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ ease: "easeInOut", delay: delayFor(i) }}
            className="inline-block"
          >
            {glyph(l)}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

export default TextRoll;
