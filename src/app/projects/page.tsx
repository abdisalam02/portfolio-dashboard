"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../Loading";
import { motion } from "framer-motion";

const MAX_REPOS = 3;

const selectedProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js and Tailwind CSS.",
    url: "https://your-portfolio.com",
    image: "/images/portfolio.png",
  },
  {
    id: 2,
    title: "E-commerce Store",
    description: "A scalable e-commerce store using TypeScript and Next.js.",
    url: "https://your-ecommerce.com",
    image: "/images/ecommerce.png",
  },
  {
    id: 3,
    title: "Task Manager App",
    description: "A simple yet powerful task manager app built with React.",
    url: "https://your-task-manager.com",
    image: "/images/task-manager.png",
  },
];

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const timer = setTimeout(async () => {
          const response = await fetch("https://api.github.com/users/abdisalam02/repos");
          if (!response.ok) {
            throw new Error("Failed to fetch repositories");
          }
          const data = await response.json();
          setRepos(data.slice(0, MAX_REPOS));
          setLoading(false);
        }, 100);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-12">
      {/* Top Section: Selected Projects */}
      <section>
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Selected Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedProjects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Section: GitHub Repositories */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          GitHub Repositories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                {repo.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {repo.description || "No description available."}
              </p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                View Repository
              </a>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/projects/github"
            className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition"
          >
            See More Repositories
          </Link>
        </div>
      </section>
    </div>
  );
}
