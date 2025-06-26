import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/queryClient";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/shared/Sidebar";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import FullPageSpinner from "@/components/shared/FullPageSpinner";
import { ThemeProvider } from "@/components/shared/theme-provider";

// Provider Composer Function
const compose = (providers, children) =>
  providers.reduceRight((acc, provider) => {
    const [Provider, props] = Array.isArray(provider) ? provider : [provider, {}];
    return <Provider {...props}>{acc}</Provider>;
  }, children);

export const AppProviders = ({ children }) => {
  const providers = [
    [QueryClientProvider, { client: queryClient }],
    ErrorBoundary,
    [ThemeProvider, { defaultTheme: "system" }],
    SidebarProvider,
  ];

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {compose(providers, children)}
      <Toaster richColors position="top-right" />
    </Suspense>
  );
};
