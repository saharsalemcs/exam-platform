import Button from "@/components/shared/Button";
import { Bookmark } from "lucide-react";
import { useExamSession } from "../hooks/useExamSession";

function QuestionCard({ exam }) {
  const {
    questions,
    currentQuestion,
    currentIndex,
    bookmarks,
    answers,
    toggleBookmark,
    selectAnswer,
  } = useExamSession(exam);

  return (
    <div
      className="rounded-lg p-6 shadow-md"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <p
          className="mb-md font-mono text-[12px] font-bold tracking-[0.08em] uppercase"
          style={{ color: "var(--color-primary)" }}
        >
          Question {currentIndex + 1} of {questions?.length}
        </p>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleBookmark(currentQuestion?.id)}
          className={`hover:bg-transparent hover:text-[var(--color-warning)] ${bookmarks[currentQuestion?.id] ? " text-[var(--color-warning)]" : ""} `}
        >
          <Bookmark size={16} />
          {bookmarks[currentQuestion?.id] ? "Bookmarked" : "Bookmark"}
        </Button>
      </div>

      <p
        className="mb-6 text-lg font-medium"
        style={{ color: "var(--color-text)" }}
      >
        {currentQuestion.body}
      </p>

      <span className="mb-md inline-block rounded-full border border-warning/20 bg-warning/10 px-sm py-xs font-mono text-[11px] text-warning">
        {currentQuestion.marks} pts
      </span>

      <div className="flex flex-col gap-3">
        {currentQuestion.options.map((option, i) => {
          const isSelected = answers[currentQuestion?.id] === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => selectAnswer(currentQuestion.id, option.id)}
              className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] p-4 text-left transition-colors"
              style={{
                backgroundColor: isSelected
                  ? "var(--color-primary-glow)"
                  : "var(--color-surface-2)",
                border: isSelected
                  ? "1px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm font-mono text-[12px] font-bold transition-all duration-150 ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-border text-text-muted group-hover:bg-primary/20 group-hover:text-primary"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
