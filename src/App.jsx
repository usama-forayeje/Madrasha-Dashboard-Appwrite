import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Suspense } from "react";
import FullPageSpinner from "./components/shared/FullPageSpinner";


function App() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <RouterProvider router={router} />;
    </Suspense>
  )
}

export default App;
