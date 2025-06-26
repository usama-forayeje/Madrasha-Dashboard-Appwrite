import { lazy } from "react";
import AuthLayout from "@/components/layout/AuthLayout";

const LoginPage = lazy(() => import("../../pages/login-page"));
const RegisterPage = lazy(() => import("../../pages/register-page"));
const ForgotPasswordPage = lazy(() => import("../../pages/forgot-password-page"));

export const authRoutes = {
  element: <AuthLayout />,
  children: [
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "auth/forgot-password", element: <ForgotPasswordPage /> },
  ],
};
