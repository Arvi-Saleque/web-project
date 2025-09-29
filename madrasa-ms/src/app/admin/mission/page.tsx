"use client";
import DashboardLayout from '@/components/DashboardLayout';

export default function MissionManagementPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Mission Page Management</h2>
          <p className="text-indigo-100">Manage dedicated mission page content (placeholder).</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600">Coming soon: Dedicated mission page editor.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
