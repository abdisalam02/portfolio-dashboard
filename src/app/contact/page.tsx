"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

export default function Contact() {
  const [loading, setLoading] = useState(true);

  // Simulate a brief loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div className="text-center space-y-6">
           <motion.h1
             className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             Get in Touch
           </motion.h1>
           <motion.p
             className="text-xl text-foreground/70 dark:text-white/60 max-w-2xl mx-auto"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
           >
             Have a project in mind or just want to chat? I&apos;d love to hear from you.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info Section */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Contact Card */}
            <ScrollReveal direction="left">
              <motion.div 
                variants={itemVariants}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-glass mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <FaEnvelope className="text-cyan-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/50 mb-1">Email</p>
                      <a href="mailto:niwache12@gmail.com" className="text-white hover:text-cyan-400 transition-colors text-lg">
                        niwache12@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-purple-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/50 mb-1">Location</p>
                      <p className="text-white text-lg">
                        Oslo, Norway
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
            
            {/* Social Media Section */}
            <ScrollReveal direction="left" delay={0.2}>
              <motion.div 
                variants={itemVariants}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-glass mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Connect</h2>
                
                <div className="grid grid-cols-3 gap-4">
                  <a
                    href="https://www.linkedin.com/in/abdi-salam-qorane-gure-416766183/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 border border-white/5"
                  >
                    <FaLinkedin className="text-white text-2xl mb-2" />
                    <span className="text-xs text-white/60">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/abdisalam02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 border border-white/5"
                  >
                    <FaGithub className="text-white text-2xl mb-2" />
                    <span className="text-xs text-white/60">GitHub</span>
                  </a>
                  <a
                    href="https://x.com/aqaghsww"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 border border-white/5"
                  >
                    <FaTwitter className="text-white text-2xl mb-2" />
                    <span className="text-xs text-white/60">Twitter</span>
                  </a>
                </div>
              </motion.div>
            </ScrollReveal>
            
            {/* Availability Card */}
            <ScrollReveal direction="left" delay={0.4}>
              <motion.div 
                variants={itemVariants}
                className="rounded-3xl p-8 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-white/10 backdrop-blur-md relative overflow-hidden"
              >
                 <div className="absolute inset-0 bg-white/5 opacity-50" />
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="relative flex h-3 w-3">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400/50 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                       </span>
                       <h2 className="text-xl font-bold text-white">Available for Work</h2>
                    </div>
                    <p className="text-white/70 mb-0">
                      Open to freelance projects and full-time opportunities.
                    </p>
                 </div>
              </motion.div>
            </ScrollReveal>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-glass h-full">
              <h2 className="text-3xl font-bold text-white mb-8">Send a Message</h2>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [state, handleSubmit] = useForm("xvgzbbqa");

  const dropIn = (custom: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.4 },
    },
  });

  if (state.succeeded) {
    return (
      <motion.div
        className="p-12 bg-green-500/10 border border-green-500/20 rounded-3xl text-center flex flex-col items-center justify-center h-full min-h-[400px]"
        initial="hidden"
        animate="visible"
        variants={dropIn(0)}
      >
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
           <FaPaperPlane className="text-3xl text-green-400" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
        <p className="text-white/60 text-lg">
           Thanks for reaching out! I&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={dropIn(0)} className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-white/60 pl-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </motion.div>

        <motion.div variants={dropIn(1)} className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white/60 pl-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </motion.div>
        </div>

        <motion.div variants={dropIn(2)} className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-white/60 pl-1">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
            placeholder="Project Opportunity"
          />
        </motion.div>

        <motion.div variants={dropIn(3)} className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-white/60 pl-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all resize-none"
            placeholder="Tell me about your project..."
          ></textarea>
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </motion.div>

        <motion.div variants={dropIn(4)} className="pt-4">
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full py-4 px-8 bg-white text-black font-bold rounded-full shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
          >
            {state.submitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
          </button>
        </motion.div>
    </motion.form>
  );
}
