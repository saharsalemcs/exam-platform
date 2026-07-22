import React, { useEffect } from "react";
import ExamWizardProvider from "../context/ExamWizardContext";
import StepIndicator from "@/components/shared/StepIndicator";
import { useSearchParams } from "react-router-dom";
import { useExamWizardContext } from "../hooks/useExamWizardContext";
import ExamDetailsStep from "../components/ExamDetailsStep";
import QuestionBuilderStep from "../components/QuestionBuilderStep";
import ReviewStep from "../components/ReviewStep";

const VALID_STEPS = [1, 2, 3];

function ExamWizardContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { examDetails, questions } = useExamWizardContext();
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
  // useEffect(() => {
  //   if (step === 2 && !examDetails?.title) {
  //     goToStep(1);
  //   } else if (step === 3 && questions.length === 0) {
  //     goToStep(examDetails?.title ? 2 : 1);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [step, examDetails?.title, questions.length]);

  return (
    // page header
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="flex items-center gap-sm font-display text-xl font-bold text-text">
          Create Exam
        </h1>
        <p className="text-sm text-text-muted">
          Follow the steps to build and publish your exam.
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
function ExamWizardPage() {
  return (
    <ExamWizardProvider>
      <ExamWizardContent />
    </ExamWizardProvider>
  );
}

export default ExamWizardPage;
