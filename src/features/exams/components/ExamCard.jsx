import Button from "@/components/shared/Button";
import ExamStatusBadge from "@/components/shared/ExamStatusBadge";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  Tag,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DIFFICULTY = {
  easy: {
    label: "Easy",
    bg: "rgba(45,212,191,0.1)",
    border: "rgba(45,212,191,0.2)",
    color: "var(--color-success)",
  },
  medium: {
    label: "Medium",
    bg: "rgba(237,216,138,0.1)",
    border: "rgba(237,216,138,0.2)",
    color: "var(--color-warning)",
  },
  hard: {
    label: "Hard",
    bg: "rgba(200,93,106,0.1)",
    border: "rgba(200,93,106,0.2)",
    color: "var(--color-danger)",
  },
};

/**
 * exam -> obj from supabase -> { id, title, description, category, duration_mins, total_marks, profiles }
 *
 * index -> for stagger animation
 * attemptInfo -> { [examId]: { status, attemptId } }
  // submitStatus: 'submitted' | 'timed_out' | 'violated'
 */
function ExamCard({ exam, index = 0, attemptInfo }) {
  const navigate = useNavigate();

  const difficulty = DIFFICULTY[exam.difficulty] ?? DIFFICULTY.medium;
  const isCompleted =
    attemptInfo?.status === "submitted" || attemptInfo?.status === "timed_out";
  const isViolated = attemptInfo?.status === "violated";

  function handleAction(e) {
    e.preventDefault();
    if (isCompleted || isViolated)
      navigate(`/student/results/${attemptInfo.attemptId}`);
    else navigate(`/student/exams/${exam.id}`);
  }

  const cardBorderColor = isViolated
    ? "rgba(200,93,106,0.35)"
    : isCompleted
      ? "rgba(45,212,191,0.3)"
      : "var(--color-border)";

  const cardShadow = isViolated
    ? "0 18px 40px rgba(200,93,106,0.12)"
    : isCompleted
      ? "0 18px 40px rgba(45,212,191,0.12)"
      : "0 16px 32px rgba(15, 23, 42, 0.08)";

  const actionLabel = isCompleted
    ? "View results for this exam"
    : isViolated
      ? "View violated exam results"
      : `Start exam: ${exam.title}`;

  return (
    <article
      className="group relative flex h-full animate-[fade-up_0.4s_ease_both] flex-col overflow-hidden rounded-2xl border bg-[var(--color-surface)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(15,23,42,0.14)] focus-within:-translate-y-1" 
      style={{
        borderColor: cardBorderColor,
        boxShadow: cardShadow,
        animationDelay: `${index * 60}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isViolated
          ? "rgba(200,93,106,0.56)"
          : isCompleted
            ? "rgba(45,212,191,0.45)"
            : "rgba(212,175,88,0.38)";
        e.currentTarget.style.boxShadow = isViolated
          ? "0 22px 45px rgba(200,93,106,0.16)"
          : isCompleted
            ? "0 22px 45px rgba(45,212,191,0.16)"
            : "0 22px 45px rgba(15,23,42,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = cardBorderColor;
        e.currentTarget.style.boxShadow = cardShadow;
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-primary)]/80 via-[var(--color-primary)] to-transparent opacity-80" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {exam.category && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em]"
              style={{
                backgroundColor: "var(--color-primary-glow)",
                border: "1px solid rgba(212,175,88,0.18)",
                color: "var(--color-primary)",
              }}
            >
              <Tag size={10} />
              {exam.category}
            </span>
          )}

          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em]"
            style={{
              backgroundColor: difficulty.bg,
              border: `1px solid ${difficulty.border}`,
              color: difficulty.color,
            }}
          >
            {difficulty.label}
          </span>

          {isCompleted && <ExamStatusBadge status="completed" />}
          {isViolated && <ExamStatusBadge status="violated" />}
        </div>

        <div className="flex-1">
          <h3
            className="mb-2 line-clamp-2 text-lg font-semibold leading-tight tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            {exam.title}
          </h3>
          {exam.description && (
            <p
              className="line-clamp-3 text-sm leading-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              {exam.description}
            </p>
          )}
        </div>

        <div className="mt-5 space-y-3 border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
          <div className="grid grid-cols-2 gap-2.5">
            <div
              className="flex items-center gap-2 rounded-xl border px-2.5 py-2"
              style={{
                backgroundColor: "var(--color-surface-2)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "rgba(212,175,88,0.08)",
                  color: "var(--color-primary)",
                }}
              >
                <Clock size={14} />
              </span>
              <span className="text-sm font-medium">{exam.duration_mins} min</span>
            </div>

            <div
              className="flex items-center gap-2 rounded-xl border px-2.5 py-2"
              style={{
                backgroundColor: "var(--color-surface-2)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "rgba(45,212,191,0.08)",
                  color: "var(--color-success)",
                }}
              >
                <BookOpen size={14} />
              </span>
              <span className="text-sm font-medium">{exam.total_marks} pts</span>
            </div>
          </div>

          {exam.profiles?.full_name && (
            <div className="flex items-center gap-2 rounded-xl border px-2.5 py-2" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface-2)" }}>
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "rgba(148,163,184,0.08)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-muted)",
                }}
              >
                <User size={14} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--color-text-muted)" }}>
                  Instructor
                </div>
                <div className="truncate text-sm font-medium" style={{ color: "var(--color-text)" }}>
                  {exam.profiles.full_name}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t px-5 pb-5 pt-4" style={{ borderColor: "var(--color-border)" }}>
        <Button
          variant={isCompleted ? "success" : isViolated ? "danger" : "primary"}
          onClick={handleAction}
          aria-label={actionLabel}
          className="w-full justify-center rounded-xl px-4 py-3 text-sm font-semibold shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.18)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
        >
          <span className="inline-flex items-center gap-2">
            {isCompleted ? (
              <>
                <CheckCircle2 size={17} />
                View Results
              </>
            ) : isViolated ? (
              <>
                <AlertTriangle size={17} />
                View Results
              </>
            ) : (
              <>
                <PlayCircle size={17} />
                Start Exam
              </>
            )}
          </span>
        </Button>
      </div>
    </article>
  );
}

export default ExamCard;
