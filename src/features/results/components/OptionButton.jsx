import { cn } from "@/lib/utils";

function OptionButton({ option, letter, isCorrect, isSelected }) {
  const showCorrectStyle = isCorrect;
  const showWrongStyle = isSelected && !isCorrect;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3",
        showCorrectStyle && "border-accent bg-accent/10",
        showWrongStyle && "border-danger bg-danger/10",
        !showCorrectStyle && !showWrongStyle && "border-border bg-transparent",
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          showCorrectStyle ? "text-accent" : "text-text-muted",
        )}
        style={{ backgroundColor: "var(--color-surface-2)" }}
      >
        {letter}
      </span>

      <span
        className={cn(
          "flex-1 text-[14px]",
          showCorrectStyle ? "text-accent" : "text-text-muted",
        )}
      >
        {option.text}
      </span>

      {showCorrectStyle && <span className="text-accent">✓</span>}
    </div>
  );
}

export default OptionButton;
