import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = 580,
  labelledBy,
  closeOnBackdropClick = true,
  role = "dialog",
  panelClassName = "",
  panelStyle = {},
}) {
  const panelRef = useRef(null);
  const previousActiveElement = useRef(null);

  // prevent scroll if modal is open
  useEffect(
    function () {
      if (!isOpen) return;

      // store the original overflow value before any scroll to return it after the modal closed
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // clean up
      return () => (document.body.style.overflow = original);
    },
    [isOpen],
  );

  // close modal with Escape key
  useEffect(
    function () {
      if (!isOpen) return;

      function handleKeyDown(e) {
        if (e.key === "Escape") {
          onClose();
          return;
        }

        // prevent Tab to be outside the modal ==> improving accessability: Focus trap
        if (e.key === "Tab" && panelRef.current) {
          const focusable = panelRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      requestAnimationFrame(() => panelRef.current?.focus());
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role={role}
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
        }}
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative flex max-h-[85vh] w-full animate-[fade-scale-in_0.25s_ease_both] flex-col rounded-[var(--radius-lg)] outline-none ${panelClassName}`}
        style={{
          maxWidth,
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-md)",
          ...panelStyle,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
