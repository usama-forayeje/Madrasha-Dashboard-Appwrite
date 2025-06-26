
import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import { AdminRoute } from "./ProtectedRoutes";
import AuthLayout from "@/layouts/AuthLayout";

const LandingPage = lazy(() => import("@/pages/public/LandingPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      // এখানে অন্যান্য পাবলিক পেজ যোগ করুন
      // { path: 'about-us', element: <AboutUs /> },
    ],
  },

  // Auth Routes
  {
    element: <AuthLayout />, 
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      { path: '/register', element: <RegisterPage /> },

    ]
  },


  // Admin Protected Routes (শুধুমাত্র অ্যাডমিনরা দেখতে পারবে)
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            // element: <Dashboard />,
          },
          // { path: 'students', element: <Students /> },
          // { path: 'teachers', element: <Teachers /> },
        ],
      },
    ],
  },

  // Not Found Route
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
