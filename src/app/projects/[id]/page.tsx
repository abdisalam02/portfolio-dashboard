"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { selectedProjects } from "../projectsData";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiReact,
  SiNodedotjs,
  SiSupabase,
  SiOpenai,
} from "react-icons/si";
import { GiFruitBowl } from "react-icons/gi";
import { FaArrowLeft, FaTimes } from "react-icons/fa";

// Updated mapping of technology names to icons
const techIcons: Record<string, JSX.Element> = {
  "Next.js": <SiNextdotjs size={20} className="inline-block mr-1" />,
  Tailwind: <SiTailwindcss size={20} className="inline-block mr-1" />,
  "Framer Motion": <SiFramer size={20} className="inline-block mr-1" />,
  React: <SiReact size={20} className="inline-block mr-1" />,
  NutriAPI: <GiFruitBowl size={20} className="inline-block mr-1" />,
  SupabaseAuth: <SiSupabase size={20} className="inline-block mr-1" />,
  "Node.js": <SiNodedotjs size={20} className="inline-block mr-1" />,
  Supabase: <SiSupabase size={20} className="inline-block mr-1" />,
  "AI Integration": <SiOpenai size={20} className="inline-block mr-1" />,
};

export default function ProjectDetail() {
  const { id } = useParams() as { id: string };
  const project = selectedProjects.find((p) => p.id === Number(id));
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Modal state for gallery image
  const [modalImage, setModalImage] = useState<string | null>(null);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Project not found
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Header Section with Parallax Image */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Back Button at Top Left */}
        <div className="absolute top-4 left-4 z-20">
          <Link
            href="/projects"
            className="flex items-center justify-center p-2 border border-white/50 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
          >
            <FaArrowLeft size={24} className="text-white" />
          </Link>
        </div>
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-white drop-shadow-lg"
          >
            {project.title}
          </motion.h1>
          <Link
            href={project.url}
            className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition"
          >
            Live Demo
          </Link>
        </div>
      </section>

      {/* Main Content Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="container mx-auto px-6 py-16 space-y-12"
      >
        <div className="grid md:grid-cols-2 gap-12">
          {/* Project Overview, Year & Technologies */}
          <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Project Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {project.description}
              </p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Year:</span> {project.year}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full shadow-sm"
                  >
                    {techIcons[tech] || null}
                    <span>{tech}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Features & Gallery */}
          <motion.div
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Key Features
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-400">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Project Gallery
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.map((imgPath, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setModalImage(imgPath)}
                  >
                    <Image
                      src={imgPath}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal for Full View of Gallery Image */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking on image
            >
              <Image
                src={modalImage}
                alt="Full view"
                width={1200}
                height={800}
                className="rounded-lg object-contain"
              />
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition"
              >
                <FaTimes size={20} className="text-gray-800" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
