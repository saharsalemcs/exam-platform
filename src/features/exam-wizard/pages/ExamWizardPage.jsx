import React, { useEffect } from "react";
import ExamWizardProvider from "../context/ExamWizardContext";
import StepIndicator from "@/components/shared/StepIndicator";
import { useParams, useSearchParams } from "react-router-dom";
import { useExamWizardContext } from "../hooks/useExamWizardContext";
import { useExamForEdit } from "../hooks/useExamForEdit";
import ExamDetailsStep from "../components/ExamDetailsStep";
import QuestionBuilderStep from "../components/QuestionBuilderStep";
import ReviewStep from "../components/ReviewStep";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const VALID_STEPS = [1, 2, 3];

/** DB exam row -> the shape ExamDetailsStep's form expects (examDetails). */
function mapExamToWizardDetails(exam) {
  const passPercentage =
    exam.total_marks > 0
      ? Math.round((exam.pass_marks / exam.total_marks) * 100)
      : "";

  return {
    id: exam.id,
    title: exam.title,
    category: exam.category,
    duration_mins: exam.duration_mins,
    difficulty: exam.difficulty,
    starts_at: exam.starts_at,
    ends_at: exam.ends_at,
    grade: exam.grade,
    department: exam.department,
    passPercentage,
    description: exam.description ?? "",
  };
}

/** DB question rows -> the shape the wizard's `questions` state expects. */
function mapQuestionsToWizard(questions) {
  return (questions ?? []).map((q) => ({
    id: q.id,
    body: q.body,
    type: q.type,
    options: q.options,
    correct_answer: q.correct_answer,
    marks: q.marks,
  }));
}

function ExamWizardContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { examDetails, questions, isEditMode } = useExamWizardContext();
  const rawStep = Number(searchParams.get("step"));
  const step = VALID_STEPS.includes(rawStep) ? rawStep : 1;

  function goToStep(n) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("step", String(n));
        return next;
      },
      { replace: true },
    );
  }

  useEffect(() => {
    if (!searchParams.has("step")) {
      goToStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (step === 2 && !examDetails?.title) {
      goToStep(1);
    } else if (step === 3 && questions.length === 0) {
      goToStep(examDetails?.title ? 2 : 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, examDetails?.title, questions.length]);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="flex items-center gap-sm font-display text-xl font-bold text-text">
          {isEditMode ? "Edit Exam" : "Create Exam"}
        </h1>
        <p className="text-sm text-text-muted">
          {isEditMode
            ? "Update the details and questions for this exam."
            : "Follow the steps to build and publish your exam."}
        </p>
      </header>
      <StepIndicator currentStep={step} />

      {step === 1 && <ExamDetailsStep onNext={() => goToStep(2)} />}
      {step === 2 && (
        <QuestionBuilderStep
          onBack={() => goToStep(1)}
          onNext={() => goToStep(3)}
        />
      )}
      {step === 3 && <ReviewStep onEditQuestions={() => goToStep(2)} />}
    </div>
  );
}

function PageLoader() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - var(--header-height))" }}
    >
      <LoadingSpinner />
    </div>
  );
}

function ExamWizardPage() {
  const { examId } = useParams();

  // Create mode: no examId in the route, mount the provider empty as before.
  if (!examId) {
    return (
      <ExamWizardProvider>
        <ExamWizardContent />
      </ExamWizardProvider>
    );
  }

  // Edit mode: fetch the exam first. ExamWizardProvider only reads
  // initialExam/initialQuestions once (useState initializer), so we must
  // not mount it until the data has actually arrived.
  return <EditExamWizard examId={examId} />;
}

function EditExamWizard({ examId }) {
  const { data: exam, isLoading, isError, error } = useExamForEdit(examId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !exam) {
    return (
      <div className="rounded-md border border-danger/20 bg-danger/10 p-lg text-danger">
        Couldn't load this exam for editing
        {error?.message ? `: ${error.message}` : "."} It may not exist, or you
        may not have permission to edit it.
      </div>
    );
  }

  return (
    <ExamWizardProvider
      initialExam={mapExamToWizardDetails(exam)}
      initialQuestions={mapQuestionsToWizard(exam.questions)}
    >
      <ExamWizardContent />
    </ExamWizardProvider>
  );
}

export default ExamWizardPage;
