"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { selectedProjects } from "../projectsData";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiReact,
  SiNodedotjs,
  SiSupabase,
  SiOpenai,
  SiTypescript,
  SiSpotify,
} from "react-icons/si";
import { GiFruitBowl } from "react-icons/gi";
import { FaArrowLeft, FaTimes, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import LoadingLink from "../../components/LoadingLink";
import ScrollReveal from "../../components/ScrollReveal";

// Updated mapping of technology names to icons
const techIcons: Record<string, JSX.Element> = {
  "Next.js": <SiNextdotjs size={20} className="inline-block mr-1" />,
  Tailwind: <SiTailwindcss size={20} className="inline-block mr-1" />,
  "Tailwind CSS": <SiTailwindcss size={20} className="inline-block mr-1" />,
  "Framer Motion": <SiFramer size={20} className="inline-block mr-1" />,
  React: <SiReact size={20} className="inline-block mr-1" />,
  NutriAPI: <GiFruitBowl size={20} className="inline-block mr-1" />,
  SupabaseAuth: <SiSupabase size={20} className="inline-block mr-1" />,
  "Node.js": <SiNodedotjs size={20} className="inline-block mr-1" />,
  Supabase: <SiSupabase size={20} className="inline-block mr-1" />,
  "AI Integration": <SiOpenai size={20} className="inline-block mr-1" />,
  "Next.js 15": <SiNextdotjs size={20} className="inline-block mr-1" />,
  "React 19": <SiReact size={20} className="inline-block mr-1" />,
  TypeScript: <SiTypescript size={20} className="inline-block mr-1" />,
  "Spotify API": <SiSpotify size={20} className="inline-block mr-1" />,
};

export default function ProjectDetail() {
  const { id } = useParams() as { id: string };
  const project = selectedProjects.find((p) => p.id === Number(id));
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Modal state for gallery image
  const [modalImage, setModalImage] = useState<string | null>(null);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-foreground">
        Project not found
      </div>
    );

  return (
    <div className="min-h-screen text-foreground relative">
      
      {/* Hero — Full-bleed image with frosted glass island */}
      <section className="relative h-[85vh] sm:h-[80vh] overflow-hidden">
        {/* Full Background Image — stays vivid */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {/* Very subtle vignette — just enough to add depth, not darken */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]" />
        </div>

        {/* Back Button — floats top-left */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 z-30"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 py-2 px-4 bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-full hover:bg-white/30 dark:hover:bg-black/40 transition group shadow-lg"
          >
            <FaArrowLeft size={12} className="text-white group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium text-white">Back</span>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/10 pointer-events-none z-[1]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none z-[1]" />

        {/* Frosted Glass Island — the text card */}
        <div className="absolute inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bottom-8 sm:bottom-12 z-20 sm:w-[90%] sm:max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            {/* Year + Title Row */}
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                {project.year}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1]">
              {project.title}
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 leading-relaxed mt-3 line-clamp-3 sm:line-clamp-none">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-5">
              <Link href={project.url} target="_blank">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow text-sm"
                >
                  <FaExternalLinkAlt className="mr-2" size={11} /> Live Demo
                </motion.div>
              </Link>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-900/10 dark:bg-white/10 border border-gray-900/10 dark:border-white/20 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-900/20 dark:hover:bg-white/20 transition-all text-sm"
                  >
                    <FaGithub className="mr-2" size={14} /> View Code
                  </motion.div>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div ref={ref} className="px-4 py-16 sm:py-24 space-y-16 sm:space-y-24 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Sidebar - Tech & Features */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-foreground/[0.03] border border-foreground/[0.06] backdrop-blur-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl sticky top-24">
                {/* Tech Stack */}
                <h3 className="text-sm font-bold text-foreground/50 mb-4 uppercase tracking-wider">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center px-3 py-1.5 bg-foreground/[0.04] border border-foreground/[0.06] text-foreground/80 rounded-lg text-sm"
                    >
                      {techIcons[tech] || null}
                      <span className="ml-1">{tech}</span>
                    </div>
                  ))}
                </div>
                
                {/* Features */}
                <div className="mt-8 pt-8 border-t border-foreground/[0.06]">
                  <h3 className="text-sm font-bold text-foreground/50 mb-4 uppercase tracking-wider">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-foreground/70">
                        <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-cyan-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Content - Overview & Gallery */}
            <div className="md:col-span-2 space-y-16">
              {/* Overview */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">Overview</h2>
                <div className="space-y-4 text-foreground/70 text-base sm:text-lg leading-relaxed">
                  <p>{project.description}</p>
                  <p>
                    This project represents a significant milestone in my development journey, pushing the boundaries of what I could build with {project.tech[0]} and {project.tech[1]}.
                  </p>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {project.gallery.map((imgPath, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group border border-foreground/[0.06]"
                      onClick={() => setModalImage(imgPath)}
                    >
                      <Image
                        src={imgPath}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-4 py-2 bg-background/60 backdrop-blur-md rounded-full text-foreground text-sm font-medium">View Full</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        {/* Project Navigation */}
        <ScrollReveal>
          <div className="border-t border-foreground/[0.06] pt-12 sm:pt-16">
            <div className="flex justify-between items-center">
              <LoadingLink href={`/projects/${Math.max(1, Number(id) - 1)}`} className={Number(id) <= 1 ? 'opacity-30 pointer-events-none' : ''}>
                <div className="group flex flex-col items-start gap-1">
                  <span className="text-xs text-foreground/40 uppercase tracking-widest group-hover:text-cyan-500 transition-colors">Previous</span>
                  <div className="flex items-center text-foreground/70 group-hover:text-foreground transition-colors font-medium">
                    <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={12} /> Back
                  </div>
                </div>
              </LoadingLink>
              
              <Link href="/projects" className="hidden sm:block">
                <div className="px-5 py-2.5 rounded-full bg-foreground/[0.04] border border-foreground/[0.06] hover:bg-foreground/[0.08] transition-colors">
                  <span className="font-semibold text-foreground/60 text-sm">All Projects</span>
                </div>
              </Link>
              
              <LoadingLink href={`/projects/${Math.min(selectedProjects.length, Number(id) + 1)}`} className={Number(id) >= selectedProjects.length ? 'opacity-30 pointer-events-none' : ''}>
                <div className="group flex flex-col items-end gap-1">
                  <span className="text-xs text-foreground/40 uppercase tracking-widest group-hover:text-cyan-500 transition-colors">Next</span>
                  <div className="flex items-center text-foreground/70 group-hover:text-foreground transition-colors font-medium">
                    Forward <FaArrowLeft className="ml-2 transform rotate-180 group-hover:translate-x-1 transition-transform" size={12} />
                  </div>
                </div>
              </LoadingLink>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal for Full View of Gallery Image */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <motion.div
              className="relative max-w-7xl max-h-[90vh] w-full p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full h-full rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl">
                <Image
                  src={modalImage}
                  alt="Full view"
                  fill
                  className="object-contain bg-background"
                />
              </div>
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-8 right-8 p-3 bg-background/50 border border-foreground/10 hover:bg-foreground/10 rounded-full transition-colors text-foreground"
              >
                <FaTimes size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
