import { useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useUser } from "@/features/auth/hooks/useUser";
import { useStudentResult } from "../hooks/useStudentResult";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import ResultsSummaryCard, {
  formatSubmittedAt,
} from "../components/ResultsSummaryCard";
import AnswerReviewSection from "../components/AnswerReviewSection";

function StudentResultPage() {
  const { attemptId } = useParams();
  const { data: userData } = useUser();
  const studentId = userData?.profile?.id;

  const { result, isFetchingResult, resultError } = useStudentResult({
    attemptId,
    studentId,
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
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Results & Analytics
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {result.exam.title} · {result.exam.instructorName} ·{" "}
          {formatSubmittedAt(result.submittedAt)}
        </p>
      </div>

      <ResultsSummaryCard result={result} />

      <AnswerReviewSection questions={result.questions} />
    </div>
  );
}

export default StudentResultPage;
