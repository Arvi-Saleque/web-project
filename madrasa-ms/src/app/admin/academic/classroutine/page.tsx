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
  Calendar,
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
  order: number;
  isActive: boolean;
}

interface FormData {
  grade: string;
  section: string;
  term: string;
  imageUrl: string;
  pdfUrl: string;
  updatedDate: string;
  order: number;
}

export default function ClassRoutineManagement() {
  const [classRoutines, setClassRoutines] = useState<ClassRoutine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    grade: "",
    section: "",
    term: "",
    imageUrl: "",
    pdfUrl: "",
    updatedDate: new Date().toISOString().split("T")[0],
    order: 0,
  });

  // Fetch class routines
  const fetchClassRoutines = async () => {
    try {
      const response = await fetch("/api/class-routines");
      if (response.ok) {
        const data = await response.json();
        setClassRoutines(data);
      }
    } catch (error) {
      console.error("Error fetching class routines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClassRoutines();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? parseInt(value) || 0 : value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      grade: "",
      section: "",
      term: "",
      imageUrl: "",
      pdfUrl: "",
      updatedDate: new Date().toISOString().split("T")[0],
      order: 0,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  // Create new class routine
  const handleCreate = async () => {
    try {
      const response = await fetch("/api/class-routines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchClassRoutines();
        resetForm();
        alert("Class routine created successfully!");
      } else {
        alert("Failed to create class routine");
      }
    } catch (error) {
      console.error("Error creating class routine:", error);
      alert("Error creating class routine");
    }
  };

  // Update class routine
  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const response = await fetch(`/api/class-routines/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchClassRoutines();
        resetForm();
        alert("Class routine updated successfully!");
      } else {
        alert("Failed to update class routine");
      }
    } catch (error) {
      console.error("Error updating class routine:", error);
      alert("Error updating class routine");
    }
  };

  // Delete class routine
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this class routine?")) return;

    try {
      const response = await fetch(`/api/class-routines/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchClassRoutines();
        alert("Class routine deleted successfully!");
      } else {
        alert("Failed to delete class routine");
      }
    } catch (error) {
      console.error("Error deleting class routine:", error);
      alert("Error deleting class routine");
    }
  };

  // Start editing
  const startEdit = (routine: ClassRoutine) => {
    setFormData({
      grade: routine.grade,
      section: routine.section,
      term: routine.term,
      imageUrl: routine.imageUrl,
      pdfUrl: routine.pdfUrl,
      updatedDate: new Date(routine.updatedDate).toISOString().split("T")[0],
      order: routine.order,
    });
    setEditingId(routine.id);
    setIsEditing(true);
  };

  // Generate display ID
  const generateDisplayId = (index: number) => {
    return `CRT-${String(index + 1).padStart(3, "0")}`;
  };

  // Validate form
  const isFormValid = () => {
    return (
      formData.grade &&
      formData.section &&
      formData.term &&
      formData.imageUrl &&
      formData.pdfUrl &&
      formData.updatedDate
    );
  };

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
          <Calendar className="w-8 h-8 text-cyan-600" />
          Class Routine Management
        </h1>
        <p className="text-slate-600 mt-2">
          Manage class routines for all grades and sections
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Routines</p>
                <p className="text-2xl font-bold text-slate-900">
                  {classRoutines.length}
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
                  {new Set(classRoutines.map((r) => r.grade)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Sections</p>
                <p className="text-2xl font-bold text-slate-900">
                  {new Set(classRoutines.map((r) => r.section)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Current Term</p>
                <p className="text-lg font-bold text-slate-900">
                  {classRoutines[0]?.term || "N/A"}
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
                Edit Class Routine
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 text-cyan-600" />
                Create New Class Routine
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

            {/* Section */}
            <div>
              <Label htmlFor="section" className="text-slate-700 font-medium">
                Section *
              </Label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
            </div>

            {/* Term */}
            <div>
              <Label htmlFor="term" className="text-slate-700 font-medium">
                Term *
              </Label>
              <Input
                id="term"
                name="term"
                type="text"
                placeholder="e.g., Fall 2025, Spring 2026"
                value={formData.term}
                onChange={handleInputChange}
                className="mt-1.5"
                required
              />
            </div>

            {/* Updated Date */}
            <div>
              <Label
                htmlFor="updatedDate"
                className="text-slate-700 font-medium"
              >
                Last Updated Date *
              </Label>
              <Input
                id="updatedDate"
                name="updatedDate"
                type="date"
                value={formData.updatedDate}
                onChange={handleInputChange}
                className="mt-1.5"
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
                placeholder="https://example.com/routine-image.jpg"
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
                placeholder="https://example.com/routine.pdf"
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
                  Update Routine
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
                Create Routine
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="border-b bg-slate-50/50">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-600" />
            All Class Routines
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {classRoutines.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Class Routines Yet
              </h3>
              <p className="text-slate-600">
                Create your first class routine using the form above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Grade</TableHead>
                    <TableHead className="font-semibold">Section</TableHead>
                    <TableHead className="font-semibold">Term</TableHead>
                    <TableHead className="font-semibold">
                      Last Updated
                    </TableHead>
                    <TableHead className="font-semibold">Preview</TableHead>
                    <TableHead className="font-semibold">Order</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classRoutines.map((routine, index) => (
                    <TableRow key={routine.id}>
                      <TableCell className="font-mono text-sm">
                        {generateDisplayId(index)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <GraduationCap className="w-3 h-3" />
                          {routine.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <Users className="w-3 h-3" />
                          Section {routine.section}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {routine.term}
                      </TableCell>
                      <TableCell>
                        {new Date(routine.updatedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <a
                            href={routine.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 hover:text-cyan-700 text-sm underline"
                          >
                            Image
                          </a>
                          <span className="text-slate-300">|</span>
                          <a
                            href={routine.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm underline"
                          >
                            PDF
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{routine.order}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(routine)}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(routine.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
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
  );
}
