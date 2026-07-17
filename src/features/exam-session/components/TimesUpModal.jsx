import Button from "@/components/shared/Button";
import Modal from "@/components/shared/Modal";
import { Clock } from "lucide-react";

function TimesUpModal({ isOpen, onConfirm, isPending }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      closeOnBackdropClick={false}
      role="alertdialog"
      labelledBy="timesup-title"
      maxWidth={380}
      panelStyle={{
        border: "1px solid rgba(200,93,106,0.3)",
        boxShadow: "0 0 40px rgba(200,93,106,0.15)",
      }}
    >
      <div className="flex flex-col items-center gap-5 p-8 text-center">
        {/* Icon */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            backgroundColor: "rgba(200,93,106,0.1)",
            border: "2px solid rgba(200,93,106,0.3)",
          }}
        >
          <Clock size={30} style={{ color: "var(--color-danger)" }} />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h2
            id="timesup-title"
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            Time's Up!
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Your exam time has ended. Your answers have been recorded and will
            be submitted now.
          </p>
        </div>

        {/* Action */}
        <Button
          variant="danger"
          size="lg"
          fullWidth
          onClick={onConfirm}
          disabled={isPending}
        >
          {isPending ? "Submitting…" : "View My Results"}
        </Button>
      </div>
    </Modal>
  );
}

export default TimesUpModal;
