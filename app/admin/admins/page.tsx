"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { PlusCircle, ToggleLeft, ToggleRight, MoreHorizontal } from "lucide-react";

type Admin = {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Analyst" | "Viewer";
  status: "active" | "inactive";
  lastLogin: string;
  createdAt: string;
};

const roleColors = {
  "Super Admin": { color: "#f97316", bg: "#fff7ed" },
  Admin: { color: "#3b82f6", bg: "#eff6ff" },
  Analyst: { color: "#8b5cf6", bg: "#f5f3ff" },
  Viewer: { color: "#6b7280", bg: "#f3f4f6" },
};

const mockAdmins: Admin[] = [
  { id: "ADM-001", name: "Super Admin", email: "admin@scoa.flipkart.com", role: "Super Admin", status: "active", lastLogin: "Today, 09:42 AM", createdAt: "Jan 2023" },
  { id: "ADM-002", name: "Pooja Mehta", email: "pooja.mehta@flipkart.com", role: "Admin", status: "active", lastLogin: "Today, 08:15 AM", createdAt: "Mar 2023" },
  { id: "ADM-003", name: "Arjun Nair", email: "arjun.nair@flipkart.com", role: "Analyst", status: "active", lastLogin: "Yesterday", createdAt: "Jun 2023" },
  { id: "ADM-004", name: "Divya Krishnan", email: "divya.k@flipkart.com", role: "Viewer", status: "inactive", lastLogin: "3 days ago", createdAt: "Sep 2023" },
];

const columns: ColumnDef<Admin>[] = [
  { accessorKey: "id", header: "ID", cell: ({ row }) => <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{row.getValue("id")}</span> },
  { accessorKey: "name", header: "Name", cell: ({ row }) => <span className="font-medium" style={{ color: "var(--foreground)" }}>{row.getValue("name")}</span> },
  { accessorKey: "email", header: "Email", cell: ({ row }) => <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{row.getValue("email")}</span> },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as keyof typeof roleColors;
      const rc = roleColors[role];
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ color: rc.color, background: rc.bg }}>{role}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const active = row.getValue("status") === "active";
      return (
        <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: active ? "#10b981" : "var(--muted-foreground)" }}>
          {active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
          {active ? "Active" : "Inactive"}
        </button>
      );
    },
  },
  { accessorKey: "lastLogin", header: "Last Login", cell: ({ row }) => <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{row.getValue("lastLogin")}</span> },
  { id: "actions", header: "", cell: () => <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--muted)]" style={{ color: "var(--muted-foreground)" }}><MoreHorizontal className="w-3.5 h-3.5" /></button> },
];

export default function AdminsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Admin Management</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Manage admin accounts and access levels.</p>
      </div>
      <DataTable
        columns={columns}
        data={mockAdmins}
        searchKey="name"
        title="Admins"
        description="Role-based admin accounts"
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
            <PlusCircle className="w-3.5 h-3.5" /> Add Admin
          </button>
        }
      />
    </div>
  );
}
