import Tag from "@/components/shared/Tag";

function ExamHeader({ exam, questions }) {
  return (
    <div
      className="mb-lg flex flex-wrap items-center justify-between rounded-lg p-lg"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex w-full flex-col justify-between sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <h1 className="mb-1 text-lg font-bold">{exam?.title}</h1>
          <p
            style={{ color: "var(--color-text-muted)" }}
            className="text-[14px]"
          >
            {questions?.length} Questions&nbsp;·&nbsp;{exam?.duration_mins} min
          </p>
        </div>

        <div className="mt-sm flex flex-wrap gap-sm">
          <Tag label={exam.category} color="primary" />
          <Tag label={`${exam.total_marks} Marks`} color="warning" />
          <Tag
            label={
              exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)
            }
            color="accent"
          />
        </div>
      </div>
    </div>
  );
}

export default ExamHeader;
