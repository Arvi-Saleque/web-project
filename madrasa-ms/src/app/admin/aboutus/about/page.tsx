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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BookOpen,
  TrendingUp,
  Heart,
  MessageSquare,
  Info,
} from "lucide-react";

// Interfaces
interface AboutSection {
  id: string;
  title: string;
  subtitle: string;
  establishedYear: number;
  storyTitle: string;
  storyContent: string;
  storyImageUrl: string;
  heroImageUrl: string | null;
}

interface AboutStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
  order: number;
}

interface AboutValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface AboutFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function AboutUsAdminPage() {
  // State for About Section
  const [aboutSection, setAboutSection] = useState<AboutSection | null>(null);
  const [isEditingSection, setIsEditingSection] = useState(false);
  const [sectionForm, setSectionForm] = useState<Partial<AboutSection>>({
    title: "",
    subtitle: "",
    establishedYear: new Date().getFullYear(),
    storyTitle: "",
    storyContent: "",
    storyImageUrl: "",
    heroImageUrl: "",
  });

  // State for Stats
  const [stats, setStats] = useState<AboutStat[]>([]);
  const [editingStat, setEditingStat] = useState<AboutStat | null>(null);
  const [isAddingStat, setIsAddingStat] = useState(false);
  const [statForm, setStatForm] = useState<Partial<AboutStat>>({
    label: "",
    value: "",
    icon: "Users",
    color: "text-cyan-600",
    order: 0,
  });

  // State for Values
  const [values, setValues] = useState<AboutValue[]>([]);
  const [editingValue, setEditingValue] = useState<AboutValue | null>(null);
  const [isAddingValue, setIsAddingValue] = useState(false);
  const [valueForm, setValueForm] = useState<Partial<AboutValue>>({
    title: "",
    description: "",
    icon: "Heart",
    order: 0,
  });

  // State for FAQs
  const [faqs, setFaqs] = useState<AboutFAQ[]>([]);
  const [editingFAQ, setEditingFAQ] = useState<AboutFAQ | null>(null);
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);
  const [faqForm, setFaqForm] = useState<Partial<AboutFAQ>>({
    question: "",
    answer: "",
    order: 0,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchAboutSection(),
      fetchStats(),
      fetchValues(),
      fetchFAQs(),
    ]);
  };

  // About Section Functions
  const fetchAboutSection = async () => {
    try {
      const response = await fetch("/api/about-section");
      if (response.ok) {
        const data = await response.json();
        setAboutSection(data);
        if (data) {
          setSectionForm(data);
        }
      }
    } catch (error) {
      console.error("Error fetching about section:", error);
    }
  };

  const handleSaveSection = async () => {
    if (
      !sectionForm.title ||
      !sectionForm.subtitle ||
      !sectionForm.establishedYear ||
      !sectionForm.storyTitle ||
      !sectionForm.storyContent ||
      !sectionForm.storyImageUrl
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const url = aboutSection ? "/api/about-section" : "/api/about-section";
      const method = aboutSection ? "PUT" : "POST";
      const body = aboutSection
        ? { id: aboutSection.id, ...sectionForm }
        : sectionForm;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchAboutSection();
        setIsEditingSection(false);
        alert(
          aboutSection
            ? "About section updated successfully!"
            : "About section created successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving about section:", error);
      alert("Failed to save about section");
    }
  };

  // Stats Functions
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/about-stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSaveStat = async () => {
    if (!statForm.label || !statForm.value || !statForm.icon || !statForm.color) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const url = editingStat
        ? `/api/about-stats/${editingStat.id}`
        : "/api/about-stats";
      const method = editingStat ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statForm),
      });

      if (response.ok) {
        await fetchStats();
        handleCancelStat();
        alert(
          editingStat ? "Stat updated successfully!" : "Stat added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving stat:", error);
      alert("Failed to save stat");
    }
  };

  const handleEditStat = (stat: AboutStat) => {
    setEditingStat(stat);
    setStatForm(stat);
    setIsAddingStat(false);
  };

  const handleDeleteStat = async (id: string) => {
    if (!confirm("Are you sure you want to delete this stat?")) return;

    try {
      const response = await fetch(`/api/about-stats/${id}`, {
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
    setStatForm({
      label: "",
      value: "",
      icon: "Users",
      color: "text-cyan-600",
      order: stats.length,
    });
  };

  const handleCancelStat = () => {
    setIsAddingStat(false);
    setEditingStat(null);
    setStatForm({
      label: "",
      value: "",
      icon: "Users",
      color: "text-cyan-600",
      order: 0,
    });
  };

  // Values Functions
  const fetchValues = async () => {
    try {
      const response = await fetch("/api/about-values");
      if (response.ok) {
        const data = await response.json();
        setValues(data);
      }
    } catch (error) {
      console.error("Error fetching values:", error);
    }
  };

  const handleSaveValue = async () => {
    if (!valueForm.title || !valueForm.description || !valueForm.icon) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const url = editingValue
        ? `/api/about-values/${editingValue.id}`
        : "/api/about-values";
      const method = editingValue ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valueForm),
      });

      if (response.ok) {
        await fetchValues();
        handleCancelValue();
        alert(
          editingValue
            ? "Value updated successfully!"
            : "Value added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving value:", error);
      alert("Failed to save value");
    }
  };

  const handleEditValue = (value: AboutValue) => {
    setEditingValue(value);
    setValueForm(value);
    setIsAddingValue(false);
  };

  const handleDeleteValue = async (id: string) => {
    if (!confirm("Are you sure you want to delete this value?")) return;

    try {
      const response = await fetch(`/api/about-values/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchValues();
        alert("Value deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting value:", error);
      alert("Failed to delete value");
    }
  };

  const handleAddNewValue = () => {
    setIsAddingValue(true);
    setEditingValue(null);
    setValueForm({
      title: "",
      description: "",
      icon: "Heart",
      order: values.length,
    });
  };

  const handleCancelValue = () => {
    setIsAddingValue(false);
    setEditingValue(null);
    setValueForm({
      title: "",
      description: "",
      icon: "Heart",
      order: 0,
    });
  };

  // FAQ Functions
  const fetchFAQs = async () => {
    try {
      const response = await fetch("/api/about-faqs");
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleSaveFAQ = async () => {
    if (!faqForm.question || !faqForm.answer) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const url = editingFAQ
        ? `/api/about-faqs/${editingFAQ.id}`
        : "/api/about-faqs";
      const method = editingFAQ ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqForm),
      });

      if (response.ok) {
        await fetchFAQs();
        handleCancelFAQ();
        alert(
          editingFAQ ? "FAQ updated successfully!" : "FAQ added successfully!"
        );
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert("Failed to save FAQ");
    }
  };

  const handleEditFAQ = (faq: AboutFAQ) => {
    setEditingFAQ(faq);
    setFaqForm(faq);
    setIsAddingFAQ(false);
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const response = await fetch(`/api/about-faqs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchFAQs();
        alert("FAQ deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Failed to delete FAQ");
    }
  };

  const handleAddNewFAQ = () => {
    setIsAddingFAQ(true);
    setEditingFAQ(null);
    setFaqForm({
      question: "",
      answer: "",
      order: faqs.length,
    });
  };

  const handleCancelFAQ = () => {
    setIsAddingFAQ(false);
    setEditingFAQ(null);
    setFaqForm({
      question: "",
      answer: "",
      order: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            About Us Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all content for the About Us page
          </p>
        </div>

        <Tabs defaultValue="section" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="section">
              <BookOpen className="h-4 w-4 mr-2" />
              Main Section
            </TabsTrigger>
            <TabsTrigger value="stats">
              <TrendingUp className="h-4 w-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="values">
              <Heart className="h-4 w-4 mr-2" />
              Core Values
            </TabsTrigger>
            <TabsTrigger value="faqs">
              <MessageSquare className="h-4 w-4 mr-2" />
              FAQs
            </TabsTrigger>
          </TabsList>

          {/* MAIN SECTION TAB */}
          <TabsContent value="section" className="space-y-6">
            <Card>
              <CardHeader className="bg-cyan-50">
                <CardTitle className="flex items-center justify-between">
                  <span>About Us Main Content</span>
                  {aboutSection && !isEditingSection && (
                    <Button onClick={() => setIsEditingSection(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  Main content displayed on the About Us page
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isEditingSection || !aboutSection ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Page Title *</Label>
                        <Input
                          id="title"
                          placeholder="About Our Madrasa"
                          value={sectionForm.title}
                          onChange={(e) =>
                            setSectionForm({ ...sectionForm, title: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="establishedYear">
                          Established Year *
                        </Label>
                        <Input
                          id="establishedYear"
                          type="number"
                          placeholder="1999"
                          value={sectionForm.establishedYear}
                          onChange={(e) =>
                            setSectionForm({
                              ...sectionForm,
                              establishedYear: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Page Subtitle *</Label>
                      <Input
                        id="subtitle"
                        placeholder="Nurturing Islamic Knowledge & Excellence Since 1999"
                        value={sectionForm.subtitle}
                        onChange={(e) =>
                          setSectionForm({
                            ...sectionForm,
                            subtitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storyTitle">Story Title *</Label>
                      <Input
                        id="storyTitle"
                        placeholder="Building a Legacy of Islamic Education"
                        value={sectionForm.storyTitle}
                        onChange={(e) =>
                          setSectionForm({
                            ...sectionForm,
                            storyTitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storyContent">Story Content *</Label>
                      <Textarea
                        id="storyContent"
                        placeholder="Write the main story/description..."
                        rows={8}
                        value={sectionForm.storyContent}
                        onChange={(e) =>
                          setSectionForm({
                            ...sectionForm,
                            storyContent: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storyImageUrl">Story Image URL *</Label>
                      <Input
                        id="storyImageUrl"
                        placeholder="https://images.unsplash.com/..."
                        value={sectionForm.storyImageUrl}
                        onChange={(e) =>
                          setSectionForm({
                            ...sectionForm,
                            storyImageUrl: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="heroImageUrl">
                        Hero Background Image URL (Optional)
                      </Label>
                      <Input
                        id="heroImageUrl"
                        placeholder="https://images.unsplash.com/..."
                        value={sectionForm.heroImageUrl || ""}
                        onChange={(e) =>
                          setSectionForm({
                            ...sectionForm,
                            heroImageUrl: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      {aboutSection && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditingSection(false);
                            setSectionForm(aboutSection);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button onClick={handleSaveSection} className="gap-2">
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600">
                          Page Title
                        </p>
                        <p className="text-lg">{aboutSection.title}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600">
                          Established Year
                        </p>
                        <p className="text-lg">{aboutSection.establishedYear}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        Subtitle
                      </p>
                      <p>{aboutSection.subtitle}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        Story Title
                      </p>
                      <p>{aboutSection.storyTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        Story Content
                      </p>
                      <p className="whitespace-pre-wrap">
                        {aboutSection.storyContent}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* STATISTICS TAB */}
          <TabsContent value="stats" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={handleAddNewStat} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Statistic
              </Button>
            </div>

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

                    <div className="space-y-2">
                      <Label htmlFor="statValue">Value *</Label>
                      <Input
                        id="statValue"
                        placeholder="2000+"
                        value={statForm.value}
                        onChange={(e) =>
                          setStatForm({ ...statForm, value: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="statIcon">Icon (Lucide React) *</Label>
                      <Input
                        id="statIcon"
                        placeholder="Users"
                        value={statForm.icon}
                        onChange={(e) =>
                          setStatForm({ ...statForm, icon: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500">
                        e.g., Users, GraduationCap, Award, Trophy
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="statColor">Color Class *</Label>
                      <Input
                        id="statColor"
                        placeholder="text-cyan-600"
                        value={statForm.color}
                        onChange={(e) =>
                          setStatForm({ ...statForm, color: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500">
                        Tailwind CSS color class
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statOrder">Order</Label>
                    <Input
                      id="statOrder"
                      type="number"
                      value={statForm.order}
                      onChange={(e) =>
                        setStatForm({
                          ...statForm,
                          order: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  All Statistics ({stats.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <TrendingUp className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center mb-4">
                      No statistics found. Add your first statistic.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Label</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Color</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats.map((stat) => (
                        <TableRow key={stat.id}>
                          <TableCell>{stat.order}</TableCell>
                          <TableCell className="font-medium">
                            {stat.label}
                          </TableCell>
                          <TableCell>{stat.value}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{stat.icon}</Badge>
                          </TableCell>
                          <TableCell>
                            <span className={stat.color}>{stat.color}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditStat(stat)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteStat(stat.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CORE VALUES TAB */}
          <TabsContent value="values" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={handleAddNewValue} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Core Value
              </Button>
            </div>

            {(isAddingValue || editingValue) && (
              <Card className="border-purple-600">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {editingValue ? "Edit Core Value" : "Add New Core Value"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCancelValue}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="valueTitle">Title *</Label>
                    <Input
                      id="valueTitle"
                      placeholder="Faith & Character"
                      value={valueForm.title}
                      onChange={(e) =>
                        setValueForm({ ...valueForm, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valueDescription">Description *</Label>
                    <Textarea
                      id="valueDescription"
                      placeholder="Description of the core value..."
                      rows={4}
                      value={valueForm.description}
                      onChange={(e) =>
                        setValueForm({
                          ...valueForm,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valueIcon">Icon (Lucide React) *</Label>
                      <Input
                        id="valueIcon"
                        placeholder="Heart"
                        value={valueForm.icon}
                        onChange={(e) =>
                          setValueForm({ ...valueForm, icon: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500">
                        e.g., Heart, BookOpen, Users, Globe
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="valueOrder">Order</Label>
                      <Input
                        id="valueOrder"
                        type="number"
                        value={valueForm.order}
                        onChange={(e) =>
                          setValueForm({
                            ...valueForm,
                            order: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleCancelValue}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveValue} className="gap-2">
                      <Save className="h-4 w-4" />
                      {editingValue ? "Update" : "Save"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  All Core Values ({values.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {values.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Heart className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center mb-4">
                      No core values found. Add your first core value.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {values.map((value) => (
                      <Card key={value.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge>{value.icon}</Badge>
                                <h3 className="font-bold text-lg">
                                  {value.title}
                                </h3>
                                <Badge variant="outline">
                                  Order: {value.order}
                                </Badge>
                              </div>
                              <p className="text-gray-600">{value.description}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditValue(value)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteValue(value.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQs TAB */}
          <TabsContent value="faqs" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={handleAddNewFAQ} className="gap-2">
                <Plus className="h-4 w-4" />
                Add FAQ
              </Button>
            </div>

            {(isAddingFAQ || editingFAQ) && (
              <Card className="border-blue-600">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center justify-between">
                    <span>{editingFAQ ? "Edit FAQ" : "Add New FAQ"}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCancelFAQ}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="faqQuestion">Question *</Label>
                    <Input
                      id="faqQuestion"
                      placeholder="What is the admission process?"
                      value={faqForm.question}
                      onChange={(e) =>
                        setFaqForm({ ...faqForm, question: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="faqAnswer">Answer *</Label>
                    <Textarea
                      id="faqAnswer"
                      placeholder="The admission process includes..."
                      rows={5}
                      value={faqForm.answer}
                      onChange={(e) =>
                        setFaqForm({ ...faqForm, answer: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="faqOrder">Order</Label>
                    <Input
                      id="faqOrder"
                      type="number"
                      value={faqForm.order}
                      onChange={(e) =>
                        setFaqForm({
                          ...faqForm,
                          order: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={handleCancelFAQ}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveFAQ} className="gap-2">
                      <Save className="h-4 w-4" />
                      {editingFAQ ? "Update" : "Save"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  All FAQs ({faqs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {faqs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center mb-4">
                      No FAQs found. Add your first FAQ.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <Card key={faq.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">
                                  Order: {faq.order}
                                </Badge>
                              </div>
                              <h3 className="font-bold text-lg mb-2">
                                {faq.question}
                              </h3>
                              <p className="text-gray-600 whitespace-pre-wrap">
                                {faq.answer}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditFAQ(faq)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteFAQ(faq.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
