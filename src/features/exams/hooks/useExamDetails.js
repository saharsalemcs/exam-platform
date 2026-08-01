// exam => exam details from getExamById
// attemptInfo => { status, attemptId }

import { useQuery } from "@tanstack/react-query";
import { getExamById } from "../services/examsApi";
import { useStudentExamStatus } from "./useStudentExamStatus";
import { useUser } from "@/features/auth/hooks/useUser";

export function useExamDetails(examId) {
  const { data: userData, isLoading: isProfileLoading } = useUser();
  const grade = userData?.profile?.grade;
  const department = userData?.profile?.department;
  const hasTargetingInfo = Boolean(grade) && Boolean(department);

  const {
    data: exam,
    isLoading: isLoadingExam,
    error,
  } = useQuery({
    queryKey: ["exam", examId, grade, department],
    queryFn: () => getExamById(examId, { grade, department }),
    // !! => convert any value to Boolean (true/false)
    // ? call the query (getExamById) only if examId exists and truthy value,
    // and only once we know the student's grade/department to filter by —
    // otherwise this would briefly query with no targeting filter at all.
    enabled: !!examId && hasTargetingInfo,
    staleTime: 1000 * 60,
  });

  const { attemptStatus, isLoading: isLoadingStatus } = useStudentExamStatus();
  const attemptInfo = attemptStatus[examId];

  return {
    exam,
    isLoading:
      isProfileLoading || !hasTargetingInfo || isLoadingStatus || isLoadingExam,
    error,
    attemptInfo,
  };
}
