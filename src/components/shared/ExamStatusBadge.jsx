import { AlertTriangle, CheckCircle2, PlayCircle } from "lucide-react";

const BADGE_CONFIGS = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "var(--color-success)",
    bg: "rgba(45,212,191,0.12)",
    border: "1px solid rgba(45,212,191,0.25)",
  },
  "in-progress": {
    label: "In Progress",
    icon: PlayCircle,
    color: "var(--color-warning)",
    bg: "rgba(237,216,138,0.12)",
    border: "1px solid rgba(237,216,138,0.28)",
  },
  violated: {
    label: "Violated",
    icon: AlertTriangle,
    color: "var(--color-danger)",
    bg: "rgba(200,93,106,0.12)",
    border: "1px solid rgba(200,93,106,0.32)",
  },
};

function ExamStatusBadge({ status }) {
  const config = BADGE_CONFIGS[status];
  const Icon = config.icon;

  if (!config) return null;

  return (
    <span
      className="ml-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] shadow-sm"
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: config.border,
      }}
    >
      <Icon size={11} className="shrink-0" />
      {config.label}
    </span>
  );
}

export default ExamStatusBadge;
