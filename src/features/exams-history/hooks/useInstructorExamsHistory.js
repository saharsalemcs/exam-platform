import { useQuery } from "@tanstack/react-query";
import { getInstructorExamsHistory } from "../services/instructorExamsHistory";

export function useInstructorExamsHistory({ instructorId }) {
  const {
    data: submissions,
    isPending: isFetchingSubmissions,
    error: submissionsError,
  } = useQuery({
    queryKey: ["instructor-exams-history", instructorId],
    queryFn: () => getInstructorExamsHistory(instructorId),
    enabled: !!instructorId,
  });

  return {
    submissions: submissions ?? [],
    isFetchingSubmissions,
    submissionsError,
  };
}
