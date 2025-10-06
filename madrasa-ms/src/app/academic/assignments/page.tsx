"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  FileText,
  Award,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

interface Assignment {
  id: string;
  class: string;
  section: string;
  subject: string;
  name: string;
  instructions: string;
  assignDate: string;
  submissionDate: string;
  marks: number;
  priority: "high" | "medium" | "low";
}

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("all");

  const assignments: Assignment[] = [
    {
      id: "ASG-001",
      class: "Grade 10",
      section: "A",
      subject: "Islamic Studies",
      name: "Tafsir of Surah Al-Baqarah",
      instructions:
        "Write a detailed tafsir covering verses 1-20 with proper references",
      assignDate: "2025-09-25",
      submissionDate: "2025-10-10",
      marks: 50,
      priority: "high",
    },
    {
      id: "ASG-002",
      class: "Grade 9",
      section: "B",
      subject: "Arabic Language",
      name: "Arabic Grammar Exercise",
      instructions:
        "Complete exercises on page 45-50 focusing on verb conjugations",
      assignDate: "2025-09-28",
      submissionDate: "2025-10-08",
      marks: 30,
      priority: "medium",
    },
    {
      id: "ASG-003",
      class: "Grade 11",
      section: "A",
      subject: "Hadith Studies",
      name: "Analysis of Sahih Bukhari",
      instructions:
        "Analyze 10 hadiths from the Book of Faith with chain of narrators",
      assignDate: "2025-09-20",
      submissionDate: "2025-10-05",
      marks: 40,
      priority: "high",
    },
    {
      id: "ASG-004",
      class: "Grade 8",
      section: "C",
      subject: "Quran Memorization",
      name: "Surah Al-Mulk Memorization",
      instructions: "Memorize complete Surah Al-Mulk with proper tajweed",
      assignDate: "2025-09-22",
      submissionDate: "2025-10-15",
      marks: 100,
      priority: "medium",
    },
    {
      id: "ASG-005",
      class: "Grade 10",
      section: "B",
      subject: "Fiqh",
      name: "Rules of Wudu and Prayer",
      instructions:
        "Write detailed notes on the fiqh rulings of wudu and prayer",
      assignDate: "2025-09-30",
      submissionDate: "2025-10-12",
      marks: 35,
      priority: "low",
    },
    {
      id: "ASG-006",
      class: "Grade 9",
      section: "A",
      subject: "Islamic History",
      name: "The Life of Prophet Muhammad (SAW)",
      instructions:
        "Research and write about the Medinan period (5 pages minimum)",
      assignDate: "2025-09-26",
      submissionDate: "2025-10-11",
      marks: 45,
      priority: "medium",
    },
  ];

  const stats = [
    {
      icon: FileText,
      value: "24",
      label: "Total Assignments",
      color: "text-cyan-600",
    },
    { icon: Clock, value: "12", label: "Pending", color: "text-amber-600" },
    {
      icon: CheckCircle2,
      value: "10",
      label: "Submitted",
      color: "text-green-600",
    },
    { icon: AlertCircle, value: "2", label: "Overdue", color: "text-red-600" },
  ];

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      high: "bg-red-100 text-red-700",
      medium: "bg-blue-100 text-blue-700",
      low: "bg-slate-100 text-slate-700",
    };
    return (
      priorityStyles[priority as keyof typeof priorityStyles] ||
      priorityStyles.medium
    );
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      filterClass === "all" || assignment.class === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="absolute top-6 left-6 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <Badge
            variant="secondary"
            className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30"
          >
            <BookOpen className="w-3 h-3 mr-1" />
            Academic Portal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Assignments
          </h1>
          <p className="text-lg md:text-xl text-cyan-50 max-w-2xl drop-shadow-md">
            View and manage all your academic assignments
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-none shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6 text-center">
                <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                <h3 className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-slate-600 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="border-none shadow-xl">
          <CardHeader className="border-b bg-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-6 h-6 text-cyan-600" />
                All Assignments
              </CardTitle>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by assignment name, subject, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Grade 8">Grade 8</SelectItem>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold text-slate-900">
                      ID
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Class
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Section
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Subject
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Assignment Name
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Instructions
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Assigned Date
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Submission Date
                    </TableHead>
                    <TableHead className="font-bold text-slate-900 text-center">
                      Marks
                    </TableHead>
                    <TableHead className="font-bold text-slate-900 text-center">
                      Priority
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.length > 0 ? (
                    filteredAssignments.map((assignment) => (
                      <TableRow
                        key={assignment.id}
                        className="hover:bg-slate-50"
                      >
                        <TableCell className="font-medium text-cyan-600">
                          {assignment.id}
                        </TableCell>
                        <TableCell>{assignment.class}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {assignment.section}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {assignment.subject}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="font-medium text-slate-900">
                            {assignment.name}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <div className="text-sm text-slate-600 line-clamp-2">
                            {assignment.instructions}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {new Date(assignment.assignDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {new Date(
                              assignment.submissionDate
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="font-semibold">
                            <Award className="w-3 h-3 mr-1" />
                            {assignment.marks}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={getPriorityBadge(assignment.priority)}
                          >
                            {assignment.priority.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-12">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">
                          No assignments found matching your filters
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
