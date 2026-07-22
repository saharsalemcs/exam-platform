import { AlertTriangle, BookOpen } from "lucide-react";
import { useExamWizardContext } from "../hooks/useExamWizardContext";
import { usePublishExam } from "../hooks/usePublishExam";
import { useUpdateExam } from "../hooks/useUpdateExam";
import QuestionPreviewCard from "./QuestionPreviewCard";
import Button from "@/components/shared/Button";
import InfoBox from "./InfoBox";
import { formatDateTime } from "@/utils/formatDateForInput";

function ReviewStep({ onEditQuestions }) {
  const { examDetails, questions, isEditMode } = useExamWizardContext();

  const {
    mutate: publishExam,
    isPending: isPublishing,
    error: publishError,
  } = usePublishExam();

  const {
    mutate: updateExam,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateExam();

  const isPending = isEditMode ? isUpdating : isPublishing;
  const error = isEditMode ? updateError : publishError;

  const totalPoints = questions.reduce(
    (sum, q) => sum + (Number(q.marks) || 0),
    0,
  );

  function handleConfirm() {
    if (isEditMode) {
      updateExam({ examId: examDetails.id, examDetails, questions });
    } else {
      publishExam({ examDetails, questions });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Exam summary */}
      <div className="flex items-center gap-4 rounded-md border border-border bg-surface p-lg">
        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-surface-2">
          <BookOpen size={26} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-text">{examDetails.title}</h2>
          <p className="text-sm text-text-muted">{examDetails.category}</p>
        </div>
      </div>

      {/* Info boxes */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <InfoBox
          label="Start Time"
          value={formatDateTime(examDetails.starts_at)}
        />
        <InfoBox label="End Time" value={formatDateTime(examDetails.ends_at)} />
        <InfoBox label="Duration" value={`${examDetails.duration_mins} mins`} />
        <InfoBox label="Questions" value={questions.length} />
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">
          <AlertTriangle size={16} />
          {error.message}
        </div>
      )}

      {/* Questions list — read-only، من غير Edit/Delete هنا */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-text">
          Questions Added ({questions.length})
        </h3>
        <span className="text-sm text-text-muted">
          Total: {totalPoints} points
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {questions.map((q, i) => (
          <QuestionPreviewCard key={q.id} question={q} index={i} readOnly />
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          variation="secondary"
          size="md"
          onClick={onEditQuestions}
          disabled={isPending}
        >
          ← Edit Questions
        </Button>
        <Button
          variation="primary"
          size="md"
          onClick={handleConfirm}
          disabled={isPending}
        >
          {isPending ? "Publishing…" : "✓ Confirm & Publish"}
        </Button>
      </div>
    </div>
  );
}

export default ReviewStep;
