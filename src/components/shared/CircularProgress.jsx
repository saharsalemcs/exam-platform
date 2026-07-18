import { useEffect, useState } from "react";

function CircularProgress({ percentage, size = 176, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // const clamped = Math.min(100, Math.max(0, percentage));
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setDisplayed(Math.round((1 - Math.pow(1 - p, 3)) * percentage));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [percentage]);

  const offset = circumference - (displayed / 100) * circumference;

  const ringClass =
    percentage >= 80
      ? "stroke-primary"
      : percentage >= 60
        ? "stroke-warning"
        : "stroke-danger";

  const textClass =
    percentage >= 80
      ? "text-primary"
      : percentage >= 60
        ? "text-warning"
        : "text-danger";

  return (
    <div
      className="relative mt-2 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          style={{ stroke: "var(--color-border)" }}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${ringClass} transition-[stroke-dashoffset] duration-700 ease-out`}
        />
      </svg>

      <div className="relative inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl leading-none font-extrabold ${textClass}`}>
          {percentage}%
        </span>
        <span
          className="mt-1 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Score
        </span>
      </div>
    </div>
  );
}

export default CircularProgress;
