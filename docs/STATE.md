# STATE.md: resume point (read first, keep under 30 lines)

Updated: 2026-10-26

## Now
- Task: Fixed contact input flicker during theme transitions (applied `nextSnap` directly to `bodyClone`, removed `transition: background-color 0.75s` on body, scoped input transitions to border/shadow); implemented Skiper UI's `blur` option (`blur(8px)` -> `blur(4px)` -> `blur(0px)`) across mobile and desktop theme reveals (`src/components/theme-transition.ts`, `src/app/globals.css`, `src/app/contact/page.tsx`).
- Uncommitted changes: `src/components/theme-transition.ts`, `src/app/globals.css`, `src/app/contact/page.tsx`. TODO-VERIFY: Fancy Components & Skiper UI entries in `docs/ASSETS.md`.

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
