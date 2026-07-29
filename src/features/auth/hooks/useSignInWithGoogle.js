import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle } from "../services/authApi";
import toast from "react-hot-toast";

export function useSignInWithGoogle() {
  const { mutate: singInWithGoogle, isPending: isSigningIn } = useMutation({
    mutationFn: () => signInWithGoogle(),
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { singInWithGoogle, isSigningIn };
}
