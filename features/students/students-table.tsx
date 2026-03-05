"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export type Student = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  course: string;
  enrolledAt: string;
  status: "active" | "inactive" | "suspended";
  certificateIssued: boolean;
};

const mockStudents: Student[] = Array.from({ length: 50 }, (_, i) => ({
  id: `STU-${String(i + 1).padStart(5, "0")}`,
  name: ["Rahul Verma", "Priya Sharma", "Amit Kumar", "Sneha Patel", "Vikram Singh", "Anjali Gupta", "Ravi Yadav", "Pooja Mehta"][i % 8],
  mobile: `+91 ${9800000000 + i}`,
  email: `student${i + 1}@example.com`,
  course: ["Supply Chain 101", "Warehousing 201", "Logistics 301", "Quality Mgmt 102"][i % 4],
  enrolledAt: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString("en-IN"),
  status: (["active", "inactive", "suspended"] as const)[i % 3 === 0 ? 1 : i % 7 === 0 ? 2 : 0],
  certificateIssued: i % 3 === 0,
}));

const statusConfig = {
  active: { label: "Active", color: "#10b981", bg: "#ecfdf5" },
  inactive: { label: "Inactive", color: "#6b7280", bg: "#f3f4f6" },
  suspended: { label: "Suspended", color: "#ef4444", bg: "#fef2f2" },
};

const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium" style={{ color: "var(--foreground)" }}>
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => (
      <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        {row.getValue("mobile")}
      </span>
    ),
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
        style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
      >
        {row.getValue("course")}
      </span>
    ),
  },
  {
    accessorKey: "enrolledAt",
    header: "Enrolled",
    cell: ({ row }) => (
      <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        {row.getValue("enrolledAt")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = statusConfig[row.getValue("status") as keyof typeof statusConfig];
      return (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
          style={{ color: s.color, background: s.bg }}
        >
          {s.label}
        </span>
      );
    },
  },
  {
    accessorKey: "certificateIssued",
    header: "Certificate",
    cell: ({ row }) => (
      <span
        className="text-[11px] font-medium"
        style={{ color: row.getValue("certificateIssued") ? "#10b981" : "var(--muted-foreground)" }}
      >
        {row.getValue("certificateIssued") ? "Issued" : "Pending"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          href={`/admin/students/${row.original.id}`}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--muted)] transition-colors"
          style={{ color: "var(--muted-foreground)" }}
        >
          <Eye className="w-3.5 h-3.5" />
        </Link>
        <button
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--muted)] transition-colors"
          style={{ color: "var(--muted-foreground)" }}
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    ),
  },
];

export function StudentsTable() {
  return (
    <DataTable
      columns={columns}
      data={mockStudents}
      searchKey="name"
      searchPlaceholder="Search by name..."
      title="All Students"
      description={`${mockStudents.length} total students`}
      actions={
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white transition-colors hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          + Add Student
        </button>
      }
    />
  );
}
