"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiArrowLeft,
  FiVideo,
  FiCheck,
  FiMinimize2,
  FiMaximize2,
} from "react-icons/fi";

interface PreviewShellProps {
  nicheTitle: string;
  nicheSubtitle: string;
  accentColor: string;
  children: React.ReactNode;
}

export default function PreviewShell({
  nicheTitle,
  nicheSubtitle,
  accentColor,
  children,
}: PreviewShellProps) {
  const pathname = usePathname();

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  // Keyboard shortcut: Esc or H to stop recording
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if ((e.key === "Escape" || e.key === "h" || e.key === "H") && isRecording) {
        stopScreenRecording();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRecording]);

  // In-Browser Screen Recorder
  const startScreenRecording = async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getDisplayMedia) {
      alert("In-browser screen recording is not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "browser",
          frameRate: { ideal: 60, max: 60 },
        },
        audio: false,
      });

      streamRef.current = stream;

      // 3-second countdown before recording starts
      setCountdown(3);
      let count = 3;
      const countInterval = setInterval(() => {
        count--;
        if (count > 0) {
          setCountdown(count);
        } else {
          clearInterval(countInterval);
          setCountdown(null);
          beginCapture(stream);
        }
      }, 1000);

      // Handle user clicking the browser's native "Stop Sharing" button
      const track = stream.getVideoTracks()[0];
      if (track) {
        track.onended = () => {
          stopScreenRecording();
        };
      }
    } catch (err) {
      console.warn("Screen recording cancelled or failed:", err);
      setCountdown(null);
    }
  };

  const beginCapture = (stream: MediaStream) => {
    chunksRef.current = [];
    let mimeType = "video/webm;codecs=vp9";
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
        ? "video/webm;codecs=vp8"
        : MediaRecorder.isTypeSupported("video/webm")
        ? "video/webm"
        : "video/mp4";
    }

    try {
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const safeName = nicheTitle.toLowerCase().replace(/[^a-z0-9]/g, "-") || "walkthrough";
        const filename = `${safeName}-walkthrough.webm`;

        // Auto download file
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 1200);

        setToastMessage(`Lagret ${filename}`);
        setTimeout(() => setToastMessage(null), 4000);

        setIsRecording(false);
        setRecordingSeconds(0);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      };

      recorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Failed to start MediaRecorder", err);
      setIsRecording(false);
    }
  };

  const stopScreenRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    } else {
      setIsRecording(false);
      setRecordingSeconds(0);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }
  };

  const navItems = [
    { label: "Studio Nails", path: "/preview/nails", icon: "💅" },
    { label: "Luffy Cakes", path: "/preview/cakes", icon: "🍰" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Countdown Overlay before recording starts */}
      {countdown !== null && (
        <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm text-white pointer-events-none transition-all">
          <div className="font-mono text-8xl font-bold tracking-tighter animate-pulse mb-3">
            {countdown}
          </div>
          <div className="font-mono text-xs tracking-widest uppercase text-neutral-300">
            Gjør klar til opptak...
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100001] flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 text-white border border-neutral-700 shadow-2xl font-mono text-xs animate-in fade-in slide-in-from-top-2">
          <FiCheck className="text-emerald-400" size={14} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 
        FLOATING RECORD & NAV CONTROLS
        Only renders when NEXT_PUBLIC_DEMO=1 — never ships to production without it.
        COMPLETELY DISAPPEARS when recording or in countdown so the video is 100% clean!
      */}
      {process.env.NEXT_PUBLIC_DEMO === "1" && !isRecording && countdown === null && (
        <aside
          aria-label="Demo Floating Controls"
          className="fixed bottom-4 right-4 z-[9999] transition-all"
        >
          {minimized ? (
            /* Minimized circular button */
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-950/90 text-white border border-neutral-800 shadow-2xl backdrop-blur-md">
              <button
                type="button"
                onClick={startScreenRecording}
                className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-md group"
                title="Start skjermopptak"
              >
                <span className="w-3 h-3 rounded-full bg-white group-hover:scale-110 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => setMinimized(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Vis meny"
              >
                <FiMaximize2 size={13} />
              </button>
            </div>
          ) : (
            /* Sleek floating capsule */
            <div className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full bg-neutral-950/92 text-white border border-neutral-800 shadow-2xl backdrop-blur-md font-mono text-xs">
              {/* Back to Vault */}
              <Link
                href="/library"
                className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors pr-1.5 border-r border-neutral-800"
                title="Tilbake til UI Vault"
              >
                <FiArrowLeft size={11} />
                <span>Vault</span>
              </Link>

              {/* Showcase switcher */}
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`px-2 py-1 rounded-full text-[11px] transition-all flex items-center gap-1 ${
                        isActive
                          ? "bg-neutral-800 text-white font-bold"
                          : "text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Record Button (Disappears when clicked) */}
              <button
                type="button"
                onClick={startScreenRecording}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-medium transition-all text-[11px] shadow-sm cursor-pointer ml-1"
                title="Ta opp video (forsvinner under opptak)"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>Record</span>
              </button>

              {/* Minimize pill */}
              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                title="Minimer kontrollpanel"
              >
                <FiMinimize2 size={12} />
              </button>
            </div>
          )}
        </aside>
      )}

      {/* Main Page Content - Clean & Butter-Smooth */}
      <main className="w-full">{children}</main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}
