import { useUser } from "@/features/auth/hooks/useUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROLES } from "@/utils/constants";
import LoadingSpinner from "./shared/LoadingSpinner";

function ProtectedRoute({ allowedRole }) {
  const { data, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  // Not logged in => go to /login
  if (!data) return <Navigate to="/login" replace />;

  const { profile } = data;

  if (allowedRole && profile?.role !== allowedRole) {
    const fallback =
      profile?.role === ROLES.TEACHER
        ? "/instructor/dashboard"
        : "/student/dashboard";

    return <Navigate to={fallback} replace />;
  }

  if (
    profile?.role === ROLES.STUDENT &&
    (!profile.grade || !profile.department) &&
    location.pathname !== "/complete-profile"
  ) {
    return <Navigate to="/complete-profile" replace />;
  }

  // render the child routes if all checks passed
  return <Outlet />;
}

export default ProtectedRoute;
