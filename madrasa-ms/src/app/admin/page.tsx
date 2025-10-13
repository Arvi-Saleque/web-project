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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  UserCheck,
  GraduationCap,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, active: true },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Teachers", href: "/admin/teachers", icon: GraduationCap },
    { name: "Classes", href: "/admin/classes", icon: BookOpen },
    { name: "Assignments", href: "/admin/assignments", icon: ClipboardList },
    { name: "Exams", href: "/admin/exams", icon: FileText },
    { name: "Calendar", href: "/admin/calendar", icon: Calendar },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const statsCards = [
    {
      title: "Total Students",
      value: "342",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      title: "Total Teachers",
      value: "28",
      change: "+2",
      trend: "up",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Classes",
      value: "15",
      change: "Ongoing",
      trend: "neutral",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pending Tasks",
      value: "8",
      change: "-3 today",
      trend: "down",
      icon: ClipboardList,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const quickActions = [
    {
      title: "Add Student",
      href: "/admin/students/add",
      icon: Users,
      color: "bg-cyan-600",
    },
    {
      title: "Create Exam",
      href: "/admin/exams/create",
      icon: FileText,
      color: "bg-blue-600",
    },
    {
      title: "Schedule Class",
      href: "/admin/classes/schedule",
      icon: Calendar,
      color: "bg-purple-600",
    },
    {
      title: "Send Notice",
      href: "/admin/notifications/send",
      icon: Bell,
      color: "bg-amber-600",
    },
  ];

  const recentActivities = [
    {
      action: "New student enrolled",
      name: "Ahmed Hassan",
      time: "10 minutes ago",
      type: "student",
    },
    {
      action: "Exam result published",
      name: "Midterm 2024",
      time: "1 hour ago",
      type: "exam",
    },
    {
      action: "Assignment submitted",
      name: "Islamic Studies - Class 8",
      time: "2 hours ago",
      type: "assignment",
    },
    {
      action: "Teacher added",
      name: "Fatima Rahman",
      time: "5 hours ago",
      type: "teacher",
    },
    {
      action: "Notice sent",
      name: "School Holiday Announcement",
      time: "1 day ago",
      type: "notice",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-lg"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-cyan-600">Madrasa Admin</h1>
            <p className="text-sm text-slate-600 mt-1">Management Portal</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    item.active
                      ? "bg-cyan-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-slate-200">
            <Link
              href="/admin/login"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Dashboard Overview
          </h2>
          <p className="text-slate-600 mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-2">
                        {stat.title}
                      </p>
                      <h3 className="text-3xl font-bold text-slate-900">
                        {stat.value}
                      </h3>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === "up" && (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : stat.trend === "down"
                              ? "text-red-600"
                              : "text-slate-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="border-none shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used actions for quick access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group p-6 rounded-lg border-2 border-slate-200 hover:border-cyan-600 transition-all hover:shadow-lg"
                  >
                    <div
                      className={`${action.color} text-white p-3 rounded-lg inline-block mb-3`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">
                      {action.title}
                    </h4>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-cyan-600 transition-colors mt-2" />
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest updates and actions in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          activity.type === "student"
                            ? "bg-cyan-100 text-cyan-600"
                            : activity.type === "exam"
                            ? "bg-blue-100 text-blue-600"
                            : activity.type === "assignment"
                            ? "bg-purple-100 text-purple-600"
                            : activity.type === "teacher"
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {activity.type === "student" && (
                          <Users className="h-5 w-5" />
                        )}
                        {activity.type === "exam" && (
                          <FileText className="h-5 w-5" />
                        )}
                        {activity.type === "assignment" && (
                          <ClipboardList className="h-5 w-5" />
                        )}
                        {activity.type === "teacher" && (
                          <UserCheck className="h-5 w-5" />
                        )}
                        {activity.type === "notice" && (
                          <Bell className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-medium">
                        {activity.action}
                      </p>
                      <p className="text-slate-600 text-sm">{activity.name}</p>
                      <p className="text-slate-400 text-xs mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  {index < recentActivities.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
