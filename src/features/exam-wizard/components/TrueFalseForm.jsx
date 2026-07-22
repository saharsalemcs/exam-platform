import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useExamWizardContext } from "../hooks/useExamWizardContext";
import Button from "@/components/shared/Button";
import FormRow from "@/components/shared/FormRow";

const TRUE_FALSE_OPTIONS = [
  { id: "true", text: "True" },
  { id: "false", text: "False" },
];

const EMPTY_VALUES = {
  body: "",
  correctOption: "",
  marks: "",
};

function questionToFormValues(question) {
  if (!question) return EMPTY_VALUES;
  return {
    body: question.body,
    correctOption: question.correct_answer ?? "",
    marks: question.marks ?? "",
  };
}

function TrueFalseForm() {
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
      type: "true_false",
      body: data.body,
      options: TRUE_FALSE_OPTIONS,
      correct_answer: data.correctOption,
      marks: Number(data.marks),
    });
    toast.success(`Question added successfully!`);
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
          rows={2}
          style={{ fontSize: "17px", fontWeight: "normal", padding: "16px" }}
          placeholder="Enter your question here…"
          {...register("body", { required: "Question text is required" })}
          className={`${inputClass(errors.body)} resize-y`}
        />
      </FormRow>

      <div className="flex flex-col gap-lg">
        <p className="text-sm font-bold tracking-wider text-text uppercase">
          Select Correct Answer
        </p>
        {TRUE_FALSE_OPTIONS.map((opt) => (
          <label
            key={opt.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 p-lg"
          >
            <input
              type="radio"
              value={opt.id}
              {...register("correctOption", {
                required: "Please select the correct answer",
              })}
              className="h-5 w-5 shrink-0 cursor-pointer accent-primary"
            />
            <span className="text-lg text-text">{opt.text}</span>
          </label>
        ))}

        {errors.correctOption && (
          <p className="text-sm text-danger">{errors.correctOption.message}</p>
        )}
      </div>

      <FormRow
        id="marks"
        label="Points"
        error={errors.marks?.message}
        style={{ color: "var(--color-text)" }}
        required
      >
        <input
          type="number"
          min="1"
          placeholder="Enter mark"
          {...register("marks", {
            required: "Required",
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
        {editingQuestion ? "Save Changes" : "Add True/False Question"}
      </Button>
    </form>
  );
}

export default TrueFalseForm;
