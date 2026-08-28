import { Shield, Zap, Award, Activity } from "lucide-react";

export default function StatsRibbon() {
  const stats = [
    {
      icon: Shield,
      value: "99.99%",
      label: "Session Uptime & Recovery",
      desc: "Zero data loss during network drops with local state cache",
    },
    {
      icon: Zap,
      value: "< 90 sec",
      label: "Exam Setup Time",
      desc: "Streamlined 4-step wizard for intuitive question creation",
    },
    {
      icon: Activity,
      value: "Instant",
      label: "Automated Grading",
      desc: "Real-time score calculation & diagnostic performance analysis",
    },
    {
      icon: Award,
      value: "100%",
      label: "Academic Integrity",
      desc: "Strict timer enforcement, randomized order & role security",
    },
  ];

  return (
    <section className="relative border-y border-border bg-surface/60 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-8" : ""
                }`}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-surface-2 text-primary"
                  style={{ boxShadow: "0 0 16px rgba(212, 175, 88, 0.12)" }}
                >
                  <Icon size={20} />
                </div>
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-text">{stat.label}</div>
                <p className="mt-1 text-xs text-text-muted max-w-[220px] leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
