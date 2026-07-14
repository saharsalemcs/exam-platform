import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { useState } from "react";
import Button from "@/components/shared/Button";
import SubmitConfirmModal from "./SubmitConfirmModal";

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
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <div className="mt-6 flex items-center justify-between">
      <Button variant="ghost" onClick={goPrev} disabled={currentIndex === 0}>
        <ChevronLeft size={16} /> Previous
      </Button>

      {isLastQuestion ? (
        <Button
          variant="primary"
          onClick={() => setIsSubmitModalOpen(true)}
          disabled={isSubmitting}
        >
          <Flag size={16} /> {isSubmitting ? "Submitting..." : "Submit Exam"}
        </Button>
      ) : (
        <Button variant="primary" onClick={goNext}>
          Next <ChevronRight size={16} />
        </Button>
      )}

      <SubmitConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={() => {
          setIsSubmitModalOpen(false);
          handleSubmit("submitted");
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default Navigation;
