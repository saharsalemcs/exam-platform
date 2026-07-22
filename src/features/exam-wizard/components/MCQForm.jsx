import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useExamWizardContext } from "../hooks/useExamWizardContext";
import Button from "@/components/shared/Button";
import FormRow from "@/components/shared/FormRow";
import ErrorMessage from "@/components/shared/ErrorMessage";

const OPTION_IDS = ["opt1", "opt2", "opt3", "opt4"];

const EMPTY_VALUES = {
  body: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctOption: "",
  marks: "",
};

function questionToFormValues(question) {
  if (!question) return EMPTY_VALUES;
  return {
    body: question.body,
    option1: question.options?.[0]?.text ?? "",
    option2: question.options?.[1]?.text ?? "",
    option3: question.options?.[2]?.text ?? "",
    option4: question.options?.[3]?.text ?? "",
    correctOption: question.correct_answer ?? "",
    marks: question.marks ?? "",
  };
}

function MCQForm() {
  const { questions, handleAddQuestion, editingQuestionId } =
    useExamWizardContext();

  const editingQuestion = editingQuestionId
    ? questions.find((q) => q.id === editingQuestionId)
    : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: questionToFormValues(editingQuestion),
  });

  function onSubmit(data) {
    handleAddQuestion({
      type: "mcq",
      body: data.body,
      options: OPTION_IDS.map((id, i) => ({
        id,
        text: data[`option${i + 1}`],
      })),
      correct_answer: data.correctOption,
      marks: Number(data.marks),
    });
    toast.success(
      `Question ${editingQuestionId ? "updated" : "added"} successfully!`,
    );
    reset(EMPTY_VALUES);
  }

  const inputClass = (fieldError) => `
    w-full px-md py-sm text-sm font-medium rounded-md border bg-surface-2 text-text
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0
    ${fieldError ? "border-danger focus:border-danger focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/20"}
  `;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-lg rounded-lg border border-border p-lg"
    >
      <FormRow
        id="body"
        label="Question"
        error={errors.body?.message}
        required
        style={{ color: "var(--color-text)" }}
      >
        <textarea
          style={{ fontSize: "17px", fontWeight: "normal", padding: "16px" }}
          rows={2}
          placeholder="Enter your question here…"
          {...register("body", { required: "Question text is required" })}
          className={`${inputClass(errors.body)} resize-y`}
        />
      </FormRow>

      <div className="flex flex-col gap-lg">
        <p className="text-sm font-bold tracking-wider text-text uppercase">
          Select Correct Answer &amp; Enter Options
        </p>

        {OPTION_IDS.map((id, i) => (
          <div
            key={id}
            className="flex items-center gap-lg rounded-lg border border-border bg-surface-2 p-lg transition-all hover:border-primary"
          >
            <input
              type="radio"
              value={id}
              {...register("correctOption", {
                required: "Select the correct option",
              })}
              className="h-5 w-5 shrink-0 cursor-pointer accent-primary"
            />
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              {...register(`option${i + 1}`, {
                required: "Option is required",
              })}
              className="flex-1 bg-transparent text-text placeholder-text-faint outline-none"
            />
            {errors[`option${i + 1}`] && (
              <ErrorMessage message={errors[`option${i + 1}`]?.message} />
            )}
          </div>
        ))}

        {errors.correctOption && (
          <ErrorMessage message={errors.correctOption.message} />
        )}
      </div>

      <FormRow
        id="marks"
        label="Points"
        style={{ color: "var(--color-text)" }}
        error={errors.marks?.message}
        required
      >
        <input
          type="number"
          min="1"
          placeholder="Enter mark"
          {...register("marks", {
            required: "Mark is required",
            min: { value: 1, message: "Must be at least 1" },
          })}
          className={`${inputClass(errors.marks)}`}
          style={{
            width: "128px",
            fontSize: "17px",
            fontWeight: "normal",
            padding: "16px",
          }}
        />
      </FormRow>

      <Button variant="primary" size="lg" type="submit" fullWidth>
        {editingQuestion ? "Save Changes" : "Add MCQ Question"}
      </Button>
    </form>
  );
}

export default MCQForm;
