import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExam } from "../services/examsApi";
import { useUser } from "@/features/auth/hooks/useUser";
import toast from "react-hot-toast";

export function useDeleteExam() {
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;
  const queryClient = useQueryClient();

  const { mutate: removeExam, isPending: isDeletingExam } = useMutation({
    mutationFn: (examId) => deleteExam(examId, instructorId),
    onSuccess: () => {
      toast.success("Exam deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["instructor-exams"] });
    },
    onError: (error) => {
      toast.error(error.message || "Couldn't delete this exam");
    },
  });

  return { removeExam, isDeletingExam };
}
