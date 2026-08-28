import { Sliders, Laptop, Award, ArrowRight } from "lucide-react";

export default function WorkflowSection() {
  const steps = [
    {
      number: "01",
      icon: Sliders,
      title: "Draft & Configure",
      desc: "Educators use the intuitive 4-step wizard to formulate questions, specify point allocations, set passing criteria, and schedule launch windows.",
      badge: "Instructor Setup",
    },
    {
      number: "02",
      icon: Laptop,
      title: "Deliver & Secure",
      desc: "Students take assessments in a modern, distraction-free environment equipped with a synchronized countdown timer and resilient auto-saving.",
      badge: "Live Exam Session",
    },
    {
      number: "03",
      icon: Award,
      title: "Grade & Analyze",
      desc: "EduTest instantly scores submissions, generates comprehensive performance breakdowns, and updates instructor roster statistics.",
      badge: "Instant Diagnostics",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 border-t border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
            Seamless Workflow
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
            From Test Creation to Final Grades in 3 Simple Steps
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
            Eliminate complex spreadsheets, manual grading delays, and technical friction.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-border bg-surface p-7 sm:p-8 transition-all duration-300 hover:border-primary/40 hover:bg-surface-2"
              >
                {/* Step Number Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-primary/40 group-hover:text-primary transition-colors">
                    {step.number}
                  </span>
                  <span className="rounded-full bg-surface-2 border border-border px-3 py-1 text-[11px] font-semibold text-text-muted">
                    {step.badge}
                  </span>
                </div>

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-text mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
