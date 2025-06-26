import { AppProviders } from "@/providers/AppProviders";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
}

export default RootLayout;
