import { Outlet } from "react-router";

function TeacherLayout() {
  return (
    <div className="min-h-screen bg-green-50">
      <header className="p-4 bg-green-600 text-white shadow-md">Student Dashboard</header>
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default TeacherLayout;
