import { useState } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

function FilterModal({
  isOpen,
  onClose,
  sections = [],
  title = "Filter By",
  onClearAll,
}) {
  const [activeKey, setActiveKey] = useState(sections[0]?.key);
  const activeSection =
    sections.find((s) => s.key === activeKey) ?? sections[0];

  if (!sections.length) return null;

  const activeChips = sections
    .filter((s) => s.value)
    .map((s) => ({
      key: s.key,
      sectionLabel: s.label,
      optionLabel: s.options.find((o) => o.value === s.value)?.label ?? s.value,
      onChange: s.onChange,
    }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth={600}
      labelledBy="filter-modal-title"
      panelClassName="p-0"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <h2
          id="filter-modal-title"
          className="text-xl font-bold tracking-tight text-text"
        >
          {title}
        </h2>
        <button
          onClick={onClose}
          aria-label="Close filters"
          className="cursor-pointer rounded-[var(--radius-sm)] p-1 text-text-muted transition-colors hover:text-danger"
        >
          <X size={22} />
        </button>
      </div>

      {/* Body */}
      <div className="flex min-h-[320px] p-2">
        {/* Sidebar */}
        <div
          role="tablist"
          aria-orientation="vertical"
          className="flex w-[170px] shrink-0 flex-col py-4"
          style={{ borderRight: "1px solid var(--color-border)" }}
        >
          {sections.map((section) => {
            const isActive = section.key === activeSection?.key;
            return (
              <button
                key={section.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveKey(section.key)}
                className={`cursor-pointer px-5 py-3.5 text-left text-lg text-text transition-colors ${isActive ? "border-l-2 border-primary bg-primary/10" : ""}`}
              >
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Active filter chips */}
          {activeChips.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {activeChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => chip.onChange("")}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[15px] transition-colors"
                  style={{
                    border: "1px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    backgroundColor: "rgba(212,175,55,0.08)",
                  }}
                >
                  {chip.sectionLabel}: {chip.optionLabel}
                  <X size={13} />
                </button>
              ))}
            </div>
          )}

          {activeSection && (
            <>
              <h3 className="mb-4 text-sm font-bold tracking-wider text-text uppercase">
                Select {activeSection.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {(activeSection.showAll === false
                  ? activeSection.options
                  : [{ value: "", label: "All" }, ...activeSection.options]
                ).map((option) => {
                  const isSelected = activeSection.value === option.value;
                  return (
                    <button
                      key={option.value || "all"}
                      onClick={() => activeSection.onChange(option.value)}
                      className="cursor-pointer rounded-full px-5 py-2 text-base transition-all duration-150"
                      style={{
                        border: isSelected
                          ? "1px solid var(--color-primary)"
                          : "1px solid var(--color-border)",
                        color: isSelected
                          ? "var(--color-primary)"
                          : "var(--color-text)",
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      {onClearAll && (
        <div
          className="flex justify-end px-6 py-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <Button variant="ghost" onClick={onClearAll}>
            Clear all filters
          </Button>
        </div>
      )}
    </Modal>
  );
}

export default FilterModal;
