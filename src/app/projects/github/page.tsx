"use client";

import { useEffect, useState } from "react";
import Loading from "../../Loading";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/abdisalam02/repos");
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data: Repo[] = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate a brief loading delay
    const timer = setTimeout(() => fetchRepos(), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All GitHub Repositories
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <motion.div 
            key={repo.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <FaGithub size={32} className="text-gray-800 dark:text-gray-200" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {repo.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {repo.description || "No description available."}
              </p>
            </div>
            <motion.a 
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block text-white bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              View Repository
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
