import { useQuery } from "@tanstack/react-query";
import { getExamCategories } from "../services/examsApi";

export function useExamCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["exam-categories"],
    queryFn: getExamCategories,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  return { categories, isLoading };
}
