-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run
-- (Project: https://zkbsqqnpylpwhvvgjkyh.supabase.co)

create table if not exists classes (
  id bigint generated always as identity primary key,
  name text not null unique
);

create table if not exists students (
  id bigint generated always as identity primary key,
  name text not null,
  class_id bigint not null references classes(id),
  avatar_color text not null,
  points integer not null default 0
);

create table if not exists point_history (
  id bigint generated always as identity primary key,
  student_id bigint not null references students(id) on delete cascade,
  delta integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_students_class_id on students(class_id);
create index if not exists idx_point_history_student_id on point_history(student_id);
