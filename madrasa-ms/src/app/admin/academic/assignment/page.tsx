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
import { Textarea } from "@/components/ui/textarea";
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
  FileText,
  Calendar,
  Award,
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
  priority: string;
  order: number;
}

export default function AssignmentAdminPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(
    null
  );
  const [isAdding, setIsAdding] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState<Assignment>({
    id: "",
    class: "",
    section: "",
    subject: "",
    name: "",
    instructions: "",
    assignDate: "",
    submissionDate: "",
    marks: 0,
    priority: "medium",
    order: 0,
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch("/api/assignments");
      if (response.ok) {
        const data = await response.json();
        setAssignments(data);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleSaveAssignment = async () => {
    if (
      !assignmentForm.class ||
      !assignmentForm.section ||
      !assignmentForm.subject ||
      !assignmentForm.name ||
      !assignmentForm.instructions ||
      !assignmentForm.assignDate ||
      !assignmentForm.submissionDate ||
      !assignmentForm.marks
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const url = editingAssignment
        ? `/api/assignments/${editingAssignment.id}`
        : "/api/assignments";
      const method = editingAssignment ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignmentForm),
      });

      if (response.ok) {
        await fetchAssignments();
        handleCancelAssignment();
        alert(
          editingAssignment
            ? "Assignment updated successfully!"
            : "Assignment added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment");
    }
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setAssignmentForm({
      ...assignment,
      assignDate: new Date(assignment.assignDate).toISOString().split("T")[0],
      submissionDate: new Date(assignment.submissionDate)
        .toISOString()
        .split("T")[0],
    });
    setIsAdding(false);
  };

  const handleDeleteAssignment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;

    try {
      const response = await fetch(`/api/assignments/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchAssignments();
        alert("Assignment deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
      alert("Failed to delete assignment");
    }
  };

  const handleAddNewAssignment = () => {
    setIsAdding(true);
    setEditingAssignment(null);
    setAssignmentForm({
      id: "",
      class: "",
      section: "",
      subject: "",
      name: "",
      instructions: "",
      assignDate: "",
      submissionDate: "",
      marks: 0,
      priority: "medium",
      order: assignments.length,
    });
  };

  const handleCancelAssignment = () => {
    setIsAdding(false);
    setEditingAssignment(null);
    setAssignmentForm({
      id: "",
      class: "",
      section: "",
      subject: "",
      name: "",
      instructions: "",
      assignDate: "",
      submissionDate: "",
      marks: 0,
      priority: "medium",
      order: 0,
    });
  };

  // Generate a readable assignment ID (ASG-001, ASG-002, etc.)
  const generateDisplayId = (index: number) => {
    return `ASG-${String(index + 1).padStart(3, "0")}`;
  };

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Assignment Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage academic assignments for all classes
          </p>
        </div>

        {/* Add New Assignment Button */}
        <div className="flex justify-end">
          <Button onClick={handleAddNewAssignment} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Assignment
          </Button>
        </div>

        {/* Assignment Form */}
        {(isAdding || editingAssignment) && (
          <Card className="border-cyan-600">
            <CardHeader className="bg-cyan-50">
              <CardTitle className="flex items-center justify-between">
                <span>
                  {editingAssignment ? "Edit Assignment" : "Add New Assignment"}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancelAssignment}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Fill in all the details for the assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Class, Section, Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class *</Label>
                  <Select
                    value={assignmentForm.class}
                    onValueChange={(value) =>
                      setAssignmentForm({ ...assignmentForm, class: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
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

                <div className="space-y-2">
                  <Label htmlFor="section">Section *</Label>
                  <Select
                    value={assignmentForm.section}
                    onValueChange={(value) =>
                      setAssignmentForm({ ...assignmentForm, section: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={assignmentForm.subject}
                    onValueChange={(value) =>
                      setAssignmentForm({ ...assignmentForm, subject: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Islamic Studies">
                        Islamic Studies
                      </SelectItem>
                      <SelectItem value="Arabic Language">
                        Arabic Language
                      </SelectItem>
                      <SelectItem value="Quran Memorization">
                        Quran Memorization
                      </SelectItem>
                      <SelectItem value="Hadith Studies">
                        Hadith Studies
                      </SelectItem>
                      <SelectItem value="Fiqh">Fiqh</SelectItem>
                      <SelectItem value="Islamic History">
                        Islamic History
                      </SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Assignment Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Assignment Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Tafsir of Surah Al-Baqarah"
                  value={assignmentForm.name}
                  onChange={(e) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions *</Label>
                <Textarea
                  id="instructions"
                  placeholder="Detailed instructions for the assignment..."
                  value={assignmentForm.instructions}
                  onChange={(e) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      instructions: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>

              {/* Dates, Marks, Priority Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignDate">Assign Date *</Label>
                  <Input
                    id="assignDate"
                    type="date"
                    value={assignmentForm.assignDate}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        assignDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submissionDate">Submission Date *</Label>
                  <Input
                    id="submissionDate"
                    type="date"
                    value={assignmentForm.submissionDate}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        submissionDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marks">Total Marks *</Label>
                  <Input
                    id="marks"
                    type="number"
                    placeholder="100"
                    value={assignmentForm.marks || ""}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        marks: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={assignmentForm.priority}
                    onValueChange={(value) =>
                      setAssignmentForm({ ...assignmentForm, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleCancelAssignment}>
                  Cancel
                </Button>
                <Button onClick={handleSaveAssignment} className="gap-2">
                  <Save className="h-4 w-4" />
                  {editingAssignment ? "Update" : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assignments List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Assignments ({assignments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {assignments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center mb-4">
                  No assignments found. Add your first assignment.
                </p>
                <Button onClick={handleAddNewAssignment} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add First Assignment
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Assignment Name</TableHead>
                      <TableHead>Assign Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-center">Marks</TableHead>
                      <TableHead className="text-center">Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment, index) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium text-cyan-600">
                          {generateDisplayId(index)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {assignment.class}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{assignment.section}</Badge>
                        </TableCell>
                        <TableCell>{assignment.subject}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="font-medium">{assignment.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {assignment.instructions}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(
                              assignment.assignDate
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(
                              assignment.submissionDate
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="gap-1">
                            <Award className="w-3 h-3" />
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
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditAssignment(assignment)}
                              className="hover:bg-cyan-50"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDeleteAssignment(assignment.id)
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
