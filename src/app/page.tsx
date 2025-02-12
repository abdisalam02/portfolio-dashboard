"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import Loading from "./Loading";

export default function Overview() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center space-y-4">
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
      </div>

      {/* Social Media Section */}
      <div className="flex justify-center space-x-6">
        <a
          href="https://www.linkedin.com/in/abdisalam-adan-416766183/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-blue-600 text-3xl hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://github.com/abdisalam02"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-gray-800 text-3xl hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://x.com/aqaghsww"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="text-blue-400 text-3xl hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold">3rd Year</h2>
          <p className="text-lg">Bachelors in IT</p>
        </div>
        <Link href="/projects">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-green-600 transition">
            <h2 className="text-3xl font-bold">20+</h2>
            <p className="text-lg">Projects</p>
          </div>
        </Link>
        <Link href="/skills">
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-yellow-600 transition">
            <h2 className="text-3xl font-bold">8+</h2>
            <p className="text-lg">Technologies Learnt</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
