"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaJsSquare, FaPython, FaReact, FaHtml5, FaCss3Alt, FaPhp } from "react-icons/fa";
import { SiNextdotjs, SiMysql, SiTypescript } from "react-icons/si";
import Loading from "../Loading";

const skillsData = [
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
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100); // Simulate loading delay
    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleBack = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="p-6 space-y-12">
      {/* Selected Skill Section */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`rounded-lg shadow-lg p-6 flex flex-col items-center ${selectedSkill.color} text-white`}
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
              className="mt-4 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Section */}
      <AnimatePresence>
        {!selectedSkill && (
          <motion.section
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
                  className={`space-y-4 block cursor-pointer`}
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
                        style={{
                          width: `${skill.level}%`,
                        }}
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
