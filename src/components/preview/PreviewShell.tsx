"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiArrowLeft,
  FiCamera,
  FiVideo,
  FiSquare,
  FiEyeOff,
  FiEye,
  FiChevronDown,
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

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export default function PreviewShell({
  nicheTitle,
  nicheSubtitle,
  accentColor,
  children,
}: PreviewShellProps) {
  const pathname = usePathname();
  const [cleanMode, setCleanMode] = useState(false);
  const [ripples, setRipples] = useState<TouchRipple[]>([]);

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [hudMinimized, setHudMinimized] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Keyboard shortcut 'h' to toggle clean recording mode, 'Esc' to stop recording
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "h" || e.key === "H") {
        if (isRecording) {
          stopScreenRecording();
        } else {
          setCleanMode((prev) => !prev);
        }
      } else if (e.key === "Escape" && isRecording) {
        stopScreenRecording();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRecording]);

  // Visual touch feedback on every manual click/touch
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Avoid triggering ripple on recording HUD buttons
    if ((e.target as HTMLElement)?.closest(".recording-hud, .demo-nav-bar")) {
      return;
    }

    const newRipple: TouchRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setRipples((prev) => [...prev.slice(-4), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 550);
  }, []);

  // In-Browser Screen Recorder
  const startScreenRecording = async () => {
    setShowMenu(false);
    if (typeof window === "undefined" || !navigator.mediaDevices?.getDisplayMedia) {
      alert(
        "In-browser screen recording is not supported in this browser. Switching to clean mode so you can record with your screen recording tool."
      );
      setCleanMode(true);
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

      // Automatically hide the top black nav bar
      setCleanMode(true);

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

      // Handle user clicking the browser's native "Stop Sharing" bar
      const track = stream.getVideoTracks()[0];
      if (track) {
        track.onended = () => {
          stopScreenRecording();
        };
      }
    } catch (err) {
      console.warn("Screen recording cancelled or failed:", err);
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
        const filename = `${safeName}-manual-walkthrough.webm`;

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

        setToastMessage(`Downloaded ${filename}`);
        setTimeout(() => setToastMessage(null), 4500);

        // Reset state
        setIsRecording(false);
        setRecordingSeconds(0);
        setCleanMode(false);
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
      setCleanMode(false);
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
      setCleanMode(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }
  };

  const navItems = [
    { label: "Studio Nails", path: "/preview/nails", icon: "💅" },
    { label: "Maison Choux Cakes", path: "/preview/cakes", icon: "🍰" },
  ];

  return (
    <div
      onPointerDown={handlePointerDown}
      className="relative min-h-screen transition-colors duration-300 selection:bg-neutral-800 selection:text-white"
    >
      {/* Touch Ripple Visual FX on manual tap/click */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none animate-touch-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Countdown Overlay before recording starts */}
      {countdown !== null && (
        <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white pointer-events-none transition-all">
          <div className="font-mono text-7xl font-bold tracking-tighter animate-pulse mb-3">
            {countdown}
          </div>
          <div className="font-mono text-sm tracking-widest uppercase text-neutral-300">
            Get ready to scroll...
          </div>
        </div>
      )}

      {/* Active Recording HUD (Discreet, draggable / minimizable) */}
      {isRecording && (
        <aside
          aria-label="Active Recording Status"
          className="recording-hud fixed bottom-4 right-4 z-[99998] transition-all"
        >
          {hudMinimized ? (
            <button
              type="button"
              onClick={() => setHudMinimized(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-900/90 text-white border border-neutral-700 shadow-xl backdrop-blur-md hover:bg-black transition-all cursor-pointer"
              title="Expand recording controls"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono text-xs font-semibold">{formatTime(recordingSeconds)}</span>
              <FiMaximize2 size={12} className="text-neutral-400" />
            </button>
          ) : (
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-neutral-950/95 text-white border border-red-500/40 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 pr-2 border-r border-neutral-800">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="font-mono text-xs font-bold tracking-wider text-red-400">REC</span>
                <span className="font-mono text-xs text-neutral-200">
                  {formatTime(recordingSeconds)}
                </span>
              </div>

              <button
                type="button"
                onClick={stopScreenRecording}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-medium transition-all shadow-sm cursor-pointer"
                title="Stop recording and download .webm video (or press Esc / H)"
              >
                <FiSquare size={11} className="fill-current" />
                <span>Stop &amp; Save</span>
              </button>

              <button
                type="button"
                onClick={() => setHudMinimized(true)}
                className="p-1 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Minimize HUD so it won't block view"
              >
                <FiMinimize2 size={13} />
              </button>
            </div>
          )}
        </aside>
      )}

      {/* Floating Restore Button when cleanMode is active (and not currently in-browser recording) */}
      {cleanMode && !isRecording && (
        <button
          type="button"
          onClick={() => setCleanMode(false)}
          className="fixed top-3 right-3 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-black text-white border border-neutral-700 shadow-lg text-xs font-mono backdrop-blur transition-all opacity-40 hover:opacity-100 cursor-pointer"
          title="Restore top control header (or press 'H')"
        >
          <FiEye size={13} />
          <span>Show Nav</span>
          <span className="text-[10px] bg-neutral-800 px-1 rounded text-neutral-400">H</span>
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100001] flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 text-white border border-neutral-700 shadow-2xl font-mono text-xs">
          <FiCheck className="text-emerald-400" size={14} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Demo Control Header (The Black Nav) */}
      {!cleanMode && (
        <header className="demo-nav-bar sticky top-0 z-50 w-full bg-neutral-900/95 backdrop-blur-md text-white border-b border-neutral-800 px-3 sm:px-6 py-2.5 transition-all shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 text-xs font-mono">
            {/* Left: UI Vault Backlink & Label */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/library"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                title="Return to UI Component Library"
              >
                <FiArrowLeft size={12} />
                <span className="hidden sm:inline">UI Vault</span>
              </Link>

              <span className="text-neutral-500 hidden md:inline">|</span>

              <div className="hidden sm:block">
                <span className="text-white font-bold">{nicheTitle}</span>
                <span className="text-neutral-400 text-[10px] ml-2">({nicheSubtitle})</span>
              </div>
            </div>

            {/* Middle: 2 Showcases Switcher */}
            <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-white text-neutral-950 font-bold shadow-xs"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="hidden md:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right: Record Button & Mode Options */}
            <div className="relative flex items-center gap-1.5">
              {/* Primary Instant Record Button */}
              <button
                type="button"
                onClick={startScreenRecording}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-medium transition-all text-[11px] shadow-xs cursor-pointer group"
                title="Start manual recording: Hides nav bar, captures tab, and auto-downloads .webm when you finish"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>Record</span>
              </button>

              {/* Options dropdown button */}
              <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Recording options"
              >
                <FiChevronDown size={13} />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-neutral-950 border border-neutral-800 p-2 shadow-2xl z-50 flex flex-col gap-1 text-left">
                  <div className="px-2.5 py-1.5 text-[10px] uppercase font-bold text-neutral-400 border-b border-neutral-800">
                    Recording Mode
                  </div>

                  <button
                    type="button"
                    onClick={startScreenRecording}
                    className="w-full px-2.5 py-2 rounded-lg hover:bg-neutral-900 text-left transition-colors flex items-start gap-2.5 cursor-pointer group"
                  >
                    <span className="p-1 rounded bg-red-500/20 text-red-400 mt-0.5">
                      <FiVideo size={13} />
                    </span>
                    <div>
                      <div className="font-semibold text-white group-hover:text-red-300 transition-colors">
                        Record Tab (.webm)
                      </div>
                      <div className="text-[10px] text-neutral-400 leading-tight">
                        Hides nav, 3s countdown, records tab as you scroll, and auto-downloads.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      setCleanMode(true);
                    }}
                    className="w-full px-2.5 py-2 rounded-lg hover:bg-neutral-900 text-left transition-colors flex items-start gap-2.5 cursor-pointer group"
                  >
                    <span className="p-1 rounded bg-neutral-800 text-neutral-300 mt-0.5">
                      <FiCamera size={13} />
                    </span>
                    <div>
                      <div className="font-semibold text-white group-hover:text-neutral-200 transition-colors">
                        Hide Nav Only
                      </div>
                      <div className="text-[10px] text-neutral-400 leading-tight">
                        Hides black nav so you can use OBS, Windows Snipping Tool, or Loom. (Press &apos;H&apos; to restore)
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Main Page Content */}
      <main className="w-full">{children}</main>

      {/* Embedded CSS for smooth touch ripple FX */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes touchRippleAnim {
          0% {
            width: 14px;
            height: 14px;
            background: rgba(255, 255, 255, 0.75);
            border: 2px solid ${accentColor};
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 0.95;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.35);
            opacity: 0.75;
          }
          100% {
            width: 44px;
            height: 44px;
            border: 1.5px solid ${accentColor};
            transform: translate(-50%, -50%) scale(1.75);
            opacity: 0;
          }
        }

        .animate-touch-ripple {
          animation: touchRippleAnim 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
