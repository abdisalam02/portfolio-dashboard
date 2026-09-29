# DESIGN.md: read only when changing UI

## Look
- Clean, grounded Scandinavian editorial. Generous whitespace, hairline borders, high-contrast text, minimal noise.
- Palette: paper `#f6f5f2`, ink `#111113`. Warm, monochrome.
- No neon gradients, glowing rainbow borders, generic 3-box bento grids, oversized checkmark tables or tech-bro illustrations.

## Theme
- Light (`theme-paper`) is the default for first-time visitors.
- Toggle `DARK` / `LIGHT` always works, stored in `localStorage` as `ag_theme`.
- Light mode never shows dark input boxes or unreadable text.

## Mobile (375px is the hard limit)
- No horizontal overflow. No fixed pixel widths. Price tags, buttons and table rows stay inside their cards.
- Touch scroll passes through. Embedded site previews need a `PAUSE TO SCROLL` button before inner scrolling unlocks.
- Status badges stay pinned (`z-10`) and don't scroll with images.

## Copy & controls
- Buttons: 1-2 words (`Velg`, `Bestill`, `Reserver`, `Bekreft`). Prices go beside or above, never inside.
- Filter pills: 1 word (`Alle`, `BIAB`, `Fransk`, `Krom`, `3D`).
- One crisp line per service. No filler paragraphs.
- Secondary info goes behind `View more details`. Demos and live examples are never hidden behind toggles.
- Never truncate order or booking details with ellipses.

## Booking: match the domain
- **Personal services** (nails, lashes, tooth gems, barbers, clinics): no assembly-line wizards. Flow is: lookbook → scannable menu with add-ons → live availability → 1-tap slot → contact → confirm.
- **Custom products** (cakes, bouquets, gift boxes): a multi-step configurator is fine (size → sponge → filling → topping → date). Keep option cards compact (2-column), nav buttons directly under the options, and on desktop a sticky live preview with a running price.
- Respect realistic lead times (for example 7 days for custom cakes).
- Calendar shows day headers and open / last / full states, with a clear badge when a slot is picked.
- Booking copy must match what the site really does: instant confirmation only if there is real availability logic. Otherwise say "request".

## Confirmation voucher
- Styled like a ticket, never a monospace dump. Product photo joined to the ticket, price pill contained, status badge (`RESERVASJON MOTTATT` for requests, `BEKREFTET` only after the owner accepts).
- 2x2 grid: date, time, location, total and deposit. Studio location card and payment note.
- Don't promise SMS or email links unless they are built.

## Galleries
- Default to horizontal swipe carousels (`overflow-x-auto snap-x snap-mandatory`), arrows on desktop. Vertical stacking only for 2-3 tier comparisons.
- Lookbook photos aren't option buttons. Use diagrams or silhouettes for sizes and tiers.

## Sticky nav
- Pinned header, logo left, booking CTA right. Centre indicator follows the section in view (`GALLERI`, `PRISLISTE`, `RESERVER TIME`).

## Icons
- Original multi-tone SVGs: pastel fills, `#332F32` outlines, domain-accurate motifs. Draw them. Don't download Flaticon/Freepik assets unless the licence and attribution are recorded in `docs/ASSETS.md`.

## Asset QA
- Check that each image really matches its niche and caption (no croissant on a celebration cake page).
- Only cleared assets from `docs/ASSETS.md`. Demo content is fictional and labelled as such.
- Dev controls (customizer, Vault, Record, mode toggles) exist only when `NEXT_PUBLIC_DEMO === '1'`.
