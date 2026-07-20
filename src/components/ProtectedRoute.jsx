import { useUser } from "@/features/auth/hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";
import { ROLES } from "@/utils/constants";
import LoadingSpinner from "./shared/LoadingSpinner";

function ProtectedRoute({ allowedRole }) {
  const { data, isLoading } = useUser();

  if (isLoading) return <LoadingSpinner />;

  // Not logged in => go to /login
  if (!data) return <Navigate to="/login" replace />;

  const { profile } = data;

  // Logged in but wrong role => redirect to their correct dashboard
  // يعني لو انا ال كتبت الرول غلط مثلا
  if (allowedRole && profile?.role !== allowedRole) {
    const fallback =
      profile?.role === ROLES.TEACHER
        ? "/instructor/dashboard"
        : "student/dashboard";

    return <Navigate to={fallback} replace />;
  }

  // render the child routes if all checks passed
  return <Outlet />;
}

export default ProtectedRoute;
