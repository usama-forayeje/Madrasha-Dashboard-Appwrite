import { Navigate, Outlet } from "react-router";
import FullPageSpinner from "@/components/shared/FullPageSpinner";
import { useCurrentUser } from "@/hooks/useAuth";

export const AuthGuard = () => {
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading) return <FullPageSpinner />;
  if (user) {
    const role = user.prefs?.role || "student";
    const path =
      { admin: "/admin", super_admin: "/admin", teacher: "/teacher", student: "/student" }[role] ||
      "/student";
    return <Navigate to={path} replace />;
  }
  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading) return <FullPageSpinner />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const RoleBasedRoute = ({ allowedRoles }) => {
  const { data: user } = useCurrentUser();
  const userRole = user?.prefs?.role;
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};
