# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Existing codebase: plain HTML/CSS/JS in `public/` (no framework, no build step), Express API in `server.js` run as a Vercel serverless function, Supabase (Postgres) database.

## Users
- **Teachers** (Qatari Ministry of Education schools, often on a managed, filtered school network and laptop) who award and remove points during lessons, import exam grades, and manage classes and rosters. Used mid-lesson, on a laptop, often from the front of a classroom.
- **Students** who open the site on a phone or laptop to see the leaderboard, their own points and rank, and to watch the wheel of names.

## Product Purpose
A classroom points and leaderboard site. Teachers reward students quickly; students see where they stand, which motivates them. Success: awarding points takes one tap, and the leaderboard is something students want to check.

## Positioning
Built for Arabic-first classrooms: full English/Arabic UI with proper RTL, class champions across every class at once, a spin-the-wheel name picker, and celebration moments for the top three. A generic points tracker would not have the wheel, the class-by-class champions, or the bilingual RTL experience.

## Operating Context
- Bilingual EN/AR with a language toggle; Arabic names are the real data.
- Some users sit behind the Ministry of Education web filter, which blocks sites it considers suspicious; avoid third-party scripts, fonts, or CDNs.
- Data lives in Supabase in Singapore; the host function runs in Mumbai. Pages must feel fast on a school connection.
- There is no login or passcode (explicit decision by the owner): anyone with the link can edit.

## Capabilities and Constraints
- Tabs/views: Leaderboard (podium or mystery reveal, class filter, class champions), Exam Grades (Excel/CSV import that awards points: 20 → +4, 18–19 → +3, 17 → +2), My Points, Manage Points (+1 / +5 / delete point, details modal with history/undo), Classes (create, rename, delete, bulk-add students by table or file, move/delete students), Wheel of Names.
- Existing element ids/classes are bound to `public/app.js`; behaviour must not change.
- Must work in light and dark, on phones, and with RTL.

## Brand Commitments
Maroon and gold (Qatar) are the established brand colours. The owner asked for a professional dashboard with a glassy (glassmorphism) look; Figma is optional and was not required.

## Evidence on Hand
Live data: three real classes (about 70 students, Arabic names). No testimonials or metrics to display beyond live counts computed from the data.

## Product Principles
1. Awarding points is the core action; it stays one tap and always visible to teachers.
2. Show real numbers from the data; never invent figures.
3. Arabic and English are equals: layout must mirror correctly.
4. Fast on a school network: no external requests, light assets.
5. Celebration is part of the product, but the dashboard stays calm and legible.

## Accessibility & Inclusion
RTL support is mandatory. Glass surfaces must keep text contrast readable in light and dark, and respect reduced-motion.
