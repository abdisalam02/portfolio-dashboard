# STATE.md: resume point (read first, keep under 30 lines)

Updated: 2026-10-26

## Now
- Task: Fixed Samsung Internet 30 / LinkedIn theme-reveal jump and the 700ms font-revert flash during theme transitions (`src/components/theme-transition.ts`, `src/components/Header.tsx`, `src/components/ThemeFontSwitcher.tsx`). The DOM-clone overlay no longer copies `font-pair-0` onto `overlay.className` (which overrode inherited `--font-heading` with `--font-space` during the 700ms reveal) and explicitly preserves `--font-heading` and `--font-display`.
- Uncommitted changes: `src/components/theme-transition.ts`, `src/components/Header.tsx`, `src/components/ThemeFontSwitcher.tsx`. TODO-VERIFY: Fancy Components licence (Skiper UI free licence needs attribution, added in Footer); neither is in `docs/ASSETS.md`.

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
