/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import TechBadge from "../components/TechBadge";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count?: number;
  language?: string;
  topics?: string[];
}

const selectedProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js and Tailwind CSS.",
    url: "/projects/1",
    image: "/images/portfolio.png",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    year: 2023,
  },
  {
    id: 2,
    title: "Recipes App",
    description: "A recipe app with nutritional info and user submissions.",
    url: "/projects/2",
    image: "/images/Recipe.png",
    tech: ["React", "Firebase", "Spoonacular API"],
    year: 2023,
  },
  {
    id: 3,
    title: "Task App",
    description: "Task management with points system and authentication.",
    url: "/projects/3",
    image: "/images/Taks.png",
    tech: ["Next.js", "MongoDB", "NextAuth"],
    year: 2024,
  },
  {
    id: 4,
    title: "MusicBoxd",
    description: "A modern music discovery and social platform.",
    url: "/projects/4",
    image: "/images/Music.png",
    tech: ["Next.js 15", "Spotify API", "Supabase"],
    year: 2024,
  },
];

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useTransform(mouseX, (v) => v + 20);
  const previewY = useTransform(mouseY, (v) => v - 100);

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

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/abdisalam02/repos?per_page=100&sort=updated");
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        setRepos(data.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen" onMouseMove={handleMouseMove}>
      {/* Header */}
      <section className="border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-widest text-foreground/50 mb-4 block">
              ARCHIVE / WORK
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              PROJECTS
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects - Table View */}
      <section className="border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 py-4 text-xs font-bold tracking-widest text-foreground/40 border-b border-foreground/20">
            <span className="col-span-1">NO.</span>
            <span className="col-span-4">PROJECT</span>
            <span className="col-span-3">STACK</span>
            <span className="col-span-2">YEAR</span>
            <span className="col-span-2 text-right">LINK</span>
          </div>

          {/* Project Rows */}
          {selectedProjects.map((project, index) => (
            <Link
              href={project.url}
              key={project.id}
              className="group block border-b border-foreground/20 last:border-b-0"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              data-cursor="link"
            >
              <motion.div 
                className="flex items-center justify-between md:grid md:grid-cols-12 gap-2 md:gap-4 py-6 md:py-8 transition-colors group-hover:bg-accent group-hover:text-[#111] active:bg-accent active:text-[#111] px-2"
                whileInView={isMobile ? { backgroundColor: "var(--accent)", color: "#111" } : {}}
                viewport={{ margin: "-45% 0px -45% 0px" }}
              >
                <span className="hidden md:block col-span-1 text-xs font-bold tracking-widest text-foreground/40 group-hover:text-[#111]/60">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="flex flex-col md:col-span-4">
                  <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <div className="flex md:hidden gap-1 mt-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </div>
                <div className="col-span-3 hidden md:flex gap-2 flex-wrap">
                  {project.tech.map((t) => (
                    <TechBadge key={t} name={t} isParentHovered={hoveredProject === index} />
                  ))}
                </div>
                <span className="hidden md:block col-span-2 text-sm font-bold text-foreground/50 group-hover:text-[#111]/60">
                  {project.year}
                </span>
                <span className="md:col-span-2 text-xl md:text-2xl md:text-right transition-transform group-hover:translate-x-2">
                  →
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Floating cursor-follow image preview — desktop only */}
        {hoveredProject !== null && (
          <motion.div
            className="hidden md:block fixed pointer-events-none z-30 w-72 h-44 overflow-hidden border-2 border-foreground shadow-lg"
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
      </section>

      {/* Open Source Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-16">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xs font-bold tracking-widest uppercase text-foreground/50">
              OPEN SOURCE
            </h2>
            <a
              href="https://github.com/abdisalam02"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold tracking-widest border-2 border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
              data-cursor="link"
            >
              <FaGithub /> GITHUB
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-foreground">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-foreground/20 p-6 animate-pulse">
                  <div className="h-4 bg-foreground/10 w-2/3 mb-3" />
                  <div className="h-3 bg-foreground/10 w-full mb-2" />
                  <div className="h-3 bg-foreground/10 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-foreground">
              {repos.map((repo, index) => {
                const isLastRow = index >= repos.length - 4; // Assuming 4 cols on lg
                return (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border border-foreground/20 p-6 hover:bg-accent hover:text-[#111] transition-colors"
                    data-cursor="link"
                    whileInView={isMobile ? { backgroundColor: "var(--accent)", color: "#111" } : {}}
                    animate={isMobile && isLastRow && atBottom ? { backgroundColor: "var(--accent)", color: "#111" } : {}}
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <FaGithub className="text-foreground/30 group-hover:text-[#111]/50" />
                      {repo.language && (
                        <span className="text-[10px] font-bold tracking-widest text-foreground/40 group-hover:text-[#111]/60">
                          {repo.language.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm uppercase tracking-tight mb-2 line-clamp-1">
                      {repo.name}
                    </h3>
                    <p className="text-xs text-foreground/50 group-hover:text-[#111]/60 line-clamp-2 font-sans">
                      {repo.description || "No description."}
                    </p>
                  </motion.a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
