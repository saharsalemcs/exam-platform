const variants = {
  primary: "bg-primary/15 text-primary border-primary/30",
  accent: "bg-accent/12 text-accent border-accent/25",
  warning: "bg-warning/10 text-warning border-warning/20",
};

function Tag({ label, color, icon = null, className = "" }) {
  return (
    <span
      className={`rounded-full border px-4 py-1 text-[13px] font-medium ${variants[color]} ${className} `}
    >
      {icon && <span className="text-base leading-none">{icon}</span>}
      {label}
    </span>
  );
}

export default Tag;
