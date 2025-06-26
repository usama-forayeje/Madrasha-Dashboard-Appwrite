import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/authService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const authKeys = {
  all: ["auth"],
  currentUser: () => [...authKeys.all, "current-user"],
  session: () => [...authKeys.all, "session"],
  preferences: () => [...authKeys.all, "preferences"],
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => authService.getCurrentUser(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error.code === 401) return false;
      return failureCount < 2;
    },
    refetchOnWindowFocus: false,
    meta: {
      isAuth: true,
      requiresAuth: true
    }
  });
}

export function useCurrentSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: () => authService.getCurrentSession(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    meta: {
      isAuth: true,
      requiresAuth: true
    }
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password, name }) => authService.createAccount(email, password, name),
    onMutate: () => {
      toast.loading("Account is being created...", { id: "signup" });
    },
    onSuccess: async () => {
      toast.dismiss("signup");
      await queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      await authService.createEmailVerification();
      toast.success("Account created successfully! Please verify your email.");
      navigate("/auth/verify-email");
    },
    onError: (error) => {
      toast.dismiss("signup");
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => authService.createEmailSession(email, password),
    onMutate: () => {
      toast.loading("Login in progress...", { id: "signin" });
    },
    onSuccess: async () => {
      toast.dismiss("signin");
      await queryClient.invalidateQueries({ queryKey: authKeys.all });
      toast.success("Login successful!");

      const redirectTo = sessionStorage.getItem("redirectAfterLogin") || "/dashboard";
      sessionStorage.removeItem("redirectAfterLogin");
      navigate(redirectTo, { replace: true });
    },
    onError: (error) => {
      toast.dismiss("signin");
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useGoogleAuth() {
  return useMutation({
    mutationFn: () => authService.createOAuthSession(),
    onMutate: () => {
      toast.loading("Signing in with Google...", { id: "google-auth" });
    },
    onSuccess: () => {
      toast.dismiss("google-auth");
    },
    onError: (error) => {
      toast.dismiss("google-auth");
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onMutate: () => {
      toast.loading("Signing out...", { id: "signout" });
    },
    onSuccess: () => {
      toast.dismiss("signout");
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.removeQueries({
        predicate: (query) => query.meta?.requiresAuth
      });

      sessionStorage.clear();
      localStorage.removeItem("user-preferences");

      toast.success("Logout successful!");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.dismiss("signout");
      navigate("/login", { replace: true });
      toast.error("Logout failed.");
    },
  });
}

export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (email) => authService.createPasswordRecovery(email),
    onMutate: () => {
      toast.loading("Password reset link is being sent...", { id: "forgot-password" });
    },
    onSuccess: (_, email) => {
      toast.dismiss("forgot-password");
      toast.success("Password reset link sent successfully!");
      navigate("/auth/check-email", { state: { email } });
    },
    onError: (error) => {
      toast.dismiss("forgot-password");
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ userId, secret, password }) =>
      authService.completePasswordRecovery(userId, secret, password),
    onMutate: () => {
      toast.loading("Resetting password...", { id: "reset-password" });
    },
    onSuccess: () => {
      toast.dismiss("reset-password");
      toast.success("Password reset successfully!");
      navigate("/login");
    },
    onError: (error) => {
      toast.dismiss("reset-password");
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newPassword, oldPassword }) =>
      authService.updatePassword(newPassword, oldPassword),
    onMutate: () => {
      toast.loading("Changing password...", { id: "change-password" });
    },
    onSuccess: () => {
      toast.dismiss("change-password");
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      toast.success("Password changed successfully!");
    },
    onError: (error) => {
      toast.dismiss("change-password");
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useVerifyEmail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ userId, secret }) => authService.completeEmailVerification(userId, secret),
    onMutate: () => {
      toast.loading("Verifying email...", { id: "verify-email" });
    },
    onSuccess: () => {
      toast.dismiss("verify-email");
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      toast.success("Email verified successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.dismiss("verify-email");
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email, password }) => {
      const promises = [];

      if (name) promises.push(authService.updateName(name));
      if (email && password) promises.push(authService.updateEmail(email, password));

      await Promise.all(promises);
    },
    onMutate: ({ name }) => {
      toast.loading("Updating profile...", { id: "update-profile" });

      if (name) {
        const previousUser = queryClient.getQueryData(authKeys.currentUser());
        queryClient.setQueryData(authKeys.currentUser(), (old) => ({
          ...old,
          name
        }));
        return { previousUser };
      }
    },
    onSuccess: () => {
      toast.dismiss("update-profile");
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      toast.success("Profile updated successfully!");
    },
    onError: (error, variables, context) => {
      toast.dismiss("update-profile");

      if (context?.previousUser) {
        queryClient.setQueryData(authKeys.currentUser(), context.previousUser);
      }

      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences) => authService.updatePreferences(preferences),
    onMutate: (newPreferences) => {
      const previousPrefs = queryClient.getQueryData(authKeys.preferences());
      queryClient.setQueryData(authKeys.preferences(), newPreferences);

      localStorage.setItem("user-preferences", JSON.stringify(newPreferences));

      return { previousPrefs };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.preferences() });
      toast.success("Preferences updated successfully!");
    },
    onError: (error, variables, context) => {
      if (context?.previousPrefs) {
        queryClient.setQueryData(authKeys.preferences(), context.previousPrefs);
        localStorage.setItem("user-preferences", JSON.stringify(context.previousPrefs));
      }

      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: () => authService.createEmailVerification(),
    onMutate: () => {
      toast.loading("Resend verification email...", { id: "resend-verification" });
    },
    onSuccess: () => {
      toast.dismiss("resend-verification");
      toast.success("Verification email sent successfully!");
    },
    onError: (error) => {
      toast.dismiss("resend-verification");
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

function getAuthErrorMessage(error) {
  switch (error.type || error.code) {
    case 'user_already_exists':
      return 'Account already exists with this email';
    case 'user_invalid_credentials':
      return 'Invalid email or password';
    case 'user_not_found':
      return 'Account not found with this email';
    case 'user_email_not_confirmed':
      return 'Account not confirmed. Please verify your email';
    case 'user_blocked':
      return 'Account is blocked. Please contact support';
    case 'password_mismatch':
      return 'Password mismatch';
    case 'password_recently_used':
      return 'Password recently used. Please choose a different password';
    case 'general_rate_limit_exceeded':
      return 'Too many requests. Please try again later';
    case 401:
      return 'To perform this action, you need to sign in first';
    case 403:
      return 'You are not authorized to perform this action';
    case 429:
      return 'Too many requests. Please try again later';
    case 500:
    case 502:
    case 503:
      return 'Something went wrong. Please try again later';
    default:
      return error.message || 'Something went wrong. Please try again later';
  }
}