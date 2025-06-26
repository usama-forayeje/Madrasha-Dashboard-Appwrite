import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        console.error("Global query error:", error);
        toast.error(error.message || "Something went wrong!");
      },
    },
    mutations: {
      onError: (error) => {
        console.error("Global mutation error:", error);
        toast.error(error.message || "Could not complete the action!");
      },
    },
  },
});
