import { Link } from "react-router-dom";
import { formatTime } from "@/lib/utils";

const REASON_COLOR = {
  MANUAL: "bg-accent/10 text-accent",
  TIME_UP: "bg-warning/10 text-warning",
  CHEAT: "bg-danger/10 text-danger",
};

function formatSubmittedAt(isoString) {
  const date = new Date(isoString);
  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart}, ${timePart}`;
}

export const recentExamsColumns = [
  {
    key: "title",
    label: "Exam Title",
    render: (exam) => (
      <span className="font-medium" style={{ color: "var(--color-text)" }}>
        {exam.examTitle}
      </span>
    ),
  },
  {
    key: "instructor",
    label: "Instructor",
    render: (exam) => (
      <span style={{ color: "var(--color-text-muted)" }}>
        {exam.instructorName}
      </span>
    ),
  },
  {
    key: "score",
    label: "Score",
    render: (exam) => (
      <span className="font-medium" style={{ color: "var(--color-text)" }}>
        {exam.percentage}%
      </span>
    ),
  },
  {
    key: "reason",
    label: "Reason",
    render: (exam) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-bold ${REASON_COLOR[exam.reason] ?? "text-muted bg-border/20"}`}
      >
        {exam.reason}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (exam) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-bold ${exam.passed ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"}`}
      >
        {exam.passed ? "PASSED" : "FAILED"}
      </span>
    ),
  },
  {
    key: "time",
    label: "Time",
    render: (exam) => (
      <span className="font-mono" style={{ color: "var(--color-text-muted)" }}>
        {formatTime(exam.timeTaken)}
      </span>
    ),
  },
  {
    key: "submittedAt",
    label: "Submitted At",
    render: (exam) => (
      <span style={{ color: "var(--color-text-muted)" }}>
        {formatSubmittedAt(exam.submittedAt)}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (exam) => (
      <Link
        to={`/student/results/${exam.id}`}
        className="text-sm font-bold tracking-wide text-primary"
      >
        REVIEW
      </Link>
    ),
  },
];
