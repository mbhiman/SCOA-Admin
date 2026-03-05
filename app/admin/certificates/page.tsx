"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { Download, RefreshCw } from "lucide-react";

type Certificate = {
  id: string;
  certId: string;
  studentName: string;
  course: string;
  issuedAt: string;
  score: number;
  downloadable: boolean;
};

const mockCerts: Certificate[] = Array.from({ length: 30 }, (_, i) => ({
  id: String(i + 1),
  certId: `CERT-${String(104872 - i).padStart(6, "0")}`,
  studentName: ["Rahul Verma", "Priya Sharma", "Amit Kumar", "Anjali Gupta", "Ravi Yadav"][i % 5],
  course: ["Supply Chain 101", "Warehousing 201", "Logistics 301"][i % 3],
  issuedAt: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString("en-IN"),
  score: Math.floor(Math.random() * 30) + 65,
  downloadable: true,
}));

const columns: ColumnDef<Certificate>[] = [
  { accessorKey: "certId", header: "Certificate ID", cell: ({ row }) => <span className="font-mono text-xs font-medium" style={{ color: "var(--primary)" }}>{row.getValue("certId")}</span> },
  { accessorKey: "studentName", header: "Student", cell: ({ row }) => <span className="font-medium" style={{ color: "var(--foreground)" }}>{row.getValue("studentName")}</span> },
  { accessorKey: "course", header: "Course", cell: ({ row }) => <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>{row.getValue("course")}</span> },
  { accessorKey: "score", header: "Score", cell: ({ row }) => <span className="font-semibold" style={{ color: "#10b981" }}>{row.getValue("score")}%</span> },
  { accessorKey: "issuedAt", header: "Issued On", cell: ({ row }) => <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{row.getValue("issuedAt")}</span> },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium border hover:bg-[var(--muted)] transition-colors" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
          <Download className="w-3 h-3" /> Download
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium border hover:bg-[var(--muted)] transition-colors" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
          <RefreshCw className="w-3 h-3" /> Re-issue
        </button>
      </div>
    ),
  },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Certificates</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Manage issued certificates and handle re-issue requests.</p>
      </div>
      <DataTable columns={columns} data={mockCerts} searchKey="studentName" searchPlaceholder="Search by student..." title="Issued Certificates" description={`${mockCerts.length} total certificates`} />
    </div>
  );
}
