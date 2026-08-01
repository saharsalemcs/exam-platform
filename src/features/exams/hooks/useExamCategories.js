import { useQuery } from "@tanstack/react-query";
import { getExamCategories } from "../services/examsApi";
import { useUser } from "@/features/auth/hooks/useUser";

export function useExamCategories() {
  const { data: userData } = useUser();
  const grade = userData?.profile?.grade;
  const department = userData?.profile?.department;
  const hasTargetingInfo = Boolean(grade) && Boolean(department);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["exam-categories", grade, department],
    queryFn: () => getExamCategories({ grade, department }),
    enabled: hasTargetingInfo,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  return { categories, isLoading };
}
