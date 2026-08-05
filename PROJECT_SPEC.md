# EduTest — Project Specification (Current State)

> Generated from codebase exploration on 2026-07-31. This document reflects what exists in the repository today — not a roadmap.
>
> **Updated 2026-08-01** to reflect two implemented features (Exam Edit Wizard, Student Grade/Department Targeting) confirmed against the actual source files touched during that work. Sections not touched by this update still reflect the 2026-07-31 exploration and may be stale — see §10 "Recent Changes" for exactly what was verified.
>
> **Updated 2026-08-02 (continued session)** to reflect: the `ReviewStep.jsx` `variation`/`variant` fix, the `useLogin` incomplete-profile fix, a registration-flow audit (missing `emailRedirectTo` fixed; Google OAuth redirect reviewed and confirmed self-correcting via `ProtectedRoute`, no code change needed), and closing "no teacher registration UI" as an intentional product decision rather than a gap. See §12 "Recent Changes (Session — 2026-08-02, continued)" for detail.
>
> **Updated 2026-08-05** to reflect the pre-deploy hardening pass: the drafted home page redesign is now applied (`HomePage.jsx` is no longer a stub); Row Level Security policies and hardened RPC authorization (`create_exam_attempt`) were added via a new Supabase migration; and a batch of cosmetic/cleanup fixes landed (typo fix in `useSignInWithGoogle`, leftover `console.log` removed from `ChangePasswordCard.jsx`, `variation`→`variant` unified in `ChangePasswordCard.jsx`, project README written). See §13 "Recent Changes (Session — 2026-08-05)" for exactly what changed and what's still open.
>
> **Updated 2026-08-05 (continued session)** to close out the remaining pre-deploy checklist: Supabase credentials moved out of `src/services/supabase.js` into environment variables (`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`), backed by a committed `.env.example` template; the previously hardcoded publishable key (confirmed present in git history, i.e. exposed) was rotated in the Supabase dashboard and the old key revoked; the two new question-fetch RPCs were wired into the frontend and the remaining ownership-checking RPCs were hardened (both reported done by the project owner this session — see caveat in §14); and a fixed demo instructor account (`instructor@edutest.demo`) was created directly in Supabase (Auth user + `profiles.role = 'teacher'`) so evaluators can reach the teacher portal without a real account. See §14 "Recent Changes (Session — 2026-08-05, continued)" for full detail. **Only the Vercel deploy itself and its post-deploy verification remain open** — see §14 "What's still open."

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

**Demo access (added 2026-08-05, continued session):** a fixed demo instructor account exists for evaluators — `instructor@edutest.demo` (created directly via Supabase Auth, with `profiles.role` manually set to `'teacher'`, since teachers can't self-register). See §14 for how it was created and how to rotate/replace it. This is separate from real teacher accounts, which the project owner still provisions manually per the "no teacher registration UI" product decision (§12).

### Shared

- **Profile page** (`ProfilePage`) is reused at `/student/profile` and `/instructor/profile` inside each role’s `ProtectedRoute`.
- **Password reset** (`/forgot-password`, `/reset-password`) is public.

### Data-layer scoping (beyond route protection) — **confirmed, expanded 2026-08-01**

`ProtectedRoute` only controls which _routes_ a role can reach; it says nothing about which _rows_ a query returns once there. Two scoping rules exist at the query layer:

- **Instructor ownership:** exam mutation/lookup RPCs and queries that touch a specific instructor's exams take `p_instructor_id` / `.eq("created_by", instructorId)` and are scoped server-side by that value (`update_exam_with_questions`, `delete_exam`, `update_exam_status`, and the edit-mode fetch `getExamById` in `examWizardApi.js`). A teacher cannot load or mutate another teacher's exam through these paths. **As of 2026-08-05 (continued session), this is reportedly backed by `auth.uid()`-based checks server-side rather than trusting the client-supplied id — see §14 for the verification caveat.**
- **Student grade/department targeting:** confirmed enforced and, as of 2026-08-02, verified through direct testing to cover every entry point a student could use to reach an exam's content — list, details page, and the live exam session itself. See §4 "Exam Discovery (Student)" and "Exam Session Authorization" for detail.

As of 2026-08-05, this scoping is also backed by database-level RLS policies (see §8), not just the application query layer.

---

## 3. Pages / Routes Map

All routes are defined in `src/App.jsx`. Pages are lazy-loaded. `AppLayout` (sidebar + header) wraps most authenticated routes except the exam session and complete-profile flow.

### Public

| Path               | Component            | Purpose                                                                                                        |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `/`                | `HomePage`           | Landing page — hero, student/instructor feature rows, CTAs (applied 2026-08-05; previously a placeholder stub) |
| `/login`           | `LoginPage`          | Email/password + Google sign-in; redirects if already authenticated                                            |
| `/register`        | `RegisterPage`       | Student registration with email confirmation flow                                                              |
| `/forgot-password` | `ForgotPasswordPage` | Sends Supabase password reset email                                                                            |
| `/reset-password`  | `ResetPasswordPage`  | Sets new password after recovery token                                                                         |
| `*`                | `NotFoundPage`       | 404 page with “Go Back” button                                                                                 |

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

- Lists exams where `status = 'active'` AND `ends_at > now()` (server-side query filter via `applyAvailabilityFilters` in `examsApi.js`).
- **Grade/department targeting — implemented and fully verified.** A student only ever sees exams where `exam.grade === profile.grade AND exam.department === profile.department` (exact match, not a togglable filter). Applied consistently across every path a student can use to reach exam content: `getExams`, `getExamById`, `getExamCategories`, and the exam-session entry point itself (verified 2026-08-02, see "Exam Session Authorization" below).
- Search by title/description; filter by category, difficulty, instructor name (client-side for instructor).
- `ExamCard` shows attempt state: start, view results (completed), or violated styling.

### Exam Details & Rules

- Fetches single exam with questions (without `correct_answer` exposed to student queries — **as of 2026-08-05 this is backed by RLS + dedicated RPCs, not just query-level omission; see §8**).
- Shows duration, question count, marks, pass mark, instructor name.
- `ExamRulesModal` displays integrity/time/submission rules from `src/constants/examRules.js`.
- Actions: Start Exam, Resume (in_progress), View Results (submitted/timed_out/violated).

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
- **Question fetching — reportedly updated 2026-08-05 (continued session)** to call the new `get_exam_questions_for_session` / `get_exam_questions_for_review` RPCs instead of reading `questions` directly, now that students have no direct SELECT policy on that table. Reported done by the project owner this session; not independently re-verified against source in this pass — see caveat in §14.

#### Exam Session Authorization — audited and verified 2026-08-02

Confirmed end-to-end (call-graph trace + live testing) that `ExamSessionPage` uses the same grade/department-filtered fetch path as the exam list and details page — no separate unfiltered path exists in the React codebase. The one residual gap (the `create_exam_attempt` RPC not validating grade/department server-side) was closed in the 2026-08-05 RLS/RPC hardening migration (§8).

### Exam Wizard (Create & Edit) — fully implemented

Both flows are complete and share the same three-step component.

- **Step 1 — Exam Details:** title, category, duration, difficulty, start/end datetime, target grade & department, pass percentage, description.
- **Step 2 — Question Builder:** MCQ (4 options) or True/False questions with marks; edit/delete in list.
- **Step 3 — Review & Publish:** summary + confirm; calls `create_exam_with_questions` RPC (create) or `update_exam_with_questions` RPC (edit).
- Wizard state in React context (`ExamWizardContext`); step navigation via `?step=1|2|3` query param.
- **Edit mode:** `ExamWizardPage` fetches the exam via `getExamById(examId, instructorId)` (ownership-scoped), shows a loading state, then seeds `ExamWizardProvider` with `initialExam`/`initialQuestions` before it mounts.
- **Remaining minor nit:** the question-type selector in Step 2 still defaults to "mcq" regardless of the loaded exam's questions; cosmetic only.

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
- Result shaping logic is duplicated between `studentResultApi.js` and `instructorResultApi.js` (deliberately left as-is, low priority).

### Student Management (Instructor)

- RPC `get_instructor_students` returns per-student aggregates: exams taken, avg score, highest, pass rate.
- Search/filter by name, grade, department.

---

## 5. Database Schema (Inferred)

> **Inferred from code usage — not verified against the live database.**
> No `schema.sql` exists in this repo; a migration file exists for the 2026-08-05 RLS/RPC hardening pass (`001_security_rls_and_rpc_hardening.sql`), but RPC function bodies otherwise remain server-side and not visible in-repo.

### Table: `profiles`

Likely extends Supabase `auth.users` (same `id`).

| Column         | Inferred type              | Notes                              |
| -------------- | -------------------------- | ---------------------------------- |
| `id`           | uuid (PK, FK → auth.users) | Used everywhere as user identifier |
| `full_name`    | text                       |                                    |
| `role`         | text                       | `'student'` \| `'teacher'`         |
| `avatar_url`   | text                       | Public URL from Storage            |
| `grade`        | text                       | Student only; e.g. `"Grade 1"`     |
| `department`   | text                       | From `DEPARTMENTS` constant        |
| `has_password` | boolean                    | `false` for Google-only users      |

### Table: `exams`

| Column          | Inferred type           | Notes                                 |
| --------------- | ----------------------- | ------------------------------------- |
| `id`            | uuid (PK)               |                                       |
| `title`         | text                    |                                       |
| `description`   | text                    | nullable                              |
| `category`      | text                    | Subject/category                      |
| `difficulty`    | text                    | `'easy'` \| `'medium'` \| `'hard'`    |
| `duration_mins` | integer                 |                                       |
| `total_marks`   | integer                 | Sum of question marks                 |
| `pass_marks`    | integer                 | Computed from pass percentage         |
| `grade`         | text                    | Target grade for exam                 |
| `department`    | text                    | Target department                     |
| `starts_at`     | timestamptz             |                                       |
| `ends_at`       | timestamptz             |                                       |
| `status`        | text                    | `'draft'` \| `'active'` \| `'closed'` |
| `created_by`    | uuid (FK → profiles.id) | Instructor                            |
| `created_at`    | timestamptz             | Used for ordering                     |

### Table: `questions`

| Column           | Inferred type        | Notes                               |
| ---------------- | -------------------- | ----------------------------------- |
| `id`             | uuid (PK)            |                                     |
| `exam_id`        | uuid (FK → exams.id) |                                     |
| `body`           | text                 | Question text                       |
| `type`           | text                 | `'mcq'` \| `'true_false'`           |
| `options`        | jsonb                | Array of `{ id, text }`             |
| `correct_answer` | text                 | Option id (e.g. `"opt1"`, `"true"`) |
| `marks`          | integer              |                                     |
| `order_index`    | integer              | Display order                       |

**As of 2026-08-05, students have no direct SELECT policy on this table** — reads go through `get_exam_questions_for_session` (never returns `correct_answer`) and `get_exam_questions_for_review` (returns it only after the student's own attempt is finished). See §8.

### Table: `exam_attempts`

| Column         | Inferred type           | Notes                                                             |
| -------------- | ----------------------- | ----------------------------------------------------------------- |
| `id`           | uuid (PK)               |                                                                   |
| `exam_id`      | uuid (FK → exams.id)    |                                                                   |
| `student_id`   | uuid (FK → profiles.id) |                                                                   |
| `started_at`   | timestamptz             | Set by `create_exam_attempt`                                      |
| `submitted_at` | timestamptz             | nullable until finished                                           |
| `status`       | text                    | `'in_progress'` \| `'submitted'` \| `'timed_out'` \| `'violated'` |
| `score`        | integer                 | Set server-side on submit                                         |
| `total_marks`  | integer                 | Snapshot at submit                                                |
| `time_taken`   | integer                 | Seconds                                                           |

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
- RLS-backed storage policies (public-read / own-folder-write) added 2026-08-05.

### Supabase RPC functions (inferred)

| Function                                                                      | Called from                                                          | Inferred purpose                                                                                                                                                                                     |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `create_exam_with_questions(p_exam, p_questions, p_created_by)`               | `examWizardApi.publishExam`                                          | Insert exam + questions atomically; returns exam id                                                                                                                                                  |
| `update_exam_with_questions(p_exam_id, p_exam, p_questions, p_instructor_id)` | `examWizardApi.updateExam`                                           | Update exam + replace questions. **Reportedly hardened to use `auth.uid()` 2026-08-05 (continued session) — not independently re-verified.**                                                         |
| `update_exam_status(p_exam_id, p_status, p_instructor_id)`                    | `examsApi.updateExamStatus`                                          | Change exam status with ownership check. **Same hardening caveat as above.**                                                                                                                         |
| `delete_exam(p_exam_id, p_instructor_id)`                                     | `examsApi.deleteExam`                                                | Delete exam with ownership check. **Same hardening caveat as above.**                                                                                                                                |
| `create_exam_attempt(p_exam_id)`                                              | `examSessionApi.createAttempt`                                       | Create attempt; validates exam status/window/grade/department against `auth.uid()`'s own profile server-side. **Signature changed 2026-08-05 — drops the old client-supplied `p_student_id` param.** |
| `submit_exam_attempt(p_attempt_id, p_answers, p_time_taken, p_status)`        | `examSessionApi.submitAttempt`                                       | Score answers, finalize attempt; returns `{ score, totalMarks }`. **Should be confirmed to check `student_id = auth.uid()` — same hardening caveat.**                                                |
| `get_instructor_students(p_instructor_id)`                                    | `studentsApi.getInstructorStudents`                                  | Returns rows with `full_name`, `email`, `grade`, `department`, `exams_count`, `avg_score`, `highest_score`, `pass_rate`, `student_id`                                                                |
| `get_exam_questions_for_session(p_exam_id)`                                   | `examSessionApi.js` (reportedly wired 2026-08-05, continued session) | SECURITY DEFINER; returns exam questions without `correct_answer`                                                                                                                                    |
| `get_exam_questions_for_review(p_attempt_id)`                                 | Results-review flow (reportedly wired 2026-08-05, continued session) | SECURITY DEFINER; returns questions with `correct_answer`, only after the student's own attempt is finished                                                                                          |

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

### Route protection — **Confirmed**

- `ProtectedRoute` with `allowedRole="student"` or `"teacher"`.
- No admin role anywhere.

### Profile-gated queries — pattern, observed 2026-08-01

Hooks that need the current user's `profile.grade`/`profile.department` pull them from `useUser()`'s cached `["user"]` query and pass `enabled: hasTargetingInfo` to their own `useQuery`, rather than letting the query fire with `undefined` filter values while the profile is still loading.

### Provider seeded before mount, not after — pattern, observed 2026-08-01

`ExamWizardProvider` reads `initialExam`/`initialQuestions` once via `useState(initialExam)` at construction time. The edit-wizard fix follows a "fetch first, mount second" shape: `ExamWizardPage` shows a loading state and only renders `<ExamWizardProvider>` once the async fetch resolves.

### Credentials via environment variables — pattern, established 2026-08-05 (continued session)

`src/services/supabase.js` no longer hardcodes the Supabase project URL or anon key. It reads `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`, and throws a clear startup error if either is missing rather than silently failing later. A `.env.example` (committed) documents the expected variable names; the real `.env` is git-ignored. This is now the expected pattern for any future secret/config value — see §14.

### Other conventions

- **Plain JavaScript** — no TypeScript in `src/`.
- **Path alias:** `@/` → `src/` (Vite).
- **Theming:** Tailwind v4 `@theme` in `src/index.css` with `--color-`\* custom properties; dark theme by default.
- **Forms:** `react-hook-form` throughout auth, profile, wizard.
- **UI:** Primarily custom components in `components/shared/`; shadcn/ui minimally adopted (`components/ui/button.jsx` only).
- **Naming inconsistency:** UI routes say “instructor”; DB role is “teacher”; sidebar says “Teacher Portal”.

---

## 7. Known Gaps / Incomplete Areas / TODOs

> Resolved through 2026-08-02: exam edit wizard, grade/department targeting (incl. exam-session entry point), student exam-history filter crash, `ExamDetailsPage` violated-attempt handling, `useUser()` return shape.
> Resolved 2026-08-05: home page redesign, RLS policies, `create_exam_attempt` hardening, README, several cosmetic fixes.
> Resolved 2026-08-05 (continued session): Supabase keys moved to env vars (and the exposed key rotated); question-fetch RPCs wired into the frontend (reported); remaining ownership-checking RPCs hardened (reported) — see §14 for verification caveats on the last two.

### Remaining minor gaps

| Issue                                                             | Location                                          | Detail                                                                                  |
| ----------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Question-type selector doesn't follow loaded question on edit** | `QuestionBuilderStep.jsx` (exam-wizard edit mode) | Defaults to "mcq" regardless of the edited exam's actual question types; cosmetic only. |

### Technical debt & inconsistencies

| Issue                           | Detail                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Duplicate result logic**      | `studentResultApi.js` and `instructorResultApi.js` share nearly identical question-grading mapping. **Deliberately left as-is** — flagged for a future refactor.                                                                                                                                                                                                                                                  |
| **Unused hook**                 | `src/hooks/useFilteredExams.js` is never imported. Still unused; kept in place pending a decision to wire it up or delete it.                                                                                                                                                                                                                                                                                     |
| **Mixed Button APIs**           | Some components use `variant`, others `variation`. Fixed: `ReviewStep.jsx`, `ChangePasswordCard.jsx`. `QuestionBuilderStep.jsx` audited and found already consistent. Remaining components not yet audited: `MCQForm.jsx`, `Button.jsx` itself, and any other consumers of `Button`.                                                                                                                              |
| **Commented-out UI blocks**     | Large commented sections in `ExamSessionPage.jsx`, `ExamDetailsPage.jsx`, `ExamCard.jsx`, `Sidebar.jsx`. **Deliberately left as-is** per explicit instruction.                                                                                                                                                                                                                                                    |
| `ResetPasswordPage`             | Imports `useLogout` but never uses it after manual `signOut`. Not yet addressed.                                                                                                                                                                                                                                                                                                                                  |
| ~~**Typo in hook export**~~     | ~~`useSignInWithGoogle` exports `singInWithGoogle`~~ — **fixed**: now exports `signInWithGoogle`.                                                                                                                                                                                                                                                                                                                 |
| ~~**Console logging**~~         | ~~`console.log(data)` left in `ChangePasswordCard.jsx`~~ — **fixed**, removed.                                                                                                                                                                                                                                                                                                                                    |
| ~~**Supabase keys in source**~~ | ~~`src/services/supabase.js` contained the project URL and publishable key inline~~ — **fixed 2026-08-05 (continued session)**: moved to `import.meta.env.VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, with a startup error if unset. `.env.example` committed; `.env` git-ignored. The previously-exposed key (present in git history) was rotated in the Supabase dashboard and the old key revoked. See §14. |
| ~~**README**~~                  | ~~Default Vite template text; no project-specific docs~~ — **fixed**: full project README written.                                                                                                                                                                                                                                                                                                                |
| **NotFoundPage**                | Minimal unstyled back button. Not yet addressed.                                                                                                                                                                                                                                                                                                                                                                  |

### Missing error handling / edge cases

- Auto-save failures are logged but not surfaced to the user.
- Exam session submit failure restores timer but user may be stuck with limited feedback beyond `error` state (not prominently displayed in `ExamSessionPage`).
- No email verification gate on login (relies on Supabase config).

### Security notes

- Student-facing exam queries omit `correct_answer` on questions. **As of 2026-08-05**, this is backed by a database-level control: the `questions` table has no student-facing SELECT policy at all; students read questions exclusively through `get_exam_questions_for_session` and `get_exam_questions_for_review`. **As of 2026-08-05 (continued session), the frontend has reportedly been switched over to call these RPCs** (`examSessionApi.js` and the results-review question-fetch) — reported done by the project owner; not independently re-verified against source in this pass. Recommended: confirm with a live test that exam sessions and result review still load questions correctly post-switch, since this was previously flagged as a functional blocker if left unwired.
- Correct answers are shown only on result pages after submission.
- Anti-cheat is client-side only — bypassable by determined users (inherent limitation).
- Database-level scoping (RLS, RPC-level authorization) — **implemented 2026-08-05**, see §8.
- Ownership-checking RPCs (`update_exam_with_questions`, `update_exam_status`, `delete_exam`, `submit_exam_attempt`) — **reportedly hardened to use `auth.uid()` 2026-08-05 (continued session)**, closing the gap flagged in the original hardening pass. Reported done by the project owner directly in the Supabase dashboard (function bodies aren't in this repo); not independently re-verified against source in this pass. Recommended: a quick manual test — e.g. confirm a teacher still can't edit/delete another teacher's exam, and that `submit_exam_attempt` rejects a mismatched `student_id`.
- Supabase credentials are no longer hardcoded in source (§14); the exposed key was rotated and the old key revoked in the Supabase dashboard.

### Priority Ranking (Remaining Work) — updated 2026-08-05 (continued session)

> Everything below the line that was previously the "remaining, current priority order" (question-fetch RPC wiring, ownership-RPC hardening, env-var migration) has now been addressed this session. What's left is **deployment itself**, plus long-standing low-priority cosmetic items.

**Remaining, current priority order:**

1. **Deploy to Vercel** and configure `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` as environment variables in the Vercel project settings (the `.env` file itself is git-ignored and won't ship). See §14 for the pre-deploy checklist.
2. **Post-deploy smoke test**: register a new student, sign in as the demo instructor (`instructor@edutest.demo`), create an exam, take it as a student, submit, and view results on both sides — to confirm the RPC-wiring and RLS changes reported this session actually hold up against the deployed build.
3. **Question-type selector edit-mode nit, duplicate result logic, unused hook, remaining `variant`/`variation` audit (`MCQForm.jsx`, `Button.jsx`, others), commented-out code, `ResetPasswordPage` unused import, `NotFoundPage` styling** — cosmetic/cleanup, low urgency, no functional risk, safe to defer past initial deploy.

---

## 8. Supabase-side Security Improvements

> These items require changes in the Supabase project (SQL migrations, RLS policies, or RPC function bodies) rather than in this React codebase.

### Done — 2026-08-05

A migration (`001_security_rls_and_rpc_hardening.sql`) was written and applied covering:

| Issue                                                      | Resolution                                                                                                                                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **No RLS policies defined**                                | RLS enabled and policies added on `profiles`, `exams`, `questions`, `exam_attempts`, and `answers`, matching the ownership/targeting rules previously enforced only at the application-query layer.    |
| **`create_exam_attempt` has no server-side authorization** | Rewritten to take only `p_exam_id` (no client-supplied `p_student_id`) and validate the exam's `status`/`ends_at`/`grade`/`department` against `auth.uid()`'s own profile before creating an attempt.  |
| **Correct answers reachable via direct table access**      | Added two SECURITY DEFINER RPCs — `get_exam_questions_for_session` (never exposes `correct_answer`) and `get_exam_questions_for_review` (exposes it only after the student's own attempt is finished). |
| **Storage bucket policies**                                | Added public-read / own-folder-write policies for the `avatars` bucket.                                                                                                                                |

### Done — 2026-08-05 (continued session)

| Issue                                                                   | Resolution                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend still reading `questions` directly instead of the new RPCs** | Reported fixed by the project owner: `examSessionApi.js` and the results-review question-fetch now call `get_exam_questions_for_session` / `get_exam_questions_for_review`. Not independently re-verified against source this session — recommend a live smoke test (see §7 priority item 2).                                                                                           |
| **Other ownership-checking RPCs still trusted client-supplied IDs**     | Reported fixed by the project owner directly in the Supabase dashboard: `update_exam_with_questions`, `update_exam_status`, `delete_exam`, and `submit_exam_attempt` reportedly now use `auth.uid()` internally instead of a client-supplied id. Not independently re-verified against source (function bodies aren't in this repo) — recommend a manual test (see §7 priority item 2). |
| **Supabase keys inline in source**                                      | Fixed: `src/services/supabase.js` now reads from `import.meta.env`. See §14 for full detail, including the key rotation.                                                                                                                                                                                                                                                                |

### Still open

| Issue                                | Detail                                                                                                                                                                                                                                                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`answers` writes not RPC-wrapped** | Auto-save still writes directly to the `answers` table (RLS-gated to the student's own in-progress attempt, which is a real improvement over before) rather than through a SECURITY DEFINER RPC. Recommended as a future hardening step so `is_correct` can never be client-writable even in theory. |

---

## 9. Third-Party Integrations

### Supabase Auth

- Client: `@supabase/supabase-js` in `src/services/supabase.js`, configured via env vars (§14).
- **Email/password:** sign-up, sign-in, sign-out, password reset, update password.
- **Google OAuth:** `signInWithOAuth({ provider: "google", redirectTo: origin + "/student/dashboard" })`.
- **Session listener:** `supabase.auth.onAuthStateChange` in `useUser` syncs React Query `["user"]` cache.
- **Registration metadata:** `{ full_name, role: "student" }` passed in `signUp` options — implies a DB trigger populates `profiles` from auth metadata (not in repo). Confirmed 2026-08-05 (continued session): a user created directly via the Supabase Auth dashboard ("Add user") also gets a `profiles` row auto-created by this trigger, but with default values (`role = 'student'`, `full_name = 'New User'`) — these need manual correction after dashboard-created users (see §14).

### Supabase Postgres

- All application data via `.from()` queries and `.rpc()` calls documented above.
- Row Level Security policies — **implemented 2026-08-05**, see §8.

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
│   ├── services/supabase.js    # Reads Supabase URL/key from env vars (see §14)
│   ├── utils/constants.js
│   └── lib/utils.js
├── public/default-avatar.jpg
├── .env.example                 # Committed template for required env vars (added 2026-08-05)
├── .env                          # Git-ignored; real Supabase credentials (added 2026-08-05)
├── package.json
└── vite.config.js
```

---

## 10. Recent Changes (Session — 2026-08-01)

Two features were implemented in this session: Exam Edit Wizard and Student Grade/Department Targeting. Both moved from §7 "Known Gaps" into §4 "Features Implemented." See prior versions of this document for full detail; summarized in §4/§6 above.

---

## 11. Recent Changes (Session — 2026-08-02)

- **Exam Session Authorization** — audited end-to-end, confirmed no separate unfiltered fetch path exists; no code change needed.
- **`useUser()` return shape** — confirmed by reading source directly: `{ data, isLoading }`.
- **Student exam-history filter crash** — fixed (removed a dead, never-declared `status` reference in `StudentExamsHistoryPage.jsx`).
- **`ExamDetailsPage` violated-attempt handling** — fixed (now routes `violated` attempts to the results page like `ExamCard` already did).
- Documentation split into "known React gaps" (§7) vs. "needs Supabase-side change" (§8).

---

## 12. Recent Changes (Session — 2026-08-02, continued)

- **`ReviewStep.jsx` `variation`/`variant` prop bug** — fixed.
- **`useLogin` incomplete profile on sign-in** — fixed; now fetches the real `profiles` row via `getCurrentUser()` instead of caching `user_metadata` as a stand-in.
- **Registration flow audit** — missing `emailRedirectTo` in `register()` fixed; Google OAuth hardcoded redirect reviewed and confirmed self-correcting via `ProtectedRoute`, left as-is.
- **No teacher registration UI** — closed as an intentional product decision (admin-provisioned teacher accounts), not a gap.

---

## 13. Recent Changes (Session — 2026-08-05)

- **Home page** — the drafted redesign (hero, feature rows, CTAs) applied; `HomePage.jsx` is no longer a stub.
- **Supabase RLS + RPC hardening (first pass)** — migration `001_security_rls_and_rpc_hardening.sql` written and applied: RLS enabled on core tables, `create_exam_attempt` hardened, two new question-read RPCs added, storage policies added for `avatars`. Frontend wiring to the new RPCs and hardening of the remaining ownership-checking RPCs were left open at the end of this session (see §7/§8 at the time).
- **Cleanup pass** (scoped to 4 files): typo fix in `useSignInWithGoogle`, `console.log` removed and `variation`→`variant` fixed in `ChangePasswordCard.jsx`, `QuestionBuilderStep.jsx` audited (already consistent), `useFilteredExams.js` reviewed (still unused, left in place).
- **README** — full project README written (overview, features, tech stack, setup/env vars, Supabase migration steps, deploy checklist).

---

## 14. Recent Changes (Session — 2026-08-05, continued)

This session closed out the remaining pre-deploy checklist from §13. Everything below was either done directly in this conversation (env var migration, key rotation, demo instructor account) or reported done by the project owner outside this conversation (RPC wiring, ownership-RPC hardening) — the distinction matters for what still needs verification, called out explicitly below.

### 1. Supabase credentials moved to environment variables — done, verified in this session

**Problem:** `src/services/supabase.js` had the Supabase project URL and publishable (anon) key hardcoded as string literals directly in source, committed to git.

**Changed:**

- `src/services/supabase.js` — now reads `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`, and throws a descriptive startup error if either is missing (pointing to `.env.example`) instead of failing silently or later with an opaque Supabase client error.
- `.env.example` — new file, committed to git. Documents the two required variable names with placeholder values.
- `.env` — new file, added to `.gitignore`. Holds the real values locally.
- `.gitignore` — updated to exclude `.env`.

**Verified:** the project owner confirmed the app runs correctly locally with the new env-var-based setup.

### 2. Exposed key rotated — done, verified in this session

**Problem:** `git log -p -- src/services/supabase.js` confirmed the original hardcoded publishable key (`sb_publishable_l29eRpLNMlFVjuhCVsigqg_tnYzM8-q`) was present in an earlier commit — meaning it was exposed in git history even after being removed from the current working file. Since the repository is intended to be shared (e.g. pushed to GitHub for others to clone), this counted as a real exposure, not just a theoretical one.

**Resolution taken:** rather than rewriting git history (higher-effort, riskier with collaborators), the key itself was rotated:

- A new publishable key was generated in Supabase Dashboard → Settings → API.
- The new key was verified working in the running app.
- The old, exposed key was explicitly deleted/revoked from the Supabase dashboard, so it can no longer authenticate even though it remains visible in git history.

**Residual note:** the old key string is still readable by anyone who inspects the git history, but it is now inert. If the repository's git history is ever cleaned (e.g. via `git filter-repo` or BFG) that would remove the visible string too, but this is not required for security purposes now that the key is revoked — noted here only as an optional future cleanup, not a blocker.

### 3. Question-fetch RPCs wired into the frontend — reported done, not independently re-verified this session

Per the project owner: `examSessionApi.js` (live exam session) and the results-review question-fetch have been switched from direct `supabase.from('questions')` reads to the two SECURITY DEFINER RPCs added in the 2026-08-05 first-pass migration (`get_exam_questions_for_session`, `get_exam_questions_for_review`).

**This was previously flagged as a functional blocker** — without it, exam sessions and result review would break for students, since students have no direct SELECT policy on `questions` post-migration. The project owner reports this is now done. This document records it as resolved based on that report; it was not re-verified against the actual source files in this session (the files weren't shared in this conversation). **Recommended before/immediately after deploy: a live smoke test** — start an exam session as a student and open a finished attempt's result-review screen, to confirm questions (and, on review, correct answers) load correctly.

### 4. Remaining ownership-checking RPCs hardened — reported done, not independently re-verified this session

Per the project owner: `update_exam_with_questions`, `update_exam_status`, `delete_exam`, and `submit_exam_attempt` have been updated directly in the Supabase dashboard to use `auth.uid()` internally for their ownership/identity checks, instead of trusting a client-supplied `p_instructor_id` / `p_student_id` parameter — matching the pattern already applied to `create_exam_attempt` in the first hardening pass.

Since these RPC function bodies live in Supabase and aren't tracked in this repo, this document records the change as reported rather than independently confirmed. **Recommended before/immediately after deploy:** a couple of quick manual checks — e.g. confirm a teacher account still cannot edit or delete another teacher's exam, and that submitting an attempt under a mismatched student context is rejected.

### 5. Fixed demo instructor account created

**Problem:** during development, the project owner had been signing in as an instructor using their own real personal email. Before handing the project to others to evaluate, a non-personal, disposable "teacher" login was needed — and per the product's existing design (§2, §12), teachers can't self-register through the UI, so this had to be created directly in Supabase.

**Decision:** use a non-real (never-to-be-confirmed) email address rather than a real inbox, since teacher accounts don't go through the email-confirmation flow that student registration does (`role = 'teacher'` accounts are expected to pre-exist in the database, not sign up).

**Steps taken:**

1. Created a new user directly via Supabase Dashboard → Authentication → Users → "Add user", with `Auto Confirm User` enabled, using a disposable, clearly-non-personal address (`instructor@edutest.demo`) and a fresh password unrelated to any personal credentials.
2. Confirmed via SQL Editor that Supabase's existing signup trigger auto-created a matching `profiles` row for the new user, but with default values (`role = 'student'`, `full_name = 'New User'`) — dashboard-created users don't carry the `role: "teacher"` metadata that the normal `/register` flow would never set anyway (registration is student-only, per §12).
3. Ran a manual `update` against `profiles` to set `role = 'teacher'` and `full_name = 'Demo Instructor'` for that user's `id`.
4. Verified via a follow-up `select` that the row updated correctly.
5. Verified end-to-end by logging into the running app with the new credentials — confirmed it lands on `/instructor/dashboard` as expected (not `/complete-profile`, since the grade/department completeness check in `ProtectedRoute` only applies to students).

**Result:** `instructor@edutest.demo` is now a working, disposable teacher login safe to share with anyone evaluating the project, fully decoupled from the project owner's personal email.

**Note for the README / handoff notes:** if these demo credentials are shared publicly (e.g. printed in the README for evaluators), anyone with them can create/edit/delete exams under this identity. This is expected for a demo account, but worth a one-line callout in the README so evaluators know it's a shared demo identity, not a personal account. Rotating this password periodically, or recreating the account if it gets misused, is a reasonable low-effort safeguard — no urgent action needed before deploy.

### What's still open

Per §7's updated priority list, only the following remain:

1. **Deploy to Vercel**, including setting `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` in the Vercel project's environment variables (not just the local `.env`, which won't be picked up by Vercel automatically).
2. **Post-deploy smoke test** covering: student registration, demo-instructor login, exam creation, taking an exam as a student, and viewing results on both sides — primarily to confirm items 3 and 4 above (RPC wiring and RPC hardening) hold up in the deployed environment, since they weren't independently re-verified against source this session.
3. Long-standing low-priority cosmetic items (question-type selector nit, duplicate result logic, unused hook, remaining `variant`/`variation` audit, commented-out code, `ResetPasswordPage`/`NotFoundPage` polish) — safe to defer past initial deploy.

---
