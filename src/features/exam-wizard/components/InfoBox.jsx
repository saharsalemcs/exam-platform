function InfoBox({ label, value }) {
  return (
    <div className="flex flex-col gap-1 rounded-md border border-border bg-surface p-lg">
      <span className="text-xs font-bold tracking-wider text-text-muted uppercase">
        {label}
      </span>
      <span className="text-lg font-bold text-text">{value}</span>
    </div>
  );
}

export default InfoBox;
