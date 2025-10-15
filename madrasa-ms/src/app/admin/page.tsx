"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Settings,
  Menu,
  Bell,
  LogOut,
  TrendingUp,
  UserCheck,
  Award,
  Clock,
  Home,
  Info,
  Newspaper,
  Phone,
  ChevronDown,
  ChevronRight,
  ImageIcon,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      id: "header",
      label: "Header Slider",
      icon: ImageIcon,
      href: "/admin/header",
    },
    {
      id: "homepage",
      label: "Homepage Content",
      icon: FileText,
      href: "/admin/homepage",
    },
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      id: "about",
      label: "About Us",
      icon: Info,
      items: [
        { label: "About", href: "/about" },
        { label: "Mission & Vision", href: "/about/mission-vission" },
        { label: "Teachers Panel", href: "/about/teachers" },
        { label: "Committee", href: "/about/committee" },
      ],
    },
    {
      id: "academic",
      label: "Academic",
      icon: GraduationCap,
      items: [
        { label: "Assignment Management", href: "/admin/academic/assignment" },
        { label: "Daily Assignments", href: "/academic/assignments" },
        { label: "Exam Routing", href: "/academic/exams" },
        { label: "Class Routine", href: "/academic/routine" },
        { label: "Exam Results", href: "/academic/results" },
      ],
    },
    {
      id: "news",
      label: "News & Events",
      icon: Newspaper,
      href: "/news-events",
    },
    {
      id: "contact",
      label: "Contact Us",
      icon: Phone,
      href: "/contact",
    },
    {
      id: "students",
      label: "Students",
      icon: Users,
      href: "/admin/students",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  const stats = [
    {
      label: "Total Students",
      value: "482",
      change: "+12",
      icon: Users,
      color: "text-cyan-600",
    },
    {
      label: "Total Teachers",
      value: "48",
      change: "+3",
      icon: GraduationCap,
      color: "text-purple-600",
    },
    {
      label: "Active Courses",
      value: "24",
      change: "+2",
      icon: BookOpen,
      color: "text-amber-600",
    },
    {
      label: "Attendance Rate",
      value: "94%",
      change: "+2%",
      icon: UserCheck,
      color: "text-green-600",
    },
  ];

  const recentActivities = [
    {
      title: "New student admission",
      desc: "Ahmed Hassan enrolled",
      time: "2 hours ago",
      type: "admission",
    },
    {
      title: "Exam scheduled",
      desc: "Quran test for Grade 5",
      time: "3 hours ago",
      type: "exam",
    },
    {
      title: "Teacher assigned",
      desc: "Mr. Karim to Arabic Class",
      time: "5 hours ago",
      type: "teacher",
    },
    {
      title: "Result published",
      desc: "Monthly exam results",
      time: "1 day ago",
      type: "result",
    },
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Meeting", date: "Oct 10, 2025", time: "10:00 AM" },
    { title: "Quran Competition", date: "Oct 15, 2025", time: "2:00 PM" },
    { title: "Staff Training", date: "Oct 18, 2025", time: "9:00 AM" },
  ];

  const NavItems = () => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isExpanded = expandedMenus.includes(item.id);

        if (item.items) {
          // Dropdown menu item
          return (
            <div key={item.id}>
              <button
                onClick={() => toggleMenu(item.id)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.items.map((subItem, index) => (
                    <Link
                      key={index}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-cyan-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Regular menu item
        return (
          <Link
            key={item.id}
            href={item.href!}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === item.id
                ? "bg-cyan-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-cyan-600">
                    Admin Panel
                  </h2>
                </div>
                <Separator />
                <div className="p-4">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Link href="/admin/login">
              <Button variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="p-6">
            <h2 className="text-xl font-bold text-cyan-600 mb-6">
              Admin Panel
            </h2>
            <NavItems />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cyan-600" />
                  Recent Activities
                </CardTitle>
                <CardDescription>
                  Latest updates and changes in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          activity.type === "admission"
                            ? "bg-cyan-100"
                            : activity.type === "exam"
                            ? "bg-purple-100"
                            : activity.type === "teacher"
                            ? "bg-amber-100"
                            : "bg-green-100"
                        }`}
                      >
                        {activity.type === "admission" && (
                          <Users className="h-5 w-5 text-cyan-600" />
                        )}
                        {activity.type === "exam" && (
                          <FileText className="h-5 w-5 text-purple-600" />
                        )}
                        {activity.type === "teacher" && (
                          <GraduationCap className="h-5 w-5 text-amber-600" />
                        )}
                        {activity.type === "result" && (
                          <Award className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-600">{activity.desc}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cyan-600" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Scheduled activities and meetings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="p-3 border border-gray-200 rounded-lg hover:border-cyan-600 transition-colors"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/students">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col gap-2 hover:bg-cyan-50 hover:border-cyan-600"
                  >
                    <Users className="h-6 w-6" />
                    <span>Add Student</span>
                  </Button>
                </Link>
                <Link href="/admin/teachers">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col gap-2 hover:bg-cyan-50 hover:border-cyan-600"
                  >
                    <GraduationCap className="h-6 w-6" />
                    <span>Add Teacher</span>
                  </Button>
                </Link>
                <Link href="/admin/exams">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col gap-2 hover:bg-cyan-50 hover:border-cyan-600"
                  >
                    <FileText className="h-6 w-6" />
                    <span>Create Exam</span>
                  </Button>
                </Link>
                <Link href="/admin/calendar">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col gap-2 hover:bg-cyan-50 hover:border-cyan-600"
                  >
                    <Calendar className="h-6 w-6" />
                    <span>Add Event</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
