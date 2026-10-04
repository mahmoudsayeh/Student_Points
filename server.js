import express from "express";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import * as XLSX from "xlsx";

// `import.meta.url` is emptied out by Netlify's CommonJS function bundler; fall back to cwd
// there rather than crash — that build only ever calls the API routes, never express.static.
let __dirname;
try {
  __dirname = path.dirname(fileURLToPath(import.meta.url));
} catch {
  __dirname = process.cwd();
}

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  // Thrown (not process.exit) so this also fails loudly inside a serverless function, not just local dev.
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — check your .env / host environment variables.");
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const AVATAR_COLORS = ["#8A1538", "#1E88A8", "#2E7D32", "#B8860B", "#6A4C93", "#C2410C", "#2563EB", "#BE185D"];

function randomAvatarColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

async function ensureClass(name, cache) {
  if (cache.has(name)) return cache.get(name);
  const { data: existing } = await supabase.from("classes").select("id").eq("name", name).maybeSingle();
  if (existing) {
    cache.set(name, existing.id);
    return existing.id;
  }
  const { data, error } = await supabase.from("classes").insert({ name }).select().single();
  if (error) throw error;
  cache.set(name, data.id);
  return data.id;
}

// Seed a fresh (empty) Supabase project with the same demo data the app used to ship with locally.
async function seedIfEmpty() {
  const { count, error } = await supabase.from("students").select("id", { count: "exact", head: true });
  if (error) throw error;
  if (count > 0) return;

  const seedStudents = [
    { name: "Rashid Al-Kaabi", grade: "5A" },
    { name: "Maryam Al-Sulaiti", grade: "5A" },
    { name: "Khalid Al-Emadi", grade: "5B" },
    { name: "Fatima Al-Marri", grade: "5B" },
    { name: "Hamad Al-Attiyah", grade: "5A" },
    { name: "Noor Al-Kuwari", grade: "5C" },
    { name: "Abdulaziz Al-Naimi", grade: "5B" },
    { name: "Sara Al-Hajri", grade: "5C" },
  ];

  const reasons = [
    "Homework completed",
    "Helped a classmate",
    "Top quiz score",
    "Good behavior",
    "Class participation",
    "Perfect attendance",
    "Reading challenge",
    "Science fair project",
  ];

  const classCache = new Map();

  for (let i = 0; i < seedStudents.length; i++) {
    const s = seedStudents[i];
    const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
    const classId = await ensureClass(s.grade, classCache);

    const { data: student, error: insErr } = await supabase
      .from("students")
      .insert({ name: s.name, class_id: classId, avatar_color: color, points: 0 })
      .select()
      .single();
    if (insErr) throw insErr;

    const numEvents = 3 + (i % 4);
    const daysAgo = (d) => new Date(Date.now() - d * 86400000).toISOString();

    let points = 0;
    for (let e = 0; e < numEvents; e++) {
      const delta = [5, 10, 15, 20, 25][(i + e) % 5];
      const reason = reasons[(i + e) % reasons.length];
      await supabase.from("point_history").insert({
        student_id: student.id,
        delta,
        reason,
        created_at: daysAgo(numEvents - e),
      });
      points += delta;
    }
    await supabase.from("students").update({ points }).eq("id", student.id);
  }
}

// Simple shared passcode gating access to the point-awarding actions ("Manage Points").
// Override with a real value via the MANAGE_PASSCODE env var; this default is only for local/demo use.
const MANAGE_PASSCODE = process.env.MANAGE_PASSCODE || "1234";

function requireManagePasscode(req, res, next) {
  if (req.get("X-Manage-Passcode") !== MANAGE_PASSCODE) {
    return res.status(401).json({ error: "Incorrect passcode" });
  }
  next();
}

// Wraps an async route handler so a rejected promise becomes a clean 500 instead of hanging/crashing.
function asyncHandler(fn) {
  return (req, res, next) =>
    fn(req, res, next).catch((err) => {
      console.error(err);
      if (!res.headersSent) res.status(500).json({ error: "Server error" });
    });
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Run the demo-data seed once, lazily, before the first request — not at module load, so this
// file has no top-level await (which breaks Netlify's CommonJS-bundled Functions output).
let seedPromise = null;
app.use((req, res, next) => {
  if (!seedPromise) seedPromise = seedIfEmpty().catch((err) => console.error("Seed failed:", err));
  seedPromise.then(() => next());
});

app.post("/api/verify-passcode", (req, res) => {
  const passcode = String(req.body?.passcode || "");
  if (passcode === MANAGE_PASSCODE) return res.json({ ok: true });
  res.status(401).json({ error: "Incorrect passcode" });
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
    res.json(await studentsRanked());
  })
);

// ---- Classes ----

async function classesWithCounts() {
  const { data: classes, error } = await supabase.from("classes").select("id, name").order("name", { ascending: true });
  if (error) throw error;

  const { data: students, error: sErr } = await supabase.from("students").select("class_id");
  if (sErr) throw sErr;

  const counts = new Map();
  students.forEach((s) => counts.set(s.class_id, (counts.get(s.class_id) || 0) + 1));

  return classes.map((c) => ({ id: c.id, name: c.name, studentCount: counts.get(c.id) || 0 }));
}

app.get(
  "/api/classes",
  asyncHandler(async (req, res) => {
    res.json(await classesWithCounts());
  })
);

app.post(
  "/api/classes",
  asyncHandler(async (req, res) => {
    const name = String(req.body?.name || "").trim();
    if (!name) return res.status(400).json({ error: "Class name is required" });
    if (name.length > 60) return res.status(400).json({ error: "Class name is too long" });

    const { data: existing } = await supabase.from("classes").select("id").ilike("name", name).maybeSingle();
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

    const { data: cls } = await supabase.from("classes").select("id, name").eq("id", id).maybeSingle();
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

    const { data: cls } = await supabase.from("classes").select("id").eq("id", id).maybeSingle();
    if (!cls) return res.status(404).json({ error: "Class not found" });

    const name = String(req.body?.name || "").trim();
    if (!name) return res.status(400).json({ error: "Class name is required" });
    if (name.length > 60) return res.status(400).json({ error: "Class name is too long" });

    const { data: existing } = await supabase
      .from("classes")
      .select("id")
      .ilike("name", name)
      .neq("id", id)
      .maybeSingle();
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

    const { data: cls } = await supabase.from("classes").select("id").eq("id", id).maybeSingle();
    if (!cls) return res.status(404).json({ error: "Class not found" });

    const { count } = await supabase.from("students").select("id", { count: "exact", head: true }).eq("class_id", id);
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

    const { data: cls } = await supabase.from("classes").select("id").eq("id", id).maybeSingle();
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

const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /\.(xlsx|xls|csv)$/i.test(file.originalname);
    cb(ok ? null : new Error("Only .xlsx, .xls, or .csv files are allowed"), ok);
  },
});

// Add students to a class in bulk from an uploaded Excel/CSV file (one name per row, first column).
app.post("/api/classes/:id/students/import", (req, res) => {
  fileUpload.single("file")(req, res, async (err) => {
    try {
      if (err) return res.status(400).json({ error: err.message || "Upload failed" });

      const id = Number(req.params.id);
      if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

      const { data: cls } = await supabase.from("classes").select("id").eq("id", id).maybeSingle();
      if (!cls) return res.status(404).json({ error: "Class not found" });

      if (!req.file) return res.status(400).json({ error: "A file is required" });

      let names;
      try {
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
      if (!res.headersSent) res.status(500).json({ error: "Server error" });
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
app.post("/api/classes/:id/exam-import", requireManagePasscode, (req, res) => {
  fileUpload.single("file")(req, res, async (err) => {
    try {
      if (err) return res.status(400).json({ error: err.message || "Upload failed" });

      const classId = Number(req.params.id);
      if (!Number.isInteger(classId)) return res.status(400).json({ error: "Invalid id" });

      const { data: cls } = await supabase.from("classes").select("id").eq("id", classId).maybeSingle();
      if (!cls) return res.status(404).json({ error: "Class not found" });

      if (!req.file) return res.status(400).json({ error: "A file is required" });

      let rows;
      try {
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
      if (!res.headersSent) res.status(500).json({ error: "Server error" });
    }
  });
});

// Permanently delete a student and their point history (cascade-deleted by the DB).
app.delete(
  "/api/students/:id",
  requireManagePasscode,
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });

    const { data: student } = await supabase.from("students").select("id").eq("id", id).maybeSingle();
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

    const { data: student } = await supabase.from("students").select("id").eq("id", id).maybeSingle();
    if (!student) return res.status(404).json({ error: "Student not found" });

    const classId = Number(req.body?.classId);
    if (!Number.isInteger(classId)) return res.status(400).json({ error: "A valid classId is required" });

    const { data: cls } = await supabase.from("classes").select("id, name").eq("id", classId).maybeSingle();
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
  const { data: student } = await supabase.from("students").select("id, points").eq("id", id).maybeSingle();
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
  requireManagePasscode,
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
  requireManagePasscode,
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
  requireManagePasscode,
  asyncHandler(async (req, res) => {
    const historyId = Number(req.params.historyId);
    if (!Number.isInteger(historyId)) return res.status(400).json({ error: "Invalid id" });

    const { data: entry } = await supabase
      .from("point_history")
      .select("id, student_id, delta")
      .eq("id", historyId)
      .maybeSingle();
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
