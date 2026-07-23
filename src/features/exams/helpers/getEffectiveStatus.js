// الحالة الفعلية بتتحسب هنا وقت العرض بس، مش، ملهاش علاقة بالدتا بيز، مش بتتخزن في الداتابيز.
// (draft/active/closed)؛ الإغلاق بسبب انتهاء الوقت بيتحسب لحظياً

export function getEffectiveStatus(exam) {
  if (exam.status === "draft") return "draft";
  if (new Date() > new Date(exam.ends_at)) return "closed";
  return exam.status; // "active" أو "closed" (إغلاق يدوي بدري)
}

export const STATUS_STYLES = {
  active: { label: "Active", className: "bg-accent/10 text-accent" },
  draft: { label: "Draft", className: "bg-warning/10 text-warning" },
  closed: { label: "Closed", className: "bg-danger/10 text-danger" },
};

export const STATUS_OPTIONS = ["active", "draft", "closed"];
