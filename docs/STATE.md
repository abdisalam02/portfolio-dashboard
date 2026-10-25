# STATE.md: resume point (read first, keep under 30 lines)

Updated: 2026-10-25

## Now
- Task: Theme changes (auto roulette + Header toggle) reveal via View Transitions (`components/theme-transition.ts`, Skiper26). Circle starts at the clicked button, 0.9s; rectangle 0.8s; polygon 0.8s; `cubic-bezier(0.4,0,0.2,1)` so the travel is visible. Manual clicks ignore the scroll guard; auto roulette keeps it; scrolling mid-reveal calls `skipTransition`.
- Uncommitted changes: this plus title/cards/nav work. The font flip (`ui/letter-3d-swap.tsx`) now holds the outgoing face until the incoming font is loaded and its fitted size is measured; on the roll's first frame it applies the new size and hands layout width to the incoming face, so neither the type size nor the title box changes after the flip. TODO-VERIFY: Fancy Components licence (Skiper UI free licence needs attribution, added in Footer); neither is in `docs/ASSETS.md`. Titles must sit in a `flex-1 min-w-0` or block parent or the fit logic can't measure.
- Mobile keeps the View Transition reveal. The fixed header is snapshotted in its own group (mobile Chrome otherwise pulls fixed elements into the transition layer), touch scrolling is locked for the run, and Samsung Internet gets a snapshot offset by the URL-bar height because its older Chromium mis-places the snapshot containing block. Home-page project counts removed; mobile nav icon is now the animated line/dot button.

## Next (max 3)
1. Split `LuffyCakesView.tsx` (1,857 lines) into data, configurator, voucher
2. Split `StudioKloNailsView.tsx` (1,168 lines) into data, lookbook, booking
3. Split `registry.ts` (2,234 lines) into category modules + `INDEX.json`

## Decisions made (don't reopen)
- Demos: only Studio Klō (`/demo/nails`) and Luffy Cakes (`/demo/cakes`) active. Old demos moved to `archive/old-demos/`.
- Architecture map: generated via `npm run arch` -> `docs/ARCHITECTURE.md`.
- Global vs Workspace: `~/.gemini/GEMINI.md` is universal; repo `GEMINI.md` governs this project and wins on conflict.

## Open items
- CSP `style-src 'self' 'unsafe-inline'` blocks the Fontshare stylesheet (`api.fontshare.com`), so every Fontshare heading falls back to sans-serif. Needs a self-host or allowlist decision.
- TODO-VERIFY: Sole proprietorship registration in `src/config/legal.ts`.
- TODO-VERIFY: Written client permissions for Gangina and MNO.CRM.
- TODO-VERIFY: Clear rights for Pinterest demo images in `docs/ASSETS.md`.

## Done (one line each; details live in `git log`)
- Audit phases 1-6 finished (legal, privacy, pricing, security headers, honeypot).
- Installed `check-design.mjs`, `gen-arch.mjs`, `verify.mjs` and updated `package.json`.
- Archived 3,500+ lines of redundant demo code to `archive/old-demos/`.
