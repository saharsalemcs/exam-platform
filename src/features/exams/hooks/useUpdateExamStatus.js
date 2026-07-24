import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/features/auth/hooks/useUser";
import { updateExamStatus } from "../services/examsApi";

export function useUpdateExamStatus() {
  const queryClient = useQueryClient();
  const { data: userData } = useUser();
  const instructorId = userData?.profile?.id;

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({ examId, status }) =>
      updateExamStatus(examId, status, instructorId),
    onSuccess: (_, { status }) => {
      toast.success(`Exam status updated to "${status}"`);
      queryClient.invalidateQueries({ queryKey: ["instructor-exams"] });
    },
    onError: (error) => {
      toast.error(error.message || "Couldn't update exam status");
    },
  });

  return { updateStatus, isUpdatingStatus };
}
