import React from "react";
import ExamWizardProvider from "../context/ExamWizardContext";
import StepIndicator from "@/components/shared/StepIndicator";
import { useSearchParams } from "react-router-dom";

function ExamWizardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = Number(searchParams.get("step")) || 1;

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
      <StepIndicator currentStep={currentStep} />
    </div>
  );
  // return <ExamWizardProvider initialQuestions ={} initialExam={}>
  // </ExamWizardProvider>;
}

export default ExamWizardPage;
