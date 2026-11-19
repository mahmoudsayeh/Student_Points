import express from "express";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import buildTimeEnv from "./runtime-env.js";

// `import.meta.url` is emptied out by Netlify's CommonJS function bundler; fall back to cwd
// there rather than crash — that build only ever calls the API routes, never express.static.
let __dirname;
try {
  __dirname = path.dirname(fileURLToPath(import.meta.url));
} catch {
  __dirname = process.cwd();
}

// Runtime env first, then the values captured at build time (see scripts/write-runtime-env.mjs).
// Values are trimmed and stripped of wrapping quotes, a common copy/paste slip in host dashboards.
function readEnv(name) {
  return String(process.env[name] || buildTimeEnv[name] || "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

const SUPABASE_URL = readEnv("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = readEnv("SUPABASE_SERVICE_ROLE_KEY");

function describeConfigError() {
  const missing = [
    ["SUPABASE_URL", SUPABASE_URL],
    ["SUPABASE_SERVICE_ROLE_KEY", SUPABASE_SERVICE_ROLE_KEY],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);
  if (!missing.length) return null;

  // Only variable *names* are reported, never values, so a typo'd name is easy to spot.
  const similar = Object.keys(process.env).filter(
    (k) => /supa|service|role/i.test(k) && !["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"].includes(k)
  );
  const hint = similar.length
    ? `Similar names the server can see: ${similar.join(", ")} — rename to match exactly.`
    : `The server can't see ${missing.length > 1 ? "them" : "it"}: check ${missing.length > 1 ? "they were" : "it was"} added to this site (Site configuration → Environment variables), then redeploy. The Netlify deploy log lists which ones it found.`;
  return `Missing ${missing.join(" and ")} — check your .env / host environment variables. ${hint}`;
}

// Not thrown at load time: in a Netlify Function that only surfaces as an opaque 502. Instead every
// API request answers with this message (see the middleware below), so the page can show it.
const configError = describeConfigError();
if (configError) console.error(configError);

const supabase = configError ? null : createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Turns a thrown error (often a Supabase/PostgREST error) into a message the page can display.
function describeError(err) {
  const message = err?.message || String(err || "") || "Server error";
  return err?.hint ? `${message} (${err.hint})` : message;
}

const AVATAR_COLORS = ["#8A1538", "#1E88A8", "#2E7D32", "#B8860B", "#6A4C93", "#C2410C", "#2563EB", "#BE185D"];

function randomAvatarColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

// Lists are cached at the host's edge for a short time so most visitors skip the database round trip.
// The page adds ?w=<last write time> after its own writes, so the person who just edited never sees stale data.
const LIST_CACHE = "public, s-maxage=30, stale-while-revalidate=300";

// Wraps an async route handler so a rejected promise becomes a clean 500 instead of hanging/crashing.
function asyncHandler(fn) {
  return (req, res, next) =>
    fn(req, res, next).catch((err) => {
      console.error(err);
      if (!res.headersSent) res.status(500).json({ error: describeError(err) });
    });
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (configError) return res.status(500).json({ error: configError });
  next();
});

async function studentsRanked() {
  const { data, error } = await supabase
    .from("students")
    .select("id, name, avatar_color, points, class_id, classes(name)")
    .order("points", { ascending: false })
    .order("name", { ascending: true });
  if (error) throw error;

  return data.map((row, i) => ({
    id: row.id,
    name: row.name,
    avatar_color: row.avatar_color,
    points: row.points,
    class_id: row.class_id,
    class_name: row.classes?.name ?? null,
    rank: i + 1,
  }));
}

app.get(
  "/api/students",
  asyncHandler(async (req, res) => {
    res.set("Cache-Control", LIST_CACHE);
    res.json(await studentsRanked());
  })
);

// ---- Classes ----

async function classesWithCounts() {
  const { data, error } = await supabase.from("classes").select("id, name, students(count)").order("name", { ascending: true });
  if (error) throw error;
  return data.map((c) => ({ id: c.id, name: c.name, studentCount: c.students?.[0]?.count ?? 0 }));
}

app.get(
  "/api/classes",
  asyncHandler(async (req, res) => {
    res.set("Cache-Control", LIST_CACHE);
    res.json(await classesWithCounts());
  })
);

app.post(
  "/api/classes",
  asyncHandler(async (req, res) => {
    const name = String(req.body?.name || "").trim();
    if (!name) return res.status(400).json({ error: "Class name is required" });
    if (name.length > 60) return res.status(400).json({ error: "Class name is too long" });

    const { data: existing, error: existingErr } = await supabase.from("classes").select("id").ilike("name", name).maybeSingle();
    if (existingErr) throw existingErr;
    if (existing) return res.status(409).json({ error: "A class with that name already exists" });

    const { data, error } = await supabase.from("classes").insert({ name }).select().single();
    if (error) throw error;

    res.status(201).json({ id: data.id, name: data.name, studentCount: 0 });
  })
);

app.get(
  "/api/classes/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const { data: cls, error: clsErr } = await supabase.from("classes").select("id, name").eq("id", id).maybeSingle();
    if (clsErr) throw clsErr;
    if (!cls) return res.status(404).json({ error: "Class not found" });

    const { data: students, error } = await supabase
      .from("students")
      .select("id, name, avatar_color, points")
      .eq("class_id", id)
      .order("name", { ascending: true });
    if (error) throw error;

    res.json({ ...cls, students });
  })
);

// Rename a class.
app.patch(
  "/api/classes/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const { data: cls, error: clsErr } = await supabase.from("classes").select("id").eq("id", id).maybeSingle();
    if (clsErr) throw clsErr;
    if (!cls) return res.status(404).json({ error: "Class not found" });

    const name = String(req.body?.name || "").trim();
    if (!name) return res.status(400).json({ error: "Class name is required" });
    if (name.length > 60) return res.status(400).json({ error: "Class name is too long" });

    const { data: existing, error: existingErr } = await supabase
      .from("classes")
      .select("id")
      .ilike("name", name)
      .neq("id", id)
      .maybeSingle();
    if (existingErr) throw existingErr;
    if (existing) return res.status(409).json({ error: "A class with that name already exists" });

    const { error } = await supabase.from("classes").update({ name }).eq("id", id);
    if (error) throw error;

    res.json({ id, name });
  })
);

// Delete a class. Refused while it still has students, so a roster is never silently erased.
app.delete(
  "/api/classes/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const { data: cls, error: clsErr } = await supabase.from("classes").select("id").eq("id", id).maybeSingle();
    if (clsErr) throw clsErr;
    if (!cls) return res.status(404).json({ error: "Class not found" });

    const { count, error: countErr } = await supabase
      .from("students")
      .select("id", { count: "exact", head: true })
      .eq("class_id", id);
    if (countErr) throw countErr;
    if (count > 0) {
      return res.status(409).json({ error: "Remove all students from this class first" });
    }

    const { error } = await supabase.from("classes").delete().eq("id", id);
    if (error) throw error;

    res.json({ id });
  })
);

async function insertStudentsIntoClass(classId, names) {
  const rows = names.map((name) => ({ name, class_id: classId, avatar_color: randomAvatarColor(), points: 0 }));
  const { data, error } = await supabase.from("students").insert(rows).select("id, name, avatar_color, points");
  if (error) throw error;
  return data;
}

function validateNames(names, res) {
  if (!names.length) {
    res.status(400).json({ error: "At least one student name is required" });
    return false;
  }
  if (names.length > 50) {
    res.status(400).json({ error: "Too many students at once (max 50)" });
    return false;
  }
  if (names.some((n) => n.length > 80)) {
    res.status(400).json({ error: "A student name is too long" });
    return false;
  }
  return true;
}

// Add one or more students to a class at once.
app.post(
  "/api/classes/:id/students",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const { data: cls, error: clsErr } = await supabase.from("classes").select("id").eq("id", id).maybeSingle();
    if (clsErr) throw clsErr;
    if (!cls) return res.status(404).json({ error: "Class not found" });

    let names = [];
    if (Array.isArray(req.body?.names)) {
      names = req.body.names.map((n) => String(n || "").trim()).filter(Boolean);
    } else if (req.body?.name) {
      names = [String(req.body.name).trim()].filter(Boolean);
    }

    if (!validateNames(names, res)) return;

    res.status(201).json(await insertStudentsIntoClass(id, names));
  })
);

// multer and xlsx are heavy; load them on first import request, not on every function cold start.
let fileUploadPromise = null;
function getFileUpload() {
  fileUploadPromise ??= import("multer").then(({ default: multer }) =>
    multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const ok = /.(xlsx|xls|csv)$/i.test(file.originalname);
        cb(ok ? null : new Error("Only .xlsx, .xls, or .csv files are allowed"), ok);
      },
    })
  );
  return fileUploadPromise;
}

// Add students to a class in bulk from an uploaded Excel/CSV file (one name per row, first column).
app.post("/api/classes/:id/students/import", async (req, res) => {
  const fileUpload = await getFileUpload();
  fileUpload.single("file")(req, res, async (err) => {
    try {
      if (err) return res.status(400).json({ error: err.message || "Upload failed" });

      const id = Number(req.params.id);
      if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

      const { data: cls, error: clsErr } = await supabase.from("classes").select("id").eq("id", id).maybeSingle();
      if (clsErr) throw clsErr;
      if (!cls) return res.status(404).json({ error: "Class not found" });

      if (!req.file) return res.status(400).json({ error: "A file is required" });

      let names;
      try {
        const XLSX = await import("xlsx");
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });
        names = rows.map((row) => String(row?.[0] ?? "").trim()).filter(Boolean);
      } catch (parseErr) {
        return res.status(400).json({ error: "Could not read that file" });
      }

      names = names.slice(0, 50);
      if (!validateNames(names, res)) return;

      res.status(201).json(await insertStudentsIntoClass(id, names));
    } catch (e) {
      console.error(e);
      if (!res.headersSent) res.status(500).json({ error: describeError(e) });
    }
  });
});

// Exam-grade → points scale: 20/20 = 4, 18-19 = 3, 17 = 2, anything else = 0.
function pointsForGrade(grade) {
  if (grade === 20) return 4;
  if (grade === 18 || grade === 19) return 3;
  if (grade === 17) return 2;
  return 0;
}

// Import exam grades for a class from a file (Name, Grade columns) and award points automatically.
app.post("/api/classes/:id/exam-import", async (req, res) => {
  const fileUpload = await getFileUpload();
  fileUpload.single("file")(req, res, async (err) => {
    try {
      if (err) return res.status(400).json({ error: err.message || "Upload failed" });

      const classId = Number(req.params.id);
      if (!Number.isInteger(classId)) return res.status(400).json({ error: "Invalid id" });

      const { data: cls, error: clsErr } = await supabase.from("classes").select("id").eq("id", classId).maybeSingle();
      if (clsErr) throw clsErr;
      if (!cls) return res.status(404).json({ error: "Class not found" });

      if (!req.file) return res.status(400).json({ error: "A file is required" });

      let rows;
      try {
        const XLSX = await import("xlsx");
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });
      } catch (parseErr) {
        return res.status(400).json({ error: "Could not read that file" });
      }

      // Drop a header row if the second column isn't numeric (e.g. "Name, Grade").
      if (rows.length && Number.isNaN(Number(rows[0]?.[1]))) {
        rows = rows.slice(1);
      }
      rows = rows.slice(0, 200);

      if (!rows.length) return res.status(400).json({ error: "No grade rows were found in the file" });

      const { data: students, error } = await supabase
        .from("students")
        .select("id, name, points")
        .eq("class_id", classId);
      if (error) throw error;
      const byName = new Map(students.map((s) => [s.name.trim().toLowerCase(), s]));

      const results = [];
      for (const row of rows) {
        const name = String(row?.[0] ?? "").trim();
        if (!name) continue;

        const gradeRaw = Number(row?.[1]);
        const grade = Number.isFinite(gradeRaw) ? gradeRaw : null;
        const student = byName.get(name.toLowerCase());

        if (!student) {
          results.push({ name, grade, matched: false, pointsAwarded: 0, newTotal: null });
          continue;
        }

        const pointsAwarded = grade === null ? 0 : pointsForGrade(grade);
        const newTotal =
          pointsAwarded > 0 ? await applyPointsDelta(student.id, pointsAwarded, `Exam grade ${grade}/20`) : student.points;

        results.push({ name: student.name, grade, matched: true, pointsAwarded, newTotal });
      }

      res.status(201).json(results);
    } catch (e) {
      console.error(e);
      if (!res.headersSent) res.status(500).json({ error: describeError(e) });
    }
  });
});

// Permanently delete a student and their point history (cascade-deleted by the DB).
app.delete(
  "/api/students/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const { data: student, error: studentErr } = await supabase.from("students").select("id").eq("id", id).maybeSingle();
    if (studentErr) throw studentErr;
    if (!student) return res.status(404).json({ error: "Student not found" });

    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) throw error;

    res.json({ id });
  })
);

// Move a student to a different class.
app.patch(
  "/api/students/:id/class",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const { data: student, error: studentErr } = await supabase.from("students").select("id").eq("id", id).maybeSingle();
    if (studentErr) throw studentErr;
    if (!student) return res.status(404).json({ error: "Student not found" });

    const classId = Number(req.body?.classId);
    if (!Number.isInteger(classId)) return res.status(400).json({ error: "A valid classId is required" });

    const { data: cls, error: clsErr } = await supabase.from("classes").select("id, name").eq("id", classId).maybeSingle();
    if (clsErr) throw clsErr;
    if (!cls) return res.status(404).json({ error: "Class not found" });

    const { error } = await supabase.from("students").update({ class_id: classId }).eq("id", id);
    if (error) throw error;

    res.json({ id, class_id: cls.id, class_name: cls.name });
  })
);

app.get(
  "/api/students/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const ranked = await studentsRanked();
    const student = ranked.find((s) => s.id === id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const { data: history, error } = await supabase
      .from("point_history")
      .select("id, delta, reason, created_at")
      .eq("student_id", id)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });
    if (error) throw error;

    res.json({ ...student, totalStudents: ranked.length, history });
  })
);

async function getStudentOr404(id, res) {
  const { data: student, error: studentErr } = await supabase.from("students").select("id, points").eq("id", id).maybeSingle();
  if (studentErr) throw studentErr;
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return null;
  }
  return student;
}

// Shared core of "award points": clamps at 0, logs a history row, returns the new total.
async function applyPointsDelta(id, delta, reason) {
  const { data: student, error } = await supabase.from("students").select("points").eq("id", id).single();
  if (error) throw error;

  const newPoints = Math.max(0, student.points + delta);
  const appliedDelta = newPoints - student.points;

  const { error: updErr } = await supabase.from("students").update({ points: newPoints }).eq("id", id);
  if (updErr) throw updErr;

  if (appliedDelta !== 0) {
    const { error: histErr } = await supabase.from("point_history").insert({ student_id: id, delta: appliedDelta, reason });
    if (histErr) throw histErr;
  }

  return newPoints;
}

// Award or deduct points (delta can be negative), recorded with a reason.
app.post(
  "/api/students/:id/points",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const delta = Number(req.body?.delta);
    const reason = String(req.body?.reason || "").trim();

    if (!Number.isInteger(delta) || delta === 0) {
      return res.status(400).json({ error: "Delta must be a non-zero integer" });
    }
    if (!reason) return res.status(400).json({ error: "Reason is required" });
    if (reason.length > 200) return res.status(400).json({ error: "Reason is too long" });

    const student = await getStudentOr404(id, res);
    if (!student) return;

    res.json({ id, points: await applyPointsDelta(id, delta, reason) });
  })
);

// Directly set a student's total (e.g. correcting a mistake); still logged to history.
app.patch(
  "/api/students/:id/points",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const points = Number(req.body?.points);
    const reason = String(req.body?.reason || "Manual adjustment").trim() || "Manual adjustment";

    if (!Number.isInteger(points) || points < 0) {
      return res.status(400).json({ error: "Points must be a non-negative integer" });
    }

    const student = await getStudentOr404(id, res);
    if (!student) return;

    const delta = points - student.points;
    const { error } = await supabase.from("students").update({ points }).eq("id", id);
    if (error) throw error;

    if (delta !== 0) {
      const { error: histErr } = await supabase.from("point_history").insert({ student_id: id, delta, reason });
      if (histErr) throw histErr;
    }

    res.json({ id, points });
  })
);

// Undo one history entry, reversing its effect on the student's total.
app.delete(
  "/api/history/:historyId",
  asyncHandler(async (req, res) => {
    const historyId = Number(req.params.historyId);
    if (!Number.isInteger(historyId)) return res.status(400).json({ error: "Invalid id" });

    const { data: entry, error: entryErr } = await supabase
      .from("point_history")
      .select("id, student_id, delta")
      .eq("id", historyId)
      .maybeSingle();
    if (entryErr) throw entryErr;
    if (!entry) return res.status(404).json({ error: "History entry not found" });

    const { data: student, error } = await supabase.from("students").select("points").eq("id", entry.student_id).single();
    if (error) throw error;

    const newPoints = Math.max(0, student.points - entry.delta);

    const { error: delErr } = await supabase.from("point_history").delete().eq("id", historyId);
    if (delErr) throw delErr;

    const { error: updErr } = await supabase.from("students").update({ points: newPoints }).eq("id", entry.student_id);
    if (updErr) throw updErr;

    res.json({ id: entry.student_id, points: newPoints });
  })
);

// Only start listening when run directly (`node server.js`) — not when imported by the
// Netlify Function wrapper, which just needs the `app` export.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const PORT = process.env.PORT || 4100;
  app.listen(PORT, () => {
    console.log(`Student Points site running at http://localhost:${PORT}`);
  });
}

export { app };
