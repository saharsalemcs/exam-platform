import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { publishExam } from "../services/examWizardApi";
import { useUser } from "@/features/auth/hooks/useUser";
import toast from "react-hot-toast";

export function usePublishExam() {
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;

  return useMutation({
    mutationFn: ({ examDetails, questions }) =>
      publishExam(examDetails, questions, instructorId),
    onSuccess: () => {
      toast.success("Exam published successfully!");
      navigate(`/instructor/exams-management`, { replace: true });
    },
  });
}
