import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import Button from "@/components/shared/Button";

/**
 * Footer row of the question card. On the last question "Next" becomes
 * "Submit Exam", opening the same confirm modal as the header button.
 */
function Navigation({ session }) {
  const { currentIndex, questions, goNext, goPrev, setShowConfirm, status } =
    session;

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border p-6">
      <Button
        variant="secondary"
        onClick={goPrev}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={16} /> Previous
      </Button>

      <span className="font-mono text-xs text-text-muted">
        {currentIndex + 1} / {questions.length}
      </span>

      {isLastQuestion ? (
        <Button
          onClick={() => setShowConfirm(true)}
          disabled={status === "submitting"}
        >
          <Flag size={16} /> Submit Exam
        </Button>
      ) : (
        <Button onClick={goNext}>
          Next <ChevronRight size={16} />
        </Button>
      )}
    </div>
  );
}

export default Navigation;
