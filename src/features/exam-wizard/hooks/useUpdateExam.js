import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateExam } from "../services/examWizardApi";
import { useUser } from "@/features/auth/hooks/useUser";
import toast from "react-hot-toast";

export function useUpdateExam() {
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;

  return useMutation({
    mutationFn: ({ examId, examDetails, questions }) =>
      updateExam(examId, examDetails, questions, instructorId),
    onSuccess: () => {
      toast.success("Exam updated successfully!");
      navigate(`/instructor/exams`, { replace: true });
    },
  });
}
