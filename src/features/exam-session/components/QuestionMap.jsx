function QuestionMap({ session }) {
  const { questions, currentIndex, answers, bookmarks, goToQuestion } = session;

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(bookmarks).filter(Boolean).length;

  const legend = [
    {
      label: "Answered",
      count: answeredCount,
      style: { backgroundColor: "var(--color-success)" },
    },
    {
      label: "Flagged",
      count: flaggedCount,
      style: { backgroundColor: "var(--color-warning)" },
    },
    {
      label: "Unanswered",
      count: questions.length - answeredCount,
      style: {
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-xs font-bold tracking-[0.08em] text-text uppercase">
          Question Map
        </h2>
        <span className="font-mono text-xs text-text-muted">
          {answeredCount}/{questions.length}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-5">
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
              className="relative flex h-10 w-full cursor-pointer items-center justify-center rounded-sm text-sm font-semibold transition-all duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              style={{
                backgroundColor: isAnswered
                  ? "var(--color-success)"
                  : "var(--color-surface-2)",
                color: isAnswered
                  ? "var(--color-bg)"
                  : "var(--color-text-muted)",
                border: isCurrent
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
                  className="absolute top-1 right-1 h-2 w-2 rounded-full"
                  style={{ backgroundColor: "var(--color-warning)" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <ul className="flex flex-col gap-2 border-t border-border pt-4 text-sm text-text-muted">
        {legend.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={item.style}
            />
            {item.label} ({item.count})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionMap;
