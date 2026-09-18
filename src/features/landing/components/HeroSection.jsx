import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/shared/Button";
import ExamPreviewCard from "./ExamPreviewCard";
import { HERO_FACTS } from "../constants/landingContent";
import { useLandingCta } from "../hooks/useLandingCta";

function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated, primaryTo, primaryLabel, secondaryTo } =
    useLandingCta();

  return (
    <section className="px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8 lg:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-300 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
            <ShieldCheck size={14} className="text-primary" />
            Student and teacher portals in one platform
          </span>

          <h1 className="mt-5 font-display text-3xl leading-tight font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Run exams online, from{" "}
            <span className="bg-gradient-to-r from-[#d4af58] via-[#edd88a] to-[#4a7cff] bg-clip-text text-transparent">
              first question
            </span>{" "}
            to final result.
          </h1>

          <p className="mt-5 max-w-145 text-base leading-relaxed text-text-muted">
            EduTest gives teachers a guided builder for creating and publishing
            exams, and students a timed, proctored session that scores itself.
            Results, answer review and performance history follow automatically.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" onClick={() => navigate(primaryTo)}>
              {primaryLabel}
              <ArrowRight size={18} />
            </Button>

            {!isAuthenticated && (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate(secondaryTo)}
              >
                Sign in
              </Button>
            )}
          </div>

          <p className="mt-4 text-xs text-text-muted">
            Students can register themselves. Teacher accounts are provisioned
            by the institution — sign in to reach the teacher portal.
          </p>

          {/* Supporting facts */}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
            {HERO_FACTS.map((fact) => (
              <li
                key={fact.label}
                className="flex items-center gap-2 text-sm text-text-muted"
              >
                <fact.icon size={15} className="text-primary" />
                {fact.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <ExamPreviewCard />
      </div>
    </section>
  );
}

export default HeroSection;
