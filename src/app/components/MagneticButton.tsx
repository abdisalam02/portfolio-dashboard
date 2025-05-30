"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  magneticStrength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  disabled = false,
  magneticStrength = 0.4
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const commonProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: reset,
    className: `cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`,
    onClick: disabled ? undefined : onClick
  };

  const animatedContent = (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
        mass: 0.5
      }}
    >
      {children}
    </motion.div>
  );

  if (href && !disabled) {
    return (
      <div {...commonProps}>
        <a href={href} target={target} rel={rel}>
          {animatedContent}
        </a>
      </div>
    );
  }

  return (
    <div {...commonProps}>
      {animatedContent}
    </div>
  );
} 