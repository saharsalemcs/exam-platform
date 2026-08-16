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
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-44 lg:pb-32">
      {/* Background Decorative Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212, 175, 88, 0.25) 0%, rgba(74, 124, 255, 0.1) 50%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Text & Actions */}
          <div className="flex flex-col items-center space-y-6 text-left sm:items-start lg:col-span-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
              <Sparkles size={13} />
              <span>Online Examination Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-center font-display text-4xl leading-[1.1] font-bold tracking-tight text-text sm:text-left sm:text-5xl lg:text-6xl">
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
            <p className="text-center text-base leading-relaxed font-normal text-text-muted sm:text-left sm:text-lg">
              Create structured exams, deliver secure timed assessments, and
              understand student performance — all from one platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex w-full flex-1 flex-wrap items-center gap-3 pt-2 sm:w-auto">
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
            <div className="w-full border-t border-white/5 pt-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-text-muted sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-glow text-primary">
                    <ShieldCheck size={13} />
                  </div>
                  <span>Secure assessments</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-glow text-primary">
                    <CheckCircle2 size={13} />
                  </div>
                  <span>Auto-saved sessions</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-glow text-primary">
                    <Zap size={13} />
                  </div>
                  <span>Instant results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Mockup */}
          <div className="mt-6 w-full min-w-0 lg:col-span-6 lg:mt-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
