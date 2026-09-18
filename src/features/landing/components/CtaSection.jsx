import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "@/components/shared/Button";
import Reveal from "./Reveal";
import { useLandingCta } from "../hooks/useLandingCta";

function CtaSection() {
  const navigate = useNavigate();
  const { isAuthenticated, primaryTo, primaryLabel, secondaryTo } =
    useLandingCta();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-300">
        <Reveal>
          <div
            className="flex flex-col items-center rounded-lg border border-primary/25 bg-surface px-6 py-12 text-center sm:px-10"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <h2 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
              Ready to run your first exam?
            </h2>

            <p className="mt-3 max-w-128 text-sm leading-relaxed text-text-muted sm:text-base">
              Create a student account in under a minute, or sign in to the
              teacher portal and publish an exam today.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CtaSection;
