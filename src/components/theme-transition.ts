"use client";

// Skiper26 theme transition controller (credit: Gurvinder Singh @gxuri, skiper-ui.com/docs/components/skiper26).
// Cycles strictly in order: circle -> rectangle -> polygon -> circle...
//
// Why mobile / Samsung Internet / LinkedIn in-app browsers use DOM-Clone Clip-Path Reveal:
// 1. Chromium's `document.startViewTransition` anchors `::view-transition` to the Snapshot Containing Block
//    (SCB, 100lvh). On Samsung Internet 30 (top URL bar + bottom toolbar) and LinkedIn's in-app browser,
//    the SCB origin sits ~56px above the visual viewport, making `startViewTransition` jump the entire page
//    up by ~56px for 700ms and snap back down at the end.
// 2. Our DOM-Clone Clip-Path Reveal renders the incoming theme inside a `position: fixed` overlay in live
//    DOM coordinates and aligns `bodyClone` using measured `body.getBoundingClientRect() - overlay.getBoundingClientRect()`
//    deltas on every animation frame:
//    - `.sticky` elements (like Fancy `StackingCards` on `/work`) remain in normal document flow with
//      `position: relative` so their container height never collapses.
//    - `AutoScrollFrame` recordings and `<video>` reels are synced on every `requestAnimationFrame` tick
//      throughout the 700ms reveal so they never freeze or snap at the end.

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

function getOriginPx(trigger?: HTMLElement | null): { x: number; y: number } {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  const vw = window.innerWidth || 1;
  const vh = window.innerHeight || 1;
  if (trigger) {
    const rect = trigger.getBoundingClientRect();
    if (rect.width > 0 || rect.height > 0) {
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
  }
  return { x: vw * 0.92, y: vh * 0.04 };
}

function getKeyframesPx(
  variant: TransitionVariant,
  originX: number,
  originY: number,
  width: number,
  height: number
): Keyframe[] {
  if (variant === "circle") {
    const maxDx = Math.max(originX, width - originX);
    const maxDy = Math.max(originY, height - originY);
    const radius = Math.ceil(Math.hypot(maxDx, maxDy) * 1.08);
    const cx = Math.round(originX);
    const cy = Math.round(originY);
    return [
      { clipPath: `circle(0px at ${cx}px ${cy}px)`, filter: "blur(8px)" },
      { filter: "blur(4px)", offset: 0.5 },
      { clipPath: `circle(${radius}px at ${cx}px ${cy}px)`, filter: "blur(0px)" },
    ];
  }
  if (variant === "rectangle") {
    return [
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", filter: "blur(8px)" },
      { filter: "blur(4px)", offset: 0.5 },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", filter: "blur(0px)" },
    ];
  }
  return [
    { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)", filter: "blur(8px)" },
    { filter: "blur(4px)", offset: 0.5 },
    { clipPath: "polygon(0% 0%, 220% 0%, 100% 100%, 0% 220%)", filter: "blur(0px)" },
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
 * - Uses measured `getBoundingClientRect()` deltas between the live DOM and the overlay so
 *   Samsung Internet / LinkedIn toolbar offsets can never shift the page.
 * - Keeps `.sticky` elements (such as `/work` StackingCards) in normal flow (`position: relative`)
 *   so their container height never collapses.
 * - Syncs `AutoScrollFrame` scrollTop and `<video>` frames at 60fps via `requestAnimationFrame`
 *   so recordings never freeze or snap during the 700ms reveal.
 */
function runDomCloneTransition(
  apply: () => void,
  variant: TransitionVariant,
  viewportOriginX: number,
  viewportOriginY: number
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

  // 1. Measure live `.fixed` elements (already out of normal flow) and `.sticky` elements (in normal flow).
  const liveFixed = Array.from(body.querySelectorAll<HTMLElement>(".fixed"));
  const fixedRects = liveFixed.map((el) => el.getBoundingClientRect());

  const liveSticky = Array.from(body.querySelectorAll<HTMLElement>(".sticky"));
  const stickyRects = liveSticky.map((el) => el.getBoundingClientRect());

  // Track all scrollable containers (including AutoScrollFrame preview containers) by node index.
  const allLiveNodes = Array.from(body.querySelectorAll<HTMLElement>("*"));
  const scrollerIndices: number[] = [];
  for (let i = 0; i < allLiveNodes.length; i += 1) {
    const node = allLiveNodes[i];
    if (node && (node.scrollTop > 0 || node.scrollHeight > node.clientHeight + 2)) {
      scrollerIndices.push(i);
    }
  }

  // 2. Clone live body before mutating theme state.
  const bodyClone = body.cloneNode(true) as HTMLElement;

  // Sync form control values (<input>, <textarea>) so `/contact` inputs never appear blank or shift.
  const liveInputs = Array.from(
    body.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
  );
  const cloneInputs = Array.from(
    bodyClone.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
  );
  for (let i = 0; i < cloneInputs.length; i += 1) {
    const li = liveInputs[i];
    const ci = cloneInputs[i];
    if (li && ci) {
      ci.value = li.value;
    }
  }

  // 3. Run `apply()` ONCE synchronously to capture the new theme variables, then restore old vars on root
  // while the clip-path overlay animates over the old root.
  const prevSnap = readThemeSnapshot(root);
  root.classList.add("theme-vt");
  apply();
  const nextSnap = readThemeSnapshot(root);
  applyThemeSnapshot(root, prevSnap);

  // 4. Prepare overlay container covering the visual viewport.
  const overlay = document.createElement("div");
  overlay.setAttribute("data-theme-clone-overlay", variant);
  overlay.setAttribute("aria-hidden", "true");
  applyThemeSnapshot(overlay, nextSnap);
  applyThemeSnapshot(bodyClone, nextSnap);

  const curHeadingFont = root.style.getPropertyValue("--font-heading");
  const curDisplayFont = root.style.getPropertyValue("--font-display");
  if (curHeadingFont) overlay.style.setProperty("--font-heading", curHeadingFont);
  if (curDisplayFont) overlay.style.setProperty("--font-display", curDisplayFont);

  const nextBg = nextSnap.vars["--bg"] || "var(--bg)";
  const nextFg = nextSnap.vars["--fg"] || "var(--fg)";

  const vw = root.clientWidth || window.innerWidth;
  const vh = Math.max(window.innerHeight, root.clientHeight || 0);

  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = `${vw}px`;
  overlay.style.height = `${vh}px`;
  overlay.style.zIndex = "2147483000";
  overlay.style.pointerEvents = "none";
  overlay.style.overflow = "hidden";
  overlay.style.backgroundColor = nextBg;
  overlay.style.color = nextFg;
  overlay.style.transform = "translateZ(0)";
  overlay.style.willChange = "clip-path, filter";

  const bodyRect = body.getBoundingClientRect();

  bodyClone.style.position = "absolute";
  bodyClone.style.top = `${bodyRect.top}px`;
  bodyClone.style.left = `${bodyRect.left}px`;
  bodyClone.style.width = `${bodyRect.width}px`;
  bodyClone.style.minHeight = `${bodyRect.height}px`;
  bodyClone.style.margin = "0";
  bodyClone.style.backgroundColor = nextBg;
  bodyClone.style.color = nextFg;

  // Strip duplicate IDs inside the temporary clone.
  const allCloneNodes = Array.from(bodyClone.querySelectorAll<HTMLElement>("*"));
  for (const node of allCloneNodes) {
    if (node.id) node.removeAttribute("id");
  }

  // Replace cloned <video> elements with live-synced <canvas> elements so videos keep playing at 60fps.
  const liveVideos = Array.from(body.querySelectorAll<HTMLVideoElement>("video"));
  const cloneVideos = Array.from(
    bodyClone.querySelectorAll<HTMLVideoElement>("video")
  );
  const videoPairs: Array<{
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
  }> = [];

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
        videoPairs.push({ video: lv, canvas, ctx });
      }
    } catch {
      cv.style.opacity = "0";
    }
  }

  overlay.appendChild(bodyClone);
  root.appendChild(overlay);

  // 5. Measure actual rendered `overlayRect` in case the mobile browser offset `position: fixed; top: 0`
  //    by its top toolbar height, and lock `bodyClone`, `.fixed`, and `.sticky` elements to exact live rects.
  const overlayRect = overlay.getBoundingClientRect();
  const liveBodyRectNow = body.getBoundingClientRect();
  bodyClone.style.top = `${liveBodyRectNow.top - overlayRect.top}px`;
  bodyClone.style.left = `${liveBodyRectNow.left - overlayRect.left}px`;

  // Verify 1:1 alignment of bodyClone against live body and correct any sub-pixel residual.
  const cloneBodyRectNow = bodyClone.getBoundingClientRect();
  const residualY = liveBodyRectNow.top - cloneBodyRectNow.top;
  const residualX = liveBodyRectNow.left - cloneBodyRectNow.left;
  if (Math.abs(residualY) > 0.05 || Math.abs(residualX) > 0.05) {
    bodyClone.style.top = `${parseFloat(bodyClone.style.top) + residualY}px`;
    bodyClone.style.left = `${parseFloat(bodyClone.style.left) + residualX}px`;
  }

  // Pin `.fixed` elements (Header, countdown pill) to their exact viewport coordinates inside `overlay`.
  const cloneFixed = Array.from(bodyClone.querySelectorAll<HTMLElement>(".fixed"));
  for (let i = 0; i < cloneFixed.length; i += 1) {
    const el = cloneFixed[i];
    const rect = fixedRects[i];
    if (!el || !rect) continue;
    el.style.position = "fixed";
    el.style.top = `${rect.top - overlayRect.top}px`;
    el.style.left = `${rect.left - overlayRect.left}px`;
    el.style.width = `${rect.width}px`;
    el.style.height = `${rect.height}px`;
    el.style.bottom = "auto";
    el.style.right = "auto";
    el.style.margin = "0";
  }

  // Keep `.sticky` elements (e.g. `/work` StackingCards) IN NORMAL DOCUMENT FLOW (`position: relative`)
  // so their parent container NEVER collapses in height, and shift them by the exact delta between their
  // natural flow position and their live sticky viewport position.
  const cloneSticky = Array.from(bodyClone.querySelectorAll<HTMLElement>(".sticky"));
  for (let i = 0; i < cloneSticky.length; i += 1) {
    const el = cloneSticky[i];
    const targetRect = stickyRects[i];
    if (!el || !targetRect) continue;
    el.style.position = "relative";
    el.style.top = "0px";
    el.style.left = "0px";
    const naturalRect = el.getBoundingClientRect();
    const dy = targetRect.top - naturalRect.top;
    const dx = targetRect.left - naturalRect.left;
    el.style.top = `${dy}px`;
    el.style.left = `${dx}px`;
  }

  // 6. Live 60fps synchronization loop during the 700ms reveal:
  //    - Keeps `AutoScrollFrame` scrolling smoothly at 60fps (no freeze or snap).
  //    - Keeps `<video>` (Sadija reel) playing smoothly at 60fps (no freeze or snap).
  //    - Keeps `bodyClone` locked to `body.getBoundingClientRect()` if momentum scrolling is active.
  let finished = false;
  let rafId = 0;

  const syncFrame = () => {
    if (finished) return;

    const curOverlayRect = overlay.getBoundingClientRect();
    const curBodyRect = body.getBoundingClientRect();
    bodyClone.style.top = `${curBodyRect.top - curOverlayRect.top}px`;

    for (const idx of scrollerIndices) {
      const liveNode = allLiveNodes[idx];
      const cloneNode = allCloneNodes[idx];
      if (liveNode && cloneNode && cloneNode.scrollTop !== liveNode.scrollTop) {
        cloneNode.scrollTop = liveNode.scrollTop;
      }
    }

    for (const pair of videoPairs) {
      try {
        pair.ctx.drawImage(
          pair.video,
          0,
          0,
          pair.canvas.width,
          pair.canvas.height
        );
      } catch {
        // Ignore frame draw errors.
      }
    }

    rafId = requestAnimationFrame(syncFrame);
  };

  syncFrame();

  const localOriginX = viewportOriginX - overlayRect.left;
  const localOriginY = viewportOriginY - overlayRect.top;
  const keyframes = getKeyframesPx(variant, localOriginX, localOriginY, vw, vh);

  const anim = overlay.animate(keyframes, {
    duration: DURATION_MS,
    easing: EASING,
    fill: "forwards",
  });

  const cleanup = () => {
    if (finished) return;
    finished = true;
    activeCleanup = null;
    if (rafId) cancelAnimationFrame(rafId);
    applyThemeSnapshot(root, nextSnap);
    try {
      anim.cancel();
    } catch {
      // Ignore cancel errors.
    }
    overlay.remove();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove("theme-vt");
      });
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
  const frames = getKeyframesPx(variant, originX, originY, vw, vh);
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
      filter: blur(2px);
    }
    @keyframes ag-vt-reveal {
      from {
        clip-path: ${fromClip};
        filter: blur(8px);
      }
      50% {
        filter: blur(4px);
      }
      to {
        clip-path: ${toClip};
        filter: blur(0px);
      }
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
  const { x, y } = getOriginPx(options?.trigger);

  if (shouldUseDomClone()) {
    runDomCloneTransition(apply, variant, x, y);
  } else {
    runDesktopViewTransition(apply, variant, x, y);
  }
}
