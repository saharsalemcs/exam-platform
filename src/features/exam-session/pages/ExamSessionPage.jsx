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
    <div
      className="mx-auto min-h-screen max-w-165 px-6 py-10 font-sans"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
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

    // <div
    //   className="flex min-h-screen flex-col font-sans"
    //   style={{ backgroundColor: "var(--color-bg)" }}
    // >
    //   {/* التايمر عائم في الزاوية، برا أي grid أو flex بيأثر على باقي العناصر */}
    //   <div className="fixed top-6 right-6 z-50">
    //     <CountdownTimer timeLeft={session.timeLeft} />
    //   </div>

    //   <div className="flex flex-1 flex-col justify-center px-6 py-10">
    //     <div className="mx-auto flex w-full max-w-165 flex-col">
    //       <ExamHeader exam={exam} session={session} />

    //       {/* الـ QuestionCard بقى ياخد العرض كله لوحده */}
    //       <QuestionCard session={session} />

    //       <Navigation session={session} />
    //     </div>
    //   </div>
    // </div>

    // <div
    //   className="flex min-h-screen flex-col font-sans"
    //   style={{ backgroundColor: "var(--color-bg)" }}
    // >
    //   <div className="flex flex-1 flex-col justify-center px-6 py-10">
    //     <div className="mx-auto flex w-full max-w-165 flex-col">
    //       {/* Header */}
    //       <ExamHeader session={session} />

    //       <div className="grid grid-cols-1 items-start gap-md sm:grid-cols-[1fr_220px]">
    //         <QuestionCard session={session} />
    //         <CountdownTimer timeLeft={session.timeLeft} />
    //       </div>
    //       {/* Navigation */}
    //       <Navigation session={session} />
    //     </div>
    //   </div>
    // </div>
  );
}

export default ExamSessionPage;
