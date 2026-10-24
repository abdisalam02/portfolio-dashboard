# STATE.md: resume point (read first, keep under 30 lines)

Updated: 2026-10-24

## Now
- Task: Clamped mobile headings (`GOT A PROJECT IN MIND?`, etc.) to prevent horizontal overflow on font switch; fixed homepage scroll fighting (`overflowAnchor: none`, native scroll); sorted Wada palettes by luminance for smooth +1/-1 brightness stepping; locked `/library`, `/customizer`, `/inspo`, `/demo/*`, `/preview/*`, and `/studio` behind server-verified `StudioPinGate`.
- Uncommitted changes: Hero/body/page heights `dvh` -> `svh` to stop mobile address-bar resize jitter. Decision: page-level heights use `svh` (overrides the global "use dvh" rule for this case).

## Next (max 3)
1. Split `LuffyCakesView.tsx` (1,857 lines) into data, configurator, voucher
2. Split `StudioKloNailsView.tsx` (1,168 lines) into data, lookbook, booking
3. Split `registry.ts` (2,234 lines) into category modules + `INDEX.json`

## Decisions made (don't reopen)
- Demos: only Studio Klō (`/demo/nails`) and Luffy Cakes (`/demo/cakes`) active. Old demos moved to `archive/old-demos/`.
- Architecture map: generated via `npm run arch` -> `docs/ARCHITECTURE.md`.
- Global vs Workspace: `~/.gemini/GEMINI.md` is universal; repo `GEMINI.md` governs this project and wins on conflict.

## Open items
- TODO-VERIFY: Sole proprietorship registration in `src/config/legal.ts`.
- TODO-VERIFY: Written client permissions for Gangina and MNO.CRM.
- TODO-VERIFY: Clear rights for Pinterest demo images in `docs/ASSETS.md`.

## Done (one line each; details live in `git log`)
- Audit phases 1-6 finished (legal, privacy, pricing, security headers, honeypot).
- Installed `check-design.mjs`, `gen-arch.mjs`, `verify.mjs` and updated `package.json`.
- Archived 3,500+ lines of redundant demo code to `archive/old-demos/`.
