function ExamStatCard({ icon: Icon, label, value, iconColor }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-[12px] border border-border bg-surface-2 p-4 text-center">
      {/* Icon Container */}
      <div className="flex h-12 w-12 items-center justify-center rounded-[12px]">
        <Icon size={24} style={{ color: iconColor }} />
      </div>

      {/* Value + label */}
      <div>
        <h3 className="text-xl leading-none font-bold text-text">{value}</h3>
        <p className="mt-1 text-sm text-text-muted">{label}</p>
      </div>
    </div>
  );
}

export default ExamStatCard;
