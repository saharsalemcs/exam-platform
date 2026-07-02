import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  BookOpen,
  Target,
  Award,
  User,
  Tag,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useExamDetails } from "@/features/exams/hooks/useExamDetails";
import ExamRulesModal from "@/features/exams/components/ExamRulesModal";
import EmptyState from "@/components/shared/EmptyState";
import ExamStatusBadge from "@/components/shared/ExamStatusBadge";
import ExamStatCard from "../components/ExamStatCard";
import Button from "@/components/shared/Button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const DIFFICULTY = {
  easy: {
    label: "Easy",
    bg: "rgba(45,212,191,0.1)",
    border: "rgba(45,212,191,0.2)",
    color: "var(--color-success)",
  },
  medium: {
    label: "Medium",
    bg: "rgba(237,216,138,0.1)",
    border: "rgba(237,216,138,0.2)",
    color: "var(--color-warning)",
  },
  hard: {
    label: "Hard",
    bg: "rgba(200,93,106,0.1)",
    border: "rgba(200,93,106,0.2)",
    color: "var(--color-danger)",
  },
};

function ExamDetailsPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const { exam, attemptInfo, isLoading, error } = useExamDetails(examId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isCompleted =
    attemptInfo?.status === "submitted" || attemptInfo?.status === "timed_out";
  const isInterrupted = attemptInfo?.status === "in_progress";

  function handleActionClick() {
    if (isCompleted) {
      navigate(`/student/results/${attemptInfo.attemptId}`);
      return;
    }
    setIsModalOpen(true);
  }

  function handleStartConfirmed() {
    setIsModalOpen(false);
    navigate(`/student/exam/${examId}/session`);
  }

  //  Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  //  Error state
  if (error || !exam) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Exam not found"
        description={
          error?.message ??
          "This exam may have been removed or is no longer available."
        }
        variant="error"
        size="lg"
      />
    );
  }

  const questionCount = exam.questions?.length ?? 0;
  const difficulty = DIFFICULTY[exam.difficulty] ?? DIFFICULTY.medium;

  return (
    <>
      <div className="mx-auto flex animate-[fade-up_0.4s_ease_both] flex-col gap-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="w-fit hover:opacity-70"
          style={{
            background: "none",
            border: "none",
          }}
        >
          <ChevronLeft />
          Back
        </Button>

        {/* Card => Exam info */}
        <div
          className="rounded-[var(--radius-lg)] p-6 sm:p-8"
          style={{
            background:
              "linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-2) 100%)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Badges row */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {exam.category && (
              <span
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium"
                style={{
                  backgroundColor: "var(--color-primary-glow)",
                  border: "1px solid rgba(212,175,88,0.15)",
                  color: "var(--color-primary)",
                }}
              >
                <Tag size={14} />
                {exam.category}
              </span>
            )}

            <span
              className="w-fit rounded-full px-3 py-0.5 text-sm font-medium"
              style={{
                backgroundColor: `${difficulty.bg}`,
                border: `1px solid ${difficulty.border}`,
                color: difficulty.color,
              }}
            >
              {difficulty.label}
            </span>

            {/* Status badge — بيظهر بس لو في attempt */}
            {isCompleted && <ExamStatusBadge status="completed" />}
            {isInterrupted && <ExamStatusBadge status="in-progress" />}
          </div>

          {/* Title */}
          <h1
            className="mb-3 text-xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--color-text)" }}
          >
            {exam.title}
          </h1>

          {/* Description */}
          {exam.description && (
            <p
              className="mb-4 text-base leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {exam.description}
            </p>
          )}

          {/* Instructor */}
          {exam.profiles?.full_name && (
            <div className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <User size={16} style={{ color: "var(--color-text-muted)" }} />
              </div>
              <p
                className="text-base"
                style={{ color: "var(--color-text-muted)" }}
              >
                Instructor:{" "}
                <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
                  {exam.profiles.full_name}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ExamStatCard
            icon={Clock}
            label="Duration"
            value={`${exam.duration_mins} min`}
            iconColor="var(--color-accent)"
          />
          <ExamStatCard
            icon={BookOpen}
            label="Questions"
            value={questionCount}
            iconColor="var(--color-primary)"
          />
          <ExamStatCard
            icon={Target}
            label="Total Marks"
            value={exam.total_marks}
            iconColor="var(--color-warning)"
          />
          <ExamStatCard
            icon={Award}
            label="Pass Mark"
            value={exam.pass_marks}
            iconColor="var(--color-success)"
          />
        </div>

        {/*  Interrupted warning  */}

        {isInterrupted && (
          <div
            className="flex items-start gap-3 rounded-[var(--radius-md)] p-4"
            style={{
              backgroundColor: "rgba(200,93,106,0.08)",
              border: "1px solid rgba(200,93,106,0.2)",
            }}
          >
            <AlertTriangle
              size={16}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-danger)" }}
            />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-danger)" }}
              >
                Exam Interrupted
              </p>
              <p
                className="mt-0.5 text-xs leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                Your previous session was interrupted. If you resume, the timer
                will continue from where it stopped - no extra time is added.
              </p>
            </div>
          </div>
        )}

        {/*  No questions warning  */}

        {questionCount === 0 && (
          <div
            className="flex items-start gap-3 rounded-[var(--radius-md)] p-4"
            style={{
              backgroundColor: "rgba(237,216,138,0.08)",
              border: "1px solid rgba(237,216,138,0.2)",
            }}
          >
            <AlertTriangle
              size={16}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-warning)" }}
            />
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              This exam has no questions yet. Check back later.
            </p>
          </div>
        )}

        {/*  Action button  */}

        <Button
          onClick={handleActionClick}
          disabled={questionCount === 0}
          variant={
            isCompleted ? "success" : isInterrupted ? "danger" : "primary"
          }
        >
          {isCompleted ? (
            <>
              <CheckCircle2 size={17} /> View Results
            </>
          ) : isInterrupted ? (
            <>
              <AlertTriangle size={17} /> Resume Exam
            </>
          ) : (
            <>
              <PlayCircle size={17} /> Start Exam - {exam.duration_mins} min
            </>
          )}
        </Button>
      </div>

      <ExamRulesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleStartConfirmed}
        examTitle={exam.title}
      />
    </>
  );
}

export default ExamDetailsPage;
