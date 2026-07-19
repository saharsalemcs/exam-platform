import { useQuery } from "@tanstack/react-query";
import { getStudentDashboardStats } from "../services/studentDashboardApi";

export function useStudentDashboardStats({ studentId }) {
  const {
    data: stats,
    isPending: isFetchingStats,
    error: statsError,
  } = useQuery({
    queryKey: ["dashboard-stats", studentId],
    queryFn: () => getStudentDashboardStats(studentId),
    enabled: !!studentId,
  });

  return { stats, isFetchingStats, statsError };
}
