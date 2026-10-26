# Samsung Internet theme reveal — findings (read this first)

Updated: 2026-10-26 · commit: `d9ce39b` · status: instrumented build deployed, final value unknown

This is the short version. The long implementation/test guide is `docs/VT-DEBUG.md`.
The resume notes are `docs/STATE.md`.

## TL;DR

1. **Do not put `transform` on `::view-transition-group(root)`.** It *replaces* the
   transform the browser generated. Use the individual `translate` property, which
   *composes* with it.
2. `animation-name: none` on that group also removes the UA animation's
   `animation-fill-mode: both`. The safest path is to leave the UA animation in place
   and simply land on its generated "to" state (`ua-freeze`), or to compose a
   measured offset with `translate`.
3. Most likely cause of the Samsung-only jump: the **snapshot containing block (SCB)**
   starts above the visual viewport by the **top bar height D**. With no offset the
   snapshot sits D too high (up-jump). The old guess `100lvh - 100svh` also included
   the **bottom** bar, so it over-corrected (push-down). The needed value is D, not
   `lvh - svh`.
4. The build already contains the leading fix as a selectable mode. The 2-minute test
   below decides whether to promote it to the default.

## Current deployed behaviour

| URL | Behaviour |
| --- | --- |
| normal site (no flags) | production base path: **still jumps up on Samsung**, unchanged on Chrome/Safari |
| `?vtdebug=1` | on-screen debug panel, no visual change by itself |
| `?vtdebug=1&vtmode=ua-freeze` | leading candidate fix |
| `?vtdebug=1&vtmode=measured` | automatic probe + geometry correction |
| `?vtdebug=1&vtmode=overlay` | snapshot-free fallback; cannot jump by construction |

The normal site was deliberately reverted from the wrong push-down to the base path.
Nothing is broken further; the remaining Samsung jump is the original bug.

## Evidence so far

| Browser / context | Result |
| --- | --- |
| Desktop Chrome | correct |
| Android Chrome | correct |
| iPhone Safari | correct |
| Instagram in-app | correct |
| Samsung Internet 30.0.5.27 | **jumps up, then snaps back** |
| LinkedIn in-app (Samsung-backed) | same as Samsung |
| Samsung with phone dark mode off | same; **not** forced dark mode |
| Samsung with View Transition skipped | smooth; theme logic is fine |
| Samsung + old `translateY(100lvh - 100svh)` | **pushed down** instead |
| Samsung + `transform: translateY(0)` (base) | up-jump |

Samsung settings: address bar at top, second bar at bottom, version 30.0.5.27.

## Why "up" + "push down" both point to the same thing

- If the snapshot is D too high, the page appears to move **up** for the duration and
  snaps back when the live page returns.
- If a correction B is applied with `transform`, it **replaces** the generated
  transform. B = `lvh - svh` = top bar + bottom bar. Because B > D, the snapshot ends
  up **below** the correct position -> "pushed down".
- The right correction is D (the SCB-top offset) applied by **composition**, not a
  different transform.

## What is already implemented

- `src/components/theme-transition.ts` — selectable modes, measurement, overlay
  fallback. Production default is the base path.
- `src/components/vt-debug.tsx` — panel behind `?vtdebug=1`; live SCB/viewport readout,
  pseudo-element report, `-10/-1/+1/+10` calibration, `TEST` (no-op reveal),
  `STOP AUTO`, `COPY JSON`.
- `src/app/globals.css` — debug-only `overscroll-behavior` comparison.
- `Header.tsx` / `ThemeFontSwitcher.tsx` — pass the destination `--bg` for the overlay.
- `docs/VT-DEBUG.md` — every mode, every flag, full reading table.

Important implementation note: **removing a captured element at `ready` aborts the
whole transition in Chromium.** The probe is removed only in `done()`.

## The 2-minute test (this is the only thing needed now)

Wait for the Vercel deploy, hard reload Samsung Internet, then:

1. Open
   `https://agure.space/?vtdebug=1&vtmode=ua-freeze&vtslow=1`
2. Tap **STOP AUTO** (the page reloads; the query stays).
3. Tap the theme button in the header (the mobile moon/sun button).
4. Watch the top edge of the page at the moment the reveal starts and ends.

| What you see | Verdict | Next step |
| --- | --- | --- |
| No movement at all | H1 confirmed; `ua-freeze` is the fix | promote `ua-freeze` to default |
| Still moves up (same as before) | the UA's generated transform is not the missing piece | run `measured`, then manual calibration |
| Moves up but less / briefly drifts | close; needs the measured D | run `measured` |
| Pushes down | the offset sign is inverted on this build | send the JSON; do not guess |

If step 1 works, that is the whole fix. The code change is one line in
`readVtConfig()`:

```ts
// src/components/theme-transition.ts, readVtConfig()
if (params.get("vtdebug") !== "1") {
  return { ...fallback, mode: "ua-freeze" };
}
```

(That function currently returns `mode: "auto"`, which resolves to the base path.)

## If step 1 does not work

1. Open `https://agure.space/?vtdebug=1&vtmode=measured&vtslow=1`
2. Tap the theme button, then **COPY JSON**.
3. Also open `?vtdebug=1&vtmode=translate-prop&vtslow=1&vtdy=0`, tap the theme button,
   and during the slow reveal tap `+10` / `+1` until the page stops moving. Note the
   final `dy`:
   - at the top of the page (bottom bar visible)
   - after scrolling down (bottom bar retracted)
4. Send the JSON + the two `dy` values.

Useful lines in the JSON:

| Field | Meaning |
| --- | --- |
| `probe.toTy` | SCB-top offset the engine reports for a fixed element at viewport `0,0` |
| `rootGroup.staticTy` | the root group's own transform in base mode |
| `rootGroup.fromTy` / `toTy` | the UA animation's old/new transforms; if they differ the page would slide |
| `pseudo["::view-transition-group(root)"].height` | whether the root snapshot is viewport-sized or SCB-sized |
| `candidates.chrome` | `lvh - svh` (top + bottom bars) |
| `candidates.offsetTop` | `visualViewport.offsetTop` |
| `measurements` | `innerHeight`, `vvHeight`, `lvh`, `svh`, `dvh`, `scrollY`, UA |

Reading shortcuts:

- `probe ≈ 56`, `chrome ≈ 56`, `staticTy = 0`, root height ≈ `vvHeight`
  -> snapshot is D too high; use `translate: 0 56px` (or the measured D).
- root height ≈ `vvHeight + 56`
  -> root snapshot already spans the SCB; the jump is elsewhere; use
  `pin-container` or `wrapper`.
- `probe = 0` but `chrome > 0`
  -> engine treats SCB as the layout viewport; use manual `dy`.
- `fromTy ≠ toTy`
  -> the UA animation itself slides; use `ua-freeze`, not `ua`.
- `staticTy = -56`
  -> the engine's base transform is offset; compensate with `+56` via `translate`.

## What to give Gemini Argon

Point it at:

- `docs/VT-FINDINGS.md` (this file)
- `docs/VT-DEBUG.md` (all modes and flags)
- `src/components/theme-transition.ts`
- the **COPY JSON** output from the phone
- the manually calibrated `dy` values

Ask it for:

1. a final, compact `theme-transition.ts` containing only the winning path plus the
   reduced-motion / no-API fallbacks;
2. removal of every experiment mode, the probe, and the debug panel;
3. confirmation that Chrome desktop, Android Chrome and iOS Safari take the same
   production path.

## Cleanup checklist after the fix is confirmed

- [ ] promote the winning mode in `readVtConfig()` (or hard-code its CSS);
- [ ] delete the unused mode branches, `vt-debug.tsx`, `VtDebug` in `layout.tsx`,
      the probe code, `vt-overscroll` in `globals.css`, and `docs/VT-DEBUG.md`;
- [ ] keep `translate` (never `transform`) if a manual correction remains;
- [ ] `npm run verify`; the 12 design errors in `api/generate-pitch`,
      `api/send-email`, `studio`, `inspo` are pre-existing;
- [ ] retest Samsung top-of-page + scrolled, Chrome Android, iPhone Safari,
      Instagram in-app, and the theme auto-roulette;
- [ ] update `docs/STATE.md` and commit.

## References

- CSS View Transitions 1, section 4.1 (snapshot containing block):
  https://drafts.csswg.org/css-view-transitions-1/#snapshot-containing-block-concept
- Bramus, "Dealing with the Snapshot Containing Block" (2025):
  https://www.bram.us/2025/03/04/view-transitions-snapshot-containing-block/
- Section 7.9 (group styles rule) and the UA stylesheet (animation-fill-mode: both):
  https://drafts.csswg.org/css-view-transitions-1/#style-transition-pseudo-elements-algorithm
