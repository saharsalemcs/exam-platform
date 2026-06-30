import ExamStatusBadge from "@/components/shared/ExamStatusBadge";
import { BookOpen, Clock, Tag, User } from "lucide-react";

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
 * attemptInfo -> 'in-progress' | 'submitted' | 'timed-out
 */
function ExamCard({ exam, index = 0, attemptInfo }) {
  const difficulty = DIFFICULTY[exam.difficulty] ?? DIFFICULTY.medium;
  const isCompleted =
    attemptInfo?.status === "submitted" || attemptInfo?.status === "timed-out";
  const isInProgress = attemptInfo?.status === "in_progress";

  return (
    <article
      className="flex animate-[fade-up_0.4s_ease_both] flex-col overflow-hidden rounded-[var(--radius-md)] transition-all duration-200"
      style={{
        border: isCompleted
          ? "1px solid rgba(45,212,191,0.2)"
          : "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Badges - Top row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category BAdge */}
          {exam.category && (
            <span
              className="flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium"
              style={{
                backgroundColor: "var(--color-primary-glow)",
                border: "1px solid rgba(212,175,88,0.15)",
                color: "var(--color-primary)",
              }}
            >
              <Tag size={9} />
              {exam.category}
            </span>
          )}

          {/* Difficulty BAdge */}
          <span
            className="rounded-full px-2 py-0.5 text-[11px] font-medium"
            style={{
              backgroundColor: difficulty.bg,
              border: `1px solid ${difficulty.border}`,
              color: difficulty.color,
            }}
          >
            {difficulty.label}
          </span>

          {/* Completed badge */}
          {isCompleted && <ExamStatusBadge status="completed" />}
          {/* In-Progress badge */}
          {isInProgress && <ExamStatusBadge status="in-progress" />}
        </div>

        {/* Title + description */}
        <div className="flex-1">
          <h3
            className="text-medium mb-2 line-clamp-2 leading-snug font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {exam.title}
          </h3>
          {exam.description && (
            <p
              className="line-clamp-3 text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {exam.description}
            </p>
          )}
        </div>

        {/* Meta row */}
        <div
          className="flex flex-col gap-2.5"
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "12px",
          }}
        >
          {/* Duration + marks */}
          <div className="flex items-center gap-4">
            <span
              className="flex items-center gap-1 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              <Clock size={14} />
              {exam.duration_mins} min
            </span>
            <span
              className="flex items-center gap-1 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              <BookOpen size={14} />
              {exam.total_marks}
            </span>
          </div>

          {/* Instructor */}
          {exam.profiles?.full_name && (
            <div className="flex items-center gap-1.5">
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-muted)",
                }}
              >
                <User size={14} />
              </div>
              <span
                className="truncate text-sm"
                style={{ color: "var(--color-text-muted)", fontWeight: 500 }}
              >
                Instructor:{" "}
                <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
                  {exam.profiles.full_name}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ExamCard;
