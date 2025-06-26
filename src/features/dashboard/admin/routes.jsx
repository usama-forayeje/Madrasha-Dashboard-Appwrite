import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboard from "@/pages/admin-dashboard";

export const adminRoutes = {
  path: "admin",
  element: <AdminLayout />,
  children: [{ index: true, element: <AdminDashboard /> }],
};
