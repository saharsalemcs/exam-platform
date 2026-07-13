import Button from "@/components/shared/Button";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";

function Navigation({ session }) {
  const {
    currentIndex,
    questions,
    goNext,
    goPrev,
    isSubmitting,
    handleSubmit,
  } = session;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="mt-6 flex items-center justify-between">
      <Button variant="ghost" onClick={goPrev} disabled={currentIndex === 0}>
        <ChevronLeft size={16} /> Previous
      </Button>

      {isLastQuestion ? (
        <Button
          variant="primary"
          onClick={() => handleSubmit("submitted")}
          disabled={isSubmitting}
        >
          <Flag size={16} /> {isSubmitting ? "Submitting..." : "Submit Exam"}
        </Button>
      ) : (
        <Button variant="primary" onClick={goNext}>
          Next <ChevronRight size={16} />
        </Button>
      )}
    </div>
  );
}

export default Navigation;
