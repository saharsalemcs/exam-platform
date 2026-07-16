import { formatTime } from "@/lib/utils";

function CountdownTimer({ timeLeft }) {
  const isWarning = timeLeft <= 120 && timeLeft > 60;
  const isDanger = timeLeft <= 60;

  const color = isDanger
    ? "var(--color-danger)"
    : isWarning
      ? "var(--color-warning)"
      : "var(--color-text)";

  const bgColor = isDanger
    ? "rgba(200,93,106,0.1)"
    : isWarning
      ? "rgba(237,216,138,0.1)"
      : "var(--color-surface)";

  const borderColor = isDanger
    ? "rgba(200,93,106,0.3)"
    : isWarning
      ? "rgba(237,216,138,0.25)"
      : "var(--color-border)";

  return (
    <div
      className="flex flex-col items-center gap-2 rounded-lg p-md text-center transition-all duration-500"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        animation: isDanger ? "pulse 1.5s ease-in-out infinite" : "none",
      }}
    >
      {/* <Clock size={17} className="shrink-0" style={{ color }} /> */}
      <p className="mt-2 mb-2 font-mono text-sm tracking-[0.08em] text-text-muted uppercase">
        Time Remaining
      </p>

      <p
        className="font-mono text-[35px] leading-none font-medium tracking-tight"
        style={{ color }}
      >
        {formatTime(timeLeft)}
      </p>
      <span
        className="hidden text-sm sm:inline"
        style={{ color, opacity: 0.75 }}
      >
        {isDanger ? "Hurry up!" : isWarning ? "Running out" : ""}
      </span>
    </div>
  );
}

export default CountdownTimer;
