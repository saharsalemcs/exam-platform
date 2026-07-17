import { useQuery } from "@tanstack/react-query";
import { getExamResult } from "../services/studentResultApi";

export function useStudentResult({ attemptId, studentId }) {
  const {
    data: result,
    isPending: isFetchingResult,
    error: resultError,
  } = useQuery({
    queryKey: ["exam-result", attemptId, studentId],
    queryFn: () => getExamResult(attemptId, studentId),
    enabled: !!attemptId && !!studentId,
  });

  return { result, isFetchingResult, resultError };
}
