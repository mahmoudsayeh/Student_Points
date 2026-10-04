<div align="center">
  <h1>🏆 Student Points</h1>
  <p><strong>A lightweight, bilingual (Arabic/English) classroom points &amp; leaderboard app</strong></p>
</div>

Teachers create classes and add students (by hand, a bulk list, or an uploaded Excel/CSV file), then award points — manually, or automatically from an uploaded exam-grades file. Students can look up their own points and rank. Includes a class leaderboard with a podium/mystery-reveal view, a "spin the wheel" random name picker, and a passcode gate on anything that changes points.

## Tech stack

- **Backend**: Node.js + Express
- **Database**: [Supabase](https://supabase.com) (Postgres)
- **Frontend**: Plain HTML/CSS/JavaScript — no framework, no build step
- **File parsing**: [SheetJS (`xlsx`)](https://www.npmjs.com/package/xlsx) for Excel/CSV uploads, via [`multer`](https://www.npmjs.com/package/multer)
- **Hosting**: Deployable as a normal Node server, or as a single [Netlify Function](https://docs.netlify.com/functions/overview/) (via `serverless-http`) with the frontend served as static files

## Features

- **Leaderboard** — podium or "mystery reveal" view, filterable by class, with a "Class Champions" overview showing every class's top 3 at once
- **My Points** — students pick their name to see their total, rank, and point history
- **Manage Points** (passcode-gated) — add/remove points per student with a reason, set an exact total, undo any history entry
- **Classes** — create/rename/delete classes, add students one at a time, in bulk, or by uploading an Excel/CSV file (one name per row), move a student between classes, delete a student
- **Exam Grades** (passcode-gated) — upload a grades file (`Name, Grade` columns, grade out of 20) for a class; points are awarded automatically: 20 → +4, 18–19 → +3, 17 → +2
- **Wheel of Names** — spin to pick a random student, optionally filtered to one class
- Fully bilingual UI (English / Arabic, RTL-aware), toggle in the top bar

## Project structure

```
server.js                   Express app (all API routes)
public/                      Frontend — index.html, app.js, styles.css
netlify/functions/api.js     Wraps server.js as a single Netlify Function
netlify.toml                 Netlify build/publish/redirect config
supabase-schema.sql          Run once in Supabase's SQL Editor to create the tables
migrate-to-supabase.mjs      One-time script to migrate data from an old local SQLite file
.env.example                 Template for the environment variables below
```

## Environment variables

Copy `.env.example` to `.env` and fill in real values:

| Variable | Where to find it |
|---|---|
| `SUPABASE_URL` | Supabase project → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page — **service role** key (server-side only, never expose this to a browser) |
| `MANAGE_PASSCODE` | Pick your own — gates the Manage Points and Exam Grades tabs |

## Running locally

1. Create a Supabase project, then open its SQL Editor and run everything in [`supabase-schema.sql`](supabase-schema.sql) once.
2. `npm install`
3. Copy `.env.example` → `.env` and fill it in.
4. `node server.js` (or `npm start`)
5. Open `http://localhost:4100`

If you have existing data in an old local SQLite file from a previous version of this project, see `migrate-to-supabase.mjs` for a one-time import script.

## Deploying on Netlify

This repo is already set up for Netlify — no build step is needed (the frontend is static, the backend is one function):

1. Connect this repo to a new Netlify site.
2. In **Site configuration → Environment variables**, add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `MANAGE_PASSCODE` (same values as your local `.env` — Netlify never sees your local `.env` file, it's gitignored).
3. Deploy. `netlify.toml` already configures:
   - `public/` as the static publish directory
   - `netlify/functions/` as the functions directory
   - a redirect so every `/api/*` request reaches the function
4. Node version is pinned to 22 via `.nvmrc` (required by the Supabase client library).

## Security notes

- The `MANAGE_PASSCODE` gate is intentionally simple (a single shared passcode, checked both client- and server-side). Good enough for a classroom tool; don't rely on it for anything higher-stakes.
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses all database security rules — it must only ever live in server-side environment variables, never in frontend code or a public repo.
- Uploaded files (Excel/CSV) are parsed with the `xlsx` npm package, which has known security advisories (prototype pollution / ReDoS) for maliciously crafted files. Acceptable for trusted classroom use; worth revisiting if this is ever opened up to untrusted uploads.
