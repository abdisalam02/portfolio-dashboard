"use client";

import React, { useState } from "react";
import { 
  FiChevronDown, 
  FiPlus, 
  FiMinus, 
  FiCornerDownRight, 
  FiCheck,
  FiHelpCircle,
  FiTerminal
} from "react-icons/fi";

// 01. Minimal Hairline Rule Accordion
export function AccordionHairlineRule() {
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    { q: "How long does a full set take?", a: "Around 90 minutes. We dedicate full time to precision cuticle cleaning and structured apex balancing so your set lasts 4+ weeks." },
    { q: "Do you require a deposit?", a: "Yes, a 250 kr deposit via Vipps locks your studio chair. It is deducted from your final bill on appointment day." },
  ];

  return (
    <div className="w-full bg-card border border-card-border p-5 divide-y divide-card-border font-mono text-xs">
      {items.map((item, idx) => (
        <div key={item.q} className="py-3 first:pt-0 last:pb-0">
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex justify-between items-center text-left py-1"
          >
            <span className={`font-bold ${open === idx ? "text-foreground" : "text-muted"}`}>
              {item.q}
            </span>
            <span className="text-muted text-sm">{open === idx ? "−" : "+"}</span>
          </button>
          {open === idx && (
            <p className="text-muted text-[11px] leading-relaxed pt-2">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// 02. Boxed Brutalist Cell Accordion
export function AccordionBrutalistCell() {
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    { title: "WHAT HAPPENS IF I AM LATE?", content: "Grace period is 15 minutes. Beyond that, the appointment may need to be shortened to basic BIAB to respect the next booked client." },
    { title: "HOW DO CANCELLATIONS WORK?", content: "Cancel up to 24 hours in advance with zero penalty. Deposits are refunded instantly via Vipps." },
  ];

  return (
    <div className="w-full bg-card border-2 border-foreground p-3 space-y-2 font-mono text-xs">
      {items.map((item, i) => (
        <div key={item.title} className="border border-foreground">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className={`w-full p-3 flex justify-between items-center text-left font-bold ${
              open === i ? "bg-foreground text-background" : "bg-card text-foreground"
            }`}
          >
            <span>{item.title}</span>
            <span>{open === i ? "[CLOSE]" : "[OPEN]"}</span>
          </button>
          {open === i && (
            <div className="p-3 bg-card text-foreground text-[11px] border-t border-foreground leading-relaxed">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// 03. Numbered Dossier Accordion
export function AccordionNumberedDossier() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    { num: "01", label: "INTAKE & HEALTH CHECK", detail: "We examine natural nail plates before treatment. If active fungal infections exist, we advise healing first." },
    { num: "02", label: "VIPPS INSTANT CONFIRMATION", detail: "Once you submit your slot, Vipps prompts a 250 kr hold. You receive an SMS booking pass within 10 seconds." },
  ];

  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div className="space-y-3">
        {faqs.map((f, idx) => (
          <div key={f.num} className="border-b border-card-border pb-3">
            <div
              onClick={() => setOpen(open === idx ? null : idx)}
              className="flex items-center gap-3 cursor-pointer py-1"
            >
              <span className="font-bold text-foreground text-sm">{f.num}</span>
              <span className="font-bold text-foreground flex-1 uppercase tracking-tight">{f.label}</span>
              <span className="text-[10px] text-muted border border-card-border px-1.5 py-0.5">
                {open === idx ? "COLLAPSE" : "EXPAND"}
              </span>
            </div>
            {open === idx && (
              <p className="text-muted text-[11px] pl-7 pt-2 leading-relaxed">
                {f.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 04. Side-by-Side 2-Column Ledger
export function AccordionSideBySide() {
  const [selected, setSelected] = useState(0);

  const entries = [
    { title: "Nail Aftercare", text: "Apply cuticle oil twice daily. Avoid using nails as tools to open cans or boxes to prevent lateral hairline fractures." },
    { title: "Refill Cycle", text: "Optimal rebalance is every 3 to 4 weeks. Waiting longer places excessive mechanical torque on your natural nail apex." },
    { title: "Allergy Safety", text: "We exclusively use HEMA-free Japanese and European gel systems to protect sensitive nail beds." },
  ];

  return (
    <div className="w-full bg-card border border-card-border p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
      <div className="space-y-1.5 border-b sm:border-b-0 sm:border-r border-card-border pb-4 sm:pb-0 sm:pr-4">
        <span className="text-[10px] text-muted uppercase tracking-widest block mb-2">TOPICS</span>
        {entries.map((e, idx) => (
          <button
            key={e.title}
            onClick={() => setSelected(idx)}
            className={`w-full text-left p-2 transition-colors ${
              selected === idx 
                ? "bg-foreground text-background font-bold" 
                : "text-muted hover:text-foreground border border-card-border"
            }`}
          >
            {e.title}
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-center p-2">
        <span className="text-[10px] text-muted uppercase tracking-widest mb-1">
          DETAIL VIEW
        </span>
        <h4 className="font-bold text-foreground mb-2">{entries[selected].title}</h4>
        <p className="text-muted text-[11px] leading-relaxed">
          {entries[selected].text}
        </p>
      </div>
    </div>
  );
}

// 05. Plus / Minus Minimalist Switcher
export function AccordionPlusMinus() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div 
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer select-none"
      >
        <span className="font-bold text-foreground uppercase tracking-tight">
          ARE RETENTIONS GUARANTEED?
        </span>
        <span className="text-base font-bold text-foreground w-6 h-6 flex items-center justify-center border border-card-border">
          {open ? <FiMinus className="text-xs" /> : <FiPlus className="text-xs" />}
        </span>
      </div>
      {open && (
        <div className="mt-3 pt-3 border-t border-card-border text-muted text-[11px] leading-relaxed">
          Yes. Any unexpected lifting within the first 7 days is repaired at the studio completely free of charge.
        </div>
      )}
    </div>
  );
}

// 06. Floating Card Separator Accordion
export function AccordionFloatingCards() {
  const [open, setOpen] = useState<number | null>(null);

  const cards = [
    { title: "Can I bring inspiration photos?", desc: "Absolutely. Send photos ahead in the booking questionnaire or show them during your appointment." },
    { title: "Do you remove existing acrylics?", desc: "We only remove our own BIAB or soft gel from other salons. Heavy acrylic removals require a 200 kr add-on slot." },
  ];

  return (
    <div className="w-full bg-muted/10 border border-card-border p-4 space-y-2 font-mono text-xs">
      {cards.map((c, i) => (
        <div key={c.title} className="bg-card border border-card-border p-3 shadow-sm">
          <div 
            onClick={() => setOpen(open === i ? null : i)}
            className="flex justify-between items-center cursor-pointer font-bold text-foreground"
          >
            <span>{c.title}</span>
            <FiChevronDown className={`transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
          </div>
          {open === i && (
            <p className="text-muted text-[11px] pt-2 mt-2 border-t border-card-border leading-relaxed">
              {c.desc}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// 07. Service Item with Price & Expandable Inclusions
export function AccordionServicePrice() {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full bg-card border border-card-border p-4 font-mono text-xs">
      <div 
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer py-1"
      >
        <div>
          <span className="font-bold text-foreground block">STRUCTURED BIAB GEL</span>
          <span className="text-[10px] text-muted">90 MINUTES · RUSSIAN MANICURE</span>
        </div>
        <div className="text-right">
          <span className="font-bold text-foreground text-sm">750 KR</span>
          <span className="block text-[9px] text-muted">{open ? "HIDE SPECS ▲" : "VIEW SPECS ▼"}</span>
        </div>
      </div>
      {open && (
        <div className="mt-3 pt-3 border-t border-card-border space-y-1 text-[11px] text-muted">
          <div className="flex items-center gap-1.5"><FiCheck className="text-emerald-500 text-xs" /> Precision e-file dry cuticle cleansing</div>
          <div className="flex items-center gap-1.5"><FiCheck className="text-emerald-500 text-xs" /> High apex reinforcement for zero breakage</div>
          <div className="flex items-center gap-1.5"><FiCheck className="text-emerald-500 text-xs" /> High gloss no-wipe topcoat & cuticle oil finish</div>
        </div>
      )}
    </div>
  );
}

// 08. Horizontal Filter Dropdown / Tab Pill Bar
export function AccordionTabPills() {
  const [activeTab, setActiveTab] = useState("policies");

  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div className="flex gap-2 border-b border-card-border pb-3 mb-3">
        {["policies", "prep", "deposits"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 uppercase text-[10px] font-bold ${
              activeTab === tab 
                ? "bg-foreground text-background" 
                : "border border-card-border text-muted hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="text-[11px] text-muted leading-relaxed">
        {activeTab === "policies" && "Strict 24-hour rescheduling policy. Arrive without nail polish or book an additional removal slot."}
        {activeTab === "prep" && "Do not apply heavy hand lotions on the morning of your visit, as natural oils can reduce gel adhesion."}
        {activeTab === "deposits" && "250 kr deposit handled automatically via Vipps. Zero monthly subscription or platform fees."}
      </div>
    </div>
  );
}

// 09. Monospace Code-Block Inspector Dropdown
export function AccordionCodeInspector() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-card border border-card-border p-4 font-mono text-xs">
      <div 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between cursor-pointer bg-muted/10 p-2 border border-card-border"
      >
        <div className="flex items-center gap-2 text-foreground font-bold">
          <FiTerminal className="text-sm" />
          <span>&gt; query: package_specs.json</span>
        </div>
        <span className="text-[10px] text-muted">{expanded ? "HIDE" : "EXECUTE"}</span>
      </div>
      {expanded && (
        <pre className="mt-2 p-3 bg-muted/5 border border-card-border text-[10px] text-foreground leading-relaxed overflow-x-auto">
{`{
  "tier": "The Booking Drop",
  "price": "2,000 kr (one-time)",
  "timeline": "48 hours - 1 week",
  "inclusions": [
    "1-page mobile site",
    "Direct Vipps payment sync",
    "Interactive 6-photo lookbook",
    "No monthly recurring fees"
  ]
}`}
        </pre>
      )}
    </div>
  );
}

// 10. Luxury Atelier Micro-FAQ (Chevron Snap)
export function AccordionChevronSnap() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-card border border-card-border p-5">
      <div 
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer select-none"
      >
        <span className="font-serif italic text-base text-foreground">
          Do you take custom bespoke commissions?
        </span>
        <FiChevronDown className={`text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <p className="font-mono text-xs text-muted mt-3 pt-3 border-t border-card-border leading-relaxed">
          Yes. For bespoke projects outside our standard menu, reach out directly at hello@agure.space with your reference imagery and deadline.
        </p>
      )}
    </div>
  );
}

// 11. Multi-Tier Sub-Item Drilldown
export function AccordionNestedDrilldown() {
  const [open, setOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<string[]>(["Chrome French (+100 kr)"]);

  const toggleSub = (item: string) => {
    if (selectedSub.includes(item)) {
      setSelectedSub(selectedSub.filter((s) => s !== item));
    } else {
      setSelectedSub([...selectedSub, item]);
    }
  };

  return (
    <div className="w-full bg-card border border-card-border p-4 font-mono text-xs">
      <div 
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer font-bold text-foreground"
      >
        <span>NAIL ART ADD-ONS (+DRILLDOWN)</span>
        <span className="text-[10px] text-muted border border-card-border px-1.5 py-0.5">
          {open ? "COLLAPSE" : "CHOOSE (3 OPTIONS)"}
        </span>
      </div>
      {open && (
        <div className="mt-3 pt-3 border-t border-card-border space-y-2">
          {["Chrome French (+100 kr)", "3D Gel Droplets (+150 kr)", "Custom Airbrush Aura (+120 kr)"].map((sub) => (
            <div 
              key={sub}
              onClick={() => toggleSub(sub)}
              className={`p-2 border cursor-pointer flex justify-between items-center text-[11px] ${
                selectedSub.includes(sub) 
                  ? "border-foreground bg-muted/10 font-bold text-foreground" 
                  : "border-card-border text-muted"
              }`}
            >
              <span>{sub}</span>
              <span>{selectedSub.includes(sub) ? "✓ ADDED" : "+ ADD"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 12. Borderless Ghost Expandable
export function AccordionBorderlessGhost() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-card p-5">
      <div 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-foreground group-hover:scale-125 transition-transform" />
        <span className="font-heading font-black text-sm uppercase text-foreground">
          WHAT IF I NEED CHANGES AFTER DELIVERY?
        </span>
      </div>
      {open && (
        <p className="font-mono text-xs text-muted pl-5 pt-3 leading-relaxed">
          Every build comes with 1 round of revisions. If you need regular ongoing updates, optional monthly updates are just 250 kr/month.
        </p>
      )}
    </div>
  );
}
