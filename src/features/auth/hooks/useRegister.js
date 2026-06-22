import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../services/authApi";
import toast from "react-hot-toast";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: ({ fullName, email, password, role }) =>
      registerApi(fullName, email, password, role),

    onSuccess: () => {
      toast.success(
        "Account created successfully! Please verify the new account from the user's email address",
      );

      // if (requiresEmailConfirmation) {
      //   toast.success("Check your inbox to confirm your email.");
      //   return;
      // }

      // queryClient.setQueryData(["user"], {
      //   user: data.user,
      //   profile: data.user.user_metadata,
      // });

      // const role = data.user?.user_metadata?.role;
      // navigate(
      //   role === "teacher" ? "/teacher/dashboard" : "/student/dashboard",
      //   { replace: true },
      // );
      // toast.success("Account created successfully! Welcome to EduTest.");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { register, isRegistering };
}
