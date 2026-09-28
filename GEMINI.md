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
- **Mobile-First Experience & Copy Hygiene:**
  - Touch scrolling on mobile must pass through smoothly without getting trapped.
  - Interactive iframe/website views require an explicit pause button (`❚❚ PAUSE TO SCROLL`) before manual scrolling inside the frame is unlocked.
  - Status badges must remain pinned and stationary (`z-10`), never scrolling down with website imagery.
  - All containers and forms must fit cleanly inside 375px mobile screens without horizontal overflow.
  - **The 1-to-2 Word Button Rule (Anti-Clutter):**
    - ❌ NEVER put verbose copy or prices inside buttons (e.g. `Reserver Denne Stilen (750 kr) →`). On 375px mobile screens, this causes awkward multi-line text wrapping or ugly ellipsis truncations.
    - ✅ Keep button text ultra-short and punchy: `Velg`, `Bestill`, `Reserver`, `Bekreft`. Put the price beside or above the button, not inside it.
  - **Filter Pill Hygiene:** Filter pills must be 1 word whenever possible (`Alle`, `BIAB`, `Fransk`, `Krom`, `3D`), never multi-word phrases that wrap vertically.
  - **Anti-Bloat Copy:** Eliminate unnecessary paragraphs and fluffy descriptions. Keep service items to a single crisp, scannable line.
  - **Streamlined Booking:** Never build over-complicated booking matrixes with nested boxes. 1-tap service → 1-tap date/time pill → contact → confirm.

---

## 3. Interaction Design & Usability (The "First-Build Standard")

*Lessons learned from user feedback and design revisions across booking, customizer, and portfolio showcase flows. These principles must be applied proactively on the very first build to eliminate iterative friction.*

### A. Domain-First Architecture (Products vs. Services)
- **Critical Thinking Over Pattern Copying:**
  - **Custom Physical Products (Cakes, Bouquets, Gift Boxes):** Multi-step configurators (size → sponge → filling → topping) with live 3D/preview counters make sense because the user is fabricating a tangible composite product.
  - **Personal & Studio Services (Nail Ateliers, Lash Techs, Tooth Gems, Barbers, Clinics):** **NEVER build synthetic "assembly line" wizards for personal services.** Clients book based on:
    1. **Visual Lookbook / Inspo Vault:** Browsing real sets/photos with tagged treatment & price.
    2. **Scannable Service Menu & Art Tiers:** Clear primary treatments + optional art/repair add-ons.
    3. **Live Availability (The Core Conversion Driver):** Fast date & slot matrix ("Ledige stoler denne uken").
    4. **1-Tap Luxury Studio Pass / Voucher:** Instant booking confirmation with address, Vipps, and SMS.
- **Leverage the Built-in Design & UI Component Library:**
  - Draw thoughtfully from `src/components/library/` (e.g., `BookingDateStrip`, `BookingTimeMatrix`, `BookingBoardingPass`, `WeeklyAvailabilityTicker`, `EditorialGridBooking`, `GalleryFilmstrip`, `PricingEditorialLedger`, `ArtistProfileCard`, `NewspaperPolicyGrid`).

### B. The "Zero-Scroll" Multi-Step Configurator (For Custom Products Only)
- **Compact, High-Density Selection Grids:**
  - When a product configurator IS appropriate, never design tall, sprawling cards that force endless vertical scrolling.
  - Keep option cards compact (2x2 or 2-column grids with swatches, badges, and 1-line notes) so all options fit within eye level in the viewport.
- **Immediate Action Bar:**
  - The navigation controls (`← Forrige` and `Neste Steg →`) must always sit directly beneath the compact options or remain sticky.
- **Desktop Split Console:**
  - On desktop, use a two-column layout: options grid on the left (`col-span-7`), sticky live product preview with real-time price counter on the right (`col-span-5`).

### C. Gallery Architecture (Carousels vs. Vertical Dumps)
- **Prevent Endless Downward Stacking:**
  - Auxiliary galleries (lookbooks, past orders, style examples) must **default to horizontal swipeable carousels** (`overflow-x-auto snap-x snap-mandatory scrollbar-none` with `<` and `>` arrow buttons on desktop and touch-snap on mobile).
  - Vertical stacking is reserved only for primary 2–3 tier comparisons, never for galleries that bloat page scroll depth.
- **Separate Lookbook from Choice Architecture:**
  - Never use photos of completed custom products as buttons for sizing/tier selection.
  - Use clean geometric diagrams or tier silhouettes for sizing, and dedicate photos strictly to an **Inspirasjonsgalleri / Lookbook**.

### D. Booking Logic & Real-World Domain Accuracy
- **Realistic Advance Notice Rules:**
  - Handcrafted, artisanal services require realistic lead times.
- **Interactive Calendar Integrity:**
  - Use a clean slot matrix or calendar view with day headers and real-time open/last/full statuses.
  - Show active confirmation badges when a valid time is picked.

### E. Voucher / Confirmation UX (Anti-"Monospace Dump" & Merged Image Ticket)
- **No Raw Text Dumps or Ellipsis Truncations:**
  - Order confirmation and reservation passes must never look like unstyled monospace logs or raw paragraphs.
  - Never truncate text with ellipses (`...`) in order summaries—every spec (service, shape, art tier, add-ons) must be fully visible and readable.
- **Structure confirmation vouchers like a genuine luxury ticket:**
  - Seamlessly unite the real finished product/look photo with the reservation ticket voucher.
  - Contained price pill badge (strictly bounded to prevent mobile overflow).
  - Status badge (e.g. `● RESERVASJON BEKREFTET` / `● RESERVASJON MOTTATT`).
  - Structured 2x2 grid with sharp typographic hierarchy: tiny uppercase category labels over bold values (Date, Time, Pickup/Studio Location, Total & Deposit).
  - Clear studio location card and Vipps payment confirmation.

### F. Dynamic Scroll-and-Lock Sticky Navigation
- Sticky nav header remains pinned at the top as the user scrolls.
- As the user scrolls past each section (Hero, Lookbook/Gallery, Menu/Pricing, Booking Calendar, Reviews), the center/active indicator in the nav dynamically updates to reflect the current section in view (e.g. `[GALLERI]`, `[PRISLISTE]`, `[RESERVER TIME]`).
- Brand logo stays anchored on the left; direct action/booking CTA remains accessible on the right.

### G. Bespoke Vector Icons (Flaticon-Style Aesthetic)
- ❌ Never use generic, plain monochrome line icons for product choices, lengths, nail shapes, or design tiers.
- ✅ Always use bespoke multi-tone SVG vector illustrations (Flaticon aesthetic: colored pastel fills, `#332F32` outlines, domain-accurate motifs) that instantly communicate the option at a glance.

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

- **Git Push Policy (STRICT):**
  - ❌ **NEVER `git push` automatically after tweaks or edits.**
  - ✅ **Only commit and `git push` when the user explicitly confirms they are satisfied and instructs to push.**
- **Build Policy (Fast Iteration):**
  - ❌ Do NOT run `npm run build` after every minor change or UI tweak (it slows down feedback and preview).
  - ✅ Rely on the active local dev server and run lightweight TypeScript typechecks (`npx tsc --noEmit`) to verify zero errors during iteration.
  - ✅ Only run full `npm run build` on very large structural changes or when preparing for final user-approved pushes.
- **Visual Verification:**
  - Verify styling integrity (desktop light, desktop dark, mobile 375px) on all UI changes before declaring completion.
