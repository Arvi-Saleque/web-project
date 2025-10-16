"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Calendar,
  FileText,
  Image,
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
  order: number;
}

export default function ExamRoutineAdminPage() {
  const [examRoutines, setExamRoutines] = useState<ExamRoutine[]>([]);
  const [editingExamRoutine, setEditingExamRoutine] =
    useState<ExamRoutine | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [examRoutineForm, setExamRoutineForm] = useState<ExamRoutine>({
    id: "",
    examName: "",
    grade: "",
    examType: "midterm",
    startDate: "",
    endDate: "",
    imageUrl: "",
    pdfUrl: "",
    status: "upcoming",
    totalDays: 0,
    order: 0,
  });

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
    }
  };

  const calculateTotalDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };

  const handleSaveExamRoutine = async () => {
    if (
      !examRoutineForm.examName ||
      !examRoutineForm.grade ||
      !examRoutineForm.examType ||
      !examRoutineForm.startDate ||
      !examRoutineForm.endDate ||
      !examRoutineForm.imageUrl ||
      !examRoutineForm.pdfUrl ||
      !examRoutineForm.status
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const url = editingExamRoutine
        ? `/api/exam-routines/${editingExamRoutine.id}`
        : "/api/exam-routines";
      const method = editingExamRoutine ? "PUT" : "POST";

      const totalDays = calculateTotalDays(
        examRoutineForm.startDate,
        examRoutineForm.endDate
      );

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...examRoutineForm, totalDays }),
      });

      if (response.ok) {
        await fetchExamRoutines();
        handleCancelExamRoutine();
        alert(
          editingExamRoutine
            ? "Exam routine updated successfully!"
            : "Exam routine added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving exam routine:", error);
      alert("Failed to save exam routine");
    }
  };

  const handleEditExamRoutine = (examRoutine: ExamRoutine) => {
    setEditingExamRoutine(examRoutine);
    setExamRoutineForm({
      ...examRoutine,
      startDate: new Date(examRoutine.startDate).toISOString().split("T")[0],
      endDate: new Date(examRoutine.endDate).toISOString().split("T")[0],
    });
    setIsAdding(false);
  };

  const handleDeleteExamRoutine = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam routine?")) return;

    try {
      const response = await fetch(`/api/exam-routines/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchExamRoutines();
        alert("Exam routine deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting exam routine:", error);
      alert("Failed to delete exam routine");
    }
  };

  const handleAddNewExamRoutine = () => {
    setIsAdding(true);
    setEditingExamRoutine(null);
    setExamRoutineForm({
      id: "",
      examName: "",
      grade: "",
      examType: "midterm",
      startDate: "",
      endDate: "",
      imageUrl: "",
      pdfUrl: "",
      status: "upcoming",
      totalDays: 0,
      order: examRoutines.length,
    });
  };

  const handleCancelExamRoutine = () => {
    setIsAdding(false);
    setEditingExamRoutine(null);
    setExamRoutineForm({
      id: "",
      examName: "",
      grade: "",
      examType: "midterm",
      startDate: "",
      endDate: "",
      imageUrl: "",
      pdfUrl: "",
      status: "upcoming",
      totalDays: 0,
      order: 0,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      upcoming: "bg-blue-100 text-blue-700",
      ongoing: "bg-green-100 text-green-700",
      completed: "bg-slate-100 text-slate-700",
    };
    return (
      statusStyles[status as keyof typeof statusStyles] || statusStyles.upcoming
    );
  };

  const getExamTypeBadge = (type: string) => {
    const typeStyles = {
      midterm: "bg-cyan-100 text-cyan-700",
      final: "bg-purple-100 text-purple-700",
      terminal: "bg-amber-100 text-amber-700",
    };
    return typeStyles[type as keyof typeof typeStyles] || typeStyles.midterm;
  };

  // Generate a readable exam routine ID (EXM-001, EXM-002, etc.)
  const generateDisplayId = (index: number) => {
    return `EXM-${String(index + 1).padStart(3, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Exam Routine Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage examination schedules for all grades and terms
          </p>
        </div>

        {/* Add New Button */}
        <div className="flex justify-end">
          <Button onClick={handleAddNewExamRoutine} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Exam Routine
          </Button>
        </div>

        {/* Exam Routine Form */}
        {(isAdding || editingExamRoutine) && (
          <Card className="border-cyan-600">
            <CardHeader className="bg-cyan-50">
              <CardTitle className="flex items-center justify-between">
                <span>
                  {editingExamRoutine
                    ? "Edit Exam Routine"
                    : "Add New Exam Routine"}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancelExamRoutine}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Fill in all the details for the exam routine
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Exam Name and Grade Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="examName">Exam Name *</Label>
                  <Input
                    id="examName"
                    placeholder="e.g., Midterm Examination 2025"
                    value={examRoutineForm.examName}
                    onChange={(e) =>
                      setExamRoutineForm({
                        ...examRoutineForm,
                        examName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade *</Label>
                  <Select
                    value={examRoutineForm.grade}
                    onValueChange={(value) =>
                      setExamRoutineForm({ ...examRoutineForm, grade: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 6">Grade 6</SelectItem>
                      <SelectItem value="Grade 7">Grade 7</SelectItem>
                      <SelectItem value="Grade 8">Grade 8</SelectItem>
                      <SelectItem value="Grade 9">Grade 9</SelectItem>
                      <SelectItem value="Grade 10">Grade 10</SelectItem>
                      <SelectItem value="Grade 11">Grade 11</SelectItem>
                      <SelectItem value="Grade 12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Exam Type and Status Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="examType">Exam Type *</Label>
                  <Select
                    value={examRoutineForm.examType}
                    onValueChange={(value) =>
                      setExamRoutineForm({
                        ...examRoutineForm,
                        examType: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midterm">
                        Midterm Examination
                      </SelectItem>
                      <SelectItem value="final">Final Examination</SelectItem>
                      <SelectItem value="terminal">
                        Terminal Examination
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={examRoutineForm.status}
                    onValueChange={(value) =>
                      setExamRoutineForm({ ...examRoutineForm, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Start Date and End Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={examRoutineForm.startDate}
                    onChange={(e) =>
                      setExamRoutineForm({
                        ...examRoutineForm,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={examRoutineForm.endDate}
                    onChange={(e) =>
                      setExamRoutineForm({
                        ...examRoutineForm,
                        endDate: e.target.value,
                      })
                    }
                  />
                  {examRoutineForm.startDate && examRoutineForm.endDate && (
                    <p className="text-sm text-gray-600">
                      Total Days:{" "}
                      {calculateTotalDays(
                        examRoutineForm.startDate,
                        examRoutineForm.endDate
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL *</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/exam-routine-image.jpg"
                  value={examRoutineForm.imageUrl}
                  onChange={(e) =>
                    setExamRoutineForm({
                      ...examRoutineForm,
                      imageUrl: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-gray-500">
                  URL of the exam routine image (Unsplash, uploaded image, etc.)
                </p>
              </div>

              {/* PDF URL */}
              <div className="space-y-2">
                <Label htmlFor="pdfUrl">PDF URL *</Label>
                <Input
                  id="pdfUrl"
                  placeholder="/exams/grade-10-midterm.pdf"
                  value={examRoutineForm.pdfUrl}
                  onChange={(e) =>
                    setExamRoutineForm({
                      ...examRoutineForm,
                      pdfUrl: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-gray-500">
                  URL or path to the downloadable PDF file
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleCancelExamRoutine}>
                  Cancel
                </Button>
                <Button onClick={handleSaveExamRoutine} className="gap-2">
                  <Save className="h-4 w-4" />
                  {editingExamRoutine ? "Update" : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Exam Routines List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Exam Routines ({examRoutines.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {examRoutines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center mb-4">
                  No exam routines found. Add your first exam routine.
                </p>
                <Button onClick={handleAddNewExamRoutine} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add First Exam Routine
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Exam Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead className="text-center">Days</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examRoutines.map((examRoutine, index) => (
                      <TableRow key={examRoutine.id}>
                        <TableCell className="font-medium text-cyan-600">
                          {generateDisplayId(index)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {examRoutine.examName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{examRoutine.grade}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getExamTypeBadge(examRoutine.examType)}
                          >
                            {examRoutine.examType.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(
                              examRoutine.startDate
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(examRoutine.endDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">
                            {examRoutine.totalDays}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={getStatusBadge(examRoutine.status)}>
                            {examRoutine.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditExamRoutine(examRoutine)}
                              className="hover:bg-cyan-50"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDeleteExamRoutine(examRoutine.id)
                              }
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
