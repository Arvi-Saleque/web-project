"use client";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { useState } from "react";
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
  ArrowLeft,
  FileText,
  GraduationCap,
  AlertCircle,
  Award,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";

interface ExamResult {
  id: string;
  examName: string;
  grade: string;
  examType: "midterm" | "final" | "terminal";
  publishedDate: string;
  imageUrl: string;
  pdfUrl: string;
  status: "published" | "pending";
  passPercentage: number;
}

export default function ResultsPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedExamType, setSelectedExamType] = useState<string>("all");

  const examResults: ExamResult[] = [
    {
      id: "1",
      examName: "Midterm Examination 2025",
      grade: "Grade 10",
      examType: "midterm",
      publishedDate: "2025-09-28",
      imageUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
      pdfUrl: "/results/grade-10-midterm-result.pdf",
      status: "published",
      passPercentage: 92,
    },
    {
      id: "2",
      examName: "Terminal Examination 2024",
      grade: "Grade 9",
      examType: "terminal",
      publishedDate: "2025-08-15",
      imageUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop",
      pdfUrl: "/results/grade-9-terminal-result.pdf",
      status: "published",
      passPercentage: 88,
    },
    {
      id: "3",
      examName: "Final Examination 2024",
      grade: "Grade 11",
      examType: "final",
      publishedDate: "2025-07-20",
      imageUrl:
        "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&h=800&fit=crop",
      pdfUrl: "/results/grade-11-final-result.pdf",
      status: "published",
      passPercentage: 95,
    },
    {
      id: "4",
      examName: "Midterm Examination 2025",
      grade: "Grade 8",
      examType: "midterm",
      publishedDate: "2025-09-25",
      imageUrl:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=800&fit=crop",
      pdfUrl: "/results/grade-8-midterm-result.pdf",
      status: "published",
      passPercentage: 90,
    },
    {
      id: "5",
      examName: "Midterm Examination 2025",
      grade: "Grade 9",
      examType: "midterm",
      publishedDate: "2025-09-26",
      imageUrl:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=800&fit=crop",
      pdfUrl: "/results/grade-9-midterm-result.pdf",
      status: "published",
      passPercentage: 89,
    },
    {
      id: "6",
      examName: "Final Examination 2024",
      grade: "Grade 10",
      examType: "final",
      publishedDate: "2025-07-18",
      imageUrl:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=800&fit=crop",
      pdfUrl: "/results/grade-10-final-result.pdf",
      status: "published",
      passPercentage: 94,
    },
  ];

  const stats = [
    {
      icon: FileSpreadsheet,
      value: "6",
      label: "Published Results",
      color: "text-cyan-600",
    },
    {
      icon: GraduationCap,
      value: "4",
      label: "Grades",
      color: "text-blue-600",
    },
    {
      icon: TrendingUp,
      value: "91%",
      label: "Avg Pass Rate",
      color: "text-green-600",
    },
    {
      icon: Award,
      value: "3",
      label: "Exam Types",
      color: "text-amber-600",
    },
  ];

  const getExamTypeColor = (type: ExamResult["examType"]) => {
    const colors = {
      midterm: "bg-cyan-500",
      final: "bg-purple-500",
      terminal: "bg-amber-500",
    };
    return colors[type];
  };

  const getExamTypeBadge = (type: ExamResult["examType"]) => {
    const badges = {
      midterm: {
        label: "Midterm",
        color: "bg-cyan-100 text-cyan-700 border-cyan-300",
      },
      final: {
        label: "Final",
        color: "bg-purple-100 text-purple-700 border-purple-300",
      },
      terminal: {
        label: "Terminal",
        color: "bg-amber-100 text-amber-700 border-amber-300",
      },
    };
    return badges[type];
  };

  const getPassPercentageColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-rose-600";
  };

  const handleDownload = (pdfUrl: string, filename: string) => {
    console.log(`Downloading: ${pdfUrl}`);
    alert(`Downloading ${filename}... (Demo - PDF download would start here)`);
  };

  const filteredResults = examResults.filter((result) => {
    const matchesGrade =
      selectedGrade === "all" || result.grade === selectedGrade;
    const matchesType =
      selectedExamType === "all" || result.examType === selectedExamType;
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
            <BarChart3 className="w-3 h-3 mr-1" />
            Academic Portal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Examination Results
          </h1>
          <p className="text-lg md:text-xl text-cyan-50 max-w-2xl drop-shadow-md">
            View and download exam results for all grades and terms
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
            <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-600" />
              Published Exam Results
            </CardTitle>
            <CardDescription className="mt-2">
              Filter by class and exam type to view specific results
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
                  <FileSpreadsheet className="w-4 h-4 text-purple-600" />
                  Filter by Exam Type
                </label>
                <Select
                  value={selectedExamType}
                  onValueChange={setSelectedExamType}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exam Types</SelectItem>
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
              {filteredResults.length > 0 ? (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      Showing <strong>{filteredResults.length}</strong> result
                      {filteredResults.length !== 1 ? "s" : ""}
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
                    {filteredResults.map((result) => {
                      const typeColor = getExamTypeColor(result.examType);
                      const typeBadge = getExamTypeBadge(result.examType);
                      const passColor = getPassPercentageColor(
                        result.passPercentage
                      );

                      return (
                        <Card
                          key={result.id}
                          className="border-2 hover:border-cyan-300 transition-all overflow-hidden group"
                        >
                          <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50 border-b pb-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <div
                                    className={`w-1 h-8 rounded-full ${typeColor}`}
                                  ></div>
                                  <div>
                                    <CardTitle className="text-lg text-slate-900 leading-tight">
                                      {result.examName}
                                    </CardTitle>
                                    <p className="text-sm text-slate-600 mt-1">
                                      {result.grade}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 items-end">
                                <Badge
                                  variant="outline"
                                  className={typeBadge.color}
                                >
                                  {typeBadge.label}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-300"
                                >
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Published
                                </Badge>
                              </div>
                            </div>

                            {/* Result Details */}
                            <div className="flex items-center gap-4 text-sm text-slate-600 mt-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Published:{" "}
                                  {new Date(
                                    result.publishedDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <Badge variant="secondary" className="ml-auto">
                                <TrendingUp
                                  className={`w-3 h-3 mr-1 ${passColor}`}
                                />
                                <span className={passColor}>
                                  {result.passPercentage}% Pass
                                </span>
                              </Badge>
                            </div>
                          </CardHeader>

                          <CardContent className="p-0">
                            {/* Image Preview */}
                            <div className="relative h-72 overflow-hidden bg-slate-100">
                              <Image
                                src={result.imageUrl}
                                alt={`${result.examName} ${result.grade} Results`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-white text-slate-900 hover:bg-slate-100"
                                    onClick={() =>
                                      window.open(result.imageUrl, "_blank")
                                    }
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Results
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                                    onClick={() =>
                                      handleDownload(
                                        result.pdfUrl,
                                        `${result.grade}-${result.examType}-results.pdf`
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
                                  window.open(result.imageUrl, "_blank")
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
                                    result.pdfUrl,
                                    `${result.grade}-${result.examType}-results.pdf`
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
                    No Results Found
                  </h3>
                  <p className="text-slate-600">
                    No examination results match your current filters.
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
                    Click "View Results" to see the complete result sheet in
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
                    Download exam results as PDF files for offline access and
                    printing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Award className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Pass Percentage
                  </h3>
                  <p className="text-sm text-slate-600">
                    Each result shows the overall class pass percentage for
                    quick insights.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Card className="mt-8 border-2 border-blue-200 bg-blue-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Important Notice
                </h3>
                <div className="space-y-2 text-slate-700">
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 mt-0.5">•</span>
                    <span>
                      Results are published within <strong>2 weeks</strong>{" "}
                      after the examination ends
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 mt-0.5">•</span>
                    <span>
                      Students can <strong>collect original mark sheets</strong>{" "}
                      from the administrative office
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 mt-0.5">•</span>
                    <span>
                      For any <strong>discrepancies or queries</strong>, contact
                      your class teacher within 7 days
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 mt-0.5">•</span>
                    <span>
                      Re-evaluation requests must be submitted with the{" "}
                      <strong>prescribed fee</strong>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mt-6 bg-slate-50">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-slate-900 mb-3">
              Pass Rate Indicators:
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-700">
                  90% or above - Excellent
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm text-slate-700">
                  75-89% - Very Good
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span className="text-sm text-slate-700">60-74% - Good</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-rose-500"></div>
                <span className="text-sm text-slate-700">
                  Below 60% - Needs Improvement
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </div>
  );
}
