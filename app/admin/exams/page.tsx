"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";

type ExamAttempt = {
  id: string;
  studentName: string;
  course: string;
  score: number;
  result: "pass" | "fail";
  attemptNo: number;
  nextEligible: string;
  takenAt: string;
};

const mockExams: ExamAttempt[] = Array.from({ length: 30 }, (_, i) => ({
  id: `EX-${String(i + 1).padStart(5, "0")}`,
  studentName: ["Rahul Verma", "Priya Sharma", "Amit Kumar", "Sneha Patel"][i % 4],
  course: ["SC-101", "WH-201", "LG-301", "QM-102"][i % 4],
  score: Math.floor(Math.random() * 40) + 40,
  result: i % 3 === 0 ? "fail" : "pass",
  attemptNo: (i % 3) + 1,
  nextEligible: i % 3 === 0 ? `${new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-IN")}` : "—",
  takenAt: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString("en-IN"),
}));

const columns: ColumnDef<ExamAttempt>[] = [
  { accessorKey: "id", header: "Exam ID", cell: ({ row }) => <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{row.getValue("id")}</span> },
  { accessorKey: "studentName", header: "Student", cell: ({ row }) => <span className="font-medium" style={{ color: "var(--foreground)" }}>{row.getValue("studentName")}</span> },
  { accessorKey: "course", header: "Course" },
  { accessorKey: "attemptNo", header: "Attempt #", cell: ({ row }) => <span className="font-medium">#{row.getValue("attemptNo")}</span> },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = row.getValue("score") as number;
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
            <div className="h-full rounded-full" style={{ width: `${score}%`, background: score >= 60 ? "#10b981" : "#ef4444" }} />
          </div>
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{score}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      const r = row.getValue("result") as string;
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ color: r === "pass" ? "#10b981" : "#ef4444", background: r === "pass" ? "#ecfdf5" : "#fef2f2" }}>{r.toUpperCase()}</span>;
    },
  },
  { accessorKey: "nextEligible", header: "Next Eligible", cell: ({ row }) => <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{row.getValue("nextEligible")}</span> },
  { accessorKey: "takenAt", header: "Date", cell: ({ row }) => <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{row.getValue("takenAt")}</span> },
];

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Exam Management</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>View all exam attempts, scores, and retry eligibility.</p>
      </div>
      <DataTable columns={columns} data={mockExams} searchKey="studentName" searchPlaceholder="Search by student..." title="Exam Attempts" description={`${mockExams.length} total attempts`} />
    </div>
  );
}
