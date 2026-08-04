import Button from "@/components/shared/Button";
import ExamStatusBadge from "@/components/shared/ExamStatusBadge";
import {
  AlertTriangle,
  Award,
  Book,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  LayoutGrid,
  PlayCircle,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getEffectiveStatus } from "../helpers/getEffectiveStatus";
import { formatDateTime } from "@/utils/formatDateForInput";

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

const STATUS_BADGE = {
  active: {
    label: "Active",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.25)",
    color: "#60a5fa",
  },
  draft: {
    label: "Draft",
    bg: "rgba(237,216,138,0.1)",
    border: "rgba(237,216,138,0.25)",
    color: "var(--color-warning)",
  },
  closed: {
    label: "Closed",
    bg: "rgba(200,93,106,0.1)",
    border: "rgba(200,93,106,0.25)",
    color: "var(--color-danger)",
  },
};

function ExamCard({ exam, index = 0, attemptInfo }) {
  const navigate = useNavigate();

  const difficulty = DIFFICULTY[exam.difficulty] ?? DIFFICULTY.medium;
  const effectiveStatus = getEffectiveStatus(exam);
  const statusBadge = STATUS_BADGE[effectiveStatus];

  const isCompleted =
    attemptInfo?.status === "submitted" || attemptInfo?.status === "timed_out";
  const isViolated = attemptInfo?.status === "violated";
  const isBlocked = !isCompleted && !isViolated && effectiveStatus !== "active";

  function handleAction(e) {
    e.preventDefault();
    if (isCompleted || isViolated)
      navigate(`/student/results/${attemptInfo.attemptId}`);
    else if (!isBlocked) navigate(`/student/exams/${exam.id}`);
  }

  const cardBorderColor = isViolated
    ? "rgba(200,93,106,0.3)"
    : isCompleted
      ? "rgba(45,212,191,0.2)"
      : "var(--color-border)";

  return (
    <article
      className="flex animate-[fade-up_0.4s_ease_both] flex-col gap-4 overflow-hidden rounded-md transition-all duration-200"
      style={{
        border: isCompleted
          ? `1px solid ${cardBorderColor}`
          : "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        animationDelay: `${index * 60}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = isViolated
          ? "0 0 20px rgba(200,93,106,0.12)"
          : isCompleted
            ? "0 0 20px rgba(45,212,191,0.1)"
            : "var(--shadow-glow)";
        e.currentTarget.style.borderColor = isViolated
          ? "rgba(200,93,106,0.45)"
          : isCompleted
            ? "rgba(45,212,191,0.35)"
            : "rgba(212,175,88,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = cardBorderColor;
      }}
    >
      {/* Card body */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center justify-between">
          <div className="rounded-[8px] bg-surface p-2.5 text-xl text-text-muted">
            <Book />
          </div>
          <div className="flex gap-2">
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

            {statusBadge && (
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: statusBadge.bg,
                  border: `1px solid ${statusBadge.border}`,
                  color: statusBadge.color,
                }}
              >
                {statusBadge.label}
              </span>
            )}

            {isCompleted && <ExamStatusBadge status="completed" />}
            {isViolated && <ExamStatusBadge status="violated" />}
          </div>
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="mb-2 line-clamp-2 text-xl leading-snug font-semibold text-primary">
            {exam.title}
          </h3>
          {exam.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">
              {exam.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-text-muted">
          {exam.category && (
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} />
              {exam.category}
            </span>
          )}
          {exam.profiles?.full_name && (
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {exam.profiles.full_name}
            </span>
          )}
        </div>

        {/* Grade + Department */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
          {exam.grade && (
            <span className="flex items-center gap-1.5">
              <GraduationCap size={14} />
              {exam.grade}
            </span>
          )}
          {exam.department && (
            <span className="flex items-center gap-1.5">
              <LayoutGrid size={14} />
              {exam.department}
            </span>
          )}
        </div>

        {/* Starts / Ends box */}
        <div className="flex flex-col gap-2 rounded-md bg-surface-2 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              Starts
            </span>
            <span style={{ color: "var(--color-text)", fontWeight: 600 }}>
              {formatDateTime(exam.starts_at)}
            </span>
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              Ends
            </span>
            <span style={{ color: "var(--color-text)", fontWeight: 600 }}>
              {formatDateTime(exam.ends_at)}
            </span>
          </div>
        </div>

        {/* Duration + Marks */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 text-text-muted">
            <Clock size={14} />
            {exam.duration_mins} min
          </span>
          <span className="flex items-center gap-1 text-text-muted">
            <Award size={14} />
            {exam.total_marks} marks
          </span>
        </div>
      </div>

      {/* Action button */}
      <div className="px-5 pb-5">
        <Button
          variant={isCompleted ? "success" : isViolated ? "danger" : "primary"}
          onClick={handleAction}
          disabled={isBlocked}
          className="flex w-full"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 size={17} /> View Results
            </>
          ) : isViolated ? (
            <>
              <AlertTriangle size={17} /> View Results
            </>
          ) : isBlocked ? (
            <>{effectiveStatus === "draft" ? "Draft" : "Closed"}</>
          ) : (
            <>
              <PlayCircle size={17} /> Start Exam
            </>
          )}
        </Button>
      </div>
    </article>
  );
}

export default ExamCard;
