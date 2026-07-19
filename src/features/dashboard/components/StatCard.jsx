function StatCard({ config, value, index = 0 }) {
  const Icon = config.icon;

  return (
    <div
      className={`group hover:border-opacity-100 relative flex flex-col gap-4 overflow-hidden rounded-lg border p-lg opacity-0 transition-all duration-300 ease-out hover:-translate-y-1 ${config.border} ${config.glow}`}
      style={{
        animation: "stat-card-in 0.5s ease-out forwards",
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold tracking-wider uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          {config.label}
        </span>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:scale-110 ${config.bg}`}
        >
          <Icon size={18} className={config.color} />
        </div>
      </div>

      <span
        className={`font-display text-3xl font-bold sm:text-4xl ${config.color}`}
      >
        {config.format(value)}
      </span>

      {/* underline hover */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${config.accent}`}
      />
    </div>
  );
}

export default StatCard;
