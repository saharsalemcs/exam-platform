import { ShieldCheck, Lock, WifiOff, KeyRound, Check } from "lucide-react";

export default function SecuritySection() {
  const pillars = [
    {
      icon: Lock,
      title: "Role-Based Access Isolation",
      desc: "Zero overlap between student and instructor privileges. Protected route authorization prevents unauthorized access to exam solutions or management tools.",
    },
    {
      icon: WifiOff,
      title: "Network Drop & Crash Resilience",
      desc: "Exam answers are cached in real time. If a student's WiFi drops or the browser closes, their progress is instantly restored when they reconnect.",
    },
    {
      icon: KeyRound,
      title: "Single-Attempt Session Locks",
      desc: "Tokenized session records ensure each candidate can only submit an authorized test once, eliminating duplicate attempts or concurrent logins.",
    },
    {
      icon: ShieldCheck,
      title: "Encrypted Cloud Data Architecture",
      desc: "All questions, answer keys, and grading metadata are securely protected with Supabase row-level security and strict database policies.",
    },
  ];

  return (
    <section id="security" className="relative py-20 sm:py-28 border-t border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3.5 py-1 text-xs font-semibold text-success mb-4">
            <ShieldCheck size={14} />
            Academic Integrity
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text">
            Security & Trust Built into Every Layer
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
            Rest easy knowing examinations are protected by industrial-grade security and session resilience.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-surface p-6 sm:p-7 transition-all duration-200 hover:border-success/40 hover:bg-surface-2"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-success/30 bg-success/10 text-success">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-bold text-text mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
