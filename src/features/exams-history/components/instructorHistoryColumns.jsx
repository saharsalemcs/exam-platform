import { Link } from "react-router-dom";
import Tag from "@/components/shared/Tag";
import { DIFFICULTY_COLOR, isPassed } from "../hooks/examHistoryHelpers";

const REASON_COLOR = {
  MANUAL: "bg-accent/10 text-accent",
  TIME_UP: "bg-warning/10 text-warning",
  CHEAT: "bg-danger/10 text-danger",
};

const REASON_MAP = {
  submitted: "MANUAL",
  timed_out: "TIME_UP",
  violated: "CHEAT",
};

export const instructorHistoryColumns = [
  {
    key: "examTitle",
    label: "Exam Title",
    render: (row) => (
      <span className="text-text">{row.exams?.title ?? "—"}</span>
    ),
  },
  {
    key: "student",
    label: "Student",
    render: (row) => (
      <span className="font-medium text-text">
        {row.student?.full_name ?? "—"}
      </span>
    ),
  },
  {
    key: "subject",
    label: "Subject",
    render: (row) => (
      <span className="text-text-muted">{row.exams?.category ?? "—"}</span>
    ),
  },
  {
    key: "difficulty",
    label: "Difficulty",
    render: (row) => {
      const difficulty = row.exams?.difficulty;
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
    key: "department",
    label: "Department",
    render: (row) => (
      <span className="text-text">{row.exams?.department ?? "—"}</span>
    ),
  },
  {
    key: "grade",
    label: "Grade",
    render: (row) => (
      <span className="text-text">{row.exams?.grade ?? "—"}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => {
      const passed = isPassed(row.score, row.exams?.pass_marks);
      return (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${
            passed ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"
          }`}
        >
          {passed ? "Passed" : "Failed"}
        </span>
      );
    },
  },
  {
    key: "reason",
    label: "Reason",
    render: (row) => {
      const reason = REASON_MAP[row.status] ?? row.status;
      return (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${REASON_COLOR[reason] ?? ""}`}
        >
          {reason}
        </span>
      );
    },
  },
  {
    key: "actions",
    label: "Actions",
    render: (row) => (
      <Link
        to={`/instructor/results/${row.id}`}
        className="text-sm font-bold tracking-wide text-primary"
      >
        REVIEW
      </Link>
    ),
  },
];
