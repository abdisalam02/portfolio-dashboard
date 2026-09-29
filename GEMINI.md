# GEMINI.md: A.Gure workspace rules

Always-on core. Keep it short. Details live in `docs/` and load only when the task needs them.

| File | Read when |
|---|---|
| `docs/DESIGN.md` | changing UI, layout, components |
| `docs/PRICING.md` | touching prices, offers, packages, marketing copy |
| `docs/ASSETS.md` | adding or changing any image, icon, font, logo, 3D model |
| `docs/CHANGE_PLAN.md` | active task list: tick items, don't rewrite it |

## 0. Working rules (save tokens)
1. Search first (grep/glob), then open files by line range. Never load whole folders, lockfiles or build output.
2. Edit in place with minimal diffs. Never regenerate a whole file to change a few lines.
3. Plan in at most 10 lines, then work. Final reply at most 8 lines: what changed, which files, open items.
4. Verify with `npx tsc --noEmit` and `npm run check:legal`. No `npm run build` or screenshots unless the change is structural or I ask.
5. Don't paste long code or diffs into chat. Point to paths.
6. If blocked by a stop gate (section 3), ask one question. Otherwise state your assumption in one line and continue.
7. If a rule here conflicts with a request, follow the rule, say so in one line, and offer the compliant option.

## 1. Identity & voice
- Name: **A.Gure** only. Domain `agure.space` (canonical), email `hello@agure.space`. Oslo, Norway. Freelance sole proprietor.
- Legal details (name, address, org number, mva status) come from `src/config/legal.ts`. Never hardcode them per page.
- Voice: casual, direct, 1-on-1 builder. Short sentences. Client sites and demos in Norwegian (bokmål). Portfolio in English with a Norwegian option.
- Avoid: "Rates and Deliverables", "100% Code Ownership", "Bespoke Architecture", "Magazine-grade", "A La Carte", "Turnkey", "Industry standard", "Empower your brand".
- Prefer: "What you get", "Simple pricing", "Add-ons", "Real websites I've built", "Why work with me?".
- Marketing copy doesn't name hosting vendors ("live link for your bio, or your own domain"). Privacy policy and contracts must name the real sub-processors.

## 2. Honesty & claims (non-negotiable)
- Never invent: testimonials, reviews, clients, results, stats, awards, "as seen in", prices a client paid, addresses, phone numbers, org numbers.
- Every factual claim on a page must be true and provable on publish day. Otherwise remove it or mark `TODO-VERIFY` and list it in your reply.
- No comparative or superlative claims ("agencies charge 40,000+", "fastest", "guaranteed") without a source in a code comment beside the claim.
- Call a site **live** only if it is publicly launched and the client gave written permission to show it. Otherwise label it "In development" or "Demo".
- "No monthly fees" only where it is true for that package. Use: "No platform fees. Optional care plan from X kr/mo."
- Ownership wording: "You own the finished site and your content. Open-source and licensed assets keep their own licences."
- Turnaround wording: "Target 1-2 weeks." No "48 hours" until timed builds prove it.
- A "launch price" must point to a real normal price I will charge, with an end condition (for example "first 5 studios").
- Health, safety, certification or product claims ("safe for enamel", "HEMA-free", "certified") only if the client supplied proof. In demos use neutral fictional wording.
- Prices in NOK. Show mva status ("Not VAT-registered" until that changes).

## 3. Stop gates (ask before doing)
- `git push`, deploys, or publishing anything.
- Adding any third-party script, pixel, analytics, embed (Instagram, TikTok, YouTube, Maps), CDN font or widget.
- Using any image, logo, icon or model not listed in `docs/ASSETS.md`.
- Changing prices, terms, privacy text or any legal wording.
- Collecting new personal data, or touching payments (Vipps/Stripe).
- Deleting files.

## 4. Assets & licensing
- Allowed: my own photos; client photos with written permission; AI-generated images (no real people, brands or celebrities); stock with a licence that allows commercial web use.
- Forbidden: Pinterest, Instagram, Google Images, TikTok, other people's sites, or hotlinking any third-party image host. No celebrity names or likenesses in copy or service names. No Flaticon/Freepik downloads unless licence and attribution are recorded (draw originals instead).
- Every image, font, icon set, logo or 3D model needs a row in `docs/ASSETS.md`: file | source | licence | attribution | permission proof | date.
- Keep CC-BY attribution visible (title, author, link, licence link).
- Don't name files after their source (`pin-*.jpg`). Rename only after rights are cleared.
- Demos are fictional businesses: `hello@example.com`, "+47 000 00 000", no real address, handle or org number. Show a "Demo, fictional business" label.

## 5. Legal, privacy & security defaults (every site)
- Footer legal block on every page: business name, address, email, org number, mva status (Norwegian e-commerce law).
- Privacy page, plus a short notice beside every form. Collect the minimum and say who receives it.
- No non-essential cookies or trackers by default. Self-host fonts. A theme choice in `localStorage` (`ag_theme`) is fine. Anything else needs my approval and a consent solution.
- Forms: honeypot plus rate limit (or Turnstile), server-side validation, escape all user text in emails and HTML.
- Dev tools never ship: customizer panels, "Vault", "Record", mode toggles. Gate them behind `NEXT_PUBLIC_DEMO === '1'`. Also never ship `href="#"`, invalid `mailto:` links or placeholder data.
- Secrets never in client code or the repo. Passcodes and tokens live server-side, hashed. OTPs expire and have an attempt limit. Accept/Decline email links open a confirm page and change state only on POST.
- Vipps: businesses need their own Vipps business agreement. Never suggest a personal Vipps number. Cards via Stripe on the client's own account.
- Booking terms (cancellation, deposit, refunds) belong to the client. Use `TODO-CLIENT` placeholders. Any legal text I generate is a draft marked "Review before use".
- Internal note: client sites need hosting whose terms allow commercial use.
- Accessibility basics: `lang="nb"`, alt text, contrast at least 4.5:1, visible focus, labelled inputs.

## 6. Git & build
- Never `git push` unless I explicitly say so. Commit only when I ask.
- No `npm run build` after small edits. Use the dev server and `npx tsc --noEmit`. Full build only for big structural changes or approved pushes.
- Check desktop light, desktop dark and 375px mobile before saying a UI change is done.

## 7. Done means
Type check passes, `npm run check:legal` passes, and every `TODO-VERIFY` / `TODO-CLIENT` item is listed in the reply.