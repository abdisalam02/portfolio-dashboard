"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiLock, FiArrowLeft, FiUnlock } from "react-icons/fi";

interface StudioPinGateProps {
  title?: string;
  children: React.ReactNode;
}

export default function StudioPinGate({
  title = "Internal Studio Tool",
  children,
}: StudioPinGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const unlocked = sessionStorage.getItem("ag_studio_unlocked") === "1" ||
        localStorage.getItem("ag_studio_unlocked") === "1";
      if (unlocked) {
        setIsUnlocked(true);
      }
    } catch {
      // Ignore storage errors
    }
    setIsChecking(false);
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("ag_studio_unlocked", "1");
        localStorage.setItem("ag_studio_unlocked", "1");
        setIsUnlocked(true);
      } else {
        setError(data.error || "Incorrect Studio PIN.");
      }
    } catch {
      setError("Could not verify PIN. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem("ag_studio_unlocked");
      localStorage.removeItem("ag_studio_unlocked");
      localStorage.removeItem("ag_studio_auth");
    } catch {
      // Ignore storage errors
    }
    setIsUnlocked(false);
    setPin("");
  };

  if (isChecking) {
    return <div className="min-h-dvh bg-background" />;
  }

  if (!isUnlocked) {
    return (
      <main className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-xl bg-card border border-card-border p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent font-bold">
              <FiLock size={13} />
              <span>PRIVATE ARCHIVE</span>
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-foreground transition-colors"
            >
              <FiArrowLeft size={12} />
              <span>Home</span>
            </Link>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-black font-heading tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-xs text-muted font-body leading-relaxed">
              This internal workspace is locked on the public site. Enter your Studio PIN to continue.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter Studio PIN"
                className="w-full px-4 py-3 rounded-lg bg-background border border-card-border text-sm font-mono text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent"
                autoFocus
                required
              />
              {error && (
                <p className="text-xs font-mono text-red-400 mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-accent text-accent-fg text-xs font-mono font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <FiUnlock size={13} />
              <span>{submitting ? "VERIFYING..." : "UNLOCK WORKSPACE"}</span>
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleLock}
        className="fixed bottom-4 left-4 z-50 px-2.5 py-1 rounded-md bg-card/90 border border-card-border text-[10px] font-mono text-muted hover:text-foreground hover:border-accent transition-colors flex items-center gap-1.5"
        title="Lock internal workspace"
      >
        <FiLock size={10} className="text-accent" />
        <span>LOCK</span>
      </button>
      {children}
    </div>
  );
}
