import { Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";

/** Compact timer pill — lives in the sticky exam header. */
function CountdownTimer({ timeLeft }) {
  const isWarning = timeLeft <= 120 && timeLeft > 60;
  const isDanger = timeLeft <= 60;

  const color = isDanger
    ? "var(--color-danger)"
    : isWarning
      ? "var(--color-warning)"
      : "var(--color-text)";

  const backgroundColor = isDanger
    ? "rgba(200,93,106,0.1)"
    : isWarning
      ? "rgba(237,216,138,0.1)"
      : "var(--color-surface-2)";

  const borderColor = isDanger
    ? "rgba(200,93,106,0.3)"
    : isWarning
      ? "rgba(237,216,138,0.25)"
      : "var(--color-border)";

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={`Time remaining ${formatTime(timeLeft)}`}
      className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 transition-colors duration-500"
      style={{ backgroundColor, border: `1px solid ${borderColor}` }}
    >
      <Clock size={15} className="shrink-0" style={{ color }} />

      <span className="hidden font-mono text-[10px] tracking-[0.08em] text-text-muted uppercase lg:inline">
        Time left
      </span>

      <span
        className={`font-mono text-base leading-none font-medium tabular-nums ${
          isDanger ? "animate-pulse-red" : ""
        }`}
        style={{ color }}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}

export default CountdownTimer;
