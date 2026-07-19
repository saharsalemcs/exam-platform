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
      <StatCardsGrid stats={stats} />
    </div>
  );
}

export default StudentDashboardPage;
