import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadAvatar } from "../services/profileApi";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  const { mutate: uploadPhoto, isPending: isUploading } = useMutation({
    mutationFn: ({ userId, file }) => uploadAvatar(userId, file),
    onSuccess: () => {
      toast.success("Profile photo updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => toast.error(error.message || "Couldn't upload photo"),
  });

  return { uploadPhoto, isUploading };
}
