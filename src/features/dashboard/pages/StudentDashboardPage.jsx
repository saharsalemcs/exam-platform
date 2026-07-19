import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Trophy,
} from "lucide-react";
import StatCardsGrid from "../components/StatCardsGrid";
import { useUser } from "@/features/auth/hooks/useUser";
import { useStudentDashboardStats } from "../hooks/useStudentDashboardStats";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import PerformanceChart from "../components/PerformanceChart";

const TODAY_LABEL = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function StudentDashboardPage() {
  const { data: userData } = useUser();
  const studentId = userData?.profile?.id;

  const { stats, isFetchingStats, statsError } = useStudentDashboardStats({
    studentId,
  });

  if (isFetchingStats) return <LoadingSpinner />;

  if (statsError) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Couldn't load your dashboard"
        description={statsError.message}
        variant="error"
        size="lg"
      />
    );
  }

  if (!stats || stats.totalExams === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No exams yet"
        description="Take your first exam to start seeing your stats here."
        size="lg"
      />
    );
  }

  return (
    <div className="flex flex-col gap-lg p-4">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1
            className="font-display text-2xl font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            Dashboard
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Track your performance and progress
          </p>
        </div>

        <span className="hidden rounded-full border border-accent/20 bg-accent/8 px-3 py-1 font-mono text-sm text-accent sm:block">
          {TODAY_LABEL}
        </span>
      </div>

      {/* Stat cards */}
      <StatCardsGrid
        stats={{
          totalExams: stats.totalExams,
          averageScore: stats.averageScore,
          highestScore: stats.highestScore,
          passRate: stats.passRate,
        }}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <div
          className="rounded-lg p-lg"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Performance Over Time
          </h3>
          <p
            className="mb-4 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Score trend across exam submissions
          </p>
          <PerformanceChart data={stats.performanceOverTime} />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;
