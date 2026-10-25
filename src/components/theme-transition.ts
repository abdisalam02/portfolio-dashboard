// Theme change reveal, adapted from Skiper UI "skiper26" (View Transitions API plus
// clip-path reveals). Shapes play in a fixed loop, circle -> rectangle -> polygon,
// so the same shape never plays twice in a row.
// Skiper UI asks for attribution on the free version; the credit sits in the footer.
//
// Samsung Internet debugging notes (see docs/STATE.md):
// View Transition pseudo-elements are laid out against the *snapshot containing
// block* (SCB), which on mobile includes the retractable URL bar, so its origin can
// sit above the layout viewport. The UA positions `::view-transition-group(root)`
// with an animation whose keyframes carry that offset and `animation-fill-mode: both`.
// Writing `animation-name: none` removes the animation *and its fill*, so the group
// falls back to the UA base style. Writing `transform` on top of that replaces the UA
// transform instead of composing with it. The safe correction is the individual
// `translate` property (it composes with `transform`), never `transform` on the group.

type Shape = "circle" | "rectangle" | "polygon";
type Point = { x: number; y: number };

export type VtMode =
  | "auto"
  | "base"
  | "ua"
  | "ua-freeze"
  | "translate-prop"
  | "image-pair"
  | "pin-container"
  | "pin-container-svh"
  | "pin-container-lvh"
  | "group-pinned-cover"
  | "group-pinned-fill"
  | "group-pinned-none"
  | "wrapper"
  | "measured"
  | "overlay";

export type VtOrigin = "raw" | "scb";
export type VtSource = "auto" | "probe" | "offsetTop" | "chrome" | "chromeCurrent";

export type VtConfig = {
  /** True only when ?vtdebug=1 is present. Nothing below runs otherwise. */
  debug: boolean;
  mode: VtMode;
  /** Manual offset in px from ?vtdy= or sessionStorage. */
  dy: number | null;
  origin: VtOrigin;
  source: VtSource;
  /** 4x longer reveal, for nudging the offset with the on-screen panel. */
  slow: boolean;
  /** Debug-only: does `overscroll-behavior: none` change the toolbar behaviour? */
  overscroll: boolean;
};

export type ViewportMetrics = {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
  screenWidth: number;
  screenHeight: number;
  vvWidth: number;
  vvHeight: number;
  vvOffsetTop: number;
  vvOffsetLeft: number;
  vvPageTop: number;
  vvScale: number;
  scrollX: number;
  scrollY: number;
  clientHeight: number;
  lvh: number;
  svh: number;
  dvh: number;
  lvhMinusSvh: number;
  lvhMinusDvh: number;
  devicePixelRatio: number;
  standalone: boolean;
  ua: string;
};

export type PseudoSnapshot = {
  position: string;
  top: string;
  left: string;
  width: string;
  height: string;
  transform: string;
  translate: string;
  /** m41 of the computed transform, in SCB coordinates. */
  tx: number;
  /** m42 of the computed transform, in SCB coordinates. */
  ty: number;
  /** ty parsed from the individual `translate` property. */
  translateTy: number;
  objectFit: string;
  objectPosition: string;
  opacity: string;
  visibility: string;
  animationName: string;
  animationPlayState: string;
  animationFillMode: string;
  zIndex: string;
};

export type VtCandidateMap = {
  probe: number;
  offsetTop: number;
  chrome: number;
  chromeCurrent: number;
  geometry: number;
};

export type VtReport = {
  at: string;
  mode: VtMode;
  origin: VtOrigin;
  source: VtSource;
  appliedDy: number;
  candidates: VtCandidateMap;
  geometryReason: string;
  probe: {
    fromTy: number | null;
    toTy: number | null;
    staticTy: number | null;
    translateTy: number | null;
  };
  rootGroup: {
    fromTy: number | null;
    toTy: number | null;
    staticTy: number | null;
  };
  rootRectTop: number;
  bodyRectTop: number;
  measurements: ViewportMetrics;
  pseudo: Record<string, PseudoSnapshot | null>;
};

const SEQUENCE: Shape[] = ["circle", "rectangle", "polygon"];
const STYLE_ID = "theme-vt-styles";
const PROBE_ID = "vt-scb-probe";
const SCROLL_QUIET_MS = 120;
const OFFSET_STORAGE_KEY = "vt_dy";

// Skiper resolves `animation-timing-function: var(--expo-out)` but never defines that
// variable, so its reveal effectively runs on `ease`. The old hard expo curve finished
// most of the travel in the first ~200ms, which read as a plain cross-fade. This curve
// keeps the shape moving across the whole duration.
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const DURATION: Record<Shape, number> = { circle: 0.9, rectangle: 0.8, polygon: 0.8 };

const MODES: readonly VtMode[] = [
  "auto",
  "base",
  "ua",
  "ua-freeze",
  "translate-prop",
  "image-pair",
  "pin-container",
  "pin-container-svh",
  "pin-container-lvh",
  "group-pinned-cover",
  "group-pinned-fill",
  "group-pinned-none",
  "wrapper",
  "measured",
  "overlay",
];

const PSEUDO_KEYS = [
  "::view-transition",
  "::view-transition-group(root)",
  "::view-transition-image-pair(root)",
  "::view-transition-old(root)",
  "::view-transition-new(root)",
  "::view-transition-group(site-header)",
  "::view-transition-group(scb-probe)",
  "::view-transition-group(theme-shell)",
  "::view-transition-new(theme-shell)",
  "::view-transition-old(theme-shell)",
] as const;

type ViewTransitionLike = {
  finished: Promise<void>;
  ready?: Promise<void>;
  updateCallbackDone?: Promise<void>;
  skipTransition?: () => void;
};
type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => ViewTransitionLike;
};

type Options = {
  /** Element that started the change. The circle grows from its centre. */
  trigger?: Element | null;
  /**
   * Automatic changes pass true so the page never freezes under a scrolling thumb.
   * A deliberate click passes false: the user is looking at the button, and scrolling
   * during the reveal still calls skipTransition.
   */
  skipWhenScrolling?: boolean;
  /**
   * The background colour the theme is about to switch to. Only used by the
   * snapshot-free overlay fallback, which has to paint before `apply` runs.
   */
  nextBg?: string;
};

let nextIndex = 0;
let running = false;
let lastScrollAt = 0;
let listening = false;
let activeTransition: ViewTransitionLike | null = null;

/* ------------------------------------------------------------------ */
/* Debug configuration                                                 */
/* ------------------------------------------------------------------ */

export function getStoredVtOffset(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(OFFSET_STORAGE_KEY);
    if (raw === null) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/** Live calibration from the debug panel. Returns the value that was stored. */
export function setVtOffset(px: number | null): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  try {
    if (px === null) window.sessionStorage.removeItem(OFFSET_STORAGE_KEY);
    else window.sessionStorage.setItem(OFFSET_STORAGE_KEY, String(px));
  } catch {
    /* private mode / storage disabled */
  }
  const style = document.documentElement.style;
  if (px === null) style.removeProperty("--vt-dy");
  else style.setProperty("--vt-dy", `${px}px`);
}

export function readVtConfig(): VtConfig {
  const fallback: VtConfig = {
    debug: false,
    mode: "auto",
    dy: null,
    origin: "raw",
    source: "auto",
    slow: false,
    overscroll: false,
  };
  if (typeof window === "undefined") return fallback;

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return fallback;
  }

  if (params.get("vtdebug") !== "1") return fallback;

  const requested = params.get("vtmode") ?? "";
  const mode = (MODES as readonly string[]).includes(requested)
    ? (requested as VtMode)
    : "auto";

  const dyParam = params.get("vtdy");
  let dy: number | null = dyParam === null ? null : Number(dyParam);
  if (dy !== null && !Number.isFinite(dy)) dy = null;
  if (dy === null) dy = getStoredVtOffset();

  const origin: VtOrigin = params.get("vtorigin") === "scb" ? "scb" : "raw";
  const src = params.get("vtsrc") ?? "";
  const source: VtSource =
    src === "probe" || src === "offsetTop" || src === "chrome" || src === "chromeCurrent"
      ? src
      : "auto";

  return {
    debug: true,
    mode,
    dy,
    origin,
    source,
    slow: params.get("vtslow") === "1",
    overscroll: params.get("vtoverscroll") === "1",
  };
}

/* ------------------------------------------------------------------ */
/* Measurement                                                         */
/* ------------------------------------------------------------------ */

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function parsePx(value: string | undefined | null): number | null {
  if (!value) return null;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseTransformTy(value: string | null | undefined): number | null {
  if (!value || value === "none") return null;
  try {
    return new DOMMatrixReadOnly(value).m42;
  } catch {
    return null;
  }
}

function parseTranslateTy(value: string): number {
  if (!value || value === "none") return 0;
  const parts = value.trim().split(/\s+/);
  const second = parts.length > 1 ? parts[1] : "0px";
  const parsed = parseFloat(second);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * One hidden probe with 100lvh / 100svh / 100dvh children. Reading the heights gives
 * the exact toolbar dimensions the engine is using, without trusting innerHeight.
 */
export function measureViewport(): ViewportMetrics {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;top:0;left:-9999px;width:1px;visibility:hidden;" +
    "pointer-events:none;overflow:hidden;";
  const lvhEl = document.createElement("div");
  lvhEl.style.height = "100lvh";
  const svhEl = document.createElement("div");
  svhEl.style.height = "100svh";
  const dvhEl = document.createElement("div");
  dvhEl.style.height = "100dvh";
  host.append(lvhEl, svhEl, dvhEl);
  document.body.appendChild(host);
  const lvh = lvhEl.getBoundingClientRect().height;
  const svh = svhEl.getBoundingClientRect().height;
  const dvhRaw = dvhEl.getBoundingClientRect().height;
  host.remove();

  const vv = window.visualViewport;
  const innerHeight = window.innerHeight;
  const dvh = dvhRaw > 0 ? dvhRaw : svh;
  const scr = typeof window.screen === "object" ? window.screen : null;

  return {
    innerWidth: round(window.innerWidth),
    innerHeight: round(innerHeight),
    outerWidth: round(window.outerWidth),
    outerHeight: round(window.outerHeight),
    screenWidth: round(scr?.width ?? 0),
    screenHeight: round(scr?.height ?? 0),
    vvWidth: round(vv?.width ?? window.innerWidth),
    vvHeight: round(vv?.height ?? innerHeight),
    vvOffsetTop: round(vv?.offsetTop ?? 0),
    vvOffsetLeft: round(vv?.offsetLeft ?? 0),
    vvPageTop: round(vv?.pageTop ?? 0),
    vvScale: round(vv?.scale ?? 1),
    scrollX: round(window.scrollX),
    scrollY: round(window.scrollY),
    clientHeight: round(document.documentElement.clientHeight),
    lvh: round(lvh),
    svh: round(svh),
    dvh: round(dvh),
    lvhMinusSvh: round(lvh - svh),
    lvhMinusDvh: round(lvh - dvh),
    devicePixelRatio: round(window.devicePixelRatio),
    standalone:
      typeof window.matchMedia === "function" &&
      window.matchMedia("(display-mode: standalone)").matches,
    ua: navigator.userAgent,
  };
}

function readPseudo(pseudo: string): PseudoSnapshot | null {
  try {
    const cs = getComputedStyle(document.documentElement, pseudo);
    const transform = cs.transform;
    let tx = 0;
    let ty = 0;
    if (transform && transform !== "none") {
      try {
        const matrix = new DOMMatrixReadOnly(transform);
        tx = matrix.m41;
        ty = matrix.m42;
      } catch {
        /* leave zeros */
      }
    }
    const translate = cs.getPropertyValue("translate");
    return {
      position: cs.position,
      top: cs.top,
      left: cs.left,
      width: cs.width,
      height: cs.height,
      transform,
      translate,
      tx: round(tx),
      ty: round(ty),
      translateTy: round(parseTranslateTy(translate)),
      objectFit: cs.objectFit,
      objectPosition: cs.objectPosition,
      opacity: cs.opacity,
      visibility: cs.visibility,
      animationName: cs.animationName,
      animationPlayState: cs.animationPlayState,
      animationFillMode: cs.animationFillMode,
      zIndex: cs.zIndex,
    };
  } catch {
    return null;
  }
}

type PseudoKeyframeEffect = {
  target: Element | null;
  pseudoElement?: string | null;
  getKeyframes: () => Array<{ transform?: string | null }>;
};

/**
 * The UA generates the group animation dynamically, and its keyframes are in SCB
 * coordinates. Reading the *to* keyframe gives the engine's own answer for where the
 * element belongs, with no converting between viewport and SCB spaces.
 */
function readGroupKeyframeTys(name: string): { fromTy: number | null; toTy: number | null } {
  const result: { fromTy: number | null; toTy: number | null } = {
    fromTy: null,
    toTy: null,
  };
  try {
    const animations = document.getAnimations();
    for (const animation of animations) {
      const effect = animation.effect as unknown as PseudoKeyframeEffect | null;
      if (!effect) continue;
      if (effect.target !== document.documentElement) continue;
      if (effect.pseudoElement !== `::view-transition-group(${name})`) continue;
      const frames = effect.getKeyframes();
      if (frames.length === 0) break;
      const first = frames[0];
      const last = frames[frames.length - 1];
      result.fromTy = parseTransformTy(first?.transform);
      result.toTy = parseTransformTy(last?.transform);
      break;
    }
  } catch {
    /* older engines */
  }
  return result;
}

function readAppliedDy(): number {
  if (typeof document === "undefined") return 0;
  const value = document.documentElement.style.getPropertyValue("--vt-dy");
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function collectReport(config: VtConfig, metrics: ViewportMetrics): VtReport {
  const pseudo: Record<string, PseudoSnapshot | null> = {};
  for (const key of PSEUDO_KEYS) {
    // getComputedStyle returns default values for pseudos that do not exist, so only
    // read the wrapper group when the wrapper mode actually created it.
    if (key.includes("theme-shell") && config.mode !== "wrapper") continue;
    pseudo[key] = readPseudo(key);
  }

  const probeStyle = pseudo["::view-transition-group(scb-probe)"] ?? null;
  const probeFrames = readGroupKeyframeTys("scb-probe");
  const rootFrames = readGroupKeyframeTys("root");
  const rootStyle = pseudo["::view-transition-group(root)"] ?? null;

  const probeStaticTy = probeStyle ? probeStyle.ty : null;
  const probeTranslateTy = probeStyle ? probeStyle.translateTy : null;
  const probeValue = Math.max(
    0,
    Math.abs(probeFrames.toTy ?? probeTranslateTy ?? probeStaticTy ?? 0)
  );

  const offsetTop = Math.abs(metrics.vvOffsetTop);
  const chrome = Math.max(0, metrics.lvhMinusSvh);
  const chromeCurrent = Math.max(0, metrics.lvhMinusDvh);

  // If the engine's root snapshot already spans the SCB (viewport + bar), it is
  // positioned correctly at SCB origin and needs no correction. If it is only
  // viewport-sized while the SCB origin sits above the viewport, it is drawn too
  // high by exactly that offset.
  const rootHeight =
    parsePx(rootStyle?.height) ??
    parsePx(pseudo["::view-transition-new(root)"]?.height) ??
    metrics.vvHeight;
  const imageHeight = parsePx(pseudo["::view-transition-new(root)"]?.height) ?? rootHeight;
  const coveredHeight = Math.max(rootHeight, imageHeight);

  let geometry = 0;
  let geometryReason = "probe offset is zero; nothing to correct";
  if (probeValue >= 0.5) {
    const rootTy = rootFrames.toTy ?? rootStyle?.ty ?? 0;
    if (rootTy < -0.5) {
      geometry = -rootTy;
      geometryReason = `engine base transform is ${round(rootTy)}px (snapshot too high); compensate by ${round(
        -rootTy
      )}px`;
    } else if (rootTy > 0.5) {
      geometry = 0;
      geometryReason = `engine already offsets the root group by ${round(
        rootTy
      )}px; no extra correction`;
    } else if (coveredHeight >= metrics.vvHeight + probeValue - 1) {
      geometry = 0;
      geometryReason = `root snapshot spans SCB (${round(coveredHeight)}px >= ${round(
        metrics.vvHeight + probeValue
      )}px); UA already accounts for the bar`;
    } else {
      geometry = probeValue;
      geometryReason = `root snapshot is viewport-sized (${round(
        coveredHeight
      )}px) while SCB origin is ${round(probeValue)}px above the viewport`;
    }
  }

  return {
    at: new Date().toISOString(),
    mode: config.mode,
    origin: config.origin,
    source: config.source,
    appliedDy: round(readAppliedDy()),
    candidates: {
      probe: round(probeValue),
      offsetTop: round(offsetTop),
      chrome: round(chrome),
      chromeCurrent: round(chromeCurrent),
      geometry: round(geometry),
    },
    geometryReason,
    probe: {
      fromTy: probeFrames.fromTy === null ? null : round(probeFrames.fromTy),
      toTy: probeFrames.toTy === null ? null : round(probeFrames.toTy),
      staticTy: probeStaticTy === null ? null : round(probeStaticTy),
      translateTy: probeTranslateTy === null ? null : round(probeTranslateTy),
    },
    rootGroup: {
      fromTy: rootFrames.fromTy === null ? null : round(rootFrames.fromTy),
      toTy: rootFrames.toTy === null ? null : round(rootFrames.toTy),
      staticTy: rootStyle ? round(rootStyle.ty) : null,
    },
    rootRectTop: round(document.documentElement.getBoundingClientRect().top),
    bodyRectTop: round(document.body.getBoundingClientRect().top),
    measurements: metrics,
    pseudo,
  };
}

function chooseDy(config: VtConfig, report: VtReport): number {
  const candidates = report.candidates;
  let value: number;
  if (config.source === "probe") value = candidates.probe;
  else if (config.source === "offsetTop") value = candidates.offsetTop;
  else if (config.source === "chrome") value = candidates.chrome;
  else if (config.source === "chromeCurrent") value = candidates.chromeCurrent;
  else value = candidates.geometry;
  return round(Math.max(-200, Math.min(200, value)));
}

/* ------------------------------------------------------------------ */
/* CSS                                                                 */
/* ------------------------------------------------------------------ */

const ISOLATION = `::view-transition { isolation: isolate; }`;

const rootLayers = `
  ::view-transition-old(root) { animation: none; z-index: 0; mix-blend-mode: normal; }
  ::view-transition-new(root) {
    z-index: 1;
    mix-blend-mode: normal;
    animation-play-state: var(--vt-play, running);
  }
`;

const headerCss = (slow: number, zIndex: number) => `
  header { view-transition-name: site-header; }
  ::view-transition-group(site-header) { z-index: ${zIndex}; animation-duration: ${0.9 * slow}s; }
  ::view-transition-old(site-header),
  ::view-transition-new(site-header) { mix-blend-mode: normal; }
`;

// Base mode: keep the UA's frozen group (animation-name: none) and add nothing.
const rootFrozen = `::view-transition-group(root) { animation-name: none; z-index: 1; }`;

// Hypothesis H1 fix: `translate` composes with the UA `transform` instead of replacing it.
const rootTranslated = `
  ::view-transition-group(root) {
    animation-name: none;
    z-index: 1;
    translate: 0 var(--vt-dy, 0px);
  }
`;

// Keep the UA's dynamically generated "to" transform (and its fill), but finish its
// old -> new animation within the first frame so no slide is visible. This preserves
// whatever SCB offset the engine itself computed without trusting a guessed value.
const uaFrozen = (shape: Shape, slow: number) => `
  ::view-transition-group(root) {
    animation-duration: 0.001s;
    animation-delay: -1s;
    z-index: 1;
    translate: 0 var(--vt-dy, 0px);
  }
  ::view-transition-new(root) {
    animation-duration: ${DURATION[shape] * slow}s;
    animation-delay: 0s;
    animation-timing-function: ${EASE};
  }
`;

const circleReach = (origin: Point) => {
  const width = typeof window === "undefined" ? 400 : window.innerWidth;
  const height = typeof window === "undefined" ? 800 : window.innerHeight;
  return (
    Math.ceil(
      Math.hypot(
        Math.max(origin.x, width - origin.x),
        Math.max(origin.y, height - origin.y)
      )
    ) + 2
  );
};

function shapeCss(target: string, shape: Shape, origin: Point, slow: number): string {
  const duration = DURATION[shape] * slow;
  const group = `::view-transition-group(${target}) {
    animation-duration: ${duration}s;
    animation-timing-function: ${EASE};
  }`;
  const incoming = `::view-transition-new(${target}) { animation-name: vt-reveal-${shape}; }`;

  if (shape === "circle") {
    const fallbackReach = circleReach(origin);
    return `${group}${incoming}
      @keyframes vt-reveal-circle {
        from { clip-path: circle(0px at var(--vt-ox, ${origin.x}px) var(--vt-oy, ${origin.y}px)); }
        to { clip-path: circle(var(--vt-reach, ${fallbackReach}px) at var(--vt-ox, ${origin.x}px) var(--vt-oy, ${origin.y}px)); }
      }`;
  }

  if (shape === "rectangle") {
    return `${group}${incoming}
      @keyframes vt-reveal-rectangle {
        from { clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%); }
        to { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
      }`;
  }

  return `${group}${incoming}
    @keyframes vt-reveal-polygon {
      from { clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%); }
      to { clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%); }
    }`;
}

function buildCss(config: VtConfig, shape: Shape, origin: Point, slow: number): string {
  const core = buildCoreCss(config, shape, origin, slow);
  // The debug panel is a captured element too. Keep it above every snapshot group so
  // it stays readable (and tappable) during wrapper/pinned experiments.
  return config.debug
    ? `${core}\n::view-transition-group(vt-debug-panel) { z-index: 10; }`
    : core;
}

function buildCoreCss(config: VtConfig, shape: Shape, origin: Point, slow: number): string {
  const wrapperTarget = config.mode === "wrapper";
  // The main content sits in its own group in wrapper mode, so the header has to be
  // lifted above it. Every other mode keeps the original z-index.
  const header = headerCss(slow, wrapperTarget ? 4 : 2);
  const reveal = shapeCss(wrapperTarget ? "theme-shell" : "root", shape, origin, slow);

  switch (config.mode) {
    case "ua":
      // Leave the UA's group animation (and its fill) completely alone. The UA
      // keyframes carry the SCB offset, so this is the "is our override the bug?"
      // test.
      return `${ISOLATION}
        ::view-transition-group(root) { z-index: 1; }
        ${rootLayers}${header}${reveal}`;

    case "translate-prop":
      return `${ISOLATION}${rootTranslated}${rootLayers}${header}${reveal}`;

    case "ua-freeze":
    case "measured":
      // Keep the UA's own "to" transform (via animation-fill-mode: both) and add any
      // measured correction with `translate`, which composes instead of replacing it.
      return `${ISOLATION}${rootLayers}${header}${reveal}${uaFrozen(shape, slow)}`;

    case "image-pair":
      return `${ISOLATION}
        ::view-transition-group(root) { z-index: 1; }
        ::view-transition-image-pair(root) { translate: 0 var(--vt-dy, 0px); }
        ${rootLayers}${header}${reveal}`;

    case "pin-container":
    case "pin-container-svh":
    case "pin-container-lvh": {
      const heightRule =
        config.mode === "pin-container-svh"
          ? "height: 100svh;"
          : config.mode === "pin-container-lvh"
            ? "height: 100lvh;"
            : "bottom: 0;";
      return `${ISOLATION}
        ::view-transition {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          ${heightRule}
          isolation: isolate;
        }
        ${rootTranslated}${rootLayers}${header}${reveal}`;
    }

    case "group-pinned-cover":
    case "group-pinned-fill":
    case "group-pinned-none": {
      const fit =
        config.mode === "group-pinned-cover"
          ? "cover"
          : config.mode === "group-pinned-fill"
            ? "fill"
            : "none";
      return `${ISOLATION}${rootLayers}
        ::view-transition-group(root) {
          animation: none;
          top: 0;
          left: 0;
          width: var(--vt-vw, 100vw);
          height: var(--vt-vh, 100svh);
          transform: none;
          translate: 0 var(--vt-dy, 0px);
          z-index: 1;
        }
        ::view-transition-image-pair(root),
        ::view-transition-old(root),
        ::view-transition-new(root) {
          width: 100%;
          height: 100%;
          object-fit: ${fit};
          object-position: top;
        }
        ${header}${reveal}`;
    }

    case "wrapper":
      // Hypothesis H3: take the transition off the document element entirely and
      // snapshot a normal wrapper element (the page <main>). The fixed header keeps
      // its own group, so it is excluded from the wrapper snapshot.
      return `${ISOLATION}
        main { view-transition-name: theme-shell; }
        ::view-transition-group(theme-shell) {
          animation-name: none;
          z-index: 2;
          translate: 0 var(--vt-dy, 0px);
        }
        ::view-transition-old(theme-shell) {
          animation: none;
          z-index: 0;
          mix-blend-mode: normal;
        }
        ::view-transition-new(theme-shell) {
          z-index: 1;
          mix-blend-mode: normal;
          animation-play-state: var(--vt-play, running);
        }
        ::view-transition-old(root) { animation: none; z-index: 0; mix-blend-mode: normal; }
        ::view-transition-new(root) { visibility: hidden; }
        ${header}${reveal}`;

    case "base":
    case "auto":
    default:
      return `${ISOLATION}${rootFrozen}${rootLayers}${header}${reveal}`;
  }
}

/* ------------------------------------------------------------------ */
/* Probe                                                               */
/* ------------------------------------------------------------------ */

function addScbProbe(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  document.getElementById(PROBE_ID)?.remove();
  const probe = document.createElement("div");
  probe.id = PROBE_ID;
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText =
    "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;" +
    "pointer-events:none;z-index:-1;view-transition-name:scb-probe;";
  document.body.appendChild(probe);
  return probe;
}

/* ------------------------------------------------------------------ */
/* Origin                                                              */
/* ------------------------------------------------------------------ */

function getOrigin(trigger: Element | null | undefined, elementSpace: boolean, scbDy: number): Point {
  const vv = window.visualViewport;
  const scrollX = elementSpace ? window.scrollX : 0;
  const scrollY = elementSpace ? window.scrollY : 0;
  let x: number;
  let y: number;
  if (trigger) {
    const rect = trigger.getBoundingClientRect();
    x = rect.left + rect.width / 2 + scrollX;
    y = rect.top + rect.height / 2 + scrollY;
  } else {
    x = window.innerWidth / 2 + scrollX;
    y = window.innerHeight / 2 + scrollY;
  }
  if (!elementSpace) {
    x += vv?.offsetLeft ?? 0;
    y += vv?.offsetTop ?? 0;
    y += scbDy;
  }
  return { x: Math.round(x), y: Math.round(y) };
}

/* ------------------------------------------------------------------ */
/* Snapshot-free fallback (Step 4)                                     */
/* ------------------------------------------------------------------ */

function overlayKeyframes(
  shape: Shape,
  origin: Point,
  width: number,
  height: number
): Keyframe[] {
  if (shape === "circle") {
    const reach =
      Math.ceil(
        Math.hypot(
          Math.max(origin.x, width - origin.x),
          Math.max(origin.y, height - origin.y)
        )
      ) + 2;
    return [
      { clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` },
      { clipPath: `circle(${reach}px at ${origin.x}px ${origin.y}px)` },
    ];
  }
  if (shape === "rectangle") {
    return [
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    ];
  }
  return [
    { clipPath: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)" },
    { clipPath: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)" },
  ];
}

function runOverlayTransition(apply: () => void, options: Options, config: VtConfig): void {
  const nextBg = options.nextBg;
  if (!nextBg) {
    // Without the destination colour the overlay would have to be painted after the
    // theme flipped, which loses the old frame. Fall back to the plain change.
    apply();
    return;
  }

  const shape = SEQUENCE[nextIndex];
  nextIndex = (nextIndex + 1) % SEQUENCE.length;
  const slow = config.slow ? 4 : 1;
  const duration = DURATION[shape] * slow * 1000;
  const origin = getOrigin(options.trigger, false, 0);
  const width = window.innerWidth;
  const height = window.innerHeight;

  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.cssText =
    `position:fixed;inset:0;z-index:2147483000;pointer-events:none;` +
    `background:${nextBg};will-change:clip-path,opacity;`;
  document.body.appendChild(overlay);
  document.documentElement.classList.add("theme-vt");
  if (config.overscroll) document.documentElement.classList.add("vt-overscroll");
  running = true;

  let applied = false;
  const applyOnce = () => {
    if (applied) return;
    applied = true;
    apply();
  };

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    window.clearTimeout(safety);
    overlay.remove();
    document.documentElement.classList.remove("theme-vt");
    document.documentElement.classList.remove("vt-overscroll");
    running = false;
  };

  const safety = window.setTimeout(() => {
    applyOnce();
    cleanup();
  }, duration + 1500);

  let animation: Animation;
  try {
    animation = overlay.animate(
      overlayKeyframes(shape, origin, width, height),
      { duration, easing: EASE, fill: "forwards" }
    );
  } catch {
    applyOnce();
    cleanup();
    return;
  }

  try {
    animation.finished
      .then(() => {
        applyOnce();
        const fade = overlay.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 150, easing: "ease-out", fill: "forwards" }
        );
        fade.finished.then(cleanup).catch(cleanup);
      })
      .catch(() => {
        applyOnce();
        cleanup();
      });
  } catch {
    applyOnce();
    cleanup();
  }
}

/* ------------------------------------------------------------------ */
/* Runner                                                              */
/* ------------------------------------------------------------------ */

function watchScroll() {
  if (listening) return;
  listening = true;
  window.addEventListener(
    "scroll",
    () => {
      lastScrollAt = performance.now();
      // A snapshot is a still image, so scrolling under an active reveal looks frozen.
      // Jump to the finished page instead when that happens.
      activeTransition?.skipTransition?.();
    },
    { passive: true }
  );
}

function getStyleEl() {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  return el;
}

/**
 * Runs `apply` (the function that actually switches the theme) inside a reveal.
 * `options.trigger` is the element that started the change; the circle grows from
 * its centre. Falls back to calling `apply` directly, with no animation, when:
 *  - the browser has no View Transitions API,
 *  - the visitor prefers reduced motion,
 *  - the page is mid-scroll and `skipWhenScrolling` is set (automatic changes only),
 *  - another reveal is still running.
 * Skipped runs do not advance the sequence, so the order stays circle, rectangle, polygon.
 */
export function runThemeTransition(apply: () => void, options: Options = {}): void {
  if (typeof document === "undefined" || typeof window === "undefined") {
    apply();
    return;
  }

  watchScroll();

  const doc = document as DocWithVT;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrolling =
    options.skipWhenScrolling === true &&
    performance.now() - lastScrollAt < SCROLL_QUIET_MS;

  if (!doc.startViewTransition || reduceMotion || scrolling || running) {
    apply();
    return;
  }

  const config = readVtConfig();

  if (config.mode === "overlay") {
    runOverlayTransition(apply, options, config);
    return;
  }

  const shape = SEQUENCE[nextIndex];
  nextIndex = (nextIndex + 1) % SEQUENCE.length;

  const metrics = measureViewport();
  const storedDy = config.debug ? getStoredVtOffset() : null;
  const manualDy = config.dy ?? storedDy;
  const baseDy = manualDy ?? 0;
  const slow = config.slow ? 4 : 1;
  const elementSpace = config.mode === "wrapper";
  const scbDy = config.origin === "scb" && !elementSpace ? Math.max(0, baseDy) : 0;
  const origin = getOrigin(options.trigger, elementSpace, scbDy);

  const root = document.documentElement;
  const usesVars = config.mode !== "auto" && config.mode !== "base";

  if (usesVars) {
    root.style.setProperty("--vt-dy", `${baseDy}px`);
    root.style.setProperty("--vt-vw", `${metrics.innerWidth}px`);
    root.style.setProperty("--vt-vh", `${metrics.vvHeight}px`);
    root.style.setProperty("--vt-ox", `${origin.x}px`);
    root.style.setProperty("--vt-oy", `${origin.y}px`);
    root.style.setProperty(
      "--vt-reach",
      `${Math.ceil(
        Math.hypot(
          Math.max(origin.x, metrics.innerWidth - origin.x),
          Math.max(origin.y, metrics.innerHeight - origin.y)
        )
      ) + 2}px`
    );
  }

  const pendingMeasure = config.mode === "measured" && manualDy === null;
  if (pendingMeasure) root.style.setProperty("--vt-play", "paused");
  else root.style.removeProperty("--vt-play");

  const style = getStyleEl();
  style.textContent = buildCss(config, shape, origin, slow);
  const probe = config.debug || config.mode === "measured" ? addScbProbe() : null;

  running = true;
  root.classList.add("theme-vt");
  if (config.overscroll) root.classList.add("vt-overscroll");

  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    running = false;
    activeTransition = null;
    root.classList.remove("theme-vt");
    root.classList.remove("vt-overscroll");
    style.textContent = "";
    probe?.remove();
    if (usesVars) {
      for (const property of [
        "--vt-dy",
        "--vt-vw",
        "--vt-vh",
        "--vt-ox",
        "--vt-oy",
        "--vt-reach",
        "--vt-play",
      ]) {
        root.style.removeProperty(property);
      }
    }
  };

  let transition: ViewTransitionLike;
  try {
    transition = doc.startViewTransition(apply);
  } catch {
    apply();
    done();
    return;
  }
  activeTransition = transition;

  if (config.debug || config.mode === "measured") {
    const handleReady = () => {
      if (finished) return;
      const report = collectReport(config, metrics);

      if (pendingMeasure) {
        const dy = chooseDy(config, report);
        root.style.setProperty("--vt-dy", `${dy}px`);
        root.style.setProperty("--vt-play", "running");
        report.appliedDy = dy;
        // Put the shape's origin into the corrected space as well when asked to.
        if (config.origin === "scb" && dy !== 0) {
          const corrected = getOrigin(options.trigger, false, dy);
          const reach =
            Math.ceil(
              Math.hypot(
                Math.max(corrected.x, metrics.innerWidth - corrected.x),
                Math.max(corrected.y, metrics.innerHeight - corrected.y)
              )
            ) + 2;
          root.style.setProperty("--vt-oy", `${corrected.y}px`);
          root.style.setProperty("--vt-reach", `${reach}px`);
        }
      }

      if (config.debug) {
        try {
          window.dispatchEvent(new CustomEvent<VtReport>("vt:report", { detail: report }));
        } catch {
          /* ignore */
        }
        try {
          console.log("[vt]", JSON.stringify(report));
        } catch {
          /* ignore */
        }
      }
      // NB: never remove a captured element while the transition is running.
      // Chromium aborts the whole transition if a named element disappears mid-flight,
      // so the probe is removed in done() only.
    };

    const ready = transition.ready;
    if (ready) {
      ready.then(handleReady).catch(() => {
        if (pendingMeasure && !finished) root.style.setProperty("--vt-play", "running");
      });
    } else if (pendingMeasure) {
      root.style.setProperty("--vt-play", "running");
    }
  }

  transition.finished.catch(() => {}).finally(done);
}
