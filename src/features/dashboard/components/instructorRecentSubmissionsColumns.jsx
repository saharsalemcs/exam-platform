import { Link } from "react-router-dom";

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

export const instructorRecentSubmissionsColumns = [
  {
    key: "examTitle",
    label: "Exam Title",
    render: (row) => (
      <span className="font-medium text-text">{row.examTitle}</span>
    ),
  },
  {
    key: "student",
    label: "Student",
    render: (row) => <span className="text-text-muted">{row.studentName}</span>,
  },
  {
    key: "score",
    label: "Score",
    render: (row) => (
      <span className="font-medium text-text">{row.percentage}%</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${
          row.passed ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"
        }`}
      >
        {row.passed ? "Passed" : "Failed"}
      </span>
    ),
  },
  {
    key: "reason",
    label: "Reason",
    render: (row) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${REASON_COLOR[row.reason] ?? ""}`}
      >
        {row.reason}
      </span>
    ),
  },
  {
    key: "submittedAt",
    label: "Submitted At",
    render: (row) => (
      <span className="text-text-muted">
        {formatSubmittedAt(row.submittedAt)}
      </span>
    ),
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
