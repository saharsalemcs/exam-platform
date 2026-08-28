import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  Sliders,
  BarChart3,
  ShieldAlert,
  Clock,
  Award,
  BookOpen,
  FileCheck2,
  FolderSync,
} from "lucide-react";

export default function RoleSwitcherSection() {
  const [selectedRole, setSelectedRole] = useState("teacher"); // 'teacher' | 'student'

  const teacherFeatures = [
    {
      icon: Sliders,
      title: "Intuitive Multi-Step Exam Wizard",
      desc: "Create comprehensive exams with custom duration, passing threshold, multiple question formats, and point allocations with live preview.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Student Analytics & Grading",
      desc: "Instantly calculate multiple choice scores, review short answer submissions, and observe class score distribution graphs.",
    },
    {
      icon: Users,
      title: "Comprehensive Student Rosters",
      desc: "Track student performance across departments, monitor exam completion rates, and manage student attempts effortlessly.",
    },
    {
      icon: FolderSync,
      title: "Exam Management & History",
      desc: "Draft, edit, publish, or archive exams with complete audit trails and historical performance logs.",
    },
  ];

  const studentFeatures = [
    {
      icon: Clock,
      title: "Distraction-Free Exam Environment",
      desc: "Full-screen optimized testing room with an accurate live countdown timer, clear question navigation, and flag-for-review tags.",
    },
    {
      icon: FileCheck2,
      title: "Instant Diagnostic Score Breakdown",
      desc: "Receive immediate test results upon submission with question-by-question explanations, correct solutions, and percentage scores.",
    },
    {
      icon: BookOpen,
      title: "Available Exams Catalog",
      desc: "Filter active and upcoming tests by department, academic grade, and status to never miss a scheduled test window.",
    },
    {
      icon: Award,
      title: "Academic Growth History",
      desc: "Review past test attempts, analyze learning trends over time, and download verified performance summaries.",
    },
  ];

  return (
    <section id="roles" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            Tailored Experiences
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
            Engineered for Both Sides of Academic Excellence
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
            Whether you are designing a university final or taking a certification quiz, EduTest
            provides the specialized tools you need to succeed.
          </p>
        </div>

        {/* Role Switcher Pill Bar */}
        <div className="mt-10 flex justify-center">
          <div className="flex rounded-2xl border border-border bg-surface p-1.5 shadow-lg">
            <button
              onClick={() => setSelectedRole("teacher")}
              className={`flex items-center gap-2.5 rounded-xl px-5 sm:px-8 py-3 text-sm font-semibold transition-all cursor-pointer ${
                selectedRole === "teacher"
                  ? "bg-primary text-bg shadow-md"
                  : "text-text-muted hover:text-text"
              }`}
            >
              <GraduationCap size={18} />
              <span>For Instructors & Teachers</span>
            </button>
            <button
              onClick={() => setSelectedRole("student")}
              className={`flex items-center gap-2.5 rounded-xl px-5 sm:px-8 py-3 text-sm font-semibold transition-all cursor-pointer ${
                selectedRole === "student"
                  ? "bg-primary text-bg shadow-md"
                  : "text-text-muted hover:text-text"
              }`}
            >
              <Users size={18} />
              <span>For Students & Candidates</span>
            </button>
          </div>
        </div>

        {/* Role Content Display */}
        <div className="mt-12">
          {selectedRole === "teacher" ? (
            /* Teacher Card Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Features List */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {teacherFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-border bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-primary/40 hover:bg-surface-2"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:scale-105">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-base font-bold text-text mb-2">{feat.title}</h3>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right Visual Card */}
              <div className="lg:col-span-5 rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-xl">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-sm font-bold text-text">Teacher Workspace</span>
                  </div>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                    Instructor Portal
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <div className="text-xs font-semibold text-text-muted">Active Exams Managed</div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="font-mono text-2xl font-bold text-text">8 Exams</span>
                      <span className="text-xs text-success font-medium">3 Live Today</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <div className="text-xs font-semibold text-text-muted">Total Submissions</div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="font-mono text-2xl font-bold text-primary">342 Attempts</span>
                      <span className="text-xs text-accent font-medium">100% Auto-Graded</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs">
                    <div className="font-semibold text-text mb-1">Ready to create your first test?</div>
                    <p className="text-text-muted mb-3">
                      Takes under 2 minutes to configure questions, scoring criteria, and department rules.
                    </p>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-bg hover:bg-primary/90 transition-all cursor-pointer"
                    >
                      <span>Launch Exam Wizard</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Student Card Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Features List */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {studentFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-border bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-accent/40 hover:bg-surface-2"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-transform group-hover:scale-105">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-base font-bold text-text mb-2">{feat.title}</h3>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right Visual Card */}
              <div className="lg:col-span-5 rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-xl">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-accent" />
                    <span className="text-sm font-bold text-text">Student Experience</span>
                  </div>
                  <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                    Student Portal
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <div className="text-xs font-semibold text-text-muted">Available Exams To Take</div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="font-mono text-2xl font-bold text-text">4 Ready</span>
                      <span className="text-xs text-warning font-medium">1 Due Tonight</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <div className="text-xs font-semibold text-text-muted">Average Performance</div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="font-mono text-2xl font-bold text-success">92.5%</span>
                      <span className="text-xs text-text-muted font-medium">Top 5% in Class</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-accent/30 bg-accent/5 p-4 text-xs">
                    <div className="font-semibold text-text mb-1">Take an assessment without stress</div>
                    <p className="text-text-muted mb-3">
                      Clean full-screen room, auto-save on every click, and instant grade feedback.
                    </p>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-accent/90 transition-all cursor-pointer"
                    >
                      <span>Join as Student</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
