import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle2,
  ShieldCheck,
  History,
  CirclePlus,
  Layers,
  Send,
  BarChart3,
  Users,
  Check,
} from "lucide-react";

export default function RoleFeaturesSection() {
  const [activeRole, setActiveRole] = useState("student"); // 'student' | 'instructor'

  const studentFeatures = [
    {
      icon: Clock,
      title: "Timed Exam Sessions",
      description:
        "Complete assessments with a visible countdown timer and a focused, distraction-free environment.",
    },
    {
      icon: CheckCircle2,
      title: "Autosave & Resume",
      description:
        "Answers are continuously saved during the session so you never lose your progress if interrupted.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Assessment Experience",
      description:
        "Controlled exam session with session integrity monitoring and auto-submission on expiration.",
    },
    {
      icon: History,
      title: "Results & Attempt History",
      description:
        "Review completed exams, score breakdowns, and track performance across all past attempts.",
    },
  ];

  const instructorFeatures = [
    {
      icon: CirclePlus,
      title: "Guided Exam Creation",
      description:
        "Build structured exams seamlessly using a multi-step wizard to define title, duration, and pass marks.",
    },
    {
      icon: Layers,
      title: "Question Management",
      description:
        "Create multiple-choice questions, set point values, format option choices, and arrange question sequences.",
    },
    {
      icon: Send,
      title: "Publishing Controls",
      description:
        "Toggle exam availability, schedule tests, and publish directly for registered students.",
    },
    {
      icon: BarChart3,
      title: "Performance Review",
      description:
        "Access student submission lists, automated score calculations, and detailed result reports.",
    },
  ];

  const currentFeatures =
    activeRole === "student" ? studentFeatures : instructorFeatures;

  return (
    <section id="features" className="relative pb-20">
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 88, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 space-y-4 text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Built for every role
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Everything you need for better assessments
          </h2>
          <p className="text-base text-text-muted sm:text-lg">
            A focused experience tailored for the people who create, take, and
            review exams.
          </p>

          {/* Role Selector Tabs */}
          <div className="mt-4 inline-flex w-full max-w-3xl rounded-xl border border-white/10 bg-surface p-1.5">
            <button
              onClick={() => setActiveRole("student")}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all sm:px-6 ${
                activeRole === "student"
                  ? "bg-primary text-bg shadow-md"
                  : "text-text-muted hover:text-text"
              }`}
            >
              <GraduationCap size={18} />
              <span>For Students</span>
            </button>
            <button
              onClick={() => setActiveRole("instructor")}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all sm:px-6 ${
                activeRole === "instructor"
                  ? "bg-primary text-bg shadow-md"
                  : "text-text-muted hover:text-text"
              }`}
            >
              <Users size={18} />
              <span>For Instructors</span>
            </button>
          </div>
        </div>

        {/* Feature Panel */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-md backdrop-blur-xl transition-all duration-300 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Side: Feature List */}
            <div className="space-y-6 lg:col-span-6">
              <div className="flex items-center gap-2 font-mono text-xs text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="tracking-wider uppercase">
                  {activeRole === "student"
                    ? "Student Assessment Hub"
                    : "Instructor Control Suite"}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-text">
                {activeRole === "student"
                  ? "Seamless Exam Taking & Real-time Feedback"
                  : "Effortless Exam Creation & Result Analytics"}
              </h3>

              <div className="space-y-4 pt-2">
                {currentFeatures.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-colors duration-200 hover:border-white/5 hover:bg-white/[0.02]"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="mb-1 text-base font-semibold text-text">
                          {item.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Interactive Mock Card */}
            <div className="lg:col-span-6">
              {activeRole === "student" ? (
                /* Student Role Mock Preview */
                <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-surface-2 p-6 transition-all duration-300">
                  <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-glow text-primary">
                        <BookOpen size={16} />
                      </div>
                      <div className="min-w-0">
                        <h5 className="truncate text-sm font-semibold text-text">
                          Software Engineering Fundamentals
                        </h5>
                        <p className="text-xs text-text-muted">
                          25 Questions • 45 Mins
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                      Available Now
                    </span>
                  </div>

                  {/* Feature preview item cards */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs">
                      <span className="text-text-muted">Session Status</span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-400">
                        <Check size={14} /> Ready to start
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs">
                      <span className="text-text-muted">
                        Autosave Protection
                      </span>
                      <span className="font-mono text-primary">
                        Active Sync
                      </span>
                    </div>

                    <div className="rounded-lg border border-primary/30 bg-primary-glow p-3.5 text-xs">
                      <div className="mb-1.5 flex justify-between font-semibold text-primary">
                        <span>Latest Score Result</span>
                        <span>94 / 100</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: "94%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Instructor Role Mock Preview */
                <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-surface-2 p-6 transition-all duration-300">
                  <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-accent">
                        <CirclePlus size={16} />
                      </div>
                      <div className="min-w-0">
                        <h5 className="truncate text-sm font-semibold text-text">
                          Exam Creation Wizard
                        </h5>
                        <p className="text-xs text-text-muted">
                          Drafting: Database Systems Final
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                      Step 2 of 3
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs">
                      <span className="text-text-muted">
                        Configured Questions
                      </span>
                      <span className="font-mono font-semibold text-text">
                        18 Questions (90 Pts)
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs">
                      <span className="text-text-muted">Passing Benchmark</span>
                      <span className="font-mono font-semibold text-primary">
                        70% Minimum Score
                      </span>
                    </div>

                    <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3.5 text-xs">
                      <div className="mb-1 flex justify-between font-semibold text-blue-400">
                        <span>Student Submissions Review</span>
                        <span>42 Completed</span>
                      </div>
                      <p className="text-[11px] text-text-muted">
                        Average Class Grade: 86.4% • Instant grading breakdown
                        active
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
