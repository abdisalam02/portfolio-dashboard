"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    phase: "DISCOVERY & ARCHITECTURE",
    duration: "Week 1",
    desc: "We analyze your business objectives, target audience, and core functional needs. We establish technical requirements, data models, and a concrete delivery timeline with clear milestones.",
    deliverable: "Technical Scope & Visual Direction",
  },
  {
    step: "02",
    phase: "BESPOKE DESIGN & WIREFRAMES",
    duration: "Week 1–2",
    desc: "Crafting a distinctive, high-end visual system tailored to your brand identity. Mobile-first wireframes, typography hierarchy, and interactive prototypes for immediate feedback.",
    deliverable: "Interactive Prototypes & Design Specs",
  },
  {
    step: "03",
    phase: "SPRINT ENGINEERING",
    duration: "Week 2–3",
    desc: "Translating approved designs into production Next.js 15 code. Implementing custom APIs, database connections, 3D viewports, and butter-smooth transitions with continuous staging previews.",
    deliverable: "Live Staging Environment for Review",
  },
  {
    step: "04",
    phase: "QA, OPTIMIZATION & LAUNCH",
    duration: "Week 3",
    desc: "Rigorous cross-device testing, SEO meta tags, Google Analytics integration, and performance tuning. Seamless deployment to your custom domain with zero downtime.",
    deliverable: "Production Deployment & Turnkey Handoff",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-36 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-card-border gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-xs font-mono tracking-widest text-muted uppercase">
              METHODOLOGY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight uppercase">
            Sprint Process.
          </h2>
        </div>
        <p className="text-sm text-muted font-mono max-w-md">
          A predictable, transparent 4-stage sprint workflow designed to launch your platform within 2–3 weeks.
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s, idx) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-card border border-card-border hover:border-card-hover-border transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-card-border">
                <span className="text-2xl font-mono font-black text-foreground">
                  {s.step}
                </span>
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full bg-pill-bg border border-tag-border text-muted">
                  {s.duration}
                </span>
              </div>

              <h3 className="text-base font-bold font-heading tracking-tight uppercase">
                {s.phase}
              </h3>

              <p className="text-xs text-muted leading-relaxed font-body">
                {s.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-card-border">
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-1">
                DELIVERABLE
              </span>
              <span className="text-xs font-mono font-bold text-foreground block">
                {s.deliverable}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
