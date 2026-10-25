# Samsung Internet View Transition investigation

Updated: 2026-10-25

Symptom: the Skiper26 theme reveal is correct on desktop Chrome, Android Chrome,
iPhone Safari and Instagram in-app, but on **Samsung Internet 30.0.5.27** (top address
bar + a second bottom bar) the page **moves up and snaps back** during a theme change.
With the old `translateY(100lvh - 100svh)` guess it **pushed down** instead. Skipping
the View Transition is completely smooth, so the theme update itself is sound.

## What the spec actually says

- View Transition pseudos are laid out in the **snapshot containing block (SCB)**.
  The SCB includes the retractable URL bar, so on mobile its origin can sit *above*
  the layout viewport (Bramus, "Dealing with the Snapshot Containing Block", 2025;
  CSS View Transitions 1, section 4.1).
- The UA's dynamic stylesheet sets each group's base `width`, `height` and `transform`
  to the **new** state, then adds an old -> new animation with
  `animation-fill-mode: both` (spec section 7.9 + UA stylesheet).
- `animation-name: none` removes the animation *and its fill*. If an engine relies on
  the animation to apply the new transform, the group falls back to the SCB origin.
- Writing `transform` on `::view-transition-group(root)` **replaces** the engine's
  transform. The individual `translate` property **composes** with it (Bramus, 2025).

That gives a ready explanation for both observations:

| setup | what happens |
| --- | --- |
| `animation-name: none`, no offset | engine's positioning is discarded, snapshot sits `D` too high -> jump up |
| `transform: translateY(100lvh - 100svh)` | replaces the (missing) transform with `B`; `B` is top **and** bottom chrome, `B > D` -> pushed down |

`lvh - svh` is the sum of every dynamic bar. The correction needed is the **SCB-top
offset**, which is normally only the top bar. So the number was too large, not just
applied in the wrong direction.

## Hypothesis ranking

1. **H1, composition / discarded UA transform (most likely).** The fix is not a
   different translate value on `transform`; it is to stop replacing the UA transform.
   Either keep the UA animation (`ua`), freeze it at its generated `to` state
   (`ua-freeze`), or apply the correction with the individual `translate` property
   (`translate-prop` / `measured`). Caveat to the original wording: for the **root**,
   the spec uses the SCB itself as the new rect, so the root's to-transform is
   normally `0` and the offset lives in the SCB origin / image size. "The root
   transform already encodes D" is therefore not guaranteed; what is guaranteed is
   that the engine's positioning must not be overwritten.
2. **H4, clip-path coordinate space (real, secondary).** The circle origin is measured
   with `getBoundingClientRect()` (viewport space) but the clip runs in the snapshot
   image's box (SCB space). It cannot cause the page shift, but once the page is
   aligned the circle can start `D` px off. Use `vtorigin=scb` to compare.
3. **H2, SCB origin / pinned container (plausible workaround).** Forcing
   `::view-transition` back to `position: fixed` with the visible viewport size is a
   legitimate A/B, but if the snapshot is already SCB-sized it crops rather than
   aligns. Lower than H1 because Chrome/Safari are fine with the default positioning.
4. **H3, named wrapper instead of root (fallback).** It avoids root special-casing,
   but the wrapper snapshot is the whole page (measured 390 x 4723 px here), so the
   clip origin becomes scroll-dependent and memory use grows. Keep as the fallback
   if root cannot be stabilised.

## Selectable modes

Add `?vtdebug=1` to turn the panel and all modes on. Nothing below runs without it.

| `vtmode=` | What it does |
| --- | --- |
| `auto` (default) | production path: `animation-name: none`, no transform. This is also the pre-offset behaviour. |
| `base` | same as auto, intended for observing D |
| `ua` | leaves the UA group animation completely alone |
| `ua-freeze` | keeps the UA's generated `to` transform but finishes its old -> new animation in the first frame, so there is no drift |
| `translate-prop` | `animation-name: none` + `translate: 0 var(--vt-dy)` (composes, never replaces) |
| `image-pair` | correction on `::view-transition-image-pair(root)` instead of the group |
| `pin-container` | `::view-transition { position: fixed; inset: 0; }` |
| `pin-container-svh` | same with `height: 100svh` |
| `pin-container-lvh` | same with `height: 100lvh` |
| `group-pinned-cover/fill/none` | freezes the group to `visualViewport` size and compares `object-fit` |
| `wrapper` | names the page `<main>` as `theme-shell`, hides `new(root)`, reveals `new(theme-shell)`; header keeps `site-header` |
| `measured` | probe + geometry measurement, correction applied on `ready` while the reveal is paused, then resumed |
| `overlay` | snapshot-free fallback: new-`--bg` overlay grows with the same shape, theme is applied at full cover, 150 ms fade |

Other flags (all only with `vtdebug=1`):

| flag | Meaning |
| --- | --- |
| `vtslow=1` | 4x longer reveal, for nudging the offset |
| `vtdy=<px>` | manual vertical offset (seed; the panel then owns it in `sessionStorage`) |
| `vtsrc=probe\|offsetTop\|chrome\|chromeCurrent` | which candidate `measured` applies (default `auto` = geometry) |
| `vtorigin=scb` | adds the SCB offset to the circle origin and reach |
| `vtoverscroll=1` | adds `overscroll-behavior: none` during the reveal for comparison |

The panel has `-10 / -1 / +1 / +10`, `RESET`, `TEST` (a no-op reveal, so the snapshot
geometry can be judged without changing colours), `STOP AUTO` (kills the 15 s
roulette and reloads), and `COPY JSON`.

## Test checklist (real phone)

Use the deployed URL. Hard reload after each deploy so the new bundle is used.

1. `https://agure.space/?vtdebug=1&vtmode=ua-freeze&vtslow=1`
   - Tap **STOP AUTO**, then the theme button in the header.
   - No jump at the start or end? -> H1 confirmed. No slow drift? -> the freeze works.
2. `?vtdebug=1&vtmode=ua&vtslow=1`
   - Same check. If this jumps but `ua-freeze` does not, keep `ua-freeze`.
3. `?vtdebug=1&vtmode=base&vtslow=1`
   - Reproduces the up-jump. Watch the top of the page at the start and end.
4. `?vtdebug=1&vtmode=measured&vtslow=1`
   - Tap the theme button, then **COPY JSON** and send it. This is the decisive run.
5. Manual calibration (only if the automatic value is wrong)
   - `?vtdebug=1&vtmode=translate-prop&vtslow=1&vtdy=0`
   - During the 3.6 s reveal, tap `+10` / `+1` until the page stops moving. Repeat at
     the top of the page (bottom bar visible) and after scrolling down (bar hidden).
   - Note the final `dy` for each state. `RESET` clears it.
6. `?vtdebug=1&vtmode=wrapper&vtslow=1` and the three `pin-container*` modes.
7. Shape origin: repeat the best mode with `&vtorigin=scb` and compare where the
   circle starts (it should grow from the theme button).
8. Scroll lock: repeat the best mode with `&vtoverscroll=1` and confirm it does not
   move the bars itself.
9. Fallback preview: `?vtdebug=1&vtmode=overlay&vtslow=1`. No snapshot is involved;
   the page cannot jump. It looks like a colour wipe followed by a 150 ms content
   cross-fade (content colours change under the overlay, not through the shape).
10. Repeat 1, 3 and 4 on Android Chrome. They must stay at `probe=0`, `geometry=0`,
    no movement.

## Reading the JSON

| Reading | Meaning | Next mode |
| --- | --- | --- |
| `probe.toTy ≈ 56`, `chrome ≈ 56`, `offsetTop = 0`, `rootGroup.staticTy = 0`, root height ≈ `vvHeight` | SCB origin is above the viewport, root group is at 0 -> snapshot is `D` too high | `translate-prop` / `measured` with `+D` |
| `probe.toTy ≈ 56`, root height ≈ `vvHeight + 56` | root snapshot already spans the SCB; base is positioned correctly | `pin-container` / `wrapper` (the jump is elsewhere) |
| `probe.toTy = 0`, `chrome > 0` | engine treats the SCB as the layout viewport; not an SCB-offset bug | `ua` / `wrapper`, calibrate `vtdy` manually |
| `rootGroup.staticTy = -56` (or any non-zero) | the engine's base transform itself is offset | add the opposite `translate` (composition) |
| `rootGroup.fromTy ≠ rootGroup.toTy` | the UA animation would slide the page | use `ua-freeze`, not `ua` |
| root height ≠ `vvHeight` | the group is not viewport-sized | `group-pinned-*` |
| `::view-transition.position = absolute`, geometry mismatch | Chromium 142+ absolute container | `pin-container*` |
| `new(root)` height ≠ group height | snapshot may be stretched/cropped | `group-pinned-fill/cover/none` |
| `vvOffsetTop > 0` | visual viewport is offset from the layout viewport | `vtsrc=offsetTop` |
| `scrollY ≠ 0` in the report | the roulette fired mid-scroll | retest at the top |

## Production path

`auto` keeps the known-good Chrome/Safari behaviour: no transform, no translate, no
probe, no variables, no report. Without `?vtdebug=1` the debug panel renders `null`
and no instrumentation code executes. The old Samsung-only `+lvh - svh` translate is
removed (it is what produced the push-down).

Once a mode is confirmed on the phone, the promotion is one line in
`theme-transition.ts`:

```ts
// readVtConfig()
if (params.get("vtdebug") !== "1") return { ...fallback, mode: "ua-freeze" };
```

or, if the measured value is stable and non-zero, make `measured` the auto path and
keep the geometry guard (it applies nothing when the probe reports 0).

## Gotcha found during the build

Removing a captured element (`#vt-scb-probe`) at `ready` **aborts the whole View
Transition in Chromium**. The probe (and any named element) must stay in the DOM until
`finished`; `done()` is the only place that removes it. This made every debug run look
like a 30 ms transition until it was fixed.
