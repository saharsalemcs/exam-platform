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
    <section id="how-it-works" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            How it works
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            From exam creation to meaningful results
          </h2>
          <p className="text-base text-text-muted sm:text-lg">
            EduTest brings the entire assessment workflow into one focused
            experience.
          </p>
        </div>

        {/* Steps Flow Grid */}
        <div className="relative grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {/* Subtle desktop connecting line behind cards */}
          <div
            className="pointer-events-none absolute top-1/2 right-[15%] left-[15%] -z-10 hidden h-[2px] -translate-y-12 md:block"
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
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-8"
              >
                <div>
                  {/* Step Header: Badge & Icon */}
                  <div className="mb-6 flex items-center justify-between">
                    <span
                      className="rounded-full border border-white/[0.08] bg-white/5 px-3 py-1 font-mono text-xs font-bold"
                      style={{ color: step.accent }}
                    >
                      {step.number}
                    </span>

                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/[0.03] transition-transform duration-300 group-hover:scale-110"
                      style={{ color: step.accent }}
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="mb-3 flex items-center gap-2 font-display text-xl font-bold text-text">
                    <span>{step.title}</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {step.description}
                  </p>
                </div>

                {/* Card footer indicator */}
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-text-faint">
                  <span>Step {idx + 1} of 3</span>
                  {idx < 2 && (
                    <ArrowRight
                      size={14}
                      className="text-text-faint transition-transform group-hover:translate-x-1"
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
