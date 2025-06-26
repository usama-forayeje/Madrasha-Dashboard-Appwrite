import React from "react";
import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-blue-50">
      <header className="p-4 bg-blue-600 text-white shadow-md">Admin Dashboard</header>
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
