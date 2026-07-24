import { useQuery } from "@tanstack/react-query";
import {
  getInstructorExams,
  getSubmissionCountsByExamIds,
} from "../services/examsApi";

export function useExamsManagement({ instructorId }) {
  const examsQuery = useQuery({
    queryKey: ["instructor-exams", instructorId],
    queryFn: async () => {
      const instructorExams = await getInstructorExams(instructorId);
      const examIds = instructorExams.map((exam) => exam.id);
      const counts = await getSubmissionCountsByExamIds(examIds);

      return instructorExams.map((exam) => ({
        ...exam,
        has_submissions: (counts[exam.id] ?? 0) > 0,
      }));
    },
    enabled: !!instructorId,
  });

  return {
    exams: examsQuery.data ?? [],
    isFetchingExams: examsQuery.isPending,
    examsError: examsQuery.error,
  };
}
