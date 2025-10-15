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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2, Plus, Save, X, BarChart3, Award } from "lucide-react";

interface Stat {
  id: string;
  label: string;
  value: string;
  order: number;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  order: number;
}

const iconOptions = [
  "GraduationCap",
  "BookOpen",
  "Trophy",
  "Target",
  "Heart",
  "Star",
  "Users",
  "Award",
  "Shield",
  "Zap",
  "Clock",
  "Globe",
];

const colorOptions = [
  { value: "cyan", label: "Cyan", class: "bg-cyan-100 text-cyan-600" },
  { value: "blue", label: "Blue", class: "bg-blue-100 text-blue-600" },
  { value: "purple", label: "Purple", class: "bg-purple-100 text-purple-600" },
  { value: "amber", label: "Amber", class: "bg-amber-100 text-amber-600" },
  { value: "rose", label: "Rose", class: "bg-rose-100 text-rose-600" },
  { value: "green", label: "Green", class: "bg-green-100 text-green-600" },
];

export default function HomepageAdminPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [activeTab, setActiveTab] = useState("stats");

  // Stats form
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [isAddingStat, setIsAddingStat] = useState(false);
  const [statForm, setStatForm] = useState<Stat>({
    id: "",
    label: "",
    value: "",
    order: 0,
  });

  // Features form
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [featureForm, setFeatureForm] = useState<Feature>({
    id: "",
    title: "",
    description: "",
    icon: "GraduationCap",
    iconColor: "cyan",
    order: 0,
  });

  useEffect(() => {
    fetchStats();
    fetchFeatures();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/homepage/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await fetch("/api/homepage/features");
      if (response.ok) {
        const data = await response.json();
        setFeatures(data);
      }
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  // Stats handlers
  const handleSaveStat = async () => {
    if (!statForm.label || !statForm.value) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const url = editingStat
        ? `/api/homepage/stats/${editingStat.id}`
        : "/api/homepage/stats";
      const method = editingStat ? "PUT" : "POST";

      const dataToSend = editingStat
        ? statForm
        : {
            label: statForm.label,
            value: statForm.value,
            order: statForm.order,
          };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await fetchStats();
        handleCancelStat();
        alert(
          editingStat
            ? "Stat updated successfully!"
            : "Stat added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving stat:", error);
      alert("Failed to save stat");
    }
  };

  const handleEditStat = (stat: Stat) => {
    setEditingStat(stat);
    setStatForm(stat);
    setIsAddingStat(false);
  };

  const handleDeleteStat = async (id: string) => {
    if (!confirm("Are you sure you want to delete this stat?")) return;

    try {
      const response = await fetch(`/api/homepage/stats/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchStats();
        alert("Stat deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting stat:", error);
      alert("Failed to delete stat");
    }
  };

  const handleAddNewStat = () => {
    setIsAddingStat(true);
    setEditingStat(null);
    setStatForm({ id: "", label: "", value: "", order: stats.length });
  };

  const handleCancelStat = () => {
    setIsAddingStat(false);
    setEditingStat(null);
    setStatForm({ id: "", label: "", value: "", order: 0 });
  };

  // Features handlers
  const handleSaveFeature = async () => {
    if (!featureForm.title || !featureForm.description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const url = editingFeature
        ? `/api/homepage/features/${editingFeature.id}`
        : "/api/homepage/features";
      const method = editingFeature ? "PUT" : "POST";

      const dataToSend = editingFeature
        ? featureForm
        : {
            title: featureForm.title,
            description: featureForm.description,
            icon: featureForm.icon,
            iconColor: featureForm.iconColor,
            order: featureForm.order,
          };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await fetchFeatures();
        handleCancelFeature();
        alert(
          editingFeature
            ? "Feature updated successfully!"
            : "Feature added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving feature:", error);
      alert("Failed to save feature");
    }
  };

  const handleEditFeature = (feature: Feature) => {
    setEditingFeature(feature);
    setFeatureForm(feature);
    setIsAddingFeature(false);
  };

  const handleDeleteFeature = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;

    try {
      const response = await fetch(`/api/homepage/features/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchFeatures();
        alert("Feature deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting feature:", error);
      alert("Failed to delete feature");
    }
  };

  const handleAddNewFeature = () => {
    setIsAddingFeature(true);
    setEditingFeature(null);
    setFeatureForm({
      id: "",
      title: "",
      description: "",
      icon: "GraduationCap",
      iconColor: "cyan",
      order: features.length,
    });
  };

  const handleCancelFeature = () => {
    setIsAddingFeature(false);
    setEditingFeature(null);
    setFeatureForm({
      id: "",
      title: "",
      description: "",
      icon: "GraduationCap",
      iconColor: "cyan",
      order: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Homepage Content Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage statistics and features sections
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="stats" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="features" className="gap-2">
              <Award className="h-4 w-4" />
              Features
            </TabsTrigger>
          </TabsList>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Statistics Section</h2>
              <Button onClick={handleAddNewStat} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Statistic
              </Button>
            </div>

            {/* Stats Form */}
            {(isAddingStat || editingStat) && (
              <Card className="border-cyan-600">
                <CardHeader className="bg-cyan-50">
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {editingStat ? "Edit Statistic" : "Add New Statistic"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCancelStat}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="statValue">Value *</Label>
                      <Input
                        id="statValue"
                        placeholder="500+"
                        value={statForm.value}
                        onChange={(e) =>
                          setStatForm({ ...statForm, value: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="statLabel">Label *</Label>
                      <Input
                        id="statLabel"
                        placeholder="Students"
                        value={statForm.label}
                        onChange={(e) =>
                          setStatForm({ ...statForm, label: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={handleCancelStat}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveStat} className="gap-2">
                      <Save className="h-4 w-4" />
                      {editingStat ? "Update" : "Save"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card
                  key={stat.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-cyan-600 mb-1">
                          {stat.value}
                        </div>
                        <p className="text-gray-600">{stat.label}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditStat(stat)}
                          className="hover:bg-cyan-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteStat(stat.id)}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {stats.length === 0 && !isAddingStat && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 text-center mb-4">
                    No statistics found. Add your first statistic.
                  </p>
                  <Button onClick={handleAddNewStat} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add First Statistic
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Why Choose Us Features</h2>
              <Button onClick={handleAddNewFeature} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Feature
              </Button>
            </div>

            {/* Features Form */}
            {(isAddingFeature || editingFeature) && (
              <Card className="border-cyan-600">
                <CardHeader className="bg-cyan-50">
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {editingFeature ? "Edit Feature" : "Add New Feature"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCancelFeature}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="featureTitle">Title *</Label>
                    <Input
                      id="featureTitle"
                      placeholder="Qualified Teachers"
                      value={featureForm.title}
                      onChange={(e) =>
                        setFeatureForm({
                          ...featureForm,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featureDescription">Description *</Label>
                    <Textarea
                      id="featureDescription"
                      placeholder="Experienced and dedicated faculty..."
                      value={featureForm.description}
                      onChange={(e) =>
                        setFeatureForm({
                          ...featureForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="featureIcon">Icon</Label>
                      <Select
                        value={featureForm.icon}
                        onValueChange={(value) =>
                          setFeatureForm({ ...featureForm, icon: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((icon) => (
                            <SelectItem key={icon} value={icon}>
                              {icon}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="featureColor">Icon Color</Label>
                      <Select
                        value={featureForm.iconColor}
                        onValueChange={(value) =>
                          setFeatureForm({ ...featureForm, iconColor: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                              {color.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={handleCancelFeature}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveFeature} className="gap-2">
                      <Save className="h-4 w-4" />
                      {editingFeature ? "Update" : "Save"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 bg-${feature.iconColor}-100 rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Badge variant="outline">{feature.icon}</Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditFeature(feature)}
                        className="hover:bg-cyan-50"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteFeature(feature.id)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {features.length === 0 && !isAddingFeature && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Award className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 text-center mb-4">
                    No features found. Add your first feature.
                  </p>
                  <Button onClick={handleAddNewFeature} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add First Feature
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
