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
    <div className="flex min-h-screen flex-col bg-bg font-sans">
      <ExamHeader session={session} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Question area */}
          <section className="flex flex-col rounded-lg border border-border bg-surface lg:col-span-2">
            <QuestionCard session={session} />
            <Navigation session={session} />
          </section>

          {/* Question map */}
          <div className="lg:col-span-1">
            <ExamSidebar session={session} />
          </div>
        </div>
      </main>

      <TimesUpModal
        isOpen={session.showTimesUp}
        isPending={session.status === "submitting"}
        onConfirm={() => session.handleSubmit("timed_out")}
      />
    </div>
  );
}

export default ExamSessionPage;
