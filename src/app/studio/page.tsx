"use client";

import React, { useState, useEffect, useRef } from "react";
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

function generateCuratedPitch(brand: string, niche: string, angle: AngleType, notes?: string) {
  const b = brand.trim() || "Your Business";
  const n = niche.trim() || "studio";
  const slug = b.toLowerCase().replace(/[^a-z0-9]/g, "");

  const presets = {
    pricing: {
      cardTag: "NO AGENCY MARKUP",
      cardHeadline: `Websites can be crazy expensive. A direct site for ${b} doesn't have to be.`,
      cardDesc: `I recently started building clean mobile sites for small ${n} spots in Oslo. Honest rates, direct work, and zero 40k agency markup.`,
      emailSubject: `Quick intro & website idea for ${b}`,
      emailBody: `Hey ${b} team,

I'm A.Gure, an independent junior dev in Oslo. I recently started building clean mobile sites for small businesses because big agencies charge crazy 40,000+ kr fees.

You can see 2 client sites I'm currently working on at abdisalam.space (an Oslo tooth gem studio and a custom grillz maker).

I saw your work and noticed bookings still run through email/DMs. I'd love to make a quick demo website for you to see if you like it, with a clean 1-tap mobile booking flow.

Open to seeing a quick 15-second demo? No pressure at all!

Best,
A.Gure
abdisalam.space`,
      igDmMsg: `Hey! I'm A.Gure, an independent junior dev in Oslo. I recently started making clean mobile sites for small spots because agencies charge crazy 40k+ kr fees. Check 2 client sites I'm working on at abdisalam.space (tooth gem studio & custom grillz maker). Loved your work with ${b} — I'd love to make a quick demo website for you to see if you like it. Down to see a 15-sec preview? No pressure!`,
      whatsappMsg: `Hey! I'm A.Gure, an independent junior web dev in Oslo. Recently started making clean mobile sites for small businesses (no 40k agency fees). Check 2 client sites I'm working on at abdisalam.space (tooth gem studio & custom grillz maker). Loved your work with ${b} and would love to build a quick demo site for you to see if you like it. Down to see a 15-sec preview? No pressure!`,
      smsMsg: `Hey ${b}! I'm A.Gure, local Oslo dev. I build clean mobile sites for small spots (no 40k agency fees). Can build a quick demo site: abdisalam.space`
    },
    dms: {
      cardTag: "DIRECT BOOKINGS",
      cardHeadline: `Still handling ${b}'s bookings through messy DMs & emails?`,
      cardDesc: `I recently started building clean booking sites for independent spots in Oslo. Replace lost messages with a direct 1-tap menu so clients can book ${b} in 30 seconds.`,
      emailSubject: `Idea to automate bookings for ${b} (no agency markup)`,
      emailBody: `Hey ${b} team,

I'm A.Gure, a local junior dev in Oslo. I recently started making simple mobile booking sites because agencies charge crazy 40,000+ kr prices.

You can check out 2 client sites I'm currently designing right now at abdisalam.space (an Oslo tooth gem studio and a custom grillz maker).

I noticed ${b}'s bookings still run through email and DMs. I'd love to make a quick demo website for you to see if you like it, showing how a clean 1-tap booking flow can save you hours of back-and-forth.

Would love to send over a 15-second preview if you're curious. No pressure either way!

Best,
A.Gure
abdisalam.space`,
      igDmMsg: `Hey! I'm A.Gure, a local junior dev in Oslo. Started making clean mobile booking sites because agencies charge crazy 40k+ prices. Check 2 client sites I'm working on at abdisalam.space. Noticed ${b}'s bookings run through DMs/emails — I can make a quick demo website for you to see if you like it. Down to see a 15-sec preview? No pressure!`,
      whatsappMsg: `Hey! I'm A.Gure, a local dev in Oslo. Built mobile booking sites for local spots so they don't lose clients in DMs. Check 2 client sites at abdisalam.space. I'd love to make a quick demo website for ${b} to see if you like it. Down to see a 15-sec preview? No pressure!`,
      smsMsg: `Hey ${b}! I'm A.Gure, local Oslo dev. I build 1-tap booking sites so you stop losing clients in DMs. Check 2 client sites: abdisalam.space`
    },
    aesthetic: {
      cardTag: "MOBILE FIRST",
      cardHeadline: `Your work looks great on Instagram. Does ${b}'s website match it?`,
      cardDesc: `I recently started building clean mobile sites for local spots in Oslo. Custom design that matches your aesthetic with zero agency markup.`,
      emailSubject: `Mobile web makeover idea for ${b}`,
      emailBody: `Hey ${b} team,

I'm A.Gure, a junior web designer in Oslo. Big agencies charge 40,000+ kr for websites, so I build clean mobile sites for local spots directly at honest rates.

You can see 2 client sites I'm currently working on right now at abdisalam.space (an Oslo tooth gem studio and a custom grillz shop).

Your aesthetic on Instagram is top tier, and I'd love to make a quick demo website for ${b} that matches your exact visual vibe so you can see if you like it.

Down to check out a 15-second demo? No pressure at all!

Best,
A.Gure
abdisalam.space`,
      igDmMsg: `Hey! I'm A.Gure, a junior web dev in Oslo. Agencies charge 40k+ kr for sites, so I build clean mobile pages for local spots directly at honest rates. Check 2 client sites I'm working on at abdisalam.space. Your aesthetic with ${b} is unreal — I can make a quick demo website matching your vibe to see if you like it. Down to see a 15-sec preview? No pressure!`,
      whatsappMsg: `Hey! I'm A.Gure, a junior web designer in Oslo. I make clean mobile sites matching local creatives' aesthetics (no 40k agency fees). Check 2 client sites at abdisalam.space. Love ${b}'s vibe — I can put together a quick demo website for you to see if you like it. Down to check it out? No pressure!`,
      smsMsg: `Hey ${b}! I'm A.Gure, local Oslo dev. I build mobile sites matching your Instagram aesthetic. See 2 client sites: abdisalam.space`
    },
    freelancer: {
      cardTag: "1-ON-1 FREELANCER",
      cardHeadline: `I build & redesign clean websites for spots like ${b}.`,
      cardDesc: `I recently started building clean websites for small businesses in Oslo. Direct 1-on-1 collaboration, fair rates, and zero corporate fluff.`,
      emailSubject: `Quick intro & website idea for ${b}`,
      emailBody: `Hey ${b} team,

I'm A.Gure, an independent junior dev in Oslo. I build clean mobile websites directly 1-on-1 for small local spots (zero 40,000+ kr agency fees or corporate fluff).

You can see 2 client websites I'm currently working on at abdisalam.space (a tooth gem studio and a custom grillz maker).

I love what you're doing with ${b}, and I can make a quick demo website for you to see if you like it.

Let me know if you'd be open to seeing a 15-second preview. No pressure!

Best,
A.Gure
abdisalam.space`,
      igDmMsg: `Hey! I'm A.Gure, an independent junior dev in Oslo. I build clean mobile sites for small spots (no 40k agency fees). Check 2 client sites I'm working on at abdisalam.space. Loved what you're doing with ${b} — I can make a quick demo website for you to see if you like it. Down to check it out? No pressure!`,
      whatsappMsg: `Hey! I'm A.Gure, local junior dev in Oslo. I build clean mobile sites 1-on-1 for small spots (no 40k agency fees). Check 2 client sites at abdisalam.space. Love ${b}'s work — I can put together a quick demo site for you to see if you like it. Down to see a 15-sec preview?`,
      smsMsg: `Hey ${b}! I'm A.Gure, local Oslo dev. Recently started building clean websites for small spots (no agency fees). Check 2 client sites: abdisalam.space`
    },
    custom: {
      cardTag: "CUSTOM CONCEPT",
      cardHeadline: `A clean mobile website custom-crafted for ${b}.`,
      cardDesc: `I recently started building clean websites for small spots in Oslo. Tailored specifically for ${b} with fair rates and zero agency markup.`,
      emailSubject: `Custom website idea for ${b}`,
      emailBody: `Hey ${b} team,

I'm A.Gure, an independent junior dev in Oslo. I make clean mobile sites for small businesses without the 40,000+ kr agency markup.

You can check out 2 client sites I'm currently working on at abdisalam.space.

I'd love to make a quick demo website for ${b} to see if you like it. Let me know if you'd like to see a 15-second demo!

Best,
A.Gure
abdisalam.space`,
      igDmMsg: `Hey! I'm A.Gure, a local junior dev in Oslo. Started building clean sites for small businesses (no 40k agency fees). Check 2 client sites I'm working on at abdisalam.space. I can make a quick demo website for ${b} to see if you like it. Down to see a 15-sec preview? No pressure!`,
      whatsappMsg: `Hey! I'm A.Gure, a local junior dev in Oslo. I build clean sites for small businesses (no 40k agency fees). Check 2 client sites I'm working on at abdisalam.space. I can make a quick demo website for ${b} to see if you like it. Down to see a 15-sec preview? No pressure!`,
      smsMsg: `Hey ${b}! I'm A.Gure, local Oslo dev. Can build a quick demo site: abdisalam.space`
    }
  };

  const selected = presets[angle] || presets.pricing;
  return {
    ...selected,
    instagramHandle: slug ? `@${slug}` : ""
  };
}

export default function StudioPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Mobile View Switcher (Composer vs Card Preview)
  const [mobileView, setMobileView] = useState<MobileViewMode>("composer");

  // Initial default curation
  const initial = generateCuratedPitch("By Lieencie", "Makeup Artist", "pricing");

  // Profiler Inputs
  const [brandName, setBrandName] = useState<string>("By Lieencie");
  const [niche, setNiche] = useState<string>("Makeup Artist");
  const [angle, setAngle] = useState<AngleType>("pricing");
  const [extraNotes, setExtraNotes] = useState<string>("Takes bookings via DMs and email");

  // Visual Card Content
  const [cardHeadline, setCardHeadline] = useState<string>(initial.cardHeadline);
  const [cardDesc, setCardDesc] = useState<string>(initial.cardDesc);
  const [cardTag, setCardTag] = useState<string>(initial.cardTag);
  const [showCardEdit, setShowCardEdit] = useState<boolean>(false);

  // Active Delivery Channel
  const [channel, setChannel] = useState<DeliveryChannel>("instagram");

  // Channel Specific Fields
  const [instagramHandle, setInstagramHandle] = useState<string>(initial.instagramHandle);
  const [igDmMsg, setIgDmMsg] = useState<string>(initial.igDmMsg);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [whatsappMsg, setWhatsappMsg] = useState<string>(initial.whatsappMsg);
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>(initial.emailSubject);
  const [emailBody, setEmailBody] = useState<string>(initial.emailBody);
  const [smsMsg, setSmsMsg] = useState<string>(initial.smsMsg);

  // Status & Feedback
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [isSendingPreview, setIsSendingPreview] = useState<boolean>(false);
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
      const urlChannel = searchParams.get("channel");
      const savedPin = localStorage.getItem("ag_studio_auth");

      if (urlView === "card" || urlView === "composer") {
        setMobileView(urlView);
      }

      if (urlChannel && ["instagram", "whatsapp", "email", "sms"].includes(urlChannel)) {
        setChannel(urlChannel as DeliveryChannel);
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

  // Curate pitch when angle or niche is switched
  const handleSelectAngle = (newAngle: AngleType) => {
    setAngle(newAngle);
    const curated = generateCuratedPitch(brandName, niche, newAngle, extraNotes);
    setCardHeadline(curated.cardHeadline);
    setCardDesc(curated.cardDesc);
    setCardTag(curated.cardTag);
    setEmailSubject(curated.emailSubject);
    setEmailBody(curated.emailBody);
    setIgDmMsg(curated.igDmMsg);
    setWhatsappMsg(curated.whatsappMsg);
    setSmsMsg(curated.smsMsg);
  };

  const handleSelectNiche = (newNiche: string) => {
    setNiche(newNiche);
    const curated = generateCuratedPitch(brandName, newNiche, angle, extraNotes);
    setCardHeadline(curated.cardHeadline);
    setCardDesc(curated.cardDesc);
    setEmailBody(curated.emailBody);
    setIgDmMsg(curated.igDmMsg);
    setWhatsappMsg(curated.whatsappMsg);
  };

  // Generate / Curate Pitch Package (Instant 0ms synchronous + AI background refinement)
  const handleGeneratePitch = () => {
    setIsGenerating(true);

    // 1. Instant local curation right now (0 ms latency, 100% deterministic)
    const curated = generateCuratedPitch(brandName, niche, angle, extraNotes);
    setCardHeadline(curated.cardHeadline);
    setCardDesc(curated.cardDesc);
    setCardTag(curated.cardTag);
    setEmailSubject(curated.emailSubject);
    setEmailBody(curated.emailBody);
    setIgDmMsg(curated.igDmMsg);
    setWhatsappMsg(curated.whatsappMsg);
    setSmsMsg(curated.smsMsg);
    if (curated.instagramHandle) {
      setInstagramHandle(curated.instagramHandle);
    }
    showToast(`✓ Curated pitch package & card for ${brandName || "your business"}!`);

    // 2. Background check if Gemini AI can enrich further
    fetch("/api/generate-pitch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brandName,
        niche,
        angle,
        notes: extraNotes
      })
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.source === "gemini" && json.data) {
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
          showToast(`✦ Refined pitch with Gemini AI!`);
        }
      })
      .catch((err) => {
        console.warn("Background AI enrichment notice:", err);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  // Render High-DPI Canvas for Download and Email Attachment
  const renderCardCanvas = async (): Promise<HTMLCanvasElement | null> => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 960;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

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

      return canvas;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Download Card as PNG using HTML5 Canvas
  const handleDownloadCard = async () => {
    showToast("Generating high-DPI card image...");
    try {
      const canvas = await renderCardCanvas();
      if (!canvas) {
        showToast("Could not render card canvas.");
        return;
      }
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

  const handleSendTestPreview = async () => {
    setIsSendingPreview(true);
    try {
      let cardBase64: string | undefined = undefined;
      const canvas = await renderCardCanvas();
      if (canvas) {
        cardBase64 = canvas.toDataURL("image/png");
      }

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "niwache12@gmail.com",
          subject: emailSubject,
          htmlBody: emailBody,
          brandName,
          cardBase64,
          isPreview: true
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Preview sent to your Gmail (niwache12@gmail.com)! Check your inbox.");
      } else {
        showToast(`Preview error: ${data.error}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error sending preview";
      showToast(message);
    } finally {
      setIsSendingPreview(false);
    }
  };

  const handleSendEmail = async () => {
    if (!recipientEmail || !recipientEmail.includes("@")) {
      showToast("Please enter a valid recipient email.");
      return;
    }
    setIsSendingEmail(true);
    try {
      // Generate the custom visual card as Base64 to attach and embed in email
      let cardBase64: string | undefined = undefined;
      const canvas = await renderCardCanvas();
      if (canvas) {
        cardBase64 = canvas.toDataURL("image/png");
      }

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientEmail,
          subject: emailSubject,
          htmlBody: emailBody,
          brandName,
          cardBase64
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          `✓ Visual Email sent to ${recipientEmail}! (Copy sent to your Gmail)`
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
                  placeholder="e.g. By Lieencie"
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
                    onClick={() => handleSelectNiche(item.label)}
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
                    onClick={() => handleSelectAngle(item.key as AngleType)}
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

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span>🎴</span> <span>Portfolio Card PNG attached</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    Auto-BCC to Gmail
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleSendTestPreview}
                    disabled={isSendingPreview || isSendingEmail}
                    className="flex-1 bg-[#181820] hover:bg-[#22222c] active:scale-[0.98] border border-white/15 text-zinc-200 hover:text-white font-mono text-xs py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {isSendingPreview ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending Preview...
                      </>
                    ) : (
                      <>
                        <span>👁️</span> Send Preview to My Email
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={isSendingEmail || isSendingPreview}
                    className="flex-1 bg-white hover:bg-zinc-200 active:scale-[0.98] text-black font-semibold py-3 px-3 rounded-xl transition-all font-mono text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-lg"
                  >
                    {isSendingEmail ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        Sending Live...
                      </>
                    ) : (
                      <>
                        <span>🚀</span> Send Live to Business ↗
                      </>
                    )}
                  </button>
                </div>
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
