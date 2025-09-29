"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft" | "planned";
  description: string;
  priority: "high" | "medium" | "low";
  estimatedCompletion: string;
}

export default function FuturePagesPage() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [newPage, setNewPage] = useState<Omit<PageItem, "id">>({
    title: "",
    slug: "",
    status: "planned",
    description: "",
    priority: "medium",
    estimatedCompletion: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    loadFuturePages();
  }, []);

  function loadFuturePages() {
    // Mock data for now - in real app, fetch from API
    const mockPages: PageItem[] = [
      {
        id: "1",
        title: "Admission Process",
        slug: "admission",
        status: "planned",
        description: "Detailed information about admission requirements and process",
        priority: "high",
        estimatedCompletion: "2025-10-15",
      },
      {
        id: "2",
        title: "Academic Calendar",
        slug: "calendar",
        status: "draft",
        description: "Academic year calendar with important dates and events",
        priority: "medium",
        estimatedCompletion: "2025-10-30",
      },
      {
        id: "3",
        title: "Facilities",
        slug: "facilities",
        status: "planned",
        description: "Overview of campus facilities and resources",
        priority: "medium",
        estimatedCompletion: "2025-11-15",
      },
      {
        id: "4",
        title: "Alumni",
        slug: "alumni",
        status: "planned",
        description: "Alumni network and success stories",
        priority: "low",
        estimatedCompletion: "2025-12-01",
      },
      {
        id: "5",
        title: "Contact Us",
        slug: "contact",
        status: "published",
        description: "Contact information and inquiry form",
        priority: "high",
        estimatedCompletion: "2025-09-29",
      },
    ];
    setPages(mockPages);
  }

  function handleAddPage() {
    if (!newPage.title || !newPage.slug) {
      setStatus("Please fill in required fields.");
      return;
    }

    const page: PageItem = {
      ...newPage,
      id: Date.now().toString(),
    };

    setPages(prev => [...prev, page]);
    setNewPage({
      title: "",
      slug: "",
      status: "planned",
      description: "",
      priority: "medium",
      estimatedCompletion: "",
    });
    setIsAddingPage(false);
    setStatus("Page added successfully!");
  }

  function handleDeletePage(id: string) {
    setPages(prev => prev.filter(page => page.id !== id));
    setStatus("Page deleted successfully!");
  }

  function handleStatusChange(id: string, newStatus: PageItem["status"]) {
    setPages(prev => prev.map(page => 
      page.id === id ? { ...page, status: newStatus } : page
    ));
    setStatus("Page status updated!");
  }

  const getStatusColor = (status: PageItem["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "planned":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: PageItem["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Future Pages Management</h1>
                <p className="mt-2 text-gray-600">
                  Plan and manage upcoming pages for your website.
                </p>
              </div>
              <button
                onClick={() => setIsAddingPage(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Add New Page
              </button>
            </div>
          </div>

          {/* Status Message */}
          {status && (
            <div className={`mb-6 p-4 rounded-md ${
              status.includes("successfully") 
                ? "bg-green-50 border border-green-200 text-green-800" 
                : "bg-red-50 border border-red-200 text-red-800"
            }`}>
              {status}
            </div>
          )}

          {/* Add New Page Form */}
          {isAddingPage && (
            <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Page</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    value={newPage.title}
                    onChange={(e) => setNewPage(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter page title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={newPage.slug}
                    onChange={(e) => setNewPage(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., contact-us"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={newPage.status}
                    onChange={(e) => setNewPage(prev => ({ ...prev, status: e.target.value as PageItem["status"] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="planned">Planned</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newPage.priority}
                    onChange={(e) => setNewPage(prev => ({ ...prev, priority: e.target.value as PageItem["priority"] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newPage.description}
                    onChange={(e) => setNewPage(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter page description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Completion
                  </label>
                  <input
                    type="date"
                    value={newPage.estimatedCompletion}
                    onChange={(e) => setNewPage(prev => ({ ...prev, estimatedCompletion: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsAddingPage(false)}
                  className="px-4 py-2 text-gray-700 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPage}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Add Page
                </button>
              </div>
            </div>
          )}

          {/* Pages List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Pages Overview</h2>
              <p className="text-sm text-gray-600">Manage your website's planned and existing pages.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimated Completion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{page.title}</div>
                          <div className="text-sm text-gray-500">/{page.slug}</div>
                          {page.description && (
                            <div className="text-xs text-gray-400 mt-1">{page.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={page.status}
                          onChange={(e) => handleStatusChange(page.id, e.target.value as PageItem["status"])}
                          className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(page.status)}`}
                        >
                          <option value="planned">Planned</option>
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(page.priority)}`}>
                          {page.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {page.estimatedCompletion || "Not set"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {page.status === "published" && (
                            <button
                              onClick={() => window.open(`/${page.slug}`, "_blank")}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              View
                            </button>
                          )}
                          <button
                            onClick={() => handleDeletePage(page.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pages.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No pages found. Add your first page to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}