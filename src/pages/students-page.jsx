import { useState } from "react";
import { Plus, Search, Filter, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { StudentsTable } from "@/components/students/students-table";

// Mock data - replace with actual data from your hooks
const mockStudents = [
  {
    id: "STU001",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+880 1234-567890",
    class: "Class 10-A",
    status: "active",
    enrollmentDate: "Jan 15, 2024",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "STU002",
    name: "Fatima Ali",
    email: "fatima.ali@email.com",
    phone: "+880 1234-567891",
    class: "Class 9-B",
    status: "active",
    enrollmentDate: "Feb 20, 2024",
  },
  {
    id: "STU003",
    name: "Muhammad Rahman",
    email: "muhammad.rahman@email.com",
    phone: "+880 1234-567892",
    class: "Class 8-A",
    status: "inactive",
    enrollmentDate: "Mar 10, 2024",
  },
  {
    id: "STU004",
    name: "Aisha Khan",
    email: "aisha.khan@email.com",
    phone: "+880 1234-567893",
    class: "Class 11-A",
    status: "suspended",
    enrollmentDate: "Apr 5, 2024",
  },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students] = useState(mockStudents);
  const [isLoading] = useState(false);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (student) => {
    console.log("Edit student:", student);
    // Navigate to edit page or open modal
  };

  const handleDelete = (studentId) => {
    console.log("Delete student:", studentId);
    // Implement delete logic
  };

  const handleView = (student) => {
    console.log("View student:", student);
    // Navigate to student details page
  };

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    inactive: students.filter((s) => s.status === "inactive").length,
    suspended: students.filter((s) => s.status === "suspended").length,
  };

  return (
    <SidebarInset>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Students</h1>
            <p className="text-sm text-slate-500">Manage student information and records</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 bg-slate-50 border-slate-200"
              />
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Students</CardTitle>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Inactive Students
              </CardTitle>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.inactive}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Suspended Students
              </CardTitle>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.suspended}</div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">All Students</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <StudentsTable
              students={filteredStudents}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  );
}
