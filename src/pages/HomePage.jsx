import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  Clock,
  Target,
  BarChart3,
  FileText,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Users,
  Lock,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg font-sans text-text selection:bg-primary selection:text-bg">
      {/* 2. Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden py-24 sm:py-28">
        {/* Ambient background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary opacity-[0.07] blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 right-0 h-[24rem] w-[24rem] translate-x-1/3 rounded-full bg-accent opacity-[0.06] blur-[120px]"
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Left Content Column */}
            <div className="space-y-7 text-left">
              <div
                className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-primary/30 bg-primary-glow px-3.5 py-1.5 text-sm font-medium text-primary"
                style={{
                  animationDelay: "0ms",
                  animationFillMode: "backwards",
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Smart Academic Assessment & Exam Platform</span>
              </div>

              <h1
                className="animate-fade-up font-display text-4xl leading-[1.1] font-bold tracking-tight text-balance text-text sm:text-4xl md:text-[3.4rem]"
                style={{
                  animationDelay: "100ms",
                  animationFillMode: "backwards",
                }}
              >
                Targeted, Accurate, and Secure Online Exams for Every{" "}
                <span className="bg-gradient-to-r from-primary to-[#e8cd88] bg-clip-text text-transparent">
                  Academic Level
                </span>
              </h1>

              <p
                className="animate-fade-up text-base leading-relaxed text-text-muted sm:text-lg"
                style={{
                  animationDelay: "200ms",
                  animationFillMode: "backwards",
                }}
              >
                EduTest empowers students to take exams tailored specifically to
                their academic year and department in a proctored environment,
                while providing instructors with powerful tools to build
                assessments and analyze results.
              </p>

              <div
                className="flex animate-fade-up flex-col items-center justify-start gap-3 pt-2 sm:flex-row"
                style={{
                  animationDelay: "300ms",
                  animationFillMode: "backwards",
                }}
              >
                <Link
                  to="/register"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-bg shadow-lg shadow-primary-glow transition-all hover:-translate-y-0.5 hover:bg-[#c29f4b] hover:shadow-xl hover:shadow-primary-glow sm:w-auto"
                >
                  Start as a Student
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 font-semibold text-text transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-2 sm:w-auto"
                >
                  Sign In to Portal
                </Link>
              </div>

              {/* Stats highlights */}
              <div
                className="grid animate-fade-up grid-cols-3 divide-x divide-border border-t border-border pt-6"
                style={{
                  animationDelay: "400ms",
                  animationFillMode: "backwards",
                }}
              >
                <div className="pr-4">
                  <p className="font-display text-xl font-bold text-text sm:text-2xl">
                    100%
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">
                    Targeted Exams
                  </p>
                </div>
                <div className="px-4">
                  <p className="font-display text-xl font-bold text-primary sm:text-2xl">
                    Anti-Cheat
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">
                    Active Proctoring
                  </p>
                </div>
                <div className="pl-4">
                  <p className="font-display text-xl font-bold text-text sm:text-2xl">
                    Instant
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">
                    Auto-Grading & Reports
                  </p>
                </div>
              </div>
            </div>

            {/* Right Interactive Mockup Card Column */}
            <div
              className="animate-fade-scale"
              style={{
                animationDelay: "500ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background Glow */}
                <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-15 blur-xl" />

                {/* Simulated Live Exam Session Preview */}
                <div className="relative space-y-5 rounded-2xl border border-border bg-surface p-6 shadow-2xl transition-transform duration-500 hover:-translate-y-1">
                  {/* Exam Header */}
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-semibold text-primary">
                        Computer Science - 4th Year
                      </span>
                      <h2 className="mt-2 font-display text-lg font-semibold text-text">
                        Advanced Database Systems
                      </h2>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs font-medium text-warning">
                      <Clock className="h-3.5 w-3.5" />
                      <span>24:58</span>
                    </div>
                  </div>

                  {/* Anti-cheat status pill */}
                  <div className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-success">
                      <ShieldCheck className="h-4 w-4" />
                      Anti-cheat protection active
                    </span>
                    <span className="text-text-faint">Status: Live</span>
                  </div>

                  {/* Question Box */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-text-muted">
                      Question 3 of 20:
                    </p>
                    <p className="text-sm font-medium text-text">
                      Which indexing strategy provides optimal lookup time
                      performance for unique identifier primary keys?
                    </p>

                    <div className="space-y-2 pt-1">
                      {[
                        "UUID B-Tree Indexed",
                        "Composite Auto-Increment ID",
                        "Foreign Key Keyring",
                        "Text String Unique",
                      ].map((opt, idx) => (
                        <div
                          key={idx}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs font-medium transition-all ${
                            idx === 0
                              ? "border-primary bg-primary-glow text-text"
                              : "border-border bg-surface-2 text-text-muted hover:border-border"
                          }`}
                        >
                          <span>{opt}</span>
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                              idx === 0
                                ? "border-primary bg-primary text-bg"
                                : "border-text-faint"
                            }`}
                          >
                            {idx === 0 && <CheckCircle2 className="h-3 w-3" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer Action Simulated */}
                  <div className="flex items-center justify-between pt-2 text-xs text-text-muted">
                    <span>Auto-saving responses...</span>
                    <button className="flex items-center gap-1 rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-medium text-text">
                      Next Question <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features Section */}
      <section
        id="features"
        className="border-y border-border bg-surface py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 w-full space-y-3 text-center">
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Why EduTest is the Ultimate Choice for Exams
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              Engineered with modern technologies to deliver a seamless,
              transparent, and secure evaluation workflow.
            </p>
          </div>

          <div
            style={{
              animationDelay: "500ms",
              animationFillMode: "backwards",
            }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Feature 1 */}
            <div
              className="group animate-fade-up space-y-4 rounded-2xl border border-border bg-surface-2 p-6 transition-all hover:border-primary"
              style={{ animationDelay: "0ms", animationFillMode: "backwards" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary-glow text-primary transition-transform group-hover:scale-110">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-text">
                Targeted Delivery
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                Students only view exams assigned to their specific academic
                year and department without confusion.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="group animate-fade-up space-y-4 rounded-2xl border border-border bg-surface-2 p-6 transition-all hover:border-primary"
              style={{
                animationDelay: "100ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary-glow text-primary transition-transform group-hover:scale-110">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-text">
                Proctored Security
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                Smart monitoring detects tab switching, prevents copy-pasting,
                and auto-submits on violation limits.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="group animate-fade-up space-y-4 rounded-2xl border border-border bg-surface-2 p-6 transition-all hover:border-primary"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary-glow text-primary transition-transform group-hover:scale-110">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-text">
                Intuitive Exam Builder
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                Multi-step wizard for teachers supporting MCQs, True/False, time
                limits, and real-time updates.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className="group animate-fade-up space-y-4 rounded-2xl border border-border bg-surface-2 p-6 transition-all hover:border-primary"
              style={{
                animationDelay: "300ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary-glow text-primary transition-transform group-hover:scale-110">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-text">
                Instant Analytics
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                Automated grading upon submission with full breakdowns of
                scores, pass rates, and performance statistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dual Role Showcase Section */}
      <section id="roles" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 w-full space-y-3 text-center">
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Tailored Experiences for Students & Instructors
            </h2>
            <p className="text-sm text-text-muted sm:text-base">
              Dedicated interfaces built specifically to match the needs of
              every role.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Students Card */}
            <div
              className="flex animate-fade-up flex-col justify-between space-y-6 rounded-2xl border border-border bg-surface p-8"
              style={{ animationDelay: "0ms", animationFillMode: "backwards" }}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1 text-xs font-semibold text-primary">
                  <BookOpen className="h-4 w-4" />
                  <span>Student Portal</span>
                </div>
                <h3 className="font-display text-xl font-bold text-text">
                  Focused & Distraction-Free Testing
                </h3>
                <ul className="space-y-3 text-sm text-text-muted">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    Browse exams assigned specifically to your year and
                    department.
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    Automatic answer saving ensures no loss of progress during
                    session.
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    Detailed score reports and instant answer keys
                    post-submission.
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 px-5 py-3 text-center text-sm font-semibold text-text transition-all hover:border-primary"
              >
                Register as Student
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Instructors Card */}
            <div
              className="flex animate-fade-up flex-col justify-between space-y-6 rounded-2xl border border-border bg-surface p-8"
              style={{
                animationDelay: "150ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1 text-xs font-semibold text-accent">
                  <Users className="h-4 w-4" />
                  <span>Teacher Portal</span>
                </div>
                <h3 className="font-display text-xl font-bold text-text">
                  Complete Assessment & Student Control
                </h3>
                <ul className="space-y-3 text-sm text-text-muted">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    Multi-step exam creator to draft, configure, and publish
                    tests.
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    Track student rosters, submission logs, and average
                    performance.
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    Manage exam status (Draft, Active, Closed) and time windows.
                  </li>
                </ul>
              </div>
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 px-5 py-3 text-center text-sm font-semibold text-text transition-all hover:border-accent"
              >
                Access Teacher Portal
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final Banner CTA */}
      <section
        id="how-it-works"
        className="border-t border-border bg-surface py-16"
      >
        <div className="mx-auto w-full space-y-6 px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
            Ready to Experience EduTest?
          </h2>
          <p className="mx-auto text-text-muted sm:text-base">
            Join today and enjoy a clean, fast, and proctored examination
            workflow designed for modern education.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <Link
              to="/register"
              className="w-full rounded-xl bg-primary px-8 py-3.5 font-semibold text-bg shadow-md transition-all hover:bg-[#c29f4b] sm:w-auto"
            >
              Create Student Account
            </Link>
            <Link
              to="/login"
              className="w-full rounded-xl border border-border bg-surface-2 px-8 py-3.5 font-semibold text-text transition-all hover:border-primary sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-border/60 px-6 py-8">
        <div className="mx-auto flex flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold text-primary">
              EduTest Platform
            </span>
          </div>
          <span className="text-text-muted">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
