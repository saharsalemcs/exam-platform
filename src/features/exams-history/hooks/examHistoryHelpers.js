export const DIFFICULTY_COLOR = {
  easy: "accent",
  medium: "warning",
  hard: "danger",
};

export function getPercentage(score, totalMarks) {
  if (!totalMarks) return 0;
  return Math.round((score / totalMarks) * 100);
}

export function isPassed(score, passMarks) {
  return score >= (passMarks ?? 0);
}

export function formatSubmittedAt(isoString) {
  const date = new Date(isoString);
  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart}, ${timePart}`;
}
