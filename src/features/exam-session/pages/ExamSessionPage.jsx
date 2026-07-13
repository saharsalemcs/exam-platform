import { useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useExamSession } from "../hooks/useExamSession";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import QuestionCard from "../components/QuestionCard";
import ExamHeader from "../components/ExamHeader";
import { useExamDetails } from "@/features/exams/hooks/useExamDetails";
import Navigation from "../components/Navigation";

function ExamSessionPage() {
  const { examId } = useParams();
  const { exam, isLoading, error } = useExamDetails(examId);

  const session = useExamSession(exam);

  if (isLoading) return <LoadingSpinner />;

  if (error || !exam) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Couldn't load this exam"
        description={error?.message ?? "Please try again."}
        variant="error"
        size="lg"
      />
    );
  }

  // const answeredCount = Object.keys(answers).length;

  return (
    <div
      className="flex min-h-screen flex-col font-sans"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="flex flex-1 flex-col justify-center px-6 py-10">
        <div className="mx-auto flex w-full max-w-165 flex-col">
          {/* Header */}
          <ExamHeader session={session} />

          {/* Current question */}
          <QuestionCard session={session} />

          {/* Navigation */}
          <Navigation session={session} />
        </div>
      </div>
    </div>
  );
}

export default ExamSessionPage;
