import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";
import { useUser } from "@/features/auth/hooks/useUser";
import { ROLES } from "@/utils/constants";
import Button from "@/components/shared/Button";

export default function FinalCTASection() {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();

  const user = data?.user;
  const profile = data?.profile;

  const dashboardPath =
    profile?.role === ROLES.TEACHER
      ? "/instructor/dashboard"
      : "/student/dashboard";

  return (
    <section className="relative overflow-hidden pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-surface p-8 text-center shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,88,0.06)] transition-all duration-300 sm:p-14">
          {/* Subtle gold radial background glow */}
          <div
            className="pointer-events-none absolute -inset-10 -z-10 opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(212, 175, 88, 0.2) 0%, transparent 70%)",
            }}
          />

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-glow px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
            <Sparkles size={13} />
            <span>Elevate Your Assessments</span>
          </div>

          <h2 className="mx-auto mb-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Ready to make your next assessment smarter?
          </h2>

          <p className="mx-auto mb-8 text-base leading-relaxed text-text-muted sm:text-lg">
            Create, assess, and review — all in one unified, high-performance
            platform.
          </p>

          <div className="flex items-center justify-center gap-4">
            {!isLoading && user ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(dashboardPath)}
                className="gap-2 font-semibold shadow-lg transition-transform hover:scale-[1.02]"
              >
                <LayoutDashboard size={18} />
                <span>Go to Dashboard</span>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/register")}
                className="gap-2 font-semibold shadow-lg transition-transform hover:scale-[1.02]"
              >
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
