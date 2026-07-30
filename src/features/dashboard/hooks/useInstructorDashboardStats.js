import { useQuery } from "@tanstack/react-query";
import { getInstructorDashboardStats } from "../services/instructorDashboardApi";

export function useInstructorDashboardStats({ instructorId }) {
  const {
    data: stats,
    isPending: isFetchingStats,
    error: statsError,
  } = useQuery({
    queryKey: ["instructor-dashboard-stats", instructorId],
    queryFn: () => getInstructorDashboardStats(instructorId),
    enabled: !!instructorId,
  });

  return { stats, isFetchingStats, statsError };
}
