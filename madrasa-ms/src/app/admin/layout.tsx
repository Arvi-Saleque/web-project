import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Madrasa Management",
  description: "Madrasa management system admin panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
