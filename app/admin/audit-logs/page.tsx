"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";

type AuditLog = {
  id: string;
  userId: string;
  action: string;
  ip: string;
  device: string;
  status: "success" | "failed" | "blocked";
  timestamp: string;
};

const mockLogs: AuditLog[] = Array.from({ length: 40 }, (_, i) => ({
  id: `LOG-${String(i + 1).padStart(6, "0")}`,
  userId: ["ADM-001", "ADM-002", "ADM-003", `STU-0${i + 1}`][i % 4],
  action: ["Login", "Logout", "Course Updated", "Student Exported", "Certificate Issued", "Role Changed", "Login Failed"][i % 7],
  ip: `103.${(i * 7) % 256}.${(i * 13) % 256}.${i % 256}`,
  device: ["Chrome / Windows", "Safari / macOS", "Firefox / Linux", "Mobile / Android"][i % 4],
  status: (["success", "failed", "blocked"] as const)[i % 9 === 0 ? 2 : i % 4 === 0 ? 1 : 0],
  timestamp: new Date(Date.now() - i * 3600000).toLocaleString("en-IN"),
}));

const statusConfig = {
  success: { label: "Success", color: "#10b981", bg: "#ecfdf5" },
  failed: { label: "Failed", color: "#ef4444", bg: "#fef2f2" },
  blocked: { label: "Blocked", color: "#f59e0b", bg: "#fffbeb" },
};

const columns: ColumnDef<AuditLog>[] = [
  { accessorKey: "id", header: "Log ID", cell: ({ row }) => <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{row.getValue("id")}</span> },
  { accessorKey: "userId", header: "User ID", cell: ({ row }) => <span className="font-mono text-xs font-medium" style={{ color: "var(--primary)" }}>{row.getValue("userId")}</span> },
  { accessorKey: "action", header: "Action", cell: ({ row }) => <span className="font-medium" style={{ color: "var(--foreground)" }}>{row.getValue("action")}</span> },
  { accessorKey: "ip", header: "IP Address", cell: ({ row }) => <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{row.getValue("ip")}</span> },
  { accessorKey: "device", header: "Device", cell: ({ row }) => <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{row.getValue("device")}</span> },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = statusConfig[row.getValue("status") as keyof typeof statusConfig];
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>;
    },
  },
  { accessorKey: "timestamp", header: "Timestamp", cell: ({ row }) => <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{row.getValue("timestamp")}</span> },
];

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Audit Logs</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Login history, IP addresses, and system event tracking.</p>
      </div>
      <DataTable columns={columns} data={mockLogs} searchKey="userId" searchPlaceholder="Search by user ID..." title="System Audit Logs" description="All login and system events" />
    </div>
  );
}
