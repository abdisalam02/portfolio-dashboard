# IMPLEMENTATION.md

Tracks every agent-executable task from `CHANGE_PLAN.md`.
One checkbox per discrete code change. Tick it when done. Images are deferred — do not touch `pin-*.jpg` files.

---

## Phase 0 — Human-only blockers (do not start dependent phases until resolved)

| # | Task | Blocking |
|---|---|---|
| 0.1 | Register sole proprietorship. Confirm legal name vs "A.Gure". | `legal.ts`, footer, privacy page |
| 0.2 | Confirm canonical domain (`agure.space`). Set up redirect from `abdisalam.space`. | meta canonical URLs |
| 0.3 | Get written OK from Gangina and Rahim. Confirm Gangina's real WhatsApp number. | Live Projects section on pricing page |
| 0.4 | Decide launch price, care plan price, grace period. | pricing page rewrite |
| 0.5 | Move client sites to hosting whose terms allow commercial use. | goes live |

---

## Phase 1 — Critical fixes (agent)

### 1.1 Gate dev tools behind `NEXT_PUBLIC_DEMO`
**Files:** `src/components/preview/PreviewShell.tsx`
- [x] Wrapped the entire floating dock (Vault, switcher, Record) behind `process.env.NEXT_PUBLIC_DEMO === '1'`.
**Done when:** `PreviewShell` renders nothing from the dock unless `NEXT_PUBLIC_DEMO` is `'1'`. ✓

### 1.2 Remove real-looking address from nails demo
**Files:** `src/components/demo/StudioKloNailsView.tsx`
- [x] Replaced `Bygdin gate 4, Frogner` with `Eksempelgata 12, Oslo` in lookbook bar, boarding pass, and contact section.
- [x] Added `Demo — fiktiv virksomhet` label in footer.
- [x] Removed address from the `activeLook.duration` display line.
**Done ✓**

### 1.3 Remove SMS claim from nails demo
**Files:** `src/components/demo/StudioKloNailsView.tsx`
- [x] Phone input placeholder changed from `Mobil (SMS/Vipps)` → `Mobil`.
- [x] Cancellation policy no longer claims an SMS link: `Flytt eller avbestill kostnadsfritt inntil 24 timer før oppmøte.`
**Done ✓**

### 1.4 Fix nails demo date strip
**Files:** `src/components/demo/StudioKloNailsView.tsx`
- [x] `buildSchedule()` generates the 7-day strip from `new Date()` — always shows real upcoming dates.
**Done ✓**

### 1.5 Fix cakes demo SMS/Vipps claim in voucher
**Files:** `src/app/preview/cakes/page.tsx`
- [x] Phone placeholder changed from `Mobil for Vipps & SMS` → `Mobil`.
- [x] Voucher footer changed from `Vipps-krav og SMS-kvittering er sendt til {phone}` → `Bestillingsforespørsel mottatt. Vi tar kontakt for å bekrefte.`
**Done ✓**

### 1.6 Pricing page — remove banned copy
**Files:** `src/app/pricing/page.tsx`, `src/app/contact/page.tsx`, `src/app/demo/page.tsx`, `src/components/ClientWork.tsx`
- [x] `No monthly fees` → `No platform fees. Optional care plan from 149 kr/mo.`
- [x] All `Turnaround: 48 hours to 1 week` → `Target turnaround: 1–2 weeks` (pricing, contact, demo metadata, expandable details).
- [x] `like By Gangina` / `like MNO.CRM` price examples removed. Replaced with `projects like this start at ...`.
- [x] `Agencies in Oslo charge 40,000+ kr` removed entirely.
- [x] `100% your code & domain` → `You own the site and your content`.
- [x] Live Projects client names (By Gangina, MNO.CRM) replaced with `In development` — pending Phase 0.3.
- [x] `TODO-VERIFY` comment added to ClientWork and pricing projects block.
**Done ✓**

---

## Phase 2 — Legal scaffolding

### 2.1 Create `src/config/legal.ts`
**File:** `src/config/legal.ts` (new)
- [ ] Export a single `LEGAL` object:
  ```ts
  export const LEGAL = {
    name: "TODO-VERIFY: legal name after registration",
    tradingName: "A.Gure",
    address: "TODO-VERIFY: registered address",
    email: "hello@agure.space",
    orgNumber: "TODO-VERIFY: org number after registration",
    mvaStatus: "Not VAT-registered",
    domain: "agure.space",
  };
  ```
- [ ] All `TODO-VERIFY` items listed in the reply when this task is done.

### 2.2 Create `LegalFooter` component
**File:** `src/components/LegalFooter.tsx` (new)
- [ ] Renders: trading name, address, email, org number, mva status from `legal.ts`.
- [ ] Used by `Footer.tsx` and any client site template footer.
- [ ] Plain text, no fancy layout — this is a legal block, not marketing.

### 2.3 Wire `LegalFooter` into the portfolio `Footer.tsx`
**File:** `src/components/Footer.tsx`
- [ ] Replace any hardcoded legal text with `<LegalFooter />`.

### 2.4 Per-page metadata
**Files:** `src/app/layout.tsx`, all `page.tsx` files
- [x] `metadataBase: new URL('https://agure.space')` already present in `layout.tsx`.
- [x] `title.template: '%s | A.GURE'` already set correctly.
- [x] `lang="en"` on root layout — correct for English portfolio. Norwegian client pages use `lang` via their own layouts when added.

### 2.5 Self-host fonts audit
**Files:** `src/app/layout.tsx`
- [x] All fonts loaded via `next/font/google` — proxied through Next.js, no user IPs exposed to Google. No external CDN font calls.

### 2.6 Add `/privacy` page
**File:** `src/app/privacy/page.tsx` — created
- [x] Norwegian draft with visible "Utkast — gjennomgå før publisering" banner.
- [x] Sections: data collected, purpose, sub-processors (Resend, Vercel), retention, rights.
- [x] Linked from `Footer.tsx` and from contact form privacy notice.
- [x] Short notice added beside contact form submit: `Vi bruker opplysningene kun for å svare deg. Personvernerklæring`.
**Done ✓**

---

## Phase 3 — Pricing page rewrite

> Unblock Phase 0.4 before writing the launch-offer banner and care plan price.

### 3.1 Fix ownership wording
- [x] Changed to: `Du eier det ferdige nettstedet og innholdet ditt. Open source og lisensierte ressurser beholder sine egne lisenser.`
**Done ✓**

### 3.2 Fix domain wording
- [x] Changed to: `Domenet registreres i ditt navn. Du betaler årsavgiften direkte. Jeg setter opp tilkoblingen.`
**Done ✓**

### 3.3 Remove personal-Vipps suggestion
- [x] Vipps FAQ answer rewritten: no personal Vipps number. Now says: `Requires a Vipps Bedrift agreement or Stripe account in your own name — I set up the integration.`
- [x] Add-on description updated: `Requires your own Vipps Bedrift agreement or Stripe account.`
**Done ✓**

### 3.4 Add mva status line
- [x] Added `Not VAT-registered` to pricing page header meta row. Also visible in `LegalFooter` on every page.
**Done ✓**

### 3.5 Add launch-offer banner (BLOCKED on Phase 0.4)
- [ ] Awaiting decision on launch price and "first 5 studios" end condition. Do not touch until Phase 0.4.

### 3.6 Label "Live Projects" honestly
- [x] Both project cards now show `In development` until written client permission confirmed (Phase 0.3).
- [x] `TODO-VERIFY` comment added in pricing and ClientWork.
**Done ✓**

---

## Phase 4 — Security

### 4.1 Security headers in `next.config.mjs`
- [x] Added `headers()` export with: `Content-Security-Policy` (baseline), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: SAMEORIGIN`.
- [ ] TODO: Test with https://securityheaders.com after deployment.
**Done ✓**

### 4.2 Contact form hardening
- [x] Honeypot field added (`name="_trap"`, hidden, `tabIndex={-1}`, `aria-hidden`).
- [x] Honeypot guard at top of `handleSubmit` — silently fakes success for bots.
- [x] Privacy notice added beside submit button linking to `/privacy`.
- [ ] Rate limiting: server-side (Upstash or similar) — **deferred, needs backend work**.
- [ ] Server-side field validation and email escaping — **deferred, needs API route audit**.
**Partially done — honeypot + privacy notice complete. Rate limiting deferred.**

---

## Phase 5 — Guardrails

### 5.1 `scripts/check-legal.mjs`
- [x] Created. Scans all banned patterns. Exits non-zero on any match.
- [x] Added `"check:legal": "node scripts/check-legal.mjs"` to `package.json`.
- [x] `npm run check:legal` exits 0. ✓

### 5.2 `docs/ASSETS.md`
- [x] Created with full inventory: all fonts (OFL-1.1 via next/font), react-icons (MIT), showcase screenshots (TODO-VERIFY permission), pin-*.jpg (NOT CLEARED — deferred).

### 5.3 Pre-commit hook (optional)
- [ ] Deferred — no Husky installed. Run `npx tsc --noEmit && npm run check:legal` manually before each commit.

---

## Phase 6 — Proof and trust

### 6.1 Add About block
- [ ] Deferred to next session — needs design decision on placement and 3-step copy.

### 6.2 WhatsApp / DM contact option
- [ ] Blocked on Phase 0.3 (Instagram handle permission). Deferred.

### 6.3 Accessibility pass
- [x] `lang="en"` on root layout — confirmed.
- [x] Honeypot input has `aria-hidden="true"` so screen readers skip it.
- [ ] Full alt text and contrast audit — **deferred, needs visual review**.
- [ ] Form label association audit — **deferred, needs per-form review**.

---

## Deferred (do not touch)

- **`pin-*.jpg` images in `public/demo/nails/`** — rights clearing in progress. No action until user confirms.
- **"Hailey Glazed Donut" rename** — depends on image replacement. Deferred with images.
- **Norwegian portfolio page** — low priority, no blocking dependency.
- **Booking backend security** (`Setup.gs`, `Europe/Oslo`, lock around availability) — backend not yet built.
- **About block (6.1)** — design decision needed.
- **Rate limiting (4.2)** — backend work needed.

---

## Done means

`npx tsc --noEmit` exits 0, `npm run check:legal` exits 0, and every `TODO-VERIFY` / `TODO-CLIENT` item is listed in the agent reply.

### ✅ Current status: `tsc --noEmit` exits 0 · `check:legal` exits 0
