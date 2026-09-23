"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";

type AngleType = "pricing" | "dms" | "aesthetic" | "freelancer" | "custom";
type DeliveryChannel = "instagram" | "whatsapp" | "email" | "sms";
type MobileViewMode = "composer" | "card";

interface LeadRecord {
  id: string;
  brandName: string;
  niche: string;
  contact: string;
  channel: DeliveryChannel;
  status: "contacted" | "replied" | "closed";
  date: string;
}

const COMMON_NICHES = [
  { label: "Makeup Artist", icon: "💄" },
  { label: "Tattoo Studio", icon: "💉" },
  { label: "Nails & Beauty", icon: "💅" },
  { label: "Jewelry / Grillz", icon: "💎" },
  { label: "Hair / Barber", icon: "✂️" },
  { label: "Creative Studio", icon: "📸" }
];

export default function StudioPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Mobile View Switcher (Composer vs Card Preview)
  const [mobileView, setMobileView] = useState<MobileViewMode>("composer");

  // Profiler Inputs
  const [brandName, setBrandName] = useState<string>("Glow by Sarah");
  const [niche, setNiche] = useState<string>("Makeup Artist");
  const [angle, setAngle] = useState<AngleType>("pricing");
  const [extraNotes, setExtraNotes] = useState<string>("Takes bookings via DMs and email");

  // Visual Card Content
  const [cardHeadline, setCardHeadline] = useState<string>(
    "Websites can be crazy expensive. A direct site for Glow by Sarah doesn't have to be."
  );
  const [cardDesc, setCardDesc] = useState<string>(
    "I recently started building clean mobile sites for small spots in Oslo. Honest rates, direct work, and zero 40k agency markup."
  );
  const [cardTag, setCardTag] = useState<string>("NO AGENCY MARKUP");
  const [showCardEdit, setShowCardEdit] = useState<boolean>(false);

  // Active Delivery Channel
  const [channel, setChannel] = useState<DeliveryChannel>("instagram");

  // Channel Specific Fields
  const [instagramHandle, setInstagramHandle] = useState<string>("glowbysarah");
  const [igDmMsg, setIgDmMsg] = useState<string>(
    `Hey! I'll be straight with you — I'm A.Gure, an independent junior web dev here in Oslo. I recently started making clean mobile sites for small spots because agencies charge crazy 40,000+ kr prices. You can check out 2 client sites I'm currently working on right now at abdisalam.space (one is for an Oslo tooth gem studio, and the other is an interactive grillz shop). Loved your makeup work with Glow by Sarah and noticed bookings run through email/DMs, so I put together a quick preview of how a direct 1-tap mobile booking site could look for you without the agency markup. Down to see a 15-second preview? No pressure at all!`
  );

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [whatsappMsg, setWhatsappMsg] = useState<string>(
    `Hey! I'll be straight with you — I'm A.Gure, an independent junior web dev in Oslo. Recently started making clean mobile sites for small businesses (no 40k agency fees). Check 2 client sites I'm working on right now at abdisalam.space (tooth gem studio & custom grillz maker). Loved your work with Glow by Sarah and put together a quick 1-tap booking concept. Down to see a 15-sec preview? No pressure!`
  );

  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>(
    "Quick intro & website idea for Glow by Sarah"
  );
  const [emailBody, setEmailBody] = useState<string>(
    `Hey Glow by Sarah team,

I'll be straight up with you: I'm A.Gure, an independent junior web designer here in Oslo. I recently started designing and building clean, mobile-first websites specifically for small local businesses and independent creators.

Websites from big design agencies can be crazy expensive — they easily quote 40,000+ kr and weeks of meetings for basic templates that small businesses don't need. Because I just started out and I'm actively building up my portfolio and client roster, I do fast, custom work directly with you at honest, fair rates with zero agency markup.

You can see 2 client websites I'm currently working on right now on my portfolio: https://abdisalam.space (one is an automated mobile booking site for an Oslo tooth gem studio, and the other is an interactive showcase for a custom grillz maker).

I love what you're doing with Glow by Sarah in the local scene, but noticed your bookings still run through email / DMs. I put together a quick visual concept showing how a clean 1-tap mobile booking page could look so clients can see your services and book directly in 30 seconds without the back-and-forth messages.

No pressure at all! Let me know if you'd be open to checking out a quick 15-second demo.

Best,
Abdisalam Gure (A.Gure)
Web Developer & Designer
https://abdisalam.space
niwache12@gmail.com`
  );

  const [smsMsg, setSmsMsg] = useState<string>(
    "Hey Glow by Sarah! I'm A.Gure, local Oslo dev. Recently started building clean mobile sites for small spots (no 40k agency fees). Check 2 client sites I'm working on: abdisalam.space"
  );

  // Status & Feedback
  const [isGenerating, startGenerating] = useTransition();
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Dynamic Card Preview Scaling for Mobile Viewport
  const [cardScale, setCardScale] = useState<number>(0.45);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check stored auth and leads on mount
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlPin = searchParams.get("pin");
      const urlView = searchParams.get("view");
      const savedPin = localStorage.getItem("ag_studio_auth");

      if (urlView === "card" || urlView === "composer") {
        setMobileView(urlView);
      }

      if (urlPin === "2026") {
        setIsAuthenticated(true);
        localStorage.setItem("ag_studio_auth", "2026");
      } else if (savedPin === "2026") {
        setIsAuthenticated(true);
      }

      const savedLeads = localStorage.getItem("ag_studio_leads");
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      }
    } catch {}
    setIsCheckingAuth(false);
  }, []);

  // Compute card scale dynamically on resize to fit any phone screen
  useEffect(() => {
    const updateScale = () => {
      const container = cardContainerRef.current;
      const width = container && container.clientWidth > 0
        ? container.clientWidth
        : (typeof window !== "undefined" ? window.innerWidth : 400);
      const availableWidth = Math.max(280, width - 32);
      const targetScale = Math.min(1, availableWidth / 800);
      setCardScale(targetScale);
    };

    updateScale();
    const timer = setTimeout(updateScale, 100);
    window.addEventListener("resize", updateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScale);
    };
  }, [mobileView, isAuthenticated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth Handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/auth-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("ag_studio_auth", pinInput);
      } else {
        setAuthError(data.error || "Incorrect PIN");
      }
    } catch {
      setAuthError("Failed to authenticate. Try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ag_studio_auth");
    setIsAuthenticated(false);
    setPinInput("");
  };

  // Generate Pitch via API
  const handleGeneratePitch = () => {
    startGenerating(async () => {
      try {
        const res = await fetch("/api/generate-pitch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brandName,
            niche,
            angle,
            notes: extraNotes
          })
        });
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          if (d.cardHeadline) setCardHeadline(d.cardHeadline);
          if (d.cardDesc) setCardDesc(d.cardDesc);
          if (d.cardTag) setCardTag(d.cardTag);
          if (d.emailSubject) setEmailSubject(d.emailSubject);
          if (d.emailBody) setEmailBody(d.emailBody);
          if (d.dmMessage) {
            setIgDmMsg(d.dmMessage);
            setWhatsappMsg(d.dmMessage);
          }
          if (d.smsMessage) setSmsMsg(d.smsMessage);
          showToast(`✓ Generated honest pitch (${json.source === "gemini" ? "✦ Gemini AI" : "Honest Preset"})`);
        }
      } catch (err) {
        console.error(err);
        showToast("Generation failed. Please try again.");
      }
    });
  };

  // Download Card as PNG using HTML5 Canvas
  const handleDownloadCard = async () => {
    showToast("Generating high-DPI card image...");
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 960;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw dark background
      ctx.fillStyle = "#08080a";
      ctx.fillRect(0, 0, 1600, 960);

      // Draw subtle border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.09)";
      ctx.lineWidth = 2;
      ctx.strokeRect(24, 24, 1552, 912);

      // Top Header: Brand & Tag
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px 'Space Grotesk', -apple-system, sans-serif";
      ctx.fillText("A.GURE", 76, 96);

      ctx.fillStyle = "#6c6c76";
      ctx.font = "600 22px 'JetBrains Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText(cardTag, 1524, 96);

      // Headline (Multi-line word wrap)
      ctx.textAlign = "left";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 52px 'Space Grotesk', -apple-system, sans-serif";

      const words = cardHeadline.split(" ");
      let line = "";
      let y = 310;
      const maxWidth = 820;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, 76, y);
          line = words[n] + " ";
          y += 62;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 76, y);

      // Description
      ctx.fillStyle = "#9d9da6";
      ctx.font = "27px 'Inter', -apple-system, sans-serif";
      const descWords = cardDesc.split(" ");
      let descLine = "";
      let descY = y + 70;
      for (let n = 0; n < descWords.length; n++) {
        const testLine = descLine + descWords[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(descLine, 76, descY);
          descLine = descWords[n] + " ";
          descY += 42;
        } else {
          descLine = testLine;
        }
      }
      ctx.fillText(descLine, 76, descY);

      // Load Showcase phone images
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      try {
        const [grillzImg, noireImg] = await Promise.all([
          loadImage("/showcase/grillz_mobile.png"),
          loadImage("/showcase/noire_mobile.png")
        ]);

        // Draw Left Phone (Monochrome - Back)
        ctx.save();
        ctx.translate(1180, 480);
        ctx.rotate((-6 * Math.PI) / 180);
        ctx.translate(-146, -284);
        ctx.beginPath();
        ctx.roundRect(0, 0, 292, 568, 44);
        ctx.clip();
        ctx.drawImage(grillzImg, 0, 0, 292, 568);
        ctx.strokeStyle = "#1c1c22";
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.restore();

        // Draw Right Phone (Gangina - Front)
        ctx.save();
        ctx.translate(1350, 450);
        ctx.rotate((5.5 * Math.PI) / 180);
        ctx.translate(-146, -284);
        ctx.beginPath();
        ctx.roundRect(0, 0, 292, 568, 44);
        ctx.clip();
        ctx.drawImage(noireImg, 0, 0, 292, 568);
        ctx.strokeStyle = "#25252c";
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.restore();
      } catch (imgErr) {
        console.warn("Could not render phone images to canvas:", imgErr);
      }

      // Footer Line & Links
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      ctx.moveTo(76, 840);
      ctx.lineTo(1524, 840);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "600 24px 'JetBrains Mono', monospace";
      ctx.fillText("abdisalam.space ↗", 76, 888);

      ctx.fillStyle = "#6c6c76";
      ctx.textAlign = "right";
      ctx.fillText("niwache12@gmail.com", 1524, 888);

      // Trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-card.png`;
      a.click();
      showToast("✓ High-DPI Card downloaded!");
    } catch (err) {
      console.error(err);
      showToast("Could not download canvas. Try right-clicking preview.");
    }
  };

  // Record Lead to Local Storage
  const recordLead = (leadChannel: LeadRecord["channel"], contactVal: string) => {
    const newLead: LeadRecord = {
      id: Date.now().toString(),
      brandName: brandName.trim() || "Local Spot",
      niche,
      contact: contactVal,
      channel: leadChannel,
      status: "contacted",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    };
    const updated = [newLead, ...leads.slice(0, 19)];
    setLeads(updated);
    localStorage.setItem("ag_studio_leads", JSON.stringify(updated));
  };

  // Actions
  const handleOpenInstagram = () => {
    const handle = instagramHandle.replace("@", "").trim();
    if (!handle) {
      showToast("Please enter an Instagram handle.");
      return;
    }
    navigator.clipboard.writeText(igDmMsg);
    recordLead("instagram", `@${handle}`);
    showToast("✓ Copied DM message! Opening Instagram...");
    setTimeout(() => {
      window.open(`https://instagram.com/${handle}`, "_blank");
    }, 600);
  };

  const handleOpenWhatsApp = () => {
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");
    if (!cleanNumber) {
      showToast("Please enter a phone number.");
      return;
    }
    recordLead("whatsapp", cleanNumber);
    const url = `https://wa.me/${cleanNumber.replace("+", "")}?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(url, "_blank");
    showToast("Opening WhatsApp with pre-filled pitch!");
  };

  const handleSendEmail = async () => {
    if (!recipientEmail || !recipientEmail.includes("@")) {
      showToast("Please enter a valid recipient email.");
      return;
    }
    setIsSendingEmail(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientEmail,
          subject: emailSubject,
          htmlBody: emailBody,
          brandName
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          data.sent
            ? `✓ Email sent from hello@abdisalam.space to ${recipientEmail}!`
            : `✓ Draft ready! (Verify domain in Resend to send live)`
        );
        recordLead("email", recipientEmail);
      } else {
        showToast(`Email error: ${data.error}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error sending email";
      showToast(message);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSendSMS = () => {
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");
    if (!cleanNumber) {
      showToast("Please enter a phone number.");
      return;
    }
    recordLead("sms", cleanNumber);
    const url = `sms:${cleanNumber}?body=${encodeURIComponent(smsMsg)}`;
    window.location.href = url;
    showToast("Opening Messages app!");
  };

  // Auth Loading
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center text-zinc-500 font-mono text-xs">
        Loading Studio...
      </div>
    );
  }

  // 1. PIN Lock Screen (Clean, Mobile-Optimized)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-[#0e0e12] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-6">
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold tracking-tighter text-white font-heading text-lg">
            A.G
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold font-heading text-white">Outreach Studio</h1>
            <p className="text-xs text-zinc-400 mt-1 font-mono">Enter Studio PIN to continue</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="w-full flex flex-col gap-3.5">
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              autoFocus
              className="w-full bg-[#141418] border border-white/15 rounded-xl px-4 py-3.5 text-center text-2xl tracking-[0.4em] text-white focus:outline-none focus:border-white transition-all font-mono"
            />
            {authError && <p className="text-xs text-red-400 text-center font-mono">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-white hover:bg-zinc-200 active:scale-[0.98] text-black font-semibold py-3.5 rounded-xl transition-all font-mono text-xs uppercase tracking-wider shadow-lg"
            >
              Unlock Studio ↗
            </button>
          </form>

          <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors font-mono">
            ← Return to abdisalam.space
          </Link>
        </div>
      </div>
    );
  }

  // 2. Main Studio Workspace (Mobile-First, Clean Scandinavian Design)
  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 left-5 sm:left-auto z-50 bg-[#16161c] border border-white/20 text-white px-4 py-3 rounded-xl shadow-2xl font-mono text-xs flex items-center justify-center sm:justify-start gap-2 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between bg-[#08080a]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="font-heading font-bold text-base text-white hover:opacity-80 transition-opacity">
            A.GURE
          </Link>
          <span className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            STUDIO
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-xs font-mono text-zinc-400 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>📋</span>
            <span className="hidden sm:inline">History</span>
            <span className="text-zinc-200">({leads.length})</span>
          </button>
          <button
            onClick={handleLogout}
            className="text-xs font-mono text-zinc-400 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            Lock
          </button>
        </div>
      </header>

      {/* Mobile Top View Switcher (Visible on phone/tablet, hidden on desktop lg:) */}
      <div className="lg:hidden border-b border-white/10 bg-[#0c0c10] px-3 py-2 flex items-center gap-2 sticky top-[53px] z-30">
        <button
          onClick={() => setMobileView("composer")}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
            mobileView === "composer"
              ? "bg-white text-black shadow"
              : "bg-[#141418] text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <span>✍️</span> Pitch &amp; Send
        </button>
        <button
          onClick={() => setMobileView("card")}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
            mobileView === "card"
              ? "bg-white text-black shadow"
              : "bg-[#141418] text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <span>🎴</span> Visual Card
        </button>
      </div>

      {/* History Slide-down Drawer */}
      {showHistory && (
        <div className="border-b border-white/10 bg-[#0e0e12] p-4 max-w-[1700px] w-full mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
              Recent Outreach Contacts ({leads.length})
            </h3>
            <button
              onClick={() => setShowHistory(false)}
              className="text-xs text-zinc-500 hover:text-zinc-300 font-mono"
            >
              ✕ Close
            </button>
          </div>
          {leads.length === 0 ? (
            <p className="text-xs text-zinc-500 font-mono">No leads recorded yet. Send or copy a message below to log automatically.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {leads.map((l) => (
                <div key={l.id} className="p-2 rounded-lg bg-[#141418] border border-white/5 text-xs font-mono flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">{l.brandName}</span>
                    <span className="text-zinc-500 ml-1.5">({l.contact})</span>
                  </div>
                  <span className="uppercase text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-zinc-400">
                    {l.channel}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Target & Composer (Visible if desktop OR if mobileView === 'composer') */}
        <div className={`lg:col-span-6 flex flex-col gap-5 ${mobileView === "composer" ? "block" : "hidden lg:flex"}`}>
          {/* Card 1: Target Profile */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span> 1. Who are you pitching?
              </span>
              <span className="text-[11px] font-mono text-zinc-500">Radical honesty</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Brand / Business Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Glow by Sarah"
                  className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Niche / Industry</label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Makeup Artist"
                  className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Quick 1-Tap Niche Chips */}
            <div className="mb-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                {COMMON_NICHES.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setNiche(item.label)}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-full whitespace-nowrap border transition-all flex items-center gap-1 ${
                      niche.toLowerCase() === item.label.toLowerCase()
                        ? "bg-white text-black border-white"
                        : "bg-[#141418] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Angle Cards */}
            <div className="mb-3.5">
              <label className="block text-[11px] font-mono text-zinc-400 mb-1.5">Angle / Hook</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "pricing", title: "Honest Price", desc: "No 40k agency fee, fair rates" },
                  { key: "dms", title: "Messy DMs", desc: "1-tap booking, stop answering 'price?'" },
                  { key: "aesthetic", title: "Match Aesthetic", desc: "Mobile site matching their IG vibe" },
                  { key: "freelancer", title: "1-on-1 Dev", desc: "Direct junior dev, zero corporate BS" }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setAngle(item.key as AngleType)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      angle === item.key
                        ? "bg-white text-black border-white shadow-md"
                        : "bg-[#141418] text-zinc-300 border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div className="text-xs font-bold">{item.title}</div>
                    <div className={`text-[10px] font-mono mt-0.5 leading-tight ${angle === item.key ? "text-zinc-700" : "text-zinc-500"}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Notes (Optional Context) */}
            <div className="mb-4">
              <input
                type="text"
                value={extraNotes}
                onChange={(e) => setExtraNotes(e.target.value)}
                placeholder="Optional details: e.g. Has 10k followers, handles bookings via email"
                className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono placeholder:text-zinc-600"
              />
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleGeneratePitch}
              disabled={isGenerating}
              className="w-full bg-white hover:bg-zinc-200 active:scale-[0.98] text-black font-semibold py-3 rounded-xl transition-all font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Crafting Honest Pitch...
                </>
              ) : (
                <>
                  <span>✦</span> Generate Pitch Package
                </>
              )}
            </button>
          </div>

          {/* Card 2: Channels & 1-Tap Delivery */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 2. Send or Copy Pitch
              </span>
              <span className="text-[11px] font-mono text-zinc-500">Pick channel</span>
            </div>

            {/* Channel Tabs */}
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {[
                { id: "instagram", label: "Instagram", icon: "📸" },
                { id: "whatsapp", label: "WhatsApp", icon: "💬" },
                { id: "email", label: "Email", icon: "✉️" },
                { id: "sms", label: "SMS", icon: "📱" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setChannel(tab.id as DeliveryChannel)}
                  className={`py-2 rounded-lg text-xs font-mono transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-1 ${
                    channel === tab.id
                      ? "bg-white/15 text-white border border-white/20 shadow-sm"
                      : "bg-[#141418] text-zinc-400 border border-white/5 hover:text-white"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="text-[11px] font-sans font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Channel 1: Instagram DM */}
            {channel === "instagram" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Instagram Handle</label>
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="@glowbysarah"
                    className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">DM Message (Editable)</label>
                  <textarea
                    rows={4}
                    value={igDmMsg}
                    onChange={(e) => setIgDmMsg(e.target.value)}
                    className="w-full bg-[#141418] border border-white/10 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-white transition-colors font-sans leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleOpenInstagram}
                  className="w-full bg-white hover:bg-zinc-200 active:scale-[0.98] text-black font-semibold py-3 rounded-xl transition-all font-mono text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>📸</span> Copy DM &amp; Open Instagram Profile ↗
                </button>
              </div>
            )}

            {/* Channel 2: WhatsApp */}
            {channel === "whatsapp" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Business Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+47 987 65 432"
                    className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">WhatsApp Message (Editable)</label>
                  <textarea
                    rows={4}
                    value={whatsappMsg}
                    onChange={(e) => setWhatsappMsg(e.target.value)}
                    className="w-full bg-[#141418] border border-white/10 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-white transition-colors font-sans leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all font-mono text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>💬</span> Open WhatsApp Chat ↗
                </button>
              </div>
            )}

            {/* Channel 3: Email */}
            {channel === "email" && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Recipient Email</label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="contact@studio.no"
                      className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Sender</label>
                    <div className="bg-[#141418] border border-white/5 rounded-lg px-3 py-2 text-[11px] text-zinc-400 font-mono truncate">
                      hello@abdisalam.space
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Email Body (Editable)</label>
                  <textarea
                    rows={6}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full bg-[#141418] border border-white/10 rounded-lg p-3 text-xs text-zinc-300 focus:outline-none focus:border-white transition-colors font-sans leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleSendEmail}
                  disabled={isSendingEmail}
                  className="w-full bg-white hover:bg-zinc-200 active:scale-[0.98] text-black font-semibold py-3 rounded-xl transition-all font-mono text-xs flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                >
                  {isSendingEmail ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      Sending via hello@abdisalam.space...
                    </>
                  ) : (
                    <>
                      <span>✉️</span> Send Email Directly ↗
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Channel 4: SMS */}
            {channel === "sms" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Recipient Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+47 987 65 432"
                    className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">SMS Message (Under 160 chars)</label>
                  <textarea
                    rows={3}
                    value={smsMsg}
                    onChange={(e) => setSmsMsg(e.target.value)}
                    className="w-full bg-[#141418] border border-white/10 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-white transition-colors font-sans"
                  />
                </div>

                <button
                  onClick={handleSendSMS}
                  className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all font-mono text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>📱</span> Launch Messages App ↗
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Pitch Card (Visible if desktop OR if mobileView === 'card') */}
        <div className={`lg:col-span-6 flex flex-col items-center gap-4 ${mobileView === "card" ? "block" : "hidden lg:flex"}`}>
          <div className="w-full flex items-center justify-between px-1">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎴</span> Visual Pitch Card
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCardEdit(!showCardEdit)}
                className="text-xs font-mono text-zinc-400 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                {showCardEdit ? "Hide Edit" : "✏️ Edit Text"}
              </button>
              <button
                onClick={handleDownloadCard}
                className="bg-white hover:bg-zinc-200 active:scale-[0.98] text-black px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow"
              >
                <span>📥</span> Download PNG
              </button>
            </div>
          </div>

          {/* Card Text Inline Edits (Collapsible) */}
          {showCardEdit && (
            <div className="w-full bg-[#0e0e12] border border-white/10 rounded-xl p-3.5 space-y-2.5">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 mb-1">Headline on Card</label>
                <input
                  type="text"
                  value={cardHeadline}
                  onChange={(e) => setCardHeadline(e.target.value)}
                  className="w-full bg-[#141418] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 mb-1">Subtext on Card</label>
                <textarea
                  rows={2}
                  value={cardDesc}
                  onChange={(e) => setCardDesc(e.target.value)}
                  className="w-full bg-[#141418] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 mb-1">Category Tag</label>
                <input
                  type="text"
                  value={cardTag}
                  onChange={(e) => setCardTag(e.target.value)}
                  className="w-full max-w-[200px] bg-[#141418] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono uppercase focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>
          )}

          {/* DYNAMIC RESPONSIVE 800×480 CARD PREVIEW CONTAINER */}
          <div ref={cardContainerRef} className="w-full flex justify-center py-2 px-1">
            <div
              style={{
                width: Math.floor(800 * cardScale),
                height: Math.floor(480 * cardScale)
              }}
              className="relative overflow-hidden rounded-[18px] border border-white/[0.09] shadow-2xl flex-shrink-0 bg-[#08080a]"
            >
              <div
                ref={cardRef}
                style={{
                  width: 800,
                  height: 480,
                  transform: `scale(${cardScale})`,
                  transformOrigin: "top left",
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
                className="bg-[#08080a] text-zinc-100 p-[34px_38px] flex flex-col justify-between select-none"
              >
                {/* Top Header */}
                <div className="flex items-baseline justify-between z-10 pb-2">
                  <span className="font-heading font-bold text-[19px] tracking-[-0.04em] text-white">
                    A.GURE
                  </span>
                  <span className="font-mono text-[11px] text-[#6c6c76] tracking-[0.04em] uppercase">
                    {cardTag}
                  </span>
                </div>

                {/* Main Content Split */}
                <div className="flex items-center justify-between gap-8 z-10 -mt-1.5">
                  {/* Copy Side */}
                  <div className="flex-1 max-w-[440px] flex flex-col gap-3.5">
                    <h1 className="font-heading font-bold text-[26.5px] leading-[1.16] tracking-[-0.035em] text-white">
                      {cardHeadline}
                    </h1>
                    <p className="font-sans text-[13.5px] text-[#9d9da6] leading-[1.58] font-normal">
                      {cardDesc}
                    </p>
                  </div>

                  {/* Dual Phone Mockups Visual Side */}
                  <div className="relative w-[250px] h-[300px] flex items-center justify-center flex-shrink-0">
                    {/* Left Mockup (Monochrome in the back) */}
                    <div className="absolute w-[146px] h-[284px] rounded-[22px] bg-black overflow-hidden border-[3px] border-[#1c1c22] shadow-[0_18px_40px_-10px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] -rotate-6 -translate-x-[42px] translate-y-2 z-10">
                      <Image
                        src="/showcase/grillz_mobile.png"
                        alt="Monochrome CRM Mobile Preview"
                        width={146}
                        height={284}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Right Mockup (By Gangina in front) */}
                    <div className="absolute w-[146px] h-[284px] rounded-[22px] bg-black overflow-hidden border-[3px] border-[#25252c] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12)] rotate-[5.5deg] translate-x-[42px] -translate-y-2 z-20">
                      <Image
                        src="/showcase/noire_mobile.png"
                        alt="By Gangina Mobile Preview"
                        width={146}
                        height={284}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-3.5 z-10">
                  <span className="font-mono text-[12.5px] font-semibold text-white">
                    abdisalam.space ↗
                  </span>
                  <span className="font-mono text-[11.5px] text-[#6c6c76]">
                    niwache12@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions under Card on Mobile */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mt-1">
            <button
              onClick={handleDownloadCard}
              className="w-full bg-white hover:bg-zinc-200 active:scale-[0.98] text-black font-semibold py-3 rounded-xl transition-all font-mono text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <span>📥</span> Save High-Res Card Image (PNG)
            </button>
            <button
              onClick={() => setMobileView("composer")}
              className="lg:hidden w-full bg-[#141418] hover:bg-[#1a1a20] text-zinc-300 font-mono text-xs py-3 rounded-xl border border-white/10 transition-colors"
            >
              ← Back to Compose &amp; Send
            </button>
          </div>

          <div className="text-center text-[11px] font-mono text-zinc-500 max-w-sm px-2">
            Editorial typography (Space Grotesk &amp; Inter). Dual client mockups live on abdisalam.space.
          </div>
        </div>
      </main>
    </div>
  );
}
