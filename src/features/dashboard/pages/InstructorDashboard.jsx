import { useUser } from "@/features/auth/hooks/useUser";
import { TODAY_LABEL } from "./StudentDashboardPage";
import { useInstructorDashboardStats } from "../hooks/useInstructorDashboardStats";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { AlertTriangle, BookOpen } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import { useNavigate } from "react-router-dom";
import Button from "@/components/shared/Button";
import StatCardsGrid from "../components/StatCardsGrid";
import { INSTRUCTOR_STATS_CONFIG } from "../constants/instructorStatsConfig";
import Table from "@/components/shared/Table";
import { instructorRecentSubmissionsColumns } from "../components/instructorRecentSubmissionsColumns";
import PassFailDonutChart from "../components/PassFailDonutChart";
import PerformanceChart from "../components/PerformanceChart";

function InstructorDashboard() {
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;
  const navigate = useNavigate();

  const { stats, isFetchingStats, statsError } = useInstructorDashboardStats({
    instructorId,
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
        description="Create your first exam to start seeing stats here."
        size="lg"
        action={
          <Button
            className="mt-8"
            onClick={() => navigate("/instructor/exam-wizard")}
          >
            Create an Exam
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
            Track your exams and students' performance
          </p>
        </div>

        <span className="hidden rounded-full border border-accent/20 bg-accent/8 px-3 py-1 font-mono text-sm text-accent sm:block">
          {TODAY_LABEL}
        </span>
      </div>

      {/* Stat cards */}
      <StatCardsGrid
        config={INSTRUCTOR_STATS_CONFIG}
        stats={{
          totalExams: stats.totalExams,
          totalSubmissions: stats.totalSubmissions,
          studentsAverageScore: stats.studentsAverageScore,
          totalStudents: stats.totalStudents,
        }}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-border bg-surface p-lg">
          <h3 className="text-lg font-bold text-text">
            Exams Performance Over Time
          </h3>
          <p className="mb-4 text-sm text-text-muted">Average score per exam</p>
          <PerformanceChart data={stats.performanceOverTime} />
        </div>

        <div className="rounded-lg border border-border bg-surface p-lg">
          <h3 className="text-lg font-bold text-text">Submissions Breakdown</h3>
          <p className="mb-4 text-sm text-text-muted">Pass vs fail rate</p>
          <PassFailDonutChart breakdown={stats.submissionsBreakdown} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-lg">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-text">Recent Submissions</h3>
            <p className="text-sm text-text-muted">Latest student activity</p>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
            {stats.recentSubmissions.length} submissions
          </span>
        </div>

        <Table
          columns={instructorRecentSubmissionsColumns}
          rows={stats.recentSubmissions}
        />
      </div>
    </div>
  );
}

export default InstructorDashboard;
