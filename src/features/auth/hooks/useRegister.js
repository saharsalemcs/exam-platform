import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { register as registerApi } from "@/features/auth/services/authApi";

export function useRegister() {
  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: ({ fullName, email, password, role }) =>
      registerApi(fullName, email, password, role),

    onSuccess: () => {
      toast.success("Check your inbox to confirm your email.");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { register, isRegistering };
}
