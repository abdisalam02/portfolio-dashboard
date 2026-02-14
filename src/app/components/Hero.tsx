"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import TextReveal from "./TextReveal";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-1000" />

      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          className="order-2 lg:order-1 flex flex-col justify-center items-start space-y-6 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Mobile Stacked Layout: Name -> Image -> Bio */}
          <div className="flex flex-col w-full">
             
             {/* 1. Name Section */}
             <div className="flex flex-col mb-6">
                <span className="text-cyan-600 dark:text-cyan-400 font-medium tracking-wide text-lg mb-2">Hi, I&apos;m</span>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-foreground leading-tight">
                  Abdisalam Gure
                </h1>
             </div>
             
             {/* 2. Mobile Image (Centered/Right between name and bio) */}
            <div className="lg:hidden relative w-48 h-48 sm:w-64 sm:h-64 self-center mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-white/20 shadow-xl overflow-hidden">
                   <Image
                     src="/images/profile.png"
                     alt="Abdisalam Gure"
                     fill
                     className="object-cover"
                     priority
                   />
                </div>
            </div>

            {/* 3. Bio & Buttons */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-foreground/90">
              Bachelor&apos;s in <span className="font-semibold text-cyan-500 dark:text-cyan-300">Information Systems</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed mt-4">
              I&apos;m a developer who genuinely enjoys building software. I love turning complex problems into simple, beautiful, and functional applications.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-8">
              <a 
                href="/projects" 
                className="px-8 py-3 rounded-full bg-foreground text-background font-semibold hover:scale-105 transition-transform duration-300 shadow-glow"
              >
                See What I've Built
              </a>
              <a 
                href="/contact" 
                className="px-8 py-3 rounded-full bg-background/5 text-foreground border border-foreground/10 hover:bg-foreground/10 transition-colors backdrop-blur-md"
              >
                Let's Chat
              </a>
            </div>
          </div>
        </motion.div>

        {/* Desktop Visual / Image (Hidden on Mobile) */}
        <motion.div 
          className="order-1 lg:order-2 hidden lg:flex relative h-[500px] w-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
           <div className="relative w-96 h-96">
             {/* Glowing Ring */}
             <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
             <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-[spin_15s_linear_infinite_reverse]" />
             
             {/* Image with Glass Container */}
             <div className="absolute inset-8 rounded-full overflow-hidden border border-white/20 shadow-glass">
               <Image
                 src="/images/profile.png"
                 alt="Abdisalam Gure"
                 fill
                 className="object-cover"
                 priority
               />
               {/* Reflection */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
             </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
