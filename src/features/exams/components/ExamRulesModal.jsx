import Modal from "@/components/shared/Modal";
import { EXAM_RULES } from "@/constants/examRules";
import { ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

function ExamRulesModal({ isOpen, onClose, onConfirm, examTitle }) {
  const [agreed, setAgreed] = useState(false);

  // make the checkbox unchecked on opening each time
  useEffect(
    function () {
      if (isOpen) setAgreed(false);
    },
    [isOpen],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="rules-modal-title">
      {/* Header */}
      <div
        className="flex items-start justify-between gap-3 p-5 sm:p-6"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] p-2"
            style={{
              backgroundColor: "var(--color-primary-glow)",
              border: "1px solid rgba(212,175,88,0.2)",
            }}
          >
            <ShieldCheck size={30} style={{ color: "var(--color-primary)" }} />
          </div>
          <div>
            <h2
              id="rules-modal-title"
              className="text-lg font-bold tracking-tight sm:text-xl"
              style={{ color: "var(--color-text)" }}
            >
              Exam Rules & Guidelines
            </h2>
            <p
              className="mt-0.5 text-base font-semibold sm:text-lg"
              style={{ color: "var(--color-text-muted)" }}
            >
              {examTitle}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] transition-all duration-150 hover:bg-[var(--color-surface-2)] sm:h-10 sm:w-10"
        >
          <X size={24} />
        </button>
      </div>

      {/* Rules Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-5">
          {EXAM_RULES.map(({ category, icon: Icon, color, items }) => (
            <div key={category}>
              <div className="mb-2.5 flex items-center gap-2">
                <Icon size={21} style={{ color }} />
                <h3
                  className="text-base font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {category}
                </h3>
              </div>
              <ul className="flex flex-col gap-1.5 pl-1">
                {items.map((rule, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - checkbox + actions  */}
      <div
        className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-6"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <label
          className="flex cursor-pointer items-start gap-2.5 rounded-[var(--radius-sm)] p-1.5 transition-all duration-150 sm:p-3"
          style={{
            backgroundColor: agreed
              ? "var(--color-primary-glow)"
              : "var(--color-surface-2)",
            border: `1px solid ${agreed ? "rgba(212,175,88,0.3)" : "var(--color-border)"}`,
          }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-primary)]"
          />
          <span
            className="text-sm leading-relaxed"
            style={{
              color: agreed
                ? "var(--color-primary)"
                : "var(--color-text-muted)",
            }}
          >
            I have read and understood the exam rules above. I agree to follow
            them throughout the exam.
          </span>
        </label>

        <div className="mt-2 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-[var(--radius-sm)] py-2.5 text-sm font-medium transition-all duration-150 sm:text-base"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={!agreed}
            className="flex-[2] cursor-pointer rounded-[var(--radius-sm)] py-2.5 text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed sm:text-base"
            style={{
              backgroundColor: agreed
                ? "var(--color-primary)"
                : "var(--color-surface-2)",
              color: agreed ? "#0d1117" : "var(--color-text-faint)",
              border: `1px solid ${agreed ? "transparent" : "var(--color-border)"}`,
            }}
          >
            I Agree, Start Exam
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ExamRulesModal;
