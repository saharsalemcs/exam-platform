import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  BarChart3,
  Sliders,
  Award,
  Layers,
  GraduationCap,
  Users,
} from "lucide-react";

export default function HeroSection() {
  const [activePreviewTab, setActivePreviewTab] = useState("student"); // 'student' | 'teacher'
  const [selectedDemoOption, setSelectedDemoOption] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(2485); // ~41 mins

  // Realistic countdown simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `00:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-32">
      {/* Background ambient lighting effects */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-20 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #d4af58 0%, #4a7cff 60%, transparent 80%)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "#4a7cff" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Badge */}
        <div className="flex justify-center">
          <div className="group inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-surface px-4 py-1.5 text-xs sm:text-sm font-medium text-text shadow-lg shadow-black/40 backdrop-blur-md transition-all hover:border-primary/50">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-semibold">EduTest</span>
            <span className="text-border">|</span>
            <span className="text-text-muted flex items-center gap-1">
              Precision Online Exam Engine for Universities & Schools
              <Sparkles size={14} className="text-primary inline-block ml-0.5" />
            </span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="font-display text-3xl sm:text-6xl lg:text-6xl font-bold tracking-tight text-text leading-[1.08]">
            Conduct Flawless Online Exams with{" "}
            <span className="bg-gradient-to-r from-[#d4af58] via-[#edd88a] to-[#4a7cff] bg-clip-text text-transparent">
              Precision & Integrity
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-text-muted leading-relaxed mx-auto">
            Create exams, take tests, and get instant results, all in one place.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/register"
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-bg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] cursor-pointer"
            >
              <span>Get Started as Student</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            {/* <a
              href="#live-demo"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-base font-medium text-text hover:bg-surface-2 hover:border-primary/40 transition-all duration-150 cursor-pointer"
            >
              <Sparkles size={17} className="text-primary" />
              <span>Try Interactive Demo</span>
            </a> */}
          </div>

          {/* Assurance bullet tags */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-success" />
              No software download required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-success" />
              Auto-saving & disconnect recovery
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-success" />
              Instant automated scoring
            </span>
          </div>
        </div>

        {/* ── Mockup Frame: Realistic App Experience ── */}
        <div className="mt-14 sm:mt-18 lg:mt-20">
          <div
            className="relative mx-auto max-w-5xl rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 88, 0.08)",
            }}
          >
            {/* Top Window Bar */}
            <div className="flex items-center justify-between border-b border-border bg-surface-2/90 px-4 py-3 sm:px-6">
              {/* Left Mac/Window Dots */}
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-danger/80" />
                <span className="h-3 w-3 rounded-full bg-warning/80" />
                <span className="h-3 w-3 rounded-full bg-success/80" />
                <span className="ml-3 hidden sm:inline-block text-xs font-mono text-text-faint">
                  edutest.app / {activePreviewTab === "student" ? "student/exam-session/cs304" : "instructor/exam-wizard/cs304"}
                </span>
              </div>

              {/* Central View Toggle Switcher */}
              <div className="flex items-center rounded-xl bg-surface p-1 border border-border/80">
                <button
                  onClick={() => setActivePreviewTab("student")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${activePreviewTab === "student"
                    ? "bg-primary text-bg shadow-sm"
                    : "text-text-muted hover:text-text"
                    }`}
                >
                  <Users size={13} />
                  <span>Student View</span>
                </button>
                <button
                  onClick={() => setActivePreviewTab("teacher")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${activePreviewTab === "teacher"
                    ? "bg-primary text-bg shadow-sm"
                    : "text-text-muted hover:text-text"
                    }`}
                >
                  <GraduationCap size={14} />
                  <span>Instructor Suite</span>
                </button>
              </div>

              {/* Status Indicator */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-success">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span>Live Test Room Sync</span>
              </div>
            </div>

            {/* Mockup Body Content */}
            <div className="p-4 sm:p-7 bg-[#0f131a]">
              {activePreviewTab === "student" ? (
                /* ── Student Live Exam Mockup ── */
                <div className="flex flex-col gap-6">
                  {/* Exam Session Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                          CS304
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-text">
                          Distributed Systems & Cloud Architecture Final
                        </h3>
                      </div>
                      <p className="mt-1 text-xs text-text-muted">
                        Department of Computer Science • 20 Total Questions
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Live Timer */}
                      <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-surface-2 px-3 py-1.5 shadow-inner">
                        <Clock size={16} className="text-primary animate-pulse" />
                        <span className="font-mono text-xs sm:text-sm font-bold text-primary tracking-wider">
                          {formatTimer(timerSeconds)}
                        </span>
                      </div>
                      <button
                        className="rounded-lg bg-surface-2 border border-border p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
                        title="Flag for review"
                      >
                        <Bookmark size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Question Container + Question Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Active Question Canvas */}
                    <div className="lg:col-span-8 flex flex-col justify-between rounded-xl border border-border bg-surface p-5 sm:p-6">
                      <div>
                        <div className="flex items-center justify-between text-xs text-text-muted border-b border-border pb-3 mb-4">
                          <span className="font-semibold text-text">Question 14 of 20</span>
                          <span className="rounded-md bg-surface-2 px-2 py-0.5 text-text-muted">
                            Weight: 5.0 pts
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-medium text-text leading-relaxed">
                          In the context of the CAP theorem in distributed database design, which
                          trade-off is guaranteed during an unavoidable network partition (P)?
                        </h4>

                        {/* Options List */}
                        <div className="mt-5 flex flex-col gap-2.5">
                          {[
                            {
                              id: 0,
                              label: "A",
                              text: "The system can maintain Consistency and Availability simultaneously without loss.",
                            },
                            {
                              id: 1,
                              label: "B",
                              text: "The system must choose between Consistency (CP) or Availability (AP).",
                            },
                            {
                              id: 2,
                              label: "C",
                              text: "Partition tolerance can be eliminated by adding secondary replication nodes.",
                            },
                            {
                              id: 3,
                              label: "D",
                              text: "Performance increases exponentially while latency drops to zero.",
                            },
                          ].map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSelectedDemoOption(option.id)}
                              className={`flex items-start gap-3 rounded-xl border p-3.5 text-left text-xs sm:text-sm transition-all cursor-pointer ${selectedDemoOption === option.id
                                ? "border-primary bg-primary/10 text-text shadow-sm"
                                : "border-border bg-surface-2/70 text-text-muted hover:border-border/80 hover:text-text"
                                }`}
                            >
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${selectedDemoOption === option.id
                                  ? "bg-primary text-bg"
                                  : "bg-surface text-text-muted border border-border"
                                  }`}
                              >
                                {option.label}
                              </span>
                              <span className="flex-1 mt-0.5 leading-snug">{option.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Navigation bar inside session */}
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <button className="rounded-lg border border-border bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-text-muted hover:text-text cursor-pointer">
                          Previous
                        </button>
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg border border-primary/40 bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 cursor-pointer flex items-center gap-1">
                            <Bookmark size={13} />
                            <span>Flag</span>
                          </button>
                          <button className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-bg hover:bg-primary/90 cursor-pointer flex items-center gap-1">
                            <span>Next Question</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Question Navigation Matrix */}
                    <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-border bg-surface p-5">
                      <div>
                        <div className="flex items-center justify-between text-xs text-text-muted mb-3">
                          <span className="font-semibold text-text">Overview</span>
                          <span className="text-success font-medium">15/20 Answered (75%)</span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden mb-5">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-success rounded-full"
                            style={{ width: "75%" }}
                          />
                        </div>

                        {/* Question pills matrix */}
                        <div className="grid grid-cols-5 gap-2">
                          {Array.from({ length: 20 }, (_, i) => {
                            const qNum = i + 1;
                            const isAnswered = qNum < 14 || qNum === 17;
                            const isCurrent = qNum === 14;
                            const isFlagged = qNum === 7 || qNum === 12;

                            return (
                              <div
                                key={qNum}
                                className={`flex h-9 items-center justify-center rounded-lg font-mono text-xs font-semibold transition-all ${isCurrent
                                  ? "border-2 border-primary bg-primary/20 text-primary"
                                  : isFlagged
                                    ? "border border-warning/60 bg-warning/15 text-warning"
                                    : isAnswered
                                      ? "bg-success/15 text-success border border-success/30"
                                      : "bg-surface-2 text-text-faint border border-border"
                                  }`}
                              >
                                {qNum}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="mt-5 border-t border-border pt-4 grid grid-cols-2 gap-2 text-[11px] text-text-muted">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-success" /> Answered
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-primary" /> Current
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-warning" /> Flagged
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-text-faint" /> Unanswered
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Instructor Wizard & Analytics Mockup ── */
                <div className="flex flex-col gap-6">
                  {/* Wizard Step Progression */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { step: "01", title: "General Info", status: "completed" },
                      { step: "02", title: "Question Bank", status: "active" },
                      { step: "03", title: "Timing & Scoring", status: "upcoming" },
                      { step: "04", title: "Publish Exam", status: "upcoming" },
                    ].map((s) => (
                      <div
                        key={s.step}
                        className={`flex items-center gap-3 rounded-xl border p-3 ${s.status === "completed"
                          ? "border-success/40 bg-success/5"
                          : s.status === "active"
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border bg-surface"
                          }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${s.status === "completed"
                            ? "bg-success text-bg"
                            : s.status === "active"
                              ? "bg-primary text-bg"
                              : "bg-surface-2 text-text-faint border border-border"
                            }`}
                        >
                          {s.status === "completed" ? "✓" : s.step}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-text truncate">{s.title}</div>
                          <div className="text-[10px] text-text-muted capitalize">{s.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Teacher Dashboard Analytics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-border bg-surface p-4">
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>Total Examinees</span>
                        <Users size={16} className="text-accent" />
                      </div>
                      <div className="mt-2 font-mono text-2xl font-bold text-text">142 Students</div>
                      <div className="mt-1 text-[11px] text-success">↑ 100% submission rate</div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface p-4">
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>Average Class Score</span>
                        <Award size={16} className="text-primary" />
                      </div>
                      <div className="mt-2 font-mono text-2xl font-bold text-primary">87.4%</div>
                      <div className="mt-1 text-[11px] text-text-muted">Median: 89.0 • High: 100%</div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface p-4">
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>Automated Grading</span>
                        <BarChart3 size={16} className="text-success" />
                      </div>
                      <div className="mt-2 font-mono text-2xl font-bold text-success">0.32s</div>
                      <div className="mt-1 text-[11px] text-text-muted">Real-time instant analysis</div>
                    </div>
                  </div>

                  {/* Question Creator Live Strip */}
                  <div className="rounded-xl border border-border bg-surface p-5">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-semibold text-text flex items-center gap-2">
                        <Layers size={14} className="text-primary" />
                        Live Question Bank (18 Questions Configured)
                      </span>
                      <button className="rounded-md bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary border border-primary/30 hover:bg-primary/25 cursor-pointer">
                        + Add Question
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {[
                        {
                          num: "Q1",
                          type: "Multiple Choice",
                          text: "Explain time complexity of Dijkstra with Fibonacci heap",
                          pts: "5.0 pts",
                        },
                        {
                          num: "Q2",
                          type: "True / False",
                          text: "Two-phase locking guarantees conflict serializability",
                          pts: "3.0 pts",
                        },
                        {
                          num: "Q3",
                          type: "Multiple Choice",
                          text: "Which protocol is utilized in Raft consensus leader election?",
                          pts: "5.0 pts",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-lg border border-border bg-surface-2/60 p-3 text-xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono font-bold text-primary">{item.num}</span>
                            <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] text-accent border border-accent/20">
                              {item.type}
                            </span>
                            <span className="text-text truncate">{item.text}</span>
                          </div>
                          <span className="font-mono text-text-muted shrink-0 ml-3">{item.pts}</span>
                        </div>
                      ))}
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
