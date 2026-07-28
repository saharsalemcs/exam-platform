import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePassword } from "../services/profileApi";

export function useUpdatePassword() {
  const { mutate: changePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationFn: updatePassword,
      onSuccess: () => toast.success("Password updated successfully!"),
      onError: (error) =>
        toast.error(error.message || "Couldn't update password"),
    },
  );

  return { changePassword, isUpdatingPassword };
}
