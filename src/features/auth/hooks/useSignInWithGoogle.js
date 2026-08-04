import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle as signInWithGoogleApi } from "../services/authApi";
import toast from "react-hot-toast";

export function useSignInWithGoogle() {
  const { mutate: singInWithGoogle, isPending: isSigningIn } = useMutation({
    mutationFn: () => signInWithGoogleApi(),
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { singInWithGoogle, isSigningIn };
}
