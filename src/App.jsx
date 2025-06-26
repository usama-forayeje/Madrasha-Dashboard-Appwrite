import { RouterProvider } from "react-router";
import { AppProviders } from "./providers/AppProviders";
import { router } from "./routes";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
