# EduTest — Project Specification (Current State)

> Generated from codebase exploration on 2026-07-31. This document reflects what exists in the repository today — not a roadmap.
>
> **Updated 2026-08-01** to reflect two implemented features (Exam Edit Wizard, Student Grade/Department Targeting) confirmed against the actual source files touched during that work. Sections not touched by this update still reflect the 2026-07-31 exploration and may be stale — see §10 "Recent Changes" for exactly what was verified.
>
> **Updated 2026-08-02 (continued session)** to reflect: the `ReviewStep.jsx` `variation`/`variant` fix, the `useLogin` incomplete-profile fix, a registration-flow audit (missing `emailRedirectTo` fixed; Google OAuth redirect reviewed and confirmed self-correcting via `ProtectedRoute`, no code change needed), and closing "no teacher registration UI" as an intentional product decision rather than a gap. See §12 "Recent Changes (Session — 2026-08-02, continued)" for detail. **The home page redesign was drafted (code shared in-chat) but has not been applied to the repo yet** — `HomePage.jsx` is still the stub described below.

---

## 1. Project Overview

**EduTest** is a full-stack online exam platform built as a React SPA backed by Supabase. It serves two audiences:

- **Students** — discover available exams, take timed exam sessions with anti-cheat protections, view results and performance analytics, and manage their profile.
- **Teachers (instructors)** — create and publish exams via a multi-step wizard, manage exam lifecycle (draft/active/closed), review student submissions and results, and view aggregate dashboard stats.

The app brand appears in the sidebar as **EduTest** with role-specific portals (“Student Portal” / “Teacher Portal”). Registration is student-only via the UI; teachers are expected to exist in the database with `role = 'teacher'`.

**Core value proposition (as implemented):** a role-separated exam workflow from creation → discovery → proctored session → scored results → history/analytics, with server-side scoring via Supabase RPC functions.

---

## 2. User Roles & Permissions

Two roles only, defined in `src/utils/constants.js`:

| Role (DB value) | UI label             | Fallback dashboard      |
| --------------- | -------------------- | ----------------------- |
| `student`       | Student              | `/student/dashboard`    |
| `teacher`       | Teacher / Instructor | `/instructor/dashboard` |

There is **no admin role** in the codebase.

### Route protection (`ProtectedRoute`)

`src/components/ProtectedRoute.jsx` enforces:

1. **Authentication** — unauthenticated users redirect to `/login`.
2. **Role match** — if `allowedRole` is set and `profile.role` differs, redirect to the other role’s dashboard.
3. **Student profile completeness** — students without both `grade` and `department` are forced to `/complete-profile` (except when already on that route).

### What students can do

| Capability                                     | Evidence                                                |
| ---------------------------------------------- | ------------------------------------------------------- |
| Register (email/password)                      | `/register` → `authApi.register` with `role: "student"` |
| Sign in (email or Google OAuth)                | `/login`                                                |
| Complete profile (grade + department)          | `/complete-profile`                                     |
| View dashboard stats & charts                  | `/student/dashboard`                                    |
| Browse/filter available exams                  | `/student/exams`                                        |
| View exam details, start/resume/view results   | `/student/exams/:examId`                                |
| Take exam in fullscreen session (no AppLayout) | `/student/exam/:examId/session`                         |
| View exam submission history                   | `/student/exams-history`                                |
| View own attempt results & answer review       | `/student/results/:attemptId`                           |
| Edit profile, avatar, password                 | `/student/profile`                                      |

Students **cannot** access any `/instructor/`\* route (blocked by `ProtectedRoute`).

### What teachers can do

| Capability                                   | Evidence                                                                                                        |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Sign in (no teacher self-registration in UI) | `/login`                                                                                                        |
| View instructor dashboard                    | `/instructor/dashboard`                                                                                         |
| Create exam (3-step wizard)                  | `/instructor/exam-wizard`                                                                                       |
| Edit exam route, fully implemented           | `/instructor/exam-wizard/:examId` — loads and pre-populates the wizard with the existing exam and its questions |
| Manage exams (status, edit, delete)          | `/instructor/exams-management`                                                                                  |
| View all student submissions on their exams  | `/instructor/exams-history`                                                                                     |
| View students who took their exams + stats   | `/instructor/students`                                                                                          |
| View a student’s attempt result              | `/instructor/results/:attemptId`                                                                                |
| Edit profile, avatar, password               | `/instructor/profile`                                                                                           |

Teachers **cannot** access student exam session routes or `/student/`\* routes.

### Shared

- **Profile page** (`ProfilePage`) is reused at `/student/profile` and `/instructor/profile` inside each role’s `ProtectedRoute`.
- **Password reset** (`/forgot-password`, `/reset-password`) is public.

### Data-layer scoping (beyond route protection) — **confirmed, expanded 2026-08-01**

`ProtectedRoute` only controls which _routes_ a role can reach; it says nothing about which _rows_ a query returns once there. Two scoping rules exist at the query layer, both enforced client-side (no RLS policies visible in this repo — see Security notes in §7):

- **Instructor ownership:** exam mutation/lookup RPCs and queries that touch a specific instructor's exams take `p_instructor_id` / `.eq("created_by", instructorId)` and are scoped server-side by that value (`update_exam_with_questions`, `delete_exam`, `update_exam_status`, and the new edit-mode fetch `getExamById` in `examWizardApi.js`). A teacher cannot load or mutate another teacher's exam through these paths.
- **Student grade/department targeting:** confirmed enforced and, as of 2026-08-02, verified through direct testing to cover every entry point a student could use to reach an exam's content — list, details page, and the live exam session itself. See §4 "Exam Discovery (Student)" and "Exam Session Authorization" for detail. This governs _which exams a student's queries can return at all_, not just which routes they can visit.

---

## 3. Pages / Routes Map

All routes are defined in `src/App.jsx`. Pages are lazy-loaded. `AppLayout` (sidebar + header) wraps most authenticated routes except the exam session and complete-profile flow.

### Public

| Path               | Component            | Purpose                                                             |
| ------------------ | -------------------- | ------------------------------------------------------------------- |
| `/`                | `HomePage`           | Placeholder landing page (“Home Page” text only)                    |
| `/login`           | `LoginPage`          | Email/password + Google sign-in; redirects if already authenticated |
| `/register`        | `RegisterPage`       | Student registration with email confirmation flow                   |
| `/forgot-password` | `ForgotPasswordPage` | Sends Supabase password reset email                                 |
| `/reset-password`  | `ResetPasswordPage`  | Sets new password after recovery token                              |
| `*`                | `NotFoundPage`       | 404 page with “Go Back” button                                      |

### Student (`ProtectedRoute allowedRole="student"`)

| Path                            | Layout                  | Component                 | Purpose                                                         |
| ------------------------------- | ----------------------- | ------------------------- | --------------------------------------------------------------- |
| `/complete-profile`             | Standalone              | `CompleteProfilePage`     | Force grade/department selection for new students               |
| `/student/dashboard`            | AppLayout               | `StudentDashboardPage`    | Stats, performance chart, answers breakdown, recent exams table |
| `/student/exams`                | AppLayout               | `AvailableExamsPage`      | Search/filter grid of active exams                              |
| `/student/exams/:examId`        | AppLayout               | `ExamDetailsPage`         | Exam metadata, rules modal, start/resume/view results           |
| `/student/exams-history`        | AppLayout               | `StudentExamsHistoryPage` | Table of past submissions with filters                          |
| `/student/results/:attemptId`   | AppLayout               | `StudentResultPage`       | Score summary + per-question answer review                      |
| `/student/profile`              | AppLayout               | `ProfilePage`             | Personal info + password management                             |
| `/student/exam/:examId/session` | Fullscreen (no sidebar) | `ExamSessionPage`         | Live exam: timer, questions, anti-cheat, auto-save              |

### Teacher (`ProtectedRoute allowedRole="teacher"`)

| Path                              | Layout    | Component                   | Purpose                                                                                                                              |
| --------------------------------- | --------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/instructor/dashboard`           | AppLayout | `InstructorDashboard`       | Exam/submission stats, charts, recent submissions                                                                                    |
| `/instructor/exam-wizard`         | AppLayout | `ExamWizardPage`            | 3-step create exam wizard                                                                                                            |
| `/instructor/exam-wizard/:examId` | AppLayout | `ExamWizardPage`            | Edit flow — **implemented**. Same component as create, now fetches the exam via `:examId` and seeds edit mode before render (see §4) |
| `/instructor/exams-management`    | AppLayout | `ExamsManagementPage`       | Table of instructor’s exams with status/edit/delete                                                                                  |
| `/instructor/exams-history`       | AppLayout | `InstructorExamHistoryPage` | All student submissions on instructor’s exams                                                                                        |
| `/instructor/students`            | AppLayout | `StudentsListPage`          | Aggregated student stats for instructor’s exams                                                                                      |
| `/instructor/results/:attemptId`  | AppLayout | `InstructorResultPage`      | View student attempt (no review notes)                                                                                               |
| `/instructor/profile`             | AppLayout | `ProfilePage`               | Shared profile page                                                                                                                  |

**Naming note:** URLs use `/instructor/`\* but the database role value is `"teacher"`.

---

## 4. Features Implemented So Far

### Authentication

- Email/password sign-up (`signUp` with metadata: `full_name`, `role: "student"`) and email confirmation screen.
- Email/password login with role-based redirect.
- Google OAuth via `signInWithOAuth({ provider: "google" })`; redirect target is hardcoded to `/student/dashboard`.
- Session persistence via Supabase `onAuthStateChange` in `useUser`.
- Forgot/reset password flows.
- Logout clears React Query cache and navigates to `/login`.

### Profile Management

- **Complete profile** (students): grade + department from `GRADES` / `DEPARTMENTS` constants.
- **Profile page** (both roles): edit name; students edit grade/department; teachers edit department only.
- Avatar upload to Supabase Storage bucket `avatars` (`{userId}/avatar.{ext}`, upsert).
- Change password (re-authenticate with current password) or **set password** for Google-only users (`has_password` flag on profile).

### Student Dashboard

- Aggregates finished attempts (`submitted`, `timed_out`, `violated`).
- Stat cards: total exams, average score, highest score, pass rate.
- Recharts line chart: performance over time.
- Recharts donut: correct/wrong/skipped answers breakdown.
- Table: 5 most recent exam submissions with links to results.

### Instructor Dashboard

- Stat cards: total exams, total submissions, students’ average score, unique student count.
- Performance chart: average score per exam (chronological).
- Pass/fail donut chart for submissions.
- Table: 5 most recent submissions with link to instructor result view.

### Exam Discovery (Student)

- Lists exams where `status = 'active'` AND `ends_at > now()` (server-side query filter via `applyAvailabilityFilters` in `examsApi.js`, not client-side as previously documented — corrected 2026-08-01).
- **Grade/department targeting — implemented and fully verified.** A student only ever sees exams where `exam.grade === profile.grade AND exam.department === profile.department` (exact match, not a togglable filter). This is enforced in the data query layer, not as a UI-level filter the student can see or toggle — `grade`/`department` never appear as options in `AvailableExamsPage`'s search/filter UI; they're baked into every relevant query in `examsApi.js` before results ever reach a component. Applied consistently across every path a student can use to reach exam content:
  - `getExams` (`AvailableExamsPage` list) — filters via `.eq("grade", …).eq("department", …)` whenever the student's profile values are known.
  - `getExamById` (`ExamDetailsPage`, via `useExamDetails`) — same filter, so **direct URL access to an exam outside a student's targeting is also blocked**, not just hidden from the list. A mismatch surfaces as `.single()`'s "no rows" error, which the page renders as its existing generic "Exam not found" state — deliberately not distinguishing "doesn't exist" from "not targeted at you."
  - `getExamCategories` (category filter dropdown, via `useExamCategories`) — same filter, so the dropdown never offers a category with zero results for that student.
  - All corresponding hooks (`useExams`, `useExamDetails`, `useExamCategories`) pull `grade`/`department` from `useUser()`'s cached profile and gate their queries (`enabled`) until both values are present, so a query never fires unfiltered while the profile is still loading.
  - **Exam-session entry point — audited and confirmed 2026-08-02.** `ExamSessionPage` (`/student/exam/:examId/session`) fetches its exam data through this same `useExamDetails`/`getExamById` path — there is no separate, unfiltered fetch for the live session. Confirmed via full call-graph trace and live testing with a deliberately mismatched student/exam pair: the exam is hidden from `AvailableExamsPage`, and pasting the session URL directly renders the page's error `EmptyState` instead of starting a session. See "Exam Session Authorization" below for the full trace.
- Search by title/description; filter by category, difficulty, instructor name (client-side for instructor).
- `ExamCard` shows attempt state: start, view results (completed), or violated styling.

### Exam Details & Rules

- Fetches single exam with questions (without `correct_answer` exposed to student queries).
- Shows duration, question count, marks, pass mark, instructor name.
- `ExamRulesModal` displays integrity/time/submission rules from `src/constants/examRules.js`.
- Actions: Start Exam, Resume (in_progress), View Results (submitted/timed_out/violated). Fixed 2026-08-02 — see §11; previously `violated` attempts fell through to "Start Exam," inconsistent with `ExamCard`'s handling of the same status.

### Exam Session & Anti-Cheat

- Auto-starts session on page load via `useExamSession`.
- Resumes `in_progress` attempts; restores saved answers/bookmarks.
- Countdown timer persisted in `localStorage` per `examId_studentId`.
- Auto-save answers to `answers` table (debounced 800ms + 30s interval) via upsert.
- Manual submit with confirmation modal; auto-submit on time-up (`timed_out`) or violations (`violated`).
- **Anti-cheat** (`useAntiCheat`): tab switch, window blur, right-click, devtools shortcuts, view source, copy, tab navigation shortcuts. Max 3 violations → auto-submit as `violated`.
- Text selection disabled during session; browser back button neutralized.
- `beforeunload` warning + flush save on leave.
- Scoring delegated to `submit_exam_attempt` RPC (client does not compute score/`is_correct`).

#### Exam Session Authorization — audited and verified 2026-08-02

A prior pass had flagged the exam-session route as a possible gap: grade/department targeting had been added to `getExams`/`getExamById`/`getExamCategories`, but nothing had confirmed whether `/student/exam/:examId/session` used that same filtered path or fetched exam data separately. This was traced end-to-end this session:

- **Call graph:** `App.jsx` mounts `ExamSessionPage` directly under `ProtectedRoute allowedRole="student"` with no route loader — `ProtectedRoute` itself only checks auth/role/profile-completeness, not exam-specific authorization (see §2). `ExamSessionPage` gets its exam via `useExamDetails(examId)`, the identical hook `ExamDetailsPage` uses, which calls `getExamById(examId, { grade, department })` — the same targeting-filtered query documented in "Exam Discovery" above. `useExamSession(exam)`'s `startSession()` is only invoked once `exam` is truthy, so a filtered-out (undefined) exam never reaches attempt creation.
- **Ruled out:** `getExistingAttempt` (resume path) re-validated separately — confirmed it does not bypass targeting, since it only ever returns an `in_progress` attempt already belonging to that student for that exam.
- **Live verification:** tested with a student whose profile `grade`/`department` genuinely did not match a target exam. Result: the exam does not appear in `AvailableExamsPage`, and navigating directly to its session URL (`/student/exam/:examId/session`) renders `ExamSessionPage`'s error `EmptyState` rather than starting a session or creating an `exam_attempts` row.
- **Conclusion:** no separate/unfiltered fetch path exists for the session route in this codebase. The feature works as designed.
- **Residual, out-of-scope caveat:** this is still a client-side/query-layer check, not a database-enforced one. `create_exam_attempt` (the RPC `createAttempt` calls) accepts only `p_exam_id`/`p_student_id` and performs no server-side grade/department validation, so a direct RPC call (e.g. from browser devtools, bypassing the React app entirely) would not be stopped by anything in this repo. This is tracked separately — see §8 "Supabase-side Security Improvements" — since it requires a change inside the RPC or an RLS policy, not a React code change.

### Exam Wizard (Create & Edit) — fully implemented

Both flows are complete and share the same three-step component. Teachers can create a new exam from scratch, or edit an existing one — in edit mode the wizard loads the exam's existing data and all of its existing questions and pre-populates every step before the teacher sees it, rather than starting from an empty form.

- **Step 1 — Exam Details:** title, category, duration, difficulty, start/end datetime, target grade & department, pass percentage, description.
- **Step 2 — Question Builder:** MCQ (4 options) or True/False questions with marks; edit/delete in list.
- **Step 3 — Review & Publish:** summary + confirm; calls `create_exam_with_questions` RPC (create) or `update_exam_with_questions` RPC (edit).
- Wizard state in React context (`ExamWizardContext`); step navigation via `?step=1|2|3` query param.
- `pass_marks` and `total_marks` computed client-side before RPC.
- **Edit mode:** `ExamWizardPage` reads `:examId` from the route:
  - No `examId` → mounts `ExamWizardProvider` empty (create mode).
  - `examId` present → fetches the exam via `getExamById(examId, instructorId)` in `examWizardApi.js` (scoped by `created_by`, so a teacher can't load another teacher's exam this way), shows a loading state, then seeds `ExamWizardProvider` with `initialExam`/`initialQuestions` — including every existing question — mapped from the DB row **before** the provider mounts. This matters because `ExamWizardProvider`'s `isEditMode` and initial state are set once via `useState(initialExam)` at mount — the fetch has to complete first, not fill in after.
  - `pass_marks`/`total_marks` are converted back to the wizard's `passPercentage` field on load; `exam.id` is carried on `examDetails` so `ReviewStep`'s `isEditMode` branch correctly calls `useUpdateExam` instead of `usePublishExam`.
  - Page header switches between "Create Exam" / "Edit Exam" copy based on `isEditMode`.
  - A failed or unauthorized fetch (exam not found, or not owned by this instructor) renders an inline error instead of silently falling through to create mode.
  - **Remaining minor nit (see §7):** the question-type selector in Step 2 still defaults to "mcq" regardless of what the loaded exam's questions are; cosmetic only, not a correctness issue.

### Instructor Exam Management

- Table of instructor’s exams with effective status (draft / active / closed, with time-based “closed”).
- Status changes via `update_exam_status` RPC.
- Edit navigates to `/instructor/exam-wizard/:examId?step=1`.
- Delete via `delete_exam` RPC; blocked in UI when `has_submissions` (derived from attempt counts).

### Exam History

- **Student:** all finished attempts with exam metadata; searchable/filterable table.
- **Instructor:** all finished attempts on their exams with student name; pass/fail filter.

### Results

- **Student result:** summary card (score, pass/fail, time, cheating/timed-out flags) + question-by-question review with correct answers shown.
- **Instructor result:** same layout plus student name; `showNotes={false}` on review section.
- Result shaping logic is duplicated between `studentResultApi.js` and `instructorResultApi.js`.

### Student Management (Instructor)

- RPC `get_instructor_students` returns per-student aggregates: exams taken, avg score, highest, pass rate.
- Search/filter by name, grade, department.

---

## 5. Database Schema (Inferred)

> **Inferred from code usage — not verified against the live database.**  
> No `schema.sql` or migrations exist in this repo. RPC function bodies are not visible; parameters and return shapes are inferred from client calls.

### Table: `profiles`

Likely extends Supabase `auth.users` (same `id`).

| Column         | Inferred type              | Notes                              |
| -------------- | -------------------------- | ---------------------------------- | ----------- |
| `id`           | uuid (PK, FK → auth.users) | Used everywhere as user identifier |
| `full_name`    | text                       |                                    |
| `role`         | text                       | `'student'`                        | `'teacher'` |
| `avatar_url`   | text                       | Public URL from Storage            |
| `grade`        | text                       | Student only; e.g. `"Grade 1"`     |
| `department`   | text                       | From `DEPARTMENTS` constant        |
| `has_password` | boolean                    | `false` for Google-only users      |

### Table: `exams`

| Column          | Inferred type           | Notes                         |
| --------------- | ----------------------- | ----------------------------- | ---------- | ---------- |
| `id`            | uuid (PK)               |                               |
| `title`         | text                    |                               |
| `description`   | text                    | nullable                      |
| `category`      | text                    | Subject/category              |
| `difficulty`    | text                    | `'easy'`                      | `'medium'` | `'hard'`   |
| `duration_mins` | integer                 |                               |
| `total_marks`   | integer                 | Sum of question marks         |
| `pass_marks`    | integer                 | Computed from pass percentage |
| `grade`         | text                    | Target grade for exam         |
| `department`    | text                    | Target department             |
| `starts_at`     | timestamptz             |                               |
| `ends_at`       | timestamptz             |                               |
| `status`        | text                    | `'draft'`                     | `'active'` | `'closed'` |
| `created_by`    | uuid (FK → profiles.id) | Instructor                    |
| `created_at`    | timestamptz             | Used for ordering             |

`grade`_,_ `department`_,_ `pass_marks`_, and_ `total_marks` _are now read/written from more call sites than before this session (_`examWizardApi.getExamById`_,_ `examsApi.getExams`_/_`getExamById`_/_`getExamCategories`_), which corroborates the inferred types above — but this is still inference from client code, not a verified schema (no migrations/_`schema.sql` _in this repo, as noted at the top of §5)._

### Table: `questions`

| Column           | Inferred type        | Notes                               |
| ---------------- | -------------------- | ----------------------------------- | -------------- |
| `id`             | uuid (PK)            |                                     |
| `exam_id`        | uuid (FK → exams.id) |                                     |
| `body`           | text                 | Question text                       |
| `type`           | text                 | `'mcq'`                             | `'true_false'` |
| `options`        | jsonb                | Array of `{ id, text }`             |
| `correct_answer` | text                 | Option id (e.g. `"opt1"`, `"true"`) |
| `marks`          | integer              |                                     |
| `order_index`    | integer              | Display order                       |

### Table: `exam_attempts`

| Column         | Inferred type           | Notes                        |
| -------------- | ----------------------- | ---------------------------- | ------------- | ------------- | ------------ |
| `id`           | uuid (PK)               |                              |
| `exam_id`      | uuid (FK → exams.id)    |                              |
| `student_id`   | uuid (FK → profiles.id) |                              |
| `started_at`   | timestamptz             | Set by `create_exam_attempt` |
| `submitted_at` | timestamptz             | nullable until finished      |
| `status`       | text                    | `'in_progress'`              | `'submitted'` | `'timed_out'` | `'violated'` |
| `score`        | integer                 | Set server-side on submit    |
| `total_marks`  | integer                 | Snapshot at submit           |
| `time_taken`   | integer                 | Seconds                      |

_Code references_ `remaining_seconds` _on attempt object in_ `useExamSession` _but it is not selected in_ `getExistingAttempt` _— may come from RPC or is unused fallback._

### Table: `answers`

| Column          | Inferred type | Notes                                  |
| --------------- | ------------- | -------------------------------------- |
| `attempt_id`    | uuid (FK)     | Part of unique constraint              |
| `question_id`   | uuid (FK)     | Part of unique constraint              |
| `selected`      | text          | Selected option id; nullable = skipped |
| `is_correct`    | boolean       | Set server-side on submit              |
| `is_bookmarked` | boolean       | Session bookmark flag                  |
| `updated_at`    | timestamptz   | Sent on upsert                         |

**Unique constraint (inferred):** `(attempt_id, question_id)` — used in upsert `onConflict`.

### Storage bucket: `avatars`

- Path pattern: `{userId}/avatar.{ext}`
- Public URL stored on `profiles.avatar_url`
- Upload with `upsert: true`

### Supabase RPC functions (inferred)

| Function                                                                      | Called from                         | Inferred purpose                                                                                                                      |
| ----------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `create_exam_with_questions(p_exam, p_questions, p_created_by)`               | `examWizardApi.publishExam`         | Insert exam + questions atomically; returns exam id                                                                                   |
| `update_exam_with_questions(p_exam_id, p_exam, p_questions, p_instructor_id)` | `examWizardApi.updateExam`          | Update exam + replace questions                                                                                                       |
| `update_exam_status(p_exam_id, p_status, p_instructor_id)`                    | `examsApi.updateExamStatus`         | Change exam status with ownership check                                                                                               |
| `delete_exam(p_exam_id, p_instructor_id)`                                     | `examsApi.deleteExam`               | Delete exam with ownership check                                                                                                      |
| `create_exam_attempt(p_exam_id, p_student_id)`                                | `examSessionApi.createAttempt`      | Create attempt; returns `{ id, started_at }`                                                                                          |
| `submit_exam_attempt(p_attempt_id, p_answers, p_time_taken, p_status)`        | `examSessionApi.submitAttempt`      | Score answers, finalize attempt; returns `{ score, totalMarks }`                                                                      |
| `get_instructor_students(p_instructor_id)`                                    | `studentsApi.getInstructorStudents` | Returns rows with `full_name`, `email`, `grade`, `department`, `exams_count`, `avg_score`, `highest_score`, `pass_rate`, `student_id` |

### Foreign-key aliases used in Supabase joins

- `profiles:created_by(...)` — instructor on exams
- `profiles!student_id(...)` — student on attempts
- `exams!inner(...)` — inner join filtering by instructor ownership

---

## 6. Key Architectural Patterns (Observed)

### Feature-based folder structure — **Mostly followed**

```
src/features/<feature>/
  pages/
  components/
  hooks/
  services/
  constants/   (some features)
  helpers/     (some features)
  context/     (exam-wizard)
```

Shared code lives in `src/components/`, `src/hooks/`, `src/utils/`, `src/lib/`, `src/services/supabase.js`.

### Hooks vs services — **Mostly followed, with exceptions**

| Pattern                                                                   | Status                                                                                                        |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Services = raw Supabase calls                                             | ✅ Consistently in `*Api.js` / `*ExamsHistory.js` files                                                       |
| Hooks = React Query + navigation/toasts                                   | ✅ Common pattern (e.g. `usePublishExam`, `useDeleteExam`, `useLogin`)                                        |
| Business logic in hooks                                                   | ⚠️ Some aggregation lives in services (dashboard APIs) or hooks (`useExamsManagement` adds `has_submissions`) |
| Pages call hooks, not services directly                                   | ⚠️ `ForgotPasswordPage` calls `authApi.forgotPassword` directly                                               |
| `ChangePasswordCard` calls `supabase.auth.resetPasswordForEmail` directly | ⚠️ Bypasses service layer                                                                                     |

### `setQueryData` vs `invalidateQueries` — **Mixed**

- `setQueryData` **used for:** auth session (`useUser`, `useLogin`, `useSetPassword`).
- `invalidateQueries` **used for:** profile update, avatar upload, instructor exam list after status change/delete.

The stated preference for `setQueryData` is **not consistently applied** outside auth.

### Route protection — **Confirmed**

- `ProtectedRoute` with `allowedRole="student"` or `"teacher"`.
- No admin role anywhere.

### Profile-gated queries — **new pattern, observed 2026-08-01**

Confirmed in `useExams`, `useExamDetails`, and `useExamCategories`: hooks that need the current user's `profile.grade`/`profile.department` pull them from `useUser()`'s cached `["user"]` query and pass `enabled: hasTargetingInfo` (or equivalent) to their own `useQuery`, rather than letting the query fire with `undefined` filter values while the profile is still loading. This wasn't an existing documented convention — it emerged from implementing grade/department targeting and is now the pattern to follow for any future student-scoped query. _(Assumption embedded in this pattern, not verified:_ `useUser()` _returns_ `{ data: { profile }, isLoading }` _— the_ `isLoading` _field name specifically was inferred by analogy with standard React Query hook shape, not confirmed by reading_ `useUser.js` _itself.)_

### Provider seeded before mount, not after — **new pattern, observed 2026-08-01**

`ExamWizardProvider` reads `initialExam`/`initialQuestions` once via `useState(initialExam)` at construction time — later prop changes don't refill it. The edit-wizard fix follows a "fetch first, mount second" shape as a result: `ExamWizardPage` shows a loading state and only renders `<ExamWizardProvider>` once the async fetch resolves, instead of mounting immediately and patching state in afterward. Any future feature that seeds context/state from an async source should follow the same shape rather than relying on a `useEffect` to backfill it.

### Other conventions

- **Plain JavaScript** — no TypeScript in `src/`.
- **Path alias:** `@/` → `src/` (Vite).
- **Theming:** Tailwind v4 `@theme` in `src/index.css` with `--color-`\* custom properties; dark theme by default.
- **Forms:** `react-hook-form` throughout auth, profile, wizard.
- **UI:** Primarily custom components in `components/shared/`; shadcn/ui minimally adopted (`components/ui/button.jsx` only).
- **Naming inconsistency:** UI routes say “instructor”; DB role is “teacher”; sidebar says “Teacher Portal”.

---

## 7. Known Gaps / Incomplete Areas / TODOs

> Resolved this session (2026-08-02) — see §11 for details: exam edit wizard (verified), grade/department targeting (verified end-to-end including the exam-session entry point), student exam-history filter crash (fixed), `ExamDetailsPage` violated-attempt handling (fixed), `useUser()` return shape (confirmed). Supabase-side items (missing RLS, RPC authorization) have moved to their own section — see §8.

### Remaining minor gaps

| Issue                                                             | Location                                          | Detail                                                                                  |
| ----------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Question-type selector doesn't follow loaded question on edit** | `QuestionBuilderStep.jsx` (exam-wizard edit mode) | Defaults to "mcq" regardless of the edited exam's actual question types; cosmetic only. |

### Technical debt & inconsistencies

### Technical debt & inconsistencies

| Issue                       | Detail                                                                                                                                                                                                                                                                      |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Duplicate result logic**  | `studentResultApi.js` and `instructorResultApi.js` share nearly identical question-grading mapping                                                                                                                                                                          |
| **Unused hook**             | `src/hooks/useFilteredExams.js` is never imported                                                                                                                                                                                                                           |
| **Mixed Button APIs**       | Some components use `variant`, others `variation`. The one confirmed live instance of the mismatch causing an actual bug (`ReviewStep.jsx`) was fixed 2026-08-02 — see §12; this row now tracks only the general inconsistency (no known remaining functional bug from it). |
| **Commented-out UI blocks** | Large commented sections in `ExamSessionPage.jsx`, `ExamDetailsPage.jsx`, `ExamCard.jsx`, `Sidebar.jsx`                                                                                                                                                                     |
| `ResetPasswordPage`         | Imports `useLogout` but never uses it after manual `signOut`                                                                                                                                                                                                                |
| **Typo in hook export**     | `useSignInWithGoogle` exports `singInWithGoogle`                                                                                                                                                                                                                            |
| **Console logging**         | `console.log(data)` left in `ChangePasswordCard.jsx`; `console.error` in exam session hooks (may be intentional for debugging)                                                                                                                                              |
| **Supabase keys in source** | `src/services/supabase.js` contains project URL and publishable key inline                                                                                                                                                                                                  |
| **README**                  | Default Vite template text; no project-specific docs                                                                                                                                                                                                                        |
| **NotFoundPage**            | Minimal unstyled back button                                                                                                                                                                                                                                                |

### Missing error handling / edge cases

- Auto-save failures are logged but not surfaced to the user.
- Exam session submit failure restores timer but user may be stuck with limited feedback beyond `error` state (not prominently displayed in `ExamSessionPage`).
- No email verification gate on login (relies on Supabase config).

### Security notes (observed, not audited)

- Student-facing exam queries intentionally omit `correct_answer` on questions during exam flow.
- Correct answers are shown only on result pages after submission.
- Anti-cheat is client-side only — bypassable by determined users (inherent limitation).
- Database-level scoping (RLS, RPC-level authorization) is out of scope for this React codebase — see §8 "Supabase-side Security Improvements."

### Priority Ranking (Remaining Work) — updated 2026-08-02 (continued session)

> Former #1–#4 below were resolved or closed in the 2026-08-02 continued session — see §12. Kept here (struck through in spirit, not removed) so the ranking's history stays legible; only the items below the line are still open.

1. ~~`ReviewStep.jsx` `variation`/`variant` prop bug~~ — **fixed** 2026-08-02.
2. ~~`useLogin` sets an incomplete profile on sign-in~~ — **fixed** 2026-08-02.
3. ~~No teacher registration UI~~ — **closed, not built**: confirmed as an intentional product decision (admin-provisioned teacher accounts), not a gap.
4. ~~Google OAuth redirect hardcoded to student dashboard~~ — **reviewed, no change needed**: `ProtectedRoute` already redirects mismatched roles/incomplete profiles on the very next render, so this self-heals; left as-is with a clarifying comment.
5. ~~Home page redesign not yet applied~~ — a full landing page (hero, student/instructor feature rows, CTAs) was drafted 2026-08-02, but `HomePage.jsx` in the repo is still the one-line stub. Applying the draft is the next concrete piece of work.

**Remaining, current priority order:**

1. **Question-type selector edit-mode nit, duplicate result logic, unused hook, mixed Button APIs (general), commented-out code, console logging, README** — cosmetic/cleanup, low urgency, no functional risk.

---

## 8. Supabase-side Security Improvements

> These items require changes in the Supabase project (SQL migrations, RLS policies, or RPC function bodies) rather than in this React codebase. They're tracked here separately so they aren't mistaken for incomplete frontend work — the frontend behavior for each of these is already correct given the constraints of a client-only fix.

| Issue                                                      | Detail                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **No RLS policies defined**                                | No Row Level Security policies exist in this repo for `exams`, `exam_attempts`, `answers`, or `profiles`. All ownership/targeting scoping (instructor ownership, student grade/department targeting) is enforced at the query layer in application code only, with no database-level backstop.                                                                                                                                                                                                                         |
| **`create_exam_attempt` has no server-side authorization** | The RPC accepts only `p_exam_id`/`p_student_id` and performs no grade/department (or any other) validation. Confirmed during the 2026-08-02 exam-session authorization audit (§4, "Exam Session Authorization"): a direct RPC call from outside the React app (e.g. browser devtools) would not be stopped by anything in this repo. Recommend adding a targeting check inside the RPC, and/or an RLS policy on `exam_attempts` that validates the inserting student's `grade`/`department` against the target exam's. |
| **Supabase keys inline in source**                         | `src/services/supabase.js` contains the project URL and publishable key inline. Typically expected for a publishable/anon key, but worth confirming this key's permissions are appropriately scoped given the lack of RLS above.                                                                                                                                                                                                                                                                                       |

---

## 9. Third-Party Integrations

### Supabase Auth

- Client: `@supabase/supabase-js` in `src/services/supabase.js`.
- **Email/password:** sign-up, sign-in, sign-out, password reset, update password.
- **Google OAuth:** `signInWithOAuth({ provider: "google", redirectTo: origin + "/student/dashboard" })`.
- **Session listener:** `supabase.auth.onAuthStateChange` in `useUser` syncs React Query `["user"]` cache.
- **Registration metadata:** `{ full_name, role: "student" }` passed in `signUp` options — implies a DB trigger populates `profiles` from auth metadata (not in repo).

### Supabase Postgres

- All application data via `.from()` queries and `.rpc()` calls documented above.
- Row Level Security policies are **not defined in this repo** — assumed configured in Supabase dashboard.

### Supabase Storage

- Bucket: `avatars`
- Used exclusively for profile photo upload (`profileApi.uploadAvatar`).
- Public URLs with cache-bust query param (`?t=timestamp`).

### Other libraries

| Library                      | Usage                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `@tanstack/react-query`      | Server state, mutations, devtools in `App.jsx`                                         |
| `react-router-dom` v7        | Routing, lazy routes, nested layouts                                                   |
| `react-hook-form`            | Forms                                                                                  |
| `react-hot-toast`            | Global notifications (`Toaster` in `App.jsx`)                                          |
| `recharts`                   | Dashboard charts (performance, donut)                                                  |
| `lucide-react`               | Icons                                                                                  |
| `date-fns`                   | _(in package.json; verify usage — formatting mostly custom in_ `formatDateForInput`_)_ |
| `react-loadly`               | Loading spinner on Available Exams page                                                |
| `shadcn` / `radix-ui`        | Minimal — button component scaffold                                                    |
| `@fontsource-variable/geist` | Font import in CSS                                                                     |

---

## Appendix: Project Structure Summary

```
exam-platform/
├── src/
│   ├── App.jsx                 # Routes, QueryClient, Toaster
│   ├── main.jsx
│   ├── index.css               # Tailwind v4 theme tokens
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   ├── layout/             # AppLayout, Header, Sidebar
│   │   ├── shared/             # Reusable UI (Button, Table, EmptyState, …)
│   │   └── ui/                 # shadcn button
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── exam-session/
│   │   ├── exam-wizard/
│   │   ├── exams/
│   │   ├── exams-history/
│   │   ├── profile/
│   │   ├── results/
│   │   └── students/
│   ├── hooks/                  # Shared hooks
│   ├── pages/                  # HomePage, NotFoundPage
│   ├── services/supabase.js
│   ├── utils/constants.js
│   └── lib/utils.js
├── public/default-avatar.jpg
├── package.json
└── vite.config.js
```

---

## 10. Recent Changes (Session — 2026-08-01)

Two features were implemented in this session, moving them from §7 "Known Gaps" into §4 "Features Implemented." Everything below was verified against the actual source files edited, not inferred.

### 1. Exam Edit Wizard

**Problem:** `/instructor/exam-wizard/:examId` existed as a route and `useUpdateExam`/`update_exam_with_questions` already existed, but `ExamWizardPage` never read `:examId` or loaded the existing exam — `ExamWizardProvider` always mounted empty, so `isEditMode` was always `false` and "Edit" silently behaved like "Create."

**Changed:**

- `src/features/exam-wizard/services/examWizardApi.js` — added `getExamById(examId, instructorId)`, ownership-scoped via `.eq("created_by", instructorId)`, returning the exam with its `questions` sorted by `order_index`.
- `src/features/exam-wizard/hooks/useExamForEdit.js` — **new file.** `useQuery` wrapper around the above, `enabled` only once `examId` and the instructor's profile id are both available.
- `src/features/exam-wizard/pages/ExamWizardPage.jsx` — now branches on `:examId`: create mode is unchanged; edit mode fetches first, shows a loading state, maps the DB row (including `pass_marks`/`total_marks` → `passPercentage`) into `initialExam`/`initialQuestions`, and only then mounts `ExamWizardProvider`. Header copy reflects create vs. edit. Fetch failure/not-found renders an inline error.
- No changes were needed in `ExamWizardContext.jsx`, `ReviewStep.jsx`, `MCQForm.jsx`, or `TrueFalseForm.jsx` — their edit-mode branching already existed and simply had never been fed real data before.

### 2. Student Grade/Department Targeting

**Problem:** Exams carry `grade`/`department` targeting fields (set in the wizard), but the student-facing exam queries didn't filter by the viewing student's own `grade`/`department` — students could see, and directly open, exams meant for other cohorts.

**Design decision:** Exact match, hard filter — not a togglable UI filter. A student's `grade`/`department` come from their profile (required to leave `/complete-profile`), so this is treated the same way `applyAvailabilityFilters` (status/end-date) already is: baked into the query, not offered as an option to turn off.

**Changed** (all in `src/features/exams/`):

- `services/examsApi.js` —
  - `getExams` now accepts `grade`/`department` and applies `.eq(...)` for each when present.
  - `getExamById` now accepts a second `{ grade, department }` argument and applies the same filter; a mismatch causes `.single()` to return a "no rows" error, which `ExamDetailsPage` already rendered as a generic "Exam not found" state — so **direct URL access to an untargeted exam is now blocked**, not just hidden from the list, with no code changes needed in the page itself.
  - `getExamCategories` now accepts `{ grade, department }` and applies the same filter, so the category filter dropdown never shows a category with zero visible results for that student.
- `hooks/useExams.js`, `hooks/useExamDetails.js`, `hooks/useExamCategories.js` — each now reads `grade`/`department` from `useUser()`'s cached profile and gates its query (`enabled`) until both are present, per the new "profile-gated queries" pattern documented in §6.
- No changes were needed in `AvailableExamsPage.jsx` or `ExamDetailsPage.jsx` — both consume their hooks' existing `{ data, isLoading, error }` contract unchanged.

### Corrections to prior documentation made in this pass

- §4 "Exam Discovery (Student)" previously said the active/not-ended filter was "client-side (in `examsApi`)" — reading the actual code shows `applyAvailabilityFilters` builds a Supabase/PostgREST query filter (server-evaluated), not a client-side JS filter. Corrected.

### Still open after this session

See the "Newly discovered gaps" table in §7 as it stood at the time: exam-session flow not audited for targeting, `useUser()` shape not directly verified, minor question-type-selector UX nit in edit mode, and the pre-existing `ReviewStep.jsx` `variation`/`variant` bug (left alone, out of scope).

> **Update, 2026-08-02:** the exam-session targeting audit and the `useUser()` shape verification were completed in the following session — see §11 below. The question-type-selector nit and the `ReviewStep.jsx` prop bug remain open; see §7.

---

## 11. Recent Changes (Session — 2026-08-02)

This session picked up directly from §10's "Still open" list, plus two additional bugs surfaced along the way. Everything below was verified against the actual source files reviewed or edited this session — nothing here is inferred.

### 1. Exam Session Authorization — audited, no code change needed

**Question going in:** did `/student/exam/:examId/session` fetch exam data through the same grade/department-filtered path as `AvailableExamsPage`/`ExamDetailsPage`, or through a separate, unfiltered path?

**Audit performed:** traced the full call graph for `ExamSessionPage` — `App.jsx` routing (no loader), `useExamDetails` → `getExamById` (in `examsApi.js`), `useExamSession` → `examSessionApi.js` (`getExistingAttempt`, `createAttempt`, `getSavedAnswers`, `submitAttempt`), and the supporting hooks `useAutoSave`, `useAntiCheat`, `useCountdownTimer`. Reviewed `useUser.js` and `useStudentExamsHistory`-adjacent `useStudentExamStatus.js` directly (not inferred) to rule out any secondary data path.

**Finding:** `ExamSessionPage` uses `useExamDetails(examId)` — the identical hook and query (`getExamById(examId, { grade, department })`) used by `ExamDetailsPage`. There is no separate fetch. `startSession()` only runs once `exam` is truthy, so a targeting mismatch (which makes `exam` stay `undefined`) prevents attempt creation entirely.

**Verification:** an initial test appeared to show a bypass, but on investigation the test student's profile and the exam's targeting actually matched (the apparent mismatch was a testing-setup issue, not a code defect). Re-tested with a genuinely mismatched student/exam pair: the exam was correctly absent from `AvailableExamsPage`, and direct navigation to the session URL rendered `ExamSessionPage`'s error `EmptyState` rather than starting a session.

**Conclusion:** no code change was required. This item is now resolved and moved out of §7 into §4 ("Exam Session Authorization," under "Exam Session & Anti-Cheat").

**Related, deliberately out of scope:** `create_exam_attempt` (the RPC backing `createAttempt`) has no server-side grade/department check, so a direct RPC call bypassing the React app would not be stopped by anything in this repo. This is not a React-codebase gap — moved to the new §8 "Supabase-side Security Improvements" rather than tracked as unfinished frontend work.

### 2. `useUser()` return shape — confirmed

**Problem:** previously flagged as inferred-by-convention, not verified — multiple hooks assumed `useUser()` returns `{ data: { user, profile }, isLoading }`.

**Verification:** read `src/features/auth/hooks/useUser.js` directly this session. Confirmed: it returns exactly `{ data, isLoading }`, with `data` set via React Query from `getCurrentUser()` and kept in sync with Supabase auth state changes (`onAuthStateChange`). The assumed shape used throughout `useExamDetails`, `useExams`, `useExamCategories`, `useStudentExamStatus`, and `useExamSession` is correct.

**Changed:** no code changes — this closes a documentation/verification gap only. Removed from §7; the previously-inferred shape has been promoted to confirmed fact wherever it's referenced.

### 3. Student exam-history filter crash — fixed

**Problem:** `StudentExamsHistoryPage.jsx` built `filterValues` as `{ difficulty, subject, instructor, status }`, but `status` was never declared anywhere in the component — no state, no prop, no destructure. This isn't a conditional bug; the line executes on every render, so the page threw `ReferenceError: status is not defined` on every load, for every student.

**Investigation:** confirmed `status` was dead/leftover code, not a partially-wired feature — `FilterModal`'s `sections` array never defined a status filter, and the mapper passed to `useFilteredItems` never exposed a `status` field for anything to filter against, so no functioning status filter could have existed even if the variable had been declared.

**Changed:**

- `src/features/exams-history/pages/StudentExamsHistoryPage.jsx` — removed `status` from the `filterValues` object. One-line fix; no other files touched, no behavior change beyond the page no longer crashing.

### 4. `ExamDetailsPage` violated-attempt handling — fixed

**Problem:** the page's status logic only recognized `isCompleted` (`submitted`/`timed_out`) and `isInterrupted` (`in_progress`); a `violated` attempt matched neither, so it silently fell through to the default "never attempted" branch — showing "Start Exam" and allowing a new session to be started, even though `ExamCard` (used on the exams list) already handled `violated` correctly by showing "View Results."

**Changed:**

- `src/features/exams/pages/ExamDetailsPage.jsx` —
  - Added `const isViolated = attemptInfo?.status === "violated";`, mirroring `ExamCard.jsx`'s existing logic.
  - `handleActionClick` now routes to the results page for `isCompleted || isViolated`, not just `isCompleted`.
  - Added a `violated` status badge alongside the existing `completed`/`in-progress` badges.
  - Action button now has a third branch: `violated` → danger variant, "View Results" (matching `ExamCard`'s treatment), positioned ahead of the `isInterrupted` check.
- No other files touched; the `disabled={questionCount === 0}` guard and rules-modal-first start flow were left unchanged as out of scope for this fix.

### 5. Documentation housekeeping

- Split previously-mixed "known gap" and "needs Supabase-side change" items into separate sections (§7 vs. new §8), so unresolved React work isn't conflated with backend/infrastructure work this codebase can't fix on its own.
- Removed resolved items (exam edit wizard, grade/department targeting, exam-session targeting gap) from §7 entirely, per the above.
- Updated §2, §4, and §6 to state previously-inferred or session-dated information as verified, steady-state fact where this session confirmed it (edit-wizard route description, exam discovery targeting coverage, `useUser()` shape).

---

## 12. Recent Changes (Session — 2026-08-02, continued)

This session picked up directly from §7's priority ranking as it stood after §11. Everything below reflects what was actually discussed and, where noted, fixed in this session — not a re-audit of the codebase.

### 1. `ReviewStep.jsx` `variation`/`variant` prop bug — fixed

Priority-ranking #1. User applied the fix directly (swapped `variation="primary"` for `variant="primary"` to match `Button.jsx`'s actual prop name). Confirmed fixed; no longer tracked as an open bug in §7.

### 2. `useLogin` incomplete profile on sign-in — fixed

Priority-ranking #2. `src/features/auth/hooks/useLogin.js` previously cached `{ user, profile: data.user.user_metadata }` on login success — a partial stand-in missing `grade`, `department`, `has_password`, `avatar_url`.

**Fix:** `mutationFn` now calls `loginApi(email, password)` to sign in, then calls the existing `getCurrentUser()` (from `authApi.js`) to fetch the real `profiles` row, and returns that. `onSuccess` caches the result directly via `setQueryData(["user"], data)`, and reads `data.profile.role` (DB role) for the post-login redirect instead of `user_metadata.role`. This reuses the same helper `useUser.js` already trusts, so the cached shape now matches `{ user, profile }` exactly.

**Trade-off noted and accepted:** adds one extra network round-trip on login (the profile fetch). Considered low-cost since `useUser.js`'s `onAuthStateChange` listener would fire `getCurrentUser()` again shortly after anyway (on the `SIGNED_IN` event) — this just moves that fetch earlier so `grade`/`department` are correct from the first render after login, which matters given how much targeting logic depends on them.

### 3. Registration flow audit

Reviewed `useRegister.js`, `RegisterForm.jsx`, and `authApi.js`'s `register`/`signInWithGoogle`. Two findings:

- **Fixed — missing `emailRedirectTo` in `register()`:** `supabase.auth.signUp()` was called with no `emailRedirectTo`, unlike `forgotPassword()` which does set `redirectTo`. Without it, the confirmation-email link falls back to the Supabase project's default Site URL setting, which may not match this app's actual domain. Added `emailRedirectTo: window.location.origin + "/login"` (chosen to match `ConfirmationScreen`'s existing copy, which already tells the user to sign in after confirming).
- **Reviewed, not changed — `signInWithGoogle` hardcoded redirect:** initially suspected this needed a dedicated `/auth/callback` route to redirect by role. On reading `ProtectedRoute.jsx`, confirmed it already redirects on role mismatch (`profile.role !== allowedRole` → other role's dashboard) and on incomplete student profile (→ `/complete-profile`) on the very next render. So `redirectTo: window.location.origin + "/student/dashboard"` is a safe landing pad, not a real routing bug — teachers and incomplete profiles self-correct immediately via existing logic. Left the code as-is; recommended adding a clarifying comment (not yet applied to the repo).

No changes were needed in `ProtectedRoute.jsx` or `CompleteProfilePage.jsx` — both already handle this correctly.

### 4. No teacher registration UI — closed as a product decision

Priority-ranking #3. Confirmed with the project owner: teacher accounts are created manually by the system administrator; the public registration flow is intentionally restricted to students. This is not an incomplete feature — moved out of §7's "Incomplete or broken features" table entirely, since there is no work planned here.

---
