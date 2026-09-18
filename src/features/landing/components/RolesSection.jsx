import { useNavigate } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import Button from "@/components/shared/Button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ROLE_CARDS } from "../constants/landingContent";

const ACCENTS = {
  primary: {
    iconBox: "border-primary/20 bg-primary/10 text-primary",
    check: "text-primary",
  },
  accent: {
    iconBox: "border-accent/20 bg-accent/10 text-accent",
    check: "text-accent",
  },
};

function RolesSection() {
  const navigate = useNavigate();

  return (
    <section id="roles" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-300">
        <Reveal>
          <SectionHeading
            eyebrow="Who it's for"
            title="Two portals, one exam workflow"
            description="Students and teachers get the tools their side of the exam actually needs — nothing else to configure."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {ROLE_CARDS.map((role, index) => {
            const accent = ACCENTS[role.accent];

            return (
              <Reveal key={role.key} delay={index * 100} className="h-full">
                <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-lg transition-all duration-200 hover:-translate-y-1 hover:border-primary/30">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border ${accent.iconBox}`}
                    >
                      <role.icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-text">
                        {role.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-text-muted">
                        {role.description}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {role.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                      >
                        <CircleCheckBig
                          size={15}
                          className={`mt-0.5 shrink-0 ${accent.check}`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-border pt-5">
                    <Button
                      variant={role.key === "student" ? "outline" : "secondary"}
                      onClick={() =>
                        navigate(
                          role.key === "student" ? "/register" : "/login",
                        )
                      }
                    >
                      {role.key === "student"
                        ? "Create a student account"
                        : "Sign in to the teacher portal"}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RolesSection;
