import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/authService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const authKeys = {
  all: ["auth"],
  currentUser: () => [...authKeys.all, "current-user"],
  session: () => [...authKeys.all, "session"],
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => authService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

export function useCurrentSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: () => authService.getCurrentSession(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password, name }) => authService.createAccount(email, password, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      toast.success("Account created successfully! Please verify your email.");
      navigate("/auth/verify-email");
    },
    onError: (error) => {
      toast.error(error.message || "Sign up failed. Please try again.");
      console.error("Sign up error:", error);
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => authService.createEmailSession(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      toast.success("Welcome back! You have successfully signed in.");
      navigate("/dashboard");
    },
    onError: (error) => {
      const errorMessage = error.message || "Invalid credentials. Please try again.";
      toast.error(errorMessage);
      console.error("Sign in error:", error);
    },
  });
}

export function useGoogleAuth() {
  return useMutation({
    mutationFn: () => authService.createOAuthSession(),
    onError: (error) => {
      toast.error(error.message || "Google sign-in failed. Please try again.");
      console.error("Google auth error:", error);
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      toast.success("You've been successfully signed out.");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Sign out failed. Please try again.");
      console.error("Sign out error:", error);
    },
  });
}

export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (email) => authService.createPasswordRecovery(email),
    onSuccess: (_, email) => {
      toast.success("Password reset link sent. Check your email!");
      navigate("/auth/check-email", { state: { email } });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reset link.");
      console.error("Forgot password error:", error);
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ userId, secret, password }) =>
      authService.completePasswordRecovery(userId, secret, password),
    onSuccess: () => {
      navigate("/login");
      toast.success("Password reset successfully.");
    },
    onError: (error) => {
      toast.error(error.message || "Password reset failed.");
      console.error("Reset password error:", error);
    },
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newPassword, oldPassword }) =>
      authService.updatePassword(newPassword, oldPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      toast.success("Password changed successfully.");
    },
    onError: (error) => {
      toast.error(error.message || "Password change failed.");
      console.error("Change password error:", error);
    },
  });
}

export function useVerifyEmail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ userId, secret }) => authService.completeEmailVerification(userId, secret),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      toast.success("Email verified successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Email verification failed.");
      console.error("Email verification error:", error);
    },
  });
}
