import OptionButton from "./OptionButton";
import ReviewNote from "./ReviewNote";

function getOptionLetter(index) {
  return String.fromCharCode(65 + index);
}

const STATUS_BADGE = {
  correct: {
    label: "Correct",
    className: "bg-accent/15 text-accent border-accent/30",
  },
  wrong: {
    label: "Wrong",
    className: "bg-danger/15 text-danger border-danger/30",
  },
  skipped: {
    label: "Skipped",
    className: "bg-text-muted/15 text-text-muted border-border",
  },
};

function QuestionReviewCard({ question, index, showNote = true }) {
  const {
    body,
    options,
    marks,
    earnedMarks,
    correctOptionId,
    selectedOptionId,
    status,
  } = question;

  const correctIndex = options.findIndex((o) => o.id === correctOptionId);
  const selectedIndex = options.findIndex((o) => o.id === selectedOptionId);
  const badge = STATUS_BADGE[status];

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div
        className={`h-0.5 w-full ${
          status === "correct"
            ? "bg-accent"
            : status === "correct"
              ? "bg-border"
              : "bg-danger"
        }`}
      />
      <div className="flex flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{
                backgroundColor: "var(--color-surface-2)",
                color: "var(--color-text-muted)",
              }}
            >
              {index + 1}
            </span>
            <p className="font-bold" style={{ color: "var(--color-text)" }}>
              {body}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
              style={badge.style}
            >
              {badge.label}
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span
                className={`${earnedMarks > 0 ? "text-accent" : "text-danger"} font-semibold`}
              >
                {earnedMarks}
              </span>
              /{marks} pts
            </span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {options.map((option, i) => (
            <OptionButton
              key={option.id}
              option={option}
              letter={getOptionLetter(i)}
              isCorrect={option.id === correctOptionId}
              isSelected={option.id === selectedOptionId}
            />
          ))}
        </div>

        {/* Note */}
        {showNote && (
          <ReviewNote
            status={status}
            correctLetter={getOptionLetter(correctIndex)}
            correctText={options[correctIndex]?.text}
            selectedLetter={getOptionLetter(selectedIndex)}
            selectedText={options[selectedIndex]?.text}
          />
        )}
      </div>
    </div>
  );
}

export default QuestionReviewCard;
