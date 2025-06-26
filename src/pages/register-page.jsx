import { useState } from "react";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual registration logic
      console.log("Registration attempt:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success
      window.location.href = "/auth/verify-email";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in");
    // Implement Google OAuth
  };

  const handleSignIn = () => {
    window.location.href = "/auth/login";
  };

  return (
    <RegisterForm
      onSubmit={handleRegister}
      onGoogleSignIn={handleGoogleSignIn}
      onSignIn={handleSignIn}
      isLoading={isLoading}
      error={error}
    />
  );
}
