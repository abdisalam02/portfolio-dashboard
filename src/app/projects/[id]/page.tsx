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
import { FaArrowLeft, FaTimes, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import LoadingLink from "../../components/LoadingLink";

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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

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
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-green-500/10 to-yellow-500/10 rounded-full blur-3xl -z-10"></div>
      
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
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </motion.div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-4 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 max-w-2xl"
          >
            {project.description}
          </motion.p>
          <div className="flex space-x-4 mt-4">
            <Link href={project.url}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-300"
              >
                <FaExternalLinkAlt className="mr-2" /> Live Demo
              </motion.div>
            </Link>
            {project.github && (
              <Link href={project.github}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
                >
                  <FaGithub className="mr-2" /> View Code
                </motion.div>
              </Link>
            )}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-1">
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
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
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="space-y-6"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Project Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {project.description}
              </p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Year:</span> {project.year}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-800 dark:text-blue-200 rounded-full shadow-sm border border-blue-200 dark:border-blue-800/30"
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
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="space-y-8"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Key Features
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                {project.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-1 mr-3"></div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Project Gallery
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.map((imgPath, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => setModalImage(imgPath)}
                  >
                    <Image
                      src={imgPath}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-sm font-medium">View larger</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Project challenges and solutions section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Development Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Challenges</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mt-1 mr-3"></div>
                  <span>Implementing responsive design across all device sizes</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mt-1 mr-3"></div>
                  <span>Optimizing performance for image-heavy content</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mt-1 mr-3"></div>
                  <span>Managing complex state across multiple components</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Solutions</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mt-1 mr-3"></div>
                  <span>Utilized Tailwind CSS for consistent responsive layouts</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mt-1 mr-3"></div>
                  <span>Implemented Next.js Image component with proper optimization</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mt-1 mr-3"></div>
                  <span>Created custom hooks for state management and reusability</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Next project navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <LoadingLink href={`/projects/${Math.max(1, Number(id) - 1)}`} className={Number(id) <= 1 ? 'opacity-50 pointer-events-none' : ''}>
              <motion.div 
                whileHover={{ x: -5 }}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <FaArrowLeft className="mr-2" /> Previous Project
              </motion.div>
            </LoadingLink>
            <LoadingLink href="/projects" className="my-4 sm:my-0">
              <motion.div 
                whileHover={{ y: -2 }}
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                All Projects
              </motion.div>
            </LoadingLink>
            <LoadingLink href={`/projects/${Math.min(selectedProjects.length, Number(id) + 1)}`} className={Number(id) >= selectedProjects.length ? 'opacity-50 pointer-events-none' : ''}>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Next Project <FaArrowLeft className="ml-2 transform rotate-180" />
              </motion.div>
            </LoadingLink>
          </div>
        </div>
      </motion.div>

      {/* Modal for Full View of Gallery Image */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-[90vw] bg-white/10 p-2 rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking on image
            >
              <Image
                src={modalImage}
                alt="Full view"
                width={1200}
                height={800}
                className="rounded-lg object-contain max-h-[85vh]"
              />
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <FaTimes size={20} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
