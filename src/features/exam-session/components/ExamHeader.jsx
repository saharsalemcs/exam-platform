import { Flag } from "lucide-react";
import Button from "@/components/shared/Button";
import Tag from "@/components/shared/Tag";
import CountdownTimer from "./CountdownTimer";
import SubmitConfirmModal from "./SubmitConfirmModal";

/**
 * Sticky exam bar: title + badges on the left, timer and submit on the right.
 * Submit stays reachable from any question instead of only the last one.
 */
function ExamHeader({ session }) {
  const {
    exam,
    questions,
    timeLeft,
    status,
    showConfirm,
    setShowConfirm,
    handleSubmit,
  } = session;

  const isSubmitting = status === "submitting";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6">
        {/* Exam identity */}
        <div className="flex min-w-0 items-center gap-3 lg:gap-4">
          <div className="flex min-w-0 flex-col">
            <h1 className="truncate text-base font-bold tracking-tight text-text sm:text-lg">
              {exam?.title}
            </h1>
            <p className="truncate text-xs text-text-muted sm:text-sm">
              {questions?.length} Questions&nbsp;·&nbsp;{exam?.duration_mins}{" "}
              min
            </p>
          </div>

          <div className="hidden shrink-0 flex-wrap items-center gap-2 lg:flex">
            <Tag label={exam.category} color="primary" />
            <Tag label={`${exam.total_marks} Marks`} color="warning" />
            <Tag
              label={
                exam.difficulty.charAt(0).toUpperCase() +
                exam.difficulty.slice(1)
              }
              color="accent"
            />
          </div>
        </div>

        {/* Timer + submit */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <CountdownTimer timeLeft={timeLeft} />

          <Button onClick={() => setShowConfirm(true)} disabled={isSubmitting}>
            <Flag size={16} />
            <span className="hidden sm:inline">Submit Exam</span>
            <span className="sm:hidden">Submit</span>
          </Button>
        </div>
      </div>

      <SubmitConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleSubmit("submitted")}
        isPending={isSubmitting}
      />
    </header>
  );
}

export default ExamHeader;
