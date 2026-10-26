"use client";

// Skiper26 theme transition controller (credit: Gurvinder Singh @gxuri, skiper-ui.com/docs/components/skiper26).
// Cycles strictly in order: circle -> rectangle -> polygon -> circle...
//
// Why mobile / Samsung Internet / LinkedIn in-app browsers use DOM-Clone Clip-Path Reveal:
// Chromium's View Transitions Level 1 anchors `::view-transition` to the Snapshot Containing Block (SCB),
// which includes retractable browser toolbars (`100lvh`). On Samsung Internet 30 (top URL bar + bottom
// toolbar) and LinkedIn's Android Custom Tab / WebView, the SCB origin is offset from the visual viewport
// by the top toolbar height (~56px), making `document.startViewTransition` jump the entire page up for
// the duration of the animation and snap back down at the end.
// By rendering the incoming theme inside a `position: fixed; inset: 0` viewport-locked DOM clone animated
// via Web Animations API `clip-path`, the reveal stays 100% in layout-viewport coordinates and cannot jump
// by even 1px on any mobile or in-app browser.

export type TransitionVariant = "circle" | "rectangle" | "polygon";

export interface ThemeTransitionOptions {
  /** Button or element that triggered the switch; used as the circle origin. */
  trigger?: HTMLElement | null;
  /** Skip the visual reveal if the user is actively scrolling (for automatic timers). */
  skipWhenScrolling?: boolean;
  /** Incoming background color fallback. */
  nextBg?: string;
}

const SEQUENCE: readonly TransitionVariant[] = ["circle", "rectangle", "polygon"];
const SEQUENCE_STORAGE_KEY = "ag_theme_transition_step";
const SCROLL_QUIET_MS = 180;
const DURATION_MS = 700;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const STYLE_ID = "ag-theme-vt-styles";

const THEME_VARS = [
  "--bg",
  "--fg",
  "--card-bg",
  "--card-border",
  "--muted",
  "--accent",
  "--accent-fg",
  "--bg-canvas",
  "--bg-secondary",
  "--text-ink",
  "--text-muted",
  "--border-line",
] as const;

const THEME_CLASSES = ["theme-paper", "theme-obsidian", "theme-chrome"] as const;

let stepCounter = -1;
let scrollListenerAttached = false;
let lastScrollAt = 0;
let activeCleanup: (() => void) | null = null;

function ensureScrollTracker(): void {
  if (scrollListenerAttached || typeof window === "undefined") return;
  scrollListenerAttached = true;
  const mark = () => {
    lastScrollAt = performance.now();
  };
  window.addEventListener("scroll", mark, { passive: true });
  window.addEventListener("touchmove", mark, { passive: true });
}

function isUserScrolling(): boolean {
  if (typeof window === "undefined") return false;
  return performance.now() - lastScrollAt < SCROLL_QUIET_MS;
}

function nextVariant(): TransitionVariant {
  if (stepCounter < 0 && typeof window !== "undefined") {
    const saved = Number.parseInt(
      window.localStorage.getItem(SEQUENCE_STORAGE_KEY) ?? "0",
      10
    );
    stepCounter = Number.isFinite(saved) && saved >= 0 ? saved : 0;
  }
  const index = stepCounter % SEQUENCE.length;
  const variant = SEQUENCE[index] ?? "circle";
  stepCounter = (index + 1) % SEQUENCE.length;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(SEQUENCE_STORAGE_KEY, String(stepCounter));
    } catch {
      // Ignore storage quota errors in private browsing / WebViews.
    }
  }
  return variant;
}

function getOrigin(trigger?: HTMLElement | null): { x: number; y: number } {
  if (typeof window === "undefined") return { x: 50, y: 0 };
  if (trigger) {
    const rect = trigger.getBoundingClientRect();
    if (rect.width > 0 || rect.height > 0) {
      const x = Math.round(((rect.left + rect.width / 2) / window.innerWidth) * 100);
      const y = Math.round(((rect.top + rect.height / 2) / window.innerHeight) * 100);
      return {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      };
    }
  }
  return { x: 92, y: 4 };
}

function getKeyframes(
  variant: TransitionVariant,
  originX: number,
  originY: number,
  vw: number,
  vh: number
): Keyframe[] {
  if (variant === "circle") {
    const px = (originX / 100) * vw;
    const py = (originY / 100) * vh;
    const maxDx = Math.max(px, vw - px);
    const maxDy = Math.max(py, vh - py);
    const radius = Math.ceil(Math.hypot(maxDx, maxDy) * 1.05);
    return [
      { clipPath: `circle(0px at ${originX}% ${originY}%)` },
      { clipPath: `circle(${radius}px at ${originX}% ${originY}%)` },
    ];
  }
  if (variant === "rectangle") {
    return [
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    ];
  }
  return [
    { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" },
    { clipPath: "polygon(0% 0%, 220% 0%, 100% 100%, 0% 220%)" },
  ];
}

function shouldUseDomClone(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return true;
  }
  const ua = navigator.userAgent || "";
  if (
    /SamsungBrowser|LinkedInApp|FBAN|FBAV|Instagram|; wv\)|Android|iPhone|iPad|iPod|Mobile/i.test(
      ua
    )
  ) {
    return true;
  }
  if (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return true;
  }
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => unknown;
  };
  return typeof doc.startViewTransition !== "function";
}

interface ThemeSnapshot {
  classes: string[];
  vars: Record<string, string>;
}

function readThemeSnapshot(root: HTMLElement): ThemeSnapshot {
  const classes = THEME_CLASSES.filter((cls) => root.classList.contains(cls));
  const vars: Record<string, string> = {};
  for (const prop of THEME_VARS) {
    vars[prop] = root.style.getPropertyValue(prop);
  }
  return { classes, vars };
}

function applyThemeSnapshot(target: HTMLElement, snap: ThemeSnapshot): void {
  for (const cls of THEME_CLASSES) {
    target.classList.remove(cls);
  }
  for (const cls of snap.classes) {
    target.classList.add(cls);
  }
  for (const prop of THEME_VARS) {
    const val = snap.vars[prop];
    if (val) {
      target.style.setProperty(prop, val);
    } else {
      target.style.removeProperty(prop);
    }
  }
}

/**
 * Viewport-locked DOM Clone Clip-Path Reveal.
 * Zero View-Transition SCB involvement -> mathematically impossible to jump on Samsung Internet or LinkedIn.
 */
function runDomCloneTransition(
  apply: () => void,
  variant: TransitionVariant,
  originX: number,
  originY: number
): void {
  const root = document.documentElement;
  const body = document.body;
  if (!root || !body) {
    apply();
    return;
  }

  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }

  const vw = root.clientWidth || window.innerWidth;
  const vh = window.innerHeight;
  const startScrollY = window.scrollY;

  // 1. Measure live viewport rects for fixed/sticky elements and inner scroll offsets before cloning.
  const livePinned = Array.from(
    body.querySelectorAll<HTMLElement>(".fixed, .sticky")
  );
  const pinnedRects = livePinned.map((el) => el.getBoundingClientRect());

  const liveScrollers = Array.from(
    body.querySelectorAll<HTMLElement>("*")
  ).filter((el) => el.scrollTop > 0);
  const scrollerOffsets = new Map<number, number>();
  const allLiveNodes = Array.from(body.querySelectorAll<HTMLElement>("*"));
  for (const scroller of liveScrollers) {
    const idx = allLiveNodes.indexOf(scroller);
    if (idx >= 0) scrollerOffsets.set(idx, scroller.scrollTop);
  }

  // 2. Clone live body before mutating theme state.
  const bodyClone = body.cloneNode(true) as HTMLElement;

  // 3. Run `apply()` ONCE synchronously to capture the new theme variables, then restore old vars on root
  // while the clip-path overlay animates over the old root.
  const prevSnap = readThemeSnapshot(root);
  root.classList.add("theme-vt");
  apply();
  const nextSnap = readThemeSnapshot(root);
  applyThemeSnapshot(root, prevSnap);

  // 4. Prepare overlay container locked to the visual layout viewport (0, 0, 100vw, 100dvh).
  const overlay = document.createElement("div");
  overlay.setAttribute("data-theme-clone-overlay", variant);
  overlay.setAttribute("aria-hidden", "true");
  overlay.className = root.className;
  applyThemeSnapshot(overlay, nextSnap);

  const nextBg = nextSnap.vars["--bg"] || "var(--bg)";
  const nextFg = nextSnap.vars["--fg"] || "var(--fg)";

  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100dvh";
  overlay.style.zIndex = "2147483000";
  overlay.style.pointerEvents = "none";
  overlay.style.overflow = "hidden";
  overlay.style.backgroundColor = nextBg;
  overlay.style.color = nextFg;
  overlay.style.transform = "translateZ(0)";
  overlay.style.willChange = "clip-path";

  // Position cloned body at -scrollY so normal document flow aligns 1:1 with the live viewport.
  bodyClone.style.position = "absolute";
  bodyClone.style.top = `${-startScrollY}px`;
  bodyClone.style.left = "0";
  bodyClone.style.width = `${vw}px`;
  bodyClone.style.margin = "0";
  bodyClone.style.backgroundColor = nextBg;
  bodyClone.style.color = nextFg;

  // Strip duplicate IDs inside the temporary clone.
  const allCloneNodes = Array.from(bodyClone.querySelectorAll<HTMLElement>("*"));
  for (const node of allCloneNodes) {
    if (node.id) node.removeAttribute("id");
  }

  // Pin fixed & sticky elements inside the clone to their exact viewport coordinates.
  const clonePinned = Array.from(
    bodyClone.querySelectorAll<HTMLElement>(".fixed, .sticky")
  );
  for (let i = 0; i < clonePinned.length; i += 1) {
    const el = clonePinned[i];
    const rect = pinnedRects[i];
    if (!el || !rect) continue;
    el.style.position = "fixed";
    el.style.top = `${rect.top}px`;
    el.style.left = `${rect.left}px`;
    el.style.width = `${rect.width}px`;
    el.style.height = `${rect.height}px`;
    el.style.bottom = "auto";
    el.style.right = "auto";
    el.style.margin = "0";
  }

  // Copy current video frame onto a canvas replacement so cloned <video> never flashes black or reloads.
  const liveVideos = Array.from(body.querySelectorAll<HTMLVideoElement>("video"));
  const cloneVideos = Array.from(
    bodyClone.querySelectorAll<HTMLVideoElement>("video")
  );
  for (let i = 0; i < cloneVideos.length; i += 1) {
    const lv = liveVideos[i];
    const cv = cloneVideos[i];
    if (!lv || !cv) continue;
    try {
      cv.pause();
      cv.removeAttribute("autoplay");
      const rect = lv.getBoundingClientRect();
      const canvas = document.createElement("canvas");
      canvas.className = cv.className;
      canvas.width = lv.videoWidth || Math.max(1, Math.round(rect.width));
      canvas.height = lv.videoHeight || Math.max(1, Math.round(rect.height));
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(lv, 0, 0, canvas.width, canvas.height);
        cv.replaceWith(canvas);
      }
    } catch {
      // Cross-origin or unready video fallback: hide cloned video so live video underneath shows through.
      cv.style.opacity = "0";
    }
  }

  overlay.appendChild(bodyClone);
  root.appendChild(overlay);

  // Restore inner scroll positions (e.g. AutoScrollFrame previews) after insertion.
  for (const [idx, scrollTop] of scrollerOffsets.entries()) {
    const cloneScroller = allCloneNodes[idx];
    if (cloneScroller) {
      cloneScroller.scrollTop = scrollTop;
    }
  }

  // Keep normal flow aligned if momentum scrolling continues during the 700ms reveal.
  const onScrollSync = () => {
    bodyClone.style.top = `${-window.scrollY}px`;
  };
  window.addEventListener("scroll", onScrollSync, { passive: true });

  const keyframes = getKeyframes(variant, originX, originY, vw, vh);
  let finished = false;

  const anim = overlay.animate(keyframes, {
    duration: DURATION_MS,
    easing: EASING,
    fill: "forwards",
  });

  const cleanup = () => {
    if (finished) return;
    finished = true;
    activeCleanup = null;
    window.removeEventListener("scroll", onScrollSync);
    applyThemeSnapshot(root, nextSnap);
    try {
      anim.cancel();
    } catch {
      // Ignore cancel errors.
    }
    overlay.remove();
    requestAnimationFrame(() => {
      root.classList.remove("theme-vt");
    });
  };

  activeCleanup = cleanup;
  anim.finished.then(cleanup).catch(cleanup);
}

/**
 * Desktop View Transition path (used only on fine-pointer desktop browsers where SCB === viewport).
 */
function runDesktopViewTransition(
  apply: () => void,
  variant: TransitionVariant,
  originX: number,
  originY: number
): void {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };
  const root = document.documentElement;
  if (typeof doc.startViewTransition !== "function") {
    runDomCloneTransition(apply, variant, originX, originY);
    return;
  }

  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }

  const vw = root.clientWidth || window.innerWidth;
  const vh = window.innerHeight;
  const frames = getKeyframes(variant, originX, originY, vw, vh);
  const fromClip = String(frames[0]?.clipPath ?? "circle(0px at 50% 50%)");
  const toClip = String(frames[1]?.clipPath ?? "circle(150% at 50% 50%)");

  styleEl.textContent = `
    ::view-transition-group(root) {
      animation-duration: ${DURATION_MS}ms;
      animation-timing-function: ${EASING};
    }
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
    ::view-transition-old(root) {
      z-index: 1;
    }
    ::view-transition-new(root) {
      z-index: 2;
      animation: ag-vt-reveal ${DURATION_MS}ms ${EASING} both;
    }
    @keyframes ag-vt-reveal {
      from { clip-path: ${fromClip}; }
      to { clip-path: ${toClip}; }
    }
  `;

  root.classList.add("theme-vt");
  try {
    const vt = doc.startViewTransition(() => {
      apply();
    });
    vt.finished
      .catch(() => {})
      .finally(() => {
        root.classList.remove("theme-vt");
      });
  } catch {
    root.classList.remove("theme-vt");
    apply();
  }
}

export function runThemeTransition(
  apply: () => void,
  options?: ThemeTransitionOptions
): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    apply();
    return;
  }

  ensureScrollTracker();

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    apply();
    return;
  }

  if (options?.skipWhenScrolling && isUserScrolling()) {
    apply();
    return;
  }

  const variant = nextVariant();
  const { x, y } = getOrigin(options?.trigger);

  if (shouldUseDomClone()) {
    runDomCloneTransition(apply, variant, x, y);
  } else {
    runDesktopViewTransition(apply, variant, x, y);
  }
}
