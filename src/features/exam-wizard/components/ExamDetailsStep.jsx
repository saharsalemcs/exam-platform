import { useForm } from "react-hook-form";
import { useExamWizardContext } from "../hooks/useExamWizardContext";
import { formatDateForInput } from "@/utils/formatDateForInput";
import FormRow from "@/components/shared/FormRow";
import { DEPARTMENTS, DIFFICULTIES, GRADES } from "@/utils/constants";
import Button from "@/components/shared/Button";

const EMPTY_VALUES = {
  title: "",
  category: "",
  duration_mins: "",
  difficulty: "",
  starts_at: "",
  ends_at: "",
  grade: "",
  department: "",
  passPercentage: "",
  description: "",
};

function ExamDetailsStep({ onNext }) {
  const { examDetails, handleExamDetails, clearExamData } =
    useExamWizardContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    values: {
      ...examDetails,
      starts_at: formatDateForInput(examDetails?.starts_at),
      ends_at: formatDateForInput(examDetails?.ends_at),
    },
  });

  function onSubmit(data) {
    handleExamDetails({
      ...examDetails,
      ...data,
    });
    onNext();
  }

  function handleClear() {
    reset(EMPTY_VALUES);
    clearExamData();
  }

  const inputClass = (fieldError) => `
    w-full px-md py-sm text-sm font-medium rounded-md border bg-surface-2 text-text
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0
    ${fieldError ? "border-danger focus:border-danger focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/20"}
  `;

  return (
    <div className="rounded-md bg-surface p-lg">
      <h2 className="mb-lg text-2xl font-bold text-text">Exam Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
        {/* Exam Title & Subject */}
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
          <FormRow
            id="title"
            label="Exam Title"
            error={errors?.title?.message}
            required
          >
            <input
              {...register("title", { required: "Exam title is required" })}
              placeholder="e.g. Midterm — Data Structures"
              className={inputClass(errors.title)}
            />
          </FormRow>
          <FormRow
            id="category"
            label="Subject"
            error={errors?.category?.message}
            required
          >
            <input
              {...register("category", { required: "Subject is required" })}
              placeholder="e.g. Data Structures"
              className={inputClass(errors.category)}
            />
          </FormRow>
        </div>

        {/* Duration & Difficulty */}
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
          <FormRow
            id="duration_mins"
            label="Duration (minutes)"
            error={errors.duration_mins?.message}
            required
          >
            <input
              type="number"
              placeholder="e.g. 60"
              min="1"
              {...register("duration_mins", {
                required: "Duration Required",
                min: 1,
              })}
              className={inputClass(errors.duration_mins)}
            />
          </FormRow>

          <FormRow
            id="difficulty"
            label="Difficulty"
            error={errors.difficulty?.message}
            required
          >
            <select
              {...register("difficulty", { required: "Select difficulty" })}
              className={inputClass(errors.difficulty)}
            >
              <option value=""></option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </FormRow>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
          <FormRow
            id="starts_at"
            label="Start Date & Time"
            error={errors.starts_at?.message}
            required
          >
            <input
              type="datetime-local"
              {...register("starts_at", {
                required: "Date & time is required",
                setValueAs: (v) => (v ? new Date(v).toISOString() : v),
              })}
              className={inputClass(errors.starts_at)}
            />
          </FormRow>

          <FormRow
            id="ends_at"
            label="End Date & Time"
            error={errors.ends_at?.message}
            required
          >
            <input
              type="datetime-local"
              {...register("ends_at", {
                required: "Date & time is required",
                setValueAs: (v) => (v ? new Date(v).toISOString() : v),
              })}
              className={inputClass(errors.ends_at)}
            />
          </FormRow>

          <FormRow
            id="grade"
            label="Grade"
            error={errors.grade?.message}
            required
          >
            <select
              {...register("grade", { required: "Select Grade" })}
              className={inputClass(errors.grade)}
            >
              <option value=""></option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow
            id="department"
            label="Department"
            error={errors.department?.message}
            required
          >
            <select
              {...register("department", { required: "Select Department" })}
              className={inputClass(errors.department)}
            >
              <option value=""></option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </FormRow>
        </div>

        {/* Pass Percentage & Description */}
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
          <FormRow
            id="passPercentage"
            label="Pass Percentage"
            error={errors.passPercentage?.message}
            required
          >
            <input
              type="number"
              placeholder="e.g. 50"
              min="0"
              max="100"
              {...register("passPercentage", {
                required: "Pass Percentage Required",
                min: { value: 0, message: "Must be at least 0" },
                max: { value: 100, message: "Must be at most 100" },
              })}
              className={inputClass(errors.passPercentage)}
            />
          </FormRow>

          <FormRow id="description" label="Description">
            <input
              placeholder="Optional notes about this exam…"
              {...register("description")}
              className={inputClass(errors.description)}
            />
          </FormRow>
        </div>

        {/* Buttons */}
        <div className="mt-lg flex flex-wrap items-center justify-end gap-3">
          <Button
            variant="secondary"
            size="md"
            type="button"
            onClick={handleClear}
          >
            Clear Data
          </Button>

          <Button variant="primary" size="md" type="submit">
            Next (Add Questions) →
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ExamDetailsStep;
