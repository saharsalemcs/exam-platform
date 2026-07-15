function QuestionMap({ session }) {
  const { questions, currentIndex, answers, bookmarks, goToQuestion } = session;

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(bookmarks).filter(Boolean).length;

  return (
    <div
      className="flex flex-col gap-md rounded-lg p-lg"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h3
        className="font-mono text-base font-semibold tracking-tight"
        style={{ color: "var(--color-text)" }}
      >
        Question Map
      </h3>

      <div className="grid grid-cols-4 gap-sm">
        {questions.map((q, i) => {
          const isAnswered = answers[q.id] != null;
          const isFlagged = !!bookmarks[q.id];
          const isCurrent = i === currentIndex;

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => goToQuestion(i)}
              aria-current={isCurrent}
              aria-label={`Question ${i + 1}${isAnswered ? ", answered" : ""}${isFlagged ? ", flagged" : ""}`}
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] text-sm font-semibold transition-all duration-150 outline-none"
              style={{
                backgroundColor: isAnswered
                  ? "var(--color-success)"
                  : "var(--color-surface-2)",
                color: isAnswered
                  ? "var(--color-bg)"
                  : "var(--color-text-muted)",
                border: isAnswered
                  ? "1px solid var(--color-border)"
                  : isCurrent
                    ? "2px solid var(--color-primary)"
                    : "1px solid var(--color-border)",
                boxShadow: isAnswered
                  ? "0 0 0 3px rgba(45,212,191,0.1)"
                  : isCurrent
                    ? "var(--shadow-glow)"
                    : "none",
              }}
            >
              {i + 1}
              {isFlagged && (
                <span
                  className="absolute -top-1 -left-1 h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-warning)",
                    border: "1.5px solid var(--color-surface)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div
        className="flex flex-col gap-1.5 border-t pt-3 text-sm"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text-muted)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--color-success)" }}
          />
          Answered ({answeredCount})
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--color-warning)" }}
          />
          Flagged ({flaggedCount})
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
            }}
          />
          Unanswered ({questions.length - answeredCount})
        </div>
      </div>
    </div>
  );
}

export default QuestionMap;
