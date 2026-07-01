function FilterSelect({ value, onChange, className, placeholder, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`min-w-[145px] cursor-pointer appearance-none rounded-[var(--radius-sm)] px-3 py-2.5 text-sm transition-all duration-150 outline-none ${className ?? ""}`}
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        color: value ? "var(--color-text)" : "var(--color-text-muted)",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--color-primary)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "var(--color-border)";
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;
