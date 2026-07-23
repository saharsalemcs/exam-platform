import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";
import { TrashIcon } from "lucide-react";

function SubmitDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      maxWidth={420}
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="delete-title"
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-danger/10 text-danger">
            <TrashIcon size={20} />
          </div>
          <h2
            id="confirm-title"
            className="text-lg font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Delete Question?
          </h2>
        </div>

        <p className="mt-0.5" style={{ color: "var(--color-text-muted)" }}>
          This action cannot be undone. This will permanently delete the
          question from this exam.
        </p>

        <div className="mt-2 flex shrink-0 justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SubmitDeleteModal;
