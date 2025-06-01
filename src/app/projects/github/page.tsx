"use client";

import { useEffect, useState } from "react";
import Loading from "../../Loading";
import { motion } from "framer-motion";
import { FaGithub, FaCode, FaStar, FaCodeBranch, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import LoadingLink from "../../components/LoadingLink";

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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

// Language color mapping
const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  HTML: "bg-orange-500",
  CSS: "bg-blue-400",
  Python: "bg-blue-600",
  PHP: "bg-indigo-600",
  Java: "bg-red-500",
  "C#": "bg-green-600",
  Ruby: "bg-red-600",
  Go: "bg-blue-300",
  Swift: "bg-orange-600",
  Kotlin: "bg-purple-500",
  Rust: "bg-brown-500",
  Dart: "bg-teal-500",
};

export default function GitHubProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/abdisalam02/repos");
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data: Repo[] = await response.json();
        // Sort by most recently updated
        data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
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

  // Get unique languages for filter
  const languages = Array.from(new Set(repos.filter(repo => repo.language).map(repo => repo.language))) as string[];

  // Filter repos based on selected filter and search term
  const filteredRepos = repos.filter(repo => {
    const matchesFilter = filter === "all" || repo.language === filter;
    const matchesSearch = searchTerm === "" || 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 pb-24 space-y-8">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-green-500/10 to-yellow-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <LoadingLink href="/projects">
            <motion.div 
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4"
              whileHover={{ x: -5 }}
            >
              <FaArrowLeft className="mr-2" /> Back to Projects
            </motion.div>
          </LoadingLink>
          <motion.h1 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            GitHub Repositories
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore all my public repositories on GitHub
          </motion.p>
        </div>
        
        <motion.div 
          className="w-full md:w-auto flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Language filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="all">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </motion.div>
      </div>

      {filteredRepos.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRepos.map((repo) => (
            <motion.div
              key={repo.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex flex-col relative overflow-hidden group"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent"></div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="mr-3 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <FaGithub size={28} className="text-gray-800 dark:text-gray-200 relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {repo.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Updated on {formatDate(repo.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
                {repo.description || "No description available."}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.language && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-20 dark:bg-opacity-30 text-gray-800 dark:text-gray-200">
                    <span className={`w-2 h-2 rounded-full mr-1.5 ${languageColors[repo.language] || 'bg-gray-400'}`}></span>
                    {repo.language}
                  </span>
                )}
                {repo.topics && repo.topics.slice(0, 2).map(topic => (
                  <span key={topic} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 bg-opacity-50 dark:bg-opacity-30 text-blue-800 dark:text-blue-200">
                    {topic}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <FaStar className="mr-1" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center">
                  <FaCodeBranch className="mr-1" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
              
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-2 rounded-lg shadow transition-all duration-300"
              >
                <FaCode className="mr-2" /> View Code
              </a>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-block p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <FaGithub size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No repositories found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? `No results for "${searchTerm}"` : "No repositories match the selected filter"}
          </p>
          <button 
            onClick={() => {setFilter("all"); setSearchTerm("");}}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
