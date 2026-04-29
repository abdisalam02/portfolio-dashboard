"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";

interface Skill {
  name: string;
  level: number;
  color: string;
  githubLanguages: string[];
}

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

const skillsData: Skill[] = [
  { name: "HTML", level: 95, color: "#E34F26", githubLanguages: ["HTML"] },
  { name: "CSS", level: 90, color: "#1572B6", githubLanguages: ["CSS", "SCSS"] },
  { name: "JavaScript", level: 90, color: "#F7DF1E", githubLanguages: ["JavaScript"] },
  { name: "TypeScript", level: 85, color: "#3178C6", githubLanguages: ["TypeScript"] },
  { name: "React", level: 85, color: "#61DAFB", githubLanguages: ["JavaScript", "TypeScript"] },
  { name: "Next.js", level: 80, color: "#888888", githubLanguages: ["TypeScript", "JavaScript"] },
  { name: "SQL", level: 80, color: "#4479A1", githubLanguages: ["SQL", "PLpgSQL"] },
  { name: "Python", level: 40, color: "#3776AB", githubLanguages: ["Python"] },
  { name: "PHP", level: 40, color: "#777BB4", githubLanguages: ["PHP"] },
];

export default function Skills() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsInteractive(false), 3000);
  };

  const handleInteract = () => {
    console.log("INTERACTION ENABLED");
    setIsInteractive(true);
    resetTimeout();
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Matter.js Physics Engine
  useEffect(() => {
    if (selectedSkill || !canvasRef.current) return;

    let cleanup: (() => void) | undefined;

    const initPhysics = async () => {
      const Matter = await import("matter-js");
      const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Bounds } = Matter;

      const container = canvasRef.current;
      if (!container) return;

      const width = container.clientWidth || Math.min(window.innerWidth, 1280);
      const height = 500;

      const engine = Engine.create({ gravity: { x: 0, y: 1 } });
      const render = Render.create({
        element: container,
        engine,
        options: {
          width,
          height,
          wireframes: false,
          background: "transparent",
          pixelRatio: window.devicePixelRatio,
        },
      });

      // Walls
      const wallOpts = { isStatic: true, render: { fillStyle: "transparent" } };
      Composite.add(engine.world, [
        Bodies.rectangle(width / 2, height + 25, width, 50, wallOpts),
        Bodies.rectangle(-25, height / 2, 50, height, wallOpts),
        Bodies.rectangle(width + 25, height / 2, 50, height, wallOpts),
      ]);

      // Skill blocks
      const blocks = skillsData.map((skill, i) => {
        const blockWidth = Math.max(skill.name.length * 14 + 30, 80);
        return Bodies.rectangle(
          100 + (i % 4) * (width / 4),
          -50 - i * 60,
          blockWidth,
          45,
          {
            restitution: 0.4,
            friction: 0.5,
            render: { fillStyle: skill.color },
            label: skill.name,
          }
        );
      });
      Composite.add(engine.world, blocks);

      // Mouse — prevent default scroll stealing
      const mouse = Mouse.create(render.canvas);
      
      // FIX: Perfect mouse coordinates for React layouts (bypasses Matter.js's flawed offsetLeft logic)
      const fixMousePosition = (e: MouseEvent | TouchEvent) => {
        const rect = render.canvas.getBoundingClientRect();
        let clientX, clientY;
        if ('touches' in e && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if ('clientX' in e) {
          clientX = (e as MouseEvent).clientX;
          clientY = (e as MouseEvent).clientY;
        } else return;
        
        mouse.position.x = clientX - rect.left;
        mouse.position.y = clientY - rect.top;
        mouse.absolute.x = mouse.position.x;
        mouse.absolute.y = mouse.position.y;
      };

      render.canvas.addEventListener("mousemove", fixMousePosition, { passive: true });
      render.canvas.addEventListener("mousedown", fixMousePosition, { passive: true });
      render.canvas.addEventListener("touchmove", fixMousePosition, { passive: true });
      render.canvas.addEventListener("touchstart", fixMousePosition, { passive: true });

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });

      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      console.log("PHYSICS READY", { bodies: engine.world.bodies.length });

      Events.on(mouseConstraint, "mousedown", (event) => {
        console.log("MOUSE DOWN", event.mouse.position);
        const body = event.source.body;
        if (body) console.log("GRABBED BODY", body.label);
      });

      // CRITICAL: Allow page scrolling when not dragging a body
      // Remove the wheel event listeners that Matter adds
      render.canvas.addEventListener("wheel", (e) => {
        e.stopPropagation();
      }, { passive: true });

      // Draw labels
      Events.on(render, "afterRender", () => {
        const ctx = render.context;
        if (!ctx) return;
        blocks.forEach((block, i) => {
          const { x, y } = block.position;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(block.angle);
          ctx.font = "bold 13px monospace";
          ctx.fillStyle = "#111";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(skillsData[i].name.toUpperCase(), 0, 0);
          ctx.restore();
        });
      });

      // Click to select skill
      const handleClick = () => {
        const mousePos = mouse.position;
        const bodies = Composite.allBodies(engine.world);
        for (const body of bodies) {
          if (body.isStatic) continue;
          if (Bounds.contains(body.bounds, mousePos)) {
            const skill = skillsData.find((s) => s.name === body.label);
            if (skill) { setSelectedSkill(skill); break; }
          }
        }
      };
      render.canvas.addEventListener("click", handleClick);

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      cleanup = () => {
        render.canvas.removeEventListener("click", handleClick);
        Render.stop(render);
        Runner.stop(runner);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        if (render.canvas.parentNode) render.canvas.parentNode.removeChild(render.canvas);
      };
    };

    initPhysics();
    return () => { if (cleanup) cleanup(); };
  }, [selectedSkill]);

  // Fetch repos for selected skill
  useEffect(() => {
    if (!selectedSkill) { setRepos([]); return; }
    const fetchRepos = async () => {
      setReposLoading(true);
      try {
        const response = await fetch("https://api.github.com/users/abdisalam02/repos?per_page=100");
        if (!response.ok) throw new Error("Failed");
        const data: Repo[] = await response.json();
        const matchingLangs = selectedSkill.githubLanguages.map((l) => l.toLowerCase());
        const filtered = data.filter((repo) => repo.language && matchingLangs.includes(repo.language.toLowerCase()));
        filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        setRepos(filtered);
      } catch { setRepos([]); }
      finally { setReposLoading(false); }
    };
    fetchRepos();
  }, [selectedSkill]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold tracking-widest text-foreground/50 mb-4 block">
              CAPABILITIES / STACK
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              SKILLS
            </h1>
          </motion.div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {selectedSkill ? (
          /* ==================== SKILL DETAIL ==================== */
          <motion.div
            key="skill-detail"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-5xl mx-auto px-4 md:px-12 py-12 space-y-8"
          >
            <button
              onClick={() => setSelectedSkill(null)}
              className="flex items-center gap-2 text-xs font-bold tracking-widest border-2 border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
            >
              <FaArrowLeft /> BACK
            </button>

            <div className="border-2 border-foreground p-8 md:p-12">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center" style={{ backgroundColor: selectedSkill.color }}>
                  <span className="text-[#111] font-black text-lg">{selectedSkill.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{selectedSkill.name}</h2>
                  <span className="text-xs font-bold tracking-widest text-foreground/50">PROFICIENCY: {selectedSkill.level}%</span>
                </div>
              </div>
              <div className="h-3 w-full bg-foreground/10 border border-foreground/20">
                <motion.div className="h-full" style={{ backgroundColor: selectedSkill.color }} initial={{ width: 0 }} animate={{ width: `${selectedSkill.level}%` }} transition={{ duration: 1, ease: "easeOut" }} />
              </div>
            </div>

            {/* Repos */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-foreground/50">
                <FaGithub /> PROJECTS USING {selectedSkill.name.toUpperCase()}
                {!reposLoading && repos.length > 0 && <span className="border border-foreground/20 px-2 py-0.5">{repos.length}</span>}
              </div>
              {reposLoading ? (
                <div className="border-2 border-foreground p-8 text-center text-xs font-bold tracking-widest animate-pulse">FETCHING DATA...</div>
              ) : repos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-foreground">
                  {repos.map((repo) => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group block border border-foreground/20 p-6 hover:bg-accent hover:text-[#111] transition-colors" data-cursor="link">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-sm uppercase tracking-tight">{repo.name}</h3>
                        <FaExternalLinkAlt className="text-foreground/20 group-hover:text-[#111]/50" size={10} />
                      </div>
                      <p className="text-xs text-foreground/50 group-hover:text-[#111]/60 line-clamp-2 font-sans mb-3">{repo.description || "No description."}</p>
                      <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-foreground/30 group-hover:text-[#111]/40">
                        <span className="flex items-center gap-1"><FaStar size={10} /> {repo.stargazers_count}</span>
                        <span className="flex items-center gap-1"><FaCodeBranch size={10} /> {repo.forks_count}</span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-foreground p-8 text-center">
                  <p className="text-xs font-bold tracking-widest text-foreground/40">NO PUBLIC REPOS FOUND</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* ==================== SKILLS GRID ==================== */
          <motion.div key="skills-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Physics Playground */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-xs font-bold tracking-widest text-foreground/40">
                DRAG, THROW, AND CLICK THE BLOCKS BELOW
              </p>
              {!isInteractive && (
                <button
                  onClick={handleInteract}
                  className="text-[10px] font-bold tracking-widest border-2 border-foreground px-3 py-1.5 hover:bg-accent hover:text-[#111] hover:border-accent transition-colors"
                >
                  ENABLE INTERACTION
                </button>
              )}
            </div>
            <div className="border-y-2 border-foreground relative">
              <div
                ref={canvasRef}
                className="w-full max-w-7xl mx-auto overflow-hidden bg-background"
                style={{ 
                  height: 500, 
                  cursor: isInteractive ? "grab" : "default", 
                  touchAction: isInteractive ? "none" : "auto",
                  pointerEvents: isInteractive ? "auto" : "none",
                }}
                onMouseMove={isInteractive ? resetTimeout : undefined}
                onTouchMove={isInteractive ? resetTimeout : undefined}
                onMouseDown={isInteractive ? resetTimeout : undefined}
                onTouchStart={isInteractive ? resetTimeout : undefined}
              />
              
              {/* Overlay for clicking to enable */}
              {!isInteractive && (
                <div 
                  className="absolute inset-0 z-10 flex items-center justify-center bg-transparent cursor-pointer"
                  onClick={handleInteract}
                >
                  <span className="text-xs font-bold tracking-widest bg-background border-2 border-foreground px-6 py-3 shadow-[4px_4px_0_0_var(--foreground)] hover:bg-accent hover:text-[#111] transition-colors">
                    TAP TO INTERACT
                  </span>
                </div>
              )}
            </div>

            {/* Skill list — always shown below */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
              <span className="text-xs font-bold tracking-widest text-foreground/40 block mb-6">
                OR SELECT FROM THE LIST
              </span>
              <div className="divide-y-2 divide-foreground border-y-2 border-foreground">
                {skillsData.map((skill) => (
                  <button
                    key={skill.name}
                    onClick={() => {
                      setSelectedSkill(skill);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full flex items-center justify-between py-5 px-2 hover:bg-accent hover:text-[#111] active:bg-accent active:text-[#111] transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border border-foreground flex-shrink-0" style={{ backgroundColor: skill.color }} />
                      <span className="text-lg font-bold uppercase tracking-tight">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden md:block w-32 h-2 bg-foreground/10 border border-foreground/20">
                        <div className="h-full" style={{ width: `${skill.level}%`, backgroundColor: skill.color }} />
                      </div>
                      <span className="text-xs font-bold tracking-widest text-foreground/40">{skill.level}%</span>
                      <span className="text-foreground/30">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
