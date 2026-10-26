# Theme Transition on Samsung Internet & LinkedIn In-App Browser — Resolved

## Why Previous Attempts Failed

1. **Production was still running the uncompensated `base` path:**
   In the previous `src/components/theme-transition.ts`, `readVtConfig()` defaulted to `mode: "auto"` whenever `?vtdebug=1` was absent from the URL, and `mode: "auto"` fell through to `case "base": case "auto": default:` — which applied `::view-transition-group(root) { animation-name: none; }` with `header { view-transition-name: site-header; }` and zero offset compensation.
2. **Why `ua` / `ua-freeze` / `measured` still cannot fix `document.startViewTransition` on Samsung Internet 30 & LinkedIn:**
   - For `root`, Chromium defines the snapshot rect as the **Snapshot Containing Block (SCB)** itself (`100lvh`), so the browser's UA `transform` on `::view-transition-group(root)` is `none` (`0, 0`). Keeping the UA transform (`ua` / `ua-freeze`) therefore applies `0px` offset to `root`.
   - On **Samsung Internet 30** (which has both a top URL bar and a bottom toolbar) and **LinkedIn's in-app browser** (Samsung Custom Tab / Android WebView), the `::view-transition` layer is painted at the SCB origin above the top bar (`~56px` above the visual viewport), while the live DOM sits below the top bar. Any `document.startViewTransition` call that snapshots `root` therefore shifts the visible page up by the top toolbar height during the transition.

## The Permanent Fix (`src/components/theme-transition.ts`)

Instead of fighting Chromium's broken SCB origin on mobile/in-app browsers, `runThemeTransition` now uses a **Viewport-Locked DOM-Clone Clip-Path Reveal** (`runDomCloneTransition`) on mobile/touch/Samsung/LinkedIn/WebView browsers while keeping `document.startViewTransition` on fine-pointer desktop browsers:

1. **Same `circle -> rectangle -> polygon` sequence:**
   Both paths share the exact same `SEQUENCE = ["circle", "rectangle", "polygon"]` and Web Animations `clip-path` keyframes.
2. **100% layout-viewport coordinates (`position: fixed; inset: 0`):**
   - Clones `document.body` into a `position: fixed; top: 0; left: 0; width: 100vw; height: 100dvh` overlay with the incoming theme's CSS custom properties (`--bg`, `--fg`, `--card-bg`, `--card-border`, `--muted`, `--accent`, `--accent-fg`).
   - Aligns normal document flow to `-window.scrollY` (and syncs on scroll if momentum scrolling is active), pins `.fixed` and `.sticky` elements (`<header>`, stacking cards, countdown pill) to their exact live `getBoundingClientRect()` coordinates, and copies any `<video>` frame to a `<canvas>` so videos never flash black.
   - Animates `clip-path` (`circle`, `rectangle`, or `polygon`) over `700ms` via `overlay.animate(...)`, then commits the new theme variables to `document.documentElement` and removes the overlay in the same frame.
3. **Cannot jump by construction:**
   Because `document.startViewTransition` is never invoked on Samsung Internet or LinkedIn in-app browser, the Snapshot Containing Block (`SCB`) is never created and the page cannot shift by even `1px`.
