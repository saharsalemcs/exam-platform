import { useUser } from "@/features/auth/hooks/useUser";
import { ROLES } from "@/utils/constants";

/**
 * Landing CTAs are auth-aware: a signed-in visitor is sent to their own
 * portal instead of being asked to register again. Route protection still
 * happens in ProtectedRoute — this only picks the destination.
 */
export function useLandingCta() {
  const { data } = useUser();

  const isAuthenticated = Boolean(data?.user);
  const dashboardPath =
    data?.profile?.role === ROLES.TEACHER
      ? "/instructor/dashboard"
      : "/student/dashboard";

  return {
    isAuthenticated,
    primaryTo: isAuthenticated ? dashboardPath : "/register",
    primaryLabel: isAuthenticated ? "Go to dashboard" : "Create free account",
    secondaryTo: "/login",
    secondaryLabel: "Sign in",
  };
}
