"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-widest text-foreground/50 mb-4 block">
              TRANSMISSION / CONTACT
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              GET IN<br />TOUCH
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-foreground">
          {/* Left Panel - Info */}
          <div className="lg:col-span-4 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground p-8 md:p-12 space-y-10">
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 border-2 border-foreground grayscale hover:grayscale-0 transition-all duration-500 bg-foreground/5">
                <Image src="/images/profile.png" alt="Abdisalam" fill className="object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-1">OPERATIVE</span>
                <p className="text-lg font-black uppercase tracking-tighter">Abdisalam Gure</p>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-3">EMAIL</span>
              <a href="mailto:niwache12@gmail.com" className="text-lg font-bold hover:text-accent transition-colors break-all" data-cursor="link">
                niwache12@gmail.com
              </a>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-3">LOCATION</span>
              <p className="text-lg font-bold">Oslo, Norway</p>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-3">STATUS</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-sm font-bold">AVAILABLE</span>
              </div>
            </div>

            <div className="border-t-2 border-foreground pt-8">
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 block mb-4">CONNECT</span>
              <div className="flex gap-0">
                {[
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/abdi-salam-qorane-gure-416766183/", label: "LI" },
                  { icon: FaGithub, href: "https://github.com/abdisalam02", label: "GH" },
                  { icon: FaTwitter, href: "https://x.com/aqaghsww", label: "TW" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 border-2 border-foreground hover:bg-accent hover:text-[#111] hover:border-accent transition-colors -mr-0.5"
                    data-cursor="link"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="lg:col-span-8 p-8 md:p-12">
            <h2 className="text-xs font-bold tracking-widest text-foreground/50 mb-8">
              SEND_MESSAGE
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [state, handleSubmit] = useForm("xvgzbbqa");
  const [focused, setFocused] = useState<string | null>(null);

  if (state.succeeded) {
    return (
      <motion.div
        className="border-2 border-accent p-12 text-center space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-6xl font-black text-accent">✓</div>
        <h3 className="text-2xl font-black uppercase tracking-tighter">MESSAGE SENT</h3>
        <p className="text-sm text-foreground/50 font-sans">
          Thanks for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {[
        { id: "name", label: "NAME", type: "text", placeholder: "JOHN DOE" },
        { id: "email", label: "EMAIL", type: "email", placeholder: "JOHN@EXAMPLE.COM" },
        { id: "subject", label: "SUBJECT", type: "text", placeholder: "PROJECT INQUIRY" },
      ].map((field) => (
        <div key={field.id} className="border-b-2 border-foreground/20 py-6">
          <label
            htmlFor={field.id}
            className={`block text-[10px] font-bold tracking-widest mb-2 transition-colors ${
              focused === field.id ? "text-accent" : "text-foreground/40"
            }`}
          >
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            required
            placeholder={field.placeholder}
            onFocus={() => setFocused(field.id)}
            onBlur={() => setFocused(null)}
            className="w-full bg-transparent text-xl md:text-2xl font-bold placeholder:text-foreground/10 focus:outline-none caret-accent"
          />
          {field.id === "email" && <ValidationError prefix="Email" field="email" errors={state.errors} />}
        </div>
      ))}

      <div className="border-b-2 border-foreground/20 py-6">
        <label
          htmlFor="message"
          className={`block text-[10px] font-bold tracking-widest mb-2 transition-colors ${
            focused === "message" ? "text-accent" : "text-foreground/40"
          }`}
        >
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="TELL ME ABOUT YOUR PROJECT..."
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          className="w-full bg-transparent text-xl md:text-2xl font-bold placeholder:text-foreground/10 focus:outline-none caret-accent resize-none"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <div className="pt-8">
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full text-sm font-black tracking-widest border-2 border-foreground py-6 hover:bg-accent hover:text-[#111] hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          data-cursor="link"
        >
          {state.submitting ? "TRANSMITTING..." : "[ EXECUTE_SEND ]"}
        </button>
      </div>
    </form>
  );
}
