"use client";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Download,
  Eye,
  Clock,
  BookOpen,
  ArrowLeft,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react";

interface ClassRoutine {
  id: string;
  grade: string;
  section: string;
  term: string;
  imageUrl: string;
  pdfUrl: string;
  updatedDate: string;
}

export default function RoutinePage() {
  const [selectedGrade, setSelectedGrade] = useState("grade-10");
  const [routines, setRoutines] = useState<ClassRoutine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch class routines from API
  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await fetch("/api/class-routines");
        if (response.ok) {
          const data = await response.json();
          setRoutines(data);
        }
      } catch (error) {
        console.error("Error fetching class routines:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  // Calculate stats dynamically
  const stats = [
    {
      icon: GraduationCap,
      value: new Set(routines.map((r) => r.grade)).size.toString() || "0",
      label: "Grades",
      color: "text-cyan-600",
    },
    {
      icon: Users,
      value: routines.length.toString(),
      label: "Routines",
      color: "text-blue-600",
    },
    {
      icon: Clock,
      value: "8:00 AM",
      label: "Start Time",
      color: "text-purple-600",
    },
    {
      icon: BookOpen,
      value: "6-8",
      label: "Periods/Day",
      color: "text-amber-600",
    },
  ];

  const handleDownload = (pdfUrl: string, filename: string) => {
    // In a real app, this would trigger actual PDF download
    console.log(`Downloading: ${pdfUrl}`);
    alert(`Downloading ${filename}... (Demo - PDF download would start here)`);
  };

  // Generate grade groups dynamically based on available routines
  const uniqueGrades = Array.from(new Set(routines.map((r) => r.grade))).sort();
  const gradeGroups = uniqueGrades.map((grade: string) => ({
    id: grade.toLowerCase().replace(" ", "-"),
    label: grade,
    routines: routines.filter((r) => r.grade === grade),
  }));

  // Set initial selected grade
  useEffect(() => {
    if (
      gradeGroups.length > 0 &&
      !gradeGroups.find((g) => g.id === selectedGrade)
    ) {
      setSelectedGrade(gradeGroups[0].id);
    }
  }, [gradeGroups, selectedGrade]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">Loading class routines...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            <Calendar className="w-3 h-3 mr-1" />
            Academic Portal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Class Routine
          </h1>
          <p className="text-lg md:text-xl text-cyan-50 max-w-2xl drop-shadow-md">
            View and download class schedules for all grades
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20 mt-10">
        <Card className="border-none shadow-xl">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-600" />
              Class Routines by Grade
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">
              Select a grade to view or download the class routine
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {gradeGroups.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No Routines Available
                </h3>
                <p className="text-slate-600">
                  Class routines will be available soon.
                </p>
              </div>
            ) : (
              <Tabs
                value={selectedGrade}
                onValueChange={setSelectedGrade}
                className="w-full"
              >
                <TabsList
                  className="grid w-full mb-8"
                  style={{
                    gridTemplateColumns: `repeat(${gradeGroups.length}, minmax(0, 1fr))`,
                  }}
                >
                  {gradeGroups.map((group) => (
                    <TabsTrigger
                      key={group.id}
                      value={group.id}
                      className="gap-2"
                    >
                      <GraduationCap className="w-4 h-4" />
                      {group.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {gradeGroups.map((group) => (
                  <TabsContent
                    key={group.id}
                    value={group.id}
                    className="space-y-6"
                  >
                    {group.routines.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {group.routines.map((routine) => (
                          <Card
                            key={routine.id}
                            className="border-2 hover:border-cyan-300 transition-all overflow-hidden group"
                          >
                            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="text-xl text-slate-900">
                                    {routine.grade} - Section {routine.section}
                                  </CardTitle>
                                  <p className="text-sm text-slate-600 mt-1">
                                    {routine.term}
                                  </p>
                                </div>
                                <Badge variant="outline" className="gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Updated:{" "}
                                  {new Date(
                                    routine.updatedDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </Badge>
                              </div>
                            </CardHeader>

                            <CardContent className="p-0">
                              {/* Image Preview */}
                              <div className="relative h-80 overflow-hidden bg-slate-100">
                                <Image
                                  src={routine.imageUrl}
                                  alt={`${routine.grade} Section ${routine.section} Routine`}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                                    <Button
                                      size="sm"
                                      className="flex-1 bg-white text-slate-900 hover:bg-slate-100"
                                      onClick={() =>
                                        window.open(routine.imageUrl, "_blank")
                                      }
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Full
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                                      onClick={() =>
                                        handleDownload(
                                          routine.pdfUrl,
                                          `${routine.grade}-${routine.section}-routine.pdf`
                                        )
                                      }
                                    >
                                      <Download className="w-4 h-4 mr-2" />
                                      Download PDF
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons (Mobile Friendly) */}
                              <div className="p-4 bg-slate-50 flex gap-3 lg:hidden">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    window.open(routine.imageUrl, "_blank")
                                  }
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Full
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                                  onClick={() =>
                                    handleDownload(
                                      routine.pdfUrl,
                                      `${routine.grade}-${routine.section}-routine.pdf`
                                    )
                                  }
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          No Routine Available
                        </h3>
                        <p className="text-slate-600">
                          Class routine for {group.label} will be available
                          soon.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-l-4 border-l-cyan-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Eye className="w-8 h-8 text-cyan-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    View Routine
                  </h3>
                  <p className="text-sm text-slate-600">
                    Click "View Full" to see the routine image in full screen
                    for better readability.
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
                    Download the routine as a PDF file for offline access and
                    printing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Stay Updated
                  </h3>
                  <p className="text-sm text-slate-600">
                    Routines are updated at the start of each term. Check
                    regularly for changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notice Card */}
        <Card className="mt-8 border-2 border-amber-200 bg-amber-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Important Notice
                </h3>
                <p className="text-slate-700 mb-2">
                  • Classes start at <strong>8:00 AM</strong> and end at{" "}
                  <strong>3:00 PM</strong>
                </p>
                <p className="text-slate-700 mb-2">
                  • Each period is <strong>45 minutes</strong> long with a
                  10-minute break between periods
                </p>
                <p className="text-slate-700">
                  • Lunch break is from <strong>12:00 PM to 1:00 PM</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </div>
  );
}
