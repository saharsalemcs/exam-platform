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
    <section className="py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl p-8 sm:p-14 text-center overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid rgba(212, 175, 88, 0.25)",
            boxShadow:
              "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 175, 88, 0.06)",
          }}
        >
          {/* Subtle gold radial background glow */}
          <div
            className="absolute -inset-10 opacity-40 blur-3xl pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(212, 175, 88, 0.2) 0%, transparent 70%)",
            }}
          />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 text-[var(--color-primary)] bg-[var(--color-primary-glow)] border border-[var(--color-primary)]/20">
            <Sparkles size={13} />
            <span>Elevate Your Assessments</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[var(--color-text)] tracking-tight mb-4 max-w-2xl mx-auto">
            Ready to make your next assessment smarter?
          </h2>

          <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-xl mx-auto mb-8 leading-relaxed">
            Create, assess, and review — all in one unified, high-performance platform.
          </p>

          <div className="flex justify-center items-center gap-4">
            {!isLoading && user ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(dashboardPath)}
                className="gap-2 font-semibold shadow-lg hover:scale-[1.02] transition-transform"
              >
                <LayoutDashboard size={18} />
                <span>Go to Dashboard</span>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/register")}
                className="gap-2 font-semibold shadow-lg hover:scale-[1.02] transition-transform"
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
