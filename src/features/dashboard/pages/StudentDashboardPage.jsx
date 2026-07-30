import { AlertTriangle, BookOpen } from "lucide-react";
import StatCardsGrid from "../components/StatCardsGrid";
import { useUser } from "@/features/auth/hooks/useUser";
import { useStudentDashboardStats } from "../hooks/useStudentDashboardStats";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import PerformanceChart from "../components/PerformanceChart";
import AnswersBreakdownChart from "../components/AnswersBreakdownChart";
import Table from "@/components/shared/Table";
import { recentExamsColumns } from "../components/recentExamsColumns";
import { STUDENT_STATS_CONFIG } from "../constants/studentStatsConfig";
import Button from "@/components/shared/Button";
import { useNavigate } from "react-router-dom";

export const TODAY_LABEL = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function StudentDashboardPage() {
  const { data: userData } = useUser();
  const studentId = userData?.profile?.id;
  const navigate = useNavigate();

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
        action={
          <Button className="mt-8" onClick={() => navigate("/student/exams")}>
            Take an Exam
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-lg">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-text">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Track your performance and progress
          </p>
        </div>

        <span className="hidden rounded-full border border-accent/20 bg-accent/8 px-3 py-1 font-mono text-sm text-accent sm:block">
          {TODAY_LABEL}
        </span>
      </div>

      {/* Stat cards */}
      <StatCardsGrid
        config={STUDENT_STATS_CONFIG}
        stats={{
          totalExams: stats.totalExams,
          averageScore: stats.averageScore,
          highestScore: stats.highestScore,
          passRate: stats.passRate,
        }}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-border bg-surface p-lg">
          <h3 className="font-display text-lg font-semibold text-text">
            Performance Over Time
          </h3>
          <p className="mb-4 text-sm text-text-muted">
            Score trend across exam submissions
          </p>
          <PerformanceChart data={stats.performanceOverTime} />
        </div>

        <div className="h-full rounded-lg border border-border bg-surface p-lg">
          <h3 className="font-display text-lg font-semibold text-text">
            Answers Breakdown
          </h3>
          <p className="mb-4 text-sm text-text-muted">
            Distribution by outcome
          </p>
          <AnswersBreakdownChart breakdown={stats.answersBreakdown} />
        </div>
      </div>

      <Table columns={recentExamsColumns} rows={stats.recentExams} />
    </div>
  );
}

export default StudentDashboardPage;
