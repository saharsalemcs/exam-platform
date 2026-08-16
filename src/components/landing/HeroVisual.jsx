import React, { useState } from "react";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Award,
  ChevronRight,
} from "lucide-react";

export default function HeroVisual() {
  const [selectedOption, setSelectedOption] = useState("B");

  const options = [
    { id: "A", text: "Binary Search Tree" },
    { id: "B", text: "Hash Table (Hash Map)" },
    { id: "C", text: "Doubly Linked List" },
    { id: "D", text: "Red-Black Tree" },
  ];

  return (
    <div className="relative mx-auto w-full lg:mx-0 lg:max-w-none">
      {/* Background radial glow effect behind hero mockup */}
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(212, 175, 88, 0.15) 0%, rgba(74, 124, 255, 0.08) 50%, transparent 80%)",
        }}
      />

      {/* Main Exam Mockup Window */}
      <div className="relative rounded-2xl border border-primary/20 bg-surface/85 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:p-6">
        {/* Top bar window header */}
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500/80" />
              <span className="inline-block h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="inline-block h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-1 hidden font-mono text-xs tracking-wider text-text-faint uppercase sm:inline-block">
              EduTest Exam Session
            </span>
          </div>

          {/* Active Timer Badge */}
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <Clock size={13} />
            <span>24:36 remaining</span>
          </div>
        </div>

        {/* Exam Subject & Meta */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              CS-301 Midterm
            </span>
            <h4 className="truncate text-base font-semibold text-text sm:text-lg">
              Data Structures &amp; Algorithms
            </h4>
          </div>
          <span className="shrink-0 rounded border border-white/5 bg-surface-2 px-2.5 py-1 font-mono text-xs text-text-muted">
            07 / 20
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: "35%",
              background:
                "linear-gradient(90deg, var(--color-primary) 0%, #f3d68c 100%)",
            }}
          />
        </div>

        {/* Question Panel */}
        <div className="mb-5 rounded-xl border border-border bg-surface-2 p-4 sm:p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className="rounded border border-primary/20 bg-primary-glow px-2 py-0.5 text-xs font-semibold text-primary">
              Question 07
            </span>
            <span className="font-mono text-xs text-text-faint">
              Multiple Choice (5 pts)
            </span>
          </div>

          <p className="mb-4 text-sm leading-relaxed font-medium text-text sm:text-base">
            Which data structure provides average O(1) time complexity for key
            insertion and retrieval operations?
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-lg border p-3 text-left text-xs font-medium transition-all sm:text-sm ${
                    isSelected
                      ? "border-primary/50 bg-primary/[0.12] text-text"
                      : "border-white/5 bg-white/[0.02] text-text-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        isSelected
                          ? "bg-primary text-bg"
                          : "border border-white/10 bg-white/5 text-text-faint"
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 size={16} className="shrink-0 text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer controls inside mockup */}
        <div className="flex items-center justify-between text-xs text-text-muted">
          <button
            type="button"
            className="rounded-md border border-white/5 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden text-[11px] text-text-faint sm:inline-block">
              Auto-saved 2s ago
            </span>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 font-semibold text-bg transition-transform hover:scale-[1.02]"
            >
              <span>Save &amp; Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Badge 1: Auto-Saved Indicator */}
      <div
        className="absolute -top-3 left-1 flex animate-bounce items-center gap-2 rounded-xl border border-success/30 bg-surface/90 px-3.5 py-2 shadow-xl backdrop-blur-md sm:-top-5 sm:-left-6"
        style={{ animationDuration: "4s" }}
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
        <CheckCircle2 size={15} className="text-success" />
        <span className="text-xs font-semibold text-text">
          Session Auto-Saved
        </span>
      </div>

      {/* Floating Badge 2: Security Indicator */}
      <div
        className="absolute -bottom-12 left-1 flex animate-bounce items-center gap-2 rounded-xl border border-accent/30 bg-surface/90 px-3 py-3 shadow-xl backdrop-blur-md"
        style={{ animationDuration: "4s" }}
      >
        <ShieldCheck size={16} className="text-accent" />
        <div className="flex flex-col gap-1 text-left">
          <span className="text-[11px] leading-none font-semibold text-text">
            Secure Session Active
          </span>
          <span className="text-[9px] leading-tight text-text-faint">
            Focus Lock Enabled
          </span>
        </div>
      </div>

      {/* Floating Badge 3: Instant Score Result Preview */}
      <div
        className="absolute right-1 -bottom-13 flex animate-bounce items-center gap-3 rounded-xl border border-primary/35 bg-surface/95 px-4 py-2.5 shadow-2xl backdrop-blur-md"
        style={{ animationDuration: "4s" }}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/[0.15] text-primary">
          <Award size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-primary">92% Score</span>
          <span className="text-[10px] text-text-muted">
            Instant Grading Verified
          </span>
        </div>
      </div>
    </div>
  );
}
