import { useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useUser } from "@/features/auth/hooks/useUser";
import { useInstructorResult } from "../hooks/useInstructorResult";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import ResultsSummaryCard from "../components/ResultsSummaryCard";
import AnswerReviewSection from "../components/AnswerReviewSection";
import { formatDateTime } from "@/utils/formatDateForInput";

function InstructorResultPage() {
  const { attemptId } = useParams();
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;

  const { result, isFetchingResult, resultError } = useInstructorResult({
    attemptId,
    instructorId,
  });

  if (isFetchingResult) return <LoadingSpinner />;

  if (resultError || !result) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Couldn't load this result"
        description={resultError?.message ?? "This attempt could not be found."}
        variant="error"
        size="lg"
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="font-bold tracking-wide text-primary uppercase">
          {result.studentName}'S
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-text">
          Results & Analytics
        </h1>
        <p className="text-sm text-text-muted">
          {result.exam.title} · {formatDateTime(result.submittedAt)}
        </p>
      </div>

      <ResultsSummaryCard result={result} />

      <AnswerReviewSection questions={result.questions} showNotes={false} />
    </div>
  );
}

export default InstructorResultPage;
