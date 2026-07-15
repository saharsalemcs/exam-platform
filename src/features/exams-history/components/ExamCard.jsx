import Tag from "@/components/shared/Tag";
import { formatTime } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  DIFFICULTY_COLOR,
  getPercentage,
  isPassed,
  formatSubmittedAt,
} from "../hooks/examHistoryHelpers";

function DetailRow({ label, value, isLast = false }) {
  return (
    <div
      className="flex items-center justify-between py-2.5"
      style={{
        borderBottom: isLast ? "none" : "1px solid var(--color-border)",
      }}
    >
      <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </span>
      <span
        className="text-sm font-medium"
        style={{ color: "var(--color-text)" }}
      >
        {value}
      </span>
    </div>
  );
}

function ExamCard({ attempt }) {
  const exam = attempt.exams;
  const percentage = getPercentage(attempt.score, attempt.total_marks);
  const passed = isPassed(attempt.score, exam?.pass_marks);
  const difficultyColor = DIFFICULTY_COLOR[exam?.difficulty] ?? "accent";

  return (
    <div
      className="rounded-md px-lg"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <DetailRow label="Exam title" value={exam?.title ?? "—"} />
      <DetailRow
        label="Instructor"
        value={exam?.instructor?.full_name ?? "—"}
      />
      <DetailRow
        label="Difficulty"
        value={
          exam?.difficulty && (
            <Tag
              label={exam.difficulty.toUpperCase()}
              color={difficultyColor}
              className="border-none"
            />
          )
        }
      />
      <DetailRow label="Score" value={`${percentage}%`} />
      <DetailRow
        label="Status"
        value={
          <span
            className={`${
              passed ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"
            } rounded-full px-2.5 py-1 uppercase transition-all`}
          >
            {passed ? "PASSED" : "FAILED"}
          </span>
        }
      />
      <DetailRow label="Time" value={formatTime(attempt.time_taken ?? 0)} />
      <DetailRow
        label="Submitted At"
        value={formatSubmittedAt(attempt.submitted_at)}
      />
      <DetailRow
        isLast
        label="Actions"
        value={
          <Link
            to={`/student/results/${attempt.id}`}
            className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold tracking-wide text-primary"
          >
            REVIEW
          </Link>
        }
      />
    </div>
  );
}

export default ExamCard;
