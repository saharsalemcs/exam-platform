import Button from "@/components/shared/Button";
import { useExamWizardContext } from "../hooks/useExamWizardContext";
import MCQForm from "./MCQForm";
import TrueFalseForm from "./TrueFalseForm";
import QuestionPreviewCard from "./QuestionPreviewCard";

function QuestionBuilderStep({ onBack, onNext }) {
  const { questions, questionType, setQuestionType } = useExamWizardContext();
  const totalPoints = questions.reduce(
    (sum, q) => sum + (Number(q.marks) || 0),
    0,
  );

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

        <div className="flex justify-between">
          <Button variant="secondary" size="md" onClick={onBack}>
            ← Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            disabled={questions.length === 0}
          >
            Next (Review &amp; Publish) →
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-text">
          Questions Added ({questions.length})
        </h3>
        <span className="text-sm text-text-muted">
          Total: {totalPoints} points
        </span>
      </div>

      <div className="flex flex-col gap-md">
        {questions.map((q, i) => (
          <QuestionPreviewCard key={q.id} question={q} index={i} />
        ))}
      </div>
    </div>
  );
}

export default QuestionBuilderStep;
