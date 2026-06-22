/**
 * useUser — fetches the current logged-in user + their profile.
 *
 * This is the single source of truth for "who is logged in".
 * Used in ProtectedRoute, Sidebar, Header, and anywhere role matters.
 *
 * Returns:
 *   data        — { user, profile } or null if not logged in
 *   isLoading   — true on first load (showing splash screen)
 *   isError     — something went wrong
 *
 * React Query caches this. It won't re-fetch on every component mount —
 * only when the window regains focus or staleTime expires.
 */

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authApi";

export function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  // data === { user, profile }
  return { data, isLoading };
}
