---
version: 1
slug: "public-index-html"
primary_target: "public/index.html"
related_targets: []
---

# Surface brief: Student Points dashboard (public/index.html)

Mode: Operate. Teachers award points mid-lesson on a laptop; students check rank on a phone. Constraints: EN/AR with RTL, light + dark, no external requests, fast on a filtered school network, no passcode, all ids/classes used by app.js preserved.

## Direction contract

THESIS: A glass operations dashboard in Qatari maroon and gold: frosted panels floating over a rich wine backdrop, replacing the flat pill-nav card app.
OWN-WORLD: Wine/maroon field with soft gold light and a faint eight-point-star lattice (CSS/SVG data URI); frosted panels (blur, hairline white edge, inner highlight); gold-pill active state; system font, tabular numerals; rows flat inside panels, blur only on few big surfaces.
STORY: Teachers see the whole class at a glance and act in one tap; students see their rank instantly.
FIRST VIEWPORT: Desktop: glass left sidebar (logical start side, flips in RTL) with brand, six nav items, language toggle; main column opens with a page title, a row of four stat cards (students, classes, total points, top class), then class chips, podium, ranked list. Phone: slim top bar, bottom glass tab bar.
FORM: Brief-pinned by the user (glass dashboard, left sidebar, stat cards); no concept roll; seed: none (user-pinned direction).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
