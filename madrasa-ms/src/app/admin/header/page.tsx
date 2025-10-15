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
import { Separator } from "@/components/ui/separator";
import { Edit, Trash2, Plus, Save, X, Image as ImageIcon } from "lucide-react";

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

export default function AdminHeaderPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Slide>({
    id: "",
    image: "",
    title: "",
    subtitle: "",
    description: "",
    primaryButton: "",
    secondaryButton: "",
  });

  // Fetch slides on mount
  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/header-slides");
      if (response.ok) {
        const data = await response.json();
        setSlides(data);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  const handleInputChange = (field: keyof Slide, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (
      !formData.image ||
      !formData.title ||
      !formData.subtitle ||
      !formData.description ||
      !formData.primaryButton ||
      !formData.secondaryButton
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const url = editingSlide
        ? `/api/header-slides/${editingSlide.id}`
        : "/api/header-slides";
      const method = editingSlide ? "PUT" : "POST";

      // Don't send id when creating new slide
      const dataToSend = editingSlide
        ? formData
        : {
            image: formData.image,
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            primaryButton: formData.primaryButton,
            secondaryButton: formData.secondaryButton,
          };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await fetchSlides();
        handleCancel();
        alert(
          editingSlide
            ? "Slide updated successfully!"
            : "Slide added successfully!"
        );
      } else {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving slide:", error);
      alert(
        "Failed to save slide. Please check your connection and try again."
      );
    }
  };

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData(slide);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const response = await fetch(`/api/header-slides/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchSlides();
        alert("Slide deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      alert("Failed to delete slide");
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingSlide(null);
    setFormData({
      id: "",
      image: "",
      title: "",
      subtitle: "",
      description: "",
      primaryButton: "",
      secondaryButton: "",
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingSlide(null);
    setFormData({
      id: "",
      image: "",
      title: "",
      subtitle: "",
      description: "",
      primaryButton: "",
      secondaryButton: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Header Slider Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage homepage hero slider content
            </p>
          </div>
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Slide
          </Button>
        </div>

        {/* Form Card (Add/Edit) */}
        {(isAdding || editingSlide) && (
          <Card className="border-cyan-600">
            <CardHeader className="bg-cyan-50">
              <CardTitle className="flex items-center justify-between">
                <span>{editingSlide ? "Edit Slide" : "Add New Slide"}</span>
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Fill in the details for the slider content
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL *</Label>
                  <Input
                    id="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Use Unsplash or your own image URL
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle *</Label>
                  <Input
                    id="subtitle"
                    placeholder="Building Knowledge, Nurturing Faith"
                    value={formData.subtitle}
                    onChange={(e) =>
                      handleInputChange("subtitle", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Main Title *</Label>
                  <Input
                    id="title"
                    placeholder="Welcome to Our Madrasa"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-lg font-semibold"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Excellence in Islamic education with modern teaching methods"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryButton">Primary Button Text *</Label>
                  <Input
                    id="primaryButton"
                    placeholder="Enroll Now"
                    value={formData.primaryButton}
                    onChange={(e) =>
                      handleInputChange("primaryButton", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryButton">
                    Secondary Button Text *
                  </Label>
                  <Input
                    id="secondaryButton"
                    placeholder="Learn More"
                    value={formData.secondaryButton}
                    onChange={(e) =>
                      handleInputChange("secondaryButton", e.target.value)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  {editingSlide ? "Update Slide" : "Save Slide"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Slides List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Current Slides ({slides.length})
          </h2>

          {slides.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center">
                  No slides found. Add your first slide to get started.
                </p>
                <Button onClick={handleAddNew} className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Add First Slide
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {slides.map((slide, index) => (
                <Card
                  key={slide.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Preview */}
                    <div className="md:w-1/3 h-48 md:h-auto relative bg-gray-100">
                      {slide.image ? (
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <Badge className="absolute top-2 left-2 bg-cyan-600">
                        Slide {index + 1}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <Badge
                            variant="outline"
                            className="mb-2 text-cyan-600 border-cyan-600"
                          >
                            {slide.subtitle}
                          </Badge>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {slide.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {slide.description}
                          </p>
                          <div className="flex gap-2">
                            <Badge variant="secondary">
                              {slide.primaryButton}
                            </Badge>
                            <Badge variant="outline">
                              {slide.secondaryButton}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(slide)}
                            className="hover:bg-cyan-50 hover:border-cyan-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(slide.id)}
                            className="hover:bg-red-50 hover:border-red-600 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Use high-quality images (recommended: 1920x1080px)</li>
              <li>Keep titles short and impactful (max 50 characters)</li>
              <li>Descriptions should be concise (max 100 characters)</li>
              <li>Slides will auto-rotate every 5 seconds on the homepage</li>
              <li>Recommended: 3-5 slides for optimal user experience</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
