# UI Component Library & Customizer Plan (A.Gure)

This is the master architectural and design plan for building the **A.Gure Component Customizer**—a Pinterest-style library showcasing 10-15 unique variations for each UI section of your template. 

## 1. Research & Vibe Definition
I researched high-end editorial and minimalist UI hubs (SiteInspire, Minimal Gallery, Refs.Gallery, and Mobbin) to gather diverse, non-AI structural patterns. 

**The constraints for all components:**
- **No generic AI tropes** (no neon gradients, bento-box filler, or soft shadows).
- **Strict Scandinavian/Editorial aesthetic:** High contrast (ink on paper), sharp borders, intentional whitespace.
- **Fluid & Mobile-Ready:** Everything must scale down to a 375px viewport gracefully.

---

## 2. Page Architecture (The "Pinterest" View)
To display ~75 different components on a single page without it looking like a chaotic mess, we will use a **Filterable Swimlane & Grid Layout**.

- **Sidebar Navigation:** A sticky left-hand menu to jump between categories (Navigations, Heroes, Typography, Imagery, Accordions).
- **The Display Canvas:** A light-grey `#f6f5f2` backdrop.
- **The Layout Structure:** 
  - Instead of a vertical stack that takes hours to scroll, each category will use a **Masonry Grid** (like Pinterest) or a **Horizontal Scroll Snap** (like Netflix rows). 
  - Each component is rendered inside a "Frame" (a bordered box resembling a mini-browser window) to keep them evenly spaced and isolated from one another.
- **Interactivity:** Hovering over a component reveals its name (e.g., "The Brutalist Grid") and a button to `< Copy Code >` or `< Select for Template >`.

---

## 3. The Component Inventory

### A. Navigations (15 Styles)
1. **The Classic Split:** Logo left, links right. (Standard, clean).
2. **The Center Pill:** Floating navigation pill, sharp borders, dropshadow.
3. **The Bottom Dock:** Mobile-first, fixed at the bottom of the screen like iOS.
4. **The Editorial Stack:** Logo centered on top, links centered on the line below.
5. **The Brutalist Grid:** Hairline borders separating the logo, links, and CTA button into distinct grid cells.
6. **The Hidden Burger:** Ultra minimal. Just a logo and a clean `[ = ]` icon that opens a full-screen menu.
7. **The Vertical Spine:** A fixed left-hand column that stays pinned while the right side scrolls.
8. **The Marquee Nav:** A continuous scrolling text ticker sitting just above the main nav.
9. **The Underline Hover:** Links are naked until hovered, revealing a thick, aggressive underline.
10. **The Monospace Data:** Tech/utility vibe. Uses monospace fonts, displaying exact local time or coordinates next to links.
11. **The Corner Anchors:** Nav items pushed to the 4 extreme corners of the screen.
12. **The Oversized Dropdown:** Clicking "Menu" drops down a massive panel covering 80% of the screen.
13. **The Two-Tone:** The nav background splits 50/50 down the middle with contrasting colors.
14. **The Minimalist Shop:** Focused purely on commerce: Logo, Cart (0), and a Search icon.
15. **The Sticky Tab:** A literal folder tab shape that sticks to the top edge of the screen.

### B. Headers / Heroes (15 Styles)
1. **The Big Ink:** Massive 120px typography taking up the whole screen. Zero images.
2. **The Split Screen:** Left side is pure text, right side is a full-bleed vertical image.
3. **The Floating Card:** An image inside a sharp, centered card with text overlapping the edge.
4. **The Cinematic Full-Bleed:** Image covers 100% of the viewport; text sits subtly at the very bottom.
5. **The Editorial Column:** 3 thin columns of text, styled like a physical newspaper or magazine.
6. **The Brutalist Outline:** Hollow, outlined typography that fills with solid ink on hover.
7. **The Floating Vignette:** A small, precise 4:5 image floating in a sea of white space.
8. **The Product Focus:** A cut-out PNG of a product hovering over a stark, geometric shape.
9. **The Video Loop:** A muted, grainy background video with clean white text overlaid.
10. **The Stacked Steps:** Huge numbers (01, 02, 03) paired with snappy value propositions.
11. **The Grid Gallery:** A tight, 4-panel masonry collage of images serving as the background.
12. **The Asymmetric:** Text is pushed far left, while the image bleeds off the right edge of the screen.
13. **The Minimal Form:** Just a massive title and a single email input to capture leads instantly.
14. **The Scroll Prompt:** Huge text cut off by the bottom of the screen, forcing the user to scroll to read it.
15. **The Layered Collage:** Images overlapping each other slightly, like physical photos tossed on a table.

### C. Typography & Titles (10 Styles)
1. **The Sharp Grotesk:** Clean, tight sans-serif (Inter/Helvetica style).
2. **The High-Fashion Serif:** Dramatic, thin serifs with high contrast.
3. **The Monospaced System:** Typewriter aesthetic for a raw, unpolished feel.
4. **The Mixed Italic:** *Specific words* in a sentence are italicized for emphasis.
5. **The Super-Tracking:** All caps, extremely spaced out letters (L I K E  T H I S).
6. **The Highlighted Marker:** Text with a solid block of color drawn behind it.
7. **The Paragraph Lead-in:** The first word or letter of the paragraph is massive (Drop Cap).
8. **The Hanging Indent:** The first line hangs to the left, editorial style.
9. **The Subdued Grey:** Main title is ink black, subtitle is a very light, whisper-quiet grey.
10. **The Inline Image:** Small thumbnail images placed directly *inside* a sentence.

### D. Image Displays & Galleries (10 Styles)
1. **The Filmstrip:** A continuous horizontal scrolling strip of images.
2. **The Perfect Masonry:** Interlocking images of different heights without gaps.
3. **The Hover-Reveal:** A blank screen or list of text where images appear attached to your cursor on hover.
4. **The Staggered Grid:** Images placed seemingly at random, breaking the standard grid layout.
5. **The Polaroids:** Images with thick white borders and handwritten captions underneath.
6. **The Full-Bleed Scroll:** Huge vertical images stacked directly on top of each other.
7. **The Carousel Drag:** A sleek, dot-less carousel you can click and drag through.
8. **The Blueprint:** Images rendered in greyscale or duotone until hovered.
9. **The Split Hover:** Two images side-by-side; hovering one shrinks the other.
10. **The Expanding Card:** Clicking a small thumbnail expands it to take over the screen.

### E. Dropdowns / Accordions (FAQ/Data) (10 Styles)
1. **The Hairline Divider:** Very thin top/bottom borders, text turns bold when open.
2. **The Solid Box:** The accordion is a solid colored block that expands.
3. **The Floating Card:** Accordion items are separate cards with space between them.
4. **The Plus / Minus:** Uses massive + and - symbols instead of standard arrows.
5. **The Arrow Rotate:** A sharp geometric arrow that snaps 180 degrees.
6. **The Numbered List:** 01, 02, 03 prefixes before the accordion title.
7. **The Hover Expand:** It opens just by hovering (no clicking required).
8. **The Side-by-Side:** Title on the left, expanding content on the right (2-column layout).
9. **The Marquee Expand:** Opening it reveals scrolling text instead of static text.
10. **The Tooltip Pop:** Instead of pushing content down, the answer pops up floating above the title.

---

## 4. Technical Implementation Path
1. **Component Registry:** We will build a central `components/registry/` folder containing sub-folders for `navs`, `heroes`, etc.
2. **Dynamic Rendering:** The Customizer page will map through this registry and render them inside fixed-height `iframe` or `div` wrappers so their styles don't conflict.
3. **Theme Sync:** All 60+ components will respect the global `theme-paper` and `theme-dark` variables instantly.
