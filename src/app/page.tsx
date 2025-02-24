"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import Loading from "./Loading";
import SpotifyNowPlaying from "../app/components/SpotifyNowPlaying"; // Import the Spotify component

// Profile section animation
const profileVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Container variant for social icons with stagger effect
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

// Individual social icon animation
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

// Metrics section animation
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
    // Added pb-24 to avoid content being hidden behind the fixed nav
    <div className="p-6 pb-24 space-y-8">
      <motion.div
        className="flex flex-col items-center text-center space-y-4"
        initial="hidden"
        animate="visible"
        variants={profileVariant}
      >
        <Image
          src="/profile.png"
          alt="Your Name"
          width={200}
          height={200}
          className="rounded-full border-4 border-gray-300 shadow-lg"
        />
        <h1 className="text-4xl font-bold">Abdisalam Gure</h1>
        <p className="text-gray-600 max-w-xl">
          I am a 22-year-old 3rd-year student pursuing a bachelor's degree in Information Technology.
          Passionate about creating dynamic and interactive web applications using modern technologies.
        </p>
      </motion.div>

      <motion.div 
        className="flex justify-center space-x-6"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        {[
          {
            icon: <FaLinkedin className="text-blue-600 text-3xl" />,
            href: "https://www.linkedin.com/in/abdi-salam-qorane-gure-416766183/"
          },
          {
            icon: <FaGithub className="text-gray-800 text-3xl" />,
            href: "https://github.com/abdisalam02"
          },
          {
            icon: <FaTwitter className="text-blue-400 text-3xl" />,
            href: "https://x.com/aqaghsww"
          }
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
            variants={socialIconVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={metricsVariant}
      >
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold">3rd Year</h2>
          <p className="text-lg">Bachelors in IT</p>
        </div>
        <Link href="/projects">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-green-600 hover:shadow-xl transition">
            <h2 className="text-3xl font-bold">20+</h2>
            <p className="text-lg">Projects</p>
          </div>
        </Link>
        <Link href="/skills">
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-yellow-600 hover:shadow-xl transition">
            <h2 className="text-3xl font-bold">8+</h2>
            <p className="text-lg">Technologies Learnt</p>
          </div>
        </Link>
      </motion.div>

      {/* Spotify Now Playing Card */}
      <div className="mt-8">
        <SpotifyNowPlaying />
      </div>
    </div>
  );
}
