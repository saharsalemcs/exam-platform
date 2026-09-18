import { Bookmark, Clock } from "lucide-react";

/**
 * A still frame of the real exam session UI (timer + question map), used as
 * the hero visual. Decorative only — hidden from assistive technology.
 */
const QUESTION_STATES = [
  "answered",
  "answered",
  "answered",
  "flagged",
  "current",
  "answered",
  "idle",
  "answered",
  "idle",
  "idle",
  "answered",
  "idle",
];

const LEGEND = [
  { label: "Answered", color: "var(--color-success)" },
  { label: "Current", color: "var(--color-primary)" },
  { label: "Unanswered", color: "var(--color-text-faint)" },
];

function ExamPreviewCard() {
  const answered = QUESTION_STATES.filter((s) => s === "answered").length;
  const progress = Math.round((answered / QUESTION_STATES.length) * 100);

  return (
    <div
      aria-hidden="true"
      className="animate-fade-scale rounded-lg border border-border bg-surface p-5 sm:p-6"
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      {/* Session header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div className="min-w-0">
          <p className="truncate font-display text-base font-semibold text-text">
            Data Structures — Midterm
          </p>
          <p className="mt-1 text-sm text-text-muted">Question 5 of 12</p>
        </div>

        <span className="flex shrink-0 items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          In progress
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[150px_1fr]">
        {/* Countdown */}
        <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-surface-2 p-4 text-center">
          <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] text-text-muted uppercase">
            <Clock size={12} />
            Time left
          </span>
          <span className="font-mono text-3xl leading-none font-medium text-text">
            24:31
          </span>
        </div>

        {/* Question map */}
        <div className="rounded-md border border-border bg-surface-2 p-4">
          <p className="mb-3 font-mono text-[11px] tracking-[0.08em] text-text-muted uppercase">
            Question map
          </p>

          <div className="grid grid-cols-6 gap-2">
            {QUESTION_STATES.map((state, i) => (
              <span
                key={i}
                className="relative flex h-8 items-center justify-center rounded-sm text-xs font-semibold"
                style={{
                  backgroundColor:
                    state === "answered"
                      ? "var(--color-success)"
                      : "var(--color-surface)",
                  color:
                    state === "answered"
                      ? "var(--color-bg)"
                      : state === "current"
                        ? "var(--color-primary)"
                        : "var(--color-text-faint)",
                  border:
                    state === "current"
                      ? "2px solid var(--color-primary)"
                      : "1px solid var(--color-border)",
                  boxShadow:
                    state === "current" ? "var(--shadow-glow)" : "none",
                }}
              >
                {i + 1}
                {state === "flagged" && (
                  <Bookmark
                    size={10}
                    className="absolute -top-1.5 -right-1.5 fill-warning text-warning"
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5 border-t border-border pt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-text-muted">Answers saved automatically</span>
          <span className="font-mono text-text">
            {answered}/{QUESTION_STATES.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ExamPreviewCard;
