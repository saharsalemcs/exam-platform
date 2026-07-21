const STEPS = [
  { number: 1, label: "Basic Info" },
  { number: 2, label: "Questions" },
  { number: 3, label: "Review & Publish" },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => {
        const isDone = s.number < currentStep;
        const isActive = s.number === currentStep;

        return (
          <div
            key={s.number}
            className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}
          >
            <div className="flex flex-col items-center gap-2">
              {/* Circle itself */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 sm:h-12 sm:w-12 ${isDone ? "bg-primary text-text" : isActive ? "border border-primary bg-surface-2 text-primary ring-2 ring-primary ring-offset-3 ring-offset-surface" : "border border-border bg-surface-2 text-text-muted"}`}
              >
                {" "}
                {isDone ? "✓" : s.number}
              </div>
              {/* Step label */}
              <span
                className={`hidden text-xs font-medium whitespace-nowrap transition-colors duration-300 sm:mt-1 sm:block sm:text-sm ${isActive || isDone ? "text-text" : "text-text-muted"}`}
              >
                {s.label}
              </span>
            </div>

            {/* Line */}
            {i < STEPS.length - 1 && (
              <div
                className="mx-2 mb-0 h-1 flex-1 rounded-full transition-all duration-300 sm:mx-3 sm:mb-6"
                style={{
                  backgroundColor: isDone
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
