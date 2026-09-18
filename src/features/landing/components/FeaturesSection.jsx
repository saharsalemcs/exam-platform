import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { FEATURES } from "../constants/landingContent";

function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-300">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="What the platform handles for you"
            description="From building the exam to grading it, the parts that usually take spreadsheets and email are built in."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Reveal
              key={feature.title}
              delay={(index % 3) * 80}
              className="h-full"
            >
              <article className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-lg transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-2 text-primary transition-transform duration-300 group-hover:scale-110">
                  <feature.icon size={19} />
                </span>

                <h3 className="font-display text-base font-semibold text-text">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
