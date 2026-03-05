"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { PlusCircle, Upload } from "lucide-react";

type Question = {
  id: string;
  questionText: string;
  course: string;
  difficulty: "easy" | "medium" | "hard";
  type: "MCQ" | "True/False";
  createdAt: string;
};

const mockQuestions: Question[] = Array.from({ length: 25 }, (_, i) => ({
  id: `Q-${String(i + 1).padStart(4, "0")}`,
  questionText: [
    "What is the primary function of a distribution center?",
    "Which inventory method uses First In First Out principle?",
    "What does SKU stand for in warehouse management?",
    "Define lead time in supply chain context.",
    "What is cross-docking in logistics?",
  ][i % 5],
  course: ["Supply Chain 101", "Warehousing 201", "Logistics 301", "Quality Mgmt 102"][i % 4],
  difficulty: (["easy", "medium", "hard"] as const)[i % 3],
  type: (["MCQ", "True/False"] as const)[i % 2],
  createdAt: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString("en-IN"),
}));

const difficultyColors = {
  easy: { color: "#10b981", bg: "#ecfdf5" },
  medium: { color: "#f59e0b", bg: "#fffbeb" },
  hard: { color: "#ef4444", bg: "#fef2f2" },
};

const columns: ColumnDef<Question>[] = [
  { accessorKey: "id", header: "ID", cell: ({ row }) => <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{row.getValue("id")}</span> },
  { accessorKey: "questionText", header: "Question", cell: ({ row }) => <span className="text-sm line-clamp-1" style={{ color: "var(--foreground)", maxWidth: "320px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.getValue("questionText")}</span> },
  { accessorKey: "course", header: "Course", cell: ({ row }) => <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>{row.getValue("course")}</span> },
  { accessorKey: "type", header: "Type", cell: ({ row }) => <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{row.getValue("type")}</span> },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const d = row.getValue("difficulty") as keyof typeof difficultyColors;
      const dc = difficultyColors[d];
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium capitalize" style={{ color: dc.color, background: dc.bg }}>{d}</span>;
    },
  },
  { accessorKey: "createdAt", header: "Added", cell: ({ row }) => <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{row.getValue("createdAt")}</span> },
];

export default function QuestionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Question Bank</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Manage exam questions, difficulty levels, and bulk imports.</p>
      </div>
      <DataTable
        columns={columns}
        data={mockQuestions}
        searchKey="course"
        searchPlaceholder="Filter by course..."
        title="Question Bank"
        description={`${mockQuestions.length} questions across all courses`}
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border hover:bg-[var(--muted)] transition-colors" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
              <Upload className="w-3.5 h-3.5" /> Bulk Upload
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              <PlusCircle className="w-3.5 h-3.5" /> Add Question
            </button>
          </div>
        }
      />
    </div>
  );
}
