import { useQuery } from "@tanstack/react-query";
import { getExams } from "../services/examsApi";

export function useExams({ search = "", category = "", difficulty = "" }) {
  const {
    data: exams = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exams", { search, category, difficulty }],
    queryFn: () => getExams({ search, category, difficulty }),
  });

  return { exams, isLoading, error };
}
