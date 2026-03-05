"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

type Course = {
  id: string;
  name: string;
  category: string;
  totalStudents: number;
  passRate: string;
  retryDays: number;
  active: boolean;
  createdAt: string;
};

const mockCourses: Course[] = [
  { id: "C-001", name: "Supply Chain Fundamentals 101", category: "Supply Chain", totalStudents: 52000, passRate: "84%", retryDays: 30, active: true, createdAt: "Jan 2023" },
  { id: "C-002", name: "Warehousing Operations 201", category: "Warehousing", totalStudents: 38000, passRate: "76%", retryDays: 30, active: true, createdAt: "Mar 2023" },
  { id: "C-003", name: "Logistics Management 301", category: "Logistics", totalStudents: 29000, passRate: "91%", retryDays: 15, active: true, createdAt: "Jun 2023" },
  { id: "C-004", name: "Quality Management 102", category: "Quality", totalStudents: 18000, passRate: "69%", retryDays: 45, active: false, createdAt: "Aug 2023" },
  { id: "C-005", name: "Advanced Supply Chain 202", category: "Supply Chain", totalStudents: 12000, passRate: "88%", retryDays: 30, active: true, createdAt: "Nov 2023" },
];

const columns: ColumnDef<Course>[] = [
  { accessorKey: "id", header: "Course ID", cell: ({ row }) => <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{row.getValue("id")}</span> },
  { accessorKey: "name", header: "Course Name", cell: ({ row }) => <span className="font-medium" style={{ color: "var(--foreground)" }}>{row.getValue("name")}</span> },
  { accessorKey: "category", header: "Category", cell: ({ row }) => <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>{row.getValue("category")}</span> },
  { accessorKey: "totalStudents", header: "Students", cell: ({ row }) => <span style={{ color: "var(--foreground)" }}>{(row.getValue("totalStudents") as number).toLocaleString()}</span> },
  { accessorKey: "passRate", header: "Pass Rate" },
  { accessorKey: "retryDays", header: "Retry Days", cell: ({ row }) => <span style={{ color: "var(--muted-foreground)" }}>{row.getValue("retryDays")} days</span> },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean;
      return (
        <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: active ? "#10b981" : "var(--muted-foreground)" }}>
          {active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
          {active ? "Active" : "Inactive"}
        </button>
      );
    },
  },
  { id: "actions", header: "", cell: () => <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--muted)]" style={{ color: "var(--muted-foreground)" }}><MoreHorizontal className="w-3.5 h-3.5" /></button> },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Courses</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Manage training courses and configurations.</p>
      </div>
      <DataTable
        columns={columns}
        data={mockCourses}
        searchKey="name"
        searchPlaceholder="Search courses..."
        title="All Courses"
        description={`${mockCourses.length} courses configured`}
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
            <PlusCircle className="w-3.5 h-3.5" /> Add Course
          </button>
        }
      />
    </div>
  );
}
