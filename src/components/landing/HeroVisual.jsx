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
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background radial glow effect behind hero mockup */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(212, 175, 88, 0.15) 0%, rgba(74, 124, 255, 0.08) 50%, transparent 80%)",
        }}
      />

      {/* Main Exam Mockup Window */}
      <div
        className="relative rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-2xl backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(17, 19, 24, 0.85)",
          border: "1px solid rgba(212, 175, 88, 0.2)",
          boxShadow:
            "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 88, 0.08)",
        }}
      >
        {/* Top bar window header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-[var(--color-text-faint)] tracking-wider uppercase ml-1 hidden sm:inline-block">
              EduTest Exam Session
            </span>
          </div>

          {/* Active Timer Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium"
            style={{
              backgroundColor: "rgba(212, 175, 88, 0.1)",
              border: "1px solid rgba(212, 175, 88, 0.3)",
              color: "var(--color-primary)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
            <Clock size={13} />
            <span>24:36 remaining</span>
          </div>
        </div>

        {/* Exam Subject & Meta */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              CS-301 Midterm
            </span>
            <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)]">
              Data Structures & Algorithms
            </h4>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-white/5">
            07 / 20
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-6">
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
        <div
          className="rounded-xl p-4 sm:p-5 mb-5"
          style={{
            backgroundColor: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--color-primary-glow)] text-[var(--color-primary)] border border-[var(--color-primary)]/20">
              Question 07
            </span>
            <span className="text-xs text-[var(--color-text-faint)] font-mono">
              Multiple Choice (5 pts)
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium text-[var(--color-text)] mb-4 leading-relaxed">
            Which data structure provides average O(1) time complexity for key insertion and retrieval operations?
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-left text-xs sm:text-sm font-medium transition-all cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? "rgba(212, 175, 88, 0.12)"
                      : "rgba(255, 255, 255, 0.02)",
                    border: isSelected
                      ? "1px solid rgba(212, 175, 88, 0.5)"
                      : "1px solid rgba(255, 255, 255, 0.05)",
                    color: isSelected
                      ? "var(--color-text)"
                      : "var(--color-text-muted)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isSelected
                          ? "bg-[var(--color-primary)] text-[#0d1117]"
                          : "bg-white/5 text-[var(--color-text-faint)] border border-white/10"
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSelected && (
                    <CheckCircle2
                      size={16}
                      className="text-[var(--color-primary)] shrink-0"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer controls inside mockup */}
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <button
            type="button"
            className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] text-[var(--color-text-faint)]">
              Auto-saved 2s ago
            </span>
            <button
              type="button"
              className="px-4 py-1.5 rounded-md text-[#0d1117] font-semibold flex items-center gap-1.5 transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <span>Save & Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Badge 1: Auto-Saved Indicator */}
      <div
        className="absolute -top-3 -left-3 sm:-top-5 sm:-left-6 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xl backdrop-blur-md animate-bounce"
        style={{
          backgroundColor: "rgba(17, 19, 24, 0.9)",
          border: "1px solid rgba(45, 212, 191, 0.3)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          animationDuration: "4s",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
        <CheckCircle2 size={15} className="text-[var(--color-success)]" />
        <span className="text-xs font-semibold text-[var(--color-text)]">
          Session Auto-Saved
        </span>
      </div>

      {/* Floating Badge 2: Security Indicator */}
      <div
        className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xl backdrop-blur-md"
        style={{
          backgroundColor: "rgba(17, 19, 24, 0.9)",
          border: "1px solid rgba(74, 124, 255, 0.3)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        }}
      >
        <ShieldCheck size={16} className="text-[var(--color-accent)]" />
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold text-[var(--color-text)] leading-none">
            Secure Session Active
          </span>
          <span className="text-[9px] text-[var(--color-text-faint)] leading-tight">
            Focus Lock Enabled
          </span>
        </div>
      </div>

      {/* Floating Badge 3: Instant Score Result Preview */}
      <div
        className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-6 px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-2xl backdrop-blur-md"
        style={{
          backgroundColor: "rgba(17, 19, 24, 0.95)",
          border: "1px solid rgba(212, 175, 88, 0.35)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            backgroundColor: "rgba(212, 175, 88, 0.15)",
            color: "var(--color-primary)",
          }}
        >
          <Award size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[var(--color-primary)]">
            92% Score
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)]">
            Instant Grading Verified
          </span>
        </div>
      </div>
    </div>
  );
}
