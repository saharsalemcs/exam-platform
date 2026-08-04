import { useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useExamSession } from "../hooks/useExamSession";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import QuestionCard from "../components/QuestionCard";
import ExamHeader from "../components/ExamHeader";
import { useExamDetails } from "@/features/exams/hooks/useExamDetails";
import Navigation from "../components/Navigation";
import { useEffect } from "react";
import ExamSidebar from "../components/ExamSidebar";
import TimesUpModal from "../components/TimesUpModal";

function ExamSessionPage() {
  const { examId } = useParams();
  const { exam, isLoading, error } = useExamDetails(examId);

  const session = useExamSession(exam);

  useEffect(() => {
    if (exam && session.status === "idle") {
      session.startSession();
    }
  }, [exam, session.status, session.startSession]);

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

  return (
    <div className="bg-bg">
      <div className="mx-auto min-h-screen max-w-165 px-6 py-10 font-sans">
        <ExamHeader session={session} />
        <div className="grid grid-cols-1 items-start gap-md sm:grid-cols-[1fr_220px]">
          <QuestionCard session={session} />
          <ExamSidebar session={session} />
        </div>
        <Navigation session={session} />

        <TimesUpModal
          isOpen={session.showTimesUp}
          isPending={session.status === "submitting"}
          onConfirm={() => session.handleSubmit("timed_out")}
        />
      </div>
    </div>
  );
}

export default ExamSessionPage;
