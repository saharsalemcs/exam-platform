// exam => exam details from getExamById
// attemptInfo => { status, attemptId }

import { useQuery } from "@tanstack/react-query";
import { getExamById } from "../services/examsApi";
import { useStudentExamStatus } from "./useStudentExamStatus";

export function useExamDetails(examId) {
  const {
    data: exam,
    isLoading: isLoadingExam,
    error,
  } = useQuery({
    queryKey: ["exam", examId],
    queryFn: () => getExamById(examId),
    // !! => convert any value to Boolean (true/false)
    // ? call the query (getExamById) only if examId exists and truthy value
    enabled: !!examId,
    staleTime: 1000 * 60,
  });

  const { attemptStatus, isLoading: isLoadingStatus } = useStudentExamStatus();
  const attemptInfo = attemptStatus[examId];

  return {
    exam,
    isLoading: isLoadingStatus || isLoadingExam,
    error,
    attemptInfo,
  };
}
