# What All This Fuss Is About: Theme Switching, UI Libraries & Mobile Browsers

Updated: 2026-10-26

This document explains in plain terms:
1. **Which UI libraries and components** are running on the site and how they interact.
2. **Why the mobile theme-switching bug happened** on Samsung Internet and LinkedIn's in-app browser in the first place.
3. **Why `/work` and `/contact` still shifted/resized and why the video/scroll recordings froze** in the first DOM-clone attempt.
4. **How the final fix works** across `/`, `/work`, and `/contact`.

---

## 1. The Libraries & Components Involved

| Component / Library | File | What It Does on the Site |
| :--- | :--- | :--- |
| **Skiper UI — `Skiper26`** (`@skiper-ui/skiper26`) | `src/components/theme-transition.ts` | Powers the geometric **theme reveal animation** whenever the color palette switches (every 15 seconds automatically via `ThemeFontSwitcher.tsx`, or manually when clicking the Light/Dark button in `Header.tsx`). It cycles strictly in order: **`circle` $\to$ `rectangle` $\to$ `polygon`** using CSS `clip-path`. |
| **Skiper UI — `Skiper58`** (`@skiper-ui/skiper58`) | `src/components/ui/text-roll.tsx` | Powers the rolling-letter hover and mobile pulse animation on the navigation links (`Home`, `Work`, `Contact`, `Personvern`). |
| **Fancy Components — `StackingCards`** (`@fancy/stacking-cards`) | `src/components/ui/stacking-cards.tsx` | Used at the top of `/work` (`ClientWork.tsx`) for the 3 editorial summary cards (`01 What I build`, `02 Approach`, `03 Archive index`). Each card uses **`position: sticky; top: 5rem`** (`h-[15rem]` on mobile) so the cards stack on top of one another as you scroll down. |
| **Fancy Components — `Letter3DSwap`** (`@fancy/letter-3d-swap`) | `src/components/ui/letter-3d-swap.tsx` | Used inside `FlippingWordSwap` on major headings (`WORK`, `GET IN TOUCH`, `PROJECTS`, `Sadija`, `Noire`, `Grillz`, `LET'S TALK`). When the 10-second font roulette switches the heading font, each letter rolls 90° in 3D from the old font to the new font, auto-scaling wide fonts so they never overflow their container. |
| **Live Project Recordings** | `src/components/AutoScrollFrame.tsx` & `src/components/SadijaReelPreview.tsx` | On `/` and `/work`, **Noire** and **Grillz** run a 60fps `requestAnimationFrame` loop (`AutoScrollFrame`) that continuously scrolls the tall desktop screenshot (`container.scrollTop += speed * delta`). On `/work`, **Sadija** plays an HTML5 `<video>` inside an iPhone frame (`SadijaReelPreview`). |

---

## 2. Stage 1: Why Native `document.startViewTransition()` Broke on Samsung Internet & LinkedIn

Skiper26's original implementation relies on the browser's **CSS View Transitions API** (`document.startViewTransition()`).

1. **How `document.startViewTransition()` works:**
   When a theme switch starts, the browser takes a bitmap screenshot of the old page (`::view-transition-old(root)`) and the new page (`::view-transition-new(root)`), hides the live DOM, and animates `clip-path` over the screenshots inside a special browser overlay (`::view-transition`).
2. **The Snapshot Containing Block (SCB) bug on dual-toolbar browsers:**
   Per the CSS View Transitions Level 1 specification, `::view-transition` is sized and positioned relative to the **Snapshot Containing Block (SCB)** — which includes the space behind retractable mobile browser bars (`100lvh`).
   - On **Samsung Internet 30** (which has **two** dynamic bars: a `~56px` top address bar and a bottom toolbar) and **LinkedIn's in-app browser** (which uses Samsung Internet Custom Tab / Android WebView), the browser places the `::view-transition` layer at the SCB origin **above the top address bar (`~56px` too high)**, while the live page sits below the top address bar.
   - As soon as `document.startViewTransition()` starts, the captured page screenshot jumps **up by `~56px`** for the `0.7s` reveal, and then **snaps `~56px` back down** the instant `startViewTransition()` finishes and hands rendering back to the live DOM.

---

## 3. Stage 2: Why the First DOM-Clone Replacement Broke on `/work` & `/contact` and Froze the Recordings

To avoid Samsung Internet's broken `::view-transition` layer completely, we replaced `document.startViewTransition()` on mobile/touch browsers with a **DOM-Clone Clip-Path Overlay** (`runDomCloneTransition`): cloning `document.body` into a `position: fixed` overlay with the incoming theme colors and animating `clip-path` (`circle -> rectangle -> polygon`) over `700ms`.

However, that first DOM-clone implementation had **three bugs** that specifically hit `/work`, `/contact`, and the project recordings:

### Bug A: Why `/work` resized and jumped up by `720px` (`StackingCards` `.sticky` collapse)
- On `/work`, the 3 `StackingCards` (`01`, `02`, `03`) have class `.sticky` and each card occupies `15rem` (`240px`) of vertical height in **normal document flow** (`3 × 240px = 720px` total).
- The first clone script ran `bodyClone.querySelectorAll(".fixed, .sticky")` and set `el.style.position = "fixed"` on all of them.
- In CSS, changing an element from `position: sticky` to `position: fixed` **removes it from normal document flow**.
- Inside the clone overlay on `/work`, removing all 3 sticky cards from document flow caused the `<StackingCards>` section to **collapse from `720px` tall to `0px` tall**! Everything below the cards on `/work` (`Sadija`, `Noire`, `Grillz`, and the footer) **jumped up by `720px`** during the 700ms theme reveal and snapped back down when the overlay was removed.

### Bug B: Why `/work` and `/contact` shifted vertically when scrolled or after navigation
- The first clone script set `overlay.style.height = "100dvh"` and positioned the cloned body at `bodyClone.style.top = -window.scrollY`, assuming `overlay.getBoundingClientRect().top` was always `0px`.
- When you open `/` (Home) initially, you haven't scrolled yet (`scrollY = 0`), so the top bar is in its resting state. Once you scroll down or navigate to `/work` or `/contact`, Samsung Internet's dynamic toolbars offset `position: fixed; top: 0` / `100dvh` relative to `document.body.getBoundingClientRect().top`, causing `bodyClone` and `<header>` inside the overlay to sit at a different vertical offset than the live page underneath.

### Bug C: Why the recordings (`AutoScrollFrame` and `<video>`) froze for `0.7s` and snapped forward
- Because `body.cloneNode(true)` creates a **static DOM snapshot** at `t = 0ms`:
  1. For the **Noire** and **Grillz** auto-scrolling website recordings (`AutoScrollFrame.tsx`), the React `requestAnimationFrame` loop only scrolls the **live** DOM node. The cloned node inside the overlay had its `scrollTop` copied only once at `t = 0ms`, so it **froze completely still for `700ms`** while the live preview underneath kept scrolling (`~27px`), and then **snapped forward** when the overlay was removed.
  2. For the **Sadija** iPhone `<video>` reel (`SadijaReelPreview.tsx`), the clone script drew only a **single static video frame** onto a `<canvas>` at `t = 0ms`, so the video paused for `700ms` during the theme wipe and jumped ahead when the wipe ended.

---

## 4. How All Three Issues Are Fixed Now (`src/components/theme-transition.ts`)

1. **`.sticky` elements stay in normal document flow (`position: relative`):**
   - Only `.fixed` elements (`<header>` and the bottom-right countdown pill, which are already out of flow) are pinned with `position: fixed`.
   - `.sticky` elements (the 3 `StackingCards` on `/work`) keep **`position: relative`** in normal document flow — so `<StackingCards>` retains 100% of its `720px` height and nothing below it on `/work` ever moves or resizes — and are shifted by the exact measured delta `liveStickyRect.top - cloneStickyRect.top`.
2. **Self-correcting `getBoundingClientRect()` screen-space lock on every frame:**
   - Instead of trusting `-window.scrollY` or `100dvh`, immediately after inserting `overlay` into the DOM (and on every animation frame during the 700ms reveal), the script measures `overlayRect = overlay.getBoundingClientRect()` and `bodyRect = body.getBoundingClientRect()` and sets:
     `bodyClone.style.top = (bodyRect.top - overlayRect.top) + "px"`
   - It then verifies `body.getBoundingClientRect().top - bodyClone.getBoundingClientRect().top` and corrects any residual sub-pixel difference, guaranteeing that `bodyClone` and `<header>` sit on the **exact same screen pixels** as the live page on `/`, `/work`, and `/contact`.
   - It also copies live `<input>` and `<textarea>` values into the clone on `/contact` so form text never flashes blank during a theme switch.
3. **60fps live `requestAnimationFrame` sync for `AutoScrollFrame` and `<video>`:**
   - A `requestAnimationFrame` loop (`syncFrame`) runs for the entire `700ms` duration of the reveal:
     - On every frame, it copies `cloneScroller.scrollTop = liveScroller.scrollTop` for every `AutoScrollFrame` container so the Noire and Grillz recordings keep scrolling at 60fps right through the wipe.
     - On every frame, it calls `ctx.drawImage(liveVideo, ...)` onto the cloned `<canvas>` so the Sadija iPhone video keeps playing at 60fps right through the wipe.
