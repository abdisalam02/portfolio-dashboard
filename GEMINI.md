# Developer & Design Guidelines (User Preferences)

This document contains permanent preferences, design rules, tone-of-voice constraints, and workflow requirements extracted from direct user feedback and retrospectives. The agent must strictly adhere to these guidelines across all tasks in this repository.

---

## 1. Identity & Tone of Voice

- **Persona:** 24-year-old independent freelance web developer & designer based in Oslo, Norway.
- **Name:** Strictly use **A.Gure** (or **A.GURE**). Never use "Abdisalam" or "Abdisalam Gure".
- **Domain & Email:** **agure.space** and **hello@agure.space**.
- **Tier 1 Demo Route:** **agure.space/demo**.
- **Target Audience:** Solo creatives, small Instagram businesses, studios, lash techs, tooth gem artists, barbers, nail artists, and independent brands.
- **Voice & Tone:**
  - Casual, straight-talking, authentic, confident, and humble.
  - Talk directly as a 1-on-1 builder: *"I build your site in a few days, keep it simple, and you talk directly with me."*
  - **Banned Words & Corporate AI Jargon:**
    - ❌ Do NOT use: *"Rates and Deliverables"*, *"100% Code Ownership"*, *"Bespoke Architecture"*, *"Magazine-grade Typography"*, *"A La Carte Upgrades"*, *"Turnkey Solutions"*, *"Industry standard"*, *"Empower your brand"*.
    - ✅ Use instead: *"What you get"*, *"Simple pricing"*, *"Add-ons"*, *"Real websites I've built"*, *"Why work with me?"*, *"No monthly fees"*.
- **Hosting Phrasing:**
  - Do NOT say "Vercel hosting" or mention specific cloud vendor names to clients.
  - Say: *"Live online link ready for your bio (or connect your own custom domain)"*.

---

## 2. Design Aesthetic & Visual Philosophy

- **Zero "AI Design" / Generic SaaS Tropes:**
  - ❌ Never use neon gradients, rainbow glowing borders, 3-box generic bento grids, oversized checkmark comparison tables, or generic tech-bro illustrations.
  - ✅ Always use clean, grounded, Scandinavian editorial design:
    - Generous whitespace and architectural breathing room.
    - Hairline borders (`border-card-border` / subtle dividers).
    - Monochrome & warm paper palettes (`#f6f5f2` paper background, `#111113` deep ink typography).
    - High contrast text, minimal noise.
- **Theme Precedence:**
  - **Light Mode (`theme-paper`) is the DEFAULT** for all first-time visitors.
  - Dual-mode toggle (`☾ DARK` / `☼ LIGHT`) must always remain functional, stored in `localStorage` (`ag_theme`).
  - Inputs, cards, and text in light mode must NEVER render with dark boxes or unreadable contrast.
- **Information Hierarchy (No Info Dumps):**
  - Keep high-priority information scannable and visible immediately.
  - Use clean expandable toggles (`View more details ⌄` / `Hide extra details ⌃`) for secondary steps and fine print.
  - **Demos and live project examples must NEVER be hidden behind toggles**—they must stay permanently visible.
- **Mobile-First Experience:**
  - Touch scrolling on mobile must pass through smoothly without getting trapped.
  - Interactive iframe/website views require an explicit pause button (`❚❚ PAUSE TO SCROLL`) before manual scrolling inside the frame is unlocked.
  - Status badges must remain pinned and stationary (`z-10`), never scrolling down with website imagery.
  - All containers and forms must fit cleanly inside 375px mobile screens without horizontal overflow.

---

## 3. Interaction Design & Usability (The "First-Build Standard")

*Lessons learned from user feedback and design revisions across booking, customizer, and portfolio showcase flows. These principles must be applied proactively on the very first build to eliminate iterative friction.*

### A. The "Zero-Scroll" Multi-Step Configurator
- **Compact, High-Density Selection Grids:**
  - Never design multi-step builders with tall, sprawling cards that force users to scroll hundreds of pixels down to see options and scroll back up or down to continue.
  - Keep option cards compact (2x2 or 2-column grids with swatches, badges, and 1-line notes) so all options fit within eye level in the viewport.
- **Immediate Action Bar:**
  - The navigation controls (`← Forrige` and `Neste Steg →`) must always sit directly beneath the compact options or remain sticky. Users must never have to search below the fold to advance.
- **Desktop Split Console:**
  - On desktop, use a two-column layout: options grid on the left (`col-span-7`), sticky live product preview with real-time price counter and ingredient chips on the right (`col-span-5`).

### B. Gallery Architecture (Carousels vs. Vertical Dumps)
- **Prevent Endless Downward Stacking:**
  - Auxiliary galleries (lookbooks, past orders, style examples) must **default to horizontal swipeable carousels** (`overflow-x-auto snap-x snap-mandatory scrollbar-none` with `<` and `>` arrow buttons on desktop and touch-snap on mobile).
  - Vertical stacking is reserved only for primary 2–3 tier comparisons, never for galleries that bloat page scroll depth.
- **Separate Lookbook from Choice Architecture:**
  - Never use photos of completed custom products as buttons for sizing/tier selection (e.g. photos of finished cakes for choosing 10cm vs 20cm). Users assume these are fixed pre-made items.
  - Use clean geometric diagrams or tier silhouettes for sizing, and dedicate photos strictly to an **Inspirasjonsgalleri / Lookbook**.

### C. Dual-Path Customer Journeys (Custom vs. 1-Click)
- Always provide two clear paths at the top of an ordering experience:
  1. **Path A (The Customizer):** Guided step-by-step wizard for clients who want full control over each layer/spec.
  2. **Path B (The Quick Pick):** 3–4 popular pre-assembled signature combinations that lock in selections and jump directly to date/checkout with 1 tap for time-pressed customers.

### D. Booking Logic & Real-World Domain Accuracy
- **Realistic Advance Notice Rules:**
  - Handcrafted, artisanal services (e.g. custom celebration cakes, couture nails, bridal henna) require realistic lead times (e.g. minimum 7 days notice, not 2 days).
- **Interactive Calendar Integrity:**
  - Use a full month calendar view with day headers (`Man – Søn`) and month navigation.
  - Clearly disable and cross out dates that fail the advance notice rule or lie in the past.
  - Show active confirmation badges when a valid date is picked (e.g. `✓ Oppfyller 7 dagers forhåndsvarsel`).

### E. Voucher / Confirmation UX (Anti-"Monospace Dump")
- **No Raw Text Dumps:**
  - Order confirmation and reservation passes must never look like unstyled monospace logs or raw paragraphs.
  - Structure confirmation vouchers like a genuine luxury ticket:
    - Contained price pill badge (strictly bounded to prevent mobile overflow).
    - Status badge (e.g. `● RESERVASJON BEKREFTET`).
    - Structured 2x2 grid with sharp typographic hierarchy: tiny uppercase category labels over bold values.
    - Clear pickup/delivery location card and Vipps payment confirmation.

---

## 4. Asset Integrity & Visual QA Protocol

- **Mandatory Visual Sanity Check:**
  - Never blindly map image filenames (e.g. `cake-6.jpg`) without confirming that the image content matches the niche and description. (e.g. Never put a croissant image on a celebration cake page).
  - Only use high-quality, verified photos that reflect the artisanal niche.
- **375px Mobile Boundary Enforcement:**
  - Check that all floating price tags, action buttons, and table rows remain strictly contained inside card borders on small mobile screens.
  - Never use fixed pixel widths that cause horizontal scrolling or text overlap.

---

## 5. Pricing & Product Structure

- **Structure:** 2 Core Tiers + Modular Add-ons:
  1. **Tier 1: The Booking Drop (2,000 kr · One-Time · 48h to 1 Week)**
     - Strictly a 1-page mobile site targeted to Instagram creators & solo artists.
     - Client fills out a short questionnaire picking what they want (layout, colors, services, photos).
     - Replaces "DM to book" with a transparent price list, 1-tap booking, and 6-photo lookbook.
     - Extra pages or custom domains are explicit add-ons.
  2. **Tier 2: The Studio Website (5,500 – 12,500 kr · Scope Range · 1–2 Weeks)**
     - Multi-page custom site for established studios, clinics, and luxury ataliers.
     - Transparent range: Standard Studio (~6,000 kr, e.g. *By Gangina*) up to Custom Flagship (~12,500 kr, e.g. *MNO.CRM*).
  3. **Add-Ons:**
     - Deposit Payments (Vipps / Cards): `+1,200 kr`
     - Admin Page to Manage Hours: `+1,500 kr`
     - Extra Dedicated Page: `+800 kr`
     - Custom Domain (.no / .com): `+600 kr`
     - Monthly Updates: `+250 kr / mo`
- **Contact Sync:**
  - Package links must synchronize directly to `/contact?package=...` and pre-select the appropriate tier pill.
- **Professional Contact:**
  - Always route inquiries to `hello@agure.space`.

---

## 6. Workflow & Git Safety Rules

- **Git Push Policy:**
  - Standard updates, route additions, bug fixes, copy revisions, and visual refinements can be pushed automatically once verified with a clean `npm run build`.
  - **Only ask for explicit permission before pushing** if the changes are **very critical, involve major architectural/database breaking changes, or touch a massive number of files**.
- **Always Test Production Builds:**
  - Always run `npm run build` to confirm 0 TypeScript / lint errors before pushing or declaring completion.
- **Visual Verification:**
  - Verify styling integrity (desktop light, desktop dark, mobile 375px) on all UI changes before declaring completion.
