"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import Loading from "./Loading";
import SpotifyNowPlaying from "./components/SpotifyNowPlaying";
import MagneticButton from "./components/MagneticButton";
import TextReveal from "./components/TextReveal";

// Animation Variants
const profileVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const socialIconVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const metricsVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      delay: 0.4
    }
  }
};

export default function Overview() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24 max-w-6xl">
      {/* Background Gradient */}
      <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/20 dark:to-purple-900/20 -z-10"></div>

      {/* Profile Section */}
      <motion.div
        className="flex flex-col items-center text-center space-y-6 pt-12"
        initial="hidden"
        animate="visible"
        variants={profileVariant}
      >
        {/* Profile Image */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm"></div>
          <Image
            src="/profile.png"
            alt="Abdisalam Gure"
            width={200}
            height={200}
            className="relative z-10 rounded-full border-4 border-white dark:border-gray-800 shadow-xl w-40 h-40 sm:w-56 sm:h-56 object-cover"
          />
        </div>

        {/* Name and Description */}
        <div className="space-y-3">
          <TextReveal
            text="Abdisalam Gure"
            type="scramble"
            className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          />
          <TextReveal
            text="22-year-old 3rd-year Information Technology student passionate about creating dynamic web applications using modern technologies."
            type="fadeUp"
            delay={1}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto px-4"
          />
        </div>
      </motion.div>

      {/* Social Icons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mt-8"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        {[
          {
            icon: <FaLinkedin className="text-blue-600 text-2xl sm:text-3xl" />,
            href: "https://www.linkedin.com/in/abdi-salam-qorane-gure-416766183/",
            color: "bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/40"
          },
          {
            icon: <FaGithub className="text-gray-800 dark:text-gray-200 text-2xl sm:text-3xl" />,
            href: "https://github.com/abdisalam02",
            color: "bg-gray-100 dark:bg-gray-800/30 hover:bg-gray-200 dark:hover:bg-gray-700/40"
          },
          {
            icon: <FaTwitter className="text-blue-400 text-2xl sm:text-3xl" />,
            href: "https://x.com/aqaghsww",
            color: "bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/40"
          }
        ].map((social, index) => (
          <motion.div
            key={index}
            variants={socialIconVariant}
          >
            <MagneticButton
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 sm:p-4 rounded-full ${social.color} transition-all duration-300 shadow-sm hover:shadow-md inline-block`}
              magneticStrength={0.3}
            >
              {social.icon}
            </MagneticButton>
          </motion.div>
        ))}
      </motion.div>

      {/* Metrics Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10"
        initial="hidden"
        animate="visible"
        variants={metricsVariant}
      >
        {/* Metrics Cards with Glassmorphism */}
        {[
          {
            title: "3rd Year",
            subtitle: "Bachelors in IT",
            gradient: "from-blue-600 to-blue-400"
          },
          {
            title: "20+",
            subtitle: "Projects",
            gradient: "from-green-600 to-green-400",
            link: "/projects"
          },
          {
            title: "8+",
            subtitle: "Technologies",
            gradient: "from-yellow-600 to-yellow-400",
            link: "/skills"
          }
        ].map((metric, index) => {
          const CardContent = () => (
            <div className="relative group overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} rounded-xl transform transition-transform group-hover:scale-105 duration-300`}></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md text-center border border-white/20 text-white z-10">
                <h2 className="text-3xl font-bold">{metric.title}</h2>
                <p className="text-lg">{metric.subtitle}</p>
              </div>
            </div>
          );

          return metric.link ? (
            <MagneticButton
              key={index}
              href={metric.link}
              magneticStrength={0.2}
              className="block"
            >
              <CardContent />
            </MagneticButton>
          ) : (
            <div key={index}>
              <CardContent />
            </div>
          );
        })}
      </motion.div>

      {/* Spotify Now Playing */}
      <div className="mt-10">
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-gradient-x"></div>
          <SpotifyNowPlaying />
        </div>
      </div>
    </div>
  );
}