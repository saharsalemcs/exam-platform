import { CheckCircle2, PlayCircle } from "lucide-react";

const BADGE_CONFIGS = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "var(--color-success)",
    bg: "rgba(45,212,191,0.1)",
    border: "1px solid rgba(45,212,191,0.2)",
  },
  "in-progress": {
    label: "In Progress",
    icon: PlayCircle,
    color: "var(--color-warning)",
    bg: "rgba(237,216,138,0.1)",
    border: "1px solid rgba(237,216,138,0.2)",
  },
};

function ExamStatusBadge({ status }) {
  const config = BADGE_CONFIGS[status];
  const Icon = config.icon;

  if (!config) return null;

  return (
    <span
      className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: config.border,
      }}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
}

export default ExamStatusBadge;
