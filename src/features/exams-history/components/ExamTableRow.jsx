import Tag from "@/components/shared/Tag";
import { formatTime } from "@/lib/utils";
import { Link } from "react-router-dom";

// Helpers
const DIFFICULTY_COLOR = {
  easy: "accent",
  medium: "warning",
  hard: "danger",
};

function getPercentage(score, totalMarks) {
  if (!totalMarks) return 0;
  return Math.round((score / totalMarks) * 100);
}

function isPassed(score, passMarks) {
  return score >= (passMarks ?? 0);
}

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

function ExamTableRow({ attempt }) {
  const exam = attempt.exams;
  const percentage = getPercentage(attempt.score, attempt.total_marks);
  const passed = isPassed(attempt.score, exam?.pass_marks);
  const difficultyColor = DIFFICULTY_COLOR[exam?.difficulty] ?? "accent";

  return (
    <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
      <td
        className="px-lg py-md font-medium whitespace-nowrap"
        style={{ color: "var(--color-text)" }}
      >
        {exam?.title ?? "—"}
      </td>

      <td
        className="px-lg py-md whitespace-nowrap"
        style={{ color: "var(--color-text-muted)" }}
      >
        {exam?.instructor?.full_name ?? "—"}
      </td>

      <td className="px-lg py-md whitespace-nowrap">
        {exam?.difficulty && (
          <Tag
            label={exam.difficulty.toUpperCase()}
            color={difficultyColor}
            className="border-none"
          />
        )}
      </td>

      <td
        className="px-lg py-md font-medium whitespace-nowrap"
        style={{ color: "var(--color-text)" }}
      >
        {percentage}%
      </td>

      <td className="px-lg py-md whitespace-nowrap">
        <span
          className={`${
            passed ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"
          } rounded-full px-2.5 py-1 uppercase transition-all`}
        >
          {passed ? "PASSED" : "FAILED"}
        </span>
      </td>

      <td
        className="px-lg py-md font-mono whitespace-nowrap"
        style={{ color: "var(--color-text-muted)" }}
      >
        {formatTime(attempt.time_taken ?? 0)}
      </td>

      <td
        className="px-lg py-md whitespace-nowrap"
        style={{ color: "var(--color-text-muted)" }}
      >
        {formatSubmittedAt(attempt.submitted_at)}
      </td>

      <td className="px-lg py-md whitespace-nowrap">
        <Link
          to={`/student/results/${attempt.id}`}
          className="rounded-full bg-primary/10 p-3 py-1.5 text-sm font-bold tracking-wide text-primary"
        >
          REVIEW
        </Link>
      </td>
    </tr>
  );
}

export default ExamTableRow;
