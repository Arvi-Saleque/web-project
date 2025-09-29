// components/admin/DashboardLayout.tsx
'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

type MenuLeaf = { label: string; href: string };
type MenuNode = { label: string; href?: string; submenu?: MenuLeaf[] };

const menuItems: MenuNode[] = [
  { label: 'Dashboard', href: '/admin' },
  {
    label: 'Home Management',
    submenu: [
      { label: 'Hero Section', href: '/admin/homepage/hero' },
      { label: 'About Section', href: '/admin/homepage/about' },
    ],
  },
  {
    label: 'About Management',
    submenu: [
      { label: 'About Us', href: '/admin/aboutpage/about' },
      { label: 'Mission & Vision', href: '/admin/aboutpage/mission-vision' },
      { label: 'Advisory Committee', href: '/admin/aboutpage/advisory-committee' },
      { label: "Chairman's Message", href: '/admin/aboutpage/chairman-message' },
    ],
  },
  {
    label: 'Academics',
    submenu: [
      { label: 'Curriculum Overview', href: '/academics/curriculum' },
      { label: 'Syllabus Download', href: '/academics/syllabus' },
      { label: 'Class Routine', href: '/academics/routine' },
      { label: 'Academic Calendar', href: '/academics/calendar' },
      { label: 'Upcoming Exam Routine', href: '/academics/exam-routine' },
      { label: 'Attendance', href: '/academics/attendance' },
      { label: 'Exam Results', href: '/academics/results' },
    ],
  },
  {
    label: 'Admissions',
    submenu: [
      { label: 'Admission Info', href: '/admissions/info' },
      { label: 'Online Application Form', href: '/admissions/apply' },
      { label: 'Prospectus', href: '/admissions/prospectus' },
    ],
  },
  {
    label: 'Scholarship',
    submenu: [
      { label: 'List of Benefactors', href: '/scholarship/benefactors' },
      { label: 'Scholarship Award List', href: '/scholarship/awards' },
    ],
  },
  { label: 'News & Notices', href: '/news' },
  { label: 'Events & Gallery', href: '/events' },
  { label: 'Contact Us', href: '/contact' },

  // Keep your original admin sections too:
  { label: 'Students', href: '/admin/students' },
  { label: 'Teachers', href: '/admin/teachers' },
  { label: 'Classes', href: '/admin/classes' },
  { label: 'Settings', href: '/admin/settings' },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();

  // figure out which parents should be open on load based on current route
  const initiallyOpen = useMemo(() => {
    const open: Record<string, boolean> = {};
    for (const item of menuItems) {
      if (!item.submenu) continue;
      open[item.label] = item.submenu.some((s) =>
        pathname === s.href || pathname.startsWith(s.href + '/')
      );
    }
    return open;
  }, [pathname]);

  const [openMap, setOpenMap] = useState<Record<string, boolean>>(initiallyOpen);

  // If route changes (client nav), keep parents in sync
  useEffect(() => {
    setOpenMap((prev) => ({ ...prev, ...initiallyOpen }));
  }, [initiallyOpen]);

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  const activeTitle =
    menuItems.find((i) => i.href === pathname)?.label ||
    menuItems
      .flatMap((i) => i.submenu?.map((s) => ({ parent: i.label, ...s })) ?? [])
      .find((s) => s.href === pathname)?.label ||
    'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-blue-800 shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-blue-700">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-900 font-bold text-sm">M</span>
            </div>
            <span className="text-white font-bold text-lg">Admin Panel</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-5 px-2 space-y-1">
          {menuItems.map((item) => {
            const isLeaf = !item.submenu;
            const isActiveLeaf = isLeaf && item.href && pathname === item.href;

            if (isLeaf) {
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActiveLeaf ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            }

            const open = !!openMap[item.label];

            return (
              <div key={item.label} className="space-y-1">
                <button
                  type="button"
                  onClick={() => setOpenMap((m) => ({ ...m, [item.label]: !m[item.label] }))}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    open ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                  aria-expanded={open}
                  aria-controls={`submenu-${item.label}`}
                >
                  <span>{item.label}</span>
                  <Chevron open={open} />
                </button>

                <div
                  id={`submenu-${item.label}`}
                  className={`overflow-hidden transition-all duration-200 ${
                    open ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <ul className="mt-1 pl-3 border-l border-blue-700">
                    {item.submenu!.map((sub) => {
                      const active = pathname === sub.href || pathname.startsWith(sub.href + '/');
                      return (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={`block px-3 py-2 text-sm rounded-md mb-1 transition-colors duration-200 ${
                              active
                                ? 'bg-blue-700 text-white'
                                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="ml-2 text-blue-100 text-sm">Admin</span>
            </div>
            <button
              onClick={logout}
              className="text-blue-200 hover:text-white p-1 rounded transition-colors duration-200"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{activeTitle}</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your madrasa efficiently</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  View Site
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
