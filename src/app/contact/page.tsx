"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiArrowLeft, FiSend, FiCopy, FiCheck, FiMail, FiPaperclip } from "react-icons/fi";

const projectTypes = [
  "Single-Page Portfolio",
  "Brand Flagship",
  "Custom Web App",
  "Website Redesign",
  "General Inquiry",
];

export default function ContactPage() {
  const [senderEmail, setSenderEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [selectedType, setSelectedType] = useState("Brand Flagship");
  const [subject, setSubject] = useState("Project Inquiry");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recipientEmail = "niwache12@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("https://formspree.io/f/xvgzbbqa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          projectType: selectedType,
          subject: subject,
          message: message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setSenderName("");
        setSenderEmail("");
        setMessage("");
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }
    } catch (err: any) {
      setErrorMessage(
        "Could not send automatically. Please copy the email or use your email client below."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openMailClientFallback = () => {
    const formattedBody = `From: ${senderName || "Visitor"} (${senderEmail || "No email"})\nProject Type: ${selectedType}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject + " [" + selectedType + "]"
    )}&body=${encodeURIComponent(formattedBody)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground bento-grid-bg">
      <Header />

      <div className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-colors"
          >
            <FiArrowLeft />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Page Headline */}
        <div className="mb-10 space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight uppercase">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-muted font-body leading-relaxed max-w-xl">
            Have a project in mind or just want to chat? Drop a message below and I&apos;ll get back to you.
          </p>
        </div>

        {/* Editorial Direct Inquiry Canvas */}
        <div className="rounded-2xl bg-card border border-card-border shadow-2xl overflow-hidden">
          {/* Clean Header Bar */}
          <div className="px-5 py-3.5 bg-background/80 border-b border-card-border/70 flex items-center justify-between gap-4 text-xs font-mono text-muted">
            <span>Send a Message</span>
            <span>Direct Inbox</span>
          </div>

          {/* Form Content or Success View */}
          {isSuccess ? (
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                <FiCheck />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-bold font-heading uppercase text-foreground">
                  Message Sent!
                </h3>
                <p className="text-sm text-muted font-body leading-relaxed">
                  Thanks for reaching out. Your message has been sent directly to{" "}
                  <span className="text-foreground font-mono">{recipientEmail}</span>. I&apos;ll get back to you soon.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-card border border-card-border hover:border-foreground text-xs font-mono text-foreground transition-all"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="divide-y divide-card-border">
              {/* Error Banner if any */}
              {errorMessage && (
                <div className="px-5 py-3 bg-red-500/10 border-b border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-red-400">
                  <span>{errorMessage}</span>
                  <button
                    type="button"
                    onClick={openMailClientFallback}
                    className="underline hover:text-red-300 text-left font-bold"
                  >
                    Open in Mail Client ↗
                  </button>
                </div>
              )}

              {/* TO Field */}
              <div className="px-5 py-3.5 flex items-center gap-4 text-xs font-mono">
                <span className="text-muted w-14 flex-shrink-0">To:</span>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-card-border text-foreground font-medium">
                  <FiMail size={12} className="text-muted" />
                  <span>A.Gure</span>
                  <span className="text-muted text-[11px]">&lt;{recipientEmail}&gt;</span>
                </div>
              </div>

              {/* FROM Field */}
              <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-mono">
                <span className="text-muted w-14 flex-shrink-0">From:</span>
                <div className="flex-1 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Your Name / Company"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-background/50 border border-card-border text-xs text-foreground placeholder:text-muted/60 focus:outline-none focus:border-foreground flex-1"
                    required
                  />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-background/50 border border-card-border text-xs text-foreground placeholder:text-muted/60 focus:outline-none focus:border-foreground flex-1"
                    required
                  />
                </div>
              </div>

              {/* PROJECT TYPE Field */}
              <div className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 text-xs font-mono">
                <span className="text-muted w-14 flex-shrink-0 pt-1.5">Type:</span>
                <div className="flex-1 flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                        selectedType === type
                          ? "bg-foreground text-background font-bold shadow-sm"
                          : "bg-background/60 border border-card-border text-muted hover:text-foreground"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUBJECT Field */}
              <div className="px-5 py-3.5 flex items-center gap-4 text-xs font-mono">
                <span className="text-muted w-14 flex-shrink-0">Subject:</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What are we building?"
                  className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted/60 focus:outline-none"
                />
              </div>

              {/* MESSAGE Canvas */}
              <div className="px-5 py-4">
                <textarea
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi A.Gure,

I'm looking to build/redesign a website. Here are a few details about what I have in mind..."
                  className="w-full bg-transparent text-sm text-foreground font-body placeholder:text-muted/50 focus:outline-none resize-none leading-relaxed"
                  required
                />
              </div>

              {/* Footer Action Bar */}
              <div className="px-5 py-4 bg-background/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-xs font-mono font-bold tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-md disabled:opacity-50"
                  >
                    <FiSend size={13} />
                    <span>{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-card border border-card-border text-foreground text-xs font-mono tracking-wider hover:border-foreground transition-all active:scale-95"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="text-emerald-400" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <FiCopy />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] font-mono text-muted">
                  Direct inbox • Response within 24h
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
