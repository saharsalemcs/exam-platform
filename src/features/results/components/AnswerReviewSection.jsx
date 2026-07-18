import { useState } from "react";
import QuestionReviewCard from "./QuestionReviewCard";
import Button from "@/components/shared/Button";

const FILTERS = [
  {
    key: "all",
    label: "All",
    className: "bg-primary/10 text-primary border-primary/25",
  },
  {
    key: "correct",
    label: "Correct",
    className: "bg-accent/10 text-accent border-accent/25",
  },
  {
    key: "wrong",
    label: "Wrong",
    className: "bg-danger/10 text-danger border-danger/25",
  },
  {
    key: "skipped",
    label: "Skipped",
    className: "bg-surface-2 text-text-muted border-border",
  },
];

function FilterTab({ label, count, onClick, className }) {
  return (
    <Button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-all ${className}`}
    >
      {label} ({count})
    </Button>
  );
}

function AnswerReviewSection({ questions }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const counts = {
    all: questions.length,
    correct: questions.filter((q) => q.status === "correct").length,
    wrong: questions.filter((q) => q.status === "wrong").length,
    skipped: questions.filter((q) => q.status === "skipped").length,
  };

  const visibleQuestions =
    activeFilter === "all"
      ? questions
      : questions.filter((q) => q.status === activeFilter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--color-text)" }}
        >
          Answer Review
        </h2>
        <p className="text-[15px]" style={{ color: "var(--color-text-muted)" }}>
          {questions.length} question{questions.length !== 1 ? "s" : ""} ·
          Review your answers below
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <FilterTab
            key={f.key}
            label={f.label}
            count={counts[f.key]}
            onClick={() => setActiveFilter(f.key)}
            className={f.className}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {visibleQuestions.map((q, i) => (
          <QuestionReviewCard
            key={q.id}
            question={q}
            index={questions.indexOf(q)}
          />
        ))}
      </div>
    </div>
  );
}

export default AnswerReviewSection;
