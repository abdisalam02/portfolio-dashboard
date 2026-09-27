"use client";

import React, { useState } from "react";
import { 
  FiCalendar, 
  FiClock, 
  FiCheck, 
  FiCreditCard, 
  FiArrowRight, 
  FiSend,
  FiUser,
  FiPhone,
  FiInstagram
} from "react-icons/fi";

// 01. 1-Tap Calendar Date Pill Strip
export function BookingDateStrip() {
  const [selectedDate, setSelectedDate] = useState("SAT 27");
  const dates = [
    { day: "FRI", date: "26", status: "2 slots" },
    { day: "SAT", date: "27", status: "1 slot" },
    { day: "SUN", date: "28", status: "Closed" },
    { day: "MON", date: "29", status: "4 slots" },
    { day: "TUE", date: "30", status: "3 slots" },
  ];

  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-foreground">SELECT DATE</span>
        <span className="text-[10px] text-muted">MARCH 2026</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {dates.map((d) => {
          const isSelected = selectedDate === `${d.day} ${d.date}`;
          const isClosed = d.status === "Closed";
          return (
            <button
              key={d.date}
              disabled={isClosed}
              onClick={() => setSelectedDate(`${d.day} ${d.date}`)}
              className={`p-2 border text-center transition-all ${
                isClosed
                  ? "opacity-30 border-card-border cursor-not-allowed"
                  : isSelected
                  ? "border-foreground bg-foreground text-background font-bold shadow-sm"
                  : "border-card-border hover:border-foreground text-foreground"
              }`}
            >
              <div className="text-[10px]">{d.day}</div>
              <div className="text-base font-bold my-0.5">{d.date}</div>
              <div className="text-[8px] uppercase tracking-tighter">{d.status}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 02. Minimalist Time Slot Matrix
export function BookingTimeMatrix() {
  const [slot, setSlot] = useState("12:30");
  const times = [
    { time: "10:00", avail: true },
    { time: "12:30", avail: true },
    { time: "14:15", avail: false },
    { time: "16:00", avail: true },
    { time: "17:45", avail: true },
    { time: "19:15", avail: false },
  ];

  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-foreground">AVAILABLE SLOTS</span>
        <span className="text-[10px] text-muted">90 MINUTE APPOINTMENT</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {times.map((t) => (
          <button
            key={t.time}
            disabled={!t.avail}
            onClick={() => setSlot(t.time)}
            className={`py-2 text-center border text-xs transition-colors ${
              !t.avail
                ? "border-card-border opacity-30 line-through cursor-not-allowed"
                : slot === t.time
                ? "bg-foreground text-background font-bold border-foreground"
                : "border-card-border text-foreground hover:border-foreground"
            }`}
          >
            {t.time}
          </button>
        ))}
      </div>
    </div>
  );
}

// 03. Digital Boarding Pass / Ticket Slip
export function BookingBoardingPass() {
  return (
    <div className="w-full bg-card border-2 border-foreground p-5 font-mono text-xs shadow-sm">
      <div className="flex justify-between items-start pb-4 border-b border-dashed border-card-border">
        <div>
          <span className="text-[9px] text-muted uppercase tracking-widest block">DIGITAL STUDIO PASS</span>
          <span className="font-heading font-black text-lg text-foreground tracking-tight">STUDIO KLØ OSLO</span>
        </div>
        <div className="px-2 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold text-[10px]">
          CONFIRMED
        </div>
      </div>
      <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] border-b border-dashed border-card-border">
        <div>
          <span className="text-[9px] text-muted block">GUEST</span>
          <span className="font-bold text-foreground">SOFIA LIND</span>
        </div>
        <div>
          <span className="text-[9px] text-muted block">TREATMENT</span>
          <span className="font-bold text-foreground">BIAB GEL + FRENCH</span>
        </div>
        <div>
          <span className="text-[9px] text-muted block">DATE & TIME</span>
          <span className="font-bold text-foreground">SAT 27 · 12:30</span>
        </div>
        <div>
          <span className="text-[9px] text-muted block">DEPOSIT PAID</span>
          <span className="font-bold text-foreground">250 KR (VIPPS)</span>
        </div>
      </div>
      <div className="pt-3 flex justify-between items-center text-[10px] text-muted">
        <span>BOOKING ID: #KL-992-OSL</span>
        <span className="text-foreground font-bold hover:underline cursor-pointer">SAVE TO APPLE WALLET →</span>
      </div>
    </div>
  );
}

// 04. Direct Vipps / Card Quick Deposit Box
export function BookingVippsDeposit() {
  const [method, setMethod] = useState("vipps");

  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="font-bold text-foreground block">SECURE CHAIR RESERVATION</span>
          <span className="text-[10px] text-muted">Deposit is deducted from final appointment total</span>
        </div>
        <span className="font-heading font-black text-lg text-foreground">250 KR</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setMethod("vipps")}
          className={`p-2.5 border text-center font-bold ${
            method === "vipps" ? "border-foreground bg-foreground text-background" : "border-card-border text-muted"
          }`}
        >
          VIPPS (10 SECONDS)
        </button>
        <button
          onClick={() => setMethod("card")}
          className={`p-2.5 border text-center font-bold ${
            method === "card" ? "border-foreground bg-foreground text-background" : "border-card-border text-muted"
          }`}
        >
          CREDIT CARD / APPLE PAY
        </button>
      </div>
      <button className="w-full py-3 bg-[#ff5b24] text-white font-bold uppercase tracking-wider hover:opacity-95 transition-opacity">
        PAY 250 KR DEPOSIT VIA VIPPS →
      </button>
    </div>
  );
}

// 05. Treatment Selector Chips
export function BookingSelectorChips() {
  const [selected, setSelected] = useState<string[]>(["Structured BIAB (750 kr)"]);

  const chips = [
    "Structured BIAB (750 kr)",
    "Chrome Powder (+100 kr)",
    "Hand-drawn French (+120 kr)",
    "Old Gel Removal (+150 kr)",
    "Nail Repair (+80 kr)"
  ];

  const toggle = (c: string) => {
    if (selected.includes(c)) {
      setSelected(selected.filter((item) => item !== c));
    } else {
      setSelected([...selected, c]);
    }
  };

  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <span className="text-[10px] text-muted uppercase tracking-widest block mb-2">
        STEP 1 · CHOOSE YOUR FORMULA
      </span>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const isAct = selected.includes(chip);
          return (
            <button
              key={chip}
              onClick={() => toggle(chip)}
              className={`px-3 py-1.5 border transition-all ${
                isAct
                  ? "border-foreground bg-foreground text-background font-bold"
                  : "border-card-border text-muted hover:border-foreground"
              }`}
            >
              {chip} {isAct ? "✓" : "+"}
            </button>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-card-border flex justify-between items-center text-[11px]">
        <span className="text-muted">Selected {selected.length} items</span>
        <button className="text-foreground font-bold hover:underline">PROCEED TO DATE →</button>
      </div>
    </div>
  );
}

// 06. Clean 3-Field Booking Slip
export function BookingThreeField() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full bg-card border border-card-border p-5 sm:p-6 font-mono text-xs">
      <div className="text-[10px] text-muted uppercase tracking-widest mb-3">
        QUICK RESERVATION SLIP
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-[10px] text-muted block mb-1">YOUR FULL NAME</label>
          <input
            type="text"
            placeholder="e.g. Sofia Lind"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 border border-card-border bg-transparent text-foreground outline-none focus:border-foreground"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted block mb-1">NORWEGIAN MOBILE (+47)</label>
          <input
            type="tel"
            placeholder="901 23 456"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2.5 border border-card-border bg-transparent text-foreground outline-none focus:border-foreground"
          />
        </div>
        <button className="w-full py-3 bg-foreground text-background font-bold uppercase tracking-wider mt-2 hover:opacity-90">
          CONFIRM SLOT & PAY DEPOSIT
        </button>
      </div>
    </div>
  );
}

// 07. Floating Mobile Bottom Action Pill
export function BookingMobileBottomPill() {
  return (
    <div className="w-full p-3 bg-muted/10 border border-card-border flex justify-center">
      <div className="w-full max-w-md bg-card border border-card-border p-2.5 flex items-center justify-between shadow-lg font-mono text-xs">
        <div>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SLOT OPEN: TOMORROW 14:00
          </span>
          <span className="text-foreground font-bold block text-[11px]">Structured BIAB · 750 kr</span>
        </div>
        <button className="px-4 py-2 bg-foreground text-background font-bold uppercase text-[11px] hover:opacity-90">
          BOOK NOW
        </button>
      </div>
    </div>
  );
}

// 08. Monospaced Booking Terminal
export function BookingMonoTerminal() {
  const [cmd, setCmd] = useState("reserve --service=biab --date=2026-03-27");

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 border border-neutral-800 p-4 font-mono text-xs">
      <div className="flex items-center gap-2 pb-2 border-b border-neutral-800 text-[10px] text-neutral-400">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="w-2 h-2 rounded-full bg-yellow-500" />
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="ml-2">studio-terminal://oslo.booking</span>
      </div>
      <div className="pt-3 space-y-2 text-[11px]">
        <div className="text-neutral-400">&gt; checking studio availability... [OK]</div>
        <div className="text-emerald-400">&gt; slot confirmed: Friday 27 March 12:30 CET</div>
        <div className="flex items-center gap-2 pt-1 text-white">
          <span className="text-neutral-400">&gt;</span>
          <input
            type="text"
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            className="w-full bg-transparent text-white outline-none border-b border-neutral-700 pb-0.5"
          />
        </div>
      </div>
      <div className="mt-4 pt-2 border-t border-neutral-800 flex justify-between text-[10px] text-neutral-400">
        <span>PRESS [ENTER] TO EXECUTE VIPPS FLOW</span>
        <span className="text-white font-bold">READY</span>
      </div>
    </div>
  );
}

// 09. Consultation Intake Questionnaire Card
export function BookingIntakeCard() {
  const [shape, setShape] = useState("Almond");

  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-foreground">QUESTIONNAIRE: SHAPE & STYLE</span>
        <span className="text-[10px] text-muted">STEP 1 OF 3</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {["Almond", "Square", "Coffin", "Natural Oval"].map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`p-2 border text-center ${
              shape === s ? "border-foreground bg-foreground text-background font-bold" : "border-card-border text-muted"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-muted leading-relaxed mb-4">
        Preference: <strong className="text-foreground">{shape}</strong>. We adjust proportion to elongate natural fingers.
      </p>
      <button className="w-full py-2.5 border border-foreground font-bold uppercase hover:bg-foreground hover:text-background transition-colors">
        NEXT STEP: SELECT ART WORK →
      </button>
    </div>
  );
}

// 10. Instagram Direct Booking Launcher Card
export function BookingInstaLauncher() {
  return (
    <div className="w-full bg-card border border-card-border p-5 font-mono text-xs">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full border border-card-border flex items-center justify-center text-foreground">
          <FiInstagram className="text-base" />
        </div>
        <div>
          <span className="font-bold text-foreground block">INSTAGRAM BIO LAUNCHER</span>
          <span className="text-[10px] text-muted">Direct tap-to-book link for your @bio</span>
        </div>
      </div>
      <div className="p-3 bg-muted/10 border border-card-border flex justify-between items-center mb-3">
        <span className="text-foreground font-bold">agure.space/demo/nails</span>
        <button className="px-2.5 py-1 bg-foreground text-background text-[10px] font-bold uppercase">
          COPY LINK
        </button>
      </div>
      <div className="text-[10px] text-muted">
        Clients who click your bio reach this exact 1-page booking site in 0.4 seconds.
      </div>
    </div>
  );
}
