import Button from "@/components/shared/Button";
import { Bookmark, BookmarkCheck } from "lucide-react";

function QuestionCard({ session }) {
  const {
    questions,
    currentQuestion,
    currentIndex,
    bookmarks,
    answers,
    toggleBookmark,
    selectAnswer,
  } = session;

  const isBookmarked = !!bookmarks[currentQuestion?.id];

  return (
    <>
      {/* Question meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-6">
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs font-bold tracking-[0.08em] text-primary uppercase">
            Question {currentIndex + 1} of {questions?.length}
          </p>

          <span className="rounded-full border border-warning/20 bg-warning/10 px-2.5 py-0.5 font-mono text-[11px] text-warning">
            {currentQuestion.marks} pts
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          aria-pressed={isBookmarked}
          onClick={() => toggleBookmark(currentQuestion?.id)}
          className={`hover:bg-transparent hover:text-warning ${
            isBookmarked ? "text-warning" : ""
          }`}
        >
          {isBookmarked ? (
            <>
              <BookmarkCheck size={16} />
              Bookmarked
            </>
          ) : (
            <>
              <Bookmark size={16} />
              Bookmark
            </>
          )}
        </Button>
      </div>

      {/* Question body + options */}
      <div className="flex flex-col gap-6 p-6">
        <p className="text-lg leading-relaxed font-medium text-text">
          {currentQuestion.body}
        </p>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, i) => {
            const isSelected = answers[currentQuestion?.id] === option.id;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => selectAnswer(currentQuestion.id, option.id)}
                className="group flex w-full cursor-pointer items-center gap-3 rounded-md p-4 text-left transition-colors duration-150"
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
                      ? "bg-primary text-bg"
                      : "bg-border text-text-muted group-hover:bg-primary/20 group-hover:text-primary"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>

                <span className="min-w-0 flex-1">{option.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
