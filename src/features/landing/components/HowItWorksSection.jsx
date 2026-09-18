import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { STEPS } from "../constants/landingContent";

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-300">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to your first exam"
            description="The same flow whether you're sitting an exam or setting one."
          />
        </Reveal>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.number} className="h-full">
              <Reveal delay={index * 100} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary bg-surface-2 font-mono text-sm font-bold text-primary">
                      {step.number}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                    <step.icon size={18} className="shrink-0 text-text-muted" />
                  </div>

                  <h3 className="font-display text-base font-semibold text-text">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorksSection;
