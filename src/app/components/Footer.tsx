"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GITHUB", icon: <FaGithub />, url: "https://github.com/abdisalam02", color: "#FFFFFF" },
    { name: "LINKEDIN", icon: <FaLinkedin />, url: "#", color: "#0077B5" },
    { name: "TWITTER", icon: <FaTwitter />, url: "#", color: "#1DA1F2" },
    { name: "INSTAGRAM", icon: <FaInstagram />, url: "#", color: "#E4405F" },
    { name: "EMAIL", icon: <FaEnvelope />, url: "mailto:hello@example.com", color: "#EA4335" },
  ];

  return (
    <footer className="border-t-2 border-foreground mt-20 md:mt-32">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Section */}
        <div className="px-4 md:px-12 py-16 md:py-24 border-b-2 border-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12"
          >
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-[0.3em] text-foreground/40 mb-6 block uppercase">
                READY TO START A PROJECT?
              </span>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                LET&apos;S WORK <br /> <span className="text-accent transition-colors duration-500">TOGETHER.</span>
              </h2>
              <p className="text-lg md:text-xl font-sans max-w-md text-foreground/60 leading-relaxed">
                Currently available for freelance work and interesting collaborations. 
                Based in Oslo, working worldwide.
              </p>
            </div>
            
            <Link 
              href="/contact" 
              className="text-xl md:text-2xl font-black border-2 border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-all group relative overflow-hidden"
              data-cursor="link"
            >
              <span className="relative z-10">SAY HELLO →</span>
            </Link>
          </motion.div>
        </div>

        {/* Links Grid - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-foreground">
          {/* Socials */}
          <div className="p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-foreground">
            <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-8 uppercase">
              SOCIAL CHANNELS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group text-sm font-bold tracking-widest transition-colors py-2 border-b border-foreground/5"
                  data-cursor="link"
                  whileInView={{ color: link.color }}
                  viewport={{ margin: "-45% 0px -45% 0px" }}
                  whileHover={{ color: link.color, x: 5 }}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg opacity-40 group-hover:opacity-100 transition-all">{link.icon}</span>
                    {link.name}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-8 uppercase">
                LOCATION
              </span>
              <p className="text-sm font-sans mb-1 font-bold italic">OSLO, NORWAY</p>
              <p className="text-xs text-foreground/40 font-sans leading-relaxed">
                59.9139° N, 10.7522° E <br />
                Central European Time
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-foreground/10 flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[9px] font-bold tracking-widest text-foreground/30 uppercase block">
                  © {currentYear} ALL RIGHTS RESERVED
                </span>
                <span className="text-[9px] font-bold tracking-widest text-foreground/30 uppercase block">
                  MADE WITH PRECISION
                </span>
              </div>
              <div className="text-[10px] font-bold tracking-widest text-foreground/20 italic uppercase">
                BRUTALISM // 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
