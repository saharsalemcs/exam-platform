import {
  Sparkles,
  Clock,
  BarChart3,
  ShieldCheck,
  Layers,
  CheckCircle2,
  Lock,
  Zap,
  Award,
  Sliders,
  FileText,
  Workflow,
} from "lucide-react";

export default function BentoFeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-28 border-t border-border/70">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-10 blur-[120px]"
        style={{ background: "#d4af58" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            Engineered Capabilities
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
            Everything You Need for Enterprise-Grade Testing
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
            Built with modern web standards, lightning-fast state synchronization, and zero-compromise security.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bento Card 1: Intelligent Exam Wizard (Spans 2 cols) */}
          <div className="lg:col-span-2 group relative rounded-3xl border border-border bg-surface p-7 sm:p-9 shadow-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:bg-surface-2/60">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Sliders size={22} />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                    Step-by-Step Wizard
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text">
                  Adaptive Multi-Format Exam Builder
                </h3>
                <p className="mt-2 text-sm sm:text-base text-text-muted leading-relaxed">
                  Design complex tests with multiple choice, true/false, and short answer formats.
                  Configure passing scores, custom durations, and randomized questions in seconds.
                </p>
              </div>

              {/* Interactive Mini Visual inside Card */}
              <div className="mt-8 rounded-2xl border border-border bg-[#0d1017] p-4 sm:p-5 shadow-inner">
                <div className="flex items-center justify-between text-xs text-text-muted border-b border-border pb-3 mb-3">
                  <span className="font-semibold text-text flex items-center gap-2">
                    <FileText size={14} className="text-primary" />
                    Question 03 Configuration
                  </span>
                  <span className="rounded bg-success/15 px-2 py-0.5 text-xs text-success font-medium">
                    Auto-Save Active
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-lg bg-surface-2 border border-border px-3 py-1 text-text">
                    Format: Multiple Choice
                  </span>
                  <span className="rounded-lg bg-surface-2 border border-border px-3 py-1 text-text">
                    Points: 5.0
                  </span>
                  <span className="rounded-lg bg-surface-2 border border-border px-3 py-1 text-text">
                    Difficulty: Hard
                  </span>
                  <span className="rounded-lg bg-primary/15 text-primary border border-primary/30 px-3 py-1 font-semibold">
                    Correct Option: [ B ]
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Resilient Time Sync Engine (1 col) */}
          <div className="group relative rounded-3xl border border-border bg-surface p-7 sm:p-8 shadow-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:bg-surface-2/60">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary mb-4">
              <Clock size={22} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-text">
              Precision Time-Sync & Auto-Submit
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-text-muted leading-relaxed">
              Strict millisecond-synchronized timer ensures zero time manipulation. Automatic submission upon deadline expiry.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-[#0d1017] p-4 text-center">
              <div className="text-[11px] text-text-faint uppercase tracking-wider font-semibold">
                Live Test Countdown
              </div>
              <div className="mt-1 font-mono text-3xl font-bold text-primary tracking-wider">
                00:18:42
              </div>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-success font-medium">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Local & Cloud Synchronized
              </div>
            </div>
          </div>

          {/* Bento Card 3: Real-Time Diagnostic Analytics (1 col) */}
          <div className="group relative rounded-3xl border border-border bg-surface p-7 sm:p-8 shadow-xl overflow-hidden transition-all duration-300 hover:border-accent/40 hover:bg-surface-2/60">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent mb-4">
              <BarChart3 size={22} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-text">
              Instant Analytics & Grade Distribution
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-text-muted leading-relaxed">
              Automated grading calculations deliver immediate feedback for students and deep demographic statistics for educators.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-[#0d1017] p-4">
              <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                <span>Class Pass Ratio</span>
                <span className="font-mono font-bold text-success">94.2%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-success rounded-full" style={{ width: "94.2%" }} />
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-text-faint font-mono">
                <span>Low: 64%</span>
                <span>Avg: 87.5%</span>
                <span>High: 100%</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Academic Integrity & Role Security (Spans 2 cols) */}
          <div className="lg:col-span-2 group relative rounded-3xl border border-border bg-surface p-7 sm:p-9 shadow-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:bg-surface-2/60">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-success/30 bg-success/10 text-success">
                    <ShieldCheck size={22} />
                  </div>
                  <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success border border-success/20">
                    Academic Integrity Protection
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text">
                  Ironclad Session Security & Role Access
                </h3>
                <p className="mt-2 text-sm sm:text-base text-text-muted leading-relaxed">
                  Protected route guards powered by Supabase verify student and instructor permissions.
                  Single-session tokenization prevents dual logins or test tampering.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-border bg-surface-2 p-3.5 flex items-center gap-2.5">
                  <Lock size={16} className="text-primary shrink-0" />
                  <span className="text-xs font-medium text-text">Single-Attempt Token</span>
                </div>
                <div className="rounded-xl border border-border bg-surface-2 p-3.5 flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-success shrink-0" />
                  <span className="text-xs font-medium text-text">Anti-Tampering Auto-Lock</span>
                </div>
                <div className="rounded-xl border border-border bg-surface-2 p-3.5 flex items-center gap-2.5">
                  <Zap size={16} className="text-accent shrink-0" />
                  <span className="text-xs font-medium text-text">Zero-Lag Cloud Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
