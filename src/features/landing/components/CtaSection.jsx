import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2, GraduationCap } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-border/70 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[650px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #d4af58 0%, #4a7cff 70%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl border border-primary/40 bg-surface p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden"
          style={{
            boxShadow:
              "0 20px 50px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 88, 0.12)",
          }}
        >
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-6">
            <Sparkles size={13} />
            Instant Deployment
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text mx-auto leading-tight">
            Ready to Elevate Your Examination Standards?
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-text-muted  mx-auto leading-relaxed">
            Join hundreds of educators and students conducting exams with zero hassle, instant grading,
            and complete integrity.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/register"
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-bg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 px-7 py-3.5 text-base font-medium text-text hover:border-primary/40 hover:bg-surface-2/80 transition-all duration-150 cursor-pointer"
            >
              <span>Sign In to Portal</span>
            </Link>
          </div>

          {/* Micro badges below buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-success" />
              Free account creation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-success" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-success" />
              Instant student joining
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
