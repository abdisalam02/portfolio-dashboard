# STATE.md: resume point (read first, keep under 30 lines)

Updated: 2026-10-26

## Now
- Task: Fixed Samsung Internet 30 and LinkedIn in-app browser theme-reveal jump in `src/components/theme-transition.ts`. Mobile/touch/Samsung/LinkedIn browsers now run a viewport-locked DOM-clone `clip-path` reveal (`circle -> rectangle -> polygon`) in `position: fixed; inset: 0` coordinates instead of Chromium's `document.startViewTransition` Snapshot Containing Block (`SCB`), while desktop browsers keep native View Transitions.
- Uncommitted changes: `src/components/theme-transition.ts`, `src/components/vt-debug.tsx`, `src/app/globals.css`, plus title/cards/nav work. TODO-VERIFY: Fancy Components licence (Skiper UI free licence needs attribution, added in Footer); neither is in `docs/ASSETS.md`.

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
