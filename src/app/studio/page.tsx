"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";

type AngleType = "pricing" | "dms" | "aesthetic" | "freelancer" | "custom";
type DeliveryTab = "email" | "whatsapp" | "sms" | "instagram";

interface LeadRecord {
  id: string;
  brandName: string;
  niche: string;
  contact: string;
  channel: "email" | "whatsapp" | "sms" | "instagram";
  status: "contacted" | "replied" | "closed";
  date: string;
}

export default function StudioPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Profiler Inputs
  const [brandName, setBrandName] = useState<string>("Grimm Tattoo");
  const [niche, setNiche] = useState<string>("Tattoo & Piercing Studio");
  const [angle, setAngle] = useState<AngleType>("dms");
  const [extraNotes, setExtraNotes] = useState<string>("");

  // Card Content (Live synchronized)
  const [cardHeadline, setCardHeadline] = useState<string>(
    "Still booking Grimm Tattoo's clients through Instagram DMs?"
  );
  const [cardDesc, setCardDesc] = useState<string>(
    "Lost messages, endless back-and-forth, and answering 'how much is this?'. I build simple mobile sites with direct booking calendars and clear menus so clients can book in 30 seconds."
  );
  const [cardTag, setCardTag] = useState<string>("DIRECT BOOKINGS");

  // Delivery Tab & Fields
  const [activeTab, setActiveTab] = useState<DeliveryTab>("whatsapp");
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>(
    "Idea to automate bookings for Grimm Tattoo (replace messy DMs)"
  );
  const [emailBody, setEmailBody] = useState<string>(
    `Hey Grimm Tattoo team,\n\nI love your work and attention to detail.\n\nI noticed you're currently handling inquiries and bookings through Instagram DMs. A lot of studios lose clients because people hate asking "price?" and waiting hours for a reply.\n\nI build simple, mobile-first websites with direct booking calendars and clear service menus so your clients can view your work and book in 30 seconds straight from their phone.\n\nAttached is a quick visual concept I designed for Grimm Tattoo. You can see my live work at: https://abdisalam.space\n\nWould love to show you a quick 15-second demo if you're open to it!\n\nBest,\nAbdisalam Gure\nhttps://abdisalam.space`
  );

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [whatsappMsg, setWhatsappMsg] = useState<string>(
    "Hey Grimm Tattoo! Love your page. Noticed bookings still run through DMs — put together a quick preview of how a direct 1-tap mobile booking menu for Grimm Tattoo could look to save you from answering 'price?' all day. Want to check it out? abdisalam.space"
  );
  const [smsMsg, setSmsMsg] = useState<string>(
    "Hey Grimm Tattoo! Quick concept for a 1-tap mobile booking site for you so clients can book directly from their phone: abdisalam.space"
  );

  const [instagramHandle, setInstagramHandle] = useState<string>("grimmtattoo");
  const [igDmMsg, setIgDmMsg] = useState<string>(
    "Hey Grimm Tattoo! Love your page. Noticed bookings still run through DMs — put together a quick preview of how a direct 1-tap mobile booking menu for Grimm Tattoo could look. Want to check it out?"
  );

  // Status & Feedback
  const [isGenerating, startGenerating] = useTransition();
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>([]);

  // Ref for the Card Preview Element
  const cardRef = useRef<HTMLDivElement>(null);

  // Check stored auth on mount
  useEffect(() => {
    const savedPin = localStorage.getItem("ag_studio_auth");
    if (savedPin === "2026") {
      setIsAuthenticated(true);
    }
    const savedLeads = localStorage.getItem("ag_studio_leads");
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch {}
    }
    setIsCheckingAuth(false);
  }, []);

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
            setWhatsappMsg(d.dmMessage + " abdisalam.space");
          }
          if (d.smsMessage) setSmsMsg(d.smsMessage);
          showToast(`Generated tailored pitch (${json.source === "gemini" ? "✦ Gemini AI" : "Smart Preset"})`);
        }
      } catch (err) {
        console.error(err);
        showToast("Generation failed, please try again.");
      }
    });
  };

  // Update presets immediately when angle changes
  const handleAngleChange = (newAngle: AngleType) => {
    setAngle(newAngle);
  };

  // Download Card as PNG using HTML5 Canvas (with embedded phone mockups)
  const handleDownloadCard = async () => {
    showToast("Generating high-DPI card...");
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

      // Helper to load image as Promise
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
        // Rounded clip for phone screen
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
      a.download = `${brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-pitch-card.png`;
      a.click();
      showToast("✓ High-DPI Card downloaded!");
    } catch (err) {
      console.error(err);
      showToast("Could not download canvas. Try right-clicking preview.");
    }
  };

  // Record Lead to Local Storage
  const recordLead = (channel: LeadRecord["channel"], contactVal: string) => {
    const newLead: LeadRecord = {
      id: Date.now().toString(),
      brandName: brandName.trim() || "Independent Brand",
      niche,
      contact: contactVal,
      channel,
      status: "contacted",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    };
    const updated = [newLead, ...leads.slice(0, 19)];
    setLeads(updated);
    localStorage.setItem("ag_studio_leads", JSON.stringify(updated));
  };

  // Send Email Action
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
            : `✓ Draft ready! (Add RESEND_API_KEY to send live)`
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

  // WhatsApp Action
  const handleOpenWhatsApp = () => {
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");
    if (!cleanNumber) {
      showToast("Please enter a phone number.");
      return;
    }
    recordLead("whatsapp", cleanNumber);
    const url = `https://wa.me/${cleanNumber.replace("+", "")}?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(url, "_blank");
    showToast("Opening WhatsApp with pre-filled message!");
  };

  // SMS Action
  const handleSendSMS = () => {
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");
    if (!cleanNumber) {
      showToast("Please enter a phone number.");
      return;
    }
    recordLead("sms", cleanNumber);
    const url = `sms:${cleanNumber}?body=${encodeURIComponent(smsMsg)}`;
    window.location.href = url;
    showToast("Launching Messages app!");
  };

  // Instagram Action
  const handleOpenInstagram = () => {
    const handle = instagramHandle.replace("@", "").trim();
    if (!handle) {
      showToast("Please enter an Instagram handle.");
      return;
    }
    navigator.clipboard.writeText(igDmMsg);
    recordLead("instagram", `@${handle}`);
    showToast("✓ Copied DM message to clipboard! Opening Instagram...");
    setTimeout(() => {
      window.open(`https://instagram.com/${handle}`, "_blank");
    }, 700);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center text-zinc-500 font-mono text-sm">
        Loading Studio...
      </div>
    );
  }

  // 1. PIN Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-sm bg-[#0e0e12] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold tracking-tighter text-white font-heading text-xl">
            A.G
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold font-heading text-white">Outreach Command Desk</h1>
            <p className="text-xs text-zinc-400 mt-1 font-mono">Enter 4-digit Studio PIN to access</p>
          </div>

          <form onSubmit={handleAuthSubmit} className="w-full flex flex-col gap-4">
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              autoFocus
              className="w-full bg-[#141418] border border-white/15 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-white transition-all font-mono"
            />
            {authError && <p className="text-xs text-red-400 text-center font-mono">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-white hover:bg-zinc-200 text-black font-semibold py-3 rounded-xl transition-colors font-mono text-xs uppercase tracking-wider"
            >
              Unlock Desk ↗
            </button>
          </form>

          <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors font-mono">
            ← Return to public site
          </Link>
        </div>
      </div>
    );
  }

  // 2. Main Studio Command Desk Workspace
  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16161c] border border-white/20 text-white px-5 py-3 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          {toastMessage}
        </div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-[#08080a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-heading font-bold text-lg text-white hover:opacity-80 transition-opacity">
            A.GURE
          </Link>
          <span className="text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            STUDIO DESK
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            Logged in • <span className="text-zinc-200">{leads.length} leads saved</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-xs font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Lock Studio
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profiler & Composer (Cols 1-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 1: Target Profiler */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-zinc-300">
                1. Target Business Profile
              </h2>
              <span className="text-[11px] font-mono text-zinc-400">Personalize in 60s</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Business Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Grimm Tattoo"
                  className="w-full bg-[#141418] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Niche / Industry</label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Tattoo Studio"
                  className="w-full bg-[#141418] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Angle Selectors */}
            <div className="mb-4">
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Outreach Angle</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: "pricing", label: "Honest Price", sub: "No markup" },
                  { key: "dms", label: "Messy DMs", sub: "1-tap booking" },
                  { key: "aesthetic", label: "Match IG", sub: "Mobile first" },
                  { key: "freelancer", label: "1-on-1 Collab", sub: "Direct local" }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleAngleChange(item.key as AngleType)}
                    className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                      angle === item.key
                        ? "bg-white text-black border-white"
                        : "bg-[#141418] text-zinc-300 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="text-xs font-bold font-sans">{item.label}</span>
                    <span className={`text-[10px] font-mono mt-0.5 ${angle === item.key ? "text-zinc-700" : "text-zinc-500"}`}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Notes (optional) */}
            <div className="mb-5">
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                Extra Details <span className="text-zinc-600">(Optional context)</span>
              </label>
              <input
                type="text"
                value={extraNotes}
                onChange={(e) => setExtraNotes(e.target.value)}
                placeholder="e.g. Has 15k followers on IG, currently using broken linktree"
                className="w-full bg-[#141418] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* AI Generator CTA */}
            <button
              onClick={handleGeneratePitch}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-zinc-200 to-white text-black font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Crafting tailored pitch...
                </>
              ) : (
                <>
                  <span>✦</span> Generate Tailored Pitch Package
                </>
              )}
            </button>
          </div>

          {/* Card 2: Live Copy Editor & Delivery Bar */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-zinc-300">
                2. Live Copy &amp; Delivery Bar
              </h2>
              <span className="text-[11px] font-mono text-emerald-400">Instant Sync</span>
            </div>

            {/* Card Text Inline Edits */}
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  Card Headline (Updates visual card in real-time)
                </label>
                <input
                  type="text"
                  value={cardHeadline}
                  onChange={(e) => setCardHeadline(e.target.value)}
                  className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  Card Subtext (2 sentences)
                </label>
                <textarea
                  rows={2}
                  value={cardDesc}
                  onChange={(e) => setCardDesc(e.target.value)}
                  className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Category Tag</label>
                <input
                  type="text"
                  value={cardTag}
                  onChange={(e) => setCardTag(e.target.value)}
                  className="w-full max-w-[240px] bg-[#141418] border border-white/10 rounded-lg px-3 py-1 text-xs text-white font-mono uppercase focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Channel Tabs */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                {[
                  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
                  { id: "sms", label: "Direct SMS", icon: "📱" },
                  { id: "email", label: "Email Directly", icon: "✉️" },
                  { id: "instagram", label: "Instagram DM", icon: "📸" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as DeliveryTab)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-white/15 text-white border border-white/20"
                        : "bg-[#141418] text-zinc-400 border border-white/5 hover:text-white"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab 1: WhatsApp */}
              {activeTab === "whatsapp" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Business Phone Number (with country code)
                    </label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+47 987 65 432"
                      className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">WhatsApp Message</label>
                    <textarea
                      rows={3}
                      value={whatsappMsg}
                      onChange={(e) => setWhatsappMsg(e.target.value)}
                      className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleOpenWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl transition-colors font-mono text-xs flex items-center justify-center gap-2"
                  >
                    <span>💬</span> Open Pre-filled WhatsApp Chat ↗
                  </button>
                </div>
              )}

              {/* Tab 2: SMS */}
              {activeTab === "sms" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+47 987 65 432"
                      className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">SMS Text</label>
                    <textarea
                      rows={3}
                      value={smsMsg}
                      onChange={(e) => setSmsMsg(e.target.value)}
                      className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleSendSMS}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-colors font-mono text-xs flex items-center justify-center gap-2"
                  >
                    <span>📱</span> Launch Native SMS Message ↗
                  </button>
                </div>
              )}

              {/* Tab 3: Email */}
              {activeTab === "email" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Recipient Email</label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="contact@studio.no"
                        className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">Sender &amp; Reply-To</label>
                      <div className="bg-[#141418] border border-white/5 rounded-lg px-3 py-2 text-xs text-zinc-400 font-mono">
                        hello@abdisalam.space → niwache12@gmail.com
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Subject Line</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Email Body</label>
                    <textarea
                      rows={6}
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-white transition-colors font-sans leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={handleSendEmail}
                    disabled={isSendingEmail}
                    className="w-full bg-white hover:bg-zinc-200 text-black font-semibold py-2.5 rounded-xl transition-colors font-mono text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSendingEmail ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        Sending email via hello@abdisalam.space...
                      </>
                    ) : (
                      <>
                        <span>✉️</span> Send Email Directly (Attach Concept Card) ↗
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Tab 4: Instagram */}
              {activeTab === "instagram" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Instagram Handle</label>
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      placeholder="@grimmtattoo"
                      className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">DM Script</label>
                    <textarea
                      rows={3}
                      value={igDmMsg}
                      onChange={(e) => setIgDmMsg(e.target.value)}
                      className="w-full bg-[#141418] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleOpenInstagram}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-medium py-2.5 rounded-xl transition-opacity font-mono text-xs flex items-center justify-center gap-2"
                  >
                    <span>📸</span> Copy Text &amp; Open Instagram Profile ↗
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Outreach Pipeline Tracker */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-zinc-300">
                Outreach History
              </h2>
              <span className="text-[11px] font-mono text-zinc-500">Stored locally in browser</span>
            </div>

            {leads.length === 0 ? (
              <p className="text-xs text-zinc-500 font-mono py-2">
                No contacted leads logged yet. Send an email, WhatsApp, or IG message above to track.
              </p>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {leads.map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#141418] border border-white/5 text-xs font-mono"
                  >
                    <div>
                      <span className="font-bold text-white">{l.brandName}</span>
                      <span className="text-zinc-500 ml-2">({l.contact})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="uppercase text-[10px] bg-white/5 px-2 py-0.5 rounded text-zinc-400">
                        {l.channel}
                      </span>
                      <span className="text-zinc-500 text-[10px]">{l.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live 800×480 Editorial Card Canvas (Cols 6-12) */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 flex flex-col items-center gap-4">
          <div className="w-full flex items-center justify-between px-1">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Live Card Preview (800×480)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadCard}
                className="bg-white/10 hover:bg-white/20 border border-white/15 text-white px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>📥</span> Download PNG
              </button>
            </div>
          </div>

          {/* THE 800×480 CARD PREVIEW CONTAINER (Scales smoothly to fit without horizontal scrollbars) */}
          <div className="w-full flex justify-center py-2">
            <div
              ref={cardRef}
              className="relative w-[800px] h-[480px] max-w-full bg-[#08080a] text-zinc-100 p-[34px_38px] flex flex-col justify-between rounded-[18px] border border-white/[0.09] shadow-2xl flex-shrink-0"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                WebkitFontSmoothing: "antialiased"
              }}
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

          <div className="text-center text-[11px] font-mono text-zinc-500 max-w-sm">
            This card is live-rendered using your site&apos;s authentic typography (Space Grotesk &amp; Inter). Ready to download or send directly.
          </div>
        </div>
      </main>
    </div>
  );
}
