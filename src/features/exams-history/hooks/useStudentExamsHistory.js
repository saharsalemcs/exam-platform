import { useQuery } from "@tanstack/react-query";
import { getExamsHistory } from "../services/studentExamsHistoryApi";

export function useStudentExamsHistory({ studentId }) {
  const {
    data: studentExams,
    isPending: isFetchingStudentExams,
    error: studentExamsError,
  } = useQuery({
    queryKey: ["exams-history", studentId],
    queryFn: () => getExamsHistory(studentId),
    enabled: !!studentId,
  });

  return {
    studentExams: studentExams ?? [],
    isFetchingStudentExams,
    studentExamsError,
  };
}
