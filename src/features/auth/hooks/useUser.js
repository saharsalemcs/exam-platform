import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authApi";
import supabase from "@/services/supabase";
import { useEffect } from "react";

export function useUser() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (
        event === "SIGNED_IN" ||
        event === "INITIAL_SESSION" ||
        event === "TOKEN_REFRESHED"
      ) {
        if (session?.user) {
          const userData = await getCurrentUser();
          queryClient.setQueryData(["user"], userData);
        }
      }

      if (event === "SIGNED_OUT") {
        queryClient.setQueryData(["user"], null);
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  // initial fetch
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  // data === { user, profile }
  return { data, isLoading };
}
