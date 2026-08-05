import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { STATUS_OPTIONS, STATUS_STYLES } from "../helpers/getEffectiveStatus";

function StatusDropdown({ effectiveStatus, onChange, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, openUp: false });
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click (checks both button and portal menu)
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reposition on open, scroll, resize
  useLayoutEffect(() => {
    if (!isOpen) return;

    function updatePosition() {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight ?? 150;
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < menuHeight + 8;

      setCoords({
        top: openUp ? rect.top - menuHeight - 6 : rect.bottom + 6,
        left: rect.right - 128, // 128 = w-32 (8rem)
        openUp,
      });
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const current = STATUS_STYLES[effectiveStatus] ?? STATUS_STYLES.active;

  function handleSelect(status) {
    setIsOpen(false);
    if (status === effectiveStatus) return;
    onChange(status);
  }

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold uppercase disabled:opacity-50 ${current.className}`}
      >
        {current.label}
        {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-50 flex w-32 flex-col overflow-hidden rounded-md border shadow-lg"
            style={{
              top: coords.top,
              left: coords.left,
              backgroundColor: "var(--color-surface-2)",
              borderColor: "var(--color-border)",
            }}
          >
            {STATUS_OPTIONS.map((status) => {
              const style = STATUS_STYLES[status];
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleSelect(status)}
                  className="px-3 py-2 text-left text-sm font-semibold hover:bg-surface"
                  style={{
                    color: style.className.includes("accent")
                      ? "var(--color-accent)"
                      : style.className.includes("warning")
                        ? "var(--color-warning)"
                        : "var(--color-danger)",
                  }}
                >
                  {style.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}

export default StatusDropdown;
