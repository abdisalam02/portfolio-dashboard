// Theme change reveal, adapted from Skiper UI "skiper26" (View Transitions API plus
// clip-path reveals). Shapes play in a fixed loop, circle -> rectangle -> polygon,
// so the same shape never plays twice in a row.
// Skiper UI asks for attribution on the free version; the credit sits in the footer.

type Shape = "circle" | "rectangle" | "polygon";
type Point = { x: number; y: number };

const SEQUENCE: Shape[] = ["circle", "rectangle", "polygon"];
const STYLE_ID = "theme-vt-styles";
const SCROLL_QUIET_MS = 120;

// Skiper resolves `animation-timing-function: var(--expo-out)` but never defines that
// variable, so its reveal effectively runs on `ease`. The old hard expo curve finished
// most of the travel in the first ~200ms, which read as a plain cross-fade. This curve
// keeps the shape moving across the whole duration.
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const DURATION: Record<Shape, number> = { circle: 0.9, rectangle: 0.8, polygon: 0.8 };

// Only the incoming snapshot animates. Old stays put underneath and blend mode is
// forced to normal, otherwise the two opaque pages add up towards white.
// The fixed header is captured in its own group: mobile Chrome otherwise pulls
// fixed elements into the transition layer, which is what made the page jump.
//
// On phones the snapshot containing block also includes the retractable URL bar,
// so the snapshots sit above the visual viewport by the bar's maximum height.
// `getSnapshotOffset()` measures that difference (100lvh - 100svh) and the groups
// are translated by it so the captured page lines up with the live viewport.
const baseCss = (snapshotOffset: number) => `
  ::view-transition { isolation: isolate; }
  ::view-transition-group(root) {
    animation-name: none;
    transform: translateY(${snapshotOffset}px);
    z-index: 1;
  }
  ::view-transition-old(root) { animation: none; z-index: 0; mix-blend-mode: normal; }
  ::view-transition-new(root) { z-index: 1; mix-blend-mode: normal; }
  header { view-transition-name: site-header; }
  ::view-transition-group(site-header) { z-index: 2; animation-duration: 0.9s; }
  ::view-transition-old(site-header),
  ::view-transition-new(site-header) { mix-blend-mode: normal; }
`;

function getSnapshotOffset() {
  if (typeof document === "undefined" || typeof navigator === "undefined") return 0;
  const ua = navigator.userAgent;
  // Chrome/Safari place the snapshots correctly. Samsung Internet has a second,
  // dynamic toolbar at the bottom and its Chromium build measures the snapshot
  // containing block against both bars, so the page snapshot sits above the
  // viewport by the dynamic bar height. `lvh - svh` is that bar height.
  if (!/SamsungBrowser/i.test(ua)) return 0;
  const heightOf = (unit: string) => {
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;top:0;left:0;width:1px;height:100${unit};visibility:hidden;pointer-events:none;`;
    document.body.appendChild(probe);
    const height = probe.getBoundingClientRect().height;
    probe.remove();
    return height;
  };
  // Small viewport = toolbars shown, large viewport = toolbars retracted.
  return Math.max(0, Math.round(heightOf("lvh") - heightOf("svh")));
}

function circleCss({ x, y }: Point) {
  // Reach the farthest corner exactly so the final frames are not spent growing
  // across area the viewport can never show.
  const reach = Math.ceil(
    Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
  ) + 2;
  return `
    ::view-transition-group(root) { animation-duration: ${DURATION.circle}s; animation-timing-function: ${EASE}; }
    ::view-transition-new(root) { animation-name: vt-reveal-circle; }
    @keyframes vt-reveal-circle {
      from { clip-path: circle(0px at ${x}px ${y}px); }
      to { clip-path: circle(${reach}px at ${x}px ${y}px); }
    }
  `;
}

const RECTANGLE_CSS = `
  ::view-transition-group(root) { animation-duration: ${DURATION.rectangle}s; animation-timing-function: ${EASE}; }
  ::view-transition-new(root) { animation-name: vt-reveal-rectangle; }
  @keyframes vt-reveal-rectangle {
    from { clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%); }
    to { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
  }
`;

const POLYGON_CSS = `
  ::view-transition-group(root) { animation-duration: ${DURATION.polygon}s; animation-timing-function: ${EASE}; }
  ::view-transition-new(root) { animation-name: vt-reveal-polygon; }
  @keyframes vt-reveal-polygon {
    from { clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%); }
    to { clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%); }
  }
`;

type ViewTransitionLike = {
  finished: Promise<void>;
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
};

let nextIndex = 0;
let running = false;
let lastScrollAt = 0;
let listening = false;
let activeTransition: ViewTransitionLike | null = null;

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

function getOrigin(trigger?: Element | null): Point {
  if (trigger) {
    const rect = trigger.getBoundingClientRect();
    return {
      x: Math.round(rect.left + rect.width / 2),
      y: Math.round(rect.top + rect.height / 2),
    };
  }
  return {
    x: Math.round(window.innerWidth / 2),
    y: Math.round(window.innerHeight / 2),
  };
}

function getShapeCss(shape: Shape, origin: Point) {
  if (shape === "circle") return circleCss(origin);
  if (shape === "rectangle") return RECTANGLE_CSS;
  return POLYGON_CSS;
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
export function runThemeTransition(apply: () => void, options: Options = {}) {
  if (typeof document === "undefined") {
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

  const shape = SEQUENCE[nextIndex];
  nextIndex = (nextIndex + 1) % SEQUENCE.length;

  const style = getStyleEl();
  style.textContent =
    baseCss(getSnapshotOffset()) +
    getShapeCss(shape, getOrigin(options.trigger));
  running = true;
  // The body colour fade would be captured mid-way by the new snapshot, so it is switched off for the run.
  document.documentElement.classList.add("theme-vt");

  const done = () => {
    running = false;
    activeTransition = null;
    document.documentElement.classList.remove("theme-vt");
    style.textContent = "";
  };

  try {
    const transition = doc.startViewTransition(apply);
    activeTransition = transition;
    transition.finished.catch(() => {}).finally(done);
  } catch {
    apply();
    done();
  }
}
