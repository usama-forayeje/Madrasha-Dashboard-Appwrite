import { useState } from "react";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (email) => {
    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual forgot password logic
      console.log("Forgot password for:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    window.location.href = "/auth/login";
  };

  return (
    <ForgotPasswordForm
      onSubmit={handleSubmit}
      onBack={handleBack}
      isLoading={isLoading}
      error={error}
      success={success}
    />
  );
}
