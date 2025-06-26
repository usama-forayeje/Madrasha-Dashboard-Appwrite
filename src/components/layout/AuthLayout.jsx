import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Auth Layout</h1>
      <main className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
