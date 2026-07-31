# EduTest — Project Specification (Current State)

> Generated from codebase exploration on 2026-07-31. This document reflects what exists in the repository today — not a roadmap.

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

| Role (DB value) | UI label | Fallback dashboard |
|-----------------|----------|-------------------|
| `student` | Student | `/student/dashboard` |
| `teacher` | Teacher / Instructor | `/instructor/dashboard` |

There is **no admin role** in the codebase.

### Route protection (`ProtectedRoute`)

`src/components/ProtectedRoute.jsx` enforces:

1. **Authentication** — unauthenticated users redirect to `/login`.
2. **Role match** — if `allowedRole` is set and `profile.role` differs, redirect to the other role’s dashboard.
3. **Student profile completeness** — students without both `grade` and `department` are forced to `/complete-profile` (except when already on that route).

### What students can do

| Capability | Evidence |
|------------|----------|
| Register (email/password) | `/register` → `authApi.register` with `role: "student"` |
| Sign in (email or Google OAuth) | `/login` |
| Complete profile (grade + department) | `/complete-profile` |
| View dashboard stats & charts | `/student/dashboard` |
| Browse/filter available exams | `/student/exams` |
| View exam details, start/resume/view results | `/student/exams/:examId` |
| Take exam in fullscreen session (no AppLayout) | `/student/exam/:examId/session` |
| View exam submission history | `/student/exams-history` |
| View own attempt results & answer review | `/student/results/:attemptId` |
| Edit profile, avatar, password | `/student/profile` |

Students **cannot** access any `/instructor/*` route (blocked by `ProtectedRoute`).

### What teachers can do

| Capability | Evidence |
|------------|----------|
| Sign in (no teacher self-registration in UI) | `/login` |
| View instructor dashboard | `/instructor/dashboard` |
| Create exam (3-step wizard) | `/instructor/exam-wizard` |
| Edit exam route exists | `/instructor/exam-wizard/:examId` *(see gaps — edit not fully wired)* |
| Manage exams (status, edit, delete) | `/instructor/exams-management` |
| View all student submissions on their exams | `/instructor/exams-history` |
| View students who took their exams + stats | `/instructor/students` |
| View a student’s attempt result | `/instructor/results/:attemptId` |
| Edit profile, avatar, password | `/instructor/profile` |

Teachers **cannot** access student exam session routes or `/student/*` routes.

### Shared

- **Profile page** (`ProfilePage`) is reused at `/student/profile` and `/instructor/profile` inside each role’s `ProtectedRoute`.
- **Password reset** (`/forgot-password`, `/reset-password`) is public.

---

## 3. Pages / Routes Map

All routes are defined in `src/App.jsx`. Pages are lazy-loaded. `AppLayout` (sidebar + header) wraps most authenticated routes except the exam session and complete-profile flow.

### Public

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `HomePage` | Placeholder landing page (“Home Page” text only) |
| `/login` | `LoginPage` | Email/password + Google sign-in; redirects if already authenticated |
| `/register` | `RegisterPage` | Student registration with email confirmation flow |
| `/forgot-password` | `ForgotPasswordPage` | Sends Supabase password reset email |
| `/reset-password` | `ResetPasswordPage` | Sets new password after recovery token |
| `*` | `NotFoundPage` | 404 page with “Go Back” button |

### Student (`ProtectedRoute allowedRole="student"`)

| Path | Layout | Component | Purpose |
|------|--------|-----------|---------|
| `/complete-profile` | Standalone | `CompleteProfilePage` | Force grade/department selection for new students |
| `/student/dashboard` | AppLayout | `StudentDashboardPage` | Stats, performance chart, answers breakdown, recent exams table |
| `/student/exams` | AppLayout | `AvailableExamsPage` | Search/filter grid of active exams |
| `/student/exams/:examId` | AppLayout | `ExamDetailsPage` | Exam metadata, rules modal, start/resume/view results |
| `/student/exams-history` | AppLayout | `StudentExamsHistoryPage` | Table of past submissions with filters |
| `/student/results/:attemptId` | AppLayout | `StudentResultPage` | Score summary + per-question answer review |
| `/student/profile` | AppLayout | `ProfilePage` | Personal info + password management |
| `/student/exam/:examId/session` | Fullscreen (no sidebar) | `ExamSessionPage` | Live exam: timer, questions, anti-cheat, auto-save |

### Teacher (`ProtectedRoute allowedRole="teacher"`)

| Path | Layout | Component | Purpose |
|------|--------|-----------|---------|
| `/instructor/dashboard` | AppLayout | `InstructorDashboard` | Exam/submission stats, charts, recent submissions |
| `/instructor/exam-wizard` | AppLayout | `ExamWizardPage` | 3-step create exam wizard |
| `/instructor/exam-wizard/:examId` | AppLayout | `ExamWizardPage` | Intended edit flow *(same component; see gaps)* |
| `/instructor/exams-management` | AppLayout | `ExamsManagementPage` | Table of instructor’s exams with status/edit/delete |
| `/instructor/exams-history` | AppLayout | `InstructorExamHistoryPage` | All student submissions on instructor’s exams |
| `/instructor/students` | AppLayout | `StudentsListPage` | Aggregated student stats for instructor’s exams |
| `/instructor/results/:attemptId` | AppLayout | `InstructorResultPage` | View student attempt (no review notes) |
| `/instructor/profile` | AppLayout | `ProfilePage` | Shared profile page |

**Naming note:** URLs use `/instructor/*` but the database role value is `"teacher"`.

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

- Lists exams where `status = 'active'` AND `ends_at > now()` (client-side filter in `examsApi`).
- Search by title/description; filter by category, difficulty, instructor name (client-side for instructor).
- `ExamCard` shows attempt state: start, view results (completed), or violated styling.

### Exam Details & Rules

- Fetches single exam with questions (without `correct_answer` exposed to student queries).
- Shows duration, question count, marks, pass mark, instructor name.
- `ExamRulesModal` displays integrity/time/submission rules from `src/constants/examRules.js`.
- Actions: Start Exam, Resume (in_progress), View Results (submitted/timed_out).

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

### Exam Wizard (Create)

- **Step 1 — Exam Details:** title, category, duration, difficulty, start/end datetime, target grade & department, pass percentage, description.
- **Step 2 — Question Builder:** MCQ (4 options) or True/False questions with marks; edit/delete in list.
- **Step 3 — Review & Publish:** summary + confirm; calls `create_exam_with_questions` RPC.
- Wizard state in React context (`ExamWizardContext`); step navigation via `?step=1|2|3` query param.
- `pass_marks` and `total_marks` computed client-side before RPC.

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

| Column | Inferred type | Notes |
|--------|---------------|-------|
| `id` | uuid (PK, FK → auth.users) | Used everywhere as user identifier |
| `full_name` | text | |
| `role` | text | `'student'` \| `'teacher'` |
| `avatar_url` | text | Public URL from Storage |
| `grade` | text | Student only; e.g. `"Grade 1"` |
| `department` | text | From `DEPARTMENTS` constant |
| `has_password` | boolean | `false` for Google-only users |

### Table: `exams`

| Column | Inferred type | Notes |
|--------|---------------|-------|
| `id` | uuid (PK) | |
| `title` | text | |
| `description` | text | nullable |
| `category` | text | Subject/category |
| `difficulty` | text | `'easy'` \| `'medium'` \| `'hard'` |
| `duration_mins` | integer | |
| `total_marks` | integer | Sum of question marks |
| `pass_marks` | integer | Computed from pass percentage |
| `grade` | text | Target grade for exam |
| `department` | text | Target department |
| `starts_at` | timestamptz | |
| `ends_at` | timestamptz | |
| `status` | text | `'draft'` \| `'active'` \| `'closed'` |
| `created_by` | uuid (FK → profiles.id) | Instructor |
| `created_at` | timestamptz | Used for ordering |

### Table: `questions`

| Column | Inferred type | Notes |
|--------|---------------|-------|
| `id` | uuid (PK) | |
| `exam_id` | uuid (FK → exams.id) | |
| `body` | text | Question text |
| `type` | text | `'mcq'` \| `'true_false'` |
| `options` | jsonb | Array of `{ id, text }` |
| `correct_answer` | text | Option id (e.g. `"opt1"`, `"true"`) |
| `marks` | integer | |
| `order_index` | integer | Display order |

### Table: `exam_attempts`

| Column | Inferred type | Notes |
|--------|---------------|-------|
| `id` | uuid (PK) | |
| `exam_id` | uuid (FK → exams.id) | |
| `student_id` | uuid (FK → profiles.id) | |
| `started_at` | timestamptz | Set by `create_exam_attempt` |
| `submitted_at` | timestamptz | nullable until finished |
| `status` | text | `'in_progress'` \| `'submitted'` \| `'timed_out'` \| `'violated'` |
| `score` | integer | Set server-side on submit |
| `total_marks` | integer | Snapshot at submit |
| `time_taken` | integer | Seconds |

*Code references `remaining_seconds` on attempt object in `useExamSession` but it is not selected in `getExistingAttempt` — may come from RPC or is unused fallback.*

### Table: `answers`

| Column | Inferred type | Notes |
|--------|---------------|-------|
| `attempt_id` | uuid (FK) | Part of unique constraint |
| `question_id` | uuid (FK) | Part of unique constraint |
| `selected` | text | Selected option id; nullable = skipped |
| `is_correct` | boolean | Set server-side on submit |
| `is_bookmarked` | boolean | Session bookmark flag |
| `updated_at` | timestamptz | Sent on upsert |

**Unique constraint (inferred):** `(attempt_id, question_id)` — used in upsert `onConflict`.

### Storage bucket: `avatars`

- Path pattern: `{userId}/avatar.{ext}`
- Public URL stored on `profiles.avatar_url`
- Upload with `upsert: true`

### Supabase RPC functions (inferred)

| Function | Called from | Inferred purpose |
|----------|-------------|------------------|
| `create_exam_with_questions(p_exam, p_questions, p_created_by)` | `examWizardApi.publishExam` | Insert exam + questions atomically; returns exam id |
| `update_exam_with_questions(p_exam_id, p_exam, p_questions, p_instructor_id)` | `examWizardApi.updateExam` | Update exam + replace questions |
| `update_exam_status(p_exam_id, p_status, p_instructor_id)` | `examsApi.updateExamStatus` | Change exam status with ownership check |
| `delete_exam(p_exam_id, p_instructor_id)` | `examsApi.deleteExam` | Delete exam with ownership check |
| `create_exam_attempt(p_exam_id, p_student_id)` | `examSessionApi.createAttempt` | Create attempt; returns `{ id, started_at }` |
| `submit_exam_attempt(p_attempt_id, p_answers, p_time_taken, p_status)` | `examSessionApi.submitAttempt` | Score answers, finalize attempt; returns `{ score, totalMarks }` |
| `get_instructor_students(p_instructor_id)` | `studentsApi.getInstructorStudents` | Returns rows with `full_name`, `email`, `grade`, `department`, `exams_count`, `avg_score`, `highest_score`, `pass_rate`, `student_id` |

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

| Pattern | Status |
|---------|--------|
| Services = raw Supabase calls | ✅ Consistently in `*Api.js` / `*ExamsHistory.js` files |
| Hooks = React Query + navigation/toasts | ✅ Common pattern (e.g. `usePublishExam`, `useDeleteExam`, `useLogin`) |
| Business logic in hooks | ⚠️ Some aggregation lives in services (dashboard APIs) or hooks (`useExamsManagement` adds `has_submissions`) |
| Pages call hooks, not services directly | ⚠️ `ForgotPasswordPage` calls `authApi.forgotPassword` directly |
| `ChangePasswordCard` calls `supabase.auth.resetPasswordForEmail` directly | ⚠️ Bypasses service layer |

### `setQueryData` vs `invalidateQueries` — **Mixed**

- **`setQueryData` used for:** auth session (`useUser`, `useLogin`, `useSetPassword`).
- **`invalidateQueries` used for:** profile update, avatar upload, instructor exam list after status change/delete.

The stated preference for `setQueryData` is **not consistently applied** outside auth.

### Route protection — **Confirmed**

- `ProtectedRoute` with `allowedRole="student"` or `"teacher"`.
- No admin role anywhere.

### Other conventions

- **Plain JavaScript** — no TypeScript in `src/`.
- **Path alias:** `@/` → `src/` (Vite).
- **Theming:** Tailwind v4 `@theme` in `src/index.css` with `--color-*` custom properties; dark theme by default.
- **Forms:** `react-hook-form` throughout auth, profile, wizard.
- **UI:** Primarily custom components in `components/shared/`; shadcn/ui minimally adopted (`components/ui/button.jsx` only).
- **Naming inconsistency:** UI routes say “instructor”; DB role is “teacher”; sidebar says “Teacher Portal”.

---

## 7. Known Gaps / Incomplete Areas / TODOs

### Incomplete or broken features

| Issue | Location | Detail |
|-------|----------|--------|
| **Home page is a stub** | `src/pages/HomePage.jsx` | Only renders “Home Page” text |
| **Exam edit wizard not wired** | `ExamWizardPage`, route `:examId` | Route and `useUpdateExam` exist, but page never loads existing exam into `ExamWizardProvider`; `isEditMode` is always false on create flow |
| **Student history filter bug** | `StudentExamsHistoryPage.jsx` | `filterValues` references undefined `status` variable — likely runtime error if filtering runs |
| **Violated attempt on ExamDetailsPage** | `ExamDetailsPage.jsx` | Only treats `submitted`/`timed_out` as completed and `in_progress` as interrupted; `violated` falls through to “Start Exam” (ExamCard handles violated correctly) |
| **Grade/department exam targeting not enforced** | `examsApi.getExams` | Exams have `grade`/`department` fields (wizard + management) but available exams query does not filter by student profile |
| **No teacher registration UI** | `authApi.register` | All sign-ups are `role: "student"`; teachers must be provisioned externally |

### Technical debt & inconsistencies

| Issue | Detail |
|-------|--------|
| **`useLogin` sets incomplete profile** | On success, caches `{ user, profile: data.user.user_metadata }` instead of full `profiles` row — missing `grade`, `department`, `has_password`, `avatar_url` until `useUser` refetches |
| **Google OAuth redirect** | Always redirects to `/student/dashboard` even for teachers (`authApi.signInWithGoogle`) |
| **Duplicate result logic** | `studentResultApi.js` and `instructorResultApi.js` share nearly identical question-grading mapping |
| **Unused hook** | `src/hooks/useFilteredExams.js` is never imported |
| **Button prop inconsistency** | `ReviewStep.jsx` uses `variation="primary"` but `Button.jsx` expects `variant` — styling may not apply |
| **Mixed Button APIs** | Some components use `variant`, others `variation` |
| **Commented-out UI blocks** | Large commented sections in `ExamSessionPage.jsx`, `ExamDetailsPage.jsx`, `ExamCard.jsx`, `Sidebar.jsx` |
| **`ResetPasswordPage`** | Imports `useLogout` but never uses it after manual `signOut` |
| **Typo in hook export** | `useSignInWithGoogle` exports `singInWithGoogle` |
| **Console logging** | `console.log(data)` left in `ChangePasswordCard.jsx`; `console.error` in exam session hooks (may be intentional for debugging) |
| **Supabase keys in source** | `src/services/supabase.js` contains project URL and publishable key inline |
| **README** | Default Vite template text; no project-specific docs |
| **NotFoundPage** | Minimal unstyled back button |

### Missing error handling / edge cases

- Auto-save failures are logged but not surfaced to the user.
- Exam session submit failure restores timer but user may be stuck with limited feedback beyond `error` state (not prominently displayed in `ExamSessionPage`).
- No email verification gate on login (relies on Supabase config).

### Security notes (observed, not audited)

- Student-facing exam queries intentionally omit `correct_answer` on questions during exam flow.
- Correct answers are shown only on result pages after submission.
- Anti-cheat is client-side only — bypassable by determined users (inherent limitation).

---

## 8. Third-Party Integrations

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

- Bucket: **`avatars`**
- Used exclusively for profile photo upload (`profileApi.uploadAvatar`).
- Public URLs with cache-bust query param (`?t=timestamp`).

### Other libraries

| Library | Usage |
|---------|--------|
| `@tanstack/react-query` | Server state, mutations, devtools in `App.jsx` |
| `react-router-dom` v7 | Routing, lazy routes, nested layouts |
| `react-hook-form` | Forms |
| `react-hot-toast` | Global notifications (`Toaster` in `App.jsx`) |
| `recharts` | Dashboard charts (performance, donut) |
| `lucide-react` | Icons |
| `date-fns` | *(in package.json; verify usage — formatting mostly custom in `formatDateForInput`)* |
| `react-loadly` | Loading spinner on Available Exams page |
| `shadcn` / `radix-ui` | Minimal — button component scaffold |
| `@fontsource-variable/geist` | Font import in CSS |

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

*End of specification. Review this document against your live Supabase project before treating the inferred schema or RPC contracts as authoritative.*
