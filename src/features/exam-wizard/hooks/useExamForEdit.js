import { useQuery } from "@tanstack/react-query";
import { getExamById } from "../services/examWizardApi";
import { useUser } from "@/features/auth/hooks/useUser";

/**
 * Loads an existing exam (with questions) for the edit wizard.
 * Disabled entirely in create mode (no examId) or before the
 * instructor's profile id is available.
 */
export function useExamForEdit(examId) {
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;

  return useQuery({
    queryKey: ["exam-edit", examId],
    queryFn: () => getExamById(examId, instructorId),
    enabled: Boolean(examId) && Boolean(instructorId),
  });
}
