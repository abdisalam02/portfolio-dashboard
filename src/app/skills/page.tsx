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
  FaArrowLeft,
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { SiNextdotjs, SiMysql, SiTypescript } from "react-icons/si";
import Loading from "../Loading";
import TextReveal from "../components/TextReveal";
import MagneticButton from "../components/MagneticButton";
import ScrollReveal from "../components/ScrollReveal";

interface Skill {
  name: string;
  route: string;
  level: number;
  icon: React.ReactElement;
  description: string;
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
  {
    name: "HTML",
    route: "html",
    level: 95,
    icon: <FaHtml5 className="text-orange-500 text-5xl" />,
    description: "Semantic markup, accessibility best practices, and modern HTML5 features.",
    githubLanguages: ["HTML"],
  },
  {
    name: "CSS",
    route: "css",
    level: 90,
    icon: <FaCss3Alt className="text-blue-500 text-5xl" />,
    description: "Responsive design, animations, CSS Grid, Flexbox, and CSS preprocessors.",
    githubLanguages: ["CSS", "SCSS"],
  },
  {
    name: "JavaScript",
    route: "javascript",
    level: 90,
    icon: <FaJsSquare className="text-yellow-400 text-5xl" />,
    description: "ES6+, async/await, DOM manipulation, and modern JavaScript patterns.",
    githubLanguages: ["JavaScript"],
  },
  {
    name: "TypeScript",
    route: "typescript",
    level: 85,
    icon: <SiTypescript className="text-blue-600 text-5xl" />,
    description: "Type safety, interfaces, generics, and advanced TypeScript features.",
    githubLanguages: ["TypeScript"],
  },
  {
    name: "React",
    route: "react",
    level: 85,
    icon: <FaReact className="text-cyan-400 text-5xl" />,
    description: "Hooks, context API, custom hooks, and state management solutions.",
    githubLanguages: ["JavaScript", "TypeScript"],
  },
  {
    name: "SQL",
    route: "sql",
    level: 80,
    icon: <SiMysql className="text-blue-600 text-5xl" />,
    description: "Database design, complex queries, and performance optimization.",
    githubLanguages: ["SQL", "PLpgSQL"],
  },
  {
    name: "Python",
    route: "python",
    level: 40,
    icon: <FaPython className="text-yellow-500 text-5xl" />,
    description: "Data analysis, automation scripts, and backend development.",
    githubLanguages: ["Python"],
  },
  {
    name: "PHP",
    route: "php",
    level: 40,
    icon: <FaPhp className="text-indigo-400 text-5xl" />,
    description: "Server-side scripting, CMS development, and web applications.",
    githubLanguages: ["PHP"],
  },
  {
    name: "Next.js",
    route: "next-js",
    level: 80,
    icon: <SiNextdotjs className="text-foreground text-5xl" />,
    description: "Server-side rendering, static site generation, and API routes.",
    githubLanguages: ["TypeScript", "JavaScript"],
  },
];

const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  HTML: "bg-orange-500",
  CSS: "bg-blue-400",
  Python: "bg-blue-600",
  PHP: "bg-indigo-600",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const skillCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const detailVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25, when: "beforeChildren", staggerChildren: 0.1 },
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [reposLoading, setReposLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch GitHub repos when a skill is selected
  useEffect(() => {
    if (!selectedSkill) {
      setRepos([]);
      return;
    }

    const fetchRepos = async () => {
      setReposLoading(true);
      try {
        const response = await fetch("https://api.github.com/users/abdisalam02/repos?per_page=100");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: Repo[] = await response.json();

        const skillName = selectedSkill.name.toLowerCase();
        const matchingLangs = selectedSkill.githubLanguages.map((l) => l.toLowerCase());

        const filtered = data.filter((repo) => {
          const langMatch = repo.language && matchingLangs.includes(repo.language.toLowerCase());
          const topicMatch = repo.topics && repo.topics.some(
            (t) => t.toLowerCase().includes(skillName) || matchingLangs.some((ml) => t.toLowerCase().includes(ml))
          );
          return langMatch || topicMatch;
        });

        filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        setRepos(filtered);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setRepos([]);
      } finally {
        setReposLoading(false);
      }
    };

    fetchRepos();
  }, [selectedSkill]);

  if (loading) return <Loading />;

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        {selectedSkill ? (
          <motion.div
            key="skill-detail"
            variants={detailVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8 max-w-5xl mx-auto"
          >
            {/* Back button */}
            <motion.div>
              <MagneticButton
                onClick={() => setSelectedSkill(null)}
                className="inline-flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors px-4 py-2 rounded-full bg-foreground/[0.03] border border-foreground/[0.06] backdrop-blur-md"
                magneticStrength={0.2}
              >
                <FaArrowLeft />
                <span>Back to Skills</span>
              </MagneticButton>
            </motion.div>

            {/* Skill Detail Card */}
            <div className="relative overflow-hidden rounded-3xl bg-foreground/[0.03] border border-foreground/[0.06] backdrop-blur-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                <div className="p-6 rounded-2xl bg-foreground/[0.04] border border-foreground/[0.06]">
                  {selectedSkill.icon}
                </div>
                <div className="space-y-4 flex-grow">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">{selectedSkill.name}</h1>
                  <p className="text-xl text-foreground/60 leading-relaxed">{selectedSkill.description}</p>

                  {/* Progress Bar */}
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-foreground/50">Proficiency</span>
                      <span className="text-cyan-600 dark:text-cyan-400">{selectedSkill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Projects Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaGithub className="text-foreground/50" size={22} />
                <h2 className="text-2xl font-bold text-foreground">
                  Projects using {selectedSkill.name}
                </h2>
                {!reposLoading && repos.length > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-foreground/[0.06] text-foreground/50 text-xs font-semibold">
                    {repos.length}
                  </span>
                )}
              </div>

              {reposLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] p-6 animate-pulse">
                      <div className="h-5 bg-foreground/10 rounded w-2/3 mb-3" />
                      <div className="h-4 bg-foreground/10 rounded w-full mb-2" />
                      <div className="h-4 bg-foreground/10 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : repos.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {repos.map((repo) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={skillCardVariants}
                      whileHover={{ y: -3 }}
                      className="block rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] p-6 hover:bg-foreground/[0.06] transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <FaGithub className="text-foreground/40 flex-shrink-0" size={20} />
                          <h3 className="font-bold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                            {repo.name}
                          </h3>
                        </div>
                        <FaExternalLinkAlt className="text-foreground/20 group-hover:text-foreground/50 transition-colors flex-shrink-0 ml-2" size={12} />
                      </div>

                      <p className="text-sm text-foreground/50 line-clamp-2 mb-4">
                        {repo.description || "No description available."}
                      </p>

                      <div className="flex items-center justify-between text-xs text-foreground/40">
                        <div className="flex items-center gap-4">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-full ${languageColors[repo.language] || "bg-gray-400"}`} />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <FaStar size={11} /> {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCodeBranch size={11} /> {repo.forks_count}
                          </span>
                        </div>
                        <span>{formatDate(repo.updated_at)}</span>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 rounded-2xl bg-foreground/[0.02] border border-foreground/[0.06]">
                  <FaGithub className="mx-auto text-foreground/20 mb-4" size={40} />
                  <p className="text-foreground/50 text-lg font-medium">
                    No public repositories found using {selectedSkill.name}
                  </p>
                  <p className="text-foreground/30 text-sm mt-1">
                    Projects using this skill may be private or not yet published.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="skills-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-16"
          >
            <div className="text-center space-y-6">
              <TextReveal
                text="Skills & Expertise"
                type="fadeUp"
                className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground"
              />
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                A comprehensive look at my technical toolkit and proficiency levels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.map((skill) => (
                <ScrollReveal key={skill.name}>
                  <motion.div
                    variants={skillCardVariants}
                    className="group cursor-pointer h-full"
                    onClick={() => handleSkillClick(skill)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="h-full p-8 rounded-3xl bg-foreground/[0.03] border border-foreground/[0.06] backdrop-blur-sm hover:bg-foreground/[0.06] transition-all duration-300 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 p-4 rounded-2xl bg-foreground/[0.04] transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <div className="relative z-10 space-y-2">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-foreground/50 line-clamp-2">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Learning Journey Timeline */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="rounded-3xl bg-foreground/[0.03] border border-foreground/[0.06] backdrop-blur-sm p-8 md:p-12">
                <h2 className="text-3xl font-bold text-foreground mb-8">Learning Journey</h2>
                <div className="space-y-8 border-l border-foreground/10 ml-4 pl-8">
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                    <h3 className="text-xl font-bold text-foreground">2024 - Present</h3>
                    <p className="text-foreground/50 mt-2">Mastering Next.js, Advanced React Patterns, and Full-Stack Architecture.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-purple-500/50" />
                    <h3 className="text-xl font-bold text-foreground">2023 - 2024</h3>
                    <p className="text-foreground/50 mt-2">Deep dive into Frontend Frameworks, State Management, and API Integration.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-foreground/20" />
                    <h3 className="text-xl font-bold text-foreground">2022 - 2023</h3>
                    <p className="text-foreground/50 mt-2">Foundations of Web Development: HTML, CSS, JavaScript, and Algorithms.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
