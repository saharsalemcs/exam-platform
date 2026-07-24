export const DIFFICULTY_COLOR = {
  easy: "accent",
  medium: "warning",
  hard: "danger",
};

export function isPassed(score, passMarks) {
  return score >= (passMarks ?? 0);
}
