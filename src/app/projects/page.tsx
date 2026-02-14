/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
/* @typescript-eslint/no-explicit-any */
/* react/no-unescaped-entities: "off" */
"use client";

import { useEffect, useState } from "react";
import Loading from "../Loading";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from "react-icons/fa";
import TextReveal from "../components/TextReveal";
import MagneticButton from "../components/MagneticButton";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count?: number;
  language?: string;
  topics?: string[];
}

const MAX_REPOS = 6;

const selectedProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js and Tailwind CSS.",
    url: "/projects/1",
    image: "/images/portfolio.png",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    status: "Live",
    featured: true
  },
  {
    id: 2,
    title: "Recipes App",
    description: "A recipe app with nutritional info and user submissions.",
    url: "/projects/2",
    image: "/images/Recipe.png",
    tech: ["React", "Firebase", "Spoonacular API"],
    status: "Live",
    featured: true
  },
  {
    id: 3,
    title: "Task App",
    description: "Task management with points system and authentication.",
    url: "/projects/3",
    image: "/images/Taks.png",
    tech: ["Next.js", "MongoDB", "NextAuth"],
    status: "In Development",
    featured: false
  },
  {
    id: 4,
    title: "MusicBoxd ",
    description: "A modern music discovery and social platform",
    url: "/projects/4",
    image: "/images/Music.png",
    tech: ["Next.js 15", "Spotify API", "Deezer API", "Supabase",],
    status: "Live",
    featured: true
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const projectCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const repoCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/abdisalam02/repos");
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        const sortedRepos = data
          .sort((a: Repo, b: Repo) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, MAX_REPOS);
        setRepos(sortedRepos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen pt-20">
      <div className="p-4 md:p-6 space-y-24 pb-24 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <TextReveal
            text="Featured Projects"
            type="fadeUp"
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
          />
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            A selection of my recent work, featuring web applications built with modern technologies.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <section>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {selectedProjects.map((project) => (
              <motion.div key={project.id} variants={projectCardVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* GitHub Repositories Section */}
        <section className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Open Source
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Explore my latest code contributions and experiments on GitHub.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.map((repo) => (
              <motion.div key={repo.id} variants={repoCardVariants}>
                <RepoCard repo={repo} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <MagneticButton
              href="https://github.com/abdisalam02"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md shadow-glow"
              magneticStrength={0.3}
            >
              <FaGithub className="text-xl" />
              <span>View GitHub Profile</span>
            </MagneticButton>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: { 
  id: number;
  title: string; 
  description: string; 
  url: string; 
  image: string; 
  tech: string[];
  status: string;
  featured: boolean;
} }) {
  return (
    <div className="group relative h-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-500 shadow-glass">
      <MagneticButton href={project.url} className="block h-full" magneticStrength={0.1}>
        <div className="flex flex-col h-full">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
              {project.status}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 flex-grow flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <FaExternalLinkAlt className="text-white/40 group-hover:text-cyan-400 transition-colors" />
            </div>
            
            <p className="text-white/70 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto pt-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium text-white/80 bg-white/5 border border-white/10 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </MagneticButton>
    </div>
  );
}

// Repository Card Component
function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
    >
      <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 relative overflow-hidden flex flex-col space-y-4">
        {/* Holographic Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex items-start justify-between relative z-10">
          <div className="p-2 rounded-lg bg-white/5 text-white/80 group-hover:text-cyan-400 transition-colors">
            <FaCodeBranch size={20} />
          </div>
          <div className="flex items-center gap-3 text-sm text-white/50">
             {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400/50" />
                  {repo.language}
                </span>
             )}
             {repo.stargazers_count !== undefined && (
                <span className="flex items-center gap-1">
                   <FaStar className="text-yellow-500/70" /> {repo.stargazers_count}
                </span>
             )}
          </div>
        </div>

        <div className="relative z-10 space-y-2 flex-grow">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {repo.name}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
            {repo.description || "No description available."}
          </p>
        </div>

        <div className="relative z-10 pt-2 flex flex-wrap gap-2">
           {repo.topics?.slice(0, 3).map(topic => (
             <span key={topic} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-white/40">
               {topic}
             </span>
           ))}
        </div>
      </div>
    </a>
  );
}
