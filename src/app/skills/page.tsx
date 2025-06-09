"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaJsSquare,
  FaPython,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaGithub,
  FaArrowLeft
} from "react-icons/fa";
import { SiNextdotjs, SiMysql, SiTypescript } from "react-icons/si";
import Loading from "../Loading";
import Skill3D from "../components/Skill3D";
import TextReveal from "../components/TextReveal";
import MagneticButton from "../components/MagneticButton";

interface Skill {
  name: string;
  route: string;
  level: number;
  color: string;
  gradient: string;
  icon: React.ReactElement;
  description: string;
}

const skillsData: Skill[] = [
  {
    name: "HTML",
    route: "html",
    level: 95,
    color: "bg-orange-500",
    gradient: "from-orange-500 to-orange-600",
    icon: <FaHtml5 className="text-white text-5xl" />,
    description: "Semantic markup, accessibility best practices, and modern HTML5 features."
  },
  {
    name: "CSS",
    route: "css",
    level: 90,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
    icon: <FaCss3Alt className="text-white text-5xl" />,
    description: "Responsive design, animations, CSS Grid, Flexbox, and CSS preprocessors."
  },
  {
    name: "JavaScript",
    route: "javascript",
    level: 90,
    color: "bg-yellow-500",
    gradient: "from-yellow-500 to-yellow-600",
    icon: <FaJsSquare className="text-white text-5xl" />,
    description: "ES6+, async/await, DOM manipulation, and modern JavaScript patterns."
  },
  {
    name: "TypeScript",
    route: "typescript",
    level: 85,
    color: "bg-blue-600",
    gradient: "from-blue-600 to-blue-700",
    icon: <SiTypescript className="text-white text-5xl" />,
    description: "Type safety, interfaces, generics, and advanced TypeScript features."
  },
  {
    name: "React",
    route: "react",
    level: 85,
    color: "bg-blue-400",
    gradient: "from-blue-400 to-blue-500",
    icon: <FaReact className="text-white text-5xl" />,
    description: "Hooks, context API, custom hooks, and state management solutions."
  },
  {
    name: "SQL",
    route: "sql",
    level: 80,
    color: "bg-blue-600",
    gradient: "from-blue-600 to-blue-700",
    icon: <SiMysql className="text-white text-5xl" />,
    description: "Database design, complex queries, and performance optimization."
  },
  {
    name: "Python",
    route: "python",
    level: 40,
    color: "bg-blue-400",
    gradient: "from-blue-400 to-blue-500",
    icon: <FaPython className="text-white text-5xl" />,
    description: "Data analysis, automation scripts, and backend development."
  },
  {
    name: "PHP",
    route: "php",
    level: 40,
    color: "bg-indigo-600",
    gradient: "from-indigo-600 to-indigo-700",
    icon: <FaPhp className="text-white text-5xl" />,
    description: "Server-side scripting, CMS development, and web applications."
  },
  {
    name: "Next.js",
    route: "next-js",
    level: 80,
    color: "bg-gray-800",
    gradient: "from-gray-800 to-gray-900",
    icon: <SiNextdotjs className="text-white text-5xl" />,
    description: "Server-side rendering, static site generation, and API routes."
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const skillCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const detailVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: 50,
    transition: {
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

// Helper function to convert Tailwind color classes to hex
function getSkillColor(colorClass: string): string {
  const colorMap: Record<string, string> = {
    'bg-orange-500': '#f97316',
    'bg-blue-500': '#3b82f6',
    'bg-yellow-500': '#eab308',
    'bg-blue-600': '#2563eb',
    'bg-blue-400': '#60a5fa',
    'bg-indigo-600': '#4f46e5',
    'bg-gray-800': '#1f2937'
  };
  return colorMap[colorClass] || '#3b82f6';
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    // Scroll to top smoothly when a skill is selected (mobile-friendly)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="p-6 pb-24 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-green-500/10 to-yellow-500/10 rounded-full blur-3xl -z-10"></div>
      
      <AnimatePresence mode="wait">
        {selectedSkill ? (
          <motion.div
            key="skill-detail"
            variants={detailVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            {/* Back button */}
            <motion.div variants={itemVariants}>
              <MagneticButton
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                magneticStrength={0.2}
              >
                <FaArrowLeft />
                <span>Back to all skills</span>
              </MagneticButton>
            </motion.div>
            
            {/* Skill Detail Card */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-xl shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${selectedSkill.gradient} opacity-90`}></div>
              <div className="relative p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 z-10">
                <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full">
                  {selectedSkill.icon}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-bold text-white mb-2">{selectedSkill.name}</h1>
                  <p className="text-white/90 text-lg max-w-2xl mb-6">{selectedSkill.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-md">
                    <div className="flex justify-between mb-2">
                      <span className="text-white/90">Proficiency</span>
                      <span className="text-white font-bold">{selectedSkill.level}%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <motion.div
                        className="h-3 rounded-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* GitHub Projects Section */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Projects using {selectedSkill.name}
              </h2>
              <GitHubProjectsBySkill skillName={selectedSkill.name} />
            </motion.div>
            
            {/* Experience section */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Experience with {selectedSkill.name}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mt-1"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Used {selectedSkill.name} in multiple projects, both personal and professional.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mt-1"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Continuously learning new techniques and best practices.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mt-1"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Implemented complex features and solved challenging problems.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="skills-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <motion.div variants={skillCardVariants}>
              <TextReveal
                text="My Skills & Expertise"
                type="fadeUp"
                className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillsData.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={skillCardVariants}
                  className="group"
                >
                  <Skill3D
                    skillName={skill.name}
                    color={getSkillColor(skill.color)}
                    level={skill.level}
                    onClick={() => handleSkillClick(skill)}
                    className="p-4"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Learning Journey Timeline */}
            <motion.div
              variants={skillCardVariants}
              className="mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                My Learning Journey
              </h2>
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-blue-500">
                  <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-blue-500"></div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">2024 - 2025</h3>
                  <p className="text-gray-600 dark:text-gray-400">Advanced web development with React, Next.js, and TypeScript</p>
                </div>
                <div className="relative pl-8 border-l-2 border-green-500">
                  <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-green-500"></div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">2023 - 2024</h3>
                  <p className="text-gray-600 dark:text-gray-400">Frontend frameworks and modern JavaScript</p>
                </div>
                <div className="relative pl-8 border-l-2 border-purple-500">
                  <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-purple-500"></div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">2022 - 2023</h3>
                  <p className="text-gray-600 dark:text-gray-400">Fundamentals of web development and programming</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface GitHubProjectsBySkillProps {
  skillName: string;
}

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
}

function GitHubProjectsBySkill({ skillName }: GitHubProjectsBySkillProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);

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
        setReposLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const getFilteredRepos = (): Repo[] => {
    const lowerSkill = skillName.toLowerCase();
    
    // Enhanced matching logic for different skills
    switch(lowerSkill) {
      case "react":
        return repos.filter(repo => 
          (repo.name && repo.name.toLowerCase().includes("react")) ||
          (repo.description && repo.description.toLowerCase().includes("react")) ||
          (repo.topics && repo.topics.some(topic => topic.toLowerCase().includes("react")))
        );
        
      case "next.js":
        return repos.filter(repo => 
          (repo.name && repo.name.toLowerCase().includes("next")) ||
          (repo.description && repo.description.toLowerCase().includes("next")) ||
          (repo.topics && repo.topics.some(topic => 
            topic.toLowerCase().includes("next") || 
            topic.toLowerCase().includes("nextjs")
          ))
        );
        
      case "sql":
        // For SQL, look for repos that might use databases
        return repos.filter(repo => 
          (repo.name && (
            repo.name.toLowerCase().includes("sql") ||
            repo.name.toLowerCase().includes("database") ||
            repo.name.toLowerCase().includes("db") ||
            repo.name.toLowerCase().includes("mysql") ||
            repo.name.toLowerCase().includes("postgres")
          )) ||
          (repo.description && (
            repo.description.toLowerCase().includes("sql") ||
            repo.description.toLowerCase().includes("database") ||
            repo.description.toLowerCase().includes("mysql") ||
            repo.description.toLowerCase().includes("postgres") ||
            repo.description.toLowerCase().includes("supabase")
          )) ||
          // PHP projects often use SQL
          (repo.language && repo.language.toLowerCase() === "php") ||
          // Check for database-related topics
          (repo.topics && repo.topics.some(topic => 
            topic.toLowerCase().includes("database") ||
            topic.toLowerCase().includes("sql") ||
            topic.toLowerCase().includes("mysql") ||
            topic.toLowerCase().includes("postgres") ||
            topic.toLowerCase().includes("supabase")
          ))
        );
        
      case "javascript":
        return repos.filter(repo => 
          (repo.language && repo.language.toLowerCase() === "javascript") ||
          (repo.name && repo.name.toLowerCase().includes("js")) ||
          (repo.description && repo.description.toLowerCase().includes("javascript")) ||
          (repo.topics && repo.topics.some(topic => 
            topic.toLowerCase().includes("javascript") || 
            topic.toLowerCase() === "js"
          ))
        );
        
      case "typescript":
        return repos.filter(repo => 
          (repo.language && repo.language.toLowerCase() === "typescript") ||
          (repo.name && repo.name.toLowerCase().includes("ts")) ||
          (repo.description && repo.description.toLowerCase().includes("typescript")) ||
          (repo.topics && repo.topics.some(topic => 
            topic.toLowerCase().includes("typescript") || 
            topic.toLowerCase() === "ts"
          ))
        );
        
      case "html":
        return repos.filter(repo => 
          (repo.language && repo.language.toLowerCase() === "html") ||
          // Most web projects use HTML, so include frontend projects
          (repo.description && (
            repo.description.toLowerCase().includes("frontend") ||
            repo.description.toLowerCase().includes("website") ||
            repo.description.toLowerCase().includes("web app")
          )) ||
          (repo.topics && repo.topics.some(topic => 
            topic.toLowerCase().includes("html") || 
            topic.toLowerCase().includes("frontend") ||
            topic.toLowerCase().includes("website")
          ))
        );
        
      case "css":
        return repos.filter(repo => 
          (repo.language && repo.language.toLowerCase() === "css") ||
          (repo.name && repo.name.toLowerCase().includes("css")) ||
          (repo.description && (
            repo.description.toLowerCase().includes("css") ||
            repo.description.toLowerCase().includes("style") ||
            repo.description.toLowerCase().includes("tailwind") ||
            repo.description.toLowerCase().includes("bootstrap")
          )) ||
          (repo.topics && repo.topics.some(topic => 
            topic.toLowerCase().includes("css") || 
            topic.toLowerCase().includes("tailwind") ||
            topic.toLowerCase().includes("bootstrap") ||
            topic.toLowerCase().includes("styled")
          ))
        );
        
      case "python":
        return repos.filter(repo => 
          (repo.language && repo.language.toLowerCase() === "python") ||
          (repo.name && repo.name.toLowerCase().includes("py")) ||
          (repo.description && repo.description.toLowerCase().includes("python")) ||
          (repo.topics && repo.topics.some(topic => 
            topic.toLowerCase().includes("python") || 
            topic.toLowerCase() === "py"
          ))
        );
        
      case "php":
        return repos.filter(repo => 
          (repo.language && repo.language.toLowerCase() === "php") ||
          (repo.name && repo.name.toLowerCase().includes("php")) ||
          (repo.description && repo.description.toLowerCase().includes("php")) ||
          (repo.topics && repo.topics.some(topic => 
            topic.toLowerCase().includes("php") || 
            topic.toLowerCase().includes("wordpress") ||
            topic.toLowerCase().includes("laravel")
          ))
        );
        
      default:
        // Default case for any other skill
        return repos.filter(repo => 
          (repo.language && repo.language.toLowerCase() === lowerSkill) ||
          (repo.name && repo.name.toLowerCase().includes(lowerSkill)) ||
          (repo.description && repo.description.toLowerCase().includes(lowerSkill)) ||
          (repo.topics && repo.topics.some(topic => topic.toLowerCase().includes(lowerSkill)))
        );
    }
  };

  const filteredRepos = getFilteredRepos();
  const lowerSkill = skillName.toLowerCase();

  // If no repos found for SQL, show a fallback message with more context
  const noReposMessage = lowerSkill === "sql" 
    ? "No SQL-specific projects found. SQL is used in many of my backend projects with database integration."
    : `No projects found for ${skillName}. Check back later as I continue to add more projects!`;

  if (reposLoading) {
    return <div className="flex justify-center py-8">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredRepos.length > 0 ? (
        filteredRepos.map((repo) => (
          <motion.div
            key={repo.id}
            variants={skillCardVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent"></div>
            
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                  <FaGithub size={32} className="text-gray-800 dark:text-gray-200 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {repo.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {repo.description || "No description available."}
              </p>
              {repo.language && (
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {repo.language}
                  </span>
                </div>
              )}
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-2 rounded-lg shadow transition-all duration-300"
            >
              View Repository
            </a>
          </motion.div>
        ))
      ) : (
        <motion.div 
          variants={skillCardVariants}
          className="col-span-full text-center py-8 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <FaGithub size={32} />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Matching Projects
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {noReposMessage}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
