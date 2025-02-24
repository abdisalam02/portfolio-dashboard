/* eslint react/no-unescaped-entities: "off" */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../Loading";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa"; // Default GitHub icon for repos

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

const MAX_REPOS = 4;

const selectedProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js and Tailwind CSS.",
    url: "/projects/1",
    image: "/images/portfolio.png", // Path to image in public/img/
    tech: ["Next.js", "Tailwind", "Framer Motion"],
  },
  {
    id: 2,
    title: "Recipes App",
    description: "A recipe app with nutritional info and user submissions.",
    url: "/projects/2",
    image: "/images/Recipe.png",
    tech: ["React", "Firebase", "Spoonacular API"],
  },
  {
    id: 3,
    title: "Task App",
    description: "Task management with points system and authentication.",
    url: "/projects/3",
    image: "/images/Taks.png",
    tech: ["Next.js", "MongoDB", "NextAuth"],
  },
  {
    id: 4,
    title: "Music App",
    description:
      "A dynamic music app that leverages Spotify and Deezer APIs.",
    url: "/projects/4",
    image: "/images/Music.png",
    tech: ["React", "Spotify API", "Deezer API", "Supabase",],
  },
];


export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/abdisalam02/repos");
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepos(data.slice(0, MAX_REPOS));
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
    <div className="p-6 space-y-12">
      {/* Selected Projects Section */}
      <section>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100"
        >
          Selected Projects
        </motion.h1>
        
        <div className="overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
  <div className="flex space-x-8 px-4">
    {selectedProjects.map((project, index) => (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
        className="min-w-[250px] sm:min-w-[300px] relative group flex-shrink-0"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <Link href={project.url}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    ))}
  </div>
</div>

      </section>

      {/* GitHub Repositories Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100"
        >
          GitHub Repositories
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-4">
                <FaGithub size={48} className="text-gray-800 dark:text-gray-200" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                {repo.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {repo.description || "No description available."}
              </p>
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                whileHover={{ scale: 1.05 }}
              >
                View Repository
              </motion.a>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8 mb-20">
          <Link
            href="/projects/github"
            className="inline-block w-full max-w-xs mx-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition"
          >
            See More Repositories
          </Link>
        </div>
      </section>
    </div>
  );
}
