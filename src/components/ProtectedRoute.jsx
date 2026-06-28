import { useUser } from "@/features/auth/hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "./shared/LoadingSpinner";
import { ROLES } from "@/constants/roles";

function ProtectedRoute({ allowedRole }) {
  const { data, isLoading } = useUser();

  if (isLoading) return <LoadingSpinner />;

  if (!data) return <Navigate to="/login" replace />;

  const { profile } = data;

  if (allowedRole && profile?.role !== allowedRole) {
    const fallback =
      profile?.role === ROLES.TEACHER
        ? "/teacher/dashboard"
        : "student/dashboard";

    return <Navigate to={fallback} replace />;
  }

  // render the child routes if all checks passed
  return <Outlet />;
}

export default ProtectedRoute;
