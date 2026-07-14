import { formatTime } from "@/lib/utils";
import { Clock } from "lucide-react";

function CountdownTimer({ timeLeft }) {
  const isWarning = timeLeft <= 300 && timeLeft > 60;
  const isDanger = timeLeft <= 60;

  const color = isDanger
    ? "var(--color-danger)"
    : isWarning
      ? "var(--color-warning)"
      : "var(--color-success)";

  const bgColor = isDanger
    ? "rgba(200,93,106,0.1)"
    : isWarning
      ? "rgba(237,216,138,0.1)"
      : "rgba(45,212,191,0.08)";

  const borderColor = isDanger
    ? "rgba(200,93,106,0.3)"
    : isWarning
      ? "rgba(237,216,138,0.25)"
      : "rgba(45,212,191,0.2)";

  return (
    <div
      className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 transition-all duration-500"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        // نبض بسيط لما الوقت يكون في الـ danger zone
        animation: isDanger ? "pulse 1.5s ease-in-out infinite" : "none",
      }}
    >
      <Clock size={14} className="shrink-0" style={{ color }} />
      <span
        className="font-mono text-sm font-bold tracking-wider tabular-nums"
        style={{ color }}
      >
        {formatTime(timeLeft)}
      </span>

      <span
        className="hidden text-xs sm:inline"
        style={{ color, opacity: 0.75 }}
      >
        {isDanger ? "Hurry up!" : isWarning ? "Running out" : "remaining"}
      </span>
    </div>
  );
}

export default CountdownTimer;

// import { Clock } from "lucide-react";

// function formatTime(totalSeconds) {
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;
//   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
// }

// function CountdownTimer({ secondsLeft }) {
//   if (secondsLeft === null) return null;

//   const isLow = secondsLeft <= 60; // warn in the final minute

//   return (
//     <div
//       className="flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm font-semibold"
//       style={{
//         backgroundColor: isLow
//           ? "rgba(200,93,106,0.1)"
//           : "var(--color-surface-2)",
//         border: `1px solid ${isLow ? "var(--color-danger)" : "var(--color-border)"}`,
//         color: isLow ? "var(--color-danger)" : "var(--color-text)",
//       }}
//     >
//       <Clock size={16} />
//       {formatTime(secondsLeft)}
//     </div>
//   );
// }

// export default CountdownTimer;
