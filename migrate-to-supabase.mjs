// One-time migration: copies existing SQLite data into Supabase.
// Run after creating the tables with supabase-schema.sql (see README).
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const exportPath = process.argv[2];
if (!exportPath) {
  console.error("Usage: node migrate-to-supabase.mjs <path-to-export.json>");
  process.exit(1);
}

const { classes, students, history } = JSON.parse(readFileSync(exportPath, "utf8"));

const { count: existingCount } = await supabase.from("students").select("id", { count: "exact", head: true });
if (existingCount > 0) {
  console.error(`Supabase already has ${existingCount} students — refusing to double-import. Truncate the tables first if you want to re-run this.`);
  process.exit(1);
}

const classIdMap = new Map();
for (const c of classes) {
  const { data, error } = await supabase.from("classes").insert({ name: c.name }).select().single();
  if (error) throw error;
  classIdMap.set(c.id, data.id);
}
console.log(`Migrated ${classIdMap.size} classes`);

const studentIdMap = new Map();
for (const s of students) {
  const { data, error } = await supabase
    .from("students")
    .insert({
      name: s.name,
      class_id: classIdMap.get(s.class_id),
      avatar_color: s.avatar_color,
      points: s.points,
    })
    .select()
    .single();
  if (error) throw error;
  studentIdMap.set(s.id, data.id);
}
console.log(`Migrated ${studentIdMap.size} students`);

const historyRows = history.map((h) => ({
  student_id: studentIdMap.get(h.student_id),
  delta: h.delta,
  reason: h.reason,
  created_at: new Date(h.created_at.replace(" ", "T") + "Z").toISOString(),
}));

if (historyRows.length) {
  const { error } = await supabase.from("point_history").insert(historyRows);
  if (error) throw error;
}
console.log(`Migrated ${historyRows.length} point history rows`);

console.log("Done.");
