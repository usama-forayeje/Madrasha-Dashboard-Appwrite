import RootLayout from "@/components/layout/RootLayout";
import { createBrowserRouter } from "react-router";
import { AuthGuard, ProtectedRoute, RoleBasedRoute } from "./guards";
import { lazy } from "react";
import { authRoutes } from "@/features/auth/routes";
import { adminRoutes } from "@/features/dashboard/admin/routes";
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthGuard />,
        children: [{ index: true, element: <LandingPage /> }, authRoutes],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <RoleBasedRoute allowedRoles={["admin", "super_admin"]} />,
            children: [adminRoutes],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
