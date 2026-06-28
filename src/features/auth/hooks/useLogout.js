import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.clear();
      navigate("/login", { replace: true });
      toast.success("Signed out successfully.");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isLoggingOut };
}
