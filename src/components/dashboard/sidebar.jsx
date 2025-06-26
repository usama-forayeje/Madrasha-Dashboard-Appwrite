import { useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  UserCheck,
  FileText,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const navigationItems = {
  admin: [
    {
      title: "Dashboard",
      icon: Home,
      url: "/admin/dashboard",
    },
    {
      title: "Students",
      icon: Users,
      url: "/admin/students",
      submenu: [
        { title: "All Students", url: "/admin/students" },
        { title: "Add Student", url: "/admin/students/add" },
        { title: "Student Reports", url: "/admin/students/reports" },
      ],
    },
    {
      title: "Teachers",
      icon: GraduationCap,
      url: "/admin/teachers",
      submenu: [
        { title: "All Teachers", url: "/admin/teachers" },
        { title: "Add Teacher", url: "/admin/teachers/add" },
        { title: "Teacher Performance", url: "/admin/teachers/performance" },
      ],
    },
    {
      title: "Classes",
      icon: BookOpen,
      url: "/admin/classes",
      submenu: [
        { title: "All Classes", url: "/admin/classes" },
        { title: "Create Class", url: "/admin/classes/create" },
        { title: "Class Schedule", url: "/admin/classes/schedule" },
      ],
    },
    {
      title: "Attendance",
      icon: UserCheck,
      url: "/admin/attendance",
      submenu: [
        { title: "Daily Attendance", url: "/admin/attendance/daily" },
        { title: "Attendance Reports", url: "/admin/attendance/reports" },
        { title: "Attendance Analytics", url: "/admin/attendance/analytics" },
      ],
    },
    {
      title: "Reports",
      icon: BarChart3,
      url: "/admin/reports",
      submenu: [
        { title: "Academic Reports", url: "/admin/reports/academic" },
        { title: "Financial Reports", url: "/admin/reports/financial" },
        { title: "Custom Reports", url: "/admin/reports/custom" },
      ],
    },
    {
      title: "Calendar",
      icon: Calendar,
      url: "/admin/calendar",
    },
    {
      title: "Notifications",
      icon: Bell,
      url: "/admin/notifications",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/admin/settings",
      submenu: [
        { title: "General", url: "/admin/settings/general" },
        { title: "Users & Permissions", url: "/admin/settings/users" },
        { title: "System Settings", url: "/admin/settings/system" },
      ],
    },
  ],
  teacher: [
    {
      title: "Dashboard",
      icon: Home,
      url: "/teacher/dashboard",
    },
    {
      title: "My Classes",
      icon: BookOpen,
      url: "/teacher/classes",
    },
    {
      title: "Students",
      icon: Users,
      url: "/teacher/students",
    },
    {
      title: "Attendance",
      icon: UserCheck,
      url: "/teacher/attendance",
    },
    {
      title: "Reports",
      icon: FileText,
      url: "/teacher/reports",
    },
    {
      title: "Calendar",
      icon: Calendar,
      url: "/teacher/calendar",
    },
  ],
  student: [
    {
      title: "Dashboard",
      icon: Home,
      url: "/student/dashboard",
    },
    {
      title: "My Classes",
      icon: BookOpen,
      url: "/student/classes",
    },
    {
      title: "Attendance",
      icon: UserCheck,
      url: "/student/attendance",
    },
    {
      title: "Reports",
      icon: FileText,
      url: "/student/reports",
    },
    {
      title: "Calendar",
      icon: Calendar,
      url: "/student/calendar",
    },
  ],
};

export function AppSidebar({ user, onSignOut }) {
  const { state } = useSidebar();
  const [openItems, setOpenItems] = useState([]);

  const userRole = user?.role || "student";
  const menuItems = navigationItems[userRole] || navigationItems.student;

  const toggleItem = (title) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
      case "super_admin":
        return "bg-red-100 text-red-700";
      case "teacher":
        return "bg-blue-100 text-blue-700";
      case "student":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Sidebar variant="inset" className="border-r border-slate-200">
      <SidebarHeader className="border-b border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-semibold text-slate-900">Manzil Institute</h2>
              <p className="text-xs text-slate-500">Management System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <Collapsible
                      open={openItems.includes(item.title)}
                      onOpenChange={() => toggleItem(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="w-full justify-between hover:bg-slate-100"
                          tooltip={state === "collapsed" ? item.title : undefined}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openItems.includes(item.title) ? "rotate-180" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url} className="hover:bg-slate-50">
                                  {subItem.title}
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-slate-100"
                      tooltip={state === "collapsed" ? item.title : undefined}
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-2 hover:bg-slate-100"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-medium">
                  {user?.name ? getUserInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              {state === "expanded" && (
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {user?.name || "User"}
                    </p>
                    <span
                      className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getRoleColor(userRole)}`}
                    >
                      {userRole}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
