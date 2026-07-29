import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { setPassword } from "../services/profileApi";

export function useSetPassword() {
  const queryClient = useQueryClient();

  const { mutate: setNewPassword, isPending: isSettingPassword } = useMutation({
    mutationFn: setPassword,
    onSuccess: () => {
      toast.success(
        "Password set successfully, you can now sign in with email too",
      );
      queryClient.setQueryData(["user"], (old) =>
        old ? { ...old, profile: { ...old.profile, has_password: true } } : old,
      );
    },
    onError: (error) => toast.error(error.message || "Couldn't set password"),
  });

  return { setNewPassword, isSettingPassword };
}
