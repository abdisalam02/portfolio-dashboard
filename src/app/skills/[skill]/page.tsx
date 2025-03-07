
/* eslint react/no-unescaped-entities: "off" */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaJsSquare, FaPython, FaReact, FaHtml5, FaCss3Alt, FaPhp } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiMysql } from "react-icons/si";
import Loading from "../../Loading";
import React from "react";

// Define a type for our skill data
type SkillData = {
  name: string;
  icon: React.ReactElement;
  bg: string;
};

// Annotate the skills object using a Record type
const skills: Record<string, SkillData> = {
  javascript: { name: "JavaScript", icon: <FaJsSquare className="text-yellow-500 text-6xl" />, bg: "bg-yellow-500" },
  typescript: { name: "TypeScript", icon: <SiTypescript className="text-blue-600 text-6xl" />, bg: "bg-blue-600" },
  python: { name: "Python", icon: <FaPython className="text-blue-400 text-6xl" />, bg: "bg-blue-400" },
  react: { name: "React", icon: <FaReact className="text-blue-500 text-6xl" />, bg: "bg-blue-500" },
  "next-js": { name: "Next.js", icon: <SiNextdotjs className="text-gray-800 text-6xl" />, bg: "bg-gray-800" },
  html: { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-6xl" />, bg: "bg-orange-500" },
  mysql: { name: "MySQL", icon: <SiMysql className="text-blue-600 text-6xl" />, bg: "bg-blue-600" },
  css: { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-6xl" />, bg: "bg-blue-500" },
  php: { name: "PHP", icon: <FaPhp className="text-indigo-600 text-6xl" />, bg: "bg-indigo-600" },
};

export default function SkillPage() {
  const params = useParams();

  // Convert params.skill to a string: if it's an array, use the first element.
  const skillParam =
    typeof params.skill === "string"
      ? params.skill
      : Array.isArray(params.skill)
      ? params.skill[0]
      : "";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!skillParam) {
    return <div className="text-center text-xl font-bold">No skill provided</div>;
  }

  // Now we can safely call toLowerCase on skillParam
  const skillData = skills[skillParam.toLowerCase()];

  if (!skillData) {
    return <div className="text-center text-xl font-bold">Skill not found</div>;
  }

  return (
    <div className="p-6">
      <div className={`rounded-lg shadow-lg p-6 flex items-center space-x-4 ${skillData.bg} text-white`}>
        {skillData.icon}
        <h1 className="text-3xl font-bold">{skillData.name}</h1>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Projects using {skillData.name}</h2>
        <p className="text-gray-700">
          This is where you can list or describe the projects related to {skillData.name}.
        </p>
      </div>
    </div>
  );
}
