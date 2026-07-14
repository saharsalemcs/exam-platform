import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";
import { AlertTriangle } from "lucide-react";

function SubmitConfirmModal({ isOpen, onClose, onConfirm, isPending }) {
  return (
    <Modal
      maxWidth={420}
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="submit-title"
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)]"
            style={{
              backgroundColor: "rgba(237,216,138,0.1)",
              border: "1px solid rgba(237,216,138,0.2)",
            }}
          >
            <AlertTriangle
              size={20}
              style={{ color: "var(--color-warning)" }}
            />
          </div>
          <h2
            id="confirm-title"
            className="text-lg font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Submit Exam?
          </h2>
        </div>

        <p className="mt-0.5" style={{ color: "var(--color-text-muted)" }}>
          Once you submit your exam, you won't be able to change your answers.
        </p>

        <div className="mt-2 flex shrink-0 justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SubmitConfirmModal;
