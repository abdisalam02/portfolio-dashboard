"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { selectedProjects } from "../projectsData";
import { FaArrowLeft, FaTimes, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import TechBadge from "../../components/TechBadge";

export default function ProjectDetail() {
  const { id } = useParams() as { id: string };
  const project = selectedProjects.find((p) => p.id === Number(id));
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [hoveredStack, setHoveredStack] = useState(false);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="border-2 border-foreground p-12 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">404</h1>
          <p className="text-xs font-bold tracking-widest text-foreground/50 mb-6">PROJECT NOT FOUND</p>
          <Link
            href="/projects"
            className="text-xs font-bold tracking-widest border-2 border-foreground px-6 py-3 hover:bg-accent hover:text-[#111] hover:border-accent transition-colors"
          >
            ← BACK TO PROJECTS
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh] border-b-2 border-foreground overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/30" />

        {/* Back Button */}
        <Link
          href="/projects"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-xs font-bold tracking-widest border-2 border-foreground bg-background px-4 py-2 hover:bg-accent hover:text-[#111] hover:border-accent transition-colors"
          data-cursor="link"
        >
          <FaArrowLeft size={10} /> BACK
        </Link>
      </section>

      {/* Project Data - Technical Schematic Style */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-2 border-foreground">
          {/* Main Info */}
          <div className="md:col-span-8 border-b-2 md:border-b-0 md:border-r-2 border-foreground p-8 md:p-12 space-y-8">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-2">PROJECT_TITLE</span>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                {project.title}
              </h1>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-2">DESCRIPTION</span>
              <p className="text-lg font-sans leading-relaxed text-foreground/80">
                {project.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-4">FEATURES</span>
              <div className="space-y-0 border-t border-foreground/20">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 py-3 border-b border-foreground/20">
                    <span className="text-[10px] font-bold tracking-widest text-foreground/30 w-6">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-sm font-sans">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div 
            className="md:col-span-4 p-8 md:p-10 space-y-8"
            onMouseEnter={() => setHoveredStack(true)}
            onMouseLeave={() => setHoveredStack(false)}
          >
            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-2">YEAR</span>
              <span className="text-2xl font-black">{project.year}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-4">STACK</span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <TechBadge key={t} name={t} isParentHovered={hoveredStack} />
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="space-y-0 border-t-2 border-foreground pt-6">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full py-4 border-b border-foreground/20 text-xs font-bold tracking-widest hover:text-accent transition-colors"
                  data-cursor="link"
                >
                  <span className="flex items-center gap-2"><FaExternalLinkAlt size={10} /> LIVE DEMO</span>
                  <span>→</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full py-4 border-b border-foreground/20 text-xs font-bold tracking-widest hover:text-accent transition-colors"
                  data-cursor="link"
                >
                  <span className="flex items-center gap-2"><FaGithub size={12} /> SOURCE CODE</span>
                  <span>→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
          <span className="text-xs font-bold tracking-widest text-foreground/40 block mb-8">GALLERY</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">
            {project.gallery.map((imgPath, index) => (
              <motion.div
                key={index}
                className="relative aspect-video border border-foreground/20 overflow-hidden cursor-pointer group"
                whileHover={{ scale: 0.98 }}
                onClick={() => setModalImage(imgPath)}
                data-cursor="link"
              >
                <Image
                  src={imgPath}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-500 group-hover:grayscale"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60">
                  <span className="text-xs font-bold tracking-widest">[ VIEW ]</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 flex justify-between items-center">
          <Link
            href={`/projects/${Math.max(1, Number(id) - 1)}`}
            className={`text-xs font-bold tracking-widest border-2 border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors ${
              Number(id) <= 1 ? "opacity-30 pointer-events-none" : ""
            }`}
            data-cursor="link"
          >
            ← PREV
          </Link>
          <Link
            href="/projects"
            className="text-xs font-bold tracking-widest text-foreground/50 hover:text-accent transition-colors"
            data-cursor="link"
          >
            ALL PROJECTS
          </Link>
          <Link
            href={`/projects/${Math.min(selectedProjects.length, Number(id) + 1)}`}
            className={`text-xs font-bold tracking-widest border-2 border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors ${
              Number(id) >= selectedProjects.length ? "opacity-30 pointer-events-none" : ""
            }`}
            data-cursor="link"
          >
            NEXT →
          </Link>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-xs font-bold tracking-widest border-2 border-foreground px-4 py-2 hover:bg-accent hover:text-[#111] hover:border-accent transition-colors z-10"
              onClick={() => setModalImage(null)}
              data-cursor="link"
            >
              <FaTimes />
            </button>
            <motion.div
              className="relative w-full max-w-5xl aspect-video border-2 border-foreground"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <Image src={modalImage} alt="Full view" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
