import { formatDateTime } from "@/utils/formatDateForInput";
import { getEffectiveStatus } from "../helpers/getEffectiveStatus";
import { PencilIcon, Trash2 } from "lucide-react";
import StatusDropdown from "./StatusDropdown";
import Tag from "@/components/shared/Tag";

const DIFFICULTY_COLOR = { easy: "accent", medium: "warning", hard: "danger" };

export function buildExamManagementColumns({
  onStatusChange,
  onEdit,
  onDelete,
  updatingExamId,
}) {
  return [
    {
      key: "title",
      label: "Exam Title",
      render: (exam) => <span className="font-medium">{exam.title}</span>,
    },
    {
      key: "startDate",
      label: "Start Date",
      render: (exam) => <span>{formatDateTime(exam.starts_at)}</span>,
    },
    {
      key: "endDate",
      label: "End Date",
      render: (exam) => <span>{formatDateTime(exam.ends_at)}</span>,
    },
    {
      key: "difficulty",
      label: "Difficulty",
      render: (exam) => (
        <Tag
          label={exam.difficulty?.toUpperCase()}
          color={DIFFICULTY_COLOR[exam.difficulty] ?? "accent"}
          className="border-none"
        />
      ),
    },
    {
      key: "duration",
      label: "Duration",
      render: (exam) => <span>{exam.duration_mins} min</span>,
    },
    {
      key: "grade",
      label: "Grade",
      render: (exam) => <span>{exam.grade}</span>,
    },
    {
      key: "department",
      label: "Department",
      render: (exam) => <span>{exam.department}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (exam) => (
        <StatusDropdown
          exam={exam}
          effectiveStatus={getEffectiveStatus(exam)}
          onChange={(status) => onStatusChange(exam.id, status)}
          disabled={updatingExamId === exam.id}
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (exam) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => onDelete(exam)}
            aria-label="Delete exam"
            className="text-text-muted hover:text-danger"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => onEdit(exam)}
            aria-label="Edit exam"
            className="text-text-muted hover:text-primary"
          >
            <PencilIcon size={18} />
          </button>
        </div>
      ),
    },
  ];
}
