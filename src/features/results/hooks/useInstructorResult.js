import { useQuery } from "@tanstack/react-query";
import { getExamResultForInstructor } from "../services/instructorResultApi";

export function useInstructorResult({ attemptId, instructorId }) {
  const {
    data: result,
    isPending: isFetchingResult,
    error: resultError,
  } = useQuery({
    queryKey: ["instructor-exam-result", attemptId, instructorId],
    queryFn: () => getExamResultForInstructor(attemptId, instructorId),
    enabled: !!attemptId && !!instructorId,
  });

  return { result, isFetchingResult, resultError };
}
