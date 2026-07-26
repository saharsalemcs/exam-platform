import { X } from "lucide-react";

function ClearButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Clear filters"
      className="flex shrink-0 cursor-pointer items-center gap-1 rounded-[var(--radius-sm)] border border-border bg-transparent px-2.5 py-2.5 text-sm text-text-muted transition-all duration-150"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(200,93,106,0.06)";
        e.currentTarget.style.borderColor = "rgba(200,93,106,0.3)";
        e.currentTarget.style.color = "var(--color-danger)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.color = "var(--color-text-muted)";
      }}
    >
      <X size={15} />
      <span className="hidden sm:inline">Clear</span>
    </button>
  );
}

export default ClearButton;
