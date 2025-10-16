"use client";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Download,
  Eye,
  Clock,
  BookOpen,
  ArrowLeft,
  FileText,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

interface ExamRoutine {
  id: string;
  examName: string;
  grade: string;
  examType: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  pdfUrl: string;
  status: string;
  totalDays: number;
}

export default function ExamsPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedExamType, setSelectedExamType] = useState<string>("all");
  const [examRoutines, setExamRoutines] = useState<ExamRoutine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExamRoutines();
  }, []);

  const fetchExamRoutines = async () => {
    try {
      const response = await fetch("/api/exam-routines");
      if (response.ok) {
        const data = await response.json();
        setExamRoutines(data);
      }
    } catch (error) {
      console.error("Error fetching exam routines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      icon: ClipboardList,
      value: examRoutines.length.toString(),
      label: "Total Exams",
      color: "text-cyan-600",
    },
    {
      icon: GraduationCap,
      value: new Set(examRoutines.map((e) => e.grade)).size.toString(),
      label: "Grades",
      color: "text-blue-600",
    },
    {
      icon: Calendar,
      value: "Oct-Dec",
      label: "Exam Period",
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      value: "3",
      label: "Exam Types",
      color: "text-amber-600",
    },
  ];

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      upcoming: {
        label: "Upcoming",
        className: "bg-blue-100 text-blue-700 border-blue-300",
      },
      ongoing: {
        label: "Ongoing",
        className: "bg-green-100 text-green-700 border-green-300",
      },
      completed: {
        label: "Completed",
        className: "bg-slate-100 text-slate-700 border-slate-300",
      },
    };
    return badges[status] || badges.upcoming;
  };

  const getExamTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      midterm: "bg-cyan-500",
      final: "bg-purple-500",
      terminal: "bg-amber-500",
    };
    return colors[type] || colors.midterm;
  };

  const handleDownload = (pdfUrl: string, filename: string) => {
    console.log(`Downloading: ${pdfUrl}`);
    alert(`Downloading ${filename}... (Demo - PDF download would start here)`);
  };

  const filteredExams = examRoutines.filter((exam) => {
    const matchesGrade =
      selectedGrade === "all" || exam.grade === selectedGrade;
    const matchesType =
      selectedExamType === "all" || exam.examType === selectedExamType;
    return matchesGrade && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
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
            <ClipboardList className="w-3 h-3 mr-1" />
            Academic Portal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Examination Routine
          </h1>
          <p className="text-lg md:text-xl text-cyan-50 max-w-2xl drop-shadow-md">
            View and download exam schedules for all grades and terms
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20 mt-10">
        <Card className="border-none shadow-xl">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-600" />
              Examination Schedules
            </CardTitle>
            <CardDescription className="mt-2">
              Filter by class and exam type to view specific examination
              routines
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {/* Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-slate-50 rounded-lg border">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-600" />
                  Filter by Class
                </label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select class" />
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  Filter by Term
                </label>
                <Select
                  value={selectedExamType}
                  onValueChange={setSelectedExamType}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Terms</SelectItem>
                    <SelectItem value="midterm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                        Midterm Examination
                      </div>
                    </SelectItem>
                    <SelectItem value="final">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        Final Examination
                      </div>
                    </SelectItem>
                    <SelectItem value="terminal">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        Terminal Examination
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mb-4"></div>
                  <p className="text-xl text-slate-600">
                    Loading exam routines...
                  </p>
                </div>
              ) : filteredExams.length > 0 ? (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      Showing <strong>{filteredExams.length}</strong>{" "}
                      examination routine{filteredExams.length !== 1 ? "s" : ""}
                    </p>
                    {(selectedGrade !== "all" ||
                      selectedExamType !== "all") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedGrade("all");
                          setSelectedExamType("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredExams.map((exam) => {
                      const statusBadge = getStatusBadge(exam.status);
                      const typeColor = getExamTypeColor(exam.examType);

                      return (
                        <Card
                          key={exam.id}
                          className="border-2 hover:border-cyan-300 transition-all overflow-hidden group"
                        >
                          <CardHeader className="bg-gradient-to-r from-slate-50 to-cyan-50 border-b pb-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <div
                                    className={`w-1 h-8 rounded-full ${typeColor}`}
                                  ></div>
                                  <div>
                                    <CardTitle className="text-lg text-slate-900 leading-tight">
                                      {exam.examName}
                                    </CardTitle>
                                    <p className="text-sm text-slate-600 mt-1">
                                      {exam.grade}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={statusBadge.className}
                              >
                                {statusBadge.label}
                              </Badge>
                            </div>

                            {/* Exam Details */}
                            <div className="flex items-center gap-4 text-sm text-slate-600 mt-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(exam.startDate).toLocaleDateString(
                                    "en-US",
                                    { month: "short", day: "numeric" }
                                  )}
                                </span>
                              </div>
                              <span>—</span>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(exam.endDate).toLocaleDateString(
                                    "en-US",
                                    { month: "short", day: "numeric" }
                                  )}
                                </span>
                              </div>
                              <Badge variant="secondary" className="ml-auto">
                                <Clock className="w-3 h-3 mr-1" />
                                {exam.totalDays} Days
                              </Badge>
                            </div>
                          </CardHeader>

                          <CardContent className="p-0">
                            {/* Image Preview */}
                            <div className="relative h-72 overflow-hidden bg-slate-100">
                              <Image
                                src={exam.imageUrl}
                                alt={`${exam.examName} ${exam.grade}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-white text-slate-900 hover:bg-slate-100"
                                    onClick={() =>
                                      window.open(exam.imageUrl, "_blank")
                                    }
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Routine
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                                    onClick={() =>
                                      handleDownload(
                                        exam.pdfUrl,
                                        `${exam.grade}-${exam.examType}-routine.pdf`
                                      )
                                    }
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Mobile Action Buttons */}
                            <div className="p-4 bg-slate-50 flex gap-3 lg:hidden">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() =>
                                  window.open(exam.imageUrl, "_blank")
                                }
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                                onClick={() =>
                                  handleDownload(
                                    exam.pdfUrl,
                                    `${exam.grade}-${exam.examType}-routine.pdf`
                                  )
                                }
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    No Exams Found
                  </h3>
                  <p className="text-slate-600">
                    No examination routines match your current filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedGrade("all");
                      setSelectedExamType("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-l-4 border-l-cyan-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Eye className="w-8 h-8 text-cyan-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">View Online</h3>
                  <p className="text-sm text-slate-600">
                    Click "View Routine" to see the full examination schedule in
                    your browser.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Download className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Download PDF
                  </h3>
                  <p className="text-sm text-slate-600">
                    Download examination routines as PDF files for offline
                    access and printing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Preparation Tips
                  </h3>
                  <p className="text-sm text-slate-600">
                    Review your routine early and create a study schedule for
                    better preparation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Guidelines */}
        <Card className="mt-8 border-2 border-rose-200 bg-rose-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Examination Guidelines
                </h3>
                <div className="space-y-2 text-slate-700">
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-rose-600 mt-0.5">•</span>
                    <span>
                      Students must arrive <strong>30 minutes before</strong>{" "}
                      the exam starts
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-rose-600 mt-0.5">•</span>
                    <span>
                      Bring <strong>admit card</strong> and{" "}
                      <strong>student ID</strong> to every exam
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-rose-600 mt-0.5">•</span>
                    <span>
                      Electronic devices are{" "}
                      <strong>strictly prohibited</strong> in the exam hall
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-rose-600 mt-0.5">•</span>
                    <span>
                      Contact your class teacher for any{" "}
                      <strong>clarifications or concerns</strong>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </div>
  );
}
