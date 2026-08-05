<div align="center">

<h1>📝 EduTest</h1>

**A full-stack, role-based online exam platform** built as a React SPA on top of Supabase — students discover and take proctored, timed exams; instructors build exams through a wizard, publish them, and review results and analytics.
<br>

🚀 **[View Live Demo →](https://exam-platform-beryl.vercel.app)**

</div>

## 📋 Table of Contents

- [📌 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔐 Role System & Routing](#-role-system--routing)
- [🧩 Key Modules](#-key-modules)
- [⚡ Performance: Code Splitting & Lazy Loading](#-performance-code-splitting--lazy-loading)
- [🚀 Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [☁️ Deployment](#️-deployment)
- [📜 Scripts](#-scripts)

---

## 📌 Overview

EduTest is a single-page application where exam creation, delivery, and grading are cleanly separated by role:

- 🧑‍🏫 **Instructors** design exams with a 3-step wizard (details → questions → review/publish), then manage their lifecycle (draft/active/closed).
- 🎓 **Students** only ever see exams that match their own **grade and department**, take them in a locked-down, anti-cheat exam session, and get their results scored entirely server-side.
- 🔒 All scoring, ownership checks, and question-content protection happen in **Supabase Postgres** — via Row Level Security policies and `SECURITY DEFINER` RPC functions — not just in the frontend.

There is no admin role in the system. Registration through the UI is student-only by design; teacher accounts are provisioned directly in the database.

---

## ✨ Features

### 🔐 Authentication

- Email/password sign-up with email confirmation, and Google OAuth sign-in.
- Role-based redirect after login, session persistence, and forgot/reset password flows.

### 👤 Profile Management

- Students complete their profile with grade + department (required before accessing the rest of the app).
- Avatar upload to Supabase Storage; password change/set (including for Google-only accounts).

### 📊 Dashboards

- **Student:** total exams, average/highest score, pass rate, a performance-over-time chart, an answers breakdown donut, and recent submissions.
- **Instructor:** total exams/submissions, students' average score, unique student count, per-exam performance chart, and a pass/fail donut.

### 🔍 Exam Discovery & Details (Student)

- Only active, currently-open exams are listed, filtered further so a student only sees exams matching their **exact grade and department**.
- Search and filtering by title, category, difficulty, and instructor.
- Exam details page with rules, duration, marks, and pass mark before starting.

### 🛡️ Exam Session & Anti-Cheat

- Auto-starts and resumes in-progress sessions, with debounced auto-save of answers.
- Persisted countdown timer, manual submit with confirmation, and auto-submit on timeout.
- Anti-cheat detection (tab switching, window blur, right-click, devtools shortcuts, copy, back-navigation) — 3 violations auto-submits the attempt as `violated`.
- Scoring is fully delegated to a server-side RPC; the client never computes scores or correctness.

### 🧙 Exam Wizard (Create & Edit)

- Shared 3-step flow for both creating and editing exams: **Details → Questions → Review & Publish**.
- Supports MCQ and True/False question types with per-question marks.
- Edit mode fetches the existing exam (ownership-scoped) and pre-fills the wizard before it renders.

### 🗂️ Exam Management, History & Results

- Instructors manage exam status, edit, and delete (blocked once an exam has submissions).
- Full submission history for both roles, with search/filter.
- Result pages show a score summary and a question-by-question review; correct answers are only ever shown after submission.

### 🧑‍🎓 Student Management (Instructor)

- Aggregated per-student stats — exams taken, average/highest score, pass rate — searchable by name, grade, and department.

### 🔒 Security

- Row Level Security enabled on all core tables, matching ownership/targeting rules at the database level (not just in application queries).
- Dedicated `SECURITY DEFINER` RPCs so question content (and correct answers) can never be read directly by students outside of an authorized session or a finished attempt's review.
- Ownership-checked RPCs for every exam mutation, keyed off `auth.uid()` rather than client-supplied IDs.
- Supabase credentials are read from environment variables — nothing is hardcoded in source.

---

## 🛠️ Tech Stack

| Category          | Technology                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| ⚛️ Frontend       | React 19, Vite 8                                                                                   |
| 📝 Language       | JavaScript (no TypeScript)                                                                         |
| 🧭 Routing        | `react-router-dom` v7 / `react-router` v8 — lazy-loaded routes                                     |
| 🔄 Server state   | `@tanstack/react-query` v5 (+ devtools)                                                            |
| 📋 Forms          | `react-hook-form` v7                                                                               |
| 🎨 Styling        | Tailwind CSS v4 (`@theme` tokens), `tailwind-merge`, dark theme by default                         |
| 🧱 UI components  | Custom components (`components/shared`) + `shadcn`/`radix-ui` (Button), `class-variance-authority` |
| 📈 Charts         | `recharts` v3                                                                                      |
| ✨ Icons          | `lucide-react`                                                                                     |
| 🔔 Notifications  | `react-hot-toast`                                                                                  |
| 📅 Dates          | `date-fns` v4                                                                                      |
| ⏳ Loading UI     | `react-loadly`                                                                                     |
| 🔤 Fonts          | `@fontsource-variable/geist`                                                                       |
| 🔧 Tooling        | ESLint 10, Prettier + `prettier-plugin-tailwindcss`                                                |
| 🗄️ Backend / BaaS | Supabase (Auth, Postgres, Storage, RPC) — `@supabase/supabase-js` v2                               |
| ☁️ Hosting        | Vercel                                                                                             |

---

## 📁 Project Structure

```
exam-platform/
├── src/
│   ├── App.jsx                 # Routes, QueryClient, Toaster
│   ├── main.jsx
│   ├── index.css               # Tailwind v4 theme tokens
│   ├── components/
│   │   ├── ProtectedRoute.jsx  # Auth + role + profile-completeness guard
│   │   ├── layout/             # AppLayout, Header, Sidebar
│   │   ├── shared/              # Reusable UI (Button, Table, EmptyState, …)
│   │   └── ui/                  # shadcn button
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── exam-session/
│   │   ├── exam-wizard/
│   │   ├── exams/
│   │   ├── exams-history/
│   │   ├── profile/
│   │   ├── results/             # includes the shared result-shaping helper
│   │   └── students/
│   ├── hooks/                   # Shared hooks
│   ├── pages/                   # HomePage, NotFoundPage
│   ├── services/supabase.js     # Supabase client, reads URL/key from env vars
│   ├── utils/constants.js
│   └── lib/utils.js
├── public/default-avatar.jpg
├── .env.example                  # Committed template for required env vars
├── .env                           # Git-ignored; real Supabase credentials
├── vercel.json                   # SPA rewrite rule for client-side routing
├── package.json
└── vite.config.js
```

Each feature folder generally follows the same internal shape: `pages/`, `components/`, `hooks/`, `services/` (raw Supabase calls), and occasionally `constants/`, `helpers/`, or `context/` (e.g. `exam-wizard`'s `ExamWizardContext`).

---

## 🔐 Role System & Routing

There are exactly **two roles**, defined in `src/utils/constants.js` — there is no admin role.

| Role (DB value) | UI label                | Fallback dashboard      |
| --------------- | ----------------------- | ----------------------- |
| `student`       | 🎓 Student              | `/student/dashboard`    |
| `teacher`       | 🧑‍🏫 Teacher / Instructor | `/instructor/dashboard` |

> **Naming note:** routes and the sidebar use "instructor", while the database role value is `"teacher"`.

### 🛂 Route protection

`src/components/ProtectedRoute.jsx` enforces, in order:

1. **Authentication** — unauthenticated users are redirected to `/login`.
2. **Role match** — if the route requires a specific role and the user's profile role doesn't match, they're redirected to their own dashboard instead.
3. **Profile completeness** — students missing `grade` or `department` are forced to `/complete-profile` first.

### 🗺️ Route map (high level)

| Area          | Example paths                                                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🌐 Public     | `/`, `/login`, `/register`, `/forgot-password`, `/reset-password`                                                                                                                                          |
| 🎓 Student    | `/student/dashboard`, `/student/exams`, `/student/exams/:examId`, `/student/exam/:examId/session`, `/student/exams-history`, `/student/results/:attemptId`, `/student/profile`                             |
| 🧑‍🏫 Instructor | `/instructor/dashboard`, `/instructor/exam-wizard[/:examId]`, `/instructor/exams-management`, `/instructor/exams-history`, `/instructor/students`, `/instructor/results/:attemptId`, `/instructor/profile` |

Route protection only decides which **pages** a role can reach — it does not by itself decide which **rows** a query returns. That second layer is enforced independently at the database level (see [🧩 Key Modules](#-key-modules)).

---

## 🧩 Key Modules

### 🛂 `ProtectedRoute`

Central guard combining authentication, role matching, and profile-completeness checks for every private route.

### 🧙 Exam Wizard (`features/exam-wizard`)

A single 3-step component shared by both the create and edit flows (`ExamWizardContext` holds wizard state; step navigation is driven by a `?step=1|2|3` query param). Edit mode fetches the target exam (scoped to the current instructor), waits for it to resolve, and only then mounts the wizard provider seeded with the existing data.

### 🛡️ Exam Session (`features/exam-session`)

Runs the live, timed exam experience: session auto-start/resume, debounced answer auto-save, a persisted countdown timer, and anti-cheat monitoring — tab switches, window blur, right-click, devtools shortcuts, and copy are all tracked, with repeated violations triggering an automatic submission. All scoring happens through a server-side RPC.

### 📄 Results (`features/results`)

Student and instructor result views share a single grading/shaping helper so the question-by-question breakdown is computed once and reused, with role-specific fields (like the student's name, or whether review notes are shown) layered on top per caller.

### 🗄️ Database & Security (Supabase)

- **Row Level Security** is enabled on `profiles`, `exams`, `questions`, `exam_attempts`, and `answers`, mirroring the ownership/targeting rules at the database level.
- `SECURITY DEFINER` **RPCs** (`get_exam_questions_for_session`, `get_exam_questions_for_review`) are the only way students can read question content — students have no direct `SELECT` policy on `questions`, and correct answers are only ever exposed after a finished attempt.
- **Ownership-checked mutation RPCs** (`create_exam_with_questions`, `update_exam_with_questions`, `update_exam_status`, `delete_exam`, `create_exam_attempt`, `submit_exam_attempt`) key their authorization off `auth.uid()` rather than any client-supplied ID.
- **Storage** (`avatars` bucket) has public-read / own-folder-write policies.

### 🎨 Shared UI (`components/shared`, `components/ui`)

Custom, reusable components (buttons, tables, empty states, etc.) styled with Tailwind v4 theme tokens, with a small amount of shadcn/ui adopted for the base `Button`.

---

## ⚡ Performance: Code Splitting & Lazy Loading

All page-level components declared in `src/App.jsx` are **lazy-loaded** (`React.lazy` + `Suspense`), so route-level code splitting happens automatically per page — a user visiting the student dashboard never downloads the instructor wizard's bundle, and vice versa.

This matters most for EduTest because the app has two fairly large, role-specific surfaces (the student experience and the instructor experience) that most users will only ever need one half of. Splitting at the route level keeps the initial bundle small and defers everything else until it's actually navigated to.

- 🖼️ `AppLayout` (sidebar + header) wraps most authenticated pages, but is bypassed for the full-screen exam session and the standalone complete-profile flow, keeping those experiences distraction-free.
- 📦 The exam wizard, dashboards, and history/results pages — each fairly chart- or form-heavy — are only fetched when their route is actually visited.

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js and npm
- A Supabase project (URL + anon/publishable key)

### 📥 Installation

```bash
git clone <repository-url>
cd exam-platform
npm install
```

### ⚙️ Configure environment variables

Copy the example file and fill in your own Supabase project's credentials:

```bash
cp .env.example .env
```

See [🔑 Environment Variables](#-environment-variables) for what's required.

### ▶️ Run locally

```bash
npm run dev
```

The app will start on Vite's default dev server (typically `http://localhost:5173`).

### 🧑‍🏫 Try it as a teacher without creating an account

Since teacher accounts aren't self-registrable through the UI, a demo instructor account is available for evaluation:

- **Email:** `instructor-edutest@gmail.com`
- **Password:** `123456`

> ⚠️ This is a **shared demo identity**, not a personal account — anyone with these credentials can create, edit, or delete exams under it. Treat it as disposable, and avoid putting anything you care about under this login.

### 🗄️ Database setup

This repository doesn't ship a full `schema.sql` — the core tables (`profiles`, `exams`, `questions`, `exam_attempts`, `answers`) and RPC functions live in your own Supabase project. If you're setting this up against a fresh project, you'll need to recreate the schema and RPC functions described in this document, plus apply the RLS/security migration under your project's `migrations/` folder (e.g. `001_security_rls_and_rpc_hardening.sql`), before the app will function end-to-end.

---

## 🔑 Environment Variables

Configured via a `.env` file locally (git-ignored) and via your hosting provider's environment settings in production. A template is committed as `.env.example`.

| Variable                 | Required | Description                                   |
| ------------------------ | -------- | --------------------------------------------- |
| `VITE_SUPABASE_URL`      | ✅ Yes   | Your Supabase project's API URL.              |
| `VITE_SUPABASE_ANON_KEY` | ✅ Yes   | Your Supabase project's anon/publishable key. |

If either variable is missing, `src/services/supabase.js` throws a descriptive startup error rather than failing silently later.

> 🔒 Never commit real credentials to `.env` — it's already listed in `.gitignore`. If a key is ever accidentally committed, rotate it in the Supabase dashboard rather than relying solely on removing it from a future commit (it will still be visible in git history).

---

## ☁️ Deployment

EduTest is deployed on **Vercel** ([🚀 live demo](https://exam-platform-beryl.vercel.app)), imported directly from GitHub and auto-detected as a Vite project (default build command `vite build`, output directory `dist`).

### 1️⃣ Environment variables

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Vercel → Settings → Environment Variables** (scoped to Production and Preview). The local `.env` file is git-ignored and is **not** picked up automatically by Vercel — this step is required separately.

### 2️⃣ SPA routing

Vercel's default static handling 404s on client-side-only routes (e.g. a direct load of `/student/dashboard`, or the redirect target of an OAuth flow), since those paths don't correspond to physical files in `dist`. A `vercel.json` at the project root fixes this by rewriting all paths to `index.html`, letting React Router take over:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 3️⃣ Supabase Auth URL configuration

Under **Supabase → Authentication → URL Configuration**, make sure:

- **Site URL** points to your production domain (not `localhost`).
- **Redirect URLs** includes your production domain with a wildcard (e.g. `https://your-app.vercel.app/`), alongside your local dev URL if you still want local OAuth to keep working.

### ✅ Post-deploy smoke test

After deploying, verify end-to-end: student registration, demo-instructor login, exam creation, taking an exam as a student, and viewing results on both the student and instructor sides. This confirms the RPC wiring and RLS policies behave correctly in the deployed environment, not just locally.

---

## 📜 Scripts

From `package.json`:

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the local development server (Vite). |
| `npm run build`   | Build the production bundle into `dist/`.  |
| `npm run preview` | Preview the production build locally.      |
| `npm run lint`    | Run ESLint over the codebase.              |

---

Made with ⚡ React + 🗄️ Supabase
