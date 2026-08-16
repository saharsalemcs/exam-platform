import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import { useUser } from "@/features/auth/hooks/useUser";
import { ROLES } from "@/utils/constants";
import Button from "@/components/shared/Button";
import HeroVisual from "./HeroVisual";

export default function HeroSection() {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();

  const user = data?.user;
  const profile = data?.profile;

  const dashboardPath =
    profile?.role === ROLES.TEACHER
      ? "/instructor/dashboard"
      : "/student/dashboard";

  const handleExploreFeatures = () => {
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Decorative Ambient Radial Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212, 175, 88, 0.25) 0%, rgba(74, 124, 255, 0.1) 50%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            {/* Eyebrow Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300"
              style={{
                backgroundColor: "rgba(212, 175, 88, 0.08)",
                border: "1px solid rgba(212, 175, 88, 0.25)",
                color: "var(--color-primary)",
              }}
            >
              <Sparkles size={13} className="text-[var(--color-primary)]" />
              <span>ONLINE EXAMINATION PLATFORM</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[var(--color-text)] tracking-tight leading-[1.1]">
              A Better Way to <br className="hidden sm:inline" />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-primary) 0%, #f7e3ad 50%, #d4af58 100%)",
                }}
              >
                Assess Knowledge
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-xl font-normal leading-relaxed">
              Create structured exams, deliver secure timed assessments, and understand student performance — all from one platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
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

              <Button
                variant="secondary"
                size="lg"
                onClick={handleExploreFeatures}
                className="font-medium"
              >
                Explore Features
              </Button>
            </div>

            {/* Small Product Capability Indicators */}
            <div className="pt-6 border-t border-white/5 w-full">
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm font-medium text-[var(--color-text-muted)]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-primary-glow)] flex items-center justify-center text-[var(--color-primary)]">
                    <ShieldCheck size={13} />
                  </div>
                  <span>Secure assessments</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-primary-glow)] flex items-center justify-center text-[var(--color-primary)]">
                    <CheckCircle2 size={13} />
                  </div>
                  <span>Auto-saved sessions</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-primary-glow)] flex items-center justify-center text-[var(--color-primary)]">
                    <Zap size={13} />
                  </div>
                  <span>Instant results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Mockup */}
          <div className="lg:col-span-6 w-full mt-6 lg:mt-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
