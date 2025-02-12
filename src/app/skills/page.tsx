/* eslint react/no-unescaped-entities: "off" */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaJsSquare, FaPython, FaReact, FaHtml5, FaCss3Alt, FaPhp } from "react-icons/fa";
import { SiNextdotjs, SiMysql } from "react-icons/si";
import Loading from "../Loading";

interface Skill {
  name: string;
  route: string;
  level: number;
  color: string;
  icon: React.ReactElement;
}

const skillsData: Skill[] = [
  { name: "HTML", route: "html", level: 95, color: "bg-orange-500", icon: <FaHtml5 className="text-white text-5xl" /> },
  { name: "CSS", route: "css", level: 90, color: "bg-blue-500", icon: <FaCss3Alt className="text-white text-5xl" /> },
  { name: "JavaScript", route: "javascript", level: 90, color: "bg-yellow-500", icon: <FaJsSquare className="text-white text-5xl" /> },
  { name: "React", route: "react", level: 85, color: "bg-blue-400", icon: <FaReact className="text-white text-5xl" /> },
  { name: "SQL", route: "sql", level: 80, color: "bg-blue-600", icon: <SiMysql className="text-white text-5xl" /> },
  { name: "Python", route: "python", level: 75, color: "bg-blue-400", icon: <FaPython className="text-white text-5xl" /> },
  { name: "PHP", route: "php", level: 60, color: "bg-indigo-600", icon: <FaPhp className="text-white text-5xl" /> },
  { name: "Next.js", route: "next.js", level: 70, color: "bg-gray-800", icon: <SiNextdotjs className="text-white text-5xl" /> },
];

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
  };

  const handleBack = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="p-6 space-y-12">
      <AnimatePresence>
        {selectedSkill && (
          <>
            {/* Skill Detail Card */}
            <motion.div
              key="skillCard"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg shadow-lg p-6 flex flex-col items-center bg-white dark:bg-gray-800"
            >
              <div className="flex items-center space-x-4">
                {selectedSkill.icon}
                <h1 className="text-3xl font-bold">{selectedSkill.name}</h1>
              </div>
              <div className="w-full bg-gray-300 rounded-lg h-4 mt-6">
                <motion.div
                  className={`h-4 rounded-lg ${selectedSkill.color}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${selectedSkill.level}%` }}
                  transition={{ duration: 1 }}
                ></motion.div>
              </div>
              <button
                onClick={handleBack}
                className="mt-4 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition border border-gray-300"
              >
                Back
              </button>
            </motion.div>
            {/* GitHub Projects Section */}
            <motion.div
              key="projectsSection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h2 className="text-2xl font-bold mb-4">
                Projects using {selectedSkill.name}
              </h2>
              <GitHubProjectsBySkill skillName={selectedSkill.name} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!selectedSkill && (
          <motion.section
            key="skillsList"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-6">Skills</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillsData.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="space-y-4 block cursor-pointer"
                  onClick={() => handleSkillClick(skill)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`flex items-center justify-center ${skill.color} rounded-lg p-6 shadow-lg`}
                  >
                    {skill.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-medium">{skill.name}</h2>
                    <div className="w-full bg-gray-300 rounded-lg h-4">
                      <div
                        className={`h-4 rounded-lg ${skill.color} transition-all duration-700 ease-in-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
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
    if (lowerSkill === "react") {
      return repos.filter(
        (repo) =>
          (repo.name && repo.name.toLowerCase().includes("react")) ||
          (repo.description && repo.description.toLowerCase().includes("react"))
      );
    } else if (lowerSkill === "next.js") {
      return repos.filter(
        (repo) =>
          (repo.name && repo.name.toLowerCase().includes("next")) ||
          (repo.description && repo.description.toLowerCase().includes("next"))
      );
    } else {
      return repos.filter(
        (repo) =>
          repo.language && repo.language.toLowerCase() === lowerSkill
      );
    }
  };

  const filteredRepos = getFilteredRepos();

  if (reposLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRepos.length > 0 ? (
        filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4"
          >
            <h3 className="text-xl font-bold mb-2">{repo.name}</h3>
            <p className="text-gray-600 mb-2">
              {repo.description || "No description available."}
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Repository
            </a>
          </div>
        ))
      ) : (
        <p>No projects found for {skillName}.</p>
      )}
    </div>
  );
}
