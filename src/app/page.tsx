"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { selectedProjects } from "./projects/projectsData";
import Link from "next/link";
import Image from "next/image";
import TechBadge from "./components/TechBadge";

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useTransform(mouseX, (v) => v + 20);
  const previewY = useTransform(mouseY, (v) => v - 80);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setAtBottom(isBottom);
    };
    
    check();
    window.addEventListener("resize", check);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const heroWords = ["DESIGN.", "DEVELOP.", "DEPLOY."];

  return (
    <div className="min-h-screen" onMouseMove={handleMouseMove}>
      {/* === HERO SECTION === */}
      <section className="min-h-[90vh] flex flex-col justify-center px-4 md:px-12 max-w-7xl mx-auto relative">
        {/* Status Badge */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        {/* Main Headline */}
        <div className="space-y-0">
          {heroWords.map((word, index) => (
            <div key={index} className="overflow-hidden">
              <motion.h1
                className="text-7xl sm:text-8xl md:text-[10vw] lg:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter transition-colors duration-500"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                whileInView={isMobile ? { color: "var(--accent)" } : {}}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.33, 1, 0.68, 1],
                  delay: index * 0.1,
                }}
                whileHover={!isMobile ? {
                  x: 30,
                  color: "var(--accent)",
                  transition: { duration: 0.2, ease: "easeOut" },
                } : {}}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Sub Copy */}
        <motion.div
          className="mt-8 md:mt-16 flex flex-col items-start border-t-2 border-foreground pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
            <div className="relative w-20 h-24 md:w-28 md:h-32 border-2 border-foreground grayscale hover:grayscale-0 transition-all duration-500 bg-foreground/5 flex-shrink-0">
              <Image src="/images/profile.png" alt="Abdisalam" fill className="object-cover" />
            </div>
            <div className="max-w-md">
              <motion.p 
                className="text-lg md:text-xl font-sans leading-relaxed transition-colors duration-500"
                whileInView={isMobile ? { color: "var(--accent)" } : {}}
                viewport={{ margin: "-45% 0px -45% 0px" }}
              >
                Freelancer who brings ideas to life through elegant code and purposeful design.
              </motion.p>
              <motion.p 
                className="text-sm mt-2 font-sans transition-colors duration-500"
                whileInView={isMobile ? { color: "var(--accent)", opacity: 1 } : { color: "var(--foreground)", opacity: 0.5 }}
                viewport={{ margin: "-45% 0px -45% 0px" }}
              >
                Bachelor&apos;s in Information Systems — Oslo, Norway
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* === FEATURED PROJECTS === */}
      <section className="border-t-2 border-foreground" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xs font-bold tracking-widest uppercase text-foreground/50">
              SELECTED WORK
            </h2>
            <span className="text-xs font-bold tracking-widest text-foreground/50">
              ({selectedProjects.length.toString().padStart(2, "0")})
            </span>
          </div>

          {/* Project Rows with Cursor Image Reveal */}
          <div className="divide-y-2 divide-foreground border-y-2 border-foreground">
            {selectedProjects.map((project, index) => {
              const isLast = index === selectedProjects.length - 1;
              return (
                <Link
                  href={`/projects/${project.id}`}
                  key={project.id}
                  className="group block"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  data-cursor="link"
                >
                  <motion.div 
                    className="flex items-center justify-between py-6 md:py-8 px-2 md:px-4 transition-colors group-hover:bg-accent group-hover:text-[#111] active:bg-accent active:text-[#111]"
                    whileInView={isMobile ? { backgroundColor: "var(--accent)", color: "#111" } : {}}
                    animate={isMobile && isLast && atBottom ? { backgroundColor: "var(--accent)", color: "#111" } : {}}
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-4 md:gap-12">
                      <span className="text-xs font-bold tracking-widest text-foreground/40 group-hover:text-[#111]/60 w-8">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <h3 className="text-xl md:text-4xl font-bold uppercase tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="flex items-center gap-2 md:gap-6">
                        {project.tech.slice(0, 2).map((t) => (
                          <TechBadge key={t} name={t} isParentHovered={hoveredProject === index} />
                        ))}
                      </div>
                      <span className="text-xl md:text-2xl transition-transform group-hover:translate-x-2">→</span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Floating cursor-follow image preview — desktop only */}
          {hoveredProject !== null && (
            <motion.div
              className="hidden md:block fixed pointer-events-none z-30 w-64 h-40 overflow-hidden border-2 border-foreground"
              style={{ x: previewX, y: previewY }}
            >
              <Image
                src={selectedProjects[hoveredProject].image}
                alt={selectedProjects[hoveredProject].title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* === MARQUEE === */}
      <section className="border-t-2 border-foreground py-6 md:pb-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-6xl md:text-8xl font-black uppercase tracking-tighter mx-8 text-foreground/10">
              DESIGN • DEVELOP • DEPLOY •
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}