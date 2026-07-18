import CircularProgress from "@/components/shared/CircularProgress";
import { formatTime } from "@/lib/utils";
import StatItem from "./StatItem";

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
function getSubmitReasonConfig(reason) {
  switch (reason) {
    case "cheat":
      return {
        label: "Cheating Detected",
        color: "bg-danger/15 text-danger border-danger/30",
      };
    case "timed_out":
      return {
        label: "Time's Up",
        color: "bg-warning/15 text-warning border-warning/30",
      };
    case "auto":
    default:
      return {
        label: "Submitted",
        color: "bg-accent/10 text-accent border-accent/30",
      };
  }
}

function ResultsSummaryCard({ result }) {
  const {
    score,
    totalMarks,
    percentage,
    passed,
    correctCount,
    wrongCount,
    skippedCount,
    timeTaken,
    getSubmitReason,
  } = result;

  const submitReason = getSubmitReason();
  const reasonConfig = getSubmitReasonConfig(submitReason);

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-surface shadow-md"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="flex flex-col items-center gap-6 px-8 py-10">
        {/* Badged */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${
              passed
                ? "border-accent/30 bg-accent/10 text-accent"
                : "border-danger/30 bg-danger/10 text-danger"
            }`}
          >
            {passed ? "✓ Passed" : "✕ Failed"}
          </span>

          <span className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1.5 text-sm font-semibold text-warning">
            <span className="font-bold">
              {score} / {totalMarks}
            </span>{" "}
            marks
          </span>

          <span
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${reasonConfig.color}`}
          >
            {reasonConfig.label}
          </span>
        </div>

        {/* Score ring */}
        <CircularProgress percentage={percentage} />

        {/* Message */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p
            className="text-lg font-bold"
            style={{ color: "var(--color-text)" }}
          >
            {passed ? "🎉 Great job!" : "📚 Keep studying!"}
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {passed ? "You passed this exam" : "You can do better next time"}
          </p>
        </div>

        <div
          className="w-full"
          style={{ borderTop: "1px solid var(--color-border)" }}
        />

        {/* Stats row */}
        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-center sm:gap-0 sm:divide-x sm:divide-border">
          <StatItem
            label="Correct"
            value={correctCount}
            colorClass="text-accent"
          />
          <StatItem label="Wrong" value={wrongCount} colorClass="text-danger" />
          <StatItem
            label="Skipped"
            value={skippedCount}
            style={{ color: "var(--color-text)" }}
          />
          <StatItem
            label="Time Taken"
            value={formatTime(timeTaken)}
            colorClass="text-warning"
          />
        </div>
      </div>
    </div>
  );
}

export default ResultsSummaryCard;
export { formatSubmittedAt };
