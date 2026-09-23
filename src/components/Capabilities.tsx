"use client";

import { motion } from "framer-motion";
import { FiCode, FiBox, FiTrendingUp, FiZap, FiCpu, FiCheckCircle } from "react-icons/fi";

const bentoItems = [
  {
    tag: "01 / ARCHITECTURE",
    title: "Full-Stack Web Platforms",
    icon: FiCode,
    desc: "Robust, scalable web applications built with Next.js 15, React 19, TypeScript, and relational databases. Zero technical debt, enterprise-grade architecture.",
    features: ["Server Components & SSR", "PostgreSQL & Supabase", "Custom API Integrations", "Auth & RBAC Pipelines"],
  },
  {
    tag: "02 / INTERACTION",
    title: "Creative UI & 3D Experiences",
    icon: FiBox,
    desc: "Elevated, tactile web experiences utilizing Three.js, WebGL model viewports, and butter-smooth micro-interactions that captivate clients and establish brand authority.",
    features: ["Interactive 3D Viewports", "Lenis Inertia Smooth Scroll", "Framer Motion Dynamics", "Fluid Mobile Gestures"],
  },
  {
    tag: "03 / COMMERCIAL VALUE",
    title: "High-Converting Flagships",
    icon: FiTrendingUp,
    desc: "Digital ateliers that convert cold traffic into paid clients. Custom appointment booking pipelines, dynamic pricing calculators, and frictionless UX.",
    features: ["Mobile-First Conversion Flow", "Google Apps Script & CRM Sync", "Automated Form Pipelines", "SEO Structured Schemas"],
  },
  {
    tag: "04 / FREELANCE ADVANTAGE",
    title: "Rapid Sprint Delivery",
    icon: FiZap,
    desc: "Direct partnership with an independent senior engineer. No account managers, no agency markups, no months-long delays. Shipped in 2–3 week focused sprints.",
    features: ["Direct WhatsApp/Slack Channel", "Weekly Interactive Staging", "Guaranteed Timeline Adherence", "Turnkey Production Handoff"],
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-36 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-card-border gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-xs font-mono tracking-widest text-muted uppercase">
              CAPABILITIES &amp; SERVICES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight uppercase">
            Engineering Offerings.
          </h2>
        </div>
        <p className="text-sm text-muted font-mono max-w-md">
          What I deliver to brands, studios, and founders. Tangible business deliverables over resume buzzwords.
        </p>
      </div>

      {/* 2x2 Bento Grid (Inspo 1 Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bentoItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 sm:p-10 rounded-2xl bg-card border border-card-border hover:border-card-hover-border transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle card top accent */}
              <div className="flex items-center justify-between pb-6 border-b border-card-border">
                <span className="text-xs font-mono tracking-widest text-muted uppercase">
                  {item.tag}
                </span>
                <div className="w-10 h-10 rounded-xl bg-pill-bg border border-tag-border flex items-center justify-center text-foreground group-hover:border-foreground transition-colors">
                  <Icon size={18} />
                </div>
              </div>

              {/* Title & Description */}
              <div className="py-6 space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold font-heading tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-body">
                  {item.desc}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="pt-6 border-t border-card-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-foreground/80">
                      <FiCheckCircle className="text-muted group-hover:text-foreground transition-colors text-[11px] flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
