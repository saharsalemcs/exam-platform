import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], {
        user: data.user,
        profile: data.user.user_metadata,
      });

      const role = data.user?.user_metadata?.role;
      navigate(
        role === "teacher" ? "/teacher/dashboard" : "/student/dashboard",
        { replace: true },
      );
      toast.success("Login successful. Welcome back");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoggingIn };
}
