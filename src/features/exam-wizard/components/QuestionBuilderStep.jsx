import Button from "@/components/shared/Button";
import { useExamWizardContext } from "../hooks/useExamWizardContext";
import MCQForm from "./MCQForm";
import TrueFalseForm from "./TrueFalseForm";

function QuestionBuilderStep({ onBack, onNext }) {
  const { questions, questionType, setQuestionType } = useExamWizardContext();

  function switchType(type) {
    setQuestionType(type);
  }

  return (
    <div id="main-content" className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 rounded-md border border-border bg-surface p-lg">
        <div className="space-y-md">
          <h3 className="text-sm font-bold tracking-wider text-text uppercase">
            Add New Question
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => switchType("mcq")}
              className={`rounded-lg px-md py-sm text-lg font-semibold ${questionType === "mcq" ? "bg-primary text-bg" : "border border-border bg-surface-2 text-text hover:border-primary"}`}
            >
              + Add MCQ
            </button>
            <button
              onClick={() => switchType("true_false")}
              className={`rounded-lg px-md py-sm text-lg font-semibold ${questionType === "true_false" ? "bg-accent text-bg" : "border border-border bg-surface-2 text-text hover:border-accent"}`}
            >
              + True/False
            </button>
          </div>
        </div>

        {questionType === "mcq" ? <MCQForm /> : <TrueFalseForm />}
      </div>
    </div>
  );
}

export default QuestionBuilderStep;
