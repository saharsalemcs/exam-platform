function StatItem({ label, value, colorClass, style }) {
  return (
    <div className="flex flex-col items-center gap-1 px-5 py-2">
      <span className={`text-2xl font-bold ${colorClass ?? ""}`} style={style}>
        {value}
      </span>
      <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

export default StatItem;
