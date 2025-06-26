import { useState } from "react";
import { Plus, Search, Filter, Download, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";

// Mock data - replace with actual data from your hooks
const mockStats = {
  totalStudents: 1250,
  activeStudents: 1180,
  totalTeachers: 85,
  activeTeachers: 78,
  totalClasses: 45,
  activeClasses: 42,
  attendanceRate: 87.5,
};

const mockActivities = [
  {
    id: "1",
    type: "student_enrolled",
    title: "New Student Enrolled",
    description: "Ahmed Hassan has been enrolled in Class 10-A",
    timestamp: "2 hours ago",
    user: { name: "Ahmed Hassan" },
  },
  {
    id: "2",
    type: "teacher_added",
    title: "New Teacher Added",
    description: "Dr. Fatima Ali joined as Arabic Literature teacher",
    timestamp: "4 hours ago",
    user: { name: "Dr. Fatima Ali" },
  },
  {
    id: "3",
    type: "class_created",
    title: "New Class Created",
    description: "Quran Memorization - Advanced Level has been created",
    timestamp: "1 day ago",
    user: { name: "Admin" },
  },
  {
    id: "4",
    type: "attendance_marked",
    title: "Attendance Marked",
    description: "Morning session attendance completed for Class 9-B",
    timestamp: "2 days ago",
    user: { name: "Ustaz Muhammad" },
  },
];

const mockAttendanceData = [
  { date: "Mon", present: 1150, absent: 100, total: 1250 },
  { date: "Tue", present: 1200, absent: 50, total: 1250 },
  { date: "Wed", present: 1100, absent: 150, total: 1250 },
  { date: "Thu", present: 1180, absent: 70, total: 1250 },
  { date: "Fri", present: 1220, absent: 30, total: 1250 },
];

const upcomingEvents = [
  {
    id: "1",
    title: "Parent-Teacher Meeting",
    date: "Tomorrow, 2:00 PM",
    type: "meeting",
  },
  {
    id: "2",
    title: "Quran Competition",
    date: "Dec 15, 10:00 AM",
    type: "event",
  },
  {
    id: "3",
    title: "Monthly Assessment",
    date: "Dec 20, 9:00 AM",
    type: "exam",
  },
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarInset>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back, Admin</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search..."
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
              Quick Add
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-6 p-6">
        {/* Stats Cards */}
        <StatsCards stats={mockStats} />

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Chart */}
            <AttendanceChart data={mockAttendanceData} />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Add Student</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Add Teacher</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Schedule Class</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    <span className="text-sm">Generate Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <RecentActivity activities={mockActivities} />

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{event.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{event.date}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                  <Badge variant="destructive" className="ml-auto">
                    3
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-900">Low Attendance Alert</p>
                      <p className="text-xs text-red-700 mt-1">
                        Class 8-A has 65% attendance today
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-900">Payment Due</p>
                      <p className="text-xs text-yellow-700 mt-1">15 students have pending fees</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">New Registration</p>
                      <p className="text-xs text-blue-700 mt-1">5 new applications received</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}
