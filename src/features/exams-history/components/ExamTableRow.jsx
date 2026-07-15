import Tag from "@/components/shared/Tag";
import { formatTime } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  DIFFICULTY_COLOR,
  getPercentage,
  isPassed,
  formatSubmittedAt,
} from "../hooks/examHistoryHelpers";

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
