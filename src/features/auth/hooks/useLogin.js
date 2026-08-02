import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, getCurrentUser } from "../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async ({ email, password }) => {
      await loginApi(email, password);
      // Re-fetch through getCurrentUser so the cache gets the real
      // `profiles` row (grade, department, has_password, avatar_url)
      // instead of the auth user_metadata stand-in.
      return getCurrentUser();
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);

      const role = data?.profile?.role;
      toast.success("Login successful. Welcome back");
      navigate(
        role === "teacher" ? "/instructor/dashboard" : "/student/dashboard",
        { replace: true },
      );
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoggingIn };
}
