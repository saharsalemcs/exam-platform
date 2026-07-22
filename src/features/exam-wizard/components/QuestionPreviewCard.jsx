import Button from "@/components/shared/Button";
import { useExamWizardContext } from "../hooks/useExamWizardContext";
import { Edit2Icon, TrashIcon } from "lucide-react";

const LETTERS = ["A", "B", "C", "D"];

function QuestionPreviewCard({ question, index, readOnly = false }) {
  const { handleEdit, handleDelete, editingQuestionId } =
    useExamWizardContext();
  const { id, body, type, options, correct_answer, marks } = question;

  const isBeingEdited = editingQuestionId === id;

  return (
    <div
      className="flex flex-col gap-4 rounded-md border border-border bg-surface p-lg sm:flex-row sm:items-start sm:justify-between"
      style={{ opacity: isBeingEdited ? 0.6 : 1 }}
    >
      <div className="flex-1">
        <div className="mb-md flex items-center gap-2">
          <span className="rounded-full bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent">
            Q{index + 1}
          </span>
          <span className="rounded-full bg-surface-2 px-3 py-1.5 text-sm font-semibold text-text-muted">
            {marks}pts
          </span>
          {isBeingEdited && (
            <span className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              Editing…
            </span>
          )}
        </div>

        <p className="mb-3 font-medium text-text" dir="auto">
          {body}
        </p>

        <div className="flex flex-col gap-3">
          {options.map((opt, i) => {
            const isCorrect = opt.id === correct_answer;
            return (
              <div
                key={opt.id}
                className="flex items-center gap-2 rounded-md p-md"
                style={{
                  borderLeft: isCorrect
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
                  backgroundColor: isCorrect
                    ? "rgba(59,130,246,0.06)"
                    : "transparent",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isCorrect
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                  }}
                >
                  {LETTERS[i]}.
                </span>
                <span
                  className="flex-1 text-lg"
                  style={{
                    color: isCorrect
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                  }}
                >
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-3">
        <span className="text-sm font-medium tracking-wider text-text-muted uppercase">
          {type === "mcq" ? "MCQ" : "True/False"}
        </span>
        {!readOnly && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(id)}
              className="text-primary hover:hover:text-primary"
            >
              <Edit2Icon size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(id)}
              className="text-danger hover:hover:text-danger"
            >
              <TrashIcon size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionPreviewCard;
