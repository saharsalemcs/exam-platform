import StatCard from "./StatCard";

function StatCardsGrid({ config, stats }) {
  return (
    <>
      <style>{`
        @keyframes stat-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {config.map((c, index) => (
          <StatCard key={c.key} config={c} value={stats[c.key]} index={index} />
        ))}
      </div>
    </>
  );
}

export default StatCardsGrid;
