import { STUDENT_STATS_CONFIG } from "@/features/dashboard/constants/studentStatsConfig";
import StatCard from "./StatCard";

function StatCardsGrid({ stats }) {
  return (
    <>
      <style>{`
        @keyframes stat-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STUDENT_STATS_CONFIG.map((config, index) => (
          <StatCard
            key={config.key}
            config={config}
            value={stats?.[config.key]}
            index={index}
          />
        ))}
      </div>
    </>
  );
}

export default StatCardsGrid;
