import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { STATUS_OPTIONS, STATUS_STYLES } from "../helpers/getEffectiveStatus";

function StatusDropdown({ effectiveStatus, onChange, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = STATUS_STYLES[effectiveStatus] ?? STATUS_STYLES.active;

  function handleSelect(status) {
    setIsOpen(false);
    if (status === effectiveStatus) return;
    onChange(status);
  }

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold uppercase disabled:opacity-50 ${current.className}`}
      >
        {current.label}
        {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 z-10 mt-1.5 flex w-32 flex-col overflow-hidden rounded-md border shadow-lg"
          style={{
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
        </div>
      )}
    </div>
  );
}

export default StatusDropdown;
