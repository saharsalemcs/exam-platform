import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfile } from "../services/profileApi";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: saveProfile, isPending: isSaving } = useMutation({
    mutationFn: ({ userId, ...fields }) => updateProfile(userId, fields),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => toast.error(error.message || "Couldn't update profile"),
  });

  return { saveProfile, isSaving };
}
