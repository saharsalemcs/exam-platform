import React from "react";
import { FileEdit, PlayCircle, BarChart3, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Create",
      icon: FileEdit,
      description:
        "Build custom exams using the intuitive wizard. Add multiple-choice questions, configure duration, pass marks, and target student eligibility.",
      accent: "var(--color-primary)",
    },
    {
      number: "02",
      title: "Assess",
      icon: PlayCircle,
      description:
        "Students launch timed exam sessions with real-time answer autosave, countdown indicators, and secure focus management.",
      accent: "var(--color-accent)",
    },
    {
      number: "03",
      title: "Review",
      icon: BarChart3,
      description:
        "Instantly receive automated score calculations, detailed question-by-question breakdowns, and instructor performance analytics.",
      accent: "var(--color-success)",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] font-mono">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--color-text)] tracking-tight">
            From exam creation to meaningful results
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-muted)]">
            EduTest brings the entire assessment workflow into one focused experience.
          </p>
        </div>

        {/* Steps Flow Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Subtle desktop connecting line behind cards */}
          <div
            className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] -translate-y-12 pointer-events-none -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(212, 175, 88, 0.3) 0%, rgba(74, 124, 255, 0.3) 50%, rgba(45, 212, 191, 0.3) 100%)",
            }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div>
                  {/* Step Header: Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: step.accent,
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      {step.number}
                    </span>

                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `rgba(255, 255, 255, 0.03)`,
                        border: "1px solid var(--color-border)",
                        color: step.accent,
                      }}
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="text-xl font-bold font-display text-[var(--color-text)] mb-3 flex items-center gap-2">
                    <span>{step.title}</span>
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Card footer indicator */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[var(--color-text-faint)]">
                  <span>Step {idx + 1} of 3</span>
                  {idx < 2 && (
                    <ArrowRight
                      size={14}
                      className="text-[var(--color-text-faint)] group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
