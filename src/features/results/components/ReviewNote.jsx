function ReviewNote({
  status,
  correctLetter,
  correctText,
  selectedLetter,
  selectedText,
}) {
  if (status === "correct") {
    return (
      <p
        className="rounded-lg border border-border px-3 py-2 text-center text-sm text-accent"
        style={{ backgroundColor: "rgba(59,130,246,0.06)" }}
      >
        Correct! Well done.
      </p>
    );
  }

  if (status === "skipped") {
    return (
      <p
        className="rounded-lg border border-border px-3 py-2 text-center text-sm"
        style={{
          backgroundColor: "var(--color-surface-2)",
          color: "var(--color-text-muted)",
        }}
      >
        You skipped this question — correct answer was{" "}
        <span className="font-bold text-accent">
          {correctLetter}. {correctText}
        </span>
      </p>
    );
  }

  // wrong
  return (
    <p
      className="rounded-lg border border-border px-3 py-2 text-center text-sm"
      style={{
        backgroundColor: "var(--color-surface-2)",
        color: "var(--color-text-muted)",
      }}
    >
      You answered{" "}
      <span className="font-semibold text-danger">
        {selectedLetter}. {selectedText}
      </span>{" "}
      — correct answer was{" "}
      <span className="font-semibold text-accent">
        {correctLetter}. {correctText}
      </span>
    </p>
  );
}

export default ReviewNote;
