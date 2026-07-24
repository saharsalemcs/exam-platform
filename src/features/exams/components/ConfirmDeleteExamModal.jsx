import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";
import { TrashIcon } from "lucide-react";

function ConfirmDeleteExamModal({
  isOpen,
  onClose,
  onConfirm,
  examTitle,
  isDeleting,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="delete-exam-title"
      maxWidth={420}
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-danger/10 text-danger">
            <TrashIcon size={20} />
          </div>
          <h2 id="confirm-title" className="text-lg font-bold text-text">
            Delete Exam?
          </h2>
        </div>

        <p className="mt-0.5 text-text-muted">
          Are you sure you want to delete{" "}
          <span className="font-bold text-text">{examTitle}</span>? This action
          cannot be undone.
        </p>

        <div className="mt-2 flex shrink-0 justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteExamModal;
