"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonLink: string;
}

export default function HeroManagePage() {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "",
    subtitle: "",
    description: "",
    primaryButtonText: "",
    secondaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonLink: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHeroContent();
  }, []);

  async function loadHeroContent() {
    try {
      const res = await fetch("/api/hero", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setHeroContent(data);
      }
    } catch (error) {
      console.error("Failed to load hero content:", error);
      // Set default content if loading fails
      setHeroContent({
        title: "Welcome to Our Madrasa",
        subtitle: "Excellence in Islamic Education",
        description: "Nurturing young minds with comprehensive Islamic education and modern learning approaches.",
        primaryButtonText: "Enroll Now",
        secondaryButtonText: "Learn More",
        primaryButtonLink: "/enroll",
        secondaryButtonLink: "/about",
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroContent),
      });

      if (res.ok) {
        setStatus("Hero content updated successfully!");
      } else {
        setStatus("Failed to update hero content.");
      }
    } catch (error) {
      console.error("Error updating hero content:", error);
      setStatus("An error occurred while updating hero content.");
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (field: keyof HeroContent, value: string) => {
    setHeroContent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Hero Section Management</h1>
                <p className="mt-2 text-gray-600">
                  Manage the main hero section content on your homepage.
                </p>
              </div>
              <button
                onClick={() => window.open("/", "_blank")}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                View Site
              </button>
            </div>
          </div>

          {/* Hero Content Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Hero Section Content</h2>
                  <p className="text-sm text-gray-600">Update the main content displayed on your homepage.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Main Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Title
                </label>
                <input
                  type="text"
                  value={heroContent.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter main title"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">The main headline displayed prominently on the homepage.</p>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={heroContent.subtitle}
                  onChange={(e) => handleInputChange("subtitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subtitle"
                />
                <p className="mt-1 text-xs text-gray-500">A supporting headline that appears below the main title.</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={heroContent.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter description"
                />
                <p className="mt-1 text-xs text-gray-500">A brief description that explains your madrasa's mission and values.</p>
              </div>

              {/* Buttons Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Button */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Primary Button</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={heroContent.primaryButtonText}
                      onChange={(e) => handleInputChange("primaryButtonText", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Enroll Now"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Link
                    </label>
                    <input
                      type="text"
                      value={heroContent.primaryButtonLink}
                      onChange={(e) => handleInputChange("primaryButtonLink", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., /enroll"
                    />
                  </div>
                </div>

                {/* Secondary Button */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Secondary Button</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={heroContent.secondaryButtonText}
                      onChange={(e) => handleInputChange("secondaryButtonText", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Learn More"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Link
                    </label>
                    <input
                      type="text"
                      value={heroContent.secondaryButtonLink}
                      onChange={(e) => handleInputChange("secondaryButtonLink", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., /about"
                    />
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {status && (
                <div className={`p-4 rounded-md ${
                  status.includes("successfully") 
                    ? "bg-green-50 border border-green-200 text-green-800" 
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}>
                  {status}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 text-white text-sm font-medium rounded-md transition-colors duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Updating..." : "Update Hero Content"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}