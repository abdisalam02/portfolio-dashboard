"use client";

import { cn } from "@/utils/cn";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={cn(
        "row-span-1 cursor-pointer group/bento relative overflow-hidden rounded-3xl",
        "bg-white/5 border border-white/10 backdrop-blur-sm",
        "flex flex-col justify-between space-y-4 p-6 hover:bg-white/10 transition-colors duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
    >
      {/* Holographic Border Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/bento:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      {header}
      
      <div className="relative z-10 group-hover/bento:translate-x-2 transition duration-200">
        <div className="flex items-center gap-2 mb-2">
           {icon}
           <div className="font-sans font-semibold text-white text-lg tracking-tight">
             {title}
           </div>
        </div>
        <div className="font-sans text-white/60 text-sm">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
