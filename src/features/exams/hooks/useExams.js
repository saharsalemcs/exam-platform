import { useQuery } from "@tanstack/react-query";
import { getExams } from "../services/examsApi";
import { useUser } from "@/features/auth/hooks/useUser";

export function useExams({ search = "", category = "", difficulty = "" }) {
  const { data: userData, isLoading: isProfileLoading } = useUser();
  const grade = userData?.profile?.grade;
  const department = userData?.profile?.department;
  const hasTargetingInfo = Boolean(grade) && Boolean(department);

  const {
    data: exams = [],
    isLoading: isExamsLoading,
    error,
  } = useQuery({
    queryKey: ["exams", { search, category, difficulty, grade, department }],
    queryFn: () =>
      getExams({ search, category, difficulty, grade, department }),
    enabled: hasTargetingInfo,
  });

  return {
    exams,
    isLoading: isProfileLoading || !hasTargetingInfo || isExamsLoading,
    error,
  };
}
