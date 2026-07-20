import Tag from "@/components/shared/Tag";
import { formatTime } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  DIFFICULTY_COLOR,
  getPercentage,
  isPassed,
  formatSubmittedAt,
} from "../hooks/examHistoryHelpers";

export const studentHistoryColumns = [
  {
    key: "title",
    label: "Exam Title",
    render: (attempt) => (
      <span className="font-medium" style={{ color: "var(--color-text)" }}>
        {attempt.exams?.title ?? "—"}
      </span>
    ),
  },
  {
    key: "instructor",
    label: "Instructor",
    render: (attempt) => (
      <span style={{ color: "var(--color-text-muted)" }}>
        {attempt.exams?.instructor?.full_name ?? "—"}
      </span>
    ),
  },
  {
    key: "difficulty",
    label: "Difficulty",
    render: (attempt) => {
      const difficulty = attempt.exams?.difficulty;
      if (!difficulty) return null;
      return (
        <Tag
          label={difficulty.toUpperCase()}
          color={DIFFICULTY_COLOR[difficulty] ?? "accent"}
          className="border-none"
        />
      );
    },
  },
  {
    key: "score",
    label: "Score",
    render: (attempt) => (
      <span className="font-medium" style={{ color: "var(--color-text)" }}>
        {getPercentage(attempt.score, attempt.total_marks)}%
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (attempt) => {
      const passed = isPassed(attempt.score, attempt.exams?.pass_marks);
      return (
        <span
          className={`${passed ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"} rounded-full px-2.5 py-1 uppercase transition-all`}
        >
          {passed ? "PASSED" : "FAILED"}
        </span>
      );
    },
  },
  {
    key: "time",
    label: "Time",
    render: (attempt) => (
      <span className="font-mono" style={{ color: "var(--color-text-muted)" }}>
        {formatTime(attempt.time_taken ?? 0)}
      </span>
    ),
  },
  {
    key: "submittedAt",
    label: "Submitted At",
    render: (attempt) => (
      <span style={{ color: "var(--color-text-muted)" }}>
        {formatSubmittedAt(attempt.submitted_at)}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (attempt) => (
      <Link
        to={`/student/results/${attempt.id}`}
        className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold tracking-wide text-primary"
      >
        REVIEW
      </Link>
    ),
  },
];
