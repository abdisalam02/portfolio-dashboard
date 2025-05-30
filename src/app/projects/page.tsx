/* eslint-disable */
/* @typescript-eslint/no-unused-vars */
/* @typescript-eslint/no-explicit-any */
/* react/no-unescaped-entities: "off" */
"use client";

import { useEffect, useState } from "react";
import Loading from "../Loading";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
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
    title: "Music App",
    description: "A dynamic music app that leverages Spotify and Deezer APIs.",
    url: "/projects/4",
    image: "/images/Music.png",
    tech: ["React", "Spotify API", "Deezer API", "Supabase"],
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
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
        // Sort by stars and updated date, then take the most recent/popular ones
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
    <div className="min-h-screen">
      {/* Decorative elements */}
      <div className="fixed top-20 right-10 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-20 left-10 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-tr from-green-500/10 to-yellow-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="p-4 md:p-6 space-y-16 pb-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <TextReveal
            text="My Projects"
            type="fadeUp"
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          />
          <TextReveal
            text="Showcasing my development journey through real-world applications"
            type="slideIn"
            delay={0.5}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Featured Projects Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              Featured Projects
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Hand-picked projects that showcase my skills and passion for development
            </p>
          </motion.div>
          
          {/* Mobile: Stack cards, Desktop: Horizontal scroll */}
          <div className="block md:hidden">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {selectedProjects.map((project, index) => (
                <motion.div key={project.id} variants={projectCardVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="hidden md:block">
            <div className="overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex space-x-6 px-4 pb-4"
              >
                {selectedProjects.map((project, index) => (
                  <motion.div 
                    key={project.id} 
                    variants={projectCardVariants}
                    className="min-w-[350px] flex-shrink-0"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* GitHub Repositories Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">
              GitHub Repositories
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Open source projects and code samples from my development journey
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                variants={repoCardVariants}
              >
                <RepoCard repo={repo} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <MagneticButton
              href="/projects/github"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              magneticStrength={0.3}
            >
              View All Repositories →
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
    <div className="relative group h-full">
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
      
      <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
        <MagneticButton
          href={project.url}
          className="block h-full"
          magneticStrength={0.2}
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-full flex flex-col"
          >
            {/* Project Image */}
            <div className="relative overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  project.status === 'Live' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                    Featured
                  </span>
                </div>
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* External link icon */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaExternalLinkAlt className="text-white text-lg" />
              </div>
            </div>
            
            {/* Project Content */}
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-800/60 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </MagneticButton>
      </div>
    </div>
  );
}

// Repository Card Component
function RepoCard({ repo }: { repo: Repo }) {
  return (
    <motion.div
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 relative overflow-hidden group h-full flex flex-col"
      whileHover={{ y: -5 }}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent" />
      
      {/* GitHub Icon with glow effect */}
      <div className="mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
        <FaGithub size={40} className="text-gray-800 dark:text-gray-200 relative z-10 mx-auto" />
      </div>
      
      {/* Repository Info */}
      <div className="text-center flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {repo.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-grow">
          {repo.description || "No description available."}
        </p>
        
        {/* Repository Stats */}
        <div className="flex items-center justify-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
          {repo.stargazers_count !== undefined && (
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-500" />
              <span>{repo.stargazers_count}</span>
            </div>
          )}
          {repo.language && (
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>{repo.language}</span>
            </div>
          )}
        </div>
        
        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4 justify-center">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
        
        {/* View Repository Button */}
        <MagneticButton
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-2 rounded-lg shadow transition-all duration-300 text-sm font-medium"
          magneticStrength={0.2}
        >
          View Repository
        </MagneticButton>
      </div>
    </motion.div>
  );
}
