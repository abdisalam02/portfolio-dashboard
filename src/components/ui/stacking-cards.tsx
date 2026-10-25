"use client";

// Adapted from fancycomponents.dev "stacking-cards" (author: Khoa Phan).
// Uses framer-motion (already installed) instead of the `motion` package, and
// a fixed sticky offset so cards stop below the fixed site header.
import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";

interface StackingCardsProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  scrollOptions?: UseScrollOptions;
  scaleMultiplier?: number;
  totalCards: number;
}

interface StackingCardItemProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  index: number;
  /** Peek offset of this card inside its sticky slot. */
  topPosition?: string;
  /** Where the slot sticks, measured from the viewport top. */
  stickyTop?: string;
}

const StackingCardsContext = createContext<{
  progress: MotionValue<number>;
  scaleMultiplier?: number;
  totalCards: number;
} | null>(null);

function useStackingCardsContext() {
  const context = useContext(StackingCardsContext);
  if (!context)
    throw new Error("StackingCardItem must be used within StackingCards");
  return context;
}

export default function StackingCards({
  children,
  className = "",
  scrollOptions,
  scaleMultiplier,
  totalCards,
  ...props
}: StackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    ...scrollOptions,
    target: targetRef,
  });

  return (
    <StackingCardsContext.Provider
      value={{ progress: scrollYProgress, scaleMultiplier, totalCards }}
    >
      <div className={className} ref={targetRef} {...props}>
        {children}
      </div>
    </StackingCardsContext.Provider>
  );
}

export function StackingCardItem({
  index,
  topPosition,
  stickyTop = "5rem",
  className = "",
  style,
  children,
  ...props
}: StackingCardItemProps) {
  const { progress, scaleMultiplier, totalCards } = useStackingCardsContext();
  const scaleTo = 1 - (totalCards - index) * (scaleMultiplier ?? 0.03);
  const scale = useTransform(progress, [index * (1 / totalCards), 1], [1, scaleTo]);
  const top = topPosition ?? `${index * 14}px`;

  const slotStyle: CSSProperties = { top: stickyTop, ...style };

  return (
    <div className={`sticky ${className}`} style={slotStyle} {...props}>
      <motion.div
        className="origin-top relative h-full will-change-transform"
        style={{ top, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
