import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { publishExam } from "../services/examWizardApi";
import { useUser } from "@/features/auth/hooks/useUser";

export function usePublishExam() {
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;

  return useMutation({
    mutationFn: ({ examDetails, questions }) =>
      publishExam(examDetails, questions, instructorId),
    onSuccess: (examId) => {
      navigate(`/instructor/exams/${examId}`, { replace: true });
    },
  });
}
