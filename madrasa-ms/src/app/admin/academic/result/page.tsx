"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  FileSpreadsheet,
  GraduationCap,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface ExamResult {
  id: string;
  examName: string;
  grade: string;
  examType: string;
  publishedDate: string;
  imageUrl: string;
  pdfUrl: string;
  status: string;
  passPercentage: number;
  order: number;
  isActive: boolean;
}

interface FormData {
  examName: string;
  grade: string;
  examType: string;
  publishedDate: string;
  imageUrl: string;
  pdfUrl: string;
  status: string;
  passPercentage: number;
  order: number;
}

export default function ExamResultManagement() {
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    examName: "",
    grade: "",
    examType: "",
    publishedDate: new Date().toISOString().split("T")[0],
    imageUrl: "",
    pdfUrl: "",
    status: "published",
    passPercentage: 0,
    order: 0,
  });

  // Fetch exam results
  const fetchExamResults = async () => {
    try {
      const response = await fetch("/api/exam-results");
      if (response.ok) {
        const data = await response.json();
        setExamResults(data);
      }
    } catch (error) {
      console.error("Error fetching exam results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExamResults();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "order" || name === "passPercentage"
          ? parseInt(value) || 0
          : value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      examName: "",
      grade: "",
      examType: "",
      publishedDate: new Date().toISOString().split("T")[0],
      imageUrl: "",
      pdfUrl: "",
      status: "published",
      passPercentage: 0,
      order: 0,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  // Create new exam result
  const handleCreate = async () => {
    try {
      const response = await fetch("/api/exam-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchExamResults();
        resetForm();
        alert("Exam result created successfully!");
      } else {
        alert("Failed to create exam result");
      }
    } catch (error) {
      console.error("Error creating exam result:", error);
      alert("Error creating exam result");
    }
  };

  // Update exam result
  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const response = await fetch(`/api/exam-results/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchExamResults();
        resetForm();
        alert("Exam result updated successfully!");
      } else {
        alert("Failed to update exam result");
      }
    } catch (error) {
      console.error("Error updating exam result:", error);
      alert("Error updating exam result");
    }
  };

  // Delete exam result
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam result?")) return;

    try {
      const response = await fetch(`/api/exam-results/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchExamResults();
        alert("Exam result deleted successfully!");
      } else {
        alert("Failed to delete exam result");
      }
    } catch (error) {
      console.error("Error deleting exam result:", error);
      alert("Error deleting exam result");
    }
  };

  // Start editing
  const startEdit = (result: ExamResult) => {
    setFormData({
      examName: result.examName,
      grade: result.grade,
      examType: result.examType,
      publishedDate: new Date(result.publishedDate).toISOString().split("T")[0],
      imageUrl: result.imageUrl,
      pdfUrl: result.pdfUrl,
      status: result.status,
      passPercentage: result.passPercentage,
      order: result.order,
    });
    setEditingId(result.id);
    setIsEditing(true);
  };

  // Generate display ID
  const generateDisplayId = (index: number) => {
    return `RES-${String(index + 1).padStart(3, "0")}`;
  };

  // Get exam type badge
  const getExamTypeBadge = (type: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      midterm: { color: "bg-cyan-100 text-cyan-700", label: "Midterm" },
      final: { color: "bg-purple-100 text-purple-700", label: "Final" },
      terminal: { color: "bg-amber-100 text-amber-700", label: "Terminal" },
    };
    return (
      badges[type] || { color: "bg-slate-100 text-slate-700", label: type }
    );
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; icon: any }> = {
      published: {
        color: "bg-green-100 text-green-700 border-green-300",
        icon: CheckCircle2,
      },
      pending: {
        color: "bg-amber-100 text-amber-700 border-amber-300",
        icon: Clock,
      },
    };
    return (
      badges[status] || {
        color: "bg-slate-100 text-slate-700 border-slate-300",
        icon: Clock,
      }
    );
  };

  // Get pass percentage color
  const getPassPercentageColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-rose-600";
  };

  // Validate form
  const isFormValid = () => {
    return (
      formData.examName &&
      formData.grade &&
      formData.examType &&
      formData.publishedDate &&
      formData.imageUrl &&
      formData.pdfUrl &&
      formData.status &&
      formData.passPercentage >= 0 &&
      formData.passPercentage <= 100
    );
  };

  // Calculate statistics
  const avgPassPercentage =
    examResults.length > 0
      ? Math.round(
          examResults.reduce((sum, r) => sum + r.passPercentage, 0) /
            examResults.length
        )
      : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <FileSpreadsheet className="w-8 h-8 text-cyan-600" />
          Exam Result Management
        </h1>
        <p className="text-slate-600 mt-2">
          Manage and publish examination results for all grades
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Results</p>
                <p className="text-2xl font-bold text-slate-900">
                  {examResults.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Grades</p>
                <p className="text-2xl font-bold text-slate-900">
                  {new Set(examResults.map((r) => r.grade)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Avg Pass Rate</p>
                <p className="text-2xl font-bold text-slate-900">
                  {avgPassPercentage}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Published</p>
                <p className="text-2xl font-bold text-slate-900">
                  {examResults.filter((r) => r.status === "published").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form */}
      <Card className="mb-6">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
          <CardTitle className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Edit className="w-5 h-5 text-blue-600" />
                Edit Exam Result
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 text-cyan-600" />
                Create New Exam Result
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Exam Name */}
            <div className="md:col-span-2">
              <Label htmlFor="examName" className="text-slate-700 font-medium">
                Exam Name *
              </Label>
              <Input
                id="examName"
                name="examName"
                type="text"
                placeholder="e.g., Midterm Examination 2025"
                value={formData.examName}
                onChange={handleInputChange}
                className="mt-1.5"
                required
              />
            </div>

            {/* Grade */}
            <div>
              <Label htmlFor="grade" className="text-slate-700 font-medium">
                Grade *
              </Label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="">Select Grade</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>

            {/* Exam Type */}
            <div>
              <Label htmlFor="examType" className="text-slate-700 font-medium">
                Exam Type *
              </Label>
              <select
                id="examType"
                name="examType"
                value={formData.examType}
                onChange={handleInputChange}
                className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="">Select Type</option>
                <option value="midterm">Midterm Examination</option>
                <option value="final">Final Examination</option>
                <option value="terminal">Terminal Examination</option>
              </select>
            </div>

            {/* Published Date */}
            <div>
              <Label
                htmlFor="publishedDate"
                className="text-slate-700 font-medium"
              >
                Published Date *
              </Label>
              <Input
                id="publishedDate"
                name="publishedDate"
                type="date"
                value={formData.publishedDate}
                onChange={handleInputChange}
                className="mt-1.5"
                required
              />
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status" className="text-slate-700 font-medium">
                Status *
              </Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="published">Published</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Pass Percentage */}
            <div>
              <Label
                htmlFor="passPercentage"
                className="text-slate-700 font-medium"
              >
                Pass Percentage (%) *
              </Label>
              <Input
                id="passPercentage"
                name="passPercentage"
                type="number"
                placeholder="0-100"
                value={formData.passPercentage}
                onChange={handleInputChange}
                className="mt-1.5"
                min="0"
                max="100"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <Label htmlFor="imageUrl" className="text-slate-700 font-medium">
                Image URL *
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/result-image.jpg"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="mt-1.5"
                required
              />
            </div>

            {/* PDF URL */}
            <div>
              <Label htmlFor="pdfUrl" className="text-slate-700 font-medium">
                PDF URL *
              </Label>
              <Input
                id="pdfUrl"
                name="pdfUrl"
                type="url"
                placeholder="https://example.com/result.pdf"
                value={formData.pdfUrl}
                onChange={handleInputChange}
                className="mt-1.5"
                required
              />
            </div>

            {/* Order */}
            <div>
              <Label htmlFor="order" className="text-slate-700 font-medium">
                Display Order
              </Label>
              <Input
                id="order"
                name="order"
                type="number"
                placeholder="0"
                value={formData.order}
                onChange={handleInputChange}
                className="mt-1.5"
                min="0"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button
                  onClick={handleUpdate}
                  disabled={!isFormValid()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Result
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-slate-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={handleCreate}
                disabled={!isFormValid()}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Result
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="border-b bg-slate-50/50">
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-600" />
            All Exam Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {examResults.length === 0 ? (
            <div className="text-center py-12">
              <FileSpreadsheet className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Exam Results Yet
              </h3>
              <p className="text-slate-600">
                Create your first exam result using the form above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Exam Name</TableHead>
                    <TableHead className="font-semibold">Grade</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Published</TableHead>
                    <TableHead className="font-semibold">Pass Rate</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Preview</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examResults.map((result, index) => {
                    const typeBadge = getExamTypeBadge(result.examType);
                    const statusBadge = getStatusBadge(result.status);
                    const StatusIcon = statusBadge.icon;
                    const passColor = getPassPercentageColor(
                      result.passPercentage
                    );

                    return (
                      <TableRow key={result.id}>
                        <TableCell className="font-mono text-sm">
                          {generateDisplayId(index)}
                        </TableCell>
                        <TableCell className="font-medium max-w-xs">
                          {result.examName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            <GraduationCap className="w-3 h-3" />
                            {result.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={typeBadge.color}>
                            {typeBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(result.publishedDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`font-bold ${passColor}`}>
                            {result.passPercentage}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusBadge.color}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {result.status.charAt(0).toUpperCase() +
                              result.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <a
                              href={result.imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-600 hover:text-cyan-700 text-sm underline"
                            >
                              Image
                            </a>
                            <span className="text-slate-300">|</span>
                            <a
                              href={result.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-sm underline"
                            >
                              PDF
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(result)}
                              className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(result.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
