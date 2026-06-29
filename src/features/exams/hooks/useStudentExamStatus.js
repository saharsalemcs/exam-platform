//   attemptStatus — { [examId]: { status, attemptId } }

import { useUser } from "@/features/auth/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getStudentExamAttempts } from "../services/examsApi";

export function useStudentExamStatus() {
  const { data } = useUser();
  const studentId = data?.user?.id;

  const { data: attemptStatus = {}, isLoading } = useQuery({
    queryKey: ["student-exam-status", studentId],
    queryFn: () => getStudentExamAttempts(studentId),
    staleTime: 1000 * 30,

    // !! => convert any value to Boolean (true/false)
    enabled: !!studentId,
  });

  return { attemptStatus, isLoading };
}
