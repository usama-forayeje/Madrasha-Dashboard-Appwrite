import AdminHeader from '@/components/shared/AdminHeader'
import AdminSidebar from '@/components/shared/AdminSidebar'
import { Outlet } from 'react-router'

function AdminLayout() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout