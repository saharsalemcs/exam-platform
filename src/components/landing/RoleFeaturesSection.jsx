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
  User,
  Users,
  Check,
  ChevronRight,
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
    <section id="features" className="py-20 lg:py-28 relative">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 88, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] font-mono">
            BUILT FOR EVERY ROLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--color-text)] tracking-tight">
            Everything you need for better assessments
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)]">
            A focused experience tailored for the people who create, take, and review exams.
          </p>

          {/* Role Selector Tabs */}
          <div className="inline-flex p-1.5 rounded-xl bg-[var(--color-surface)] border border-white/10 mt-4">
            <button
              onClick={() => setActiveRole("student")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeRole === "student"
                  ? "bg-[var(--color-primary)] text-[#0d1117] shadow-md"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <GraduationCap size={18} />
              <span>For Students</span>
            </button>
            <button
              onClick={() => setActiveRole("instructor")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeRole === "instructor"
                  ? "bg-[var(--color-primary)] text-[#0d1117] shadow-md"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <Users size={18} />
              <span>For Instructors</span>
            </button>
          </div>
        </div>

        {/* Feature Panel */}
        <div
          className="rounded-2xl p-6 sm:p-10 transition-all duration-300 backdrop-blur-xl"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Side: Feature List */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-primary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                <span className="uppercase tracking-wider">
                  {activeRole === "student"
                    ? "Student Assessment Hub"
                    : "Instructor Control Suite"}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-display text-[var(--color-text)]">
                {activeRole === "student"
                  ? "Seamless Exam Taking & Real-time Feedback"
                  : "Effortless Exam Creation & Result Analytics"}
              </h3>

              <div className="space-y-4 pt-2">
                {currentFeatures.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-4 rounded-xl transition-colors duration-200 border border-transparent hover:border-white/5 hover:bg-white/[0.02] flex items-start gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          backgroundColor: "rgba(212, 175, 88, 0.1)",
                          color: "var(--color-primary)",
                          border: "1px solid rgba(212, 175, 88, 0.2)",
                        }}
                      >
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-[var(--color-text)] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
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
                <div
                  className="rounded-xl p-6 relative overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-surface-2)",
                    border: "1px solid rgba(212, 175, 88, 0.2)",
                  }}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-glow)] text-[var(--color-primary)] flex items-center justify-center">
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-[var(--color-text)]">
                          Software Engineering Fundamentals
                        </h5>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          25 Questions • 45 Mins
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Available Now
                    </span>
                  </div>

                  {/* Feature preview item cards */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-[var(--color-text-muted)]">
                        Session Status
                      </span>
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <Check size={14} /> Ready to start
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-[var(--color-text-muted)]">
                        Autosave Protection
                      </span>
                      <span className="font-mono text-[var(--color-primary)]">
                        Active Sync
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[var(--color-primary-glow)] border border-[var(--color-primary)]/30 text-xs">
                      <div className="flex justify-between font-semibold text-[var(--color-primary)] mb-1.5">
                        <span>Latest Score Result</span>
                        <span>94 / 100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--color-primary)] h-full rounded-full"
                          style={{ width: "94%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Instructor Role Mock Preview */
                <div
                  className="rounded-xl p-6 relative overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-surface-2)",
                    border: "1px solid rgba(74, 124, 255, 0.3)",
                  }}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-[var(--color-accent)] flex items-center justify-center">
                        <CirclePlus size={16} />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-[var(--color-text)]">
                          Exam Creation Wizard
                        </h5>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          Drafting: Database Systems Final
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Step 2 of 3
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-[var(--color-text-muted)]">
                        Configured Questions
                      </span>
                      <span className="font-mono text-[var(--color-text)] font-semibold">
                        18 Questions (90 Pts)
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-[var(--color-text-muted)]">
                        Passing Benchmark
                      </span>
                      <span className="font-mono text-[var(--color-primary)] font-semibold">
                        70% Minimum Score
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-xs">
                      <div className="flex justify-between font-semibold text-blue-400 mb-1">
                        <span>Student Submissions Review</span>
                        <span>42 Completed</span>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)]">
                        Average Class Grade: 86.4% • Instant grading breakdown active
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
