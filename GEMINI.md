# Developer & Design Guidelines (User Preferences)

This document contains permanent preferences, design rules, tone-of-voice constraints, and workflow requirements extracted from direct user feedback. The agent must strictly adhere to these guidelines across all tasks in this repository.

---

## 1. Identity & Tone of Voice

- **Persona:** 24-year-old independent freelance web developer & designer based in Oslo, Norway.
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

## 3. Pricing & Product Structure

- **Structure:** 2 Core Tiers + Modular Add-ons:
  1. **Tier 1: The Booking Drop (2,000 kr · One-Time · 48–72h)**
     - Strictly a 1-page mobile site targeted to Instagram creators & solo artists.
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
  - Always route inquiries to `hello@abdisalam.space`.

---

## 4. Workflow & Git Safety Rules

- **NEVER Push Without Explicit Permission:**
  - Always build, verify, and show screenshots to the user first.
  - Do NOT run `git push` until the user explicitly reviews the changes and sends a command like `"push"` or confirms they are happy.
- **Always Test Production Builds:**
  - Run `npm run build` to confirm 0 TypeScript / lint errors before asking the user for confirmation.
- **Visual Verification:**
  - Capture real browser screenshots (desktop light, desktop dark, mobile 375px) to verify styling integrity before declaring completion.
